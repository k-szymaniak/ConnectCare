import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Tasks from './components/Tasks';
import Profile from './components/Profile';
import Register from './components/Register'; // Importuj komponent rejestracji

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} /> {/* Trasa do rejestracji */}
      </Routes>
    </Router>
  );
}

export default App;
