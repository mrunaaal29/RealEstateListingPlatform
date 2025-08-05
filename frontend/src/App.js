import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import UserLogin from './components/UserLogin';
import Register from './components/Register';
import BrowseListings from './components/BrowseListings';
import AdminDashboard from './components/AdminDashboard'; // You’ll need this component

function App() {
  const [admin, setAdmin] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BrowseListings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<UserLogin />} />

        {/* Admin login route, pass the required onLogin prop */}
        <Route
          path="/admin/login"
          element={<AdminLogin onLogin={setAdmin} />}
        />

        {/* Admin dashboard protected route */}
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
