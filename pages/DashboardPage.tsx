import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseContent, ClassData } from '../constants';
import { Search, Clock, TrendingUp, X, Star, Play, Calendar, Filter } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */
const getSpotName = (key: string): string =>
  key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const getLatestVideos = (): Array<{ spotKey: string; classData: ClassData }> => {
  const all: Array<{ spotKey: string; classData: ClassData }> = [];

  Object.entries(courseContent).forEach(([spotKey, classes]) => {
    classes.forEach(cls => {
      if (cls.uploadDate) all.push({ spotKey, classData: cls });
    });
  });

  return all
    .sort((a, b) => new Date(b.classData.uploadDate!).getTime() - new Date(a.classData.uploadDate!).getTime())
    .slice(0, 4);
};

/* -------------------------------------------------------------------------- */
/*  DashboardPage – YouTube Poker (sin logo)                                  */
/* -------------------------------------------------------------------------- */
const DashboardPage: React.FC = () => {
  const spotKeys = useMemo(() => Object.keys(courseContent), []);
  const latestVideos = useMemo(() => getLatestVideos(), []);

  const [selectedDateRange, setSelectedDateRange] = useState<string>('all');
  const [selectedSpots, setSelectedSpots] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showSearch, setShowSearch] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const dateRanges = [
    { value: 'all', label: 'Cualquier fecha' },
    { value: '7d', label: 'Últimos 7 días' },
    { value: '1m', label: 'Último mes' },
    { value: '3m', label: 'Últimos 3 meses' },
    { value: '1y', label: 'Último año' },
  ];

  const toggleSpot = (spotKey: string) => {
    setSelectedSpots(prev => {
      const next = new Set(prev);
      if (next.has(spotKey)) next.delete(spotKey);
      else next.add(spotKey);
      return next;
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredVideos = useMemo(() => {
    let videos: Array<{ spotKey: string; classData: ClassData }> = [];

    Object.entries(courseContent).forEach(([spotKey, classes]) => {
      if (selectedSpots.size > 0 && !selectedSpots.has(spotKey)) return;

      classes.forEach(cls => {
        if (!cls.uploadDate) return;
        if (searchQuery && !cls.title.toLowerCase().includes(searchQuery.toLowerCase())) return;

        const uploadDate = new Date(cls.uploadDate);
        const now = new Date();
        let include = true;

        if (selectedDateRange !== 'all') {
          const diffTime = now.getTime() - uploadDate.getTime();
          const diffDays = diffTime / (1000 * 60 * 60 * 24);
          if (selectedDateRange === '7d' && diffDays > 7) include = false;
          if (selectedDateRange === '1m' && diffDays > 30) include = false;
          if (selectedDateRange === '3m' && diffDays > 90) include = false;
          if (selectedDateRange === '1y' && diffDays > 365) include = false;
        }

        if (include) videos.push({ spotKey, classData: cls });
      });
    });

    return videos.sort((a, b) => new Date(b.classData.uploadDate!).getTime() - new Date(a.classData.uploadDate!).getTime());
  }, [selectedDateRange, selectedSpots, searchQuery]);

  const hasActiveFilters = selectedDateRange !== 'all' || selectedSpots.size > 0 || searchQuery !== '';
  const resetFilters = () => {
    setSelectedDateRange('all');
    setSelectedSpots(new Set());
    setSearchQuery('');
    setShowSearch(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ------------------------------------------------------------------ */}
      {/*  Header – Solo buscador (logo está en header externo)              */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
        <div className="container mx-auto px-4 py-3 flex items-center justify-center md:justify-between">
          {/* Espacio vacío donde iría el logo (tu header externo lo maneja) */}
          <div className="hidden md:block w-10 h-10" />

          {/* Buscador */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar clases, spots, manos..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-10 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/*  Pestañas – YouTube Tabs                                           */}
      {/* ------------------------------------------------------------------ */}
      <div className="sticky top-14 z-40 bg-black border-b border-gray-800 overflow-x-auto scrollbar-hide">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
                activeTab === 'home'
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Inicio
            </button>
            {spotKeys.map(spotKey => (
              <button
                key={spotKey}
                onClick={() => setActiveTab(spotKey)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === spotKey
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {getSpotName(spotKey)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*  Filtros (Fecha) – Solo si hay búsqueda o filtros                  */}
      {/* ------------------------------------------------------------------ */}
      {hasActiveFilters && (
        <div className="container mx-auto px-4 py-4 flex items-center gap-4 flex-wrap justify-center md:justify-start">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedDateRange}
              onChange={e => setSelectedDateRange(e.target.value)}
              className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm text-white focus:outline-none focus:border-violet-500"
            >
              {dateRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={resetFilters}
            className="text-sm text-violet-400 hover:text-violet-300 underline"
          >
            Limpiar todo
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/*  Contenido Principal                                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="container mx-auto px-4 py-8">
        {/* ----------------------- HOME (Últimos + Categorías) ----------------------- */}
        {activeTab === 'home' && !hasActiveFilters && (
          <>
            {/* Últimos Videos */}
            {latestVideos.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-violet-400" />
                  Últimos Videos Subidos
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {latestVideos.map(({ spotKey, classData }) => (
                    <VideoCard
                      key={classData.id}
                      classItem={classData}
                      spotKey={spotKey}
                      isFavorite={favorites.has(classData.id)}
                      onToggleFavorite={() => toggleFavorite(classData.id)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Categorías */}
            {spotKeys.map(spotKey => {
              const classes = courseContent[spotKey];
              if (classes.length === 0) return null;

              return (
                <section key={spotKey} className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">{getSpotName(spotKey)}</h2>
                    {classes.length > 8 && (
                      <Link
                        to={`/class/${spotKey}`}
                        className="text-sm text-violet-400 hover:text-violet-300 font-medium"
                      >
                        Ver todos ({classes.length})
                      </Link>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {classes.slice(0, 8).map(classItem => (
                      <VideoCard
                        key={classItem.id}
                        classItem={classItem}
                        spotKey={spotKey}
                        isFavorite={favorites.has(classItem.id)}
                        onToggleFavorite={() => toggleFavorite(classItem.id)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </>
        )}

        {/* ----------------------- PESTAÑA DE SPOT ----------------------- */}
        {activeTab !== 'home' && !hasActiveFilters && (
          <section>
            <h2 className="text-3xl font-bold mb-8">{getSpotName(activeTab)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courseContent[activeTab].map(classItem => (
                <VideoCard
                  key={classItem.id}
                  classItem={classItem}
                  spotKey={activeTab}
                  isFavorite={favorites.has(classItem.id)}
                  onToggleFavorite={() => toggleFavorite(classItem.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ----------------------- CON FILTROS ----------------------- */}
        {hasActiveFilters && (
          <section>
            <h2 className="text-xl font-semibold text-gray-300 mb-6">
              {filteredVideos.length} resultado{filteredVideos.length !== 1 ? 's' : ''}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map(({ spotKey, classData }) => (
                <VideoCard
                  key={classData.id}
                  classItem={classData}
                  spotKey={spotKey}
                  isFavorite={favorites.has(classData.id)}
                  onToggleFavorite={() => toggleFavorite(classData.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  VideoCard – YouTube Style                                                 */
/* -------------------------------------------------------------------------- */
interface VideoCardProps {
  classItem: ClassData;
  spotKey: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ classItem, spotKey, isFavorite, onToggleFavorite }) => {
  const thumbnailUrl = classItem.thumbnailUrl ?? null;
  const videoRef = useRef<HTMLVideoElement>(null);

  // Formatear duración si existe
  const formatDuration = (duration: string | undefined): string => {
    if (!duration) return '';
    // Asumiendo formato MM:SS o HH:MM:SS
    return duration;
  };

  return (
    <div className="group">
      <Link to={`/class/${spotKey}/${classItem.id}`} className="block">
        <div className="relative aspect-video mb-3 overflow-hidden rounded-xl bg-gray-900">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={classItem.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <video
              ref={videoRef}
              src={classItem.videoUrl}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              onMouseEnter={e => e.currentTarget.play()}
              onMouseLeave={e => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {classItem.uploadDate}
          </div>
          {/* NUEVA: Duración en la esquina inferior izquierda */}
          {classItem.duration && (
            <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(classItem.duration)}
            </div>
          )}
        </div>
      </Link>

      <div className="flex gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
          <Play className="w-5 h-5 text-white ml-0.5" />
        </div>
        <div className="flex-1">
          <Link to={`/class/${spotKey}/${classItem.id}`}>
            <h3 className="font-medium text-white line-clamp-2 group-hover:text-violet-400 transition-colors">
              {classItem.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-400 mt-1">
            {getSpotName(spotKey)}
          </p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-500">
              {classItem.uploadDate}
            </p>
            <button
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite();
              }}
              className="text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
