import React from 'react';
import Button from '../components/Button';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const LandingPage: React.FC = () => {
    return (
        <div className="space-y-24 md:space-y-32 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative text-center py-20 md:py-32">
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{backgroundImage: `url('https://storage.googleapis.com/aai-web-samples/poker-game.jpg')`}}>
                </div>
                <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
                <div className="container mx-auto px-6 relative">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in-down">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">AZ Poker</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 mb-8 animate-fade-in-up">Tu lugar en el mundo del Poker.</p>
                    <div className="flex justify-center space-x-4">
                        <Button href="#como-funciona" variant="primary">Únete a la Comunidad</Button>
                    </div>
                </div>
            </section>

            {/* Beneficios Section */}
            <section id="beneficios" className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">¿Por qué AZ Poker?</h2>
                <p className="max-w-3xl mx-auto text-center text-slate-300 mb-12">
                    En <strong>AZ Poker</strong>, te ofrecemos todo lo que necesitas para dominar el póker, de la A a la Z. Desde estrategias iniciales hasta análisis avanzados, nuestra comunidad te impulsa a alcanzar tus metas.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    <BenefitCard icon="📚" title="Estudio de la A a la Z" description="Aprende con nuestra comunidad en WhatsApp y Discord, donde compartimos estrategias para todos los niveles." />
                    <BenefitCard icon="🤝" title="Networking" description="Conéctate con jugadores que comparten tu amor por el póker y aspiran a los mismos stakes que tú." />
                    <BenefitCard icon="💰" title="Rakeback y Crecimiento" description="Maximiza tu bankroll con los mejores deals de rakeback y nuestro soporte para subir de niveles." />
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12">
                    <Button href="https://wa.me/+5491144342188" target="_blank" variant="secondary">Únete a WhatsApp</Button>
                    <Button href="https://discord.gg/JQjvDEPd" target="_blank" variant="secondary">Únete a Discord</Button>
                </div>
            </section>
            
            {/* Comunidad Section */}
            <section id="comunidad" className="container mx-auto px-6">
                <div className="bg-slate-800/50 p-8 md:p-12 rounded-xl border border-slate-700 text-center shadow-lg">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Únete a Nuestra Comunidad de Estudio</h2>
                    <p className="max-w-3xl mx-auto text-slate-300 text-lg leading-relaxed">
                        En <strong>AZ Poker</strong>, somos más que un grupo de póker: somos una comunidad apasionada por el juego, donde jugadores como tú intercambian ideas, estrategias y experiencias para subir de nivel juntos. Rodéate de personas que comparten tus hábitos y te inspiran a alcanzar los stakes que sueñas. ¡Estudia con nosotros y lleva tu juego al siguiente nivel!
                    </p>
                </div>
            </section>

            {/* Revision Gratuita Section */}
            <section id="revision" className="container mx-auto px-6 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Revisión Gratuita de tu Base de Datos</h2>
                 <p className="max-w-3xl mx-auto text-slate-300 mb-8 text-lg leading-relaxed">
                    ¿Quieres mejorar tu juego? Envíanos tu historial de manos o cuéntanos sobre tu situación actual, y te mandaremos un video de 10 minutos con consejos personalizados para optimizar tu estrategia, ¡completamente gratis!
                </p>
                <Button 
                    href="https://wa.me/+5491144342188?text=Hola!%20Quisiera%20solicitar%20mi%20revisi%C3%B3n%20gratuita%20de%20base%20de%20datos." 
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary">
                    Solicita tu Revisión Gratuita
                </Button>
            </section>

            {/* Como Funciona Section */}
            <section id="como-funciona" className="container mx-auto px-6 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Cómo Empezar</h2>
                 <div className="max-w-2xl mx-auto text-left space-y-6">
                    <Step number="1" text="Regístrate en uno de nuestros sitios de póker afiliados usando nuestro enlace." />
                    <Step number="2" text="Únete a nuestra comunidad en WhatsApp o Discord." />
                    <Step number="3" text="Disfruta de rakeback, soporte y estrategias para mejorar tu juego." />
                </div>
                <div className="mt-12">
                    <Button href="#contacto" variant="primary">Contáctanos</Button>
                </div>
            </section>

            {/* Video Library Section */}
            <section id="videos" className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Nuestra Biblioteca de Videos</h2>
                <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">Descubre estrategias, análisis de manos y tips para mejorar tu juego en nuestro canal de Vimeo.</p>
                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl shadow-violet-900/30 max-w-4xl mx-auto">
                    <iframe src="https://player.vimeo.com/video/1109112913?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" className="w-full h-full" title="Seleccion de Mesas y GG Deep"></iframe>
                </div>
                <div className="text-center mt-8">
                     <Button href="https://vimeo.com/showcase/11823766" target="_blank" variant="secondary">Ver más en Vimeo</Button>
                </div>
            </section>
            
            {/* Contacto Section */}
            <section id="contacto" className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Conéctate con Nosotros</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <ContactItem icon="📱" service="WhatsApp" link="https://wa.me/+5491144342188" handle="Grupo de WhatsApp" />
                    <ContactItem icon="🎮" service="Discord" link="https://discord.gg/JQjvDEPd" handle="Nuestra Comunidad" />
                    <ContactItem icon="📺" service="Twitch" link="https://www.twitch.tv/zetitaaa" handle="zetitaaa" secondaryLink="https://www.twitch.tv/pugliesea" secondaryHandle="PuglieseA" />
                </div>
            </section>

        </div>
    );
};


const BenefitCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="text-center bg-slate-800/50 p-8 rounded-xl border border-slate-700 shadow-lg hover:shadow-violet-500/20 hover:border-violet-500 transition-all duration-300 transform hover:-translate-y-2">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-300">{description}</p>
    </div>
);

const Step: React.FC<{number: string, text: string}> = ({number, text}) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 bg-violet-600 text-white font-bold rounded-full flex items-center justify-center text-lg">
            {number}
        </div>
        <p className="text-lg text-slate-300 pt-1.5">{text}</p>
    </div>
);

const ContactItem: React.FC<{ icon: string; service: string; link: string; handle: string; secondaryLink?: string; secondaryHandle?: string; }> = ({ icon, service, link, handle, secondaryLink, secondaryHandle }) => (
    <div className="text-center bg-slate-800 p-6 rounded-lg">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{service}</h3>
        <p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">
                {handle}
            </a>
            {secondaryLink && secondaryHandle && (
                <>
                 {' y '} 
                 <a href={secondaryLink} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">
                    {secondaryHandle}
                </a>
                </>
            )}
        </p>
    </div>
);


export default LandingPage;