import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from backend
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/posts');
        setPosts(response.data);  // Save posts data to state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-container" style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to ConnectCare</h1>
        <p>Your platform for managing tasks and profiles efficiently.</p>
        <button style={styles.button} onClick={() => alert('Explore now!')}>Explore Now</button>
      </header>
      
      <section style={styles.section}>
        <h2>Recent Posts</h2>
        <div style={styles.posts}>
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} style={styles.postCard}>
                <div style={styles.imageContainer}>
                  {post.image_url && <img src={post.image_url} alt={post.title} style={styles.image} />}
                </div>
                <div style={styles.textContent}>
                  <h3 style={styles.postTitle}>{post.title}</h3>
                  <p style={styles.postDescription}>{post.description}</p>
                  <p><strong>Tags:</strong> {post.tags}</p>
                  <p><strong>{post.is_paid ? 'Paid' : 'Free'} Help</strong></p>
                  <Link to={`/post/${post.id}`}>
                    <button style={styles.viewButton}>View Post</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </section>

      {/* Przycisk do dodania posta tylko dla użytkowników z rolą 'Osoba potrzebująca' */}
      {user && user.role === 'Osoba potrzebująca' && (
        <section style={styles.createPostSection}>
          <Link to="/create_post">
            <button style={styles.createPostButton}>Create Post</button>
          </Link>
        </section>
      )}
      
      <footer style={styles.footer}>
        <p>© 2024 ConnectCare. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    textAlign: 'center',
    margin: '0 auto',
    padding: '20px',
    maxWidth: '100%',
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#007bff',
    padding: '30px 20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    color: '#fff',
  },
  button: {
    backgroundColor: '#f5f5f5',
    color: '#007bff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  },
  section: {
    marginTop: '40px',
    textAlign: 'center',
  },
  posts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', // 4 kolumny na większych ekranach, responsywne na mniejszych
    gap: '20px',
    marginTop: '20px',
  },
  postCard: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    transition: 'transform 0.3s ease-in-out',
    maxWidth: '100%',
  },
  imageContainer: {
    marginBottom: '15px',
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: '200px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  textContent: {
    textAlign: 'left',
  },
  postTitle: {
    color: '#333',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  postDescription: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '10px',
  },
  viewButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '10px',
  },
  createPostButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
  },
  footer: {
    marginTop: '50px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#777',
  },
  createPostSection: {
    marginTop: '30px',
  },
};

export default Home;
