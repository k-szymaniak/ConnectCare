import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Tasks from './components/Tasks';
import Profile from './components/Profile';
import Register from './components/Register';
import Login from './components/Login';
import PostList from './components/PostList';  // Nowy import
import CreatePost from './components/AddPost';  // Nowy import
import PostDetail from './components/PostDetail';


function App() {
  // Inicjalizacja stanu użytkownika z Local Storage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Aktualizacja Local Storage przy zmianie użytkownika
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile user={user} />} /> {/* Przekazujemy user */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/posts" element={<PostList />} /> {/* Nowa trasa dla postów */}
        <Route path="/create_post" element={<CreatePost user={user} />} /> {/* Nowa trasa dla tworzenia postu */}
        <Route path="/post/:id" element={<PostDetail user={user} />} /> {/* Przekazujemy user */}

        
      </Routes>
    </Router>
  );
}

export default App;
