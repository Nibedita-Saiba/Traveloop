import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyTrips from './pages/MyTrips';
import CreateTrip from './pages/CreateTrip';
import Itinerary from './pages/Itinerary';
import CitySearch from './pages/CitySearch';
import ActivitySearch from './pages/ActivitySearch';
import Budget from './pages/Budget';
import PackingList from './pages/PackingList';
import { TripNotes, ShareTrip, Profile, Admin } from './pages/OtherPages';

function AppLayout({ children }) {
  return (
    <div className="page-wrapper">
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/trips" element={<AppLayout><MyTrips /></AppLayout>} />
          <Route path="/create-trip" element={<AppLayout><CreateTrip /></AppLayout>} />
          <Route path="/itinerary" element={<AppLayout><Itinerary /></AppLayout>} />
          <Route path="/city-search" element={<AppLayout><CitySearch /></AppLayout>} />
          <Route path="/activity-search" element={<AppLayout><ActivitySearch /></AppLayout>} />
          <Route path="/budget" element={<AppLayout><Budget /></AppLayout>} />
          <Route path="/packing" element={<AppLayout><PackingList /></AppLayout>} />
          <Route path="/notes" element={<AppLayout><TripNotes /></AppLayout>} />
          <Route path="/share" element={<AppLayout><ShareTrip /></AppLayout>} />
          <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
          <Route path="/admin" element={<AppLayout><Admin /></AppLayout>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
