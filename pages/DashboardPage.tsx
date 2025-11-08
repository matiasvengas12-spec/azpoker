import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { courseContent } from '../constants';

const getSpotName = (key: string): string =>
  key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const DashboardPage: React.FC = () => {
  const spotKeys = useMemo(() => Object.keys(courseContent), []);

  return (
    <div className="container mx-auto px-6 pt-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white">Biblioteca de Clases</h1>
        <p className="text-slate-300 mt-4">Explora todas las clases organizadas por spot.</p>
      </header>

      <div className="space-y-16">
        {spotKeys.map(spotKey => (
          <section key={spotKey}>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-2">
              {getSpotName(spotKey)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {courseContent[spotKey].map(classItem => (
                <VideoCard key={classItem.id} classItem={classItem} spotKey={spotKey} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

// Componente VideoCard
const VideoCard: React.FC<{ classItem: any; spotKey: string }> = ({ classItem, spotKey }) => {
  const thumbnailUrl = classItem.thumbnailUrl || null;

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
          <p className="text-xs text-slate-500 mt-1">Subido: {classItem.uploadDate}</p>
        )}
      </div>
    </Link>
  );
};

export default DashboardPage;
