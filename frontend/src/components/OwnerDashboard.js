import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/OwnerDashboard.css';

function OwnerDashboard() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOwnerListings();
  }, []);

  const fetchOwnerListings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const ownerId = user?.id;
      const res = await axios.get(`http://localhost:5000/api/owner/${ownerId}/listings`);
      setListings(res.data);
    } catch (err) {
      console.error('Error fetching listings:', err);
    }
  };

  const handleEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`);
  };

  const handleDelete = (listingId) => {
    navigate(`/delete-listing/${listingId}`);
  };

  const handleAddListing = () => {
    navigate('/add-listing');
  };

  return (
    <div className="owner-dashboard">
       <div class="dashboard-heading-box">
        <h2>Owner Dashboard</h2>
      </div>
      <button className="add-button" onClick={handleAddListing}>Add New Property</button>
      <div className="listing-grid">
        {listings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          listings.map((listing) => (
            <div key={listing.id} className="listing-card">
              <h3>{listing.property_name}</h3>
              <p><strong>Price:</strong> ₹{listing.price}</p>
              <p><strong>Location:</strong> {listing.location}</p>
              <p><strong>Description:</strong> {listing.description}</p>
              <div className="btn-group">
                <button className="edit-button" onClick={() => handleEdit(listing.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(listing.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;
