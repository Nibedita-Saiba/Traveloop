import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard, Map, PlusCircle, Briefcase, Search,
  Activity, DollarSign, Package, Share2, User, BarChart2,
  ChevronLeft, Menu, X, Globe
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/trips', icon: Briefcase, label: 'My Trips' },
  { to: '/create-trip', icon: PlusCircle, label: 'New Trip' },
  { to: '/itinerary', icon: Map, label: 'Itinerary' },
  { to: '/city-search', icon: Search, label: 'Explore Cities' },
  { to: '/activity-search', icon: Activity, label: 'Activities' },
  { to: '/budget', icon: DollarSign, label: 'Budget' },
  { to: '/packing', icon: Package, label: 'Packing List' },
  { to: '/notes', icon: Map, label: 'Trip Notes' },
  { to: '/share', icon: Share2, label: 'Share Trip' },
  { to: '/admin', icon: BarChart2, label: 'Analytics' },
];

export default function Sidebar() {
  const { user } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 36, height: 36, background: 'var(--gold)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Globe size={20} color="var(--navy)" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '-0.3px' }}>Traveloop</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Plan. Explore. Share.</div>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: '10px',
              marginBottom: '4px',
              fontWeight: isActive ? 600 : 400,
              fontSize: '0.88rem',
              color: isActive ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
              background: isActive ? 'rgba(201,168,76,0.12)' : 'transparent',
              transition: 'all 0.15s ease',
              textDecoration: 'none',
              borderLeft: isActive ? '3px solid var(--gold)' : '3px solid transparent',
            })}
          >
            <Icon size={17} style={{ flexShrink: 0 }} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
        <NavLink to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', textDecoration: 'none' }}>
          <div style={{ width: 34, height: 34, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{user.avatar}</div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--white)' }}>{user.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{user.email}</div>
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside style={{
        width: collapsed ? 72 : 260,
        background: 'var(--navy)',
        height: '100vh',
        position: 'fixed',
        left: 0, top: 0,
        zIndex: 100,
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }} className="desktop-sidebar">
        <button onClick={() => setCollapsed(!collapsed)} style={{
          position: 'absolute', right: -12, top: 24,
          width: 24, height: 24, borderRadius: '50%',
          background: 'var(--gold)', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 101, boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          <ChevronLeft size={14} color="var(--navy)" style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
        </button>
        <SidebarContent />
      </aside>

      {/* Mobile Toggle */}
      <button onClick={() => setMobileOpen(true)} style={{
        position: 'fixed', top: 16, left: 16, zIndex: 200,
        background: 'var(--navy)', color: 'var(--gold)',
        border: 'none', borderRadius: '10px',
        padding: '10px', display: 'none',
      }} className="mobile-menu-btn">
        <Menu size={20} />
      </button>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div onClick={() => setMobileOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 199 }} />
          <aside style={{
            position: 'fixed', left: 0, top: 0, bottom: 0, width: 260,
            background: 'var(--navy)', zIndex: 200,
          }}>
            <button onClick={() => setMobileOpen(false)} style={{
              position: 'absolute', right: 16, top: 16,
              background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
            }}><X size={20} /></button>
            <SidebarContent />
          </aside>
        </>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}