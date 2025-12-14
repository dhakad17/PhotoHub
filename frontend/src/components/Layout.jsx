import React, { useState } from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="app-container">
            <Sidebar className={sidebarOpen ? 'open' : ''} />

            {/* Mobile Toggle */}
            <button
                className="mobile-nav-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? '✕' : '☰'}
            </button>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
