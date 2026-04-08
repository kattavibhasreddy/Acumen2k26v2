import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroParticles from '../components/HeroParticles'
import InfiniteMenu from '../components/InfiniteMenu'
import TensortonicMesh from '../components/TensortonicMesh'

// ─── Data ────────────────────────────────────────────────────────────────────


const mentors = [
  { name: 'Dr. S. V. Ramana', role: 'Principal', tag: 'PRINCIPAL', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=533&fit=crop' },
  { name: 'Dr. K. Ram Mohan Rao', role: 'HOD, Dept. of IT', tag: 'DEPT HEAD', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=533&fit=crop' },
  { name: 'Mr. Nelaturi David Raju', role: 'Faculty Coordinator', tag: 'COORDINATOR', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=533&fit=crop' },
  { name: 'Mr. Srinivas Chakravarthy', role: 'Faculty Coordinator', tag: 'COORDINATOR', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=533&fit=crop' },
]

const coordinators = [
  { name: 'Hima Atluri', role: 'Overall Acumen Coordinator', tag: 'LEAD', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=533&fit=crop' },
  { name: 'Pavan Kalyan', role: 'Acumen IT Coordinator', tag: 'IT LEAD', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop' },
  { name: 'Hrishitha', role: 'Coordinator', tag: 'COORD', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=533&fit=crop' },
  { name: 'Bhavana', role: 'Coordinator', tag: 'COORD', image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&h=533&fit=crop' },
]

const pastFestImages = [
  { image: 'https://picsum.photos/seed/hackathon/900/900', link: '/events', title: 'HACKATHONS', description: '24-hour intense coding sprints and development.' },
  { image: 'https://picsum.photos/seed/expo/900/900', link: '/events', title: 'TECH EXPO', description: 'Showcasing brilliant student hardware and software.' },
  { image: 'https://picsum.photos/seed/robotics/900/900', link: '/events', title: 'ROBOTICS', description: 'Autonomous arenas and intense bot battles.' },
  { image: 'https://picsum.photos/seed/workshop/900/900', link: '/events', title: 'WORKSHOPS', description: 'Learning from leading industry experts.' },
  { image: 'https://picsum.photos/seed/gaming/900/900', link: '/events', title: 'GAMING ZONE', description: 'E-Sports, LAN parties, and casual gaming.' },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

function SectionTag({ children }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem',
      fontWeight: 600,
      color: '#FFD600',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: '1.5rem',
    }}>{children}</span>
  )
}

// Add this helper component for the Team Cards
const TeamCard = ({ person }) => (
  <div 
    style={{
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid #1a1a1a',
      padding: '1.5rem',
      position: 'relative',
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      cursor: 'crosshair',
      overflow: 'hidden'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = '#FFD600';
      e.currentTarget.style.background = 'rgba(255, 214, 0, 0.02)';
      e.currentTarget.style.transform = 'translateY(-5px)';
      // Removed grayscale toggle
      e.currentTarget.querySelector('.profile-img').style.transform = 'scale(1.05)';
      e.currentTarget.querySelector('.corner-accent').style.opacity = '1';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = '#1a1a1a';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
      e.currentTarget.style.transform = 'translateY(0)';
      // Removed grayscale toggle
      e.currentTarget.querySelector('.profile-img').style.transform = 'scale(1)';
      e.currentTarget.querySelector('.corner-accent').style.opacity = '0';
    }}
  >
    {/* Technical Corner Accent */}
    <div className="corner-accent" style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '20px',
      height: '20px',
      borderTop: '2px solid #FFD600',
      borderRight: '2px solid #FFD600',
      opacity: 0,
      transition: 'opacity 0.3s'
    }} />

    {/* Image Container */}
    <div style={{ 
      width: '100%', 
      aspectRatio: '1/1', 
      background: '#111', 
      marginBottom: '1.5rem',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
      <img 
        className="profile-img"
        src={person.image} 
        alt={person.name} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          // Filter removed here for full color
          transition: 'transform 0.6s ease' 
        }} 
      />
      
      {/* Role Tag Overlay */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        background: '#FFD600',
        color: '#000',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        fontWeight: 900,
        padding: '2px 8px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
      }}>
        {person.tag}
      </div>
    </div>

    {/* Metadata */}
    <div style={{ position: 'relative' }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.1rem',
        fontWeight: 700,
        color: '#FFF',
        textTransform: 'uppercase',
        marginBottom: '0.4rem',
        letterSpacing: '0.02em'
      }}>
        {person.name}
      </h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '4px', height: '4px', background: '#FFD600', borderRadius: '50%' }} />
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          margin: 0
        }}>
          {person.role}
        </p>
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Home() {
  const [cursorBlink, setCursorBlink] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    const interval = setInterval(() => setCursorBlink(v => !v), 530)
    return () => clearInterval(interval)
  }, [])

  const sectionStyle = {
    padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem)',
    borderTop: '1px solid #1a1a1a',
    position: 'relative',
  }

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
  }

  return (
    <main style={{ background: '#0A0A0A', color: '#F5F5F0', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          [SECTION] HERO
      ══════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 2rem 6rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }}>
        {/* Version Badge */}
        <div style={{
          fontFamily: "'Villagers', var(--font-display)",
          fontSize: 'clamp(0.9rem, 2.2vw, 1.6rem)',
          fontWeight: 400,
          letterSpacing: '0.1em',
          color: '#F5F5F0',
          border: '1px solid #3D3D3D',
          padding: '0.4rem 1rem',
          marginBottom: 'clamp(2rem, 5vh, 4rem)',
          marginTop: 'clamp(-13rem, -20vh, -8rem)',
          position: 'relative',
          zIndex: 2,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          textTransform: 'uppercase',
          maxWidth: '90%',
          justifyContent: 'center',
        }}>
          <span style={{ width: '8px', height: '8px', background: '#FFD600', display: 'inline-block', flexShrink: 0 }} />
          VASAVI COLLEGE OF ENGINEERING (A) DEPARTMENT OF IT PRESENTS
        </div>

        {/* Tensortonic Wavy Background Mesh */}
        <TensortonicMesh />

        {/* Floating Particles Text */}
        <HeroParticles />


      </section>

      {/* ══════════════════════════════════════════
          [SECTION] PAST FEST GALLERY 
      ══════════════════════════════════════════ */}
      <section style={{
        background: '#0A0A0A',
        borderTop: '1px solid #1a1a1a',
        padding: 'clamp(2rem, 5vw, 4rem) 0',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 5rem)', width: '100%' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#F5F5F0',
            marginBottom: '2rem',
          }}>
            THE LEGACY.
          </h2>
        </div>

        {/* Anti-Scroll-Trap Wrapper: Perfect square on mobile, sweeping height on desktop */}
        <div className="infinite-menu-wrapper">
          <InfiniteMenu items={pastFestImages} scale={1.0} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          [04] // TEAM
      ══════════════════════════════════════════ */}
      <section style={{ ...sectionStyle, background: '#0A0A0A' }} id="team">
        <div style={containerStyle}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            THE MINDS BEHIND<br />ACUMEN IT.
          </h2>

{/* Faculty Mentors Section */}
<div style={{ marginBottom: '6rem' }}>
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '1rem', 
    marginBottom: '3rem',
    borderBottom: '1px solid #1a1a1a',
    paddingBottom: '1rem' 
  }}>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', textTransform: 'uppercase', color: '#FFF' }}>
      FACULTY MENTORS
    </h2>
  </div>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem'
  }}>
    {mentors.map((person, i) => {
      return <TeamCard key={i} person={person} />
    })}
  </div>
</div>

{/* Student Coordinators Section */}
<div style={{ marginBottom: '6rem' }}>
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '1rem', 
    marginBottom: '3rem',
    borderBottom: '1px solid #1a1a1a',
    paddingBottom: '1rem' 
  }}>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', textTransform: 'uppercase', color: '#FFF' }}>
      Student Coordinators
    </h2>
  </div>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem'
  }}>
    {coordinators.map((person, i) => {
      return <TeamCard key={i} person={person} />
    })}
  </div>
</div>

{/* Sponsors Section */}
<div style={{ marginBottom: '6rem' }}>
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '1rem', 
    marginBottom: '3rem',
    borderBottom: '1px solid #1a1a1a',
    paddingBottom: '1rem' 
  }}>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', textTransform: 'uppercase', color: '#FFF' }}>
      Sponsors
    </h2>
  </div>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  }}>
    {[1, 2, 3].map((num) => (
      <div key={num} style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid #1a1a1a',
        padding: '3rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#FFD600'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
      >
        <img 
          src={`https://picsum.photos/seed/sp${num}/400/200`} 
          alt={`Sponsor ${num}`} 
          style={{ 
            maxWidth: '100%', 
            height: 'auto', 
            filter: 'brightness(1)', 
            opacity: 1,
            transition: 'all 0.4s ease' 
          }}
          onMouseEnter={e => { e.target.style.filter = 'none'; e.target.style.opacity = '1'; }}
          onMouseLeave={e => { e.target.style.filter = 'brightness(1)'; e.target.style.opacity = '1'; }}
        />
      </div>
    ))}
  </div>
