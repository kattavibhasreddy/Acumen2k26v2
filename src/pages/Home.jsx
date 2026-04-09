import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroParticles from '../components/HeroParticles'
import InfiniteMenu from '../components/InfiniteMenu'
import TensortonicMesh from '../components/TensortonicMesh'

// ─── Data ────────────────────────────────────────────────────────────────────


const mentors = [
  { name: 'Dr. S. V. Ramana', role: 'Principal', image: '/faculty/principal.webp' },
  { name: 'Dr. K. Ram Mohan Rao', role: 'HOD, Dept. of IT', image: '/faculty/hod.webp' },
  { name: 'Ms. Aruna', role: 'Faculty Coordinator', image: '/faculty/aruna.jpeg' },
]

const coordinators = [
  { name: 'Raja Sheshu', role: 'Overall Acumen IT Coordinator - Head of Marketing & Logistics', image: '/Acumen Coordinators/Shesh.jpg' },
  { name: 'Vaishnavi', role: 'Overall Coordinator - Head of Design & Technology', image: '/Acumen Coordinators/Vaishnavi.JPG' },
  { name: 'Sharath', role: 'Overall Coordinator - Head of Logistics', image: '/Acumen Coordinators/Sharath.jpg' },
  { name: 'Saakshi', role: 'Overall Coordinator - Head of Marketing', image: '/Acumen Coordinators/Saakshi.jpg' },
  { name: 'Aashritha', role: 'Overall Coordinator - Head of Marketing', image: '/Acumen Coordinators/Aashritha.jpg' },
  { name: 'Goutham Siddharth', role: 'Creative Head', image: '/Acumen Coordinators/Goutham.jpg' },
  { name: 'Harika', role: 'Overall Coordinator', image: '/Acumen Coordinators/Harika.jpg' },
  { name: 'Nithya', role: 'Overall Coordinator', image: '/Acumen Coordinators/Nithya.jpg' },
  { name: 'Jai Chandra', role: 'Technology Lead', image: '/Acumen Coordinators/Jai Chandra.jpg' },
  { name: 'Sirivennela', role: 'Design Lead', image: '/Acumen Coordinators/Sirivennela.jpg' },
  { name: 'Kavya', role: 'Design Lead', image: '/Acumen Coordinators/Kavya.jpg' },
  { name: 'Vishnu', role: 'Marketing Lead', image: '/Acumen Coordinators/Vishnu.jpg' },
  { name: 'Shashank', role: 'Logistics Lead', image: '/Acumen Coordinators/Shashank.jpg' },
  { name: 'Vasist', role: 'Logistics Lead', image: '/Acumen Coordinators/Vasist.jpg' },
  { name: 'Viveak', role: 'Dev Lead', image: '/Acumen Coordinators/Viveak.jpg' },
  { name: 'Vibhas', role: 'Dev Lead', image: '/Acumen Coordinators/Vibhas.jpg' },
  { name: 'Yashwanth', role: 'Finance Lead', image: '/Acumen Coordinators/Yashwanth.jpg' },
]

const sponsors = [
  { name: 'HP', image: '/Sponsors/HP.jpeg' },
  { name: 'Rinno', image: '/Sponsors/Rinno.png' },
  { name: 'Sapphire', image: '/Sponsors/Sapphire.png' },
]

const pastFestImages = [
  { image: '/Acumen gallery/DSC03964.JPG' },
  { image: '/Acumen gallery/DSC03968.JPG' },
  { image: '/Acumen gallery/DSC03977.JPG' },
  { image: '/Acumen gallery/DSC03987.JPG' },
  { image: '/Acumen gallery/DSC03993.JPG' },
  { image: '/Acumen gallery/DSC03994.JPG' },
  { image: '/Acumen gallery/DSC03995.JPG' },
  { image: '/Acumen gallery/DSC04038.JPG' },
  { image: '/Acumen gallery/DSC04235.JPG' },
  { image: '/Acumen gallery/DSC04397.JPG' },
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

const SponsorCard = ({ sponsor, tier }) => (
  <div 
    style={{
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid #1a1a1a',
      padding: '2rem',
      position: 'relative',
      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      minHeight: '220px'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = '#FFD600';
      e.currentTarget.style.background = 'rgba(255, 214, 0, 0.02)';
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.querySelector('.sponsor-logo').style.transform = 'scale(1.1)';
      e.currentTarget.querySelector('.corner-accent').style.opacity = '1';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = '#1a1a1a';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.querySelector('.sponsor-logo').style.transform = 'scale(1)';
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

    {/* Tier Tag */}
    <div style={{
      position: 'absolute',
      top: '0',
      left: '0',
      background: tier === 'PLATINUM' ? '#FFD600' : '#1a1a1a',
      color: tier === 'PLATINUM' ? '#000' : '#888',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.55rem',
      fontWeight: 900,
      padding: '4px 10px',
      textTransform: 'uppercase',
      letterSpacing: '0.15em'
    }}>
      {tier} // PARTNER
    </div>

    {/* Logo Container */}
    <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        className="sponsor-logo"
        src={sponsor.image} 
        alt="Sponsor Logo" 
        style={{ 
          maxWidth: '80%', 
          maxHeight: '100%', 
          objectFit: 'contain',
          transition: 'transform 0.5s ease',
        }} 
      />
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
      STUDENT COORDINATORS
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

{/* ══════════════════════════════════════════
    [SECTION] SPONSORS
══════════════════════════════════════════ */}
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
      SPONSORS
    </h2>
  </div>

  <div style={{
    display: 'grid',
    // Forces exactly 3 columns on desktop, 1 on mobile
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem'
  }}>
    {sponsors.map((sp) => (
      <div 
        key={sp.name} 
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid #1a1a1a',
          padding: '3rem 2rem',
          position: 'relative',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          minHeight: '220px'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#FFD600';
          e.currentTarget.style.background = 'rgba(255, 214, 0, 0.02)';
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.querySelector('.sponsor-logo').style.filter = 'brightness(1.2)';
          e.currentTarget.querySelector('.corner-accent').style.opacity = '1';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#1a1a1a';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.querySelector('.sponsor-logo').style.filter = 'brightness(0.8)';
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
        <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            className="sponsor-logo"
            src={sp.image} 
            alt={sp.name} 
            style={{ 
              maxWidth: '125%', 
              maxHeight: '200%', 
              objectFit: 'contain',
              filter: 'brightness(1)',
              transition: 'all 0.4s ease' 
            }} 
          />
        </div>
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