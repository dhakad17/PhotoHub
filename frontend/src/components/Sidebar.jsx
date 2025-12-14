import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
        { path: '/albums', label: 'Albums', icon: '📚' },
        { path: '/my-media', label: 'My Media', icon: '🖼️' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2>PhotoHub</h2>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="nav-icon">{item.icon}</span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button onClick={handleLogout} className="logout-btn">
                    <span className="nav-icon">🚪</span>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
