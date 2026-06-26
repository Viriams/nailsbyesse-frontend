import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const LINKS = [
    { to: '/', label: 'Accueil' },
    { to: '/prestations', label: 'Prestations' },
    { to: '/catalogue', label: 'Catalogue' },
    { to: '/informations', label: 'Infos' },
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
        <header style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            background: scrolled ? '#1A1A1A' : '#1A1A1AEE',
            borderBottom: '1px solid #C2185B44',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            padding: scrolled ? '0.6rem 0' : '1rem 0',
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                {/* Logo */}
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div style={{ lineHeight: 1 }}>
                        <div style={{
                            fontFamily: '"Playfair Display", serif',
                            fontSize: '1.6rem',
                            fontWeight: 700,
                            color: '#F9A825',
                            letterSpacing: '0.05em',
                        }}>
                            Nails by Esse
                        </div>
                        <div style={{
                            fontSize: '0.6rem',
                            letterSpacing: '0.3em',
                            color: 'rgba(255,255,255,0.4)',
                            textTransform: 'uppercase',
                            marginTop: '2px',
                        }}>
                            It's all about your nails
                        </div>
                    </div>
                </Link>

                {/* Desktop nav */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
                    {LINKS.map(link => (
                        <Link key={link.to} to={link.to} style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            letterSpacing: '0.05em',
                            textDecoration: 'none',
                            color: location.pathname === link.to ? '#F9A825' : 'rgba(255,255,255,0.75)',
                            borderBottom: location.pathname === link.to ? '2px solid #C2185B' : '2px solid transparent',
                            paddingBottom: '2px',
                            transition: 'all 0.2s',
                        }}>
                            {link.label}
                        </Link>
                    ))}
                    <Link to="/reservation" style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textDecoration: 'none',
                        color: '#fff',
                        background: 'linear-gradient(135deg, #C2185B, #4A148C)',
                        padding: '0.55rem 1.3rem',
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                        transition: 'opacity 0.2s',
                    }}>
                        Réserver
                    </Link>
                </nav>

                {/* Burger mobile */}
                <button
                    onClick={() => setOpen(!open)}
                    className="show-mobile"
                    style={{ background: 'none', border: 'none', color: '#F9A825', cursor: 'pointer', padding: '0.5rem' }}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Menu mobile */}
            {open && (
                <div style={{
                    background: '#1A1A1A',
                    borderTop: '1px solid #C2185B44',
                    padding: '1rem 1.5rem',
                }}>
                    {[...LINKS, { to: '/reservation', label: 'Réserver 💅' }].map(link => (
                        <Link key={link.to} to={link.to} style={{
                            display: 'block',
                            padding: '0.75rem 0',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '1rem',
                            textDecoration: 'none',
                            color: location.pathname === link.to ? '#F9A825' : 'rgba(255,255,255,0.7)',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                        }}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
        </header>
    )
}