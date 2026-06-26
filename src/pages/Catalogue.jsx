import { useEffect, useState } from 'react'
import api from '../utils/api'

const CATEGORIES = ['Tous', 'Nail Art', 'Semi-Permanent', 'Américaine', 'Poly Gel', 'Press On']

export default function Catalogue() {
    const [photos, setPhotos] = useState([])
    const [filtre, setFiltre] = useState('Tous')
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        api.get('/api/galerie')
            .then(r => setPhotos(r.data))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const filtered = filtre === 'Tous' ? photos : photos.filter(p => p.categorie === filtre)

    return (
        <div className="pt-24 pb-20 px-4 min-h-screen">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-14">
                    <p className="section-subtitle">Galerie</p>
                    <h1 className="section-title text-4xl md:text-5xl">Notre Catalogue</h1>
                    <div className="gold-divider" />
                    <p className="font-sans text-white/50 max-w-xl mx-auto mt-4 text-sm">
                        Découvrez nos réalisations et laissez-vous inspirer.
                    </p>
                </div>

                {/* Filtres */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setFiltre(cat)}
                            className={`font-sans text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-200
                ${filtre === cat
                                    ? 'bg-esse-or text-esse-noir border-esse-or'
                                    : 'border-white/20 text-white/50 hover:border-esse-or/50 hover:text-esse-or'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center text-white/40 py-20">Chargement...</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center text-white/30 py-20 font-serif italic">
                        Aucune photo dans cette catégorie pour le moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {filtered.map((photo, i) => (
                            <div key={i} onClick={() => setSelected(photo)}
                                className="aspect-square overflow-hidden rounded-xl group cursor-pointer">
                                <img src={photo.url} alt={photo.description || 'Nail art'}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Lightbox */}
                {selected && (
                    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setSelected(null)}>
                        <div className="max-w-2xl w-full" onClick={e => e.stopPropagation()}>
                            <img src={selected.url} alt={selected.description || 'Nail art'}
                                className="w-full rounded-xl object-contain max-h-[80vh]" />
                            {selected.description && (
                                <p className="text-center font-serif italic text-white/60 mt-4 text-sm">{selected.description}</p>
                            )}
                            <button onClick={() => setSelected(null)}
                                className="block mx-auto mt-4 font-sans text-xs text-white/40 hover:text-esse-or tracking-widest uppercase">
                                Fermer
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}