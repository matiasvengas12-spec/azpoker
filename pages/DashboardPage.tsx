import React, { useState, useMemo } from 'react';
import { courseContent, ClassData, KeyLine, PokerHand, Filter, PreflopTable, getLatestVideos } from '../constants';
import Carousel from '../components/Carousel';

// URL de la imagen de portada para todos los videos (reemplaza con tu URL de Firebase Storage)
const VIDEO_POSTER_URL = 'https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/images/poster.jpg?alt=media&token=your-token';

// Helper function to format spot keys into readable names
const getSpotName = (key: string): string => {
    return key
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const DashboardPage: React.FC = () => {
    const spotKeys = useMemo(() => Object.keys(courseContent), []);
    
    const [expandedSpots, setExpandedSpots] = useState<Record<string, boolean>>({
        [spotKeys[0]]: true,
    });

    const [selectedSpotKey, setSelectedSpotKey] = useState<string>(spotKeys[0]);
    const [selectedClass, setSelectedClass] = useState<ClassData | null>(
        courseContent[spotKeys[0]][0] || null
    );

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleSpot = (spotKey: string) => {
        setExpandedSpots(prev => ({ ...prev, [spotKey]: !prev[spotKey] }));
    };
    
    const handleSelectClass = (classData: ClassData, spotKey: string) => {
        setSelectedClass(classData);
        setSelectedSpotKey(spotKey);
        if (window.innerWidth < 768) {
            setIsMobileMenuOpen(false);
        }
    };

    const syllabusNavigation = (
        <nav className="space-y-2">
            {spotKeys.map(spotKey => (
                <div key={spotKey}>
                    <button 
                        onClick={() => toggleSpot(spotKey)}
                        className="w-full text-left flex justify-between items-center px-2 py-2 text-lg font-semibold text-slate-200 hover:bg-slate-700 rounded-md transition-colors"
                        aria-expanded={!!expandedSpots[spotKey]}
                    >
                        <span>{getSpotName(spotKey)}</span>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 transition-transform duration-300 ${expandedSpots[spotKey] ? 'rotate-180' : 'rotate-0'}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {expandedSpots[spotKey] && (
                        <div className="pl-4 mt-2 space-y-1 border-l-2 border-slate-600">
                            {courseContent[spotKey].map(classItem => (
                                <a
                                    key={classItem.id}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSelectClass(classItem, spotKey);
                                    }}
                                    className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                                        selectedClass?.id === classItem.id
                                            ? 'text-violet-400 font-semibold'
                                            : 'text-slate-300 hover:text-violet-400'
                                    }`}
                                >
                                    {classItem.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );

    return (
        <div className="container mx-auto px-6 pt-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Dashboard de Estudio</h1>
                <p className="text-lg text-slate-300 mt-2">Tu centro de control para crecer en el poker.</p>
            </header>

            {/* Carrusel de Últimos Videos */}
            <Carousel onSelectClass={handleSelectClass} title="Últimos Videos" videos={getLatestVideos()} />

            {/* Carrusel de Videos Destacados */}
            <Carousel onSelectClass={handleSelectClass} title="Videos Destacados" />

            <div className="md:hidden mb-4 sticky top-[88px] z-40">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-full flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700 text-left"
                    aria-expanded={isMobileMenuOpen}
                >
                    <span className="font-semibold text-white truncate pr-2">
                        Temario: {selectedClass ? selectedClass.title : 'selecciona uno'}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 p-4 rounded-lg border border-slate-700 bg-slate-900">
                        {syllabusNavigation}
                    </div>
                )}
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
                <aside className={`hidden md:block w-full md:w-1/4 lg:w-1/5 p-4 rounded-lg border border-slate-700 self-start md:sticky md:top-24`}>
                    <h2 className="text-xl font-bold text-white mb-4 pl-2">Temario</h2>
                    {syllabusNavigation}
                </aside>

                <main className="w-full md:w-3/4 lg:w-4/5">
                    {selectedClass ? (
                        <div className="space-y-12">
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
                                                onError={() => console.error("Error loading video:", selectedClass.videoUrl)}
                                            />
                                        ) : (
                                            <p className="text-red-400 text-center py-10">Error: No se encontró la URL del video.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {selectedClass.keyLines.length > 0 && (
                                <section>
                                    <h3 className="text-2xl font-bold text-white mb-6 border-b-2 border-violet-500 pb-2">Líneas Clave</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
                                        {selectedClass.keyLines.map((line, index) => (
                                            <KeyLineCard key={index} line={line} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {selectedClass.hands.length > 0 && (
                                <section>
                                    <h3 className="text-2xl font-bold text-white mb-6 border-b-2 border-violet-500 pb-2">Manos de Ejemplo</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                        {selectedClass.hands.map((hand, index) => (
                                            <HandCard key={index} hand={hand} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {(selectedClass.filters && selectedClass.filters.length > 0) || (selectedClass.tables && selectedClass.tables.length > 0) ? (
                                <section>
                                    <h3 className="text-2xl font-bold text-white mb-6 border-b-2 border-violet-500 pb-2">Material Extra</h3>
                                    <div className="space-y-10">
                                        {selectedClass.filters && selectedClass.filters.length > 0 && (
                                            <div>
                                                <h4 className="text-xl font-semibold text-slate-200 mb-4">Filtros</h4>
                                                <p className="text-slate-300 mb-6">
                                                    Filtros de "{getSpotName(selectedSpotKey)}". Acá podes encontrar filtros útiles para mejorar tu juego en el spot.
                                                </p>
                                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                                                    <div className="overflow-x-auto">
                                                        <table className="min-w-full">
                                                            <thead className="bg-slate-900/50">
                                                                <tr>
                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Nombre del Filtro</th>
                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Tracker</th>
                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Fecha</th>
                                                                    <th scope="col" className="relative px-6 py-3">
                                                                        <span className="sr-only">Descargar</span>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-slate-700">
                                                                {selectedClass.filters.map((filter, index) => (
                                                                    <FilterRow key={index} filter={filter} />
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
                                                <p className="text-slate-300 mb-6">
                                                    Tablas preflop de referencia para estudiar y aplicar en las mesas.
                                                </p>
                                                <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                                                    <div className="overflow-x-auto">
                                                        <table className="min-w-full">
                                                            <thead className="bg-slate-900/50">
                                                                <tr>
                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Nombre de la Tabla</th>
                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Fecha</th>
                                                                    <th scope="col" className="relative px-6 py-3">
                                                                        <span className="sr-only">Abrir</span>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-slate-700">
                                                                {selectedClass.tables.map((table, index) => (
                                                                    <TableRow key={index} table={table} />
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
                    ) : (
                        <div className="text-center py-20 bg-slate-800/50 rounded-lg">
                            <h2 className="text-2xl font-bold text-white">Selecciona una clase del temario</h2>
                            <p className="text-slate-300 mt-2">Elige un tema para empezar a estudiar.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

const KeyLineCard: React.FC<{ line: KeyLine }> = ({ line }) => (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 transition-all duration-300 hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/10 flex flex-col">
        <h4 className="font-bold text-lg text-violet-400 mb-2">{line.title}</h4>
        <p className="text-slate-300 text-base leading-relaxed">{line.content}</p>
    </div>
);

const HandCard: React.FC<{ hand: PokerHand }> = ({ hand }) => (
    <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 transition-all duration-300 hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/10">
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
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-white">{filter.name}</div>
        </td>
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
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a 
                href={filter.downloadLink} 
                download 
                className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
                aria-label={`Descargar filtro ${filter.name}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Descargar</span>
            </a>
        </td>
    </tr>
);

const TableRow: React.FC<{ table: PreflopTable }> = ({ table }) => (
    <tr className="hover:bg-slate-800 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-white">{table.name}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{table.uploadDate}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a 
                href={table.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
                aria-label={`Abrir tabla ${table.name}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                <span>Abrir</span>
            </a>
        </td>
    </tr>
);

export default DashboardPage;
