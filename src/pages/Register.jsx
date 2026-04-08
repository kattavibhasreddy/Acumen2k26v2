import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const EVENTS_LIST = [
  { id: 'event-1', title: 'PAPER AND POSTER', price: '₹100', tag: 'RESEARCH' },
  { id: 'event-2', title: 'WEBATHON (PER TEAM)', price: '₹150', tag: 'WEB DEV' },
  { id: 'event-3', title: 'PROJECT EXPO (PER TEAM)', price: '₹100', tag: 'SHOWCASE' },
  { id: 'event-4', title: 'PHOTOGRAPHY CHALLENGE', price: '₹50', tag: 'CREATIVE' },
  { id: 'event-7', title: 'DIGITAL PING PONG', price: '₹50', tag: 'GAMING' },
  { id: 'event-8', title: 'SCARY HOUSE', price: '₹50', tag: 'EXPERIENCE' },
  { id: 'event-9', title: 'MINI GOLF', price: '₹50', tag: 'CASUAL' },
  { id: 'event-10', title: 'EXTRACTION', price: '₹50', tag: 'PUZZLE' },
  { id: 'event-11', title: 'BINARY BOUNTY HUNT', price: '₹50', tag: 'TECHNICAL' },
  { id: 'event-14', title: 'NERF TAG', price: '₹225', tag: 'ACTION' },
  { id: 'event-15', title: 'AGENTS TALE (TEAM 2)', price: '₹100', tag: 'STRATEGY' },
  { id: 'event-16', title: 'VR ZONE', price: '₹50', tag: 'IMMERSIVE' },
  { id: 'event-17', title: 'WHISPER CHALLENGE', price: '₹30', tag: 'FUN' },
  { id: 'event-18', title: 'GEO GUESSR', price: '₹50', tag: 'KNOWLEDGE' },
  { id: 'event-19', title: 'PIXEL ART', price: '₹30', tag: 'CREATIVE' },
]

const inputStyle = (error) => ({
  width: '100%',
  padding: '0.9rem 1rem',
  background: '#111',
  border: `1px solid ${error ? '#FF6B35' : '#3D3D3D'}`,
  borderRadius: '0',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.85rem',
  color: '#F5F5F0',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  letterSpacing: '0.04em',
})

function FormField({ id, label, error, children, required }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label htmlFor={id} style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: error ? '#FF6B35' : '#555',
      }}>
        {label} {required && <span style={{ color: '#FFD600' }}>*</span>}
      </label>
      {children}
      {error && <span style={{ fontSize: '0.65rem', color: '#FF6B35', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>{error.message}</span>}
    </div>
  )
}

export default function Register() {
  const [searchParams] = useSearchParams();
  const eventFromUrl = searchParams.get('event');

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      selectedEvents: [],
      transactionId: '',
      paymentScreenshotLink: ''
    }
  })

  const selectedEvents = watch('selectedEvents') || []
  
  const totalAmount = selectedEvents.reduce((sum, title) => {
    const event = EVENTS_LIST.find(e => e.title === title)
    if (event) {
      const price = parseInt(event.price.replace('₹', ''))
      return sum + price
    }
    return sum
  }, 0)
  
  // Debug validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Validation Errors:", errors);
    }
  }, [errors]);
  
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (eventFromUrl) {
      setValue('selectedEvents', [eventFromUrl]);
    }
  }, [eventFromUrl, setValue])

  const onSubmit = async (data) => {
    console.log("Form Submitted, data:", data);
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Registration Successful:", result.data);
        setSubmitted(true);
      } else {
        alert("Registration Failed: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Server Connection Error. Please ensure the backend is running.");
    }
  }

  if (submitted) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0A0A',
        padding: '2rem',
      }}>
        <div style={{
          textAlign: 'center',
          background: '#111',
          border: '1px solid #FFD600',
          padding: '4rem 3rem',
          maxWidth: '500px',
          width: '100%',
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: '#FFD600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#000',
          }}>✓</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '2.5rem',
            color: '#F5F5F0',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}>CONFIRMED.</h1>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#888',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>REGISTRATION RECEIVED. WE WILL CONTACT YOU SHORTLY FOR PAYMENT VERIFICATION.</p>
          <Link to="/" style={{
            display: 'inline-block',
            background: '#FFD600',
            color: '#000',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.9rem 2rem',
            textDecoration: 'none',
          }}>RETURN HOME</Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0A0A0A',
      paddingTop: '60px',
      paddingBottom: '6rem',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 3rem)' }}>

        {/* Header */}
        <header style={{
          padding: 'clamp(4rem, 8vw, 8rem) 0 3rem',
          borderBottom: '1px solid #1a1a1a',
          marginBottom: '4rem',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#F5F5F0',
            marginBottom: '1rem',
          }}>
            SECURE YOUR<br />SPOT.
          </h1>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#888',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>ACUMEN IT · APRIL 16, 2026 · VASAVI COLLEGE</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
        }}>

          {/* Section 1: Personal Info */}
          <div style={{
            border: '1px solid #1a1a1a',
            padding: '2.5rem',
            background: '#0d0d0d',
          }}>
