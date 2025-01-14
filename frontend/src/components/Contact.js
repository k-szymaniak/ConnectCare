import React from 'react';

function Contact() {
  return (
    <div style={styles.container}>
      {/* Sekcja z danymi kontaktowymi */}
      <section style={styles.contactSection}>
        <h1 style={styles.title}>Skontaktuj się z nami</h1>
        <p style={styles.description}>
          Jesteśmy tutaj, aby odpowiedzieć na Twoje pytania i pomóc w rozwiązaniu problemów. 
          Skontaktuj się z nami za pomocą poniższych danych kontaktowych lub odwiedź nas w biurze.
        </p>
        <div style={styles.contactInfo}>
          <div style={styles.contactItem}>
            <h3 style={styles.contactTitle}>Adres</h3>
            <p style={styles.contactText}>
              ul. Przykładowa 123<br />
              00-001 Warszawa<br />
              Polska
            </p>
          </div>
          <div style={styles.contactItem}>
            <h3 style={styles.contactTitle}>Telefon</h3>
            <p style={styles.contactText}>+48 123 456 789</p>
          </div>
          <div style={styles.contactItem}>
            <h3 style={styles.contactTitle}>Email</h3>
            <p style={styles.contactText}>kontakt@connectcare.com</p>
          </div>
        </div>
      </section>

      {/* Sekcja z dodatkowym tekstem */}
      <section style={styles.additionalSection}>
        <h2 style={styles.additionalTitle}>Dlaczego warto się z nami skontaktować?</h2>
        <p style={styles.additionalText}>
          Jesteśmy zespołem profesjonalistów, którzy zawsze są gotowi pomóc. 
          Niezależnie od tego, czy masz pytania dotyczące naszej platformy, czy potrzebujesz wsparcia technicznego, 
          nasz zespół jest do Twojej dyspozycji. Działamy szybko i skutecznie, aby zapewnić Ci najlepsze doświadczenie.
        </p>
        <p style={styles.additionalText}>
          Zapraszamy również do odwiedzenia naszego biura, gdzie z przyjemnością porozmawiamy o Twoich potrzebach 
          i przedstawimy możliwości współpracy.
        </p>
      </section>

      {/* Stopka */}
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
    maxWidth: '100%',
    margin: '0 auto',
    padding: '0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  contactSection: {
    textAlign: 'center',
    padding: '50px 20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '30px',
  },
  contactInfo: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap',
  },
  contactItem: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    flex: '1',
    minWidth: '250px',
  },
  contactTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#007bff',
  },
  contactText: {
    fontSize: '1rem',
    color: '#555',
  },
  additionalSection: {
    padding: '50px 20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  additionalTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '20px',
    textAlign: 'center',
  },
  additionalText: {
    fontSize: '1.2rem',
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '20px',
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
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

export default Contact;