import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import UserLogin from './components/UserLogin';
import Register from './components/Register';
import BrowseListings from './components/BrowseListings';
import AdminDashboard from './components/AdminDashboard';
import Welcome from './components/Welcome';

function App() {
  const [admin, setAdmin] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Welcome page as the home route */}
        <Route path="/" element={<Welcome />} />

        {/* User routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/browse" element={<BrowseListings />} />

        {/* Admin login */}
        <Route path="/admin/login" element={<AdminLogin onLogin={setAdmin} />} />

        {/* Protected admin dashboard */}
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