<div style={{
  position: 'relative',
  marginBottom: '2.5rem',
  paddingLeft: '1.5rem',
}}>
  {/* Vertical Accent Line */}
  <div style={{
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '1px',
    background: 'linear-gradient(to bottom, #FFD600, transparent)'
  }} />
  
  <h2 style={{
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    color: '#F5F5F0',
    textTransform: 'uppercase',
    margin: '0.5rem 0 0 0',
    letterSpacing: '-0.02em'
  }}>
    PARTICIPANT DETAILS
  </h2>
</div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}>
              <FormField id="name" label="Full Name" error={errors.name} required>
                <input
                  {...register('name', { required: 'Required' })}
                  placeholder="YOUR NAME"
                  style={inputStyle(errors.name)}
                  onFocus={e => e.target.style.borderColor = '#FFD600'}
                  onBlur={e => e.target.style.borderColor = errors.name ? '#FF6B35' : '#3D3D3D'}
                />
              </FormField>

              <FormField id="email" label="Email Address" error={errors.email} required>
  <input
    {...register('email', { 
      required: 'Email is required',
      pattern: {
        // Standard RFC 5322 compliant regex for emails
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email format (e.g., name@domain.com)"
      }
    })}
    type="email"
    placeholder="YOUR@EMAIL.COM"
    style={inputStyle(errors.email)}
    onFocus={e => e.target.style.borderColor = '#FFD600'}
    // Validation-aware blur: stays orange if there's an error, goes dark if clean
    onBlur={e => e.target.style.borderColor = errors.email ? '#FF6B35' : '#3D3D3D'}
  />
