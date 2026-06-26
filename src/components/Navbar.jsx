import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const LINKS = [
    { to: '/', label: 'Accueil' },
    { to: '/prestations', label: 'Prestations' },
    { to: '/catalogue', label: 'Catalogue' },
    { to: '/informations', label: 'Infos' },
    { to: '/reservation', label: 'Réserver', cta: true },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])

    useEffect(() => setOpen(false), [location])

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${scrolled ? 'bg-esse-noir/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex flex-col leading-none group">
                    <span className="font-script text-3xl text-esse-or group-hover:text-yellow-300 transition-colors">
                        Nails by Esse
                    </span>
                    <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/40 -mt-1">
                        It's all about your nails
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {LINKS.map(link => link.cta ? (
                        <Link key={link.to} to={link.to} className="btn-primary text-sm px-5 py-2">
                            {link.label}
                        </Link>
                    ) : (
                        <Link key={link.to} to={link.to}
                            className={`font-sans text-sm tracking-wide transition-colors hover:text-esse-or
                ${location.pathname === link.to ? 'text-esse-or' : 'text-white/70'}`}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Burger mobile */}
                <button onClick={() => setOpen(!open)} className="md:hidden text-white/80 hover:text-esse-or">
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Menu mobile */}
            {open && (
                <div className="md:hidden bg-esse-noir/98 backdrop-blur-lg border-t border-white/10">
                    <nav className="flex flex-col px-4 py-4 gap-1">
                        {LINKS.map(link => (
                            <Link key={link.to} to={link.to}
                                className={`font-sans text-base py-3 px-4 rounded-lg transition-colors
                  ${link.cta
                                        ? 'bg-esse-fuchsia text-white text-center mt-2'
                                        : location.pathname === link.to
                                            ? 'text-esse-or bg-white/5'
                                            : 'text-white/70 hover:text-esse-or hover:bg-white/5'
                                    }`}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    )
}