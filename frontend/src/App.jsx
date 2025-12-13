import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import OtpLogin from './pages/OtpLogin'; // We can reuse this or separate VerifyOtp
import Register from './pages/Register';
import VerifyOtp from './pages/VerifyOtp'; // We will create this

function App() {
    return (
        <Router>
            <div className="container">
                <nav>
                    <Link to="/">Home</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/otp-login" element={<OtpLogin />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-otp" element={<VerifyOtp />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
