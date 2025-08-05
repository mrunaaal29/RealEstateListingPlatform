import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/AdminDashboard.css';


function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchListings();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const fetchListings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/listings');
      setListings(res.data);
    } catch (err) {
      console.error('Failed to fetch listings', err);
    }
  };

  const updateListingStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/listings/${id}`, { status });
      fetchListings();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const deleteListing = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/listings/${id}`);
      fetchListings();
    } catch (err) {
      console.error('Failed to delete listing', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <section className="admin-section">
        <h2>Registered Users</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="admin-section">
        <h2>Property Listings</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Property Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Location</th>
              <th>Status</th>
              <th>Owner ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map(listing => (
              <tr key={listing.id}>
                <td>{listing.id}</td>
                <td>{listing.property_name}</td>
                <td>{listing.description}</td>
                <td>{listing.price}</td>
                <td>{listing.location}</td>
                <td>{listing.status}</td>
                <td>{listing.owner_id}</td>
                <td>
                  <button onClick={() => updateListingStatus(listing.id, 'approved')}>Approve</button>
                  <button onClick={() => updateListingStatus(listing.id, 'rejected')}>Reject</button>
                  <button onClick={() => deleteListing(listing.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminDashboard;
