import React, { useState } from 'react';
import axios from 'axios';

function Profile({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [role, setRole] = useState(user?.role || 'Osoba potrzebująca');
  const [description, setDescription] = useState(user?.description || '');
  const [birthDate, setBirthDate] = useState(user?.birth_date || '');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/profile/${user.id}`, {
        name,
        role,
        description,
        birth_date: birthDate,
      });
      setUser({ ...user, name, role, description, birth_date: birthDate }); // Aktualizacja lokalnego stanu użytkownika
      setMessage(response.data.message);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || 'An unexpected error occurred');
    }
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Access Denied</h2>
        <p>You need to log in to view this page.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Profile Information</h2>
      {message && <p style={styles.message}>{message}</p>}
      {isEditing ? (
        <form style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Role:</label>
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
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ ...styles.input, height: '80px', resize: 'none' }}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Birth Date:</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="button" onClick={handleSave} style={styles.button}>
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            style={{ ...styles.button, backgroundColor: '#6c757d' }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Description:</strong> {user.description || 'No description provided'}</p>
          <p><strong>Birth Date:</strong> {user.birth_date || 'No birth date provided'}</p>
          <button onClick={() => setIsEditing(true)} style={styles.button}>
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
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
    marginRight: '10px',
  },
  message: {
    textAlign: 'center',
    marginTop: '10px',
    color: '#28a745',
  },
};

export default Profile;
