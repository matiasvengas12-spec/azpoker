export interface KeyLine {
    title: string;
    content: string;
}

export interface PokerHand {
    hand: string;
    description: string;
}

export interface Filter {
    name: string;
    uploadDate: string;
    tracker: 'Holdem Manager' | 'Poker Tracker' | 'H2N';
    downloadLink: string;
}

export interface PreflopTable {
    name: string;
    uploadDate: string;
    link: string;
}

export interface ClassData {
    id: string; // Asegúrate de que cada ClassData tenga un id único
    videoUrl: string; // Changed from 'id' to 'videoUrl' for Firebase Storage link    
    thumbnailUrl?: string;
    title: string;
    uploadDate?: string; // Nuevo campo para ordenar por fecha
    keyLines: KeyLine[];
    hands: PokerHand[];
    filters?: Filter[];
    tables?: PreflopTable[];
}

export const getFeaturedVideos = (): { spotKey: string; classData: ClassData }[] => [
    {
        spotKey: "Juego vs Recres",
        classData: courseContent["Juego vs Recres"][0],
    },
    {
        spotKey: "Live Sessions Micros",
        classData: courseContent["Live Sessions Micros"][0],
    },
    {
        spotKey: "mindset",
        classData: courseContent["mindset"][0],
    },
    {
        spotKey: "Revision HUD",
        classData: courseContent["Revision HUD"][0],
    },
];

export interface CourseContent {
    [key: string]: ClassData[];
}

