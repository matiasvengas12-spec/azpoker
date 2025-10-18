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
    id: string; // Vimeo video ID
    title: string;
    keyLines: KeyLine[];
    hands: PokerHand[];
    filters?: Filter[];
    tables?: PreflopTable[];
}

export interface CourseContent {
    [key: string]: ClassData[];
}

export const courseContent: CourseContent = {
    "juego-recreacionales": [
        {
            id: "1109112913",
            title: "Selección de Mesas y Estrategia Deep",
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
            id: "917120030",
            title: "Análisis de Manos vs Jugadores Recreacionales",
            keyLines: [
                { title: "Piensa en su Rango", content: "El rango de un recreacional es mucho más amplio y menos lógico. No asumas que piensan como tú." },
                { title: "No Sobreestimes el Fold Equity", content: "Los jugadores recreacionales tienden a pagar de más. Prioriza el valor sobre el farol." }
            ],
            hands: [
                { hand: "KQo", description: "Decisión en el turn con top pair top kicker frente a una donk bet." },
                { hand: "77", description: "Set-mining: Cuándo pagar preflop para buscar un trío y cómo jugarlo postflop." },
            ],
            filters: [
                { name: "Filtro de Stats Explotables (Recs)", uploadDate: "2024-07-19", tracker: "Poker Tracker", downloadLink: "/filters/rec-stats.pt4filt" }
            ],
            tables: [
                { name: "Tabla de Aislamiento por Posición", uploadDate: "2024-07-18", link: "/tables/iso-raise.pdf" }
            ]
        },
        { 
            id: "867351508", 
            title: "Explotando Errores Comunes de Amateurs", 
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
    "btn-vs-bb": [
        { 
            id: "100000001", 
            title: "Estrategia de Open Raise desde BTN", 
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
            id: "100000002", 
            title: "Juego Postflop como Agresor", 
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
    "bb-vs-btn": [
        {
            id: "885996089",
            title: "Defensa de BB vs BTN Open",
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
        { 
            id: "76979871", 
            title: "Estrategia de 3-Bet desde la Ciega Grande", 
            keyLines: [], 
            hands: [],
            filters: [
                { name: "Filtro de 3-Bet de Farol", uploadDate: "2024-07-21", tracker: "Holdem Manager", downloadLink: "/filters/3bet-bluff.hm3filt" }
            ],
            tables: [
                { name: "Tabla de 3-Bet por Valor y Farol", uploadDate: "2024-07-20", link: "/tables/3bet-ranges.pdf" }
            ]
        },
        { 
            id: "92117122", 
            title: "Juego Postflop en Guerra de Ciegas", 
            keyLines: [], 
            hands: [],
            filters: [
                { name: "Filtro de Donk Bet", uploadDate: "2024-07-19", tracker: "Poker Tracker", downloadLink: "/filters/donk-bet.pt4filt" }
            ],
            tables: [
                { name: "Estrategia de Check-Raise en Flops Húmedos", uploadDate: "2024-07-18", link: "/tables/check-raise-wet.pdf" }
            ]
        }
    ],
    "bb-vs-sb": [
        { 
            id: "200000001", 
            title: "Defensa de BB vs SB Open/Limp", 
            keyLines: [], 
            hands: [],
            filters: [
                { name: "Filtro de Defensa vs Open de SB", uploadDate: "2024-07-21", tracker: "H2N", downloadLink: "/filters/bb-vs-sb-open.h2nfilt" }
            ],
            tables: [
                { name: "Tabla de Defensa BB vs SB", uploadDate: "2024-07-20", link: "/tables/bb-vs-sb-def.pdf" }
            ]
        },
    ],
    "sb-vs-bb": [
        { 
            id: "300000001", 
            title: "Estrategia de Open Raise/Limp desde SB", 
            keyLines: [], 
            hands: [],
            filters: [
                { name: "Filtro de ROL desde SB", uploadDate: "2024-07-21", tracker: "Holdem Manager", downloadLink: "/filters/sb-rol.hm3filt" }
            ],
            tables: [
                { name: "Tabla de ROL/Limp desde SB", uploadDate: "2024-07-20", link: "/tables/sb-rol-limp.pdf" }
            ]
        },
    ],
    "ep-vs-bb": [
        { 
            id: "400000001", 
            title: "Defensa de BB vs Open de EP", 
            keyLines: [], 
            hands: [],
            filters: [
                { name: "Filtro de Defensa vs EP", uploadDate: "2024-07-21", tracker: "Poker Tracker", downloadLink: "/filters/bb-vs-ep.pt4filt" }
            ],
            tables: [
                { name: "Tabla de Defensa de BB vs EP/MP", uploadDate: "2024-07-20", link: "/tables/bb-vs-ep-mp-def.pdf" }
            ]
        },
    ],
    "3b-pot": [
         { 
            id: "500000001", 
            title: "Juego como Agresor en Botes 3-Beteados", 
            keyLines: [], 
            hands: [],
            filters: [
                { name: "Filtro de C-Bet en 3BP", uploadDate: "2024-07-21", tracker: "H2N", downloadLink: "/filters/cbet-3bp.h2nfilt" }
            ],
            tables: [
                { name: "Guía de C-Bet en Botes 3-Beteados", uploadDate: "2024-07-20", link: "/tables/cbet-3bp-guide.pdf" }
            ]
        },
    ],
    "call-3bp": [
         { 
            id: "600000001", 
            title: "Juego como Caller en Botes 3-Beteados", 
            keyLines: [], 
            hands: [],
            filters: [
                { name: "Filtro de Fold a C-Bet en 3BP", uploadDate: "2024-07-21", tracker: "Holdem Manager", downloadLink: "/filters/fold-vs-cbet-3bp.hm3filt" }
            ],
            tables: [
                { name: "Estrategia de Flotación en Botes 3BP", uploadDate: "2024-07-20", link: "/tables/float-3bp.pdf" }
            ]
        },
    ],
    "mindset": [
        { id: "700000001", title: "Control del Tilt y Gestión Emocional", keyLines: [], hands: [] },
        { id: "700000002", title: "Gestión de Bankroll", keyLines: [], hands: [] },
    ]
};