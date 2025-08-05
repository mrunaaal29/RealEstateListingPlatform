import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/DeleteListing.css'; // optional if you want styling

function DeleteListing() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchListingDetails();
  }, []);

  const fetchListingDetails = async () => {
    try {
      const ownerId = localStorage.getItem('ownerId');
      const res = await axios.get(`http://localhost:5000/api/owner/${ownerId}/listings`);
      const match = res.data.find(item => item.id === parseInt(listingId));
      if (match) {
        setListing(match);
      } else {
        setMessage('Listing not found or unauthorized');
      }
    } catch (err) {
      console.error('Error fetching listing:', err);
      setMessage('Error loading listing.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/listings/${listingId}`);
      setMessage('Listing deleted successfully!');
      setTimeout(() => navigate('/owner/dashboard'), 1500);
    } catch (err) {
      console.error('Error deleting listing:', err);
      setMessage('Failed to delete listing');
    }
  };

  const handleCancel = () => {
    navigate('/owner/dashboard');
  };

  return (
    <div className="delete-listing-container">
      <h2>Delete Listing</h2>
      {message && <p>{message}</p>}
      {listing ? (
        <div className="listing-info">
          <p>Are you sure you want to delete <strong>{listing.property_name}</strong>?</p>
          <div className="btn-group">
            <button className="delete-confirm" onClick={handleDelete}>Yes, Delete</button>
            <button className="cancel-delete" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        !message && <p>Loading listing details...</p>
      )}
    </div>
  );
}

export default DeleteListing;