</FormField>

              <FormField id="branch" label="Branch" error={errors.branch} required>
                <input
                  {...register('branch', { required: 'Required' })}
                  placeholder="E.G. IT, CSE, ECE"
                  style={inputStyle(errors.branch)}
                  onFocus={e => e.target.style.borderColor = '#FFD600'}
                  onBlur={e => e.target.style.borderColor = errors.branch ? '#FF6B35' : '#3D3D3D'}
                />
              </FormField>

              <FormField id="section" label="Section" error={errors.section} required>
                <input
                  {...register('section', { required: 'Required' })}
                  placeholder="E.G. A, B"
                  style={inputStyle(errors.section)}
                  onFocus={e => e.target.style.borderColor = '#FFD600'}
                  onBlur={e => e.target.style.borderColor = errors.section ? '#FF6B35' : '#3D3D3D'}
                />
              </FormField>

              <FormField id="year" label="Year" error={errors.year} required>
                <select
                  {...register('year', { required: 'Required' })}
                  style={{ ...inputStyle(errors.year), cursor: 'pointer' }}
                >
                  <option value="" style={{ background: '#111', color: '#888' }}>SELECT YEAR</option>
                  <option value="1" style={{ background: '#111', color: '#F5F5F0' }}>1ST YEAR</option>
                  <option value="2" style={{ background: '#111', color: '#F5F5F0' }}>2ND YEAR</option>
                  <option value="3" style={{ background: '#111', color: '#F5F5F0' }}>3RD YEAR</option>
                  <option value="4" style={{ background: '#111', color: '#F5F5F0' }}>4TH YEAR</option>
                </select>
              </FormField>

              <FormField id="rollNo" label="Roll Number" error={errors.rollNo} required>
  <input
    {...register('rollNo', { 
      required: 'Roll Number is required',
      pattern: {
        // Regex Breakdown:
        // ^\d{4} : Starts with 4 digits (1602)
        // -      : Followed by a hyphen
        // \d{2}  : 2 digits (24)
        // -      : Hyphen
        // \d{3}  : 3 digits (737)
        // -      : Hyphen
        // \d{3}$ : Ends with 3 digits (001)
        value: /^\d{4}-\d{2}-\d{3}-\d{3}$/,
        message: 'Required format: 1602-24-737-001'
      }
    })}
    placeholder="1602-24-737-001"
    style={inputStyle(errors.rollNo)}
    onFocus={e => e.target.style.borderColor = '#FFD600'}
    onBlur={e => e.target.style.borderColor = errors.rollNo ? '#FF6B35' : '#3D3D3D'}
  />
</FormField>

              <FormField id="college" label="College Name" error={errors.college} required>
                <input
                  {...register('college', { required: 'Required' })}
                  placeholder="YOUR COLLEGE"
                  style={inputStyle(errors.college)}
                  onFocus={e => e.target.style.borderColor = '#FFD600'}
                  onBlur={e => e.target.style.borderColor = errors.college ? '#FF6B35' : '#3D3D3D'}
                />
              </FormField>
            </div>
          </div>

          {/* Section 2: Events Selection */}
<div style={{
  border: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '2.5rem',
  background: 'rgba(255, 255, 255, 0.03)', // Transparent base
  backdropFilter: 'blur(12px)', // Core glassmorphism effect
  WebkitBackdropFilter: 'blur(12px)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  position: 'relative'
}}>
  <div style={{
    position: 'relative',
    marginBottom: '2.5rem',
    paddingLeft: '1.5rem',
  }}>
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '2px',
      background: 'linear-gradient(to bottom, #FFD600, transparent)'
    }} />
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontSize: '1.5rem',
      color: '#F5F5F0',
      textTransform: 'uppercase',
      margin: '0.5rem 0 0 0',
      letterSpacing: '-0.02em'
    }}>
      Select Events
    </h2>
  </div>

  {/* Scrollable Container */}
  <div className="custom-scrollbar" style={{
    maxHeight: '450px', // Fixed height for scrolling
    overflowY: 'auto',
    paddingRight: '1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1rem',
  }}>
    {EVENTS_LIST.map((event) => (
      <label 
        key={event.id} 
        className="event-card" 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
          <input
            type="checkbox"
            {...register('selectedEvents')}
            value={event.title}
            style={{
              width: '18px',
              height: '18px',
              accentColor: '#FFD600',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          />
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.75rem',
              color: '#F5F5F0',
              textTransform: 'uppercase',
              marginBottom: '4px'
            }}>{event.title}</p>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: '#FFD600',
              background: 'rgba(255, 214, 0, 0.1)',
              padding: '2px 6px',
              border: '1px solid rgba(255, 214, 0, 0.2)',
              textTransform: 'uppercase',
            }}>{event.tag}</span>
          </div>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.4)',
          flexShrink: 0,
        }}>{event.price}</span>
      </label>
    ))}
  </div>
