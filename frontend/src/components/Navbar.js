import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const handleLogout = () => {
    setUser(null);  // Usuwa użytkownika ze stanu globalnego
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/tasks">Tasks</Link>
      {user ? (
        <>
          <span>Welcome, {user.name}!</span>
          <img src={user.avatar} alt="Avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} />
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
