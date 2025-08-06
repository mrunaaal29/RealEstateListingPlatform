// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">🏠 RealEstate</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">REGISTER</Link></li> {/* Was /owner, corrected */}
        <li><Link to="/login">LOGIN</Link></li>       {/* Was /user, corrected */}
        <li><Link to="/admin/login">ADMIN</Link></li> {/* Was /adminlogin, corrected */}
      </ul>
    </nav>
  );
}

export default Navbar;
