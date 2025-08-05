import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/AddListing.css'; // Reusing same CSS

function EditListing() {
  const { listingId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    property_name: '',
    description: '',
    price: '',
    location: '',
    property_type: '',
  });

  const [message, setMessage] = useState('');

 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/owner/${localStorage.getItem('ownerId')}/listings`);
      const listing = res.data.find(item => item.id === parseInt(listingId));
      if (listing) {
        setFormData({
          property_name: listing.property_name,
          description: listing.description,
          price: listing.price,
          location: listing.location,
          property_type: listing.property_type,
        });
      } else {
        setMessage('Listing not found or unauthorized access.');
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
      setMessage('Failed to load listing.');
    }
  };

  fetchData();
}, [listingId]);


  const fetchListingData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/owner/${localStorage.getItem('ownerId')}/listings`);
      const listing = res.data.find(item => item.id === parseInt(listingId));
      if (listing) {
        setFormData({
          property_name: listing.property_name,
          description: listing.description,
          price: listing.price,
          location: listing.location,
          property_type: listing.property_type,
        });
      } else {
        setMessage('Listing not found or unauthorized access.');
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
      setMessage('Failed to load listing.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/listings/${listingId}`, {
        ...formData,
        price: parseFloat(formData.price),
      });

      if (res.status === 200) {
        setMessage('Listing updated successfully!');
        setTimeout(() => {
          navigate('/owner/dashboard');
        }, 1500);
      } else {
        setMessage('Failed to update listing');
      }
    } catch (err) {
      console.error('Error updating listing:', err);
      setMessage('Server error during update');
    }
  };

  return (
    <div className="add-listing-container">
      <h2>Edit Listing</h2>
      <form onSubmit={handleSubmit} className="add-listing-form">
        <input
          type="text"
          name="property_name"
          placeholder="Property Name"
          value={formData.property_name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (in ₹)"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <select
          name="property_type"
          value={formData.property_type}
          onChange={handleChange}
          required
        >
          <option value="">Select Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Land">Land</option>
        </select>
        <button type="submit">Update Listing</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default EditListing;
