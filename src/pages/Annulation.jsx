import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle, AlertCircle } from 'lucide-react'
import api from '../utils/api'

export default function Annulation() {
    const { token } = useParams()
    const [status, setStatus] = useState('loading')
    const [message, setMessage] = useState('')

    useEffect(() => {
        api.get(`/api/reservations/annuler/${token}`)
            .then(r => { setStatus('success'); setMessage(r.data.message) })
            .catch(e => { setStatus('error'); setMessage(e.response?.data?.detail || 'Une erreur est survenue') })
    }, [token])

    return (
        <div className="pt-24 pb-20 px-4 min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full card-dark p-8 text-center">
                {status === 'loading' && (
                    <p className="font-sans text-white/50">Annulation en cours...</p>
                )}
                {status === 'success' && (
                    <>
                        <CheckCircle size={56} className="text-green-400 mx-auto mb-4" />
                        <h2 className="font-display text-2xl text-white mb-3">Rendez-vous annulé</h2>
                        <div className="gold-divider mb-4" />
                        <p className="font-sans text-sm text-white/60 mb-6">{message}</p>
                        <Link to="/reservation" className="btn-primary inline-block">
                            Reprendre un rendez-vous
                        </Link>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <AlertCircle size={56} className="text-red-400 mx-auto mb-4" />
                        <h2 className="font-display text-2xl text-white mb-3">Erreur</h2>
                        <div className="gold-divider mb-4" />
                        <p className="font-sans text-sm text-white/60 mb-6">{message}</p>
                        <Link to="/" className="btn-outline inline-block">
                            Retour à l'accueil
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}