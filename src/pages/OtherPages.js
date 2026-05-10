// TripNotes.js
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Trash2, BookOpen } from 'lucide-react';

export function TripNotes() {
  const { trips, addNote, removeNote } = useApp();
  const [selectedTrip, setSelectedTrip] = useState(trips[0]?.id || '');
  const [newNote, setNewNote] = useState('');

  const trip = trips.find(t => t.id === selectedTrip);

  const handleAdd = () => {
    if (!newNote.trim() || !trip) return;
    addNote(selectedTrip, newNote.trim());
    setNewNote('');
  };

  return (
    <div style={{ maxWidth: '720px' }}>
      <h1 className="section-title">Trip Notes & Journal</h1>
      <p className="section-subtitle">Jot down important reminders and details</p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <select value={selectedTrip} onChange={e => setSelectedTrip(e.target.value)} style={{ padding: '10px 16px', border: '2px solid var(--border-light)', borderRadius: 'var(--radius)', background: 'var(--white)', fontSize: '0.9rem', cursor: 'pointer' }}>
          {trips.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <textarea placeholder="Write a note or reminder..." value={newNote} onChange={e => setNewNote(e.target.value)} rows={3}
          style={{ width: '100%', padding: '12px', border: '2px solid var(--border-light)', borderRadius: 'var(--radius)', fontSize: '0.9rem', resize: 'vertical', marginBottom: '12px', background: 'var(--cream)' }} />
        <button className="btn-primary" onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} /> Add Note
        </button>
      </div>

      {trip?.notes?.length === 0 ? (
        <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
          <BookOpen size={36} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: '8px' }}>No notes yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Start writing notes for your trip</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {trip?.notes?.map((note, idx) => (
            <div key={idx} className="card" style={{ padding: '18px 20px', display: 'flex', gap: '14px' }}>
              <div style={{ width: 8, borderRadius: 4, background: 'var(--gold)', flexShrink: 0, alignSelf: 'stretch' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Note {idx + 1}</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--navy)', lineHeight: 1.6 }}>{note}</p>
              </div>
              <button onClick={() => removeNote(selectedTrip, idx)} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ShareTrip.js
export function ShareTrip() {
  const { trips } = useApp();
  const [selectedTrip, setSelectedTrip] = useState(trips[0]?.id || '');
  const [copied, setCopied] = useState(false);

  const trip = trips.find(t => t.id === selectedTrip);
  const shareUrl = `https://traveloop.app/share/${selectedTrip}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '640px' }}>
      <h1 className="section-title">Share Your Trip</h1>
      <p className="section-subtitle">Share your itinerary with friends and family</p>

      <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
        <div className="form-group">
          <label>Select Trip</label>
          <select value={selectedTrip} onChange={e => setSelectedTrip(e.target.value)}>
            {trips.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>

        {trip && (
          <>
            <div style={{ padding: '20px', background: 'var(--cream)', borderRadius: 'var(--radius)', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', marginBottom: '8px' }}>Trip Preview</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--navy)', marginBottom: '4px' }}>{trip.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>{trip.description}</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {trip.stops.map(s => <span key={s.id} className="badge badge-navy">{s.emoji} {s.city}</span>)}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label>Share Link</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input value={shareUrl} readOnly style={{ flex: 1, background: 'var(--cream)', fontSize: '0.85rem' }} />
                <button className="btn-gold" onClick={handleCopy} style={{ whiteSpace: 'nowrap' }}>
                  {copied ? '✓ Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[{ label: '𝕏 Twitter', bg: '#000' }, { label: 'f Facebook', bg: '#1877F2' }, { label: '📧 Email', bg: '#666' }].map(({ label, bg }) => (
                <button key={label} style={{ padding: '10px 18px', borderRadius: '8px', background: bg, color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>{label}</button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Profile.js
export function Profile() {
  const { user } = useApp();
  const [form, setForm] = useState({ name: user.name, email: user.email, language: 'English', bio: 'Travel enthusiast & adventure seeker ✈️' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div style={{ maxWidth: '600px' }}>
      <h1 className="section-title">Profile & Settings</h1>
      <p className="section-subtitle">Manage your account preferences</p>

      <div className="card" style={{ padding: '32px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '28px' }}>
          <div style={{ width: 72, height: 72, background: 'var(--navy)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>{user.avatar}</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--navy)' }}>{user.name}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user.email}</div>
            <button className="btn-outline" style={{ marginTop: '8px', padding: '6px 14px', fontSize: '0.8rem' }}>Change Photo</button>
          </div>
        </div>

        <div className="form-group"><label>Full Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
        <div className="form-group"><label>Email</label><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
        <div className="form-group"><label>Bio</label><textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={2} style={{ resize: 'none' }} /></div>
        <div className="form-group">
          <label>Language</label>
          <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })}>
            {['English', 'Spanish', 'French', 'Japanese', 'German'].map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-gold" onClick={handleSave} style={{ flex: 2 }}>{saved ? '✓ Saved!' : 'Save Changes'}</button>
          <button style={{ flex: 1, padding: '11px', borderRadius: '8px', border: '2px solid #FECACA', color: '#DC2626', background: '#FEF2F2', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}>Delete Account</button>
        </div>
      </div>
    </div>
  );
}

// Admin.js
export function Admin() {
  const { trips, cities } = useApp();

  const topCities = cities.slice(0, 5).map(c => ({ name: c.name, trips: Math.floor(Math.random() * 800) + 200 })).sort((a,b) => b.trips - a.trips);
  const totalActivities = trips.reduce((s, t) => s + t.stops.reduce((ss, st) => ss + st.activities.length, 0), 0);

  return (
    <div>
      <h1 className="section-title">Analytics Dashboard</h1>
      <p className="section-subtitle">Platform usage and insights</p>

      <div className="grid-3" style={{ marginBottom: '28px' }}>
        {[
          { label: 'Total Trips', value: trips.length + 1240, color: 'var(--navy)' },
          { label: 'Active Users', value: '3,847', color: '#1A5C2E' },
          { label: 'Activities Added', value: totalActivities + 8420, color: '#8B1A4A' },
          { label: 'Cities Explored', value: cities.length + 84, color: '#2C4A8B' },
          { label: 'Avg Trip Length', value: '8 days', color: '#6B3A1F' },
          { label: 'Retention Rate', value: '76%', color: '#1A4A4A' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{ padding: '22px' }}>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color }}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '16px' }}>Top Destinations</h3>
          {topCities.map((c, i) => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--navy)', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i+1}</div>
              <span style={{ flex: 1, fontWeight: 600, fontSize: '0.88rem' }}>{c.name}</span>
              <div style={{ flex: 2, height: 6, background: 'var(--cream-dark)', borderRadius: 3 }}>
                <div style={{ height: '100%', background: 'var(--gold)', borderRadius: 3, width: `${(c.trips / 1000) * 100}%` }} />
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', minWidth: '40px', textAlign: 'right' }}>{c.trips}</span>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '16px' }}>Recent Trips</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
                {['Trip', 'Stops', 'Budget'].map(h => <th key={h} style={{ textAlign: 'left', padding: '6px 8px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600, color: 'var(--text-muted)' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {trips.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '10px 8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)' }}>{t.name}</td>
                  <td style={{ padding: '10px 8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.stops.length}</td>
                  <td style={{ padding: '10px 8px', fontSize: '0.85rem', fontWeight: 700 }}>${t.budget?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
