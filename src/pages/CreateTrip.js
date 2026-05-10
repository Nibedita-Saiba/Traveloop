import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Check } from 'lucide-react';

const COLORS = ['#0A1628','#1E3A5F','#8B1A4A','#1A5C2E','#6B3A1F','#2C4A8B','#4A1A6B','#1A4A4A'];

export default function CreateTrip() {
  const { addTrip } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '', startDate: '', endDate: '', budget: '', coverColor: COLORS[0] });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Trip name is required';
    if (!form.startDate) e.startDate = 'Start date required';
    if (!form.endDate) e.endDate = 'End date required';
    if (form.startDate && form.endDate && form.endDate < form.startDate) e.endDate = 'End date must be after start';
    if (!form.budget || isNaN(Number(form.budget))) e.budget = 'Valid budget required';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const id = addTrip({ ...form, budget: Number(form.budget) });
    setSaved(true);
    setTimeout(() => navigate('/trips'), 1200);
  };

  return (
    <div style={{ maxWidth: '640px' }}>
      <h1 className="section-title">Create New Trip</h1>
      <p className="section-subtitle">Set up the basics for your adventure</p>

      <div className="card" style={{ padding: '36px' }}>
        <div className="form-group">
          <label>Trip Name *</label>
          <input placeholder="e.g. European Summer Tour" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          {errors.name && <span style={{ color: '#DC2626', fontSize: '0.8rem' }}>{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea placeholder="Describe your trip..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} style={{ resize: 'vertical' }} />
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label>Start Date *</label>
            <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
            {errors.startDate && <span style={{ color: '#DC2626', fontSize: '0.8rem' }}>{errors.startDate}</span>}
          </div>
          <div className="form-group">
            <label>End Date *</label>
            <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
            {errors.endDate && <span style={{ color: '#DC2626', fontSize: '0.8rem' }}>{errors.endDate}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Total Budget (USD) *</label>
          <input type="number" placeholder="e.g. 3000" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} />
          {errors.budget && <span style={{ color: '#DC2626', fontSize: '0.8rem' }}>{errors.budget}</span>}
        </div>

        <div className="form-group">
          <label>Cover Color</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {COLORS.map(c => (
              <button key={c} onClick={() => setForm({ ...form, coverColor: c })} style={{
                width: 36, height: 36, borderRadius: '8px', background: c, border: form.coverColor === c ? '3px solid var(--gold)' : '3px solid transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.15s'
              }}>
                {form.coverColor === c && <Check size={16} color="white" />}
              </button>
            ))}
          </div>
          {form.coverColor && (
            <div style={{ marginTop: '10px', height: '60px', borderRadius: 'var(--radius)', background: `linear-gradient(135deg, ${form.coverColor}, ${form.coverColor}88)`, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{form.name || 'Your Trip'}</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button className="btn-outline" onClick={() => navigate(-1)} style={{ flex: 1 }}>Cancel</button>
          <button className="btn-gold" onClick={handleSave} style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {saved ? <><Check size={17} /> Saved!</> : 'Create Trip'}
          </button>
        </div>
      </div>
    </div>
  );
}