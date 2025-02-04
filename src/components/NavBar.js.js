// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div style={{ padding: '1rem', background: '#f0f0f0' }}>
    <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
    {/* You can add additional links here if needed */}
  </div>
);

export default NavBar;
