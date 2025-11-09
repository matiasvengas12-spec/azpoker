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
    duration?: string; // Nuevo campo para duración (formato MM:SS o HH:MM:SS)
}

export const getFeaturedVideos = (): { spotKey: string; classData: ClassData }[] => [
    {
        spotKey: "Juego vs Recres",
        classData: courseContent["Juego vs Recres"][0],
    },
    {
        spotKey: "Stake BR Challenge",
        classData: courseContent["Stake BR Challenge"][0],
    },
    {
        spotKey: "mindset",
        classData: courseContent["mindset"][0],
    },
    {
        spotKey: "Revisiones Piero",
        classData: courseContent["Revisiones Piero"][0],
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
            ],
            duration: "19:17"
        },
        {
            id: "juego-recreacionales-3",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Fmaxvalue%20fish%20218.mkv?alt=media&token=1cdc174f-0509-4978-add0-feeca74ec10a",
            title: "Max Value vs Recres 2",
            thumbnailUrl: "https://i.gyazo.com/671057d984b1a0a01705f3a47ffd0173.png",
            uploadDate: "2025-08-21",
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
                { name: "Tabla de ROL vs Recreacionales", uploadDate: "2024-07-21", link: "/tables/rol-vs-rec.pdf" }
            ],
            duration: "19:17"
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
            ],
            duration: "19:17"
        },
    ],
    "Videos Fundamentales": [
            {
            id: "preflopfunda",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F2025-10-10%2021-43-29.mkv?alt=media&token=7230a5ad-b80f-4421-a623-cde030c86939",
            thumbnailUrl: "https://i.gyazo.com/2dc0d0b8fe90cca89bb9d7babea82d2d.png",
            title: "Fundamentos Preflop",
            uploadDate: "2025-11-08",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
    ],
    "Revisiones Piero": [
        {
            id: "hudpiero",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Fhud%20piero.mkv?alt=media&token=e8b57f15-2711-48e7-9964-d10d7ce5ac24",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision HUD Piero",
            uploadDate: "2025-09-21",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "revmanospiero",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2FRevision%20manos%20parte%201.mkv?alt=media&token=b0c46d50-a309-4d7a-97dd-ebbe022293ad",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Manos Piero 12/8",
            uploadDate: "2025-08-12",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "revmanospiero2",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2FRevision%20piero%20238%20mesas%20ante%20gg.mkv?alt=media&token=5f32f4e9-1028-44c0-b9ca-52e6dbfec984",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Manos Deep Ante",
            uploadDate: "2025-08-23",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
                {
            id: "revmanospiero3",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2FRevision%20manos%20piero%20119.mkv?alt=media&token=036e90fc-b021-4aca-b940-4e5de2c54d06",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Manos 11/9",
            uploadDate: "2025-09-11",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "revmanospiero4",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Frev%20piero%20119%202.mkv?alt=media&token=46c793af-9b2f-4e44-af8d-3372afb122fb",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Manos 11/9 p2",
            uploadDate: "2025-09-11",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "revmanospiero5",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F1110%20ciegas%20piero.mkv?alt=media&token=a1fe127f-27f8-49d1-ab90-f96278a24385",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Blind Game",
            uploadDate: "2025-10-11",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "revmanospiero6",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F1810ciegas%20pie.mkv?alt=media&token=f2d68dd2-4475-4918-ab10-905aa03c2462",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Blind Game 2",
            uploadDate: "2025-10-18",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "revmanospiero7",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F2025-10-25%2021-10-38.mkv?alt=media&token=3d2ca0d6-3c91-4e40-b586-c56e10257962",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "3BP OOP",
            uploadDate: "2025-10-25",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "revmanospiero8",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F2025-10-30%2022-18-57.mkv?alt=media&token=f4160304-2ca1-4915-bd1b-392775bf4391",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Probe Opp",
            uploadDate: "2025-10-30",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "revmanospiero9",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F2025-11-03%2000-35-58.mkv?alt=media&token=82b2affd-b588-4d0f-8998-56f1c4bebc02",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Manos Marcadas 2/11",
            uploadDate: "2025-11-2",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "revmanospiero10",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F2025-11-06%2021-06-13.mkv?alt=media&token=51d5dc1b-895e-4fd7-949a-49e0a8c5c57c",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Probe Opp 6/11",
            uploadDate: "2025-11-6",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
         {
            id: "revmanospiero11",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F2025-11-06%2021-06-13.mkv?alt=media&token=51d5dc1b-895e-4fd7-949a-49e0a8c5c57c",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "OOP fuera de ciegas 8/11",
            uploadDate: "2025-11-8",
            keyLines: [{ title: "Error audio'", content: "No anda audio hasta el minuto 3" },], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
    ],
        "Revisiones Lucas": [
            {
            id: "lucas20",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F8825%20lucas%20revision%20stake%2020.mkv?alt=media&token=809b4de9-d24d-4c76-9949-56015da31d0a",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Lucas NL20",
            uploadDate: "2025-08-25",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
    ],
    "Revisiones Tom": [
        {
            id: "tomnl2",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F820%20tom%20nl2.mkv?alt=media&token=544fbd5c-46cc-4956-ae84-06586512523d",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Tom NL2 20/8",
            uploadDate: "2025-08-20",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "tomnl22",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F13825%20tom%20nl2.mkv?alt=media&token=9ef8a79f-5f13-485b-98c6-392250bbcca1",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Tom NL2 13/8",
            uploadDate: "2025-08-13",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "tomnl23",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F13825%20tom%20nl2%202.mkv?alt=media&token=3043fe7e-f9e1-404e-9ecf-e9649f0b7ae0",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Tom NL2 13/8 pt2",
            uploadDate: "2025-08-14",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
         {
            id: "tomflopz",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2FAnalisis%20mano%20flopzilla%20168.mkv?alt=media&token=4b421fe5-c2eb-414b-866d-d6bf925c4df7",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis mano flopzilla",
            uploadDate: "2025-08-16",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "tomsepnl2",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Ftom%20nl2%20129.mkv?alt=media&token=16acc28b-3375-4ab2-b769-ba20b61a4e99",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis sesion Tom NL2",
            uploadDate: "2025-09-12",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "tomnl10oc",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Frev%20tom%20nl10%20oct.mkv?alt=media&token=e5c01ce6-7dce-4ed7-9ca0-464305287fdd",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis sesion Tom NL10 1/10",
            uploadDate: "2025-10-01",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "tomnl102o44c",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Ftom%20nl10%20210.mkv?alt=media&token=c98aa154-a6ef-41a3-9b28-a5b0119fb7d7",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis sesion Tom NL10 2/10",
            uploadDate: "2025-10-02",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "tomnl102oc2",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Ftom%20nl10%202102.mkv?alt=media&token=892d4322-b869-4fa5-9516-ca23195c0139",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis sesion Tom NL10 3/10",
            uploadDate: "2025-10-03",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "tomnl1nov",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Ftom%20nl10%20nov.mkv?alt=media&token=054ea848-1e2d-49b9-8118-b7229f7113a6",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis sesion Tom NL10 1/11",
            uploadDate: "2025-11-01",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "tomnl1nov2",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F2025-11-05%2015-56-09.mkv?alt=media&token=0249f4ee-b312-4825-a104-03f8974b1233",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis sesion Tom NL20 5/11",
            uploadDate: "2025-11-05",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        
    ],
        "Claves GGPOKER": [
       { 
            id: "clavegg1",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F101%20ggpoker%201.mkv?alt=media&token=39138722-ba34-4eea-a56f-4611f3792b5b", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Claves para ganar en gg 1", 
            uploadDate: "2025-10-01",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
       { 
            id: "clavegg2",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Fggpoker%20select.mkv?alt=media&token=0f57d61a-4fde-460c-9bc9-b3047e56ed2e", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Seleccion de mesas en GGPOKER", 
            uploadDate: "2025-10-02",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
               { 
            id: "clavegg3",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Fggpoker%202.mkv?alt=media&token=f1750d21-95ab-4919-96aa-d30826718f0a", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Claves para ganar en gg 3", 
            uploadDate: "2025-10-03",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
    ],
     "Live Sessions GGPOKER NL50 a 10bb": [
                 {
            id: "gglive501",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Foutput.mkv?alt=media&token=07da0a8a-4e3a-4a8e-bc20-781aae49c5d9",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 1",
            uploadDate: "2025-02-15",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "gglive502",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Fses50.mkv?alt=media&token=18d0ec74-eff4-4585-b054-da1ecab2d3e6",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 2",
            uploadDate: "2025-02-15",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "gglive503",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F2025-02-13%2000-32-24.mkv?alt=media&token=a78fcd06-2c42-4c71-b986-2e819609174b",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 3",
            uploadDate: "2025-02-13",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "gglive504",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F50%20live%20132.mp4?alt=media&token=ab461aff-1407-4323-ba81-50121c68861b",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 4",
            uploadDate: "2025-02-13",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "gglive505",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Fses502.mp4?alt=media&token=4ef5a395-f6b0-4273-b113-ad996669e25f",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 5",
            uploadDate: "2025-02-13",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "gglive506",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F2025-02-13%2021-30-46.mkv?alt=media&token=a8b4af78-484a-46d3-80b5-0603e63a30ea",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 6",
            uploadDate: "2025-02-13",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "gglive507",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F2025-02-13%2023-21-58.mkv?alt=media&token=3923dad1-1487-4c13-a25a-fa1dc86ee8ff",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 7",
            uploadDate: "2025-02-13",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        {
            id: "gglive508",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F2025-02-15%2009-16-12.mkv?alt=media&token=5f6219ef-f038-42ee-ac1a-68c919ed0133",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 8",
            uploadDate: "2025-02-15",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
    ],
        "Live Sessions ACR": [
       { 
            id: "LiveACR608",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Facr%2068.mkv?alt=media&token=7eceee43-83be-4dc9-aead-adee14d2d97b", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Sesion NL10 ACR 6/8", 
            uploadDate: "2025-08-06",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
               { 
            id: "LiveACR708",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2F7825%20acr10.mkv?alt=media&token=4dde4800-696a-4ca5-bc9e-1b6f4a84c272", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Sesion NL10 ACR 7/8", 
            uploadDate: "2025-08-07",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        { 
            id: "LiveACR908",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Fmaxtabling%2010%20acr.mkv?alt=media&token=b70ad546-8770-4fe0-af6d-506440ed682d", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Sesion NL10 ACR MAX Multitabling", 
            uploadDate: "2025-11-01",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
    ],
        "Stake BR Challenge": [
       { 
            id: "stakenl2",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Fchallenge%20stake%20nl10.mkv?alt=media&token=0d5d5721-a5a5-4e39-9b96-bcef4f129bc2", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "BR challenge desde $50", 
            uploadDate: "2025-08-22",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
        { 
            id: "stakebr2",
            videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2Fchallenge%202%20228.mkv?alt=media&token=dc7e6893-2a4e-4111-acb8-87f7826a81d4", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "BR challenge desde $50 (2)", 
            uploadDate: "2025-08-23",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:17"
        },
    ],
    "mindset": [
        { id: "microexit", videoUrl: "https://firebasestorage.googleapis.com/v0/b/asdfsadfsdfadfsa.firebasestorage.app/o/Recreacionales%2FSalir%20de%20micros.mkv?alt=media&token=5bbd8123-57eb-4854-b809-11604ea83976", thumbnailUrl: "https://i.gyazo.com/0aa8ee3e7435c06ff696de094ec8fb00.png", title: "Mira esto para salir de micros", uploadDate: "2025-11-1", keyLines: [], hands: [],
            duration: "19:17" },
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
