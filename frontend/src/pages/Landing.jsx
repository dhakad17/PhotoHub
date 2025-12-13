import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="auth-form" style={{ textAlign: 'center', maxWidth: '500px' }}>
            <h2>Welcome to PhotoHub</h2>
            <p>Please select an option to continue</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
                <button onClick={() => navigate('/register')} style={{ backgroundColor: '#48bb78' }}>
                    New User (Register)
                </button>
                <div style={{ position: 'relative', margin: '10px 0' }}>
                    <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />
                    <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 10px', color: '#718096', fontSize: '14px' }}>OR</span>
                </div>
                <button onClick={() => navigate('/login')}>
                    Existing User (Login)
                </button>
            </div>
        </div>
    );
}

export default Landing;