</div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          [06] // CTA BANNER — STOP WAITING
      ══════════════════════════════════════════ */}
      <section style={{
        background: '#0A0A0A',
        borderTop: '1px solid #1a1a1a',
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#F5F5F0',
            marginBottom: '1rem',
          }}>
            STOP WAITING.<br />
            <span style={{ color: '#FFD600' }}>START COMPETING.</span>
          </h2>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '0.85rem' }}>
              REGISTER NOW
            </Link>
            <Link to="/events" className="btn-outline" style={{ padding: '1.25rem 3rem', fontSize: '0.85rem' }}>
              VIEW SCHEDULE
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{
        background: '#0A0A0A',
        borderTop: '1px solid #1a1a1a',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem) 2rem',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '18px', height: '18px', background: '#FFD600' }} />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#F5F5F0',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>ACUMEN IT</span>
              </div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#555',
                lineHeight: 1.8,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                THE ANNUAL IT SYMPOSIUM BY VASAVI COLLEGE OF ENGINEERING (A). BUILT FOR BUILDERS WHO DON'T COMPROMISE.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: '#555',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}>NAVIGATE</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[{ label: 'Home', to: '/' }, { label: 'Events', to: '/events' }, { label: 'Register', to: '/register' }].map(item => (
                  <Link key={item.to} to={item.to} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: '#888',
                    textDecoration: 'none',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => e.target.style.color = '#F5F5F0'}
                  onMouseLeave={e => e.target.style.color = '#888'}
                  >{item.label}</Link>
                ))}
              </div>
            </div>

            {/* Venue */}
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: '#555',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}>VENUE</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  'Vasavi College of Engineering',
                  'Ibrahimbagh, Hyderabad',
                  'Telangana — 500031',
                ].map((line, i) => (
                  <p key={i} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: i === 0 ? '#888' : '#555',
                    fontWeight: i === 0 ? 600 : 400,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}>{line}</p>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: '#555',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}>CONTACT</p>
              <a href="mailto:acumenit@vasavi.ac.in" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#FFD600',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                display: 'block',
                marginBottom: '0.5rem',
              }}>acumenit@vasavi.ac.in</a>
              <Link to="/register" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: '#888',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>Register Now →</Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid #1a1a1a',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: '#333',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>© 2026 ACUMEN IT · DEPT. OF INFORMATION TECHNOLOGY · ALL RIGHTS RESERVED.</p>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: '#FFD600',
              letterSpacing: '0.1em',
            }}>V2026.1</p>
          </div>
        </div>
      </footer>
    </main>
  )
}