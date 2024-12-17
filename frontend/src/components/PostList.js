import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all'); // Domyślnie wszystkie posty
  const navigate = useNavigate();

  // Fetch posts from API with filter
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/posts?filter=${filter}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [filter]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Wszystkie Pomoc</h2>

      {/* Filtry */}
      <div style={styles.filterContainer}>
        <button style={styles.filterButton} onClick={() => setFilter('all')}>
          Wszystkie Pomoc
        </button>
        <button style={styles.filterButton} onClick={() => setFilter('paid')}>
          Płatna Pomoc
        </button>
        <button style={styles.filterButton} onClick={() => setFilter('free')}>
          Darmowa Pomoc
        </button>
      </div>

      <div style={styles.posts}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={styles.postCard}>
              <div style={styles.imageContainer}>
                {post.image_url && <img src={post.image_url} alt={post.title} style={styles.image} />}
              </div>
              <div style={styles.textContent}>
                <h3 style={styles.postTitle}>{post.title}</h3>
                <p style={styles.postDescription}>{post.description}</p>
                <p><strong>Tagi:</strong> {post.tags}</p>
              </div>
              <div
                style={{
                  ...styles.postHelpType,
                  backgroundColor: post.is_paid ? '#ccc' : '#e0e0e0',
                }}
              >
                <strong>{post.is_paid ? 'Płatne Wsparcie' : 'Darmowe Wsparcie'}</strong>
              </div>
              <div style={styles.buttonContainer}>
                <button
                  style={styles.viewPostButton}
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  Zobacz Szczegóły
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noPosts}>Brak dostępnej pomocy.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    margin: '0 auto',
    padding: '20px',
    maxWidth: '1200px',
    backgroundColor: '',
    borderRadius: '10px',
  },
  title: {
    color: '#333',
    fontSize: '2rem',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  filterButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  posts: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '20px',
  },
  postCard: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    transition: 'transform 0.2s ease',
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
  postHelpType: {
    fontSize: '1rem',
    color: '#333',
    textAlign: 'center',
    padding: '10px 0',
    borderRadius: '10px',
    width: '100%',
    fontWeight: 'bold',
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '10px',
  },
  viewPostButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 15px',
    width: '100%',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  noPosts: {
    color: '#555',
    fontSize: '1rem',
    marginTop: '20px',
  },
};

export default PostList;
