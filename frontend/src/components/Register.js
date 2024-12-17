import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Osoba potrzebująca');
  const [description, setDescription] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/register', {
        email,
        name,
        password,
        role,
        description,
        birth_date: birthDate,
      });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Zarejestruj się</h2>
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
          <label style={styles.label}>Nazwa:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Hasło:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Rola:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            <option value="Osoba potrzebująca">Osoba potrzebująca</option>
            <option value="Wolontariusz">Wolontariusz</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Opis:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Opowiedz o sobie..."
            style={{ ...styles.input, height: '80px', resize: 'none' }}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Data urodzenia:</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={{ ...styles.button, opacity: loading ? 0.7 : 1 }} disabled={loading}>
          {loading ? 'Rejestrowanie...' : 'Zarejestruj się'}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '10% auto',
    padding: '20px 30px',
    borderRadius: '12px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: 'center',
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
  message: {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '14px',
    color: '#d9534f',
  },
};

export default Register;
