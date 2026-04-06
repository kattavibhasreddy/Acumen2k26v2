import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CountdownTimer from '../components/CountdownTimer'
import HeroParticles from '../components/HeroParticles'
import InfiniteMenu from '../components/InfiniteMenu'

// ─── Data ────────────────────────────────────────────────────────────────────


const mentors = [
  { name: 'Dr. S. V. Ramana', role: 'Principal', tag: 'PRINCIPAL' },
  { name: 'Dr. K. Ram Mohan Rao', role: 'HOD, Dept. of IT', tag: 'DEPT HEAD' },
  { name: 'Mr. Nelaturi David Raju', role: 'Faculty Coordinator', tag: 'COORDINATOR' },
  { name: 'Mr. Srinivas Chakravarthy', role: 'Faculty Coordinator', tag: 'COORDINATOR' },
]

const coordinators = [
  { name: 'Hima Atluri', role: 'Overall Acumen Coordinator', tag: 'LEAD' },
  { name: 'Pavan Kalyan', role: 'Acumen IT Coordinator', tag: 'IT LEAD' },
  { name: 'Hrishitha', role: 'Coordinator', tag: 'COORD' },
  { name: 'Bhavana', role: 'Coordinator', tag: 'COORD' },
]

const pastFestImages = [
  { image: 'https://picsum.photos/seed/hackathon/900/900', link: '/events', title: 'HACKATHONS', description: '24-hour intense coding sprints and development.' },
  { image: 'https://picsum.photos/seed/expo/900/900', link: '/events', title: 'TECH EXPO', description: 'Showcasing brilliant student hardware and software.' },
  { image: 'https://picsum.photos/seed/robotics/900/900', link: '/events', title: 'ROBOTICS', description: 'Autonomous arenas and intense bot battles.' },
  { image: 'https://picsum.photos/seed/workshop/900/900', link: '/events', title: 'WORKSHOPS', description: 'Learning from leading industry experts.' },
  { image: 'https://picsum.photos/seed/gaming/900/900', link: '/events', title: 'GAMING ZONE', description: 'E-Sports, LAN parties, and casual gaming.' },
]


const eventHighlights = [
  { num: '[01]', title: 'CODE GENESIS', desc: 'Competitive programming at its finest. 3-hour sprint across algorithms, data structures, and system design.', tag: 'TECHNICAL' },
  { num: '[02]', title: 'CYBER DEFENSE', desc: 'Capture the flag. Exploit vulnerabilities. Defend your stack. 24-hour cybersecurity challenge.', tag: 'SECURITY' },
  { num: '[03]', title: 'AI HACKATHON', desc: 'Build real ML solutions. Datasets provided. Judged on innovation, accuracy, and impact.', tag: 'ML / AI' },
  { num: '[04]', title: 'WEBATHON', desc: 'Design and deploy a full-stack web application in under 4 hours. Speed meets craft.', tag: 'WEB DEV' },
  { num: '[05]', title: 'PROJECT EXPO', desc: 'Showcase final-year thesis and innovation projects to industry judges and scholarship panels.', tag: 'SHOWCASE' },
  { num: '[06]', title: 'PAPER PRESENTATION', desc: 'Present cutting-edge research to domain-expert panelists. Best paper wins publication consideration.', tag: 'RESEARCH' },
]

const stats = [
  { value: '15+', label: 'EVENTS' },
  { value: '500+', label: 'PARTICIPANTS' },
  { value: '1 DAY', label: 'SYMPOSIUM' },
  { value: '₹50K+', label: 'PRIZE POOL' },
]

const faqs = [
  {
    q: 'Who can participate in Acumen IT 2026?',
    a: 'Acumen IT is open to all college students across India. Both individual and team registrations are accepted depending on the event. Vasavi College students get priority slots.'
  },
  {
    q: 'Is there a registration fee?',
    a: 'Yes, fees vary by event — ranging from ₹30 to ₹225. Some events offer team pricing. All payments are collected on-site. Detailed pricing is on the Register page.'
  },
  {
    q: 'Where is the venue?',
    a: 'Vasavi College of Engineering (Autonomous), Ibrahimbagh, Hyderabad, Telangana — 500031. The event is fully on-campus on April 16, 2026.'
  },
  {
    q: 'Can I register for multiple events?',
    a: 'Yes! You can register for as many events as you like. Use the multi-event registration form and select all events you wish to participate in.'
  },
  {
    q: 'Are participants from outside colleges welcome?',
    a: 'Absolutely. Acumen IT is an inter-college symposium. Students from any recognized institution are welcome. Bring your college ID for verification.'
  },
]

// ─── Sub-Components ───────────────────────────────────────────────────────────

