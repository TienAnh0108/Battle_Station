import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Check user logged in using token 
  const isLoggedIn = !!localStorage.getItem('access_token');

  const handleLogout = () => {
    // Delete toke from server when clicking logout button
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    alert('Đã đăng xuất thành công!');
    window.location.href = '/login'; // Redirect to the login page
  };

  return (
    <nav style={{ padding: '15px 20px', backgroundColor: '#1a1a1a', color: '#fff', display: 'flex', justifyContent: 'between', alignItems: 'center', fontFamily: 'sans-serif', borderBottom: '2px solid #333' }}>
      <div style={{ flexGrow: 1 }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px', letterSpacing: '1px' }}>
          BATTLESTATION STORE
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#ccc', textDecoration: 'none', fontWeight: '500' }}>Home</Link>

        {isLoggedIn ? (
          // If logged in, logout button will appear
          <button
            onClick={handleLogout}
            style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Logout
          </button>
        ) : (
          // If not logged in, login and register button will appear
          <>
            <Link to="/login" style={{ color: '#ccc', textDecoration: 'none', fontWeight: '500' }}>Log in</Link>
            <Link to="/register" style={{ backgroundColor: '#28a745', color: '#fff', padding: '8px 15px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
