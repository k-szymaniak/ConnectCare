import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail({ user }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error('Błąd podczas pobierania szczegółów posta:', err);
        setError('Nie udało się załadować szczegółów posta.');
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/comments/${id}`);
        setComments(response.data);
      } catch (err) {
        console.error('Błąd podczas pobierania komentarzy:', err);
        setError('Nie udało się załadować komentarzy.');
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/comments', {
        post_id: id,
        user_id: user.id,
        content: newComment,
      });

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      console.error('Błąd podczas dodawania komentarza:', err);
      setError('Nie udało się dodać komentarza.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (!post) {
    return <div style={styles.loading}>Ładowanie szczegółów posta...</div>;
  }

  return (
    <div>
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
              disabled={loading}
            >
              {loading ? 'Dodawanie...' : 'Dodaj Komentarz'}
            </button>
          </section>
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
        <p style={styles.footerCopy}>© 2024 ConnectCare. Wszystkie prawa zastrzeżone.</p>
      </footer>
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

export default PostDetail;
