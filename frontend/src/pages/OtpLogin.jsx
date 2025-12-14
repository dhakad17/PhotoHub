import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function OtpLogin() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            await api.post('/auth/otp/send', { email });
            setMessage('📧 OTP sent to your email!');
            setStep(2);
        } catch (err) {
            console.error('Send OTP error:', err);
            setError(err.response?.data?.message || 'Failed to send OTP. User not found or email invalid.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/otp/login', { email, otp });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error('Verify OTP error:', err);
            setError('Invalid or expired OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
            <h2>OTP Login</h2>
            <p>{step === 1 ? 'Enter your email to receive OTP' : 'Enter the code sent to your email'}</p>

            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}

            {step === 1 ? (
                <form onSubmit={handleSendOtp}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Sending...' : '📨 Send OTP'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp}>
                    <div className="form-group">
                        <label>OTP Code</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            placeholder="Enter 6-digit code"
                            maxLength="6"
                            pattern="[0-9]{6}"
                            disabled={loading}
                            style={{
                                fontSize: '24px',
                                letterSpacing: '8px',
                                textAlign: 'center',
                                fontWeight: '600'
                            }}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Verifying...' : '✓ Verify OTP'}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setStep(1);
                            setOtp('');
                            setMessage('');
                            setError('');
                        }}
                        style={{
                            marginTop: '15px',
                            background: 'linear-gradient(135deg, #FF6B00 0%, #FF9F4A 100%)',
                            boxShadow: '0 10px 25px rgba(255, 107, 0, 0.3)'
                        }}
                        disabled={loading}
                    >
                        ← Back to Email
                    </button>
                </form>
            )}
            </div>
        </div>
    );
}

export default OtpLogin;
