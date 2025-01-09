import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Proszę wypełnić wszystkie pola.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });

      // Zapisujemy token JWT w localStorage
      localStorage.setItem('token', response.data.access_token);

      // Zapisujemy dane użytkownika w localStorage i stanie aplikacji
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);

      setMessage(response.data.message);
      navigate('/');
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || 'Wystąpił nieoczekiwany błąd.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Zaloguj się</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Wpisz swój email"
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Hasło</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Wpisz swoje hasło"
              required
            />
          </div>
          <button
            type="submit"
            style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
          <p style={styles.registerPrompt}>
            Nie masz konta? <a href="/register" style={styles.registerLink}>Zarejestruj się</a>
          </p>
        </form>
        {message && (
          <p style={message.startsWith('Login successful') ? styles.success : styles.error}>
            {message}
          </p>
        )}
      </div>
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.logoSection}>
            <h2 style={styles.logo}>ConnectCare</h2>
          </div>
          <div style={styles.footerLinks}>
            <p><strong>Kontakt</strong></p>
            <p>Email: support@connectcare.com</p>
            <p>Telefon: +48 123 456 789</p>
          </div>
          <div style={styles.footerLinks}>
            <p><strong>Śledź nas</strong></p>
            <p>Facebook | Twitter | LinkedIn</p>
          </div>
        </div>
        <p style={styles.footerCopy}>© 2024 ConnectCare. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    paddingBottom: '0 !important',
  },
  card: {
    maxWidth: '400px',
    width: '100%',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    transition: 'box-shadow 0.3s ease',
  },
  button: {
    background: '#0073e6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  registerPrompt: {
    marginTop: '15px',
    fontSize: '14px',
    textAlign: 'center',
    color: '#555',
  },
  registerLink: {
    color: '#0073e6',
    textDecoration: 'none',
  },
  success: {
    color: '#28a745',
    marginTop: '15px',
    fontSize: '14px',
    textAlign: 'center',
  },
  error: {
    color: '#d9534f',
    marginTop: '15px',
    fontSize: '14px',
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
    padding: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    width: '100%',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
  },
  logoSection: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  footerLinks: {
    textAlign: 'left',
  },
  footerCopy: {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '0.9rem',
  },
};

export default Login;