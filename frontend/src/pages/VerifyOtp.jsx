import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyOtp() {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState(location.state?.email || '');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (email) {
            setMessage(`📧 OTP sent to ${email}`);
        }
    }, [email]);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/otp/login', { email, otp });
            console.log("Login Success", response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error('OTP verification error:', err);
            setError('Invalid or expired OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/otp/send', { email });
            setMessage('📧 New OTP sent to ' + email);
            setError('');
            setOtp('');
        } catch (err) {
            console.error('Resend OTP error:', err);
            setError('Failed to resend OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
            <h2>Verify Your Email</h2>
            <p>Enter the 6-digit code sent to your email</p>

            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}

            <form onSubmit={handleVerifyOtp}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={!!location.state?.email || loading}
                        placeholder="you@example.com"
                    />
                </div>
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
                    {loading ? 'Verifying...' : '✓ Verify & Login'}
                </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#718096', marginBottom: '10px' }}>
                    Didn't receive the code?
                </p>
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={loading}
                    style={{
                        background: 'transparent',
                        color: '#FF6B00',
                        textDecoration: 'underline',
                        width: 'auto',
                        padding: '0',
                        boxShadow: 'none',
                        fontSize: '14px',
                        fontWeight: '600'
                    }}
                >
                    Resend OTP
                </button>
            </div>
            </div>
        </div>
    );
}

export default VerifyOtp;
