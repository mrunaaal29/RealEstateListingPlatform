import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h5>Total Listings</h5>
            <p>42</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h5>Registered Users</h5>
            <p>108</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-3 shadow-sm">
            <h5>Revenue</h5>
            <p>₹1,20,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
