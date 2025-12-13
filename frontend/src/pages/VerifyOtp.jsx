import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyOtp() {
    const location = useLocation();
    const navigate = useNavigate();

    // Get email from previous page state, or default to empty
    const [email, setEmail] = useState(location.state?.email || '');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!email) {
            // Ideally redirect back to register or login if no email in state
            // But we can let them type it if they want
        } else {
            setMessage(`OTP Sent to ${email}`);
        }
    }, [email]);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/otp/login', { email, otp });
            console.log("Login Success", response.data);
            alert('Verification Successful! You are logged in.\nToken: ' + response.data.accessToken);
            // navigate('/dashboard'); // If we had a dashboard
        } catch (err) {
            setError('Invalid OTP or expired. Please try again.');
        }
    };

    const handleResend = async () => {
        try {
            await api.post('/auth/otp/send', { email });
            setMessage('OTP Resent!');
            setError('');
        } catch (err) {
            setError('Failed to resend OTP.');
        }
    }

    return (
        <div className="auth-form">
            <h2>Verify Your Email</h2>
            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}

            <form onSubmit={handleVerifyOtp}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={!!location.state?.email} />
                </div>
                <div className="form-group">
                    <label>Enter OTP Code</label>
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required placeholder="6-digit code" />
                </div>
                <button type="submit">Verify & Login</button>
            </form>

            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <button type="button" onClick={handleResend} style={{ background: 'transparent', color: '#4299e1', textDecoration: 'underline', width: 'auto', padding: '0' }}>
                    Resend OTP
                </button>
            </div>
        </div>
    );
}

export default VerifyOtp;
