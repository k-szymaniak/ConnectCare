import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowDropDown } from "react-icons/md";
import { FaBars } from "react-icons/fa";

function Navbar({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <Link to="/" style={styles.logoLink}>
          <h1 style={styles.logo}>Connect <span style={styles.logoHighlight}>Care</span></h1>
        </Link>
      </div>

      <div style={styles.navLinksContainer}>
        <div style={styles.hamburger} onClick={toggleMobileMenu}>
          <FaBars size={30} />
        </div>

        {(isMobileMenuOpen || !isMobileMenuOpen) && (
          <div style={isMobileMenuOpen ? styles.mobileMenu : styles.desktopMenu}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/all_posts" style={styles.link}>Wszystkie Pomoc</Link>
            <Link to="/volunteers" style={styles.link}>Wolontariusze</Link>
            <Link to="/contact" style={styles.link}>Kontakt</Link>
            {user ? (
              <div style={styles.userMenu}>
                <button style={styles.userButton} onClick={toggleMenu}>
                  {user.name} <MdArrowDropDown />
                </button>
                {isMenuOpen && (
                  <div style={styles.dropdownMenu}>
                    <Link to="/profile" style={styles.dropdownLink}>Profil</Link>
                    <Link to="/" style={styles.dropdownLink} onClick={handleLogout}>Logout</Link>
                  </div>
                )}
              </div>
            ) : (
              <div style={styles.authButtons}>
                <Link to="/login" style={styles.loginButton}>Login</Link>
                <Link to="/register" style={styles.registerButton}>Register</Link>
              </div>
            )}
          </div>
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
    backgroundColor: '#f8f9fa',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#007bff',
  },
  logoHighlight: {
    color: '#0056b3',
  },
  logoLink: {
    textDecoration: 'none',
  },
  navLinksContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '18px',
    padding: '5px 10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  linkHover: {
    backgroundColor: '#e9ecef',
  },
  hamburger: {
    display: 'none',
    cursor: 'pointer',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '60px',
    left: '0',
    width: '100%',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    zIndex: '1000',
  },
  desktopMenu: {
    display: 'flex',
    gap: '20px',
  },
  userMenu: {
    position: 'relative',
  },
  userButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#333',
    cursor: 'pointer',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '40px',
    right: '0',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  dropdownLink: {
    display: 'block',
    padding: '10px 15px',
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
  },
  authButtons: {
    display: 'flex',
    gap: '10px',
  },
  loginButton: {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#007bff',
    padding: '8px 15px',
    borderRadius: '5px',
    fontSize: '16px',
  },
  registerButton: {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#0056b3',
    padding: '8px 15px',
    borderRadius: '5px',
    fontSize: '16px',
  },
  '@media (max-width: 768px)': {
    hamburger: {
      display: 'block',
    },
    desktopMenu: {
      display: 'none',
    },
  },
};

export default Navbar;