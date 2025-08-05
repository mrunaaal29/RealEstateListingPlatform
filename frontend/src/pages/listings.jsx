// src/pages/Listings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // for loader
  const [error, setError] = useState(false); // if backend fails

  useEffect(() => {
    axios.get('http://localhost:5000/properties')  // Flask endpoint
      .then((response) => {
        setProperties(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching properties:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading properties...</h2>;
  if (error) return <h2>Could not load properties. Backend error?</h2>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏘️ Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Listings;
