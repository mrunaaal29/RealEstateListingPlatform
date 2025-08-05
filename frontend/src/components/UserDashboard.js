// frontend/src/components/UserDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/UserDashboard.css';

function UserDashboard() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchListings();
  }, [searchTerm]);

  const fetchListings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/listings?q=${searchTerm}`);
      setListings(res.data);
    } catch (err) {
      console.error('Error fetching listings:', err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="user-dashboard">
      <h2>Browse Listings</h2>

      <input
        type="text"
        placeholder="Search by property name or location..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <div className="listing-grid">
        {listings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          listings.map((listing) => (
            <div key={listing.id} className="listing-card">
              <h3>{listing.property_name}</h3>
              <p><strong>Price:</strong> ₹{listing.price}</p>
              <p><strong>Location:</strong> {listing.location}</p>
              <p><strong>Type:</strong> {listing.property_type}</p>
              <p>{listing.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
