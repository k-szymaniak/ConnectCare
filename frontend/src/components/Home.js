import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>ConnectCare – Łączymy Serca, By Pomagać</h1>
          <p style={styles.heroDescription}>
            Znajdź wsparcie lub zostań wolontariuszem. Tworzymy przestrzeń pełną troski, zaufania i współpracy.
          </p>
          <Link to="/register">
            <button style={styles.ctaButton}>Dołącz Teraz</button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.about}>
        <h2 style={styles.sectionTitle}>O Nas</h2>
        <p style={styles.sectionDescription}>
          ConnectCare to platforma łącząca osoby potrzebujące pomocy z wolontariuszami. 
          Razem budujemy społeczność, która zmienia świat na lepsze.
        </p>
      </section>

      {/* Featured Posts */}
      <section style={styles.postsSection}>
        <h2 style={styles.sectionTitle}>Najnowsze Posty</h2>
        <div style={styles.postsGrid}>
          {posts.slice(0, 8).map(post => (
            <div key={post.id} style={styles.postCard}>
              <img src={post.image_url} alt={post.title} style={styles.postImage} />
              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postDescription}>{post.description.substring(0, 100)}...</p>
              <Link to={`/post/${post.id}`}>
                <button style={styles.viewButton}>Zobacz Więcej</button>
              </Link>
            </div>
          ))}
        </div>
        <Link to="/posts">
          <button style={styles.browseButton}>Przeglądaj Wszystkie Posty</button>
        </Link>
      </section>

      {/* How It Works Section */}
      <section style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>Jak To Działa?</h2>
        <div style={styles.stepsGrid}>
          <div style={styles.step}>
            <h3 style={styles.stepTitle}>1. Zarejestruj się</h3>
            <p style={styles.stepDescription}>Załóż konto i dołącz do naszej społeczności.</p>
          </div>
          <div style={styles.step}>
            <h3 style={styles.stepTitle}>2. Utwórz Post</h3>
            <p style={styles.stepDescription}>Dodaj swój post i opisz, czego potrzebujesz.</p>
          </div>
          <div style={styles.step}>
            <h3 style={styles.stepTitle}>3. Odpowiedz na Post</h3>
            <p style={styles.stepDescription}>Znajdź osobę, której chcesz pomóc.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <img src="/logo.png" alt="ConnectCare" style={styles.logo} />
            <p style={styles.footerText}>
              ConnectCare to platforma stworzona, aby wspierać ludzi i budować trwałe więzi.
            </p>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Podstrony</h3>
            <ul style={styles.footerLinks}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/posts">Posty</Link></li>
              <li><Link to="/about">O nas</Link></li>
              <li><Link to="/contact">Kontakt</Link></li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Kontakt</h3>
            <p>Email: support@connectcare.com</p>
            <p>Telefon: +48 123 456 789</p>
            <p>Adres: ul. Pomocna 12, Warszawa</p>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Social Media</h3>
            <div style={styles.socialLinks}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>© 2024 ConnectCare. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Poppins, Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  hero: {
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
    padding: '80px 20px',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  heroDescription: {
    fontSize: '1.5rem',
    marginBottom: '30px',
  },
  ctaButton: {
    backgroundColor: '#0056b3',
    color: '#fff',
    padding: '15px 30px',
    fontSize: '1.2rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  about: {
    padding: '50px 20px',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  sectionDescription: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
  },
  postsSection: {
    padding: '50px 20px',
    textAlign: 'center',
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    padding: '20px',
  },
  postImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  postTitle: {
    fontSize: '1.5rem',
    margin: '15px 0',
  },
  postDescription: {
    fontSize: '1rem',
    marginBottom: '15px',
  },
  viewButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  browseButton: {
    marginTop: '30px',
    backgroundColor: '#0056b3',
    color: '#fff',
    padding: '15px 30px',
    fontSize: '1.2rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  howItWorks: {
    backgroundColor: '#f1f1f1',
    padding: '50px 20px',
    textAlign: 'center',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  step: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  stepTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '50px 20px',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  footerSection: {
    textAlign: 'center',
  },
  footerTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    fontSize: '1rem',
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  footerBottom: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '0.9rem',
  },
};

export default Home;
