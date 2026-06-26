import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import api from '../../utils/api'

export default function AdminDisponibilites() {
    const [jours, setJours] = useState([])
    const [date, setDate] = useState('')
    const [motif, setMotif] = useState('')
    const [loading, setLoading] = useState(false)

    const fetch = () => {
        api.get('/api/admin/jours-bloques').then(r => setJours(r.data)).catch(() => { })
    }

    useEffect(() => { fetch() }, [])

    const bloquer = async () => {
        if (!date) return
        setLoading(true)
        try {
            await api.post(`/api/admin/jours-bloques?date_str=${date}&motif=${motif}`)
            fetch()
            setDate('')
            setMotif('')
        } catch (e) {
            alert(e.response?.data?.detail || 'Erreur')
        } finally {
            setLoading(false)
        }
    }

    const debloquer = async (id) => {
        await api.delete(`/api/admin/jours-bloques/${id}`)
        fetch()
    }

    return (
        <div>
            <h1 className="font-display text-2xl text-white mb-2">Disponibilités</h1>
            <p className="font-sans text-sm text-white/40 mb-8">
                Les créneaux sont automatiques : 9h–12h, 12h–15h, 15h–18h tous les jours sauf dimanche.
                Bloquez ici les jours exceptionnels (congé, férié, etc.)
            </p>

            {/* Bloquer un jour */}
            <div className="card-dark p-6 mb-8">
                <h2 className="font-display text-lg text-white mb-5">Bloquer un jour</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)}
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-sans text-sm focus:border-esse-or outline-none [color-scheme:dark]" />
                    </div>
                    <div>
                        <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">Motif (optionnel)</label>
                        <input type="text" value={motif} onChange={e => setMotif(e.target.value)}
                            placeholder="Ex: Congé, Férié..."
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-sans text-sm focus:border-esse-or outline-none" />
                    </div>
                </div>
                <button onClick={bloquer} disabled={!date || loading}
                    className="btn-primary flex items-center gap-2 disabled:opacity-40">
                    <Plus size={16} /> {loading ? 'Blocage...' : 'Bloquer ce jour'}
                </button>
            </div>

            {/* Liste jours bloqués */}
            <div className="card-dark overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                    <h2 className="font-display text-lg text-white">Jours bloqués</h2>
                </div>
                {jours.length === 0 ? (
                    <p className="font-sans text-sm text-white/30 italic p-6">Aucun jour bloqué.</p>
                ) : (
                    <div className="divide-y divide-white/5">
                        {jours.map(j => (
                            <div key={j.id} className="flex justify-between items-center px-6 py-4">
                                <div>
                                    <p className="font-display text-base text-esse-or">
                                        {new Date(j.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                    {j.motif && <p className="font-sans text-xs text-white/40 mt-0.5">{j.motif}</p>}
                                </div>
                                <button onClick={() => debloquer(j.id)}
                                    className="flex items-center gap-1 font-sans text-xs text-red-400 border border-red-500/30 px-3 py-1 rounded-full hover:bg-red-500/10 transition-all">
                                    <Trash2 size={13} /> Débloquer
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}