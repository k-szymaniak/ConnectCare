import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all'); // Domyślny filtr
  const navigate = useNavigate();

  // Pobierz posty z API na podstawie filtra
  useEffect(() => {
    const fetchPosts = async () => {
        try {
            console.log(`Fetching posts with filter: ${filter}`);  // Logowanie
            const response = await axios.get(`http://127.0.0.1:5000/posts?filter=${filter}`);
            setPosts(response.data);
        } catch (error) {
            console.error('Błąd podczas pobierania postów:', error);
        }
    };
    fetchPosts();
}, [filter]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Przeglądaj Dostępną Pomoc</h1>
        <p style={styles.headerSubtitle}>Znajdź potrzebną pomoc lub zaoferuj swoje wsparcie już dziś.</p>
      </header>

      <div style={styles.filterContainer}>
        <button
          style={filter === 'all' ? styles.activeFilterButton : styles.filterButton}
          onClick={() => setFilter('all')}
        >
          Wszystkie Pomoc
        </button>
        <button
          style={filter === 'paid' ? styles.activeFilterButton : styles.filterButton}
          onClick={() => setFilter('paid')}
        >
          Płatna Pomoc
        </button>
        <button
          style={filter === 'free' ? styles.activeFilterButton : styles.filterButton}
          onClick={() => setFilter('free')}
        >
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
        backgroundColor: !!post.is_paid ? '#fff5e6' : '#e6ffe6',
    }}
>
    <strong>{!!post.is_paid ? 'Płatna Pomoc' : 'Darmowa Pomoc'}</strong>
</div>

              <button
                style={styles.viewPostButton}
                onClick={() => navigate(`/post/${post.id}`)}
              >
                Zobacz Szczegóły
              </button>
            </div>
          ))
        ) : (
          <p style={styles.noPosts}>Brak dostępnych ofert pomocy.</p>
        )}
      </div>

      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.logoSection}>
            <h2 style={styles.logo}>ConnectCare</h2>
          </div>
          <div style={styles.footerLinks}>
            <p><strong>Kontakt</strong></p>
            <p>Email: support@connectcare.com</p>
            <p>Telefon: +48 123 456 789</p>
          </div>
          <div style={styles.footerLinks}>
            <p><strong>Śledź nas</strong></p>
            <p>Facebook | Twitter | LinkedIn</p>
          </div>
        </div>
        <p style={styles.footerCopy}>© 2024 ConnectCare. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    margin: '0 auto',
    padding: '0px',
    maxWidth: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
  },
  header: {
    textAlign: 'center',
    padding: '30px 20px',
    
    
    borderRadius: '0px',
  },
  headerTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  headerSubtitle: {
    fontSize: '1.2rem',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
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
  activeFilterButton: {
    backgroundColor: '#0056b3',
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
    margin: '10px 0',
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
  },
  noPosts: {
    color: '#555',
    fontSize: '1rem',
    marginTop: '20px',
  },
  footer: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
  },
  logoSection: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  footerLinks: {
    textAlign: 'left',
  },
  footerCopy: {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '0.9rem',
  },
};

export default PostList;
