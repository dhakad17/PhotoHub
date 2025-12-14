import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
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
            const response = await api.post('/auth/login', { email, password });
            console.log('Login successful', response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Welcome Back</h2>
                <p>Sign in to continue to PhotoHub</p>

                {error && <div className="error">{error}</div>}

                <form onSubmit={handleSubmit}>
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
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/otp-login')}
                        className="btn-secondary"
                        style={{
                            background: 'transparent',
                            color: 'var(--primary)',
                            textDecoration: 'none',
                            width: 'auto',
                            padding: '8px 16px',
                            boxShadow: 'none',
                            fontSize: '0.9rem',
                            border: 'none'
                        }}
                    >
                        Or login with OTP →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
