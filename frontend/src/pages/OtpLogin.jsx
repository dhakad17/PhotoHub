import React, { useState } from 'react';
import api from '../api/axios';

function OtpLogin() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            await api.post('/auth/otp/send', { email });
            setMessage('OTP sent to your email!');
            setStep(2);
        } catch (err) {
            setError('Failed to send OTP. User not found?');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/otp/login', { email, otp });
            alert('Login successful! Token: ' + response.data.accessToken);
        } catch (err) {
            setError('Invalid OTP or expired.');
        }
    };

    return (
        <div className="auth-form">
            <h2>OTP Login</h2>
            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}

            {step === 1 ? (
                <form onSubmit={handleSendOtp}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit">Send OTP</button>
                </form>
            ) : (
                <form onSubmit={handleVerifyOtp}>
                    <div className="form-group">
                        <label>Enter OTP</label>
                        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                    </div>
                    <button type="submit">Verify OTP</button>
                    <button type="button" onClick={() => setStep(1)} style={{ marginTop: '10px', background: '#e2e8f0', color: '#333' }}>
                        Back
                    </button>
                </form>
            )}
        </div>
    );
}

export default OtpLogin;
