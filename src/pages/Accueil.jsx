import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Phone, MapPin, Clock } from 'lucide-react'
import api from '../utils/api'


export default function Accueil() {
    const [galerie, setGalerie] = useState([])

    useEffect(() => {
        api.get('/api/galerie').then(r => setGalerie(r.data.slice(0, 6))).catch(() => { })
    }, [])

    return (
        <div className="overflow-hidden">

            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center text-center px-4">
                <div className="absolute inset-0 bg-gradient-to-br from-esse-noir via-[#2d1a2e] to-esse-noir" />
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-esse-fuchsia/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-esse-violet/10 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-3xl mx-auto">
                    <p className="font-sans text-xs tracking-[0.4em] uppercase text-esse-or mb-6">
                        ✦ Salon privé haut de gamme — Calavi, Bénin ✦
                    </p>
                    <h1 className="font-script text-7xl md:text-9xl text-white mb-4 leading-none">
                        Nails by Esse
                    </h1>
                    <div className="gold-divider mb-6" />
                    <p className="font-serif italic text-xl md:text-2xl text-white/70 mb-4">
                        « It's all about your nails »
                    </p>
                    <p className="font-sans text-base text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
                        Bienvenue dans votre espace beauté exclusif. Pose semi-permanente, américaine,
                        poly gel, press on — chaque détail est soigné pour sublimer vos mains.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/reservation" className="btn-primary text-base px-8 py-4 flex items-center gap-2 justify-center">
                            Réserver maintenant <ArrowRight size={18} />
                        </Link>
                        <Link to="/catalogue" className="btn-outline text-base px-8 py-4">
                            Voir le catalogue
                        </Link>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 mt-12">
                        {[
                            { icon: <Star size={14} className="text-esse-or" />, label: 'Service 5 étoiles' },
                            { icon: <Clock size={14} className="text-esse-or" />, label: 'Lun–Sam 9h–21h' },
                            { icon: <MapPin size={14} className="text-esse-or" />, label: 'Calavi, Bénin' },
                        ].map((b, i) => (
                            <div key={i} className="flex items-center gap-2 text-white/40 font-sans text-xs">
                                {b.icon} {b.label}
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* GALERIE */}
            {galerie.length > 0 && (
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-14">
                            <p className="section-subtitle">Nos réalisations</p>
                            <h2 className="section-title">Le catalogue</h2>
                            <div className="gold-divider" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {galerie.map((photo, i) => (
                                <div key={i} className="aspect-square overflow-hidden rounded-xl group">
                                    <img src={photo.url} alt={photo.description || 'Nail art'}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link to="/catalogue" className="btn-outline inline-flex items-center gap-2">
                                Voir tout le catalogue <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}


            {/* CTA */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-esse-fuchsia/20 via-esse-violet/20 to-esse-fuchsia/20" />
                <div className="relative z-10 max-w-2xl mx-auto text-center">
                    <h2 className="font-script text-5xl md:text-6xl text-esse-or mb-4">
                        Prête à sublimer vos ongles ?
                    </h2>
                    <div className="gold-divider mb-6" />
                    <p className="font-sans text-white/60 mb-8 text-sm leading-relaxed">
                        Réservez votre créneau en ligne en quelques minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/reservation" className="btn-primary text-base px-8 py-4 flex items-center gap-2 justify-center">
                            Réserver en ligne <ArrowRight size={18} />
                        </Link>
                        <a href="https://wa.me/22901524070011" target="_blank" rel="noreferrer"
                            className="btn-outline text-base px-8 py-4 flex items-center gap-2 justify-center">
                            <Phone size={18} /> WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* INFOS */}
            <section className="py-16 px-4 bg-black/50">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {[
                        { icon: <Clock size={28} className="text-esse-or mx-auto mb-3" />, titre: 'Horaires', detail: 'Lun – Sam\n9h00 – 21h00\nFermé le dimanche' },
                        { icon: <MapPin size={28} className="text-esse-or mx-auto mb-3" />, titre: 'Localisation', detail: 'Calavi, Bénin\nSur rendez-vous uniquement' },
                        { icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-esse-or mx-auto mb-3"><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>, titre: 'Réseaux sociaux', detail: '@nail_sbyesse\nInstagram & TikTok' },].map((item, i) => (
                            <div key={i} className="card-dark p-6">
                                {item.icon}
                                <h3 className="font-display text-lg text-white mb-2">{item.titre}</h3>
                                <p className="font-sans text-sm text-white/50 leading-relaxed whitespace-pre-line">{item.detail}</p>
                            </div>
                        ))}
                </div>
            </section>

        </div>
    )
}