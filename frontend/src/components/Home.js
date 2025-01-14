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

  // Funkcja do losowego wyboru 3 postów
  const getRandomPosts = (posts, count) => {
    const shuffled = posts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomPosts = getRandomPosts(posts, 3);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>ConnectCare – Łączymy Serca, By Pomagać</h1>
          <p style={styles.heroDescription}>
            Znajdź wsparcie lub zostań wolontariuszem. Tworzymy przestrzeń pełną troski, zaufania i współpracy.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/register">
              <button style={styles.ctaButton}>Dołącz Teraz</button>
            </Link>
            <Link to="/create_post">
              <button style={styles.ctaButtonSecondary}>Dodaj Nowy Post</button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.about}>
        <div style={styles.aboutContent}>
          <div style={styles.aboutText}>
            <h2 style={styles.sectionTitle}>O Nas</h2>
            <p style={styles.sectionDescription}>
              ConnectCare to platforma łącząca osoby potrzebujące pomocy z wolontariuszami. 
              Nasza misja to tworzenie miejsca, gdzie każdy może znaleźć wsparcie lub zaoferować pomoc.
              Działamy od 2024 roku i już pomogliśmy tysiącom osób w całej Polsce.
            </p>
            <p style={styles.sectionDescription}>
              Wierzymy, że małe gesty mogą zmieniać świat. Dlatego łączymy ludzi, którzy chcą pomagać,
              z tymi, którzy potrzebują wsparcia. Razem budujemy społeczność pełną troski i zaufania.
            </p>
            <Link to="/register">
              <button style={styles.ctaButton}>Dołącz do nas</button>
            </Link>
          </div>
          <div style={styles.aboutImage}>
            <img
              src="/img/support.jpg"  // Tutaj możesz dodać własny obrazek
              alt="O nas"
              style={styles.image}
            />
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section style={styles.postsSection}>
        <h2 style={styles.sectionTitle}>Najnowsze Posty</h2>
        <div style={styles.postsGrid}>
          {randomPosts.map(post => (
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

      {/* New Section: Why Choose Us */}
      <section style={styles.whyChooseUs}>
        <h2 style={styles.sectionTitle}>Dlaczego ConnectCare?</h2>
        <div style={styles.whyChooseUsGrid}>
          <div style={styles.whyChooseUsCard}>
            <img src="/img/ikona-1.png" alt="Ikona 1" style={styles.whyChooseUsIcon} />
            <h3 style={styles.whyChooseUsTitle}>Proste i Intuicyjne</h3>
            <p style={styles.whyChooseUsDescription}>
              Nasza platforma jest łatwa w użyciu, dzięki czemu możesz szybko znaleźć pomoc lub zaoferować wsparcie.
            </p>
          </div>
          <div style={styles.whyChooseUsCard}>
            <img src="/img/ikona-2.png" alt="Ikona 2" style={styles.whyChooseUsIcon} />
            <h3 style={styles.whyChooseUsTitle}>Bezpieczeństwo</h3>
            <p style={styles.whyChooseUsDescription}>
              Dbamy o bezpieczeństwo naszych użytkowników, zapewniając weryfikację i ochronę danych.
            </p>
          </div>
          <div style={styles.whyChooseUsCard}>
            <img src="/img/ikona-3.png" alt="Ikona 3" style={styles.whyChooseUsIcon} />
            <h3 style={styles.whyChooseUsTitle}>Społeczność</h3>
            <p style={styles.whyChooseUsDescription}>
              Dołącz do społeczności, która wspiera się nawzajem i zmienia świat na lepsze.
            </p>
          </div>
        </div>
      </section>

      {/* New Section: Testimonials */}
      <section style={styles.testimonials}>
        <h2 style={styles.sectionTitle}>Co mówią o nas użytkownicy?</h2>
        <div style={styles.testimonialsGrid}>
          <div style={styles.testimonialCard}>
            <p style={styles.testimonialText}>
              "Dzięki ConnectCare znalazłem pomoc w remoncie mieszkania. Ludzie są naprawdę życzliwi!"
            </p>
            <p style={styles.testimonialAuthor}>- Jan Kowalski</p>
          </div>
          <div style={styles.testimonialCard}>
            <p style={styles.testimonialText}>
              "Świetna platforma! Pomogłam kilku osobom w zakupach, a sama otrzymałam wsparcie w nauce."
            </p>
            <p style={styles.testimonialAuthor}>- Anna Nowak</p>
          </div>
          <div style={styles.testimonialCard}>
            <p style={styles.testimonialText}>
              "ConnectCare to nie tylko pomoc, ale też możliwość poznania wspaniałych ludzi."
            </p>
            <p style={styles.testimonialAuthor}>- Piotr Wiśniewski</p>
          </div>
        </div>
      </section>

      {/* New Section: Call to Action */}
      <section style={styles.ctaSection}>
        <h2 style={styles.sectionTitle}>Dołącz do nas już dziś!</h2>
        <p style={styles.ctaDescription}>
          Nie czekaj! Zarejestruj się i zacznij pomagać lub znajdź wsparcie, którego potrzebujesz.
        </p>
        <Link to="/register">
          <button style={styles.ctaButton}>Zarejestruj się</button>
        </Link>
      </section>

      {/* Footer */}
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
    fontFamily: 'Poppins, Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  hero: {
    
    background: 'url(/img/header.jpg)',
    backgroundSize: 'cover', // Rozciąga obraz na cały element
    backgroundRepeat: 'no-repeat', // Zapobiega powtarzaniu obrazu
    backgroundPosition: 'center', // Wyśrodkowuje obraz
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
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
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
  ctaButtonSecondary: {
    backgroundColor: '#fff',
    color: '#007bff',
    padding: '15px 30px',
    fontSize: '1.2rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  about: {
    padding: '50px 20px',
    backgroundColor: '#fff',
  },
  aboutContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '90%',
    margin: '0 auto',
    gap: '40px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
  aboutText: {
    flex: 1,
    textAlign: 'left',
    '@media (max-width: 768px)': {
      textAlign: 'center',
    },
  },
  aboutImage: {
    flex: 1,
    textAlign: 'center',
    '@media (max-width: 768px)': {
      order: -1,  // Obrazek będzie na górze na małych ekranach
    },
  },
  image: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    maxWidth: '90%',
    margin: '0 auto',
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
    height: '200px',
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
    padding: '5%'
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
  whyChooseUs: {
    padding: '50px 20px',
    textAlign: 'center',
  },
  whyChooseUsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    maxWidth: '90%',
    margin: '0 auto',
  },
  whyChooseUsCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
  },
  whyChooseUsIcon: {
    width: '80px',
    height: '80px',
    marginBottom: '15px',
  },
  whyChooseUsTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
  },
  whyChooseUsDescription: {
    fontSize: '1rem',
    lineHeight: '1.6',
  },
  testimonials: {
    padding: '50px 20px',
    textAlign: 'center',
    backgroundColor: '#f1f1f1',
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    maxWidth: '90%',
    margin: '0 auto',
  },
  testimonialCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
  },
  testimonialText: {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
  testimonialAuthor: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#007bff',
  },
  ctaSection: {
    padding: '50px 20px',
    textAlign: 'center',
    backgroundColor: '#007bff',
    color: '#fff',
  },
  ctaDescription: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  footer: {
    marginTop: '50px',
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

export default Home;