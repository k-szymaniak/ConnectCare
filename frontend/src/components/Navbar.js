import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowDropDown } from "react-icons/md";
import { FaBars } from "react-icons/fa"; // Import ikony hamburgera

function Navbar({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stan rozwijanego menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Stan menu na urządzenia mobilne

  const handleLogout = () => {
    setUser(null); // Usuwa dane użytkownika po wylogowaniu
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Przełącza stan rozwijanego menu
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Przełącza stan hamburger menu
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>
          <h1 style={styles.title}>Connect <span style={styles.span}>Care</span></h1>
        </Link>
      </div>
      <div style={styles.navLinks}>
        {/* Ikona hamburgera na urządzenia mobilne */}
        <div style={styles.hamburger} onClick={toggleMobileMenu}>
          <FaBars size={30} />
        </div>
        {/* Menu na urządzenia mobilne */}
        {isMobileMenuOpen && (
          <div style={styles.mobileMenu}>
            <Link to="/" style={styles.link}>
              Home
            </Link>
            <Link to="/" style={styles.link}>
              Szukasz Wolontariusz?
            </Link>
            <Link to="/" style={styles.link}>
              Wolontariusze
            </Link>
            <Link to="/" style={styles.link}>
              Kontakt
            </Link>
            {user ? (
              <>
                <button style={styles.usernick} onClick={toggleMenu}>
                  {user.name} <MdArrowDropDown />
                </button>
                {isMenuOpen && (
                  <div style={styles.dropdown}>
                    <Link to="/profile" style={styles.dropdownitem}>
                      Profil
                    </Link>
                    <Link style={styles.dropdownitem} onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}
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
        )}
        {/* Menu na większych ekranach */}
        <div style={styles.desktopMenu}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/" style={styles.link}>
            Szukasz Wolontariusz?
          </Link>
          <Link to="/" style={styles.link}>
            Wolontariusze
          </Link>
          <Link to="/" style={styles.link}>
            Kontakt
          </Link>
          {user ? (
            <>
              <button style={styles.usernick} onClick={toggleMenu}>
                {user.name} <MdArrowDropDown />
              </button>
              {isMenuOpen && (
                <div style={styles.dropdown}>
                  <Link to="/profile" style={styles.dropdownitem}>
                    Profil
                  </Link>
                  <Link style={styles.dropdownitem} onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/login" style={styles.login}>
                Login
              </Link>
              <Link to="/register" style={styles.register}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 20px',
    backgroundColor: '#fff',
    color: '#333333',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontSize: '18px',
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  logo: {
    fontSize: '34px',
    fontWeight: '300',
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  span: {
    color: 'black',
  },
  usernick: {
    border: '0',
    fontSize: '18px',
    fontWeight: '300',
    backgroundColor: '#12234000',
    padding: '5px',
    borderRadius: '5px',
    color: '#007bff',
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  dropdownitem: {
    textDecoration: 'none',
    color: '#333333',
    fontSize: '18px',
    fontWeight: '300',
    backgroundColor: '#fff',
    border: '0',
    minWidth: '100%',
    fontFamily: 'Poppins, Arial, sans-serif',
    padding: '10px 0',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    position: 'relative',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '22px',
    fontWeight: '400',
    padding: '10px',
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  login: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '22px',
    fontWeight: '400',
    padding: '10px',
    fontFamily: 'Poppins, Arial, sans-serif',
    backgroundColor: 'rgb(0, 123, 255)',
    borderRadius: '5px',
  },
  register: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '22px',
    fontWeight: '400',
    padding: '10px',
    fontFamily: 'Poppins, Arial, sans-serif',
    backgroundColor: '#333',
    borderRadius: '5px',
    marginLeft: '',
  },
  hamburger: {
    display: 'none',
    cursor: 'pointer',
  },
  desktopMenu: {
    display: 'flex',
    gap: '20px',
  },
  mobileMenu: {
    position: 'absolute',
    top: '60px',
    left: '0',
    backgroundColor: '#fff',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    width: '100%',
    padding: '10px',
    zIndex: '1',
  },
  button: {
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '20px',
    fontWeight: '600',
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  title: {
    margin: 0,
    fontFamily: 'Poppins, Arial, sans-serif',
    color: 'rgb(0, 123, 255)',
  },
  dropdown: {
    position: 'absolute',
    top: '50px',
    right: '0',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    minWidth: '200px',
    padding: '10px',
  },
  createPostButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Poppins, Arial, sans-serif',
    marginTop: '20px',
  },
  '@media (max-width: 768px)': {
    navbar: {
      flexDirection: 'column',
      padding: '10px',
    },
    navLinks: {
      flexDirection: 'column',
      gap: '10px',
      alignItems: 'center',
    },
    link: {
      fontSize: '16px',
      fontWeight: '300',
      padding: '8px 0',
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    dropdown: {
      top: '50px',
      minWidth: '150px',
    },
    hamburger: {
      display: 'block',
    },
    desktopMenu: {
      display: 'none',
    },
  },
};


export default Navbar;
