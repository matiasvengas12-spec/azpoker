import React, { useState } from 'react';
import { getFeaturedVideos, getLatestVideos, ClassData } from '../constants';

interface CarouselProps {
    onSelectClass: (classData: ClassData, spotKey: string) => void;
    title: string;
    videos?: { spotKey: string; classData: ClassData }[];
}

const Carousel: React.FC<CarouselProps> = ({ onSelectClass, title, videos = getFeaturedVideos() }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 3;
    const totalItems = videos.length;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalItems - itemsPerView : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + itemsPerView >= totalItems ? 0 : prev + 1));
    };

    if (!videos.length) {
        return <p className="text-center text-red-400">No hay videos disponibles para {title.toLowerCase()}.</p>;
    }

    return (
        <div className="relative w-full mx-auto mb-6">
            <h2 className="text-lg font-bold text-white mb-3 text-center">{title}</h2>
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                >
                    {videos.map(({ spotKey, classData }, index) => (
                        <div
                            key={classData.id}
                            className="flex-shrink-0 w-2/5 sm:w-1/4 md:w-1/6 px-1" // Tamaño aún más reducido
                            style={{ flexBasis: `${100 / itemsPerView}%` }}
                        >
                            <button
                                onClick={() => onSelectClass(classData, spotKey)}
                                className="w-full bg-slate-800 rounded-lg overflow-hidden shadow-sm border border-slate-700 hover:border-violet-500 transition-all duration-300 hover:shadow-violet-500/20"
                                aria-label={`Ver video: ${classData.title}`}
                            >
                                <div className="aspect-video bg-slate-900">
                                    {classData.thumbnailUrl ? (
                                        <img
                                            src={classData.thumbnailUrl}
                                            alt={classData.title}
                                            className="w-full h-full object-cover"
                                            onError={() => console.error("Error loading thumbnail:", classData.thumbnailUrl)}
                                        />
                                    ) : (
                                        <video
                                            src={classData.videoUrl}
                                            className="w-full h-full object-cover"
                                            muted
                                            onMouseOver={(e) => e.currentTarget.play()}
                                            onMouseOut={(e) => e.currentTarget.pause()}
                                            onError={() => console.error("Error loading video:", classData.videoUrl)}
                                        />
                                    )}
                                </div>
                                <div className="p-1.5">
                                    <h3 className="text-xs font-semibold text-white truncate">{classData.title}</h3>
                                    <p className="text-[10px] text-slate-400">{spotKey.split('-').join(' ').toUpperCase()}</p>
                                    {classData.uploadDate && (
                                        <p className="text-[10px] text-slate-500 mt-0.5">
                                            Subido: {classData.uploadDate}
                                        </p>
                                    )}
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {totalItems > itemsPerView && (
                <>
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-slate-800 p-1 rounded-full border border-slate-700 hover:bg-violet-600 transition-colors"
                        aria-label="Video anterior"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-white" // Tamaño aún más reducido
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-slate-800 p-1 rounded-full border border-slate-700 hover:bg-violet-600 transition-colors"
                        aria-label="Video siguiente"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-white" // Tamaño aún más reducido
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
