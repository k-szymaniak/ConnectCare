import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const handleLogout = () => {
    setUser(null); // Usuwa dane użytkownika po wylogowaniu
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>
          <h1 style={styles.title}>ConnectCare</h1>
        </Link>
      </div>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        {user ? (
          <>
            <Link to="/profile" style={styles.link}>
              {user.name} {/* Wyświetlany nick */}
            </Link>
            <button style={styles.button} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  title: {
    margin: 0,
  },
};

export default Navbar;
