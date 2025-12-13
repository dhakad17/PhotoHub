import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // 1. Register User
            await api.post('/auth/register', { name, email, password });

            // 2. Send OTP immediately
            await api.post('/auth/otp/send', { email });

            // 3. Navigate to Verify Page
            navigate('/verify-otp', { state: { email } });

        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                setError('Registration failed: ' + (err.response.data.message || 'Unknown error'));
            } else {
                setError('Registration failed. Email might be in use.');
            }
        }
    };

    return (
        <div className="auth-form">
            <h2>New User Registration</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Next</button>
            </form>
        </div>
    );
}

export default Register;
