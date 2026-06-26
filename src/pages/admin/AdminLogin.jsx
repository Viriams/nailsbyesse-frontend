import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import api from '../../utils/api'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const res = await api.post('/api/auth/login', { email, password })
            localStorage.setItem('admin_token', res.data.access_token)
            navigate('/admin')
        } catch (e) {
            setError(e.response?.data?.detail || 'Email ou mot de passe incorrect')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-esse-noir flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

                <div className="text-center mb-8">
                    <p className="font-script text-4xl text-esse-or mb-1">Nails by Esse</p>
                    <p className="font-sans text-xs tracking-widest uppercase text-white/30">
                        Espace administration
                    </p>
                </div>

                <form onSubmit={handleLogin} className="card-dark p-8 space-y-5">
                    <h1 className="font-display text-xl text-white text-center mb-2">Connexion</h1>
                    <div className="gold-divider" />

                    <div>
                        <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">
                            Email
                        </label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="admin@nailsbyesse.com" required
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3
                         text-white font-sans text-sm focus:border-esse-or outline-none" />
                    </div>

                    <div>
                        <label className="font-sans text-xs tracking-widest uppercase text-esse-or block mb-2">
                            Mot de passe
                        </label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••" required
                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3
                         text-white font-sans text-sm focus:border-esse-or outline-none" />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                            <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                            <p className="font-sans text-sm text-red-400">{error}</p>
                        </div>
                    )}

                    <button type="submit" disabled={loading}
                        className="btn-primary w-full disabled:opacity-40">
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    )
}