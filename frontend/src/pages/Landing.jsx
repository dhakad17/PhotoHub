import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="auth-container">
            <div className="auth-form" style={{ textAlign: 'center' }}>
                <h2>Welcome to PhotoHub</h2>
                <p>Your journey to seamless photo sharing starts here</p>

                <div className="landing-buttons">
                    <button onClick={() => navigate('/register')}>
                        ✨ New User - Get Started
                    </button>

                    <div className="divider">
                        <hr />
                        <span>OR</span>
                    </div>

                    <button onClick={() => navigate('/login')}>
                        🔐 Existing User - Sign In
                    </button>
                </div>

                <p style={{ marginTop: '30px', fontSize: '13px', color: '#a0aec0' }}>
                    Secure authentication with OTP verification
                </p>
            </div>
        </div>
    );
}

export default Landing;
