import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Messages({ user }) {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]); // Lista użytkowników
  const [error, setError] = useState(''); // Komunikat o błędzie

  // Pobierz listę użytkowników przy pierwszym renderowaniu
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:5000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania użytkowników:', error);
        setError('Nie udało się pobrać listy użytkowników.');
      }
    };

    fetchUsers();
  }, []);

  // Pobierz wiadomości po wybraniu użytkownika
  useEffect(() => {
    if (user && selectedUser) {
      const fetchMessages = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://127.0.0.1:5000/messages/${selectedUser}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setMessages(response.data);
          setError(''); // Wyczyść błąd, jeśli wiadomości zostały pobrane pomyślnie
        } catch (error) {
          console.error('Błąd podczas pobierania wiadomości:', error);
          setError('Nie udało się pobrać wiadomości.');
        }
      };

      fetchMessages();
    }
  }, [user, selectedUser]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://127.0.0.1:5000/messages/send',
        {
          receiver_id: selectedUser,
          content: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewMessage('');
      alert('Wiadomość została wysłana!');
    } catch (error) {
      console.error('Błąd podczas wysyłania wiadomości:', error);
      alert('Nie udało się wysłać wiadomości.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Wiadomości</h1>
      <div style={styles.messagesContainer}>
        {/* Lista użytkowników */}
        <div style={styles.usersList}>
          <h2 style={styles.subtitle}>Użytkownicy</h2>
          {users.map((u) => (
            <div
              key={u.id}
              style={{
                ...styles.userItem,
                backgroundColor: selectedUser === u.id ? '#007bff' : '#f8f9fa',
                color: selectedUser === u.id ? '#fff' : '#000',
              }}
              onClick={() => setSelectedUser(u.id)}
            >
              {u.name}
            </div>
          ))}
        </div>

        {/* Czat */}
        <div style={styles.chat}>
          <h2 style={styles.subtitle}>
            Rozmowa z {users.find((u) => u.id === selectedUser)?.name || '...'}
          </h2>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.messages}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  ...styles.message,
                  alignSelf: message.sender_id === user.id ? 'flex-end' : 'flex-start',
                  backgroundColor: message.sender_id === user.id ? '#007bff' : '#f1f1f1',
                  color: message.sender_id === user.id ? '#fff' : '#000',
                }}
              >
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Napisz wiadomość..."
            style={styles.textarea}
          />
          <button onClick={handleSendMessage} style={styles.sendButton}>
            Wyślij
          </button>
        </div>
      </div>

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
    maxWidth: '100%',
    margin: '0 auto',
    padding: '0',
    fontFamily: 'Poppins, Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.8rem',
    marginBottom: '20px',
    color: '#333',
  },
  messagesContainer: {
    display: 'flex',
    gap: '20px',
    flex: 1,
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
    padding:'50px'
  },
  usersList: {
    flex: 1,
    borderRight: '1px solid #ccc',
    paddingRight: '20px',
    '@media (max-width: 768px)': {
      borderRight: 'none',
      paddingRight: '0',
      borderBottom: '1px solid #ccc',
      paddingBottom: '20px',
    },
  },
  userItem: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#007bff',
      color: '#fff',
    },
  },
  chat: {
    flex: 3,
  },
  messages: {
    height: '400px',
    overflowY: 'scroll',
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  message: {
    padding: '10px',
    borderRadius: '5px',
    maxWidth: '70%',
    wordWrap: 'break-word',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    resize: 'none',
  },
  sendButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  error: {
    color: '#d9534f',
    marginBottom: '10px',
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    backgroundColor: '#007bff',
    color: '#fff',
    marginTop: 'auto',
  },
  footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
  logoSection: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  footerLinks: {
    textAlign: 'left',
    '@media (max-width: 768px)': {
      textAlign: 'center',
      margin: '10px 0',
    },
  },
  footerCopy: {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '0.9rem',
  },
};

export default Messages;