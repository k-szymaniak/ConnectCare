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
      // Fetch user's posts when the user is set
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

      setUser(response.data.user); // Update user state after editing
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

      <section style={styles.postsSection}>
        <h3>User Posts</h3>
        {userPosts.length > 0 ? (
          userPosts.map(post => (
            <div key={post.id} style={styles.postCard}>
              <h4>{post.title}</h4>
              <p>{post.description}</p>
              {post.image_url && <img src={post.image_url} alt={post.title} style={styles.image} />}
              <p><strong>Tags:</strong> {post.tags}</p>
              <p><strong>{post.is_paid ? 'Paid' : 'Free'} Help</strong></p>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </section>
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
  postsSection: {
    marginTop: '30px',
  },
  postCard: {
    padding: '15px',
    backgroundColor: '#e9ecef',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    marginBottom: '15px',
  },
  image: {
    width: '100%',
    maxWidth: '400px',
    marginTop: '10px',
    borderRadius: '8px',
  },
};

export default Profile;
