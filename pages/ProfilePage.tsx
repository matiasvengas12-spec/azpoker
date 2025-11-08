import React, { useState } from 'react';
import Button from '../components/Button';
import { Upload, Trophy, Target, TrendingUp, Calendar, Star, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface HudUploadProps {
  onUpload: (file: File) => void;
}

const HudUpload: React.FC<HudUploadProps> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.xml') || file.name.endsWith('.txt')) {
        setFileName(file.name);
        onUpload(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.xml') || file.name.endsWith('.txt')) {
        setFileName(file.name);
        onUpload(file);
      }
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
        dragActive ? 'border-violet-500 bg-violet-500/10' : 'border-slate-600'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="hud-upload"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept=".xml,.txt"
        onChange={handleChange}
      />
      <Upload className={`w-12 h-12 mx-auto mb-3 ${dragActive ? 'text-violet-400' : 'text-slate-400'}`} />
      <p className="text-lg font-medium text-white mb-1">
        {fileName ? 'HUD Subido' : 'Arrastra tu HUD aquí'}
      </p>
      <p className="text-sm text-slate-400 mb-3">
        {fileName ? fileName : 'o haz clic para seleccionar (.xml o .txt)'}
      </p>
      {fileName && (
        <div className="flex items-center justify-center gap-1 text-green-400 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Listo para analizar</span>
        </div>
      )}
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const [hudFile, setHudFile] = useState<File | null>(null);

  const handleHudUpload = (file: File) => {
    setHudFile(file);
    // Aquí iría la lógica para enviar al backend
    console.log('HUD subido:', file.name);
  };

  const stats = {
    level: 7,
    xp: 2850,
    xpToNext: 500,
    winrate: 58,
    handsPlayed: 12450,
    lastReview: '2025-07-25',
    nextReview: '2025-08-25',
    coach: 'Zeta',
    streak: 12
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      {/* HEADER */}
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
          Tu Perfil de Jugador
        </h1>
        <p className="text-xl text-slate-300">Domina el juego. Domina tu progreso.</p>
      </header>

      {/* HERO STATS */}
      <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 mb-10 border border-violet-500/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <span className="text-3xl font-bold text-white">Nivel {stats.level}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-violet-500 to-purple-500 h-3 rounded-full transition-all"
                style={{ width: `${(stats.xp / (stats.xp + stats.xpToNext)) * 100}%` }}
              />
            </div>
            <p className="text-sm text-slate-300 mt-1">{stats.xp} / {stats.xp + stats.xpToNext} XP</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-white">{stats.winrate}%</span>
            </div>
            <p className="text-sm text-slate-300">Winrate en revisión</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-8 h-8 text-orange-400" />
              <span className="text-3xl font-bold text-white">{stats.handsPlayed.toLocaleString()}</span>
            </div>
            <p className="text-sm text-slate-300">Manos analizadas</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COACH */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
            Tu Coach
          </h3>
          <div className="flex flex-col items-center">
            <img 
              src="https://azpoker.netlify.app/assets/zeta-profile-Bq7XFfMh.jpeg" 
              alt="Zeta" 
              className="w-28 h-28 rounded-full mb-3 border-4 border-violet-500 object-cover"
            />
            <h4 className="text-lg font-semibold text-white">Zeta</h4>
            <p className="text-sm text-slate-400">Fundador & Head Coach</p>
            <div className="mt-3 flex items-center gap-1 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Streak: {stats.streak} días</span>
            </div>
          </div>
        </div>

        {/* HUD UPLOAD */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Upload className="w-6 h-6 text-violet-400" />
            Subir HUD
          </h3>
          <p className="text-sm text-slate-300 mb-4">
            Sube tu HUD actual (.xml o .txt) para análisis automático de leaks.
          </p>
          <HudUpload onUpload={handleHudUpload} />
          {hudFile && (
            <p className="mt-3 text-xs text-green-400 flex items-center gap-1 justify-center">
              <CheckCircle className="w-4 h-4" />
              Análisis en curso...
            </p>
          )}
        </div>

        {/* PRÓXIMA REVISIÓN */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-400" />
            Próxima Revisión
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-400">Última revisión</p>
              <p className="text-lg font-medium text-white">{new Date(stats.lastReview).toLocaleDateString('es-ES')}</p>
            </div>
            <div className="pt-3 border-t border-slate-700">
              <p className="text-sm text-slate-400">Siguiente revisión</p>
              <p className="text-lg font-medium text-violet-400 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {new Date(stats.nextReview).toLocaleDateString('es-ES')}
              </p>
            </div>
            <Button href="#" variant="primary" className="w-full mt-4">
              Agendar 1on1 con Zeta
            </Button>
          </div>
        </div>
      </div>

      {/* ACCIONES RÁPIDAS */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-sm p-6 rounded-xl border border-emerald-500/30">
          <h3 className="text-xl font-bold text-white mb-3">Reto Semanal</h3>
          <p className="text-slate-300 mb-4">
            Juega 5,000 manos en NL25+ esta semana y desbloquea acceso al <span className="text-emerald-400 font-bold">Grupo Élite</span>.
          </p>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full" style={{ width: '68%' }} />
          </div>
          <p className="text-sm text-slate-400 mt-2">3,400 / 5,000 manos</p>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm p-6 rounded-xl border border-orange-500/30">
          <h3 className="text-xl font-bold text-white mb-3">Leak Detectado</h3>
          <p className="text-slate-300 mb-4">
            Tu <span className="text-orange-400 font-bold">3bet vs BTN</span> está por debajo del rango óptimo.
          </p>
          <Button href="#" variant="secondary" className="w-full">
            Ver Análisis Detallado
          </Button>
        </div>
      </div>

      {/* FOOTER MOTIVACIONAL */}
      <div className="mt-12 text-center">
        <p className="text-lg text-slate-400 italic">
          "El 1% diario te lleva al top 1% del mundo."
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
