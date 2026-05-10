import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

const SAMPLE_TRIPS = [
  {
    id: '1',
    name: 'European Grand Tour',
    description: 'A classic journey through the heart of Europe',
    startDate: '2024-06-10',
    endDate: '2024-06-28',
    coverColor: '#1E3A5F',
    stops: [
      { id: 's1', city: 'Paris', country: 'France', emoji: '🗼', startDate: '2024-06-10', endDate: '2024-06-14', activities: [{ id: 'a1', name: 'Eiffel Tower Visit', type: 'Sightseeing', cost: 30, duration: '2h' }, { id: 'a2', name: 'Louvre Museum', type: 'Culture', cost: 22, duration: '4h' }, { id: 'a3', name: 'Seine River Cruise', type: 'Adventure', cost: 15, duration: '1h' }] },
      { id: 's2', city: 'Rome', country: 'Italy', emoji: '🏛️', startDate: '2024-06-14', endDate: '2024-06-18', activities: [{ id: 'a4', name: 'Colosseum Tour', type: 'History', cost: 18, duration: '3h' }, { id: 'a5', name: 'Vatican Museums', type: 'Culture', cost: 25, duration: '4h' }] },
      { id: 's3', city: 'Barcelona', country: 'Spain', emoji: '🌊', startDate: '2024-06-18', endDate: '2024-06-22', activities: [{ id: 'a6', name: 'Sagrada Familia', type: 'Architecture', cost: 35, duration: '3h' }, { id: 'a7', name: 'Tapas Food Tour', type: 'Food', cost: 55, duration: '3h' }] },
    ],
    budget: 3500,
    spent: 2840,
    notes: ['Book restaurant reservations early', 'Get Eurail pass for trains'],
    packingList: [
      { id: 'p1', item: 'Passport', category: 'Documents', packed: true },
      { id: 'p2', item: 'Travel insurance', category: 'Documents', packed: true },
      { id: 'p3', item: 'Walking shoes', category: 'Clothing', packed: false },
      { id: 'p4', item: 'Camera', category: 'Electronics', packed: false },
      { id: 'p5', item: 'Power adapter', category: 'Electronics', packed: true },
    ],
  },
  {
    id: '2',
    name: 'Japan Sakura Season',
    description: 'Cherry blossoms and ancient temples',
    startDate: '2024-03-25',
    endDate: '2024-04-08',
    coverColor: '#8B1A4A',
    stops: [
      { id: 's4', city: 'Tokyo', country: 'Japan', emoji: '🗾', startDate: '2024-03-25', endDate: '2024-03-30', activities: [{ id: 'a8', name: 'Shibuya Crossing', type: 'Sightseeing', cost: 0, duration: '1h' }, { id: 'a9', name: 'Tsukiji Market', type: 'Food', cost: 40, duration: '2h' }] },
      { id: 's5', city: 'Kyoto', country: 'Japan', emoji: '⛩️', startDate: '2024-03-30', endDate: '2024-04-05', activities: [{ id: 'a10', name: 'Fushimi Inari', type: 'Sightseeing', cost: 0, duration: '3h' }, { id: 'a11', name: 'Geisha District Walk', type: 'Culture', cost: 0, duration: '2h' }] },
    ],
    budget: 4200,
    spent: 3100,
    notes: ['Book Shinkansen tickets in advance'],
    packingList: [
      { id: 'p6', item: 'JR Pass', category: 'Documents', packed: true },
      { id: 'p7', item: 'Pocket WiFi', category: 'Electronics', packed: false },
    ],
  },
];

const CITIES = [
  { id: 'c1', name: 'Paris', country: 'France', continent: 'Europe', emoji: '🗼', costIndex: 'High', popularity: 98, description: 'City of Light and Love' },
  { id: 'c2', name: 'Tokyo', country: 'Japan', continent: 'Asia', emoji: '🗾', costIndex: 'High', popularity: 97, description: 'Where tradition meets future' },
  { id: 'c3', name: 'Rome', country: 'Italy', continent: 'Europe', emoji: '🏛️', costIndex: 'Medium', popularity: 95, description: 'The Eternal City' },
  { id: 'c4', name: 'Barcelona', country: 'Spain', continent: 'Europe', emoji: '🌊', costIndex: 'Medium', popularity: 93, description: 'Gaudí\'s architectural playground' },
  { id: 'c5', name: 'New York', country: 'USA', continent: 'Americas', emoji: '🗽', costIndex: 'Very High', popularity: 99, description: 'The city that never sleeps' },
  { id: 'c6', name: 'Bangkok', country: 'Thailand', continent: 'Asia', emoji: '🏯', costIndex: 'Low', popularity: 90, description: 'Temple of wonders' },
  { id: 'c7', name: 'Dubai', country: 'UAE', continent: 'Middle East', emoji: '🏙️', costIndex: 'High', popularity: 88, description: 'Desert metropolis of the future' },
  { id: 'c8', name: 'Kyoto', country: 'Japan', continent: 'Asia', emoji: '⛩️', costIndex: 'Medium', popularity: 91, description: 'Ancient capital of Japan' },
  { id: 'c9', name: 'Amsterdam', country: 'Netherlands', continent: 'Europe', emoji: '🌷', costIndex: 'High', popularity: 87, description: 'City of canals and culture' },
  { id: 'c10', name: 'Sydney', country: 'Australia', continent: 'Oceania', emoji: '🦘', costIndex: 'High', popularity: 89, description: 'Harbour city down under' },
  { id: 'c11', name: 'Bali', country: 'Indonesia', continent: 'Asia', emoji: '🌺', costIndex: 'Low', popularity: 85, description: 'Island of the Gods' },
  { id: 'c12', name: 'Istanbul', country: 'Turkey', continent: 'Europe/Asia', emoji: '🕌', costIndex: 'Low', popularity: 86, description: 'Where East meets West' },
];

