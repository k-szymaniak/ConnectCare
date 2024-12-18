import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail({ user }) {
  const { id } = useParams(); // Pobierz numer posta z URL
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
        console.error('Error fetching post:', err);
        setError('Nie udało się załadować szczegółów posta.');
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/comments/${id}`);
        setComments(response.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
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
      console.error('Error adding comment:', err);
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
    <div style={styles.container}>
      <h1 style={styles.title}>{post.title}</h1>
      {post.image_url && (
        <img src={post.image_url} alt={post.title} style={styles.image} />
      )}
      <p style={styles.description}>{post.description}</p>
      <p style={styles.tags}><strong>Tagi:</strong> {post.tags}</p>
      <p style={styles.helpType}>
        <strong>{post.is_paid ? 'Odpłatna pomoc' : 'Darmowa pomoc'}</strong>
      </p>

      <div style={styles.commentsSection}>
        <h2 style={styles.commentsTitle}>Komentarze</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} style={styles.commentCard}>
              <p style={styles.commentAuthor}><strong>{comment.user_name}</strong></p>
              {comment.content ? (
                <p style={styles.commentContent}>{comment.content}</p>
              ) : (
                <p style={styles.hiddenComment}>Komentarz jest ukryty</p>
              )}
            </div>
          ))
        ) : (
          <p>Brak komentarzy.</p>
        )}
      </div>

      {user && user.role === 'Wolontariusz' && (
        <div style={styles.addCommentSection}>
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
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  image: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '10px',
    textAlign: 'justify',
  },
  tags: {
    fontSize: '1rem',
    color: '#777',
    marginBottom: '20px',
  },
  helpType: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#007bff',
  },
  commentsSection: {
    marginTop: '30px',
    textAlign: 'left',
  },
  commentsTitle: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  commentCard: {
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  commentAuthor: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
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
    marginTop: '20px',
    textAlign: 'center',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  addCommentButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#555',
    marginTop: '50px',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#d9534f',
    marginTop: '50px',
  },
};

export default PostDetail;
