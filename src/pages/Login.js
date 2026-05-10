import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (mode === 'signup' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (form.password.length < 6) e.password = 'Min 6 characters';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--navy)',
      display: 'flex',
      alignItems: 'stretch',
    }}>
      {/* Left Panel */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, var(--navy-light) 0%, #0D1F3C 50%, var(--navy) 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            border: `1px solid rgba(201,168,76,${0.06 - i * 0.01})`,
            borderRadius: '50%',
            top: '50%', left: '40%',
            transform: 'translate(-50%,-50%)',
          }} />
        ))}

        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 44, height: 44, background: 'var(--gold)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={24} color="var(--navy)" />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', fontWeight: 700 }}>Traveloop</span>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>Your Journey Begins Here</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.2rem', color: 'var(--white)', lineHeight: 1.15, marginBottom: '24px' }}>
            Plan trips<br />
            <em style={{ color: 'var(--gold)' }}>you'll love</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '340px' }}>
            Build multi-city itineraries, track your budget, discover activities, and share your adventures with the world.
          </p>

          <div style={{ marginTop: '48px', display: 'flex', gap: '32px' }}>
            {[['50K+', 'Travelers'], ['120+', 'Countries'], ['1M+', 'Trips Planned']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', fontWeight: 700 }}>{n}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.5px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: '480px',
        background: 'var(--cream)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 48px',
      }}>
        <div style={{ width: '100%', maxWidth: '360px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--navy)', marginBottom: '6px' }}>
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '36px' }}>
            {mode === 'login' ? 'Sign in to your travel hub' : 'Start planning your adventures'}
          </p>

          {mode === 'signup' && (
            <div className="form-group">
              <label>Full Name</label>
              <input placeholder="Alex Rivera" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              {errors.name && <span style={{ color: '#DC2626', fontSize: '0.8rem' }}>{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            {errors.email && <span style={{ color: '#DC2626', fontSize: '0.8rem' }}>{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={{ width: '100%', paddingRight: '44px' }}
              />
              <button onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {errors.password && <span style={{ color: '#DC2626', fontSize: '0.8rem' }}>{errors.password}</span>}
          </div>

          {mode === 'login' && (
            <div style={{ textAlign: 'right', marginTop: '-12px', marginBottom: '24px' }}>
              <button style={{ fontSize: '0.85rem', color: 'var(--gold-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Forgot password?</button>
            </div>
          )}

          <button className="btn-primary" onClick={handleSubmit} style={{ width: '100%', padding: '14px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
            <ArrowRight size={18} />
          </button>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}); }} style={{ color: 'var(--navy)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </div>

          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button onClick={() => navigate('/dashboard')} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
              Continue as guest →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
