import { Link } from 'react-router-dom'
import { Clock, MapPin, Phone, ExternalLink, Mail, ArrowRight } from 'lucide-react'

const REGLES = [
    { emoji: '⏰', titre: 'Ponctualité', texte: 'Merci d\'arriver à l\'heure. Tout retard de plus de 30 minutes entraîne l\'annulation automatique du rendez-vous sans remboursement.' },
    { emoji: '📸', titre: 'Consentement photo', texte: 'Les réalisations peuvent être photographiées et publiées sur nos réseaux sociaux. Vous pouvez refuser ce consentement lors de la réservation.' },
    { emoji: '❌', titre: 'Annulation', texte: 'Toute annulation doit être effectuée au moins 24h avant le rendez-vous via le lien reçu par email.' },
    { emoji: '💳', titre: 'Paiement', texte: 'Le paiement s\'effectue sur place après la prestation. Nous acceptons le cash et les paiements mobile money.' },
]

export default function Informations() {
    return (
        <div className="pt-24 pb-20 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">

                <div className="text-center mb-16">
                    <p className="section-subtitle">Pratique</p>
                    <h1 className="section-title text-4xl md:text-5xl">Informations</h1>
                    <div className="gold-divider" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

                    {/* Horaires */}
                    <div className="card-dark p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock size={22} className="text-esse-or" />
                            <h2 className="font-display text-xl text-white">Horaires</h2>
                        </div>
                        <div className="space-y-2">
                            {[
                                { jour: 'Lundi – Vendredi', heure: '9h00 – 21h00' },
                                { jour: 'Samedi', heure: '9h00 – 20h00' },
                                { jour: 'Dimanche', heure: 'Fermé' },
                            ].map((h, i) => (
                                <div key={i} className="flex justify-between font-sans text-sm">
                                    <span className="text-white/50">{h.jour}</span>
                                    <span className={h.heure === 'Fermé' ? 'text-esse-fuchsia' : 'text-esse-or'}>{h.heure}</span>
                                </div>
                            ))}
                        </div>
                        <p className="font-sans text-xs text-white/30 mt-4 italic">
                            Sur rendez-vous uniquement
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="card-dark p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Phone size={22} className="text-esse-or" />
                            <h2 className="font-display text-xl text-white">Contact</h2>
                        </div>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 font-sans text-sm text-white/50">
                                <MapPin size={16} className="text-esse-or flex-shrink-0" />
                                Calavi, Bénin
                            </li>
                            <li className="flex items-center gap-3 font-sans text-sm">
                                <Phone size={16} className="text-esse-or flex-shrink-0" />
                                <a href="tel:+22901524070011" className="text-white/50 hover:text-esse-or transition-colors">
                                    +229 01 52 40 70 01
                                </a>
                            </li>
                            <li className="flex items-center gap-3 font-sans text-sm">
                                <Mail size={16} className="text-esse-or flex-shrink-0" />
                                <a href="mailto:nailsbyesse365@gmail.com" className="text-white/50 hover:text-esse-or transition-colors">
                                    nailsbyesse365@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 font-sans text-sm">
                                <ExternalLink size={16} className="text-esse-or flex-shrink-0" />
                                <a href="https://instagram.com/nail_sbyesse" target="_blank" rel="noreferrer"
                                    className="text-white/50 hover:text-esse-or transition-colors">
                                    @nail_sbyesse
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Règles du salon */}
                <div className="mb-12">
                    <h2 className="font-display text-2xl text-white text-center mb-8">Règles du salon</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {REGLES.map((r, i) => (
                            <div key={i} className="card-dark p-6">
                                <div className="text-2xl mb-3">{r.emoji}</div>
                                <h3 className="font-display text-lg text-esse-or mb-2">{r.titre}</h3>
                                <p className="font-sans text-sm text-white/50 leading-relaxed">{r.texte}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link to="/reservation" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4">
                        Réserver maintenant <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    )
}