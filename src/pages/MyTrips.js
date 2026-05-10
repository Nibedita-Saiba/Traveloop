import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PlusCircle, MapPin, Calendar, Trash2, Edit3, Eye, Search } from 'lucide-react';

export default function MyTrips() {
  const { trips, deleteTrip } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = trips.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  const getDuration = (start, end) => {
    const days = Math.round((new Date(end) - new Date(start)) / 86400000);
    return `${days} days`;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
        <div>
          <h1 className="section-title">My Trips</h1>
          <p className="section-subtitle">{trips.length} trip{trips.length !== 1 ? 's' : ''} planned</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/create-trip')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PlusCircle size={17} /> New Trip
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          placeholder="Search trips..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', maxWidth: '400px', paddingLeft: '42px', padding: '11px 16px 11px 42px', border: '2px solid var(--border-light)', borderRadius: 'var(--radius)', background: 'var(--white)', fontSize: '0.9rem' }}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ padding: '60px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✈️</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '8px' }}>No trips yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Start planning your next adventure!</p>
          <button className="btn-primary" onClick={() => navigate('/create-trip')}>Plan a Trip</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map(trip => {
            const pct = trip.budget ? Math.min(Math.round(trip.spent / trip.budget * 100), 100) : 0;
            const isOver = pct >= 90;
            return (
              <div key={trip.id} className="card" style={{ overflow: 'hidden' }}>
                {/* Card Header */}
                <div style={{ height: '120px', background: `linear-gradient(135deg, ${trip.coverColor || 'var(--navy)'}, ${trip.coverColor || '#1E3A5F'}CC)`, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {trip.stops.slice(0, 4).map((s, i) => (
                      <span key={i} style={{ fontSize: '1.4rem' }}>{s.emoji}</span>
                    ))}
                    {trip.stops.length > 4 && <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', alignSelf: 'flex-end' }}>+{trip.stops.length - 4}</span>}
                  </div>
                  <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                    <button onClick={() => navigate('/itinerary', { state: { tripId: trip.id } })} style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backdropFilter: 'blur(4px)' }}>
                      <Eye size={15} />
                    </button>
                    <button onClick={() => setConfirmDelete(trip.id)} style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>{trip.name}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.5 }}>{trip.description}</p>

                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} />{trip.stops.length} stops</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={13} />{trip.startDate}</span>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: isOver ? '#DC2626' : 'var(--text-muted)', marginBottom: '5px' }}>
                      <span>Budget: ${trip.budget?.toLocaleString()}</span>
                      <span style={{ fontWeight: 600 }}>{pct}% used</span>
                    </div>
                    <div style={{ height: 5, background: 'var(--cream-dark)', borderRadius: 3 }}>
                      <div style={{ height: '100%', background: isOver ? '#DC2626' : 'var(--gold)', borderRadius: 3, width: `${pct}%`, transition: 'width 0.4s' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <button className="btn-primary" onClick={() => navigate('/itinerary', { state: { tripId: trip.id } })} style={{ flex: 1, padding: '9px', fontSize: '0.82rem', textAlign: 'center' }}>
                      View Itinerary
                    </button>
                    <button className="btn-outline" onClick={() => navigate('/create-trip', { state: { editId: trip.id } })} style={{ padding: '9px 14px' }}>
                      <Edit3 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300 }}>
          <div className="card" style={{ padding: '32px', maxWidth: '400px', width: '90%' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--navy)', marginBottom: '12px' }}>Delete Trip?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-outline" onClick={() => setConfirmDelete(null)} style={{ flex: 1 }}>Cancel</button>
              <button style={{ flex: 1, background: '#DC2626', color: 'white', padding: '11px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }} onClick={() => { deleteTrip(confirmDelete); setConfirmDelete(null); }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
