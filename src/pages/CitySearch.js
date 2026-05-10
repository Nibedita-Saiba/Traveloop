import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Globe, TrendingUp, DollarSign } from 'lucide-react';

export default function CitySearch() {
  const { cities } = useApp();
  const [query, setQuery] = useState('');
  const [continent, setContinent] = useState('All');
  const [costFilter, setCostFilter] = useState('All');

  const continents = ['All', ...new Set(cities.map(c => c.continent))];
  const costLevels = ['All', 'Low', 'Medium', 'High', 'Very High'];

  const filtered = cities.filter(c =>
    (c.name.toLowerCase().includes(query.toLowerCase()) || c.country.toLowerCase().includes(query.toLowerCase())) &&
    (continent === 'All' || c.continent === continent) &&
    (costFilter === 'All' || c.costIndex === costFilter)
  );

  const costColor = { Low: '#16A34A', Medium: '#D97706', High: '#DC2626', 'Very High': '#7C3AED' };

  return (
    <div>
      <h1 className="section-title">Explore Cities</h1>
      <p className="section-subtitle">Discover destinations for your next adventure</p>

      {/* Search */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input placeholder="Search cities or countries..." value={query} onChange={e => setQuery(e.target.value)} style={{ width: '100%', paddingLeft: '42px', padding: '12px 16px 12px 42px', border: '2px solid var(--border-light)', borderRadius: 'var(--radius)', background: 'var(--white)', fontSize: '0.9rem' }} />
        </div>
        <select value={continent} onChange={e => setContinent(e.target.value)} style={{ padding: '11px 16px', border: '2px solid var(--border-light)', borderRadius: 'var(--radius)', background: 'var(--white)', fontSize: '0.88rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
          {continents.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={costFilter} onChange={e => setCostFilter(e.target.value)} style={{ padding: '11px 16px', border: '2px solid var(--border-light)', borderRadius: 'var(--radius)', background: 'var(--white)', fontSize: '0.88rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
          {costLevels.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{filtered.length} cities found</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {filtered.map(city => (
          <div key={city.id} className="card" style={{ padding: '24px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ fontSize: '2.8rem' }}>{city.emoji}</div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                  <TrendingUp size={13} color="var(--gold-muted)" />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{city.popularity}% popular</span>
                </div>
                <div style={{ marginTop: '4px' }}>
                  <div style={{ height: 4, width: 80, background: 'var(--cream-dark)', borderRadius: 2 }}>
                    <div style={{ height: '100%', background: 'var(--gold)', borderRadius: 2, width: `${city.popularity}%` }} />
                  </div>
                </div>
              </div>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '2px' }}>{city.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <Globe size={13} color="var(--text-muted)" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{city.country} · {city.continent}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>{city.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <DollarSign size={14} color={costColor[city.costIndex] || 'var(--text-muted)'} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: costColor[city.costIndex] }}>{city.costIndex} Cost</span>
              </div>
              <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Add to Trip</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}