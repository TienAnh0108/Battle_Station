import React, { useState } from 'react';
import API from '../services/api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        if (password !== passwordConfirm) {
            setError('Mật khẩu xác nhận không khớp!');
            return;
        }

        //Call the dj-rest-auth Registration API
        API.post('auth/registration/', {
            username: email,
            email: email,
            password: password,
            password1: password,
            password2: passwordConfirm
        })
        .then(response => {
            alert('Đăng ký tài khoản thành công! Hãy thử đăng nhập.');
            window.location.href = '/login'; // After successful registration, proceed to the login page.
        })
        .catch(err => {
            console.error(err.response?.data);
            setError('Đăng ký thất bại. Email có thể đã tồn tại hoặc mật khẩu quá ngắn.');
        });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'sans-serif', backgroundColor: '#1e1e1e', color: '#fff' }}>
            <h2 style={{ textAlign: 'center' }}>Đăng Ký Tài Khoản</h2>
            {error && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email của bạn:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2d2d2d', color: '#fff', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Mật khẩu:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2d2d2d', color: '#fff', boxSizing: 'border-box' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Xác nhận mật khẩu:</label>
                    <input type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} required style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#2d2d2d', color: '#fff', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Đăng ký ngay
                </button>
            </form>
        </div>
    );
};

export default Register;