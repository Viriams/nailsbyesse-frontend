import { useEffect, useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import api from '../utils/api'

const ETAPES = ['Prestation', 'Date & Heure', 'Vos infos', 'Confirmation']

export default function Reservation() {
    const [etape, setEtape] = useState(0)
    const [prestations, setPrestations] = useState({})
    const [prestation, setPrestation] = useState(null)
    const [date, setDate] = useState('')
    const [creneaux, setCreneaux] = useState([])
    const [creneau, setCreneau] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState({
        nom: '', prenom: '', email: '', telephone: '',
        consentement_photo: false, notes: ''
    })

    useEffect(() => {
        api.get('/api/prestations')
            .then(r => setPrestations(r.data.categories))
            .catch(() => { })
    }, [])

    useEffect(() => {
        if (!date) return
        setCreneaux([])
        setCreneau(null)
        api.get(`/api/disponibilites/${date}`)
            .then(r => setCreneaux(r.data.creneaux))
            .catch(() => { })
    }, [date])

    const minDate = () => {
        const d = new Date()
        d.setDate(d.getDate() + 1)
        return d.toISOString().split('T')[0]
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError('')
        try {
            await api.post('/api/reservations', {
                nom: form.nom,
                prenom: form.prenom,
                email: form.email,
                telephone: form.telephone,
                date: date,
                heure_debut: creneau.heure_debut,
                prestation_id: prestation.id,
                consentement_photo: form.consentement_photo,
                notes: form.notes,
            })
            setSuccess(true)
        } catch (e) {
            setError(e.response?.data?.detail || 'Une erreur est survenue')
        } finally {
            setLoading(false)
        }
    }

    if (success) return (
        <div className="pt-24 pb-20 px-4 min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full card-dark p-8 text-center">
                <CheckCircle size={56} className="text-green-400 mx-auto mb-4" />
                <h2 className="font-display text-2xl text-white mb-3">Réservation confirmée !</h2>
                <div className="gold-divider mb-4" />
                <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
                    Vous allez recevoir un email de confirmation avec tous les détails
                    de votre rendez-vous. À bientôt ! 💅
                </p>
                <button onClick={() => { setSuccess(false); setEtape(0); setPrestation(null); setDate(''); setCreneau(null) }}
                    className="btn-outline text-sm px-6 py-2">
                    Faire une autre réservation
                </button>
            </div>
        </div>
    )

    return (
        <div className="pt-24 pb-20 px-4 min-h-screen">
            <div className="max-w-2xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <p className="section-subtitle">En ligne</p>
                    <h1 className="section-title text-4xl">Réservation</h1>
                    <div className="gold-divider" />
                </div>

                {/* Stepper */}
                <div className="flex items-center justify-between mb-10 px-2">
                    {ETAPES.map((e, i) => (
                        <div key={i} className="flex items-center flex-1">
                            <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-bold transition-all
                  ${i < etape ? 'bg-esse-or text-esse-noir'
                                        : i === etape ? 'bg-esse-fuchsia text-white'
                                            : 'bg-white/10 text-white/30'}`}>
                                    {i < etape ? '✓' : i + 1}
                                </div>
                                <span className={`font-sans text-[10px] mt-1 tracking-wide hidden sm:block
                  ${i === etape ? 'text-esse-or' : 'text-white/30'}`}>
                                    {e}
                                </span>
                            </div>
                            {i < ETAPES.length - 1 && (
                                <div className={`flex-1 h-px mx-2 transition-all ${i < etape ? 'bg-esse-or' : 'bg-white/10'}`} />
                            )}
                        </div>
                    ))}
                </div>

                <div className="card-dark p-6 md:p-8">

                    {/* ÉTAPE 1 — Prestation */}
                    {etape === 0 && (
                        <div>
                            <h2 className="font-display text-xl text-white mb-6">Choisissez votre prestation</h2>
                            <div className="space-y-4">
                                {Object.entries(prestations).map(([cat, items]) => (
                                    <div key={cat}>
                                        <p className="font-sans text-xs tracking-widest uppercase text-esse-or mb-3">{cat}</p>
                                        <div className="space-y-2">
                                            {items.map(item => (
                                                <button key={item.id} onClick={() => setPrestation(item)}
                                                    className={`w-full flex justify-between items-center px-4 py-3 rounded-lg border transition-all text-left
                            ${prestation?.id === item.id
                                                            ? 'border-esse-or bg-esse-or/10 text-esse-or'
                                                            : 'border-white/10 text-white/60 hover:border-white/30'}`}>
                                                    <span className="font-serif italic text-base">{item.nom}</span>
                                                    <span className="font-sans text-sm font-medium ml-4 whitespace-nowrap">
                                                        {item.prix ? `${item.prix.toLocaleString()} FCFA` : item.prix_texte}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setEtape(1)} disabled={!prestation}
                                className="btn-primary w-full mt-8 disabled:opacity-40 disabled:cursor-not-allowed">
                                Continuer
                            </button>
                        </div>
                    )}

                    {/* ÉTAPE 2 — Date & Heure */}
                    {etape === 1 && (
                        <div>
                            <h2 className="font-display text-xl text-white mb-6">Choisissez une date</h2>

                            <div className="mb-6">
                                <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">
                                    Date souhaitée
                                </label>
                                <input type="date" value={date} min={minDate()}
                                    onChange={e => setDate(e.target.value)}
                                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3
                             text-white font-sans text-sm focus:border-esse-or outline-none
                             [color-scheme:dark]" />
                            </div>

                            {date && (
                                <div>
                                    <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-3">
                                        Créneaux disponibles
                                    </label>
                                    {creneaux.length === 0 ? (
                                        <p className="font-sans text-sm text-white/40 italic py-4">
                                            Aucun créneau disponible pour cette date.
                                        </p>
                                    ) : (
                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                            {creneaux.map((c, i) => (
                                                <button key={i} onClick={() => setCreneau(c)}
                                                    className={`py-2 px-3 rounded-lg border text-sm font-sans transition-all
                            ${creneau?.heure_debut === c.heure_debut
                                                            ? 'border-esse-or bg-esse-or/10 text-esse-or'
                                                            : 'border-white/10 text-white/60 hover:border-white/30'}`}>
                                                    {c.heure_debut.slice(0, 5)}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex gap-3 mt-8">
                                <button onClick={() => setEtape(0)} className="btn-outline flex-1">Retour</button>
                                <button onClick={() => setEtape(2)} disabled={!date || !creneau}
                                    className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed">
                                    Continuer
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 3 — Infos personnelles */}
                    {etape === 2 && (
                        <div>
                            <h2 className="font-display text-xl text-white mb-6">Vos informations</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">Prénom *</label>
                                        <input type="text" value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })}
                                            placeholder="Votre prénom"
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-sans text-sm focus:border-esse-or outline-none" />
                                    </div>
                                    <div>
                                        <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">Nom *</label>
                                        <input type="text" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                                            placeholder="Votre nom"
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-sans text-sm focus:border-esse-or outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">Email *</label>
                                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                                        placeholder="votre@email.com"
                                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-sans text-sm focus:border-esse-or outline-none" />
                                </div>
                                <div>
                                    <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">Téléphone *</label>
                                    <input type="tel" value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })}
                                        placeholder="+229 97 00 00 00"
                                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-sans text-sm focus:border-esse-or outline-none" />
                                </div>
                                <div>
                                    <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">Notes (optionnel)</label>
                                    <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                                        placeholder="Précisions sur votre demande..."
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white font-sans text-sm focus:border-esse-or outline-none resize-none" />
                                </div>
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" checked={form.consentement_photo}
                                        onChange={e => setForm({ ...form, consentement_photo: e.target.checked })}
                                        className="mt-0.5 accent-esse-or" />
                                    <span className="font-sans text-sm text-white/50 leading-relaxed">
                                        J'accepte que mes ongles soient photographiés et publiés sur les réseaux sociaux de Nails By Esse.
                                    </span>
                                </label>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <button onClick={() => setEtape(1)} className="btn-outline flex-1">Retour</button>
                                <button onClick={() => setEtape(3)}
                                    disabled={!form.nom || !form.prenom || !form.email || !form.telephone}
                                    className="btn-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed">
                                    Continuer
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ÉTAPE 4 — Récapitulatif */}
                    {etape === 3 && (
                        <div>
                            <h2 className="font-display text-xl text-white mb-6">Récapitulatif</h2>

                            <div className="space-y-3 mb-8">
                                {[
                                    { label: 'Prestation', value: prestation?.nom },
                                    { label: 'Tarif', value: prestation?.prix ? `${prestation.prix.toLocaleString()} FCFA` : prestation?.prix_texte },
                                    { label: 'Date', value: new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
                                    { label: 'Heure', value: creneau?.heure_debut?.slice(0, 5) },
                                    { label: 'Nom', value: `${form.prenom} ${form.nom}` },
                                    { label: 'Email', value: form.email },
                                    { label: 'Téléphone', value: form.telephone },
                                    { label: 'Consentement photo', value: form.consentement_photo ? 'Oui' : 'Non' },
                                ].map((r, i) => (
                                    <div key={i} className="flex justify-between items-start py-2 border-b border-white/5">
                                        <span className="font-sans text-xs tracking-wider uppercase text-white/30">{r.label}</span>
                                        <span className="font-serif italic text-white/80 text-sm text-right ml-4">{r.value}</span>
                                    </div>
                                ))}
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                                    <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                                    <p className="font-sans text-sm text-red-400">{error}</p>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button onClick={() => setEtape(2)} className="btn-outline flex-1">Retour</button>
                                <button onClick={handleSubmit} disabled={loading}
                                    className="btn-primary flex-1 disabled:opacity-40">
                                    {loading ? 'Envoi...' : 'Confirmer la réservation'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}