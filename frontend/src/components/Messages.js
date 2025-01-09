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
      <h1>Wiadomości</h1>
      <div style={styles.messagesContainer}>
        <div style={styles.usersList}>
          <h2>Użytkownicy</h2>
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
        <div style={styles.chat}>
          <h2>Rozmowa z {users.find((u) => u.id === selectedUser)?.name || '...'}</h2>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.messages}>
            {messages.map((message) => (
              <div key={message.id} style={styles.message}>
                <p>
                  <strong>{message.sender_id === user.id ? 'Ty' : 'Użytkownik'}:</strong>{' '}
                  {message.content}
                </p>
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
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  messagesContainer: {
    display: 'flex',
    gap: '20px',
  },
  usersList: {
    flex: 1,
    borderRight: '1px solid #ccc',
    paddingRight: '20px',
  },
  userItem: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
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
  },
  message: {
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  sendButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    color: '#d9534f',
    marginBottom: '10px',
  },
};

export default Messages;