function Cursor({ name, color, style }) {
  return (
    <div style={{
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '4px',
      pointerEvents: 'none',
      animation: 'float-cursor 6s ease-in-out infinite',
      animationDelay: style?.animationDelay || '0s',
      ...style,
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M0 0L8 14L10.5 8.5L16 6L0 0Z" fill={color} />
      </svg>
      <span style={{
        background: color,
        color: '#000',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        fontWeight: 700,
        padding: '2px 6px',
        whiteSpace: 'nowrap',
        letterSpacing: '0.05em',
      }}>{name}</span>
    </div>
  )
}

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

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderTop: '1px solid #1a1a1a',
      padding: '1.5rem 0',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '2rem',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#F5F5F0',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          lineHeight: 1.5,
        }}>{q}</span>
        <span style={{
          flexShrink: 0,
          width: '28px',
          height: '28px',
          border: '1px solid #3D3D3D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '1rem',
          color: open ? '#FFD600' : '#888',
          transition: 'all 0.3s ease',
          transform: open ? 'rotate(45deg)' : 'none',
        }}>+</span>
      </button>
      {open && (
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: '#888',
          lineHeight: 1.8,
          letterSpacing: '0.03em',
          marginTop: '1rem',
          paddingRight: '3rem',
        }}>{a}</p>
      )}
    </div>
  )
}

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
        {/* Floating Cursors */}
        <Cursor name="ALEX_K" color="#FFD600" style={{ top: '30%', left: '20%', animationDelay: '0s' }} />
        <Cursor name="SARA_M" color="#FF6B35" style={{ top: '22%', right: '18%', animationDelay: '-2s' }} />
        <Cursor name="MILA_V" color="#4DE3B0" style={{ top: '45%', left: '12%', animationDelay: '-4s' }} />

        {/* Version Badge */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          color: '#F5F5F0',
          border: '1px solid #3D3D3D',
          padding: '0.4rem 1rem',
          marginBottom: '3rem',
          marginTop: '-3rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          textTransform: 'uppercase',
        }}>
          <span style={{ width: '8px', height: '8px', background: '#FFD600', display: 'inline-block' }} />
          VASAVI COLLEGE OF ENGINEERING(A) DEPARTMENT OF IT PRESENTS
        </div>

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
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#FFD600',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1rem',
          }}>[ PAST EDITIONS ]</span>
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
          [SECTION] TRUSTED BY / AFFILIATION TICKER
      ══════════════════════════════════════════ */}
      <section style={{
        background: '#0A0A0A',
        borderTop: '1px solid #1a1a1a',
        borderBottom: '1px solid #1a1a1a',
        padding: '3rem clamp(1.5rem, 5vw, 5rem)',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#555',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            textAlign: 'center',
          }}>ORGANIZED BY</p>
          <div style={{
            display: 'flex',
            gap: 'clamp(2rem, 6vw, 6rem)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            {['VASAVI COLLEGE', 'DEPT. OF IT', 'ACUMEN 2026', 'HYDERABAD', 'SINCE 2010'].map(name => (
              <span key={name} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#3D3D3D',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          [01] // EVENTS
      ══════════════════════════════════════════ */}
      <section style={{ ...sectionStyle, background: '#0A0A0A' }} id="events">
        <div style={containerStyle}>
          <SectionTag>[01] // EVENTS</SectionTag>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            EVERYTHING YOU<br />COMPETE FOR.
          </h2>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#888',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '4rem',
          }}>
            TECHNICAL. CREATIVE. COMPETITIVE. 15+ EVENTS ACROSS ALL DOMAINS.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1px',
            background: '#1a1a1a',
            border: '1px solid #1a1a1a',
          }}>
            {eventHighlights.map((event, i) => (
              <div key={i} style={{
                background: '#0A0A0A',
                padding: '2.5rem',
                transition: 'background 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#111'}
              onMouseLeave={e => e.currentTarget.style.background = '#0A0A0A'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: i === 0 ? '#FFD600' : i === 1 ? '#FF6B35' : 'transparent',
                    border: i < 2 ? 'none' : '1px solid #3D3D3D',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: '#555',
                    border: '1px solid #222',
                    padding: '2px 8px',
                    textTransform: 'uppercase',
                  }}>{event.tag}</span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                  color: '#F5F5F0',
                }}>{event.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#888',
                  lineHeight: 1.7,
                  letterSpacing: '0.02em',
                  marginBottom: '1.5rem',
                }}>{event.desc}</p>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: '#555',
                  letterSpacing: '0.1em',
                  border: '1px solid #222',
                  padding: '3px 8px',
                  display: 'inline-block',
                  textTransform: 'uppercase',
                }}>{event.num.replace('[0', '').replace(']', '').padStart(2, '0')} TECHNICAL</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/events" className="btn-outline">
              VIEW ALL EVENTS &gt;
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          [02] // COUNTDOWN / HOW IT WORKS  
      ══════════════════════════════════════════ */}
      <section style={{ ...sectionStyle, background: '#111' }} id="schedule">
        <div style={containerStyle}>
          <SectionTag>[02] // SYMPOSIUM DAY</SectionTag>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '4rem',
          }}>
            ONE DAY.<br />INFINITE POSSIBILITIES.
          </h2>

          {/* Steps */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1px',
            background: '#1a1a1a',
            border: '1px solid #1a1a1a',
            marginBottom: '4rem',
          }}>
            {[
              { n: '01', title: 'REGISTER', sub: 'SECURE YOUR SLOT.', desc: 'Fill the form. Select your events. Show up on April 16.' },
              { n: '02', title: 'COMPETE', sub: 'GIVE IT YOUR ALL.', desc: 'Every event. Every challenge. Technical. Creative. Competitive.' },
              { n: '03', title: 'WIN', sub: 'CLAIM YOUR GLORY.', desc: 'Prizes. Certificates. Recognition. The best walk away rewarded.' },
            ].map((step, i) => (
              <div key={i} style={{
                background: i === 1 ? '#111' : '#0A0A0A',
                padding: '2.5rem',
                border: i === 1 ? '1px solid #FFD600' : 'none',
                margin: i === 1 ? '-1px' : '0',
                position: 'relative',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: '#FFD600',
                  marginBottom: '1.5rem',
                  lineHeight: 1,
                }}>{step.n}</div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#F5F5F0',
                  marginBottom: '0.25rem',
                }}>{step.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: '#888',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem',
                }}>{step.sub}</p>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#666',
                  lineHeight: 1.7,
                }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Countdown */}
          <div style={{
            border: '1px solid #1a1a1a',
            padding: '3rem',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: '#888',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}>// SYMPOSIUM COUNTDOWN</p>
            <CountdownTimer />
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#555',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginTop: '2rem',
            }}>APRIL 16, 2026 · 09:00 AM IST · HYDERABAD</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          [03] // BY THE NUMBERS — YELLOW SECTION
      ══════════════════════════════════════════ */}
      <section style={{
        background: '#FFD600',
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem)',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: '#000',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '3rem',
            opacity: 0.6,
          }}>[03] // BY THE NUMBERS</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0',
          }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                padding: '2rem',
                borderLeft: i > 0 ? '1px solid rgba(0,0,0,0.15)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  fontWeight: 700,
                  color: '#000',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  marginBottom: '0.5rem',
                }}>{stat.value}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'rgba(0,0,0,0.6)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          [04] // TEAM
      ══════════════════════════════════════════ */}
      <section style={{ ...sectionStyle, background: '#0A0A0A' }} id="team">
        <div style={containerStyle}>
          <SectionTag>[04] // THE TEAM</SectionTag>
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
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#888',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '4rem',
          }}>DRIVING INNOVATION. ENABLING EXCELLENCE.</p>

          {/* Faculty Mentors */}
          <div style={{ marginBottom: '4rem' }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: '#555',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
              borderBottom: '1px solid #1a1a1a',
              paddingBottom: '1rem',
            }}>// FACULTY MENTORS</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '1px',
              background: '#1a1a1a',
              border: '1px solid #1a1a1a',
            }}>
              {mentors.map((m, i) => (
                <div key={i} style={{
                  background: '#0A0A0A',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#111'}
                onMouseLeave={e => e.currentTarget.style.background = '#0A0A0A'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      background: '#1a1a1a',
                      border: '1px solid #3D3D3D',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: '#FFD600',
                    }}>{m.name.charAt(0)}</div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      color: '#555',
                      border: '1px solid #222',
                      padding: '2px 6px',
                      textTransform: 'uppercase',
                    }}>{m.tag}</span>
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#F5F5F0',
                      marginBottom: '0.25rem',
                    }}>{m.name}</p>
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: '#888',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}>{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Coordinators */}
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: '#555',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
              borderBottom: '1px solid #1a1a1a',
              paddingBottom: '1rem',
            }}>// STUDENT COORDINATORS</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
              gap: '1px',
              background: '#1a1a1a',
              border: '1px solid #1a1a1a',
            }}>
              {coordinators.map((c, i) => (
                <div key={i} style={{
                  background: '#0A0A0A',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#111'}
                onMouseLeave={e => e.currentTarget.style.background = '#0A0A0A'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      background: '#FFD600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: '#000',
                    }}>{c.name.charAt(0)}</div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      color: '#FFD600',
                      border: '1px solid #332200',
                      padding: '2px 6px',
                      textTransform: 'uppercase',
                    }}>{c.tag}</span>
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: '#F5F5F0',
                      marginBottom: '0.25rem',
                    }}>{c.name}</p>
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: '#888',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}>{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          [05] // FAQ
      ══════════════════════════════════════════ */}
      <section style={{ ...sectionStyle, background: '#111' }} id="faq">
        <div style={{ ...containerStyle, maxWidth: '900px' }}>
          <SectionTag>[05] // FAQ</SectionTag>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>GOT<br />QUESTIONS?</h2>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#888',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '4rem',
          }}>EVERYTHING YOU NEED TO KNOW BEFORE REGISTERING.</p>

          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
            <div style={{ borderTop: '1px solid #1a1a1a' }} />
          </div>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#555',
            letterSpacing: '0.08em',
            marginTop: '2.5rem',
          }}>
            STILL HAVE QUESTIONS?{' '}
            <a href="mailto:acumenit@vasavi.ac.in" style={{ color: '#FFD600', textDecoration: 'none', fontWeight: 600 }}>
              TALK TO US →
            </a>
          </p>
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
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: '#888',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '3rem',
          }}>JOIN 500+ BUILDERS WHO COMPETE AT ACUMEN IT 2026, APRIL 16.</p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '0.85rem' }}>
              REGISTER NOW — FREE
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