import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importujemy Link do nawigacji

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
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                {post.image_url && <img src={post.image_url} alt={post.title} style={styles.image} />}
                <p><strong>Tags:</strong> {post.tags}</p>
                <p><strong>{post.is_paid ? 'Paid' : 'Free'} Help</strong></p>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </section>

      {/* Przycisk do dodania posta tylko dla użytkowników z rolą 'Osoba potrzebująca' */}
      {user && user.role === 'Osoba potrzebująca' && (
        <section>
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
    maxWidth: '100%'
  },
  header: {
    backgroundColor: '#f5f5f5',
    padding: '30px 20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
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
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px',
  },
  postCard: {
    padding: '20px',
    backgroundColor: '#e9ecef',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  image: {
    width: '100%',
    maxWidth: '400px',
    marginTop: '10px',
    borderRadius: '8px',
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
};

export default Home;
