import React from 'react';
import Button from '../components/Button';

const ProfilePage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Perfil del Jugador</h1>
                <p className="text-lg text-slate-300 mt-2">Tu información, progreso y herramientas.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 text-center flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Profesor a Cargo</h2>
                    <img 
                        src="https://azpoker.netlify.app/assets/zeta-profile-Bq7XFfMh.jpeg" 
                        alt="Zeta, Fundador de AZ Poker" 
                        className="w-24 h-24 rounded-full mb-3 border-4 border-violet-500 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-white">Zeta</h3>
                    <p className="text-slate-400">Fundador de AZ Poker</p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 text-center flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">TU HUD</h2>
                        <p className="text-slate-300 mb-6">Tu Head-Up Display es la llave para explotar a tus rivales. Descarga la última versión.</p>
                    </div>
                    <Button href="#" variant="secondary">Descargar HUD</Button>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 text-center flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Próxima Revisión</h2>
                        <p className="text-slate-300 mb-6">Tu siguiente revisión de base de datos está programada para el <span className="font-bold text-violet-400">25 de Julio</span>.</p>
                    </div>
                    <Button href="#" variant="primary">Agendar Revisión</Button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;