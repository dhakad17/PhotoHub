import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import OtpLogin from './pages/OtpLogin';
import Register from './pages/Register';
import VerifyOtp from './pages/VerifyOtp';
import Dashboard from './pages/Dashboard';
import Albums from './pages/Albums';
import AlbumDetail from './pages/AlbumDetail';
import MyMedia from './pages/MyMedia';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/otp-login" element={<OtpLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Layout>
                            <Dashboard />
                        </Layout>
                    </ProtectedRoute>
                } />
                <Route path="/albums" element={
                    <ProtectedRoute>
                        <Layout>
                            <Albums />
                        </Layout>
                    </ProtectedRoute>
                } />
                <Route path="/albums/:albumId" element={
                    <ProtectedRoute>
                        <Layout>
                            <AlbumDetail />
                        </Layout>
                    </ProtectedRoute>
                } />
                <Route path="/my-media" element={
                    <ProtectedRoute>
                        <Layout>
                            <MyMedia />
                        </Layout>
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
