import React, { useState, useMemo } from 'react';
import { spotsData } from '../constants';
import type { Video } from '../constants';

const DashboardPage: React.FC = () => {
    const tabs = useMemo(() => Object.keys(spotsData), []);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const videos = spotsData[activeTab] || [];

    const getTabName = (key: string): string => {
        return key
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Dashboard de Estudio</h1>
                <p className="text-lg text-slate-300 mt-2">Selecciona una categoría para ver los videos de estrategia.</p>
            </header>

            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 border-b border-slate-700 pb-4">
                {tabs.map(tabKey => (
                    <button
                        key={tabKey}
                        onClick={() => setActiveTab(tabKey)}
                        className={`px-4 py-2 text-sm md:text-base font-semibold rounded-md transition-colors duration-300 ${
                            activeTab === tabKey
                                ? 'bg-violet-600 text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                    >
                        {getTabName(tabKey)}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

interface VideoCardProps {
    video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    return (
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700 hover:border-violet-500/50 transition-all duration-300 group">
            <div className="aspect-w-16 aspect-h-9">
                <iframe
                    src={`https://player.vimeo.com/video/${video.id}?badge=0&autopause=0&player_id=0&app_id=58479`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    title={video.title}
                ></iframe>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors duration-300">{video.title}</h3>
            </div>
        </div>
    );
};

export default DashboardPage;