const ACTIVITIES = [
  { id: 'act1', name: 'City Walking Tour', type: 'Sightseeing', cost: 20, duration: '3h', description: 'Explore the heart of the city on foot' },
  { id: 'act2', name: 'Local Food Tour', type: 'Food', cost: 65, duration: '3h', description: 'Taste authentic local cuisine' },
  { id: 'act3', name: 'Museum Pass', type: 'Culture', cost: 30, duration: '4h', description: 'Access to top museums' },
  { id: 'act4', name: 'Sunset Boat Cruise', type: 'Adventure', cost: 45, duration: '2h', description: 'Scenic coastal cruise' },
  { id: 'act5', name: 'Cooking Class', type: 'Food', cost: 80, duration: '4h', description: 'Learn to cook local dishes' },
  { id: 'act6', name: 'Historical Sites Tour', type: 'History', cost: 35, duration: '5h', description: 'Guided tour of historic landmarks' },
  { id: 'act7', name: 'Spa & Wellness Day', type: 'Wellness', cost: 120, duration: '4h', description: 'Relax and rejuvenate' },
  { id: 'act8', name: 'Night Market Visit', type: 'Food', cost: 15, duration: '2h', description: 'Explore vibrant night markets' },
  { id: 'act9', name: 'Adventure Hiking', type: 'Adventure', cost: 40, duration: '6h', description: 'Trek through scenic landscapes' },
  { id: 'act10', name: 'Photography Tour', type: 'Culture', cost: 55, duration: '3h', description: 'Capture the best spots' },
];

export function AppProvider({ children }) {
  const [user] = useState({ name: 'Alex Rivera', email: 'alex@traveloop.com', avatar: '🧳' });
  const [trips, setTrips] = useState(SAMPLE_TRIPS);
  const [activeTrip, setActiveTrip] = useState(null);

  const addTrip = (tripData) => {
    const newTrip = { ...tripData, id: Date.now().toString(), stops: [], notes: [], packingList: [], spent: 0 };
    setTrips(prev => [newTrip, ...prev]);
    return newTrip.id;
  };

  const updateTrip = (id, data) => setTrips(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
  const deleteTrip = (id) => setTrips(prev => prev.filter(t => t.id !== id));

  const addStop = (tripId, stop) => {
    const newStop = { ...stop, id: Date.now().toString(), activities: [] };
    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, stops: [...t.stops, newStop] } : t));
  };

  const removeStop = (tripId, stopId) => setTrips(prev => prev.map(t => t.id === tripId ? { ...t, stops: t.stops.filter(s => s.id !== stopId) } : t));

  const addActivity = (tripId, stopId, activity) => {
    const newActivity = { ...activity, id: Date.now().toString() };
    setTrips(prev => prev.map(t => t.id === tripId ? {
      ...t, stops: t.stops.map(s => s.id === stopId ? { ...s, activities: [...s.activities, newActivity] } : s)
    } : t));
  };

  const removeActivity = (tripId, stopId, activityId) => {
    setTrips(prev => prev.map(t => t.id === tripId ? {
      ...t, stops: t.stops.map(s => s.id === stopId ? { ...s, activities: s.activities.filter(a => a.id !== activityId) } : s)
    } : t));
  };

  const addNote = (tripId, note) => {
    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, notes: [...t.notes, note] } : t));
  };

  const removeNote = (tripId, idx) => {
    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, notes: t.notes.filter((_, i) => i !== idx) } : t));
  };

  const togglePackingItem = (tripId, itemId) => {
    setTrips(prev => prev.map(t => t.id === tripId ? {
      ...t, packingList: t.packingList.map(p => p.id === itemId ? { ...p, packed: !p.packed } : p)
    } : t));
  };

  const addPackingItem = (tripId, item) => {
    const newItem = { ...item, id: Date.now().toString(), packed: false };
    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, packingList: [...t.packingList, newItem] } : t));
  };

  const removePackingItem = (tripId, itemId) => {
    setTrips(prev => prev.map(t => t.id === tripId ? { ...t, packingList: t.packingList.filter(p => p.id !== itemId) } : t));
  };

  return (
    <AppContext.Provider value={{
      user, trips, activeTrip, setActiveTrip, cities: CITIES, activities: ACTIVITIES,
      addTrip, updateTrip, deleteTrip, addStop, removeStop,
      addActivity, removeActivity, addNote, removeNote,
      togglePackingItem, addPackingItem, removePackingItem,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
