import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowDropDown } from "react-icons/md";

function Navbar({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stan rozwijanego menu

  const handleLogout = () => {
    setUser(null); // Usuwa dane użytkownika po wylogowaniu
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Przełącza stan rozwijanego menu
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>
          <h1 style={styles.title}>Connect <span style={styles.span}>Care</span></h1>
        </Link>
      </div>
      <div style={styles.navLinks}>
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
              {user.name} <MdArrowDropDown />{/* Wyświetlany nick */}
            </button>
            {/* Jeśli menu jest otwarte, wyświetl rozwijane opcje */}
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
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontSize: '30px',
    fontFamily: 'Poppins, sans-serif', // Ustawienie czcionki Poppins
  },
  logo: {
    fontSize: '34px',
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif', // Ustawienie czcionki Poppins
  },
  span: {
    color: 'black',
  },
  usernick: {
    border: '0',
    fontSize: '20px',
    fontWeight: '600',
    backgroundColor: '#12234000',
    padding: '5px',
    borderRadius: '5px',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif', // Ustawienie czcionki Poppins
  },
  dropdownitem: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '20px',
    fontWeight: '400',
    backgroundColor: '#fff',
    border: '0',
    minWidth: '100%',
    fontFamily: 'Poppins, sans-serif', // Ustawienie czcionki Poppins
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '20px',
    fontWeight: '500',
    padding: '15px',
    fontFamily: 'Poppins, sans-serif', // Ustawienie czcionki Poppins
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
    fontFamily: 'Poppins, sans-serif', // Ustawienie czcionki Poppins
  },
  title: {
    margin: 0,
    fontFamily: 'Poppins, sans-serif', // Ustawienie czcionki Poppins
  },
  dropdown: {
    position: 'absolute',
    top: '60px',
    right: '0',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    minWidth: '200px',
    padding: '10px',
  },
};

export default Navbar;
