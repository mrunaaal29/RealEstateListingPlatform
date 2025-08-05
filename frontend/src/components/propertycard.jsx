import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <img
        src={property.image || 'https://via.placeholder.com/300'}
        alt={property.title}
        className="mb-2 w-full h-48 object-cover"
      />
      <h2 className="font-bold text-lg">{property.title}</h2>
      <p>{property.location}</p>
      <p className="font-semibold text-green-600">{property.price}</p>

      <Link to={`/property/${property.id}`}>
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default PropertyCard;
