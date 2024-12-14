import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Dodano stan ładowania
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sprawdzanie poprawności pól
    if (!email || !password) {
      setMessage('Please fill out all fields.');
      return;
    }

    try {
      setLoading(true); // Rozpoczęcie ładowania
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      setUser(response.data.user); // Ustawia zalogowanego użytkownika
      setMessage(response.data.message);

      // Przekierowanie na stronę główną po zalogowaniu
      navigate('/');
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || 'An unexpected error occurred');
    } finally {
      setLoading(false); // Koniec ładowania
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && (
        <p style={message.startsWith('Login successful') ? styles.success : styles.error}>
          {message}
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    opacity: 1,
    transition: 'opacity 0.3s ease',
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  success: {
    textAlign: 'center',
    marginTop: '10px',
    color: '#28a745',
  },
  error: {
    textAlign: 'center',
    marginTop: '10px',
    color: '#d9534f',
  },
};

export default Login;
