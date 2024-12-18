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
          <h1 style={styles.logo}>
            Connect <span style={styles.logoHighlight}>Care</span>
          </h1>
        </Link>
      </div>

      <div style={styles.navLinksContainer}>
        <div style={styles.hamburger} onClick={toggleMobileMenu}>
          <FaBars size={30} style={styles.icon} />
        </div>

        {(isMobileMenuOpen || !isMobileMenuOpen) && (
          <div style={isMobileMenuOpen ? styles.mobileMenu : styles.desktopMenu}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/posts" style={styles.link}>Wszystkie Pomoc</Link>
            <Link to="/volunteers" style={styles.link}>Wolontariusze</Link>
            <Link to="/contact" style={styles.link}>Kontakt</Link>
            {user ? (
              <div style={styles.userMenu}>
                <button style={styles.userButton} onClick={toggleMenu}>
                  {user.name} <MdArrowDropDown style={styles.icon} />
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
    padding: '15px 30px',
    backgroundColor: 'rgb(0, 123, 255)', // Bright blue background
    fontFamily: 'Poppins, sans-serif',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ffffff', // White text
  },
  logoHighlight: {
    color: '#000000', // Black "Care"
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
    color: '#ffffff', // White text
    fontSize: '18px',
    padding: '8px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  linkHover: {
    backgroundColor: '#004494',
  },
  hamburger: {
    display: 'none',
    cursor: 'pointer',
  },
  icon: {
    color: '#ffffff',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '60px',
    left: '0',
    width: '100%',
    backgroundColor: 'rgb(0, 123, 255)',
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
    color: '#ffffff',
    cursor: 'pointer',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '40px',
    right: '0',
    backgroundColor: '#004494',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  dropdownLink: {
    display: 'block',
    padding: '10px 15px',
    textDecoration: 'none',
    color: '#ffffff',
    fontSize: '16px',
  },
  authButtons: {
    display: 'flex',
    gap: '10px',
  },
  loginButton: {
    textDecoration: 'none',
    color: 'rgb(0, 123, 255)', // Blue text
    backgroundColor: '#ffffff', // White background
    padding: '8px 15px',
    borderRadius: '5px',
    fontSize: '16px',
    border: '1px solid rgb(0, 123, 255)',
  },
  registerButton: {
    textDecoration: 'none',
    color: '#ffffff',
    backgroundColor: '#004494',
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
