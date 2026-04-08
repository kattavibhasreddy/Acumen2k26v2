import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : '#0A0A0A',
        borderBottom: '1px solid #1a1a1a',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        {/* LOGO */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          textDecoration: 'none',
          flexShrink: 0,
        }}>
          <div style={{
            width: '18px',
            height: '18px',
            backgroundColor: '#FFD600',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: '#F5F5F0',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            ACUMEN IT 2026
          </span>
        </Link>

        {/* CENTER NAV LINKS — Desktop */}
        <div className="nav-center" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
        }}>
          {[
            { label: 'Home', to: '/' },
            { label: 'Events', to: '/events' },
            { label: 'Register', to: '/register' },
          ].map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `top-nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label.toUpperCase()}
            </NavLink>
          ))}
        </div>

        {/* RIGHT ACTIONS — Desktop */}
        <div className="nav-right" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexShrink: 0,
        }}>
          <Link to="/register" style={{
            background: '#FFD600',
            color: '#000',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.6rem 1.25rem',
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.target.style.background = '#ffe033'}
          onMouseLeave={e => e.target.style.background = '#FFD600'}
          >
            REGISTER NOW
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="mobile-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#F5F5F0',
            flexDirection: 'column',
            gap: '5px',
          }}
          aria-label="Toggle menu"
        >
          <span style={{ display: 'block', width: '22px', height: '1px', background: mobileOpen ? '#FFD600' : '#F5F5F0', transition: 'all 0.3s ease', transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '1px', background: '#F5F5F0', opacity: mobileOpen ? 0 : 1, transition: 'all 0.3s ease' }} />
          <span style={{ display: 'block', width: '22px', height: '1px', background: mobileOpen ? '#FFD600' : '#F5F5F0', transition: 'all 0.3s ease', transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          background: '#0A0A0A',
          borderBottom: '1px solid #1a1a1a',
          zIndex: 999,
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}>
          {[
            { label: 'Home', to: '/' },
            { label: 'Events', to: '/events' },
            { label: 'Register', to: '/register' },
          ].map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isActive ? '#FFD600' : '#888',
                textDecoration: 'none',
                padding: '0.75rem 0',
                borderBottom: '1px solid #1a1a1a',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        .top-nav-link {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #888;
          text-decoration: none;
          padding: 0.4rem 0.9rem;
          transition: color 0.2s ease;
          white-space: nowrap;
        }
        .top-nav-link:hover { color: #F5F5F0; }
        .top-nav-link.active { 
          color: #F5F5F0;
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-color: #FFD600;
        }

        @media (max-width: 768px) {
          .nav-center { display: none !important; }
          .nav-right { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}