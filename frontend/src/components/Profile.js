import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [role, setRole] = useState(user?.role || 'Osoba potrzebująca');
  const [description, setDescription] = useState(user?.description || '');
  const [birthDate, setBirthDate] = useState(user?.birth_date || '');
  const [message, setMessage] = useState('');
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/user_posts/${user.id}`);
          setUserPosts(response.data);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      };
      fetchPosts();
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/profile/${user.id}`, {
        name,
        role,
        description,
        birth_date: birthDate,
      });

      setUser(response.data.user);
      setMessage(response.data.message);
      setIsEditing(false);
    } catch (error) {
      console.error("Error during profile update:", error.response || error.message);
      setMessage(error.response?.data?.error || 'An unexpected error occurred');
    }
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Brak dostępu</h2>
        <p>Musisz się zalogować, aby zobaczyć tę stronę.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <img src="/img/avatar.jpg" alt="User Avatar" style={styles.avatar} />
        <h2 style={styles.profileName}>{user.name}</h2>
        <div
          style={{
            ...styles.roleBadge,
            backgroundColor: user.role === 'Wolontariusz' ? '#e6f7ff' : '#fff3cd',
            color: user.role === 'Wolontariusz' ? '#007bff' : '#856404',
          }}
        >
          {user.role}
        </div>
      </div>
      {message && <p style={styles.message}>{message}</p>}
      {isEditing ? (
        <form style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Imię:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Rola:</label>
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
            <label>Opis:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ ...styles.input, height: '80px', resize: 'none' }}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Data urodzenia:</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.buttonGroup}>
            <button type="button" onClick={handleSave} style={styles.button}>
              Zapisz
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{ ...styles.button, backgroundColor: '#6c757d' }}
            >
              Anuluj
            </button>
          </div>
        </form>
      ) : (
        <>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Opis:</strong> {user.description || 'Brak opisu'}</p>
          <p><strong>Data urodzenia:</strong> {user.birth_date || 'Brak daty urodzenia'}</p>
          <button onClick={() => setIsEditing(true)} style={styles.button}>
            Edytuj Profil
          </button>
        </>
      )}

      <section style={styles.postsSection}>
        <h3>Twoje posty</h3>
        {userPosts.length > 0 ? (
          userPosts.map(post => (
            <div key={post.id} style={styles.postCard}>
              <h4 style={styles.postTitle}>{post.title}</h4>
              <p style={styles.postDescription}>{post.description}</p>
              {post.image_url && <img src={post.image_url} alt={post.title} style={styles.postImage} />}
              <div
                style={{
                  ...styles.postHelpType,
                  backgroundColor: post.is_paid ? '#fff5e6' : '#e6ffe6',
                }}
              >
                <strong>{post.is_paid ? 'Płatna Pomoc' : 'Darmowa Pomoc'}</strong>
              </div>
            </div>
          ))
        ) : (
          <p>Nie znaleziono postów.</p>
        )}
      </section>
      
    </div>
    
  );
  
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Poppins, Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  profileHeader: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  profileName: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#007bff',
  },
  roleBadge: {
    display: 'inline-block',
    padding: '5px 15px',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '15px',
    marginTop: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
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
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  postsSection: {
    marginTop: '30px',
  },
  postCard: {
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  postTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  postDescription: {
    fontSize: '1rem',
    marginBottom: '10px',
  },
  postHelpType: {
    fontSize: '1rem',
    textAlign: 'center',
    padding: '5px',
    borderRadius: '5px',
  },
  postImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    marginBottom: '10px',
    borderRadius: '10px',
  },
  message: {
    textAlign: 'center',
    color: '#28a745',
    marginBottom: '10px',
  },
};

export default Profile;
