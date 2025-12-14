import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // 1. Register User
            await api.post('/auth/register', { name, email, password });

            // 2. Send OTP immediately
            await api.post('/auth/otp/send', { email });

            // 3. Navigate to Verify Page
            navigate('/verify-otp', { state: { email } });

        } catch (err) {
            console.error('Registration error:', err);
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Registration failed. Email might already be in use.');
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Create Account</h2>
                <p>Join PhotoHub and start sharing your moments</p>

                {error && <div className="error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a strong password"
                            required
                            disabled={loading}
                            minLength="6"
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Continue →'}
                    </button>
                </form>

                <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
                    By signing up, you'll receive an OTP to verify your email
                </p>
            </div>
        </div>
    );
}

export default Register;
