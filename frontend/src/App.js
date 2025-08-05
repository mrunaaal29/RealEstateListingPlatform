// 📍 frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Listings from './pages/Listings';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

