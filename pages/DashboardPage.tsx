import React, { useState, useMemo } from 'react';
import { courseContent } from '../constants';
import type { ClassData, KeyLine, PokerHand } from '../constants';

// Helper function to format spot keys into readable names
const getSpotName = (key: string): string => {
    return key
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const DashboardPage: React.FC = () => {
    const spotKeys = useMemo(() => Object.keys(courseContent), []);
    
    // State for sidebar menu expansion
    const [expandedSpots, setExpandedSpots] = useState<Record<string, boolean>>({
        [spotKeys[0]]: true,
    });

    // State for the currently selected class
    const [selectedClass, setSelectedClass] = useState<ClassData | null>(
        courseContent[spotKeys[0]][0] || null
    );

    // State for mobile menu visibility
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle for sidebar sections
    const toggleSpot = (spotKey: string) => {
        setExpandedSpots(prev => ({ ...prev, [spotKey]: !prev[spotKey] }));
    };
    
    // Handler to set the selected class and close mobile menu
    const handleSelectClass = (classData: ClassData) => {
        setSelectedClass(classData);
        if (window.innerWidth < 768) { // Only auto-close on mobile
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
                                        handleSelectClass(classItem);
                                    }}
                                    className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                                        selectedClass?.id === classItem.id
                                            ? 'bg-violet-600 text-white font-semibold'
                                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
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

            {/* Mobile Menu Button */}
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
                     <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-xl">
                        {syllabusNavigation}
                    </div>
                )}
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className={`hidden md:block w-full md:w-1/4 lg:w-1/5 bg-slate-800/50 p-4 rounded-lg border border-slate-700 self-start md:sticky md:top-24`}>
                    <h2 className="text-xl font-bold text-white mb-4 pl-2">Temario</h2>
                    {syllabusNavigation}
                </aside>

                {/* Main Content Area */}
                <main className="w-full md:w-3/4 lg:w-4/5">
                    {selectedClass ? (
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-6">{selectedClass.title}</h2>
                                <div className="max-w-4xl mx-auto">
                                    <div className="aspect-video rounded-lg overflow-hidden shadow-2xl shadow-violet-900/30 border border-slate-700">
                                        <iframe
                                            src={`https://player.vimeo.com/video/${selectedClass.id}?badge=0&autopause=0&player_id=0&app_id=58479`}
                                            frameBorder="0"
                                            allow="autoplay; fullscreen; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                            title={selectedClass.title}
                                        ></iframe>
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


export default DashboardPage;