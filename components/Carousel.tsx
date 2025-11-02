import React, { useState } from 'react';
import { featuredVideos, ClassData } from '../constants';

interface CarouselProps {
    onSelectClass: (classData: ClassData, spotKey: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({ onSelectClass }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 3; // Adjust based on screen size in practice
    const totalItems = featuredVideos.length;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalItems - itemsPerView : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + itemsPerView >= totalItems ? 0 : prev + 1));
    };

    return (
        <div className="relative w-full mx-auto mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Videos Destacados</h2>
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                >
                    {featuredVideos.map(({ spotKey, classData }, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 px-2"
                            style={{ flexBasis: `${100 / itemsPerView}%` }}
                        >
                            <button
                                onClick={() => onSelectClass(classData, spotKey)}
                                className="w-full bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700 hover:border-violet-500 transition-all duration-300 hover:shadow-violet-500/20"
                                aria-label={`Ver video: ${classData.title}`}
                            >
                                <div className="aspect-video bg-slate-900">
                                    {/* Replace with actual thumbnail if available */}
                                    <video
                                        src={classData.videoUrl}
                                        className="w-full h-full object-cover"
                                        muted
                                        onMouseOver={(e) => e.currentTarget.play()}
                                        onMouseOut={(e) => e.currentTarget.pause()}
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-white truncate">{classData.title}</h3>
                                    <p className="text-sm text-slate-400">{spotKey.split('-').join(' ').toUpperCase()}</p>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {/* Navigation Arrows */}
            {totalItems > itemsPerView && (
                <>
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-full border border-slate-700 hover:bg-violet-600 transition-colors"
                        aria-label="Video anterior"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg" // Fixed: Added equals sign
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-full border border-slate-700 hover:bg-violet-600 transition-colors"
                        aria-label="Video siguiente"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg" // Fixed: Added equals sign
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
};

export default Carousel;
