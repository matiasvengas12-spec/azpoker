import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { courseContent, ClassData, KeyLine, PokerHand, Filter, PreflopTable } from '../constants';

// Helper
const getSpotName = (key: string): string =>
  key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const VIDEO_POSTER_URL = 'https://azpoker.netlify.app/logo.png';

const ClassDetailsPage: React.FC = () => {
  const { spotKey, classId } = useParams<{ spotKey: string; classId: string }>();
  const [expandedSpots, setExpandedSpots] = useState<Record<string, boolean>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const spotKeys = useMemo(() => Object.keys(courseContent), []);

  // Validar spotKey y classId
  const selectedClass: ClassData | null = useMemo(() => {
    if (!spotKey || !classId || !courseContent[spotKey]) return null;
    return courseContent[spotKey].find(cls => cls.id === classId) || null;
  }, [spotKey, classId]);

  // Auto-expandir spot actual
  useEffect(() => {
    if (spotKey) {
      setExpandedSpots(prev => ({ ...prev, [spotKey]: true }));
    }
  }, [spotKey]);

  const toggleSpot = (key: string) => {
    setExpandedSpots(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const syllabusNavigation = (
    <nav className="space-y-2">
      {spotKeys.map(key => (
        <div key={key}>
          <button
            onClick={() => toggleSpot(key)}
            className="w-full text-left flex justify-between items-center px-2 py-2 text-lg font-semibold text-slate-200 hover:bg-slate-700 rounded-md transition-colors"
            aria-expanded={!!expandedSpots[key]}
          >
            <span>{getSpotName(key)}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform duration-300 ${expandedSpots[key] ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {expandedSpots[key] && (
            <div className="pl-4 mt-2 space-y-1 border-l-2 border-slate-600">
              {courseContent[key].map(classItem => (
                <Link
                  key={classItem.id}
                  to={`/class/${key}/${classItem.id}`}
                  className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                    selectedClass?.id === classItem.id
                      ? 'text-violet-400 font-semibold'
                      : 'text-slate-300 hover:text-violet-400'
                  }`}
                  onClick={() => window.innerWidth < 768 && setIsMobileMenuOpen(false)}
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

  // Redirección si no existe
  if (!spotKey || !classId || !selectedClass) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container mx-auto px-6 pt-12">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">{selectedClass.title}</h1>
        <p className="text-slate-400 text-sm mt-1">
          {getSpotName(spotKey)} • {selectedClass.uploadDate || 'Sin fecha'}
        </p>
      </div>
    
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Todos los videos
      </Link>
    </div>

      {/* Mobile Menu */}
      <div className="md:hidden mb-4 sticky top-[88px] z-40">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700 text-left"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="font-semibold text-white truncate pr-2">
            Temario: {selectedClass.title}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full mt-2 p-4 rounded-lg border border-slate-700 bg-slate-900">
            {syllabusNavigation}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="hidden md:block w-full md:w-1/4 lg:w-1/5 p-4 rounded-lg border border-slate-700 self-start md:sticky md:top-24">
          <h2 className="text-xl font-bold text-white mb-4 pl-2">Temario</h2>
          {syllabusNavigation}
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="space-y-12">
            {/* Video */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">{selectedClass.title}</h2>
              <div className="max-w-4xl mx-auto">
                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl shadow-violet-900/30 border border-slate-700">
                  {selectedClass.videoUrl ? (
                    <video
                      src={selectedClass.videoUrl}
                      poster={VIDEO_POSTER_URL}
                      controls
                      className="w-full h-full"
                      title={selectedClass.title}
                    />
                  ) : (
                    <p className="text-red-400 text-center py-10">Error: No se encontró la URL del video.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Key Lines */}
            {selectedClass.keyLines.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-white mb-6 border-b-2 border-violet-500 pb-2">Líneas Clave</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {selectedClass.keyLines.map((line, i) => (
                    <KeyLineCard key={i} line={line} />
                  ))}
                </div>
              </section>
            )}

            {/* Hands */}
            {selectedClass.hands.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold text-white mb-6 border-b-2 border-violet-500 pb-2">Manos de Ejemplo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedClass.hands.map((hand, i) => (
                    <HandCard key={i} hand={hand} />
                  ))}
                </div>
              </section>
            )}

            {/* Extra Material */}
            {(selectedClass.filters?.length ?? 0) > 0 || (selectedClass.tables?.length ?? 0) > 0 ? (
              <section>
                <h3 className="text-2xl font-bold text-white mb-6 border-b-2 border-violet-500 pb-2">Material Extra</h3>
                <div className="space-y-10">
                  {selectedClass.filters && selectedClass.filters.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-slate-200 mb-4">Filtros</h4>
                      <p className="text-slate-300 mb-6">
                        Filtros de "{getSpotName(spotKey)}". Acá podes encontrar filtros útiles.
                      </p>
                      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full">
                            <thead className="bg-slate-900/50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Tracker</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Fecha</th>
                                <th className="relative px-6 py-3"><span className="sr-only">Descargar</span></th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                              {selectedClass.filters.map((f, i) => (
                                <FilterRow key={i} filter={f} />
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedClass.tables && selectedClass.tables.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold text-slate-200 mb-4">Tablas Preflop</h4>
                      <p className="text-slate-300 mb-6">Tablas preflop de referencia.</p>
                      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full">
                            <thead className="bg-slate-900/50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Fecha</th>
                                <th className="relative px-6 py-3"><span className="sr-only">Abrir</span></th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                              {selectedClass.tables.map((t, i) => (
                                <TableRow key={i} table={t} />
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
};

// Componentes auxiliares (movidos desde DashboardPage)
const KeyLineCard: React.FC<{ line: KeyLine }> = ({ line }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 transition-all hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/10 flex flex-col">
    <h4 className="font-bold text-lg text-violet-400 mb-2">{line.title}</h4>
    <p className="text-slate-300 text-base leading-relaxed">{line.content}</p>
  </div>
);

const HandCard: React.FC<{ hand: PokerHand }> = ({ hand }) => (
  <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 transition-all hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/10">
    <div className="flex items-center gap-4 mb-3">
      <div className="flex-shrink-0 bg-slate-900/70 w-16 h-10 flex items-center justify-center rounded-md border border-slate-600">
        <span className="font-mono text-xl text-white font-bold tracking-wider">{hand.hand}</span>
      </div>
      <h4 className="font-semibold text-lg text-slate-200">Mano de Ejemplo</h4>
    </div>
    <p className="text-slate-300 text-base leading-relaxed">{hand.description}</p>
  </div>
);

const FilterRow: React.FC<{ filter: Filter }> = ({ filter }) => (
  <tr className="hover:bg-slate-800 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{filter.name}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        filter.tracker === 'Poker Tracker' ? 'bg-red-900/50 text-red-300 border border-red-700/50' :
        filter.tracker === 'Holdem Manager' ? 'bg-blue-900/50 text-blue-300 border border-blue-700/50' :
        'bg-green-900/50 text-green-300 border border-green-700/50'
      }`}>
        {filter.tracker}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{filter.uploadDate}</td>
    <td className="px-6 py-4 whitespace-nowrap text-right">
      <a href={filter.downloadLink} download className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        <span>Descargar</span>
      </a>
    </td>
  </tr>
);

const TableRow: React.FC<{ table: PreflopTable }> = ({ table }) => (
  <tr className="hover:bg-slate-800 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{table.name}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{table.uploadDate}</td>
    <td className="px-6 py-4 whitespace-nowrap text-right">
      <a href={table.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
        </svg>
        <span>Abrir</span>
      </a>
    </td>
  </tr>
);

export default ClassDetailsPage;
