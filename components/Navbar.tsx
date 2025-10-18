import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    const activeLinkStyle = {
        color: '#a78bfa', // violet-400
    };

    return (
        <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-md shadow-violet-900/20">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-white tracking-wider">
                    <NavLink to="/" className="flex items-center gap-3">
                        <img src="/logo.png" alt="AZ Poker Logo" className="h-10 w-10" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">AZ Poker</span>
                    </NavLink>
                </div>
                <div className="flex items-center space-x-6 text-lg">
                    <NavLink 
                        to="/" 
                        className="text-slate-300 hover:text-violet-400 transition-colors duration-300"
                        style={({ isActive }) => isActive ? { ...activeLinkStyle, textDecoration: 'underline' } : undefined}
                    >
                        Inicio
                    </NavLink>
                    <NavLink 
                        to="/dashboard" 
                        className="text-slate-300 hover:text-violet-400 transition-colors duration-300"
                        style={({ isActive }) => isActive ? { ...activeLinkStyle, textDecoration: 'underline' } : undefined}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink 
                        to="/profile" 
                        className="text-slate-300 hover:text-violet-400 transition-colors duration-300"
                        style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                        aria-label="Perfil"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;