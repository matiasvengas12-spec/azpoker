import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { courseContent, ClassData } from '../constants';

/* -------------------------------------------------------------------------- */
/*  Helper: convierte la clave del spot en texto legible                       */
/* -------------------------------------------------------------------------- */
const getSpotName = (key: string): string =>
  key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

/* -------------------------------------------------------------------------- */
/*  Obtiene los últimos 3 videos (ordenados por uploadDate)                  */
/* -------------------------------------------------------------------------- */
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
/*  Componente DashboardPage                                                  */
/* -------------------------------------------------------------------------- */
const DashboardPage: React.FC = () => {
  const spotKeys = useMemo(() => Object.keys(courseContent), []);
  const latestVideos = useMemo(() => getLatestVideos(), []);

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
      {/*  Contenido principal                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-16">
        {/* ---------------------------------------------------------------- */}
        {/*  Últimos 3 videos subidos                                          */}
        {/* ---------------------------------------------------------------- */}
        {latestVideos.length > 0 && (
          <section>
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

        {/* ---------------------------------------------------------------- */}
        {/*  Spots normales                                                    */}
        {/* ---------------------------------------------------------------- */}
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
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  VideoCard – tarjeta que se muestra en la grilla                           */
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
      {/* -------------------------------------------------------------- */}
      {/*  Miniatura / video preview                                      */}
      {/* -------------------------------------------------------------- */}
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

      {/* -------------------------------------------------------------- */}
      {/*  Información de la clase                                        */}
      {/* -------------------------------------------------------------- */}
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
