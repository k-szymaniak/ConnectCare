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

      {/* Sekcja 1 */}
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
                  <h3 style={styles.postTitle}>{post.title}</h3>
                  <p style={styles.postDescription}>{post.description}</p>
                  <p style={styles.postTags}><strong>Tags:</strong> {post.tags}</p>
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

      {/* Nowa Sekcja: Zalety */}
      <section style={styles.infoSection}>
        <div style={styles.infoContent}>
          <h2 style={styles.heading}>Dlaczego warto dołączyć?</h2>
          <ul style={styles.list}>
            <li>Intuicyjna platforma – łatwa w obsłudze.</li>
            <li>Połączenie z ludźmi z całego świata.</li>
            <li>Możliwość dzielenia się doświadczeniem i wiedzą.</li>
            <li>Budowanie społeczności opartej na wsparciu i trosce.</li>
          </ul>
        </div>
        <div style={styles.imageContainer}>
          <img src="/img/benefits.jpg" alt="Benefits" style={styles.infoImage} />
        </div>
      </section>

      {/* Nowa Sekcja: Kontakt */}
      <section style={styles.contactSection}>
        <h2 style={styles.heading}>Skontaktuj się z nami</h2>
        <p style={styles.contactText}>
          Masz pytania? Chcesz dowiedzieć się więcej o naszej platformie? Skontaktuj się z nami!
        </p>
        <p style={styles.contactInfo}><strong>Email:</strong> support@connectcare.com</p>
        <p style={styles.contactInfo}><strong>Telefon:</strong> +48 123 456 789</p>
        <p style={styles.contactInfo}><strong>Adres:</strong> ul. Pomocna 12, Warszawa</p>
      </section>

      {/* Nowa Sekcja: Misja */}
      <section style={styles.infoSectionReversed}>
        <div style={styles.infoContent}>
          <h2 style={styles.heading}>Nasza Misja</h2>
          <p style={styles.akapit}>
            ConnectCare powstało, by zbudować świat, w którym każdy ma szansę otrzymać pomoc w trudnej sytuacji.
            Naszą misją jest łączenie ludzi o otwartych sercach, gotowych pomagać i wspierać się wzajemnie.
          </p>
        </div>
        <div style={styles.imageContainer}>
          <img src="/img/mission.jpg" alt="Our Mission" style={styles.infoImage} />
        </div>
      </section>

      {user && user.role === 'Osoba potrzebująca' && (
        <section style={styles.createPostSection}>
          <Link to="/create_post">
            <button style={styles.createPostButton}>Utwórz Post</button>
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
    fontFamily: 'poppins, sans-serif',
    textAlign: 'center',
    margin: '0 auto',
    padding: '0px',
    maxWidth: '100%',
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundImage: 'url("/img/header.jpg")',
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
  akapit: {
    textAlign: 'justify',
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
    fontSize: '2.5rem',
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
    width: '100%',
    float: 'left',
    marginRight: '20px',
  },
  infoSection: {
    backgroundColor: '#f1f1f1',
    padding: '40px 50px',
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoSectionReversed: {
    backgroundColor: '#fff',
    padding: '40px 50px',
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  infoContent: {
    textAlign: 'center',
    maxWidth: '50%',
    margin: '0 auto',
    padding: '50px',
  },
  infoImage: {
    width: '100%',
    maxWidth: '100%',
    marginTop: '20px',
    borderRadius: '8px',
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: 'auto',
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
    textAlign: 'center',
  },
  postDescription: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '10px',
    textAlign: 'justify',
  },
  postTags: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '10px',
    textAlign: 'justify',
  },
  postHelpType: {
    fontSize: '1rem',
    color: '#333',
    textAlign: 'center',
    padding: '5px 10px',
    borderRadius: '5px',
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
  contactSection: {
    backgroundColor: '#f1f1f1',
    padding: '40px 20px',
    marginTop: '50px',
    textAlign: 'center',
  },
  contactText: {
    fontSize: '1rem',
    marginBottom: '20px',
  },
  contactInfo: {
    fontSize: '1rem',
    marginBottom: '10px',
  },
  list: {
    textAlign: 'left',
    marginLeft: '20%',
    marginRight: '20%',
  },
};

export default Home;