export const courseContent: CourseContent = {
    "Juego vs Recres": [
        {
            id: "juego-recreacionales-1",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F9825%20revision%20recres.mkv?alt=media&token=3ed29495-96a6-4851-bbe3-a0e9760be7b9",
            title: "Max Value vs Recres",
            thumbnailUrl: "https://i.gyazo.com/671057d984b1a0a01705f3a47ffd0173.png",
            uploadDate: "2025-09-21",
            keyLines: [
                { title: "Identificar al 'Fish'", content: "Busca jugadores con VPIP alto (>40%) y PFR bajo (<10%). Son tu principal fuente de ingresos." },
                { title: "Aislar, no multijugador", content: "Intenta jugar botes heads-up contra recreacionales. Sube preflop para aislar." },
                { title: "Apuestas por Valor", content: "Contra recreacionales, enfócate en apostar fuerte con tus manos de valor. Los bluffs son menos efectivos." }
            ],
            hands: [
                { hand: "AA", description: "Cómo extraer máximo valor preflop y postflop con Ases contra un jugador pasivo." },
                { hand: "T9s", description: "Jugando un suited connector en posición contra un recreacional para buscar proyectos grandes." },
            ],
            filters: [
                { name: "Filtro para Identificar Recreacionales", uploadDate: "2024-07-21", tracker: "H2N", downloadLink: "/filters/find-rec.h2nfilt" },
            ],
            tables: [
                { name: "Tabla de ROL vs Recreacionales", uploadDate: "2024-07-20", link: "/tables/rol-vs-rec.pdf" }
            ]
        },
        { 
            id: "juego-donks",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Fvs%20donks%20recres.mkv?alt=media&token=062abc1e-88cf-42ce-a36e-a030f7231961", 
            thumbnailUrl: "https://i.gyazo.com/671057d984b1a0a01705f3a47ffd0173.png",
            title: "Como jugar vs donks de recres", 
            uploadDate: "2025-09-21",
            keyLines: [], 
            hands: [],
            filters: [
                { name: "Filtro de Limpers", uploadDate: "2024-07-17", tracker: "Holdem Manager", downloadLink: "/filters/limpers.hm3filt" }
            ],
            tables: [
                { name: "Tabla de Squeeze vs Limpers", uploadDate: "2024-07-16", link: "/tables/squeeze.pdf" }
            ]
        }
    ],
    "Live Sessions Micros": [
        { 
            id: "LiveACR2108",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Fvs%20donks%20recres.mkv?alt=media&token=062abc1e-88cf-42ce-a36e-a030f7231961", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Sesion NL10 ACR", 
            uploadDate: "2025-08-21",
            keyLines: [], 
            hands: [],
            filters: [
                { name: "Filtro de ROL desde BTN", uploadDate: "2024-07-21", tracker: "Poker Tracker", downloadLink: "/filters/btn-rol.pt4filt" }
            ],
            tables: [
                { name: "Tabla de Open Raise desde BTN", uploadDate: "2024-07-20", link: "/tables/btn-or.pdf" }
            ]
        },
        { 
            id: "LiveStake2908",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Fvs%20donks%20recres.mkv?alt=media&token=062abc1e-88cf-42ce-a36e-a030f7231961", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Stake NL10 Live", 
            uploadDate: "2025-08-25",
            keyLines: [], 
            hands: [],
            filters: [
                { name: "Filtro de C-Bet Flop en SRP", uploadDate: "2024-07-19", tracker: "H2N", downloadLink: "/filters/cbet-srp.h2nfilt" }
            ],
            tables: [
                { name: "Guía de Texturas de Flop", uploadDate: "2024-07-18", link: "/tables/flop-textures.pdf" }
            ]
        },
    ],
    "Revision HUD": [
        {
            id: "hudpiero",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Fhud%20piero.mkv?alt=media&token=e8b57f15-2711-48e7-9964-d10d7ce5ac24",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Piero",
            uploadDate: "2025-09-21",
            keyLines: [
                { title: "Rango de Defensa Amplio", content: "Desde la BB, defiende un rango muy amplio de manos contra un open de BTN, tanto con call como con 3-bet." },
                { title: "Agresividad Postflop", content: "No seas pasivo postflop. Aprovecha para hacer check-raise en flops favorables a tu rango." }
            ],
            hands: [
                { hand: "K7s", description: "Análisis de un call en la BB y juego postflop en un board seco." },
                { hand: "A5o", description: "Cuándo hacer 3-bet de farol y cómo continuar en diferentes texturas de flop." },
            ],
            filters: [
                { name: "Filtro 3-Bet vs BTN", uploadDate: "2024-07-15", tracker: "Poker Tracker", downloadLink: "/filters/3bet-vs-btn.pt4filt" },
                { name: "Filtro Check-Raise Flop", uploadDate: "2024-07-12", tracker: "Holdem Manager", downloadLink: "/filters/check-raise-flop.hm3filt" },
                { name: "Filtro General de Defensa", uploadDate: "2024-07-10", tracker: "H2N", downloadLink: "/filters/defensa-general.h2nfilt" }
            ],
            tables: [
                { name: "Tabla de Defensa de BB vs BTN (Call)", uploadDate: "2024-07-14", link: "/tables/bb-def-call.pdf" },
                { name: "Tabla de Defensa de BB vs BTN (3-Bet)", uploadDate: "2024-07-13", link: "/tables/bb-def-3bet.pdf" }
            ]
        },
    ],
    "mindset": [
        { id: "microexit", videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2FSalir%20de%20micros.mkv?alt=media&token=5bbd8123-57eb-4854-b809-11604ea83976", thumbnailUrl: "https://i.gyazo.com/0aa8ee3e7435c06ff696de094ec8fb00.png", title: "Mira esto para salir de micros", uploadDate: "2025-10-21", keyLines: [], hands: [] },
    ]
};

// Últimos videos (ordenados por uploadDate, más recientes primero)
export const getLatestVideos = (): { spotKey: string; classData: ClassData }[] => {
    const allVideos = Object.entries(courseContent).flatMap(([spotKey, classes]) =>
        classes.map(classData => ({ spotKey, classData }))
    );
    return allVideos
        .filter(video => video.classData.uploadDate) // Asegurarse de que tengan uploadDate
        .sort((a, b) => new Date(b.classData.uploadDate!).getTime() - new Date(a.classData.uploadDate!).getTime())
        .slice(0, 4); // Tomar los 4 más recientes
};
