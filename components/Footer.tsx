import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 mt-16">
            <div className="container mx-auto px-6 py-8 text-center text-slate-400">
                <p>&copy; 2025 AZ Poker. Todos los derechos reservados.</p>
                <p className="mt-2 text-sm">18+ | Juega responsablemente | <a href="https://www.gambleaware.org" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">GambleAware</a></p>
            </div>
        </footer>
    );
};

export default Footer;