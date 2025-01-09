import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail({ user }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/posts/${id}`);
        console.log("Pobrane dane posta:", response.data); // Logowanie danych posta
        setPost(response.data);
      } catch (err) {
        console.error('Błąd podczas pobierania szczegółów posta:', err);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/comments/${id}`);
        console.log("Pobrane komentarze:", response.data); // Logowanie komentarzy
        setComments(response.data);
      } catch (err) {
        console.error('Błąd podczas pobierania komentarzy:', err);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post('http://127.0.0.1:5000/comments', {
        post_id: id,
        user_id: user.id,
        content: newComment,
      });

      console.log("Dodany komentarz:", response.data); // Logowanie dodanego komentarza

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      console.error('Błąd podczas dodawania komentarza:', err);
    }
  };

  const handleSendMessage = async () => {
    if (!messageContent.trim()) {
      alert('Treść wiadomości nie może być pusta.');
      return;
    }

    if (!post || !post.user_id || typeof post.user_id !== 'number') {
      alert('Nieprawidłowy odbiorca wiadomości.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log("Token:", token); // Logowanie tokenu

      const requestData = {
        receiver_id: Number(post.user_id), // Tylko receiver_id i content
        content: messageContent,
      };

      console.log("Wysyłane dane:", JSON.stringify(requestData, null, 2)); // Logowanie danych

      const response = await axios.post(
        'http://127.0.0.1:5000/messages/send',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Odpowiedź serwera:", response.data); // Logowanie odpowiedzi serwera

      setShowMessageModal(false);
      setMessageContent('');
      alert('Wiadomość została wysłana!');
    } catch (error) {
      console.error('Błąd podczas wysyłania wiadomości:', error);
      console.error("Odpowiedź serwera:", error.response?.data);
      alert('Nie udało się wysłać wiadomości. Sprawdź konsolę dla szczegółów.');
    }
  };

  if (!post) {
    return <div>Ładowanie szczegółów posta...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.postContent}>
        <div style={styles.imageContainer}>
          {post.image_url && <img src={post.image_url} alt={post.title} style={styles.image} />}
        </div>
        <div style={styles.details}>
          <h1 style={styles.title}>{post.title}</h1>
          <p style={styles.description}>{post.description}</p>
          <p style={styles.tags}><strong>Tagi:</strong> {post.tags}</p>
          <div
            style={{
              ...styles.helpType,
              backgroundColor: post.is_paid ? '#fff5e6' : '#e6ffe6',
              color: post.is_paid ? '#d9534f' : '#5cb85c',
            }}
          >
            <strong>{post.is_paid ? 'Płatna pomoc' : 'Darmowa pomoc'}</strong>
          </div>
        </div>
      </div>

      {user && user.id !== post.user_id && (
        <button
          onClick={() => setShowMessageModal(true)}
          style={styles.messageButton}
        >
          Wyślij wiadomość do autora
        </button>
      )}

      {showMessageModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Wyślij wiadomość do {post.author?.name}</h3>
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Napisz wiadomość..."
              style={styles.textarea}
            />
            <button onClick={handleSendMessage} style={styles.sendButton}>
              Wyślij
            </button>
            <button
              onClick={() => setShowMessageModal(false)}
              style={styles.cancelButton}
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      <section style={styles.commentsSection}>
        <h2 style={styles.commentsTitle}>Komentarze</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} style={styles.commentCard}>
              <div style={styles.avatarContainer}>
                <img src="/img/avatar.jpg" alt="Avatar" style={styles.avatar} />
                <p style={styles.commentAuthor}><strong>{comment.user_name}</strong></p>
              </div>
              {comment.content ? (
                <p style={styles.commentContent}>{comment.content}</p>
              ) : (
                <p style={styles.hiddenComment}>Komentarz jest ukryty</p>
              )}
            </div>
          ))
        ) : (
          <p style={styles.noComments}>Brak komentarzy.</p>
        )}
      </section>

      {user && user.role === 'Wolontariusz' && (
        <section style={styles.addCommentSection}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Napisz komentarz..."
            style={styles.textarea}
          />
          <button
            onClick={handleAddComment}
            style={styles.addCommentButton}
          >
            Dodaj Komentarz
          </button>
        </section>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  postContent: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
  },
  imageContainer: {
    flex: '1',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
  },
  details: {
    flex: '2',
    textAlign: 'left',
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
    marginBottom: '20px',
  },
  tags: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '20px',
  },
  helpType: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '10px 15px',
    borderRadius: '10px',
    display: 'inline-block',
    marginBottom: '20px',
  },
  commentsSection: {
    marginTop: '30px',
  },
  commentsTitle: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    textAlign: 'center',
  },
  commentCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '15px',
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  commentContent: {
    fontSize: '1rem',
    color: '#555',
  },
  hiddenComment: {
    fontSize: '1rem',
    color: '#888',
    fontStyle: 'italic',
  },
  addCommentSection: {
    marginTop: '30px',
    textAlign: 'center',
  },
  textarea: {
    width: '100%',
    height: '100px',
    borderRadius: '5px',
    padding: '10px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    fontSize: '1rem',
  },
  addCommentButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  messageButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '20px 0',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center',
  },
  sendButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default PostDetail;