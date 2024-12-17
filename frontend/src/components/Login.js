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
      setMessage('Please fill out all fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      setUser(response.data.user);
      setMessage(response.data.message);
      navigate('/');
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Witaj ponownie</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={{ ...styles.button, opacity: loading ? 0.7 : 1 }} disabled={loading}>
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
    maxWidth: '360px',
    margin: '10% auto',
    padding: '20px 30px',
    borderRadius: '12px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    fontFamily: "Arial, sans-serif",
    textAlign: 'center',
  },
  title: {
    color: '#333',
    fontSize: '26px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'box-shadow 0.3s ease',
  },
  inputFocus: {
    boxShadow: '0 0 4px rgba(0, 123, 255, 0.5)',
  },
  button: {
    background: 'linear-gradient(90deg, #007bff, #0056b3)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 0',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  buttonHover: {
    transform: 'scale(1.02)',
  },
  success: {
    color: '#28a745',
    marginTop: '10px',
    fontSize: '14px',
  },
  error: {
    color: '#d9534f',
    marginTop: '10px',
    fontSize: '14px',
  },
};

export default Login;
