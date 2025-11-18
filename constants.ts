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
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/12f8348b9556ca78999ca143d56e475d/manifest/video.m3u8",
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
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/c47f1e8ce12896d2f142bc2d40c8b3fc/manifest/video.m3u8",
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
            duration: "19:36"
        },
        { 
            id: "juego-donks",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/d17ed8db6bdb3cfa3060ce59472d5ad3/manifest/video.m3u8", 
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
            duration: "06:01"
        },
    ],
    "Videos Fundamentales": [
            {
            id: "preflopfunda",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/0b1fb1894225fe0ab3eca74cc00f00cd/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/2dc0d0b8fe90cca89bb9d7babea82d2d.png",
            title: "Fundamentos Preflop",
            uploadDate: "2025-11-08",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "25:12"
        },
                    {
            id: "multiwaypots",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/0554853b2998393cf45970a0f0b477c1/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/2dc0d0b8fe90cca89bb9d7babea82d2d.png",
            title: "Fundamentos Multiway 1",
            uploadDate: "2025-11-18",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "69:25"
        },
                            {
            id: "multiwaypots2",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/c756a6ea9c1d28a083abdbb698790b75/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/2dc0d0b8fe90cca89bb9d7babea82d2d.png",
            title: "Fundamentos Multiway 2",
            uploadDate: "2025-11-18",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "66:57"
        },
    ],
    "Revisiones Piero": [
        {
            id: "hudpiero",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/6e6c53679f2eabca84714c40c8ad79cb/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision HUD Piero",
            uploadDate: "2025-09-21",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "90:52"
        },
        {
            id: "revmanospiero",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/ba397426ae81297b622a09eda73b7a93/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Manos Piero 12/8",
            uploadDate: "2025-08-12",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "54:51"
        },
        {
            id: "revmanospiero2",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/39066eb06a4f854ea201515974360c8f/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Manos Deep Ante",
            uploadDate: "2025-08-23",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "113:19"
        },
                {
            id: "revmanospiero3",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/dcac89f4ed1d1f005c917064d6b39ae6/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Manos 11/9",
            uploadDate: "2025-09-11",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "08:18"
        },
        {
            id: "revmanospiero4",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/bbe3b2ba36fa3f380df31b78cb86f89d/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Manos 11/9 p2",
            uploadDate: "2025-09-11",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "17:50"
        },
        {
            id: "revmanospiero5",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/4ee712b3f06154fa18aa1d026d3196b9/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Blind Game",
            uploadDate: "2025-10-11",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "86:00"
        },
        {
            id: "revmanospiero6",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/e9709e57f8424d54d23002f628b79842/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Blind Game 2",
            uploadDate: "2025-10-18",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "87:43"
        },
        {
            id: "revmanospiero7",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/f38688fedbb89fdca5b366562592b005/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "3BP OOP",
            uploadDate: "2025-10-25",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "117:41"
        },
        {
            id: "revmanospiero8",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/e707c622904db9df2137084d5842f8ed/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Probe Opp",
            uploadDate: "2025-10-30",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "125:41"
        },
        {
            id: "revmanospiero9",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/6dfc96b9d7b5b46835935bb00e793d77/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Manos Marcadas 2/11",
            uploadDate: "2025-11-2",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "130:17"
        },
        {
            id: "revmanospiero10",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/90b2b47ce99f422f917156697e9e2b6d/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Probe Opp 6/11",
            uploadDate: "2025-11-6",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "136:30"
        },
         {
            id: "revmanospiero11",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/bd6e775d90e95dc0d78e868a9d1d3928/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "OOP fuera de ciegas 8/11",
            uploadDate: "2025-11-8",
            keyLines: [{ title: "Error audio'", content: "No anda audio hasta el minuto 3" },], 
            hands: [],
            filters: [],
            tables: [],
            duration: "121:23"
        },
                 {
            id: "revmanospiero12",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/22ce69e5feb3f5a0bf2085e39662a32d/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision manos NL25 13/11",
            uploadDate: "2025-11-13",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "130:06"
        },
        {
            id: "revmanospiero13",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/0554853b2998393cf45970a0f0b477c1/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "MWP IP NL25 15/11",
            uploadDate: "2025-11-15",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "120:00"
        },
    ],
        "Revisiones": [
            {
            id: "lucas20",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/dfe77536c9604c1d83be66c6f2410b9b/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Lucas NL20",
            uploadDate: "2025-08-25",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "30:16"
        },
        {
            id: "ranji1",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/dae1b1612368f0244e75f4bb0bf03820/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Ranji NL10 GG",
            uploadDate: "2025-01-01",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "35:37"
        },
    ],
    "Revisiones Tom": [
        {
            id: "tomnl2",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/1979d66a85b56a2c7ece8c0d103f62a8/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Tom NL2 20/8",
            uploadDate: "2025-08-20",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "32:12"
        },
        {
            id: "tomnl22",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/9ff2e43a82e09576286ccdadbe3cfa65/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Tom NL2 13/8",
            uploadDate: "2025-08-13",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "16:54"
        },
        {
            id: "tomnl23",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/af16540df28cefb532d56c172cc1836e/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Revision Tom NL2 13/8 pt2",
            uploadDate: "2025-08-14",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "13:04"
        },
         {
            id: "tomflopz",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/374536b33efe614a6531b7c395a5d61e/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis mano flopzilla",
            uploadDate: "2025-08-16",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "24:49"
        },
        {
            id: "tomsepnl2",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/0b909ae818565455070b197baba28de3/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis sesion Tom NL2",
            uploadDate: "2025-09-12",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "22:36"
        },
        {
            id: "tomnl10oc",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/24363d9393f96d30dd06ce5ee2e672c2/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis sesion Tom NL10 1/10",
            uploadDate: "2025-10-01",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "15:57"
        },
        {
            id: "tomnl102o44c",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/6a43ce808b7e0a8c37d943c513befe73/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis sesion Tom NL10 2/10",
            uploadDate: "2025-10-02",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "18:25"
        },
        {
            id: "tomnl102oc2",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/03b44d312b919b87ee45ab9c1cdee51c/manifest/video.m3u8",
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
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/28c878fe40dc04d387ea6300a807741b/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis sesion Tom NL10 1/11",
            uploadDate: "2025-11-01",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "33:38"
        },
        {
            id: "tomnl1nov2",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/39584d12b6002c630d1930157c7fe190/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis sesion Tom NL20 5/11",
            uploadDate: "2025-11-05",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "48:42"
        },
                {
            id: "tomnl1nov11",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/98cdb39e4c03e2cfda23f31a5e9613ae/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Analisis sesion Tom NL10 11/11",
            uploadDate: "2025-11-11",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "20:09"
        },
                        {
            id: "tomnl1novtest",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/f0cf81e7db30089d158229770f4c74c4/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/1258cc93dd067fdafdb3b9cb4529c86f.png",
            title: "Test Analisis sesion Tom NL10 11/11",
            uploadDate: "2025-01-01",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "20:09"
        },
        
    ],
        "Claves GGPOKER": [
       { 
            id: "clavegg1",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/c74e76e5e4543d7b8da14756754a3359/manifest/video.m3u8", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Claves para ganar en gg 1", 
            uploadDate: "2025-10-01",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "17:10"
        },
       { 
            id: "clavegg2",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/1a7602e1397bea1e41f81d187a06e7fa/manifest/video.m3u8", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Seleccion de mesas en GGPOKER", 
            uploadDate: "2025-10-02",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "09:57"
        },
               { 
            id: "clavegg3",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/9beacb6b89c10ba5c8aa6da532f31eca/manifest/video.m3u8", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Claves para ganar en gg 3", 
            uploadDate: "2025-10-03",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "38:37"
        },
    ],
     "Live Sessions GGPOKER NL50 a 10bb": [
                 {
            id: "gglive501",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/0ef60d968cae3300b36e51031c59c723/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 1",
            uploadDate: "2025-02-15",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "58:31"
        },
        {
            id: "gglive503",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/08685e096a5fe68f3e67c5ca6051972c/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 3",
            uploadDate: "2025-02-13",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "38:32"
        },
        {
            id: "gglive504",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/6e268257124d1715face8c8bba54e525/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 4",
            uploadDate: "2025-02-13",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "55:49"
        },
        {
            id: "gglive505",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/e890e10abdc84ab76afc322a8318d324/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 5",
            uploadDate: "2025-02-13",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "19:40"
        },
        {
            id: "gglive506",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/a95764426b5b0bfdcb9a4163c737e52a/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 6",
            uploadDate: "2025-02-13",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "17:42"
        },
        {
            id: "gglive507",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/e9c6f3d940fcc50166c1fbdda9b98dfe/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 7",
            uploadDate: "2025-02-13",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "30:42"
        },
        {
            id: "gglive508",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/9b1507901af04b777fec8d7c070ad970/manifest/video.m3u8",
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "GGPOKER LIVE NL50 SH 8",
            uploadDate: "2025-02-15",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "59:45"
        },
    ],
        "Live Sessions ACR": [
       { 
            id: "LiveACR608",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/21c13f5f7ef643fb5b738e676a1100d4/manifest/video.m3u8", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Sesion NL10 ACR 6/8", 
            uploadDate: "2025-08-06",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "17:49"
        },
               { 
            id: "LiveACR708",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/e9e019c530d2d7e5ad42d64ad59ed9d7/manifest/video.m3u8", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Sesion NL10 ACR 7/8", 
            uploadDate: "2025-08-07",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "30:41"
        },
        { 
            id: "LiveACR908",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/15df3d6bfc0673a123b70474a119700c/manifest/video.m3u8", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "Sesion NL10 ACR MAX Multitabling", 
            uploadDate: "2025-11-01",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "31:43"
        },
    ],
        "Stake BR Challenge": [
       { 
            id: "stakenl2",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/5fd55c79959d40e16c355c09e018fa37/manifest/video.m3u8", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "BR challenge desde $50", 
            uploadDate: "2025-08-22",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "177:49"
        },
        { 
            id: "stakebr2",
            videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/55ff126e7982ce1297ba70076b7ad64d/manifest/video.m3u8", 
            thumbnailUrl: "https://i.gyazo.com/3bd9509dab598dcf407d4c4ed0c796a3.png",
            title: "BR challenge desde $50 (2)", 
            uploadDate: "2025-08-23",
            keyLines: [], 
            hands: [],
            filters: [],
            tables: [],
            duration: "121:02"
        },
    ],
    "mindset": [
        { id: "microexit", videoUrl: "https://customer-wlquyk7u6e3ndwhe.cloudflarestream.com/0f9a2870b63dad410fd0821600cc2b61/manifest/video.m3u8", thumbnailUrl: "https://i.gyazo.com/0aa8ee3e7435c06ff696de094ec8fb00.png", title: "Mira esto para salir de micros", uploadDate: "2025-11-1", keyLines: [], hands: [],
            duration: "15:25" },
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
