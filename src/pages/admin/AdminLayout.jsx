import { useEffect, useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Calendar, Image, Scissors, Clock, LogOut, Menu, X } from 'lucide-react'
import api from '../../utils/api'

const LINKS = [
    { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, end: true },
    { to: '/admin/reservations', label: 'Réservations', icon: <Calendar size={18} /> },
    { to: '/admin/disponibilites', label: 'Disponibilités', icon: <Clock size={18} /> },
    { to: '/admin/galerie', label: 'Galerie', icon: <Image size={18} /> },
    { to: '/admin/prestations', label: 'Prestations', icon: <Scissors size={18} /> },
]

export default function AdminLayout() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/api/auth/me').catch(() => navigate('/admin/login'))
    }, [])

    const logout = () => {
        localStorage.removeItem('admin_token')
        navigate('/admin/login')
    }

    return (
        <div className="min-h-screen bg-esse-noir flex">

            {/* Sidebar desktop */}
            <aside className="hidden md:flex flex-col w-60 bg-black/40 border-r border-white/10 p-6">
                <div className="mb-8">
                    <p className="font-script text-2xl text-esse-or">Nails by Esse</p>
                    <p className="font-sans text-[10px] tracking-widest uppercase text-white/30 mt-1">Admin</p>
                </div>

                <nav className="flex-1 space-y-1">
                    {LINKS.map(l => (
                        <NavLink key={l.to} to={l.to} end={l.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg font-sans text-sm transition-all
                ${isActive ? 'bg-esse-fuchsia/20 text-esse-or border border-esse-or/20' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                            {l.icon} {l.label}
                        </NavLink>
                    ))}
                </nav>

                <button onClick={logout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-sans text-sm text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all mt-4">
                    <LogOut size={18} /> Déconnexion
                </button>
            </aside>

            {/* Mobile header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-esse-noir/95 border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <p className="font-script text-2xl text-esse-or">Nails by Esse</p>
                <button onClick={() => setOpen(!open)} className="text-white/60">
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden fixed inset-0 z-40 bg-esse-noir/98 pt-16 px-4">
                    <nav className="space-y-1">
                        {LINKS.map(l => (
                            <NavLink key={l.to} to={l.to} end={l.end}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-base transition-all
                  ${isActive ? 'bg-esse-fuchsia/20 text-esse-or' : 'text-white/60'}`}>
                                {l.icon} {l.label}
                            </NavLink>
                        ))}
                        <button onClick={logout}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-base text-white/30 hover:text-red-400 w-full">
                            <LogOut size={18} /> Déconnexion
                        </button>
                    </nav>
                </div>
            )}

            {/* Contenu principal */}
            <main className="flex-1 p-6 md:p-8 pt-20 md:pt-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}