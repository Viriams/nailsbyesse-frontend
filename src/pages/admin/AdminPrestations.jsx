import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'
import api from '../../utils/api'

const CATEGORIES = ['Pose semi-permanente', 'Pose américaine', 'Autres services']

export default function AdminPrestations() {
    const [categories, setCategories] = useState({})
    const [editing, setEditing] = useState(null)
    const [adding, setAdding] = useState(false)
    const [form, setForm] = useState({ categorie: CATEGORIES[0], nom: '', prix: '', prix_texte: '', ordre: 0 })

    const fetch = () => {
        api.get('/api/prestations').then(r => setCategories(r.data.categories)).catch(() => { })
    }

    useEffect(() => { fetch() }, [])

    const save = async () => {
        const data = { ...form, prix: form.prix ? parseInt(form.prix) : null, actif: true }
        if (editing) {
            await api.put(`/api/admin/prestations/${editing}`, data)
            setEditing(null)
        } else {
            await api.post('/api/admin/prestations', data)
            setAdding(false)
        }
        fetch()
        setForm({ categorie: CATEGORIES[0], nom: '', prix: '', prix_texte: '', ordre: 0 })
    }

    const supprimer = async (id) => {
        if (!confirm('Désactiver cette prestation ?')) return
        await api.delete(`/api/admin/prestations/${id}`)
        fetch()
    }

    const startEdit = (item) => {
        setEditing(item.id)
        setAdding(false)
        setForm({ categorie: item.categorie, nom: item.nom, prix: item.prix || '', prix_texte: item.prix_texte || '', ordre: item.ordre })
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-display text-2xl text-white">Prestations & Tarifs</h1>
                <button onClick={() => { setAdding(true); setEditing(null) }}
                    className="btn-primary flex items-center gap-2 text-sm">
                    <Plus size={16} /> Ajouter
                </button>
            </div>

            {(adding || editing) && (
                <div className="card-dark p-6 mb-8">
                    <h2 className="font-display text-lg text-white mb-5">
                        {editing ? 'Modifier la prestation' : 'Nouvelle prestation'}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">Catégorie</label>
                            <select value={form.categorie} onChange={e => setForm({ ...form, categorie: e.target.value })}
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-sans text-sm focus:border-esse-or outline-none">
                                {CATEGORIES.map(c => <option key={c} value={c} className="bg-esse-noir">{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">Nom</label>
                            <input type="text" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                                placeholder="Ex: French simple"
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-sans text-sm focus:border-esse-or outline-none" />
                        </div>
                        <div>
                            <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">Prix (FCFA)</label>
                            <input type="number" value={form.prix} onChange={e => setForm({ ...form, prix: e.target.value })}
                                placeholder="Ex: 2500"
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-sans text-sm focus:border-esse-or outline-none" />
                        </div>
                        <div>
                            <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">Prix texte</label>
                            <input type="text" value={form.prix_texte} onChange={e => setForm({ ...form, prix_texte: e.target.value })}
                                placeholder="Ex: Sur devis"
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-sans text-sm focus:border-esse-or outline-none" />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={save} className="btn-primary flex items-center gap-2">
                            <Check size={16} /> Enregistrer
                        </button>
                        <button onClick={() => { setEditing(null); setAdding(false) }} className="btn-outline flex items-center gap-2">
                            <X size={16} /> Annuler
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                {Object.entries(categories).map(([cat, items]) => (
                    <div key={cat} className="card-dark overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                            <h2 className="font-display text-lg text-esse-or">{cat}</h2>
                        </div>
                        <div className="divide-y divide-white/5">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between items-center px-6 py-4">
                                    <div>
                                        <p className="font-serif italic text-white/80">{item.nom}</p>
                                        <p className="font-sans text-xs text-esse-or mt-0.5">
                                            {item.prix ? `${item.prix.toLocaleString()} FCFA` : item.prix_texte}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => startEdit(item)}
                                            className="text-white/30 hover:text-esse-or transition-colors p-1">
                                            <Pencil size={15} />
                                        </button>
                                        <button onClick={() => supprimer(item.id)}
                                            className="text-white/30 hover:text-red-400 transition-colors p-1">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}