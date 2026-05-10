import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Plus, Trash2, MapPin, Calendar, DollarSign, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export default function Itinerary() {
  const { trips, cities, activities, addStop, removeStop, addActivity, removeActivity } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [showAddStop, setShowAddStop] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(null);
  const [expandedStop, setExpandedStop] = useState(null);
  const [stopForm, setStopForm] = useState({ cityId: '', startDate: '', endDate: '' });
  const [viewMode, setViewMode] = useState('list');

  const tripId = location.state?.tripId;
  const trip = trips.find(t => t.id === tripId);

  if (!trip) {
    return (
      <div>
        <h1 className="section-title">Itinerary Builder</h1>
        <p className="section-subtitle">Select a trip to view its itinerary</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '24px' }}>
          {trips.map(t => (
            <div key={t.id} className="card" onClick={() => navigate('/itinerary', { state: { tripId: t.id } })} style={{ padding: '20px', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '6px' }}>{t.name}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{t.stops.length} stops · {t.startDate}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const totalCost = trip.stops.reduce((s, stop) => s + stop.activities.reduce((ss, a) => ss + (a.cost || 0), 0), 0);

  const handleAddStop = () => {
    const city = cities.find(c => c.id === stopForm.cityId);
    if (!city || !stopForm.startDate || !stopForm.endDate) return;
    addStop(tripId, { city: city.name, country: city.country, emoji: city.emoji, startDate: stopForm.startDate, endDate: stopForm.endDate });
    setStopForm({ cityId: '', startDate: '', endDate: '' });
    setShowAddStop(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
        <div>
          <h1 className="section-title">{trip.name}</h1>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>{trip.description}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['list', 'timeline'].map(m => (
            <button key={m} onClick={() => setViewMode(m)} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600, background: viewMode === m ? 'var(--navy)' : 'var(--white)', color: viewMode === m ? 'var(--gold)' : 'var(--text-muted)', border: '2px solid', borderColor: viewMode === m ? 'var(--navy)' : 'var(--border-light)', cursor: 'pointer' }}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Bar */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '28px', padding: '16px 20px', background: 'var(--white)', borderRadius: 'var(--radius)', border: '1px solid var(--border-light)', flexWrap: 'wrap' }}>
        {[
          { label: 'Stops', value: trip.stops.length, icon: MapPin },
          { label: 'Start', value: trip.startDate, icon: Calendar },
          { label: 'End', value: trip.endDate, icon: Calendar },
          { label: 'Activities Cost', value: `$${totalCost}`, icon: DollarSign },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon size={15} color="var(--gold-muted)" />
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{label}:</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy)' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Stops */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {trip.stops.map((stop, idx) => {
          const stopCost = stop.activities.reduce((s, a) => s + (a.cost || 0), 0);
          const isExpanded = expandedStop === stop.id;
          return (
            <div key={stop.id} className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', background: isExpanded ? 'rgba(201,168,76,0.04)' : 'transparent' }}
                onClick={() => setExpandedStop(isExpanded ? null : stop.id)}>
                {viewMode === 'timeline' && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--navy)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>{idx + 1}</div>
                    {idx < trip.stops.length - 1 && <div style={{ width: 2, height: 20, background: 'var(--border-light)' }} />}
                  </div>
                )}
                <div style={{ fontSize: '1.8rem' }}>{stop.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)' }}>{stop.city}, {stop.country}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', marginTop: '2px' }}>
                    <span>{stop.startDate} → {stop.endDate}</span>
                    <span>·</span>
                    <span>{stop.activities.length} activities</span>
                    <span>·</span>
                    <span>${stopCost} cost</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button onClick={e => { e.stopPropagation(); removeStop(tripId, stop.id); }} style={{ width: 30, height: 30, borderRadius: '8px', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626' }}>
                    <Trash2 size={13} />
                  </button>
                  {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                </div>
              </div>

              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--border-light)', padding: '20px 24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                    {stop.activities.map(act => (
                      <div key={act.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', background: 'var(--cream)', borderRadius: 'var(--radius)', border: '1px solid var(--border-light)' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)' }}>{act.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '10px', marginTop: '2px' }}>
                            <span className="badge badge-navy">{act.type}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={11} />{act.duration}</span>
                          </div>
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9rem' }}>${act.cost}</div>
                        <button onClick={() => removeActivity(tripId, stop.id, act.id)} style={{ width: 28, height: 28, borderRadius: '6px', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626' }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {showAddActivity === stop.id ? (
                    <div style={{ padding: '16px', background: 'var(--cream)', borderRadius: 'var(--radius)', border: '1px dashed var(--border-light)' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '12px' }}>Add Activity</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                        {activities.map(a => (
                          <button key={a.id} onClick={() => { addActivity(tripId, stop.id, a); setShowAddActivity(null); }}
                            style={{ padding: '12px', background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius)', textAlign: 'left', cursor: 'pointer', transition: 'border-color 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--navy)', marginBottom: '4px' }}>{a.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                              <span>{a.type}</span><span>${a.cost}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                      <button onClick={() => setShowAddActivity(null)} style={{ marginTop: '12px', fontSize: '0.82rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setShowAddActivity(stop.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--gold-muted)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                      <Plus size={16} /> Add Activity
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Stop */}
      {showAddStop ? (
        <div className="card" style={{ padding: '24px', marginTop: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '16px' }}>Add New Stop</h3>
          <div className="grid-2" style={{ marginBottom: '12px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>City</label>
              <select value={stopForm.cityId} onChange={e => setStopForm({ ...stopForm, cityId: e.target.value })}>
                <option value="">Select city...</option>
                {cities.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.name}, {c.country}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                <label>From</label>
                <input type="date" value={stopForm.startDate} onChange={e => setStopForm({ ...stopForm, startDate: e.target.value })} />
              </div>
              <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                <label>To</label>
                <input type="date" value={stopForm.endDate} onChange={e => setStopForm({ ...stopForm, endDate: e.target.value })} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-outline" onClick={() => setShowAddStop(false)} style={{ flex: 1 }}>Cancel</button>
            <button className="btn-primary" onClick={handleAddStop} style={{ flex: 2 }}>Add Stop</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowAddStop(true)} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '18px 24px', marginTop: '16px', background: 'var(--white)', border: '2px dashed var(--border-light)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, transition: 'border-color 0.2s, color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold-muted)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
          <Plus size={20} /> Add New Stop
        </button>
      )}
    </div>
  );
}
