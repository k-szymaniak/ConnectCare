import React from 'react';

function Home() {
  return (
    <div className="home-container" style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to ConnectCare</h1>
        <p>Your platform for managing tasks and profiles efficiently.</p>
        <button style={styles.button} onClick={() => alert('Explore now!')}>Explore Now</button>
      </header>
      
      <section style={styles.section}>
        <h2>Features</h2>
        <div style={styles.features}>
          <div style={styles.feature}>
            <h3>Task Management</h3>
            <p>Organize your tasks and boost productivity with ease.</p>
          </div>
          <div style={styles.feature}>
            <h3>Profile Management</h3>
            <p>Update and manage your personal profile in a few clicks.</p>
          </div>
          <div style={styles.feature}>
            <h3>Analytics</h3>
            <p>Track your performance and achieve your goals faster.</p>
          </div>
        </div>
      </section>
      
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
  features: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
  feature: {
    flex: '1 1 calc(33.333% - 20px)',
    margin: '10px',
    padding: '20px',
    backgroundColor: '#e9ecef',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
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
