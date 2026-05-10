import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, AlertTriangle, TrendingUp, Target } from 'lucide-react';

const COLORS = ['#C9A84C', '#0A1628', '#8B1A4A', '#1A5C2E', '#2C4A8B', '#6B3A1F'];

export default function Budget() {
  const { trips } = useApp();
  const [selectedTrip, setSelectedTrip] = useState(trips[0]?.id || '');

  const trip = trips.find(t => t.id === selectedTrip);

  if (!trip) return (
    <div>
      <h1 className="section-title">Budget & Cost Breakdown</h1>
      <p className="section-subtitle">No trips found. Create a trip first.</p>
    </div>
  );

  const actCost = trip.stops.reduce((s, stop) => s + stop.activities.reduce((ss, a) => ss + (a.cost || 0), 0), 0);
  const accommodation = Math.round(trip.budget * 0.35);
  const transport = Math.round(trip.budget * 0.2);
  const meals = Math.round(trip.budget * 0.2);
  const misc = Math.round(trip.budget * 0.1);
  const totalEstimated = actCost + accommodation + transport + meals + misc;

  const pieData = [
    { name: 'Accommodation', value: accommodation },
    { name: 'Activities', value: actCost },
    { name: 'Transport', value: transport },
    { name: 'Meals', value: meals },
    { name: 'Miscellaneous', value: misc },
  ];

  const barData = trip.stops.map(stop => ({
    name: stop.city,
    Activities: stop.activities.reduce((s, a) => s + (a.cost || 0), 0),
    Accommodation: Math.round(accommodation / trip.stops.length),
    Meals: Math.round(meals / trip.stops.length),
  }));

  const pct = Math.round(trip.spent / trip.budget * 100);
  const isOver = pct > 90;
  const days = Math.round((new Date(trip.endDate) - new Date(trip.startDate)) / 86400000) || 1;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="section-title">Budget Breakdown</h1>
          <p className="section-subtitle">Track and manage your travel expenses</p>
        </div>
        <select value={selectedTrip} onChange={e => setSelectedTrip(e.target.value)} style={{ padding: '10px 16px', border: '2px solid var(--border-light)', borderRadius: 'var(--radius)', background: 'var(--white)', fontSize: '0.9rem', cursor: 'pointer' }}>
          {trips.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      {/* Alert */}
      {isOver && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 'var(--radius)', marginBottom: '24px' }}>
          <AlertTriangle size={20} color="#DC2626" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#DC2626' }}>Budget alert: You've used {pct}% of your budget. Consider adjusting your spending.</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid-3" style={{ marginBottom: '28px' }}>
        {[
          { label: 'Total Budget', value: `$${trip.budget.toLocaleString()}`, icon: Target, color: '#2C4A8B' },
          { label: 'Estimated Total', value: `$${totalEstimated.toLocaleString()}`, icon: TrendingUp, color: isOver ? '#DC2626' : '#1A5C2E' },
          { label: 'Per Day', value: `$${Math.round(trip.budget / days).toLocaleString()}`, icon: DollarSign, color: 'var(--gold-muted)' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card" style={{ padding: '22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={22} color={color} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Budget bar */}
      <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)' }}>Budget Used</span>
          <span style={{ fontSize: '0.85rem', color: isOver ? '#DC2626' : 'var(--text-muted)', fontWeight: 600 }}>{pct}% — ${trip.spent.toLocaleString()} of ${trip.budget.toLocaleString()}</span>
        </div>
        <div style={{ height: 12, background: 'var(--cream-dark)', borderRadius: 6 }}>
          <div style={{ height: '100%', background: isOver ? '#DC2626' : 'var(--gold)', borderRadius: 6, width: `${Math.min(pct, 100)}%`, transition: 'width 0.6s' }} />
        </div>
      </div>

      {/* Charts */}
      <div className="grid-2" style={{ marginBottom: '24px' }}>
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '20px' }}>Cost Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={3}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: '0.78rem' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '20px' }}>Cost by Destination</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => `$${v}`} />
              <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: '0.78rem' }} />
              <Bar dataKey="Activities" fill={COLORS[0]} radius={[3,3,0,0]} />
              <Bar dataKey="Accommodation" fill={COLORS[1]} radius={[3,3,0,0]} />
              <Bar dataKey="Meals" fill={COLORS[2]} radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '16px' }}>Detailed Breakdown</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
              {['Category', 'Estimated', '% of Budget'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600, color: 'var(--text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pieData.map((item, i) => (
              <tr key={item.name} style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{item.name}</span>
                </td>
                <td style={{ padding: '12px', fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)' }}>${item.value.toLocaleString()}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ flex: 1, height: 6, background: 'var(--cream-dark)', borderRadius: 3, maxWidth: 100 }}>
                      <div style={{ height: '100%', background: COLORS[i % COLORS.length], borderRadius: 3, width: `${Math.round(item.value / totalEstimated * 100)}%` }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minWidth: '32px' }}>{Math.round(item.value / totalEstimated * 100)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}