import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all'); // Domyślnie wszystkie posty

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
  }, [filter]); // Zmieniamy zależność na `filter` - za każdym razem, gdy się zmienia, pobieramy nowe posty

  return (
    <div style={styles.container}>
      <h2>All Posts</h2>

      {/* Filtry */}
      <div style={styles.filterContainer}>
        <button style={styles.filterButton} onClick={() => setFilter('all')}>
          All Posts
        </button>
        <button style={styles.filterButton} onClick={() => setFilter('paid')}>
          Paid Posts
        </button>
        <button style={styles.filterButton} onClick={() => setFilter('free')}>
          Free Posts
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
                <p><strong>Tags:</strong> {post.tags}</p>
                <p style={styles.postHelpType}>
                  <strong>{post.is_paid ? 'Paid' : 'Free'} Help</strong>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
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
    maxWidth: '100%',
    backgroundColor: '#f9f9f9',
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
    marginBottom: '10px',
  },
};

export default PostList;
