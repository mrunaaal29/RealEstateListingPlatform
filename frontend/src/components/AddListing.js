import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/AddListing.css';

function AddListing() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    property_name: '',
    description: '',
    price: '',
    location: '',
    property_type: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const owner_id = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    if (!owner_id || role !== 'owner') {
      setMessage('Only logged-in owners can add listings!');
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        price: parseFloat(formData.price), // ensure price is a number
        owner_id
      };

      const res = await axios.post('http://localhost:5000/api/listings', dataToSend);

      if (res.status === 201) {
        setMessage('Listing added successfully!');
        setFormData({
          property_name: '',
          description: '',
          price: '',
          location: '',
          property_type: '',
        });

        // Redirect to dashboard after short delay (optional)
        setTimeout(() => {
          navigate('/owner/dashboard');
        }, 1500);
      } else {
        setMessage('Failed to add listing');
      }
    } catch (error) {
      console.error('Error adding listing:', error);
      setMessage('Server error: Failed to add listing');
    }
  };

  return (
    <div className="add-listing-container">
      <h2>Add New Property</h2>
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
        <button type="submit">Add Listing</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddListing;
