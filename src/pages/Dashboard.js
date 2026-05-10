import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PlusCircle, MapPin, Calendar, DollarSign, TrendingUp, Globe, ChevronRight } from 'lucide-react';

const DESTINATIONS = [
  { name: 'Santorini', country: 'Greece', emoji: '🌅', tag: 'Romantic' },
  { name: 'Kyoto', country: 'Japan', emoji: '⛩️', tag: 'Cultural' },
  { name: 'Patagonia', country: 'Argentina', emoji: '🏔️', tag: 'Adventure' },
  { name: 'Amalfi Coast', country: 'Italy', emoji: '🌊', tag: 'Scenic' },
];

export default function Dashboard() {
  const { user, trips } = useApp();
  const navigate = useNavigate();

  const totalBudget = trips.reduce((s, t) => s + (t.budget || 0), 0);
  const totalSpent = trips.reduce((s, t) => s + (t.spent || 0), 0);
  const upcoming = trips.filter(t => new Date(t.startDate) >= new Date()).length;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px' }}>
        <div>
          <p style={{ fontSize: '0.85rem', color: 'var(--gold-muted)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Welcome back</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--navy)', lineHeight: 1.2 }}>
            {user.name.split(' ')[0]}'s<br />
            <em>Travel Hub</em>
          </h1>
        </div>
        <button className="btn-primary" onClick={() => navigate('/create-trip')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PlusCircle size={17} /> New Trip
        </button>
      </div>

      {/* Stats */}
      <div className="grid-3" style={{ marginBottom: '36px' }}>
        {[
          { label: 'Total Trips', value: trips.length, icon: Globe, color: 'var(--navy)' },
          { label: 'Upcoming', value: upcoming, icon: Calendar, color: '#1a7a4a' },
          { label: 'Budget Used', value: `$${totalSpent.toLocaleString()}`, icon: DollarSign, color: '#b45309' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600, marginBottom: '8px' }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color }}>{value}</div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={color} />
              </div>
            </div>
            {label === 'Budget Used' && (
              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  <span>Budget: ${totalBudget.toLocaleString()}</span>
                  <span>{totalBudget ? Math.round(totalSpent / totalBudget * 100) : 0}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--cream-dark)', borderRadius: 3 }}>
                  <div style={{ height: '100%', background: 'var(--gold)', borderRadius: 3, width: `${totalBudget ? Math.min(totalSpent / totalBudget * 100, 100) : 0}%`, transition: 'width 0.5s' }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recent Trips */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--navy)' }}>Recent Trips</h2>
            <button onClick={() => navigate('/trips')} style={{ fontSize: '0.82rem', color: 'var(--gold-muted)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {trips.slice(0, 3).map(trip => {
              const pct = trip.budget ? Math.round(trip.spent / trip.budget * 100) : 0;
              return (
                <div key={trip.id} className="card" onClick={() => navigate('/itinerary', { state: { tripId: trip.id } })}
                  style={{ padding: '20px', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '12px', background: trip.coverColor || 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                      {trip.stops[0]?.emoji || '✈️'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy)', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{trip.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={12} /> {trip.stops.length} stops · {trip.startDate} → {trip.endDate}
                      </div>
                      <div style={{ marginTop: '8px' }}>
                        <div style={{ height: 4, background: 'var(--cream-dark)', borderRadius: 2 }}>
                          <div style={{ height: '100%', background: pct > 90 ? '#DC2626' : 'var(--gold)', borderRadius: 2, width: `${Math.min(pct, 100)}%` }} />
                        </div>
                        <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: '4px' }}>${trip.spent?.toLocaleString()} / ${trip.budget?.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inspiration */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--navy)', marginBottom: '16px' }}>Dream Destinations</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {DESTINATIONS.map(d => (
              <div key={d.name} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', transition: 'transform 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}>
                <div style={{ fontSize: '1.6rem' }}>{d.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)' }}>{d.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.country}</div>
                </div>
                <span className="badge badge-gold">{d.tag}</span>
              </div>
            ))}
            <button className="btn-outline" onClick={() => navigate('/city-search')} style={{ marginTop: '4px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Globe size={16} /> Explore All Cities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
