import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Tasks from './components/Tasks';
import Profile from './components/Profile';
import Register from './components/Register';
import Login from './components/Login';
import AddPost from './components/AddPost';  // Dodajemy komponent AddPost

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

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
        <Route path="/" element={<Home user={user} />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/create_post" element={<AddPost user={user} />} /> {/* Dodajemy trasę z user */}
      </Routes>
    </Router>
  );
}

export default App;
