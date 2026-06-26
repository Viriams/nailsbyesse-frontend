import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import api from '../utils/api'

export default function Prestations() {
    const [categories, setCategories] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/api/prestations')
            .then(r => setCategories(r.data.categories))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="pt-24 pb-20 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">

                <div className="text-center mb-16">
                    <p className="section-subtitle">Tarifs</p>
                    <h1 className="section-title text-4xl md:text-5xl">Prestations & Tarifs</h1>
                    <div className="gold-divider" />
                    <p className="font-sans text-white/50 max-w-xl mx-auto mt-4 text-sm leading-relaxed">
                        Tous les prix sont en FCFA. Chaque prestation est réalisée avec des produits de qualité professionnelle.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-white/40 font-sans text-sm py-20">Chargement...</div>
                ) : (
                    <div className="space-y-8">
                        {Object.entries(categories).map(([cat, items]) => (
                            <div key={cat} className="card-dark overflow-hidden">
                                <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                                    <h2 className="font-display text-xl text-esse-or">{cat}</h2>
                                </div>
                                <div className="divide-y divide-white/5">
                                    {items.map(item => (
                                        <div key={item.id} className="flex justify-between items-center px-6 py-4 hover:bg-white/5 transition-colors">
                                            <span className="font-serif italic text-white/80 text-base">{item.nom}</span>
                                            <span className="font-sans font-medium text-esse-or text-sm whitespace-nowrap ml-4">
                                                {item.prix ? `${item.prix.toLocaleString()} FCFA` : item.prix_texte}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-10 card-dark p-6">
                    <h3 className="font-display text-lg text-esse-or mb-3">⚠️ À noter</h3>
                    <ul className="font-sans text-sm text-white/50 space-y-2">
                        <li>• Tout retard de plus de <strong className="text-white/70">30 minutes</strong> entraîne l'annulation automatique du RDV.</li>
                        <li>• Annulation possible jusqu'à <strong className="text-white/70">24h avant</strong> le rendez-vous.</li>
                        <li>• Les photos peuvent être publiées sur nos réseaux avec votre consentement.</li>
                    </ul>
                </div>

                <div className="text-center mt-12">
                    <Link to="/reservation" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
                        Réserver maintenant <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    )
}