// frontend/src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


import Navbar from './components/Navbar'; // ⬅️ Import it

import Welcome from './components/Welcome';
import Register from './components/Register';
import UserLogin from './components/UserLogin';
import BrowseListings from './components/BrowseListings';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Listings from './pages/Listings'; // this is your working Listings.jsx
import OwnerDashboard from './components/OwnerDashboard';
import AddListing from './components/AddListing';
import EditListing from './components/EditListing';
import DeleteListing from './components/DeleteListing';
import UserDashboard from './components/UserDashboard';


function App() {
  const [admin, setAdmin] = useState(null);

  return (
     <Router>
      <Navbar /> {/* ⬅️ This will now show on all pages */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/browse" element={<BrowseListings />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/edit-listing/:listingId" element={<EditListing />} />
        <Route path="/delete-listing/:listingId" element={<DeleteListing />} />
        <Route path="/buyer/dashboard" element={<UserDashboard />} />

        <Route path="/admin/login" element={<AdminLogin onLogin={setAdmin} />} />
        <Route
          path="/admin/dashboard"
          element={
            admin ? (
              <AdminDashboard admin={admin} />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
