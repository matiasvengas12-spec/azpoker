import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { courseContent, ClassData, KeyLine, PokerHand, Filter, PreflopTable } from '../constants';
import { Play, Pause, Volume2, VolumeX, Maximize, Clock, ThumbsUp, MessageSquare, Share2, MoreVertical, ChevronDown, Star, Filter as FilterIcon, ArrowLeft, SkipBack, SkipForward, Zap, Download, ExternalLink, Calendar } from 'lucide-react';

const getSpotName = (key: string): string =>
  key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const VIDEO_POSTER_URL = 'https://azpoker.netlify.app/logo.png';

// =============================================
// REPRODUCTOR PERSONALIZADO (CON VELOCIDAD)
// =============================================
const CustomVideoPlayer: React.FC<{ src: string; poster?: string }> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // NUEVO: volumen 0-1
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // VOLUMEN
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));
    video.addEventListener('volumechange', () => {
      setVolume(video.volume);
      setIsMuted(video.muted || video.volume === 0);
    });

    const handleFullscreen = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreen);

    const hideNativeControls = setInterval(() => {
      if (video) {
        video.controls = false;
        video.removeAttribute('controls');
      }
    }, 100);

    return () => {
      clearInterval(hideNativeControls);
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      document.removeEventListener('fullscreenchange', handleFullscreen);
    };
  }, [duration]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const resetControlsTimeout = () => {
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    setShowControls(true);
    controlsTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const speeds = [0.5, 1, 1.5, 2];
  const getSpeedLabel = (rate: number) => rate === 1 ? 'Normal' : `${rate}x`;

  return (
    <div
      ref={containerRef}
      className="relative aspect-video rounded-xl overflow-hidden bg-black group"
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* VIDEO – CLIC = PLAY/PAUSE, DOBLE CLIC = FULLSCREEN */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        controls={false}
        controlsList="nodownload noremoteplayback noplaybackrate"
        disablePictureInPicture
        playsInline
        webkit-playsinline="true"
        x-webkit-airplay="deny"
        onContextMenu={(e) => e.preventDefault()}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.controls = false;
            videoRef.current.removeAttribute('controls');
            videoRef.current.volume = volume;
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        onDoubleClick={(e) => {
          e.stopPropagation();
          toggleFullscreen();
        }}
        style={{ pointerEvents: 'auto', userSelect: 'none' } as React.CSSProperties}
      />

      {/* Botón Play Grande */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-32 h-32 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 pointer-events-auto"
            aria-label="Reproducir"
          >
            <Play className="w-16 h-16 text-black ml-2" fill="currentColor" />
          </button>
        </div>
      )}

      {/* CONTROLES PERSONALIZADOS */}
      <div
        className={`absolute ${
          isFullscreen ? 'inset-0 flex flex-col justify-end p-8' : 'inset-x-0 bottom-0 p-4'
        } bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 z-20 pointer-events-none`}
        style={{ opacity: showControls || !isPlaying ? 1 : 0 }}
      >
        <div className="pointer-events-auto">
          {/* Barra de progreso */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              e.stopPropagation();
              handleSeek(e);
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer slider mb-3"
            style={{
              background: `linear-gradient(to right, #8b5cf6 ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%)`,
            }}
          />

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              {/* -10s */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  skip(-10);
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                title="Retroceder 10s"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              {/* Play/Pause */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="p-2 hover:bg-white/20 rounded-full transition"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>

              {/* +10s */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  skip(10);
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                title="Avanzar 10s"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              {/* VOLUMEN CON SLIDER */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="p-2 hover:bg-white/20 rounded-full transition"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleVolumeChange(e);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-24 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer volume-slider"
                  style={{
                    background: `linear-gradient(to right, #8b5cf6 ${((isMuted ? 0 : volume) * 100).toFixed(2)}%, #374151 ${((isMuted ? 0 : volume) * 100).toFixed(2)}%)`,
                  }}
                />
              </div>

              <span className="text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* VELOCIDAD */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = speeds.indexOf(playbackRate);
                  const nextIndex = (currentIndex + 1) % speeds.length;
                  setPlaybackRate(speeds[nextIndex]);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  playbackRate === 1
                    ? 'bg-violet-600 text-white shadow-lg'
                    : 'bg-white/10 hover:bg-white/20 text-gray-300'
                }`}
              >
                <Zap className={`w-4 h-4 ${playbackRate === 1 ? 'fill-white' : ''}`} />
                {getSpeedLabel(playbackRate)}
              </button>

              {/* Fullscreen */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                className="p-2 hover:bg-white/20 rounded-full transition"
              >
                <Maximize className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS SLIDERS */}
      <style jsx>{`
        .slider::-webkit-slider-thumb,
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          background: #8b5cf6;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 6px rgba(139, 92, 246, 0.6);
        }
        .slider::-moz-range-thumb,
        .volume-slider::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: #8b5cf6;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>

      {/* CSS GLOBAL – SIN CONTROLES NATIVOS */}
      <style jsx global>{`
        video { -webkit-appearance: none !important; appearance: none !important; }
        video::-webkit-media-controls,
        video::-webkit-media-controls-panel { display: none !important; opacity: 0 !important; visibility: hidden !important; width: 0 !important; height: 0 !important; overflow: hidden !important; pointer-events: none !important; z-index: -9999 !important; }
        video:fullscreen, video:-webkit-full-screen, video:-moz-full-screen { background: black !important; }
        video:fullscreen *, video:-webkit-full-screen * { display: none !important; }
        video::-moz-media-controls-container { display: none !important; }
        @media (hover: none) and (pointer: coarse) {
          video { -webkit-touch-callout: none !important; -webkit-user-select: none !important; user-select: none !important; -webkit-tap-highlight-color: transparent !important; }
        }
      `}</style>
    </div>
  );
};

const ClassDetailsPage: React.FC = () => {
  const { spotKey, classId } = useParams<{ spotKey: string; classId: string }>();
  const [expandedSpots, setExpandedSpots] = useState<Record<string, boolean>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const spotKeys = useMemo(() => Object.keys(courseContent), []);
  const selectedClass = useMemo(() => {
    if (!spotKey || !courseContent[spotKey]) return null;
    return courseContent[spotKey].find(cls => cls.id === classId) || null;
  }, [spotKey, classId]);

  const toggleSpot = useCallback((key: string) => {
    setExpandedSpots(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  // Expandir spot actual en mobile y desktop
  useEffect(() => {
    if (spotKey) {
      setExpandedSpots(prev => ({ ...prev, [spotKey]: true }));
    }
  }, [spotKey]);

  const relatedVideos = useMemo(() => {
    if (!spotKey || !selectedClass) return [];
    return courseContent[spotKey]
      .filter(cls => cls.id !== classId)
      .slice(0, 8);
  }, [spotKey, classId, selectedClass]);

  // NUEVO: Videos aleatorios de todo el contenido (excluyendo el actual)
  const allVideos = useMemo(() => {
    return Object.entries(courseContent).flatMap(([sKey, classes]) =>
      classes.map(classData => ({ spotKey: sKey, classData }))
    );
  }, []);

  const randomVideos = useMemo(() => {
    const filtered = allVideos.filter(v => v.classData.id !== classId);
    // Barajar el array
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
    return filtered.slice(0, 9);
  }, [allVideos, classId]);

  if (!spotKey || !classId || !selectedClass) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* BARRA SUPERIOR FIJA */}
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver al Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Categoría:</span>
            <span className="font-semibold text-white">{getSpotName(spotKey)}</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* VIDEO + INFO */}
          <div className="xl:col-span-2 space-y-6">
            <CustomVideoPlayer src={selectedClass.videoUrl} poster={VIDEO_POSTER_URL} />

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {selectedClass.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedClass.uploadDate || 'Sin fecha'}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    liked ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  Me gusta
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition-all">
                  <MessageSquare className="w-5 h-5" />
                  Comentar
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition-all">
                  <Share2 className="w-5 h-5" />
                  Compartir
                </button>
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div
                className={`transition-all duration-300 ${showDescription ? '' : 'line-clamp-3'}`}
                dangerouslySetInnerHTML={{
                  __html: selectedClass.keyLines.map(k => `<strong>${k.title}:</strong> ${k.content}`).join('<br/><br/>') || 'Sin descripción.'
                }}
              />
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="mt-2 text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1"
              >
                {showDescription ? 'Mostrar menos' : 'Mostrar más'}
                <ChevronDown className={`w-4 h-4 transition-transform ${showDescription ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {selectedClass.keyLines.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  Líneas Clave
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedClass.keyLines.map((line, i) => (
                    <div key={i} className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-violet-600 transition-all">
                      <h4 className="font-semibold text-violet-400">{line.title}</h4>
                      <p className="text-gray-300 mt-1 text-sm">{line.content}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {selectedClass.hands.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-white mb-4">Manos de Ejemplo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedClass.hands.map((hand, i) => (
                    <div key={i} className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-violet-600 transition-all flex gap-3">
                      <div className="bg-gradient-to-br from-violet-600 to-purple-700 w-16 h-12 rounded flex items-center justify-center font-mono text-xl font-bold text-white">
                        {hand.hand}
                      </div>
                      <p className="text-gray-300 text-sm">{hand.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(selectedClass.filters?.length ?? 0) > 0 || (selectedClass.tables?.length ?? 0) > 0 ? (
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FilterIcon className="w-6 h-6 text-violet-400" />
                  Material Extra
                </h3>
                <div className="space-y-6">
                  {selectedClass.filters && selectedClass.filters.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-200 mb-3">Filtros</h4>
                      <div className="space-y-2">
                        {selectedClass.filters.map((f, i) => (
                          <div key={i} className="flex items-center justify-between bg-gray-900 p-3 rounded-lg border border-gray-800">
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-1 text-xs rounded-full border ${
                                f.tracker === 'Poker Tracker' ? 'border-red-700 text-red-400' :
                                f.tracker === 'Holdem Manager' ? 'border-blue-700 text-blue-400' :
                                'border-green-700 text-green-400'
                              }`}>
                                {f.tracker}
                              </span>
                              <span className="text-sm text-gray-300">{f.name}</span>
                            </div>
                            <a
                              href={f.downloadLink}
                              download
                              className="flex items-center gap-1 text-violet-400 hover:text-violet-300 text-sm"
                            >
                              <Download className="w-4 h-4" />
                              Descargar
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedClass.tables && selectedClass.tables.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-200 mb-3">Tablas Preflop</h4>
                      <div className="space-y-2">
                        {selectedClass.tables.map((t, i) => (
                          <div key={i} className="flex items-center justify-between bg-gray-900 p-3 rounded-lg border border-gray-800">
                            <span className="text-sm text-gray-300">{t.name}</span>
                            <a
                              href={t.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-violet-400 hover:text-violet-300 text-sm"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Abrir
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ) : null}

            {/* MOBILE TEMARIO - MOVED HERE FOR MOBILE PRIORITY */}
            <div className="xl:hidden mb-6">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-800"
              >
                <span className="font-semibold">Temario</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileMenuOpen && (
                <div className="mt-2 p-4 bg-gray-900 rounded-lg border border-gray-800">
                  {syllabusNavigation(spotKeys, expandedSpots, toggleSpot, selectedClass, spotKey)}
                </div>
              )}
            </div>

            {/* NUEVA SECCIÓN: Videos disponibles aleatorios */}
            {randomVideos.length > 0 && (
              <section className="mt-12">
                <h3 className="text-xl font-bold text-white mb-4">Ver más videos disponibles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {randomVideos.map(({ spotKey, classData }) => (
                    <Link
                      key={classData.id}
                      to={`/class/${spotKey}/${classData.id}`}
                      className="flex gap-3 group hover:bg-gray-800 p-3 rounded-lg transition-all bg-gray-900 border border-gray-800"
                    >
                      <div className="w-20 h-12 bg-gray-800 rounded overflow-hidden flex-shrink-0 relative">
                        {classData.thumbnailUrl ? (
                          <img
                            src={classData.thumbnailUrl}
                            alt={classData.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600">
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-violet-400">
                          {classData.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">{getSpotName(spotKey)}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {classData.uploadDate}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* SIDEBAR FIJO - NOW ONLY DESKTOP */}
          <div className="xl:col-span-1">
            <div className="hidden xl:block sticky top-20 space-y-6">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-bold text-white mb-3">Temario</h3>
                {syllabusNavigation(spotKeys, expandedSpots, toggleSpot, selectedClass, spotKey)}
              </div>

              {relatedVideos.length > 0 && (
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <h3 className="text-lg font-bold text-white mb-3">Videos Relacionados</h3>
                  <div className="space-y-3">
                    {relatedVideos.map(classItem => (
                      <Link
                        key={classItem.id}
                        to={`/class/${spotKey}/${classItem.id}`}
                        className="flex gap-3 group hover:bg-gray-800 p-2 rounded-lg transition-all"
                      >
                        <div className="w-32 h-20 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                          {classItem.thumbnailUrl ? (
                            <img src={classItem.thumbnailUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Play className="w-8 h-8 text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-violet-400">
                            {classItem.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">{classItem.uploadDate}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Temario reutilizable
const syllabusNavigation = (
  spotKeys: string[],
  expandedSpots: Record<string, boolean>,
  toggleSpot: (key: string) => void,
  selectedClass: ClassData | null,
  currentSpotKey: string
) => (
  <nav className="space-y-1">
    {spotKeys.map(key => (
      <div key={key}>
        <button
          onClick={() => toggleSpot(key)}
          className="w-full text-left flex justify-between items-center px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
        >
          <span>{getSpotName(key)}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSpots[key] ? 'rotate-180' : ''}`} />
        </button>
        {expandedSpots[key] && (
          <div className="pl-4 mt-1 space-y-1 border-l border-gray-700">
            {courseContent[key].map(classItem => (
              <Link
                key={classItem.id}
                to={`/class/${key}/${classItem.id}`}
                className={`block px-3 py-1.5 rounded text-xs transition-colors ${
                  selectedClass?.id === classItem.id
                    ? 'text-violet-400 font-semibold bg-violet-900/30'
                    : 'text-gray-400 hover:text-violet-400'
                }`}
              >
                {classItem.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    ))}
  </nav>
);

export default ClassDetailsPage;
