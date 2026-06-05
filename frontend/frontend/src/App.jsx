import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px 20px', backgroundColor: '#222', color: '#fff', display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
        <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
        <Link to="/register" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link> {/* Thêm dòng này */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Thêm dòng này */}
      </Routes>
    </Router>
  );
}

export default App;