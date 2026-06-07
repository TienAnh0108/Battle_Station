import React, { useState } from 'react';
import API from '../services/api';
import { GoogleLogin } from '@react-oauth/google'; // 1. Bổ sung import nút bấm Google

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

    const handleGoogleSuccess = (credentialResponse) => {
        // credentialResponse.credential is an extremely secure ID token issued by Google.
        const googleToken = credentialResponse.credential;

        // Send this token to the Django Backend endpoint we just wrote in Phase 2.
        API.post('auth/google/', { access_token: googleToken })
            .then(res => {
                // Django completes cross-validation with Google and returns an internal JWT to React.
                const { access, refresh } = res.data;
                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);
                alert('Đăng nhập bằng Google thành công rực rỡ!');
                window.location.href = '/';
            })
            .catch(err => {
                console.error("Lỗi xác thực OAuth với Backend:", err.response?.data);
                setError('Đăng nhập bằng Google thất bại khi kết nối với máy chủ.');
            });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center' }}>Đăng Nhập</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Mật khẩu:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Đăng nhập
                </button>
            </form>

            {/* Text-based or visual separator */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
                <p style={{ margin: '0 10px', color: '#777', fontSize: '14px' }}>HOẶC</p>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#ddd' }}></div>
            </div>

            {/* Google button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                        setError('Đăng nhập Google thất bại từ phía client.');
                    }}
                    theme="outline"
                    shape="pill"
                    locale="vi"
                />
            </div>
        </div>
    );
};

export default Login;