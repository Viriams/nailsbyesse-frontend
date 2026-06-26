import { Link } from 'react-router-dom'
import { ExternalLink, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-black/60 border-t border-white/10 py-12 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Marque */}
                <div>
                    <p className="font-script text-4xl text-esse-or mb-2">Nails by Esse</p>
                    <div className="w-12 h-px bg-esse-or/50 mb-3" />
                    <p className="font-serif italic text-white/50 text-sm">
                        « It's all about your nails »
                    </p>
                    <div className="flex gap-4 mt-4">
                        <a href="https://instagram.com/nail_sbyesse" target="_blank" rel="noreferrer"
                            className="text-white/40 hover:text-esse-or transition-colors">
                            <ExternalLink size={20} />
                        </a>
                        <a href="https://wa.me/22901524070011" target="_blank" rel="noreferrer"
                            className="text-white/40 hover:text-esse-or transition-colors">
                            <Phone size={20} />
                        </a>
                    </div>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="font-sans text-xs tracking-widest uppercase text-esse-or mb-4">Navigation</h3>
                    <ul className="space-y-2">
                        {[
                            { to: '/', label: 'Accueil' },
                            { to: '/prestations', label: 'Prestations & Tarifs' },
                            { to: '/catalogue', label: 'Catalogue' },
                            { to: '/informations', label: 'Informations' },
                            { to: '/reservation', label: 'Réserver' },
                        ].map(l => (
                            <li key={l.to}>
                                <Link to={l.to} className="font-sans text-sm text-white/50 hover:text-esse-or transition-colors">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-sans text-xs tracking-widest uppercase text-esse-or mb-4">Contact</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-white/50 text-sm">
                            <MapPin size={16} className="mt-0.5 flex-shrink-0 text-esse-or" />
                            Calavi, Bénin
                        </li>
                        <li className="flex items-center gap-3 text-white/50 text-sm">
                            <Phone size={16} className="flex-shrink-0 text-esse-or" />
                            <a href="tel:+22901524070011" className="hover:text-esse-or transition-colors">
                                +229 01 52 40 70 01
                            </a>
                        </li>
                        <li className="flex items-center gap-3 text-white/50 text-sm">
                            <Mail size={16} className="flex-shrink-0 text-esse-or" />
                            <a href="mailto:nailsbyesse365@gmail.com" className="hover:text-esse-or transition-colors">
                                nailsbyesse365@gmail.com
                            </a>
                        </li>
                        <li className="flex items-center gap-3 text-white/50 text-sm">
                            <ExternalLink size={16} className="flex-shrink-0 text-esse-or" />
                            <a href="https://instagram.com/nail_sbyesse" target="_blank" rel="noreferrer"
                                className="hover:text-esse-or transition-colors">
                                @nail_sbyesse
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-esse-or/30 to-transparent mt-10 mb-6" />
            <p className="text-center font-sans text-xs text-white/25">
                © {new Date().getFullYear()} Nails By Esse — Tous droits réservés
            </p>
        </footer>
    )
}