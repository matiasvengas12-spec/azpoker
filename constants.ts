
export interface Video {
    id: string;
    title: string;
}

export interface SpotsData {
    [key: string]: Video[];
}

export const spotsData: SpotsData = {
    "juego-recreacionales": [
        { id: "1109112913", title: "Selección de Mesas y Estrategia Deep" },
        { id: "917120030", title: "Análisis de Manos vs Jugadores Recreacionales" },
        { id: "867351508", title: "Explotando Errores Comunes de Amateurs" }
    ],
    "btn-bb": [
        { id: "885996089", title: "Defensa de BB vs BTN Open" },
        { id: "76979871", title: "Estrategia de 3-Bet desde la Ciega Grande" },
        { id: "92117122", title: "Juego Postflop en Guerra de Ciegas" }
    ],
    "juego-preflop": [
        { id: "259411563", title: "Rangos de Apertura Preflop (RFI)" },
        { id: "135181955", title: "Conceptos de GTO Preflop" },
        { id: "211200483", title: "Ajustes Preflop vs Diferentes Tipos de Jugadores" }
    ],
    "juego-postflop": [
        { id: "49354231", title: "Introducción a la C-Bet" },
        { id: "76979871", title: "Estrategias de Check-Raise" },
        { id: "148835803", title: "Juego en el Turn y River" }
    ],
};