</div>

  {/* Section 3: Payment Section (Conditional) */}
  {selectedEvents.length > 0 && (
    <div style={{
      border: '1px solid #1a1a1a',
      padding: '2.5rem',
      background: '#0d0d0d',
    }}>
      <div style={{
        position: 'relative',
        marginBottom: '2.5rem',
        paddingLeft: '1.5rem',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(to bottom, #FFD600, transparent)'
        }} />
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          color: '#F5F5F0',
          textTransform: 'uppercase',
          margin: '0.5rem 0 0 0',
          letterSpacing: '-0.02em'
        }}>
          PAYMENT DETAILS
        </h2>
      </div>

      <div style={{
        background: 'rgba(255, 214, 0, 0.05)',
        border: '1px solid #332200',
        padding: '2rem',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#888' }}>TOTAL_AMOUNT:</h3>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: '#FFD600' }}>₹{totalAmount}</span>
        </div>

        <div style={{ padding: '1rem', background: '#FFF' }}>
          <img 
            src="/assets/qr-dWM8w90D.webp" 
            alt="Payment QR Code" 
            style={{ width: '200px', height: '200px', display: 'block' }} 
            onError={(e) => {
              e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=AcumenIT-Payment-Placeholder'
            }}
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#F5F5F0', marginBottom: '0.5rem' }}>
            SCAN QR TO PAY ₹{totalAmount}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555' }}>
            FOR QUERIES CONTACT: 8688569105
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        <FormField id="transactionId" label="Transaction ID" error={errors.transactionId} required>
          <input
            {...register('transactionId', { required: 'Required' })}
            placeholder="ENTER UTR / TXN ID"
            style={inputStyle(errors.transactionId)}
            onFocus={e => e.target.style.borderColor = '#FFD600'}
            onBlur={e => e.target.style.borderColor = errors.transactionId ? '#FF6B35' : '#3D3D3D'}
          />
        </FormField>

        <FormField id="paymentScreenshotLink" label="Screenshot Drive Link" error={errors.paymentScreenshotLink} required>
          <input
            {...register('paymentScreenshotLink', { required: 'Required' })}
            placeholder="PASTE GOOGLE DRIVE LINK"
            style={inputStyle(errors.paymentScreenshotLink)}
            onFocus={e => e.target.style.borderColor = '#FFD600'}
            onBlur={e => e.target.style.borderColor = errors.paymentScreenshotLink ? '#FF6B35' : '#3D3D3D'}
          />
          <p style={{ fontSize: '0.6rem', color: '#444', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
            // Ensure link is public (Anyone with the link can view)
          </p>
        </FormField>
      </div>
    </div>
  )}

  {/* Submit */}
  <button
    type="submit"
    disabled={isSubmitting}
    style={{
      background: isSubmitting ? '#333' : '#FFD600',
      color: isSubmitting ? '#888' : '#000',
      padding: '1.25rem',
      border: 'none',
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: '0.85rem',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      transition: 'all 0.2s ease',
      width: '100%',
    }}
    onMouseEnter={e => !isSubmitting && (e.target.style.background = '#ffe033')}
    onMouseLeave={e => !isSubmitting && (e.target.style.background = '#FFD600')}
  >
    {isSubmitting ? '// PROCESSING...' : 'COMPLETE REGISTRATION →'}
  </button>
        </form>

        <style>{`
          /* Custom Scrollbar Styling */
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 10px;
            transition: background 0.3s;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #FFD600; /* Highlight on hover */
          }

          /* Card Hover Interactions */
          .event-card:hover {
            background: rgba(255, 255, 255, 0.08) !important;
            border-color: rgba(255, 214, 0, 0.3) !important;
            transform: translateY(-2px);
          }

          /* Active State (When checkbox is checked) */
          .event-card:has(input:checked) {
            background: rgba(255, 214, 0, 0.05) !important;
            border-color: #FFD600 !important;
          }

          select option { background: #111; color: #F5F5F0; }
        `}</style>
      </div>
    </main>
  )
}