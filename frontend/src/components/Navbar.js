import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/register">Register</Link> {/* Dodany link */}
    </nav>
  );
}

export default Navbar;
