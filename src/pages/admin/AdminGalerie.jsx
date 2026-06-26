import { useEffect, useState, useRef } from 'react'
import { Upload, Trash2, Plus } from 'lucide-react'
import api from '../../utils/api'

const CATEGORIES = ['Nail Art', 'Semi-Permanent', 'Américaine', 'Poly Gel', 'Press On']

export default function AdminGalerie() {
    const [photos, setPhotos] = useState([])
    const [categorie, setCategorie] = useState('Nail Art')
    const [description, setDesc] = useState('')
    const [uploading, setUploading] = useState(false)
    const fileRef = useRef()

    const fetch = () => {
        api.get('/api/galerie').then(r => setPhotos(r.data)).catch(() => { })
    }

    useEffect(() => { fetch() }, [])

    const upload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        setUploading(true)
        const form = new FormData()
        form.append('file', file)
        form.append('categorie', categorie)
        form.append('description', description)
        try {
            await api.post('/api/admin/galerie/upload', form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            fetch()
            setDesc('')
        } catch (e) {
            alert('Erreur upload')
        } finally {
            setUploading(false)
        }
    }

    const supprimer = async (id) => {
        if (!confirm('Supprimer cette photo ?')) return
        await api.delete(`/api/admin/galerie/${id}`)
        fetch()
    }

    return (
        <div>
            <h1 className="font-display text-2xl text-white mb-8">Galerie</h1>

            {/* Upload */}
            <div className="card-dark p-6 mb-8">
                <h2 className="font-display text-lg text-white mb-5">Ajouter une photo</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">Catégorie</label>
                        <select value={categorie} onChange={e => setCategorie(e.target.value)}
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-sans text-sm focus:border-esse-or outline-none">
                            {CATEGORIES.map(c => <option key={c} value={c} className="bg-esse-noir">{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">Description (optionnel)</label>
                        <input type="text" value={description} onChange={e => setDesc(e.target.value)}
                            placeholder="Ex: Nail art floral rose..."
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-sans text-sm focus:border-esse-or outline-none" />
                    </div>
                </div>
                <input type="file" ref={fileRef} onChange={upload} accept="image/*" className="hidden" />
                <button onClick={() => fileRef.current.click()} disabled={uploading}
                    className="btn-primary flex items-center gap-2 disabled:opacity-40">
                    <Upload size={16} /> {uploading ? 'Upload en cours...' : 'Choisir une photo'}
                </button>
            </div>

            {/* Grille photos */}
            {photos.length === 0 ? (
                <p className="font-sans text-white/30 italic text-sm">Aucune photo dans la galerie.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {photos.map(p => (
                        <div key={p.id} className="group relative aspect-square overflow-hidden rounded-xl">
                            <img src={p.url} alt={p.description || 'Nail art'}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                                <p className="font-sans text-xs text-esse-or text-center">{p.categorie}</p>
                                {p.description && (
                                    <p className="font-sans text-xs text-white/60 text-center">{p.description}</p>
                                )}
                                <button onClick={() => supprimer(p.id)}
                                    className="flex items-center gap-1 font-sans text-xs text-red-400 border border-red-500/30 px-3 py-1 rounded-full hover:bg-red-500/10 transition-all mt-1">
                                    <Trash2 size={12} /> Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}