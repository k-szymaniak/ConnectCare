import React, { useState } from 'react';
import axios from 'axios';

function AddPost({ user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [tags, setTags] = useState('');
  const [skills, setSkills] = useState([]); // Nowe pole dla umiejętności
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const availableSkills = [
    "Doświadczony", "Nowy", "Złota rączka", "Pomoc w zakupach", "Pomoc w sprzątaniu",
    "Pomoc w opiece nad zwierzętami", "Pomoc w ogrodzie", "Pomoc w remoncie",
    "Pomoc w nauce", "Pomoc w transporcie", "Pomoc w gotowaniu", "Pomoc w opiece nad dziećmi",
    "Pomoc w organizacji wydarzeń", "Pomoc w naprawie sprzętu elektronicznego", "Pomoc w pisaniu CV"
  ];

  const handleSkillChange = (skill) => {
    setSkills(prevSkills =>
      prevSkills.includes(skill)
        ? prevSkills.filter(s => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      setMessage("Tytuł i opis są wymagane.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/create_post', {
        user_id: user.id,
        title,
        description,
        image_url: imageUrl,
        is_paid: isPaid,
        tags,
        skills, // Dodanie umiejętności do wysyłanych danych
      });
      setMessage(response.data.message);
      setLoading(false);
      setTitle('');
      setDescription('');
      setImageUrl('');
      setIsPaid(false);
      setTags('');
      setSkills([]);
    } catch (error) {
      console.error("Błąd podczas tworzenia posta:", error.response || error.message);
      setMessage(error.response?.data?.error || 'Wystąpił nieoczekiwany błąd.');
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Dodaj Nowy Post</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Tytuł:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Opis:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>URL Obrazu:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Płatna pomoc:</label>
          <input
            type="checkbox"
            checked={isPaid}
            onChange={() => setIsPaid(!isPaid)}
            style={styles.checkbox}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Tagi (oddzielone przecinkami):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Umiejętności:</label>
          {availableSkills.map(skill => (
            <div key={skill} style={styles.checkboxGroup}>
              <input
                type="checkbox"
                id={skill}
                checked={skills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
              />
              <label htmlFor={skill}>{skill}</label>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Trwa przesyłanie...' : 'Dodaj Post'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    height: '120px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
    resize: 'none',
  },
  checkbox: {
    marginLeft: '10px',
    transform: 'scale(1.5)',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  message: {
    textAlign: 'center',
    margin: '10px 0',
    color: '#d9534f',
    fontWeight: 'bold',
  },
};

export default AddPost;