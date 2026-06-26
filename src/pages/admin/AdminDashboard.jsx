import { useEffect, useState } from 'react'
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import api from '../../utils/api'

export default function AdminDashboard() {
    const [stats, setStats] = useState(null)
    const [rdvs, setRdvs] = useState([])

    useEffect(() => {
        api.get('/api/admin/stats').then(r => setStats(r.data)).catch(() => { })
        api.get('/api/admin/reservations?statut=en_attente').then(r => setRdvs(r.data.slice(0, 5))).catch(() => { })
    }, [])

    const CARDS = stats ? [
        { label: "Aujourd'hui", value: stats.aujourd_hui, icon: <Calendar size={20} />, color: 'text-esse-or' },
        { label: 'Cette semaine', value: stats.semaine, icon: <Clock size={20} />, color: 'text-blue-400' },
        { label: 'Ce mois', value: stats.mois, icon: <CheckCircle size={20} />, color: 'text-green-400' },
        { label: 'En attente', value: stats.en_attente, icon: <AlertCircle size={20} />, color: 'text-esse-fuchsia' },
    ] : []

    return (
        <div>
            <h1 className="font-display text-2xl text-white mb-8">Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {CARDS.map((c, i) => (
                    <div key={i} className="card-dark p-5">
                        <div className={`mb-2 ${c.color}`}>{c.icon}</div>
                        <p className="font-display text-3xl text-white mb-1">{c.value}</p>
                        <p className="font-sans text-xs text-white/40 uppercase tracking-wider">{c.label}</p>
                    </div>
                ))}
            </div>

            {/* RDV en attente */}
            <div className="card-dark overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10">
                    <h2 className="font-display text-lg text-white">Réservations en attente</h2>
                </div>
                {rdvs.length === 0 ? (
                    <p className="font-sans text-sm text-white/30 italic p-6">Aucune réservation en attente.</p>
                ) : (
                    <div className="divide-y divide-white/5">
                        {rdvs.map(r => (
                            <div key={r.id} className="px-6 py-4 flex flex-wrap justify-between gap-3">
                                <div>
                                    <p className="font-display text-base text-white">{r.prenom} {r.nom}</p>
                                    <p className="font-sans text-xs text-white/40 mt-0.5">{r.prestation_nom}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-sans text-sm text-esse-or">
                                        {new Date(r.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} à {r.heure_debut?.slice(0, 5)}
                                    </p>
                                    <span className="font-sans text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                                        En attente
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}