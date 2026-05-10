import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Package, Plus, Trash2, Check, RefreshCw } from 'lucide-react';

const CATEGORIES = ['Documents', 'Clothing', 'Electronics', 'Toiletries', 'Medical', 'Other'];
const CAT_EMOJIS = { Documents: '📄', Clothing: '👕', Electronics: '📱', Toiletries: '🧴', Medical: '💊', Other: '📦' };

export default function PackingList() {
  const { trips, togglePackingItem, addPackingItem, removePackingItem } = useApp();
  const [selectedTrip, setSelectedTrip] = useState(trips[0]?.id || '');
  const [newItem, setNewItem] = useState('');
  const [newCat, setNewCat] = useState('Other');
  const [filterCat, setFilterCat] = useState('All');

  const trip = trips.find(t => t.id === selectedTrip);

  if (!trip) return (
    <div><h1 className="section-title">Packing List</h1><p className="section-subtitle">No trips found.</p></div>
  );

  const list = trip.packingList || [];
  const filtered = list.filter(i => filterCat === 'All' || i.category === filterCat);
  const packed = list.filter(i => i.packed).length;
  const pct = list.length ? Math.round(packed / list.length * 100) : 0;

  const handleAdd = () => {
    if (!newItem.trim()) return;
    addPackingItem(selectedTrip, { item: newItem.trim(), category: newCat });
    setNewItem('');
  };

  const grouped = CATEGORIES.reduce((acc, cat) => {
    const items = filtered.filter(i => i.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="section-title">Packing Checklist</h1>
          <p className="section-subtitle">Never forget the essentials</p>
        </div>
        <select value={selectedTrip} onChange={e => setSelectedTrip(e.target.value)} style={{ padding: '10px 16px', border: '2px solid var(--border-light)', borderRadius: 'var(--radius)', background: 'var(--white)', fontSize: '0.9rem', cursor: 'pointer' }}>
          {trips.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      {/* Progress */}
      <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Package size={20} color="var(--gold-muted)" />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy)' }}>{packed} of {list.length} items packed</span>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: pct === 100 ? '#16A34A' : 'var(--navy)' }}>{pct}%</span>
        </div>
        <div style={{ height: 10, background: 'var(--cream-dark)', borderRadius: 5 }}>
          <div style={{ height: '100%', background: pct === 100 ? '#16A34A' : 'var(--gold)', borderRadius: 5, width: `${pct}%`, transition: 'width 0.4s' }} />
        </div>
        {pct === 100 && <div style={{ marginTop: '10px', fontSize: '0.88rem', color: '#16A34A', fontWeight: 600 }}>🎉 All packed! Ready to go!</div>}
      </div>

      {/* Add Item */}
      <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input placeholder="Add an item..." value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdd()}
            style={{ flex: '1 1 200px', padding: '10px 14px', border: '2px solid var(--border-light)', borderRadius: 'var(--radius)', fontSize: '0.9rem', background: 'var(--cream)' }} />
          <select value={newCat} onChange={e => setNewCat(e.target.value)} style={{ padding: '10px 14px', border: '2px solid var(--border-light)', borderRadius: 'var(--radius)', fontSize: '0.88rem', cursor: 'pointer', background: 'var(--cream)' }}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <button className="btn-primary" onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px' }}>
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['All', ...CATEGORIES].map(c => (
          <button key={c} onClick={() => setFilterCat(c)} style={{
            padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600,
            background: filterCat === c ? 'var(--navy)' : 'var(--white)',
            color: filterCat === c ? 'var(--gold)' : 'var(--text-muted)',
            border: `1px solid ${filterCat === c ? 'var(--navy)' : 'var(--border-light)'}`,
            cursor: 'pointer', transition: 'all 0.15s'
          }}>{CAT_EMOJIS[c] || '📦'} {c}</button>
        ))}
      </div>

      {/* Items by Category */}
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{ fontSize: '1.1rem' }}>{CAT_EMOJIS[cat]}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy)' }}>{cat}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>({items.filter(i => i.packed).length}/{items.length})</span>
          </div>
          <div className="card" style={{ overflow: 'hidden' }}>
            {items.map((item, idx) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px', borderBottom: idx < items.length - 1 ? '1px solid var(--border-light)' : 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <button onClick={() => togglePackingItem(selectedTrip, item.id)} style={{
                  width: 24, height: 24, borderRadius: '6px', border: `2px solid ${item.packed ? 'var(--gold)' : 'var(--border-light)'}`,
                  background: item.packed ? 'var(--gold)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s'
                }}>
                  {item.packed && <Check size={13} color="var(--navy)" />}
                </button>
                <span style={{ flex: 1, fontSize: '0.9rem', color: item.packed ? 'var(--text-muted)' : 'var(--navy)', textDecoration: item.packed ? 'line-through' : 'none', transition: 'all 0.2s' }}>
                  {item.item}
                </span>
                <button onClick={() => removePackingItem(selectedTrip, item.id)} style={{ width: 28, height: 28, borderRadius: '6px', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎒</div>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', marginBottom: '8px' }}>Your list is empty</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Start adding items to your packing list above</p>
        </div>
      )}
    </div>
  );
}
