import React, { useState } from 'react';
import API from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // Send request POST to port auth of Django
        API.post('auth/login/', { email, password })
            .then(response => {
                // Django dj-rest-auth returns access token and refresh token
                const { access, refresh } = response.data;
                
                // Save the token to localStorage for use with later APIs (such as shipping containers).
                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);
                
                alert('Đăng nhập thành công!');
                window.location.href = '/'; 
            })
            .catch(err => {
                console.error(err);
                setError('Email hoặc mật khẩu không chính xác.');
            });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'sans-serif' }}>
            <h2>Đăng Nhập</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Mật khẩu:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Đăng nhập
                </button>
            </form>
        </div>
    );
};

export default Login;