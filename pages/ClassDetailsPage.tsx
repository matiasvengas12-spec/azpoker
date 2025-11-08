import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { courseContent, ClassData, KeyLine, PokerHand, Filter, PreflopTable } from '../constants';
import { Play, Download, ExternalLink, Clock, ThumbsUp, MessageSquare, Share2, MoreVertical, ChevronDown, Star, Filter as FilterIcon, ArrowLeft } from 'lucide-react';

const getSpotName = (key: string): string =>
  key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const VIDEO_POSTER_URL = 'https://azpoker.netlify.app/logo.png';

const ClassDetailsPage: React.FC = () => {
  const { spotKey, classId } = useParams<{ spotKey: string; classId: string }>();
  const [expandedSpots, setExpandedSpots] = useState<Record<string, boolean>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [liked, setLiked] = useState(false);

  const spotKeys = useMemo(() => Object.keys(courseContent), []);

  const selectedClass: ClassData | null = useMemo(() => {
    if (!spotKey || !classId || !courseContent[spotKey]) return null;
    return courseContent[spotKey].find(cls => cls.id === classId) || null;
  }, [spotKey, classId]);

  useEffect(() => {
    if (spotKey) {
      setExpandedSpots(prev => ({ ...prev, [spotKey]: true }));
    }
  }, [spotKey]);

  const toggleSpot = (key: string) => {
    setExpandedSpots(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const relatedVideos = useMemo(() => {
    if (!spotKey || !selectedClass) return [];
    return courseContent[spotKey]
      .filter(cls => cls.id !== classId)
      .slice(0, 8);
  }, [spotKey, classId, selectedClass]);

  if (!spotKey || !classId || !selectedClass) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ----------------------- BARRA SUPERIOR FIJA ----------------------- */}
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
          {/* ----------------------- VIDEO + INFO ----------------------- */}
          <div className="xl:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-900 shadow-2xl">
              <video
                src={selectedClass.videoUrl}
                poster={VIDEO_POSTER_URL}
                controls
                className="w-full h-full"
                title={selectedClass.title}
              />
            </div>

            {/* Title + Actions */}
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

              {/* Actions */}
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

            {/* Description */}
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div
                className={`transition-all duration-300 ${showDescription ? '' : 'line-clamp-3'}`}
                dangerouslySetInnerHTML={{ __html: selectedClass.keyLines.map(k => `<strong>${k.title}:</strong> ${k.content}`).join('<br/><br/>') || 'Sin descripción.' }}
              />
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="mt-2 text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1"
              >
                {showDescription ? 'Mostrar menos' : 'Mostrar más'}
                <ChevronDown className={`w-4 h-4 transition-transform ${showDescription ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Key Lines */}
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

            {/* Hands */}
            {selectedClass.hands.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-white mb-4">Manos de Ejemplo</h3>
                <div class10 className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Extra Material */}
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
          </div>

          {/* ----------------------- SIDEBAR FIJO ----------------------- */}
          <div className="xl:col-span-1">
            {/* Mobile Menu */}
            <div className="xl:hidden mb-4">
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

            {/* Desktop Sidebar (FIJO) */}
            <div className="hidden xl:block sticky top-20 space-y-6">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-bold text-white mb-3">Temario</h3>
                {syllabusNavigation(spotKeys, expandedSpots, toggleSpot, selectedClass, spotKey)}
              </div>

              {/* Videos Relacionados */}
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
