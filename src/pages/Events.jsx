import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EVENTS = [
  { id: 1, title: 'Opening Ceremony', subtitle: 'April 16 | 09:00 AM', tag: 'CEREMONY', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
  { id: 2, title: 'Code Genesis', subtitle: 'April 16 | 12:00 PM', tag: 'TECHNICAL', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80' },
  { id: 3, title: 'Cyber Defense', subtitle: 'April 16 | 10:00 AM', tag: 'SECURITY', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80' },
  { id: 4, title: 'AI Hackathon', subtitle: 'April 16 | 02:00 PM', tag: 'ML / AI', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80' },
  { id: 5, title: 'Webathon', subtitle: 'April 16 | 11:00 AM', tag: 'WEB DEV', img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80' },
  { id: 6, title: 'Project Expo', subtitle: 'April 16 | 09:00 AM', tag: 'SHOWCASE', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80' },
  { id: 7, title: 'Paper Presentation', subtitle: 'April 16 | 10:00 AM', tag: 'RESEARCH', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80' },
];

const ALL_EVENTS = [
  { id: 'event-1', title: 'PAPER AND POSTER PRESENTATION', price: '₹100', tag: 'RESEARCH', desc: 'Present cutting-edge research to expert panelists.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' }},
  { id: 'event-2', title: 'WEBATHON', price: '₹150', tag: 'WEB DEV', desc: 'Build a full-stack app in under 4 hours. Per Team.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
  { id: 'event-3', title: 'PROJECT EXPO', price: '₹100', tag: 'SHOWCASE', desc: 'Showcase your final-year or innovation project. Per Team.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
  { id: 'event-4', title: 'PHOTOGRAPHY CHALLENGE', price: '₹50', tag: 'CREATIVE', desc: 'Capture the moment. Best shot wins.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
  { id: 'event-5', title: 'DIGITAL PING PONG', price: '₹50', tag: 'GAMING', desc: 'Classic game, digital twist. Fast reflexes required.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
  { id: 'event-6', title: 'SCARY HOUSE', price: '₹50', tag: 'EXPERIENCE', desc: 'Navigate the haunted maze if you dare.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
  { id: 'event-7', title: 'MINI GOLF', price: '₹50', tag: 'CASUAL', desc: 'Chill, compete, enjoy the course.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
  { id: 'event-8', title: 'EXTRACTION', price: '₹50', tag: 'PUZZLE', desc: 'Escape room-style challenge. Think fast.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
  { id: 'event-9', title: 'BINARY BOUNTY HUNT', price: '₹50', tag: 'TECHNICAL', desc: 'Decode. Hunt. Win. A binary puzzle scavenger hunt.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
  { id: 'event-10', title: 'NERF TAG', price: '₹225', tag: 'ACTION', desc: 'Team-based NERF battle arena. Best team wins.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
  { id: 'event-11', title: 'AGENTS TALE', price: '₹100', tag: 'STRATEGY', desc: 'Strategic multiplayer scenario game. Team of 2.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
  { id: 'event-12', title: 'VR ZONE', price: '₹50', tag: 'IMMERSIVE', desc: 'Dive into virtual reality experiences.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
  { id: 'event-13', title: 'WHISPER CHALLENGE', price: '₹30', tag: 'FUN', desc: 'The classic broken telephone with a tech spin.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
  { id: 'event-14', title: 'GEO GUESSR', price: '₹50', tag: 'KNOWLEDGE', desc: 'How well do you know the world? Find out.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
  { id: 'event-15', title: 'PIXEL ART', price: '₹30', tag: 'CREATIVE', desc: 'Create stunning pixel art under time pressure.', coord1: { name: 'Co-Ordinator 1', phone: '+91 9xxxxxxxxx' }, coord2: { name: 'Co-Ordinator 2', phone: '+91 8xxxxxxxxx' } },
];

export default function Events() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  
  // Touch variables for smooth mobile dragging simulation
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % EVENTS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + EVENTS.length) % EVENTS.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
    touchEndX.current = 0; // reset
  };

  return (
    <main style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#0A0A0A',
      overflowX: 'hidden',
      paddingTop: '60px',
    }}>

      {/* ─── Hero & Staggered Cards ─── */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 5rem) 4rem',
        borderBottom: '1px solid #1a1a1a',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#F5F5F0',
            marginBottom: '2rem',
          }}>
            BUILT AT<br />ACUMEN IT.
          </h1>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#888',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '4rem',
          }}>
            SWIPE TO EXPLORE
          </p>
        </div>

        {/* 3D Staggered Carousel Area */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            height: isMobile ? '450px' : '650px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px',
          }}
        >
          {EVENTS.map((event, index) => {
            // Circular Diff Calculation
            const len = EVENTS.length;
            let diff = (index - activeIndex) % len;
            if (diff > len / 2) diff -= len;
            else if (diff < -len / 2) diff += len;

            const absDiff = Math.abs(diff);
            const isActive = diff === 0;
            
            // Layout Math
            const spreadPixels = isMobile ? 65 : 190;
            // Decrease horizontal gap for cards further out so they stack tightly
            const horizontalCrunch = absDiff > 1 ? (absDiff - 1) * (isMobile ? 15 : 40) : 0;
            const translateX = (diff * spreadPixels) - (Math.sign(diff) * horizontalCrunch);

            // Z-Axis Scale Simulation
            const scale = isActive ? 1.0 : Math.max(0.6, 1 - absDiff * 0.12);
            const zIndex = 50 - absDiff;

            // Rotation - completely random scatter instead of a uniform fan curve
            // Using a seeded pseudo-random formula so each card consistently keeps its unique tilt
            const randomTilt = Math.sin(index * 45.1234) * 14; 
            const rotateDeg = isActive ? 0 : randomTilt;

            // Opacity and Filters
            const opacity = absDiff > 3 ? 0 : 1; 
            const brightness = isActive ? 1 : Math.max(0.3, 0.9 - absDiff * 0.25);

            return (
              <div
                key={event.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  position: 'absolute',
                  width: isMobile ? '240px' : '400px',
                  height: isMobile ? '350px' : '580px',
                  backgroundColor: '#0a0a0a',
                  // Highlight the active card significantly in pure technical brutalism
                  border: isActive ? '2px solid #FFD600' : '1px solid #333',
                  transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotateDeg}deg)`,
                  opacity: opacity,
                  zIndex: zIndex,
                  filter: `brightness(${brightness})`,
                  transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                  cursor: isActive ? 'default' : 'pointer',
                  willChange: 'transform, filter, opacity',
                  boxShadow: isActive ? '0 30px 60px rgba(0,0,0,0.8)' : '0 10px 20px rgba(0,0,0,0.4)',
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}>
                  <img
                    src={event.img}
                    alt={event.title}
                    style={{
                      width: '100%',
                      height: '80%',
                      objectFit: 'cover',
                      pointerEvents: 'none',
                      userSelect: 'none',
                      filter: isActive ? 'none' : 'grayscale(60%)',
                      transition: 'filter 0.6s ease',
                    }}
                    draggable={false}
                  />
                  
                  {/* Brutalist Tag */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: isActive ? '#FFD600' : '#222',
                    color: isActive ? '#000' : '#888',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    padding: '4px 10px',
                    textTransform: 'uppercase',
                    boxShadow: isActive ? '4px 4px 0 rgba(0,0,0,1)' : 'none',
                    transition: 'all 0.6s ease',
                  }}>{event.tag}</div>

                  {/* Metadata Block */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '20%',
                    background: '#0A0A0A',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 1.25rem',
                    borderTop: '1px solid #1a1a1a',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: isMobile ? '1.1rem' : '1.4rem',
                      color: isActive ? '#FFD600' : '#F5F5F0',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      transition: 'color 0.6s ease',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>{event.title}</p>
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: '#888',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginTop: '0.2rem',
                    }}>{event.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '3rem',
        }}>
          <button 
            onClick={handlePrev}
            style={{
              background: '#0A0A0A',
              border: '1px solid #888',
              color: '#F5F5F0',
              padding: '1rem 2rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              transition: 'all 0.2s',
            }}
          >
            ← PREV
          </button>
          <button 
            onClick={handleNext}
            style={{
              background: '#FFD600',
              border: '1px solid #FFD600',
              color: '#0A0A0A',
              padding: '1rem 2rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              fontWeight: 700,
              transition: 'all 0.2s',
            }}
          >
            NEXT →
          </button>
        </div>

      </section>

      {/* ─── All Events Grid ─── */}
{/* ─── All Events Grid: Glassmorphic Edition ─── */}
      <section style={{
        padding: 'clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem)',
        position: 'relative',
        backgroundColor: '#050505',
        // Mesh gradient background to make the glass blur visible
        backgroundImage: `
          radial-gradient(at 0% 0%, rgba(255, 214, 0, 0.05) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(255, 214, 0, 0.05) 0px, transparent 50%)
        `,
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: '#F5F5F0',
              marginBottom: '1rem',
            }}>
              EVERY EVENT.<br />EVERY CHALLENGE.
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ height: '2px', width: '40px', background: '#FFD600' }}></div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: '#888',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>15 EVENTS. PICK YOUR BATTLES.</p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {ALL_EVENTS.map((event) => (
  <div 
    key={event.id} 
    style={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
      e.currentTarget.style.transform = 'scale(1.02) translateY(-5px)';
      e.currentTarget.style.borderColor = 'rgba(255, 214, 0, 0.4)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
      e.currentTarget.style.transform = 'scale(1) translateY(0)';
      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }}
  >
    {/* Header: Tag and ID */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        background: 'rgba(255, 214, 0, 0.1)',
        color: '#FFD600',
        padding: '4px 12px',
        borderRadius: '100px',
        border: '1px solid rgba(255, 214, 0, 0.2)',
        letterSpacing: '0.1em'
      }}>{event.tag}</span>
      <span style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
        #{event.id.split('-')[1].padStart(2, '0')}
      </span>
    </div>

    {/* Title and Description */}
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: '#FFF', marginBottom: '0.5rem' }}>
        {event.title}
      </h3>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.5 }}>
        {event.desc}
      </p>
    </div>

    {/* ─── NEW: Coordinator Module ─── */}
    <div style={{
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      
      {/* Coord 1 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ color: '#FFF', fontSize: '0.75rem', fontWeight: 500 }}>{event.coord1?.name}</span>
        <a href={`tel:${event.coord1?.phone}`} style={{ 
          color: '#FFD600', 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.7rem', 
          textDecoration: 'none',
          borderBottom: '1px dotted #FFD600'
        }}>
          {event.coord1?.phone}
        </a>
      </div>

      {/* Coord 2 */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#FFF', fontSize: '0.75rem', fontWeight: 500 }}>{event.coord2?.name}</span>
        <a href={`tel:${event.coord2?.phone}`} style={{ 
          color: '#FFD600', 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.7rem', 
          textDecoration: 'none',
          borderBottom: '1px dotted #FFD600'
        }}>
          {event.coord2?.phone}
        </a>
      </div>
    </div>

    {/* Footer: Price and Register Link */}
    <div style={{
      marginTop: 'auto',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>PASS</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: '#FFD600' }}>{event.price}</span>
      </div>
      
      <Link 
        to={`/register?event=${encodeURIComponent(event.title)}`}
        style={{
          background: 'white',
          color: 'black',
          border: 'none',
          borderRadius: '12px',
          padding: '8px 16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 800,
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#FFD600'}
        onMouseLeave={e => e.currentTarget.style.background = 'white'}
      >
        REGISTER
      </Link>
    </div>
  </div>
))}
          </div>
        </div>
      </section>
    </main>
  );
}