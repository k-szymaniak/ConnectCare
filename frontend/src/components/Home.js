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
        setPosts(response.data); // Save posts data to state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-container" style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerOverlay}></div> {/* Overlay */}
        <div style={styles.headerContent}>
          <h1>ConnectCare – Łączymy serca, by pomagać</h1>
          <p>
            Łączymy serca i siły, by wspólnie tworzyć przestrzeń wsparcia, pomocy i troski.
            Razem zmieniamy świat na bardziej życzliwy i otwarty dla każdego.
          </p>
        </div>
      </header>

      <section style={styles.section}>
        <h2 style={styles.heading}>Osoby potrzebujące twojej pomocy!</h2>
        <div style={styles.posts}>
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} style={styles.postCard}>
                <div style={styles.imageContainer}>
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      style={styles.image}
                    />
                  )}
                </div>
                <div style={styles.textContent}>
                  <h3 style={styles.postTitle}>{post.title}</h3> {/* Centered */}
                  <p style={styles.postDescription}>{post.description}</p> {/* Justified */}
                  <p style={styles.postTags}><strong>Tags:</strong> {post.tags}</p> {/* Justified */}
                  <p
                    style={{
                      ...styles.postHelpType,
                      backgroundColor: post.is_paid ? '#d3d3d3' : '#d3d3d3', // Gray background for both
                    }}
                  >
                    <strong>
                      {post.is_paid ? 'Odpłatna pomoc' : 'Darmowa pomoc'}
                    </strong>
                  </p>
                  <Link to={`/post/${post.id}`}>
                    <button style={styles.viewButton}>Jestem zainteresowany!</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </section>

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
    fontFamily: 'Poppins, Arial, sans-serif',
    textAlign: 'center',
    margin: '0 auto',
    padding: '0px',
    maxWidth: '100%',
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundImage: 'url("/img/header.jpg")', // Corrected image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '30px 20px',
    color: '#fff',
    minHeight: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay for better text visibility
    zIndex: 1,
  },
  headerContent: {
    zIndex: 2, // Above overlay
    textAlign: 'center',
  },
  section: {
    marginTop: '40px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem', // Increased size
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#333',
  },
  posts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
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
    textAlign: 'left', // Keep other content left-aligned
  },
  postTitle: {
    color: '#333',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center', // Center title
  },
  postDescription: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '10px',
    textAlign: 'justify', // Justified description
  },
  postTags: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '10px',
    textAlign: 'justify', // Justified tags
  },
  postHelpType: {
    fontSize: '1rem',
    color: '#333',
    textAlign: 'center',
    padding: '5px 10px',
    borderRadius: '5px', // Rounded edges
    display: 'inline-block',
    marginBottom: '10px',
  },
  viewButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '20px',
    marginTop: '10px',
    width: '100%', // Full width button
    fontWeight: '600',
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
