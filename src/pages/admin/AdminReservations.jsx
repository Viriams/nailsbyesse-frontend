import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Clock } from 'lucide-react'
import api from '../../utils/api'

const STATUTS = {
    en_attente: { label: 'En attente', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
    confirme: { label: 'Confirmé', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
    annule: { label: 'Annulé', color: 'text-red-400 bg-red-500/10 border-red-500/20' },
}

export default function AdminReservations() {
    const [reservations, setReservations] = useState([])
    const [filtre, setFiltre] = useState('')
    const [loading, setLoading] = useState(true)

    const fetch = () => {
        setLoading(true)
        const params = filtre ? `?statut=${filtre}` : ''
        api.get(`/api/admin/reservations${params}`)
            .then(r => setReservations(r.data))
            .catch(() => { })
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetch() }, [filtre])

    const updateStatut = async (id, statut) => {
        await api.patch(`/api/admin/reservations/${id}/statut`, { statut })
        fetch()
    }

    return (
        <div>
            <h1 className="font-display text-2xl text-white mb-8">Réservations</h1>

            {/* Filtres */}
            <div className="flex flex-wrap gap-3 mb-6">
                {[
                    { value: '', label: 'Toutes' },
                    { value: 'en_attente', label: 'En attente' },
                    { value: 'confirme', label: 'Confirmées' },
                    { value: 'annule', label: 'Annulées' },
                ].map(f => (
                    <button key={f.value} onClick={() => setFiltre(f.value)}
                        className={`font-sans text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-all
              ${filtre === f.value
                                ? 'bg-esse-or text-esse-noir border-esse-or'
                                : 'border-white/20 text-white/50 hover:border-esse-or/50'}`}>
                        {f.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="font-sans text-white/40 text-sm">Chargement...</p>
            ) : reservations.length === 0 ? (
                <p className="font-sans text-white/30 italic text-sm">Aucune réservation trouvée.</p>
            ) : (
                <div className="space-y-4">
                    {reservations.map(r => (
                        <div key={r.id} className="card-dark p-5">
                            <div className="flex flex-wrap justify-between gap-4 mb-3">
                                <div>
                                    <p className="font-display text-lg text-white">{r.prenom} {r.nom}</p>
                                    <p className="font-sans text-xs text-white/40">{r.email} · {r.telephone}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-sans text-sm text-esse-or font-medium">
                                        {new Date(r.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </p>
                                    <p className="font-sans text-xs text-white/40">à {r.heure_debut?.slice(0, 5)}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-between items-center gap-3">
                                <div>
                                    <p className="font-serif italic text-white/70 text-sm">{r.prestation_nom}</p>
                                    <p className="font-sans text-xs text-esse-or mt-0.5">
                                        {r.prestation_prix?.toLocaleString()} FCFA
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`font-sans text-xs border px-2 py-1 rounded-full ${STATUTS[r.statut]?.color}`}>
                                        {STATUTS[r.statut]?.label}
                                    </span>
                                    {r.statut === 'en_attente' && (
                                        <>
                                            <button onClick={() => updateStatut(r.id, 'confirme')}
                                                className="flex items-center gap-1 font-sans text-xs text-green-400 border border-green-500/30 px-3 py-1 rounded-full hover:bg-green-500/10 transition-all">
                                                <CheckCircle size={13} /> Confirmer
                                            </button>
                                            <button onClick={() => updateStatut(r.id, 'annule')}
                                                className="flex items-center gap-1 font-sans text-xs text-red-400 border border-red-500/30 px-3 py-1 rounded-full hover:bg-red-500/10 transition-all">
                                                <XCircle size={13} /> Annuler
                                            </button>
                                        </>
                                    )}
                                    {r.statut === 'confirme' && (
                                        <button onClick={() => updateStatut(r.id, 'annule')}
                                            className="flex items-center gap-1 font-sans text-xs text-red-400 border border-red-500/30 px-3 py-1 rounded-full hover:bg-red-500/10 transition-all">
                                            <XCircle size={13} /> Annuler
                                        </button>
                                    )}
                                </div>
                            </div>

                            {r.notes && (
                                <p className="font-sans text-xs text-white/30 italic mt-3 border-t border-white/5 pt-3">
                                    Note : {r.notes}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}