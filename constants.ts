export interface KeyLine {
    title: string;
    content: string;
}

export interface PokerHand {
    hand: string;
    description: string;
}

export interface ClassData {
    id: string; // Vimeo video ID
    title: string;
    keyLines: KeyLine[];
    hands: PokerHand[];
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
            ]
        },
        { id: "867351508", title: "Explotando Errores Comunes de Amateurs", keyLines: [], hands: [] }
    ],
    "btn-bb": [
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
            ]
        },
        { id: "76979871", title: "Estrategia de 3-Bet desde la Ciega Grande", keyLines: [], hands: [] },
        { id: "92117122", title: "Juego Postflop en Guerra de Ciegas", keyLines: [], hands: [] }
    ],
    "juego-preflop": [
        { id: "259411563", title: "Rangos de Apertura Preflop (RFI)", keyLines: [], hands: [] },
        { id: "135181955", title: "Conceptos de GTO Preflop", keyLines: [], hands: [] },
        { id: "211200483", title: "Ajustes Preflop vs Diferentes Tipos de Jugadores", keyLines: [], hands: [] }
    ],
    "juego-postflop": [
        { id: "49354231", title: "Introducción a la C-Bet", keyLines: [], hands: [] },
        { id: "76979871", title: "Estrategias de Check-Raise", keyLines: [], hands: [] },
        { id: "148835803", title: "Juego en el Turn y River", keyLines: [], hands: [] }
    ],
};
