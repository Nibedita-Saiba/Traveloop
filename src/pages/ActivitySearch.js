import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Clock, DollarSign, Plus, X } from 'lucide-react';

const TYPE_COLORS = {
  Sightseeing: '#1E3A5F', Food: '#B45309', Culture: '#4A1A6B',
  Adventure: '#1A5C2E', History: '#6B3A1F', Wellness: '#1A4A4A'
};

export default function ActivitySearch() {
  const { activities } = useApp();
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [maxCost, setMaxCost] = useState(200);
  const [added, setAdded] = useState([]);

  const types = ['All', ...new Set(activities.map(a => a.type))];
  const filtered = activities.filter(a =>
    a.name.toLowerCase().includes(query.toLowerCase()) &&
    (typeFilter === 'All' || a.type === typeFilter) &&
    a.cost <= maxCost
  );

  const toggleAdd = (id) => setAdded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div>
      <h1 className="section-title">Activity Search</h1>
      <p className="section-subtitle">Browse and add experiences to your trip stops</p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input placeholder="Search activities..." value={query} onChange={e => setQuery(e.target.value)} style={{ width: '100%', paddingLeft: '42px', padding: '11px 16px 11px 42px', border: '2px solid var(--border-light)', borderRadius: 'var(--radius)', background: 'var(--white)', fontSize: '0.9rem' }} />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '11px 16px', border: '2px solid var(--border-light)', borderRadius: 'var(--radius)', background: 'var(--white)', fontSize: '0.88rem', cursor: 'pointer' }}>
          {types.map(t => <option key={t}>{t}</option>)}
        </select>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--white)', padding: '10px 16px', borderRadius: 'var(--radius)', border: '2px solid var(--border-light)' }}>
          <DollarSign size={15} color="var(--text-muted)" />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Max ${maxCost}</span>
          <input type="range" min={0} max={200} value={maxCost} onChange={e => setMaxCost(Number(e.target.value))} style={{ width: '100px' }} />
        </div>
      </div>

      {added.length > 0 && (
        <div style={{ marginBottom: '20px', padding: '12px 16px', background: 'rgba(201,168,76,0.1)', borderRadius: 'var(--radius)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--gold-muted)' }}>{added.length} activit{added.length > 1 ? 'ies' : 'y'} selected</span>
          <button onClick={() => setAdded([])} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={16} /></button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {filtered.map(act => {
          const isAdded = added.includes(act.id);
          const color = TYPE_COLORS[act.type] || 'var(--navy)';
          return (
            <div key={act.id} className="card" style={{ padding: '22px', border: isAdded ? `2px solid var(--gold)` : '1px solid var(--border-light)', transition: 'transform 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.73rem', fontWeight: 600, letterSpacing: '0.5px', background: `${color}18`, color }}>
                  {act.type}
                </span>
                <button onClick={() => toggleAdd(act.id)} style={{
                  width: 30, height: 30, borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: isAdded ? 'var(--gold)' : 'var(--cream-dark)',
                  color: isAdded ? 'var(--navy)' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                }}>
                  {isAdded ? <X size={14} /> : <Plus size={14} />}
                </button>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>{act.name}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.5 }}>{act.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <Clock size={13} />{act.duration}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: act.cost === 0 ? '#16A34A' : 'var(--navy)' }}>
                  {act.cost === 0 ? 'Free' : `$${act.cost}`}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}