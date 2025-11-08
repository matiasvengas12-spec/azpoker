import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseContent, ClassData } from '../constants';

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
      if (cls.uploadDate) {
        all.push({ spotKey, classData: cls });
      }
    });
  });

  return all
    .sort(
      (a, b) =>
        new Date(b.classData.uploadDate!).getTime() -
        new Date(a.classData.uploadDate!).getTime()
    )
    .slice(0, 3);
};

/* -------------------------------------------------------------------------- */
/*  DashboardPage                                                             */
/* -------------------------------------------------------------------------- */
const DashboardPage: React.FC = () => {
  const spotKeys = useMemo(() => Object.keys(courseContent), []);
  const latestVideos = useMemo(() => getLatestVideos(), []);

  /* ----------------------------- Filtros ----------------------------- */
  const [selectedSpot, setSelectedSpot] = useState<string>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('all');

  const dateRanges = [
    { value: 'all', label: 'Cualquier fecha' },
    { value: '7d', label: 'Últimos 7 días' },
    { value: '1m', label: 'Último mes' },
    { value: '3m', label: 'Últimos 3 meses' },
    { value: '1y', label: 'Último año' },
  ];

  /* ----------------------- Filtrado de videos ------------------------ */
  const filteredVideos = useMemo(() => {
    let videos: Array<{ spotKey: string; classData: ClassData }> = [];

    Object.entries(courseContent).forEach(([spotKey, classes]) => {
      if (selectedSpot !== 'all' && spotKey !== selectedSpot) return;

      classes.forEach(cls => {
        if (!cls.uploadDate) return;

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

        if (include) {
          videos.push({ spotKey, classData: cls });
        }
      });
    });

    return videos.sort(
      (a, b) =>
        new Date(b.classData.uploadDate!).getTime() -
        new Date(a.classData.uploadDate!).getTime()
    );
  }, [selectedSpot, selectedDateRange]);

  /* ----------------------- ¿Hay resultados? ------------------------- */
  const hasResults = filteredVideos.length > 0;

  return (
    <div className="container mx-auto px-6 pt-12">
      {/* ------------------------------------------------------------------ */}
      {/*  Header                                                            */}
      {/* ------------------------------------------------------------------ */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Biblioteca de Clases
        </h1>
        <p className="text-slate-300 mt-4">
          Explora todas las clases organizadas por spot.
        </p>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/*  Filtros (Dropdowns)                                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="mb-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
        {/* Filtro por Spot */}
        <div className="w-full sm:w-auto">
          <label htmlFor="spot-filter" className="sr-only">
            Filtrar por spot
          </label>
          <select
            id="spot-filter"
            value={selectedSpot}
            onChange={e => setSelectedSpot(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          >
            <option value="all">Todos los spots</option>
            {spotKeys.map(key => (
              <option key={key} value={key}>
                {getSpotName(key)}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Fecha */}
        <div className="w-full sm:w-auto">
          <label htmlFor="date-filter" className="sr-only">
            Filtrar por fecha
          </label>
          <select
            id="date-filter"
            value={selectedDateRange}
            onChange={e => setSelectedDateRange(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*  Últimos 3 videos (si no hay filtro activo)                        */}
      {/* ------------------------------------------------------------------ */}
      {selectedSpot === 'all' && selectedDateRange === 'all' && latestVideos.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-violet-400 mb-6 flex items-center gap-2">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11h-1V7h1v6zm-1-8a1 1 0 110 2 1 1 0 010-2z" />
            </svg>
            Últimos Videos Subidos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {latestVideos.map(({ spotKey, classData }) => (
              <VideoCard
                key={classData.id}
                classItem={classData}
                spotKey={spotKey}
              />
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/*  Resultados filtrados o todos los spots                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-16">
        {hasResults ? (
          <>
            {/* Si hay filtro activo, mostramos todos los videos filtrados */}
            {(selectedSpot !== 'all' || selectedDateRange !== 'all') && (
              <section>
                <h2 className="text-xl font-semibold text-slate-300 mb-6">
                  {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} encontrado{filteredVideos.length !== 1 ? 's' : ''}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredVideos.map(({ spotKey, classData }) => (
                    <VideoCard
                      key={classData.id}
                      classItem={classData}
                      spotKey={spotKey}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Si no hay filtro, mostramos por spot */}
            {selectedSpot === 'all' && selectedDateRange === 'all' && (
              <>
                {spotKeys.map(spotKey => {
                  const classes = courseContent[spotKey];

                  return (
                    <section key={spotKey}>
                      <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-2">
                        {getSpotName(spotKey)}
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {classes.map(classItem => (
                          <VideoCard
                            key={classItem.id}
                            classItem={classItem}
                            spotKey={spotKey}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-lg">
              No se encontraron videos con los filtros seleccionados.
            </p>
            <button
              onClick={() => {
                setSelectedSpot('all');
                setSelectedDateRange('all');
              }}
              className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  VideoCard                                                                 */
/* -------------------------------------------------------------------------- */
interface VideoCardProps {
  classItem: ClassData;
  spotKey: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ classItem, spotKey }) => {
  const thumbnailUrl = classItem.thumbnailUrl ?? null;

  return (
    <Link
      to={`/class/${spotKey}/${classItem.id}`}
      className="group block bg-slate-800 rounded-lg overflow-hidden shadow-sm border border-slate-700 hover:border-violet-500 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20"
    >
      <div className="aspect-video bg-slate-900 relative overflow-hidden">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={classItem.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <video
              src={classItem.videoUrl}
              className="w-full h-full object-cover"
              muted
              loop
              onMouseEnter={e => e.currentTarget.play()}
              onMouseLeave={e => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white line-clamp-2 group-hover:text-violet-400 transition-colors">
          {classItem.title}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {spotKey.split('-').join(' ').toUpperCase()}
        </p>
        {classItem.uploadDate && (
          <p className="text-xs text-slate-500 mt-1">
            Subido: {classItem.uploadDate}
          </p>
        )}
      </div>
    </Link>
  );
};

export default DashboardPage;
