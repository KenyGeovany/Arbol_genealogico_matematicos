/*
 * data.js — Genealogía artificial de Terence Tao
 *
 * Los índices siguen el orden de exploración desde Terence Tao hacia sus
 * antecesores: tree_1 (más próximo a Tao), tree_2 y tree_3.
 *
 * Los registros personales se declaran una sola vez en people.
 * Cuando una persona aparece en dos fragmentos, se reutiliza el mismo id y
 * se crea una instancia visual con coordenadas propias mediante spread.
 *
 * Las coordenadas son una reconstrucción aproximada de la fotografía,
 * distribuidas para el lienzo SVG actual (aprox. 1120 × 1620).
 */

const people = {
    poisson: {
        id: "poisson", name: "Poisson", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · identificación por completar"
    },
    chasles: {
        id: "chasles", name: "Chasles", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · identificación por completar"
    },
    darboux: {
        id: "darboux", name: "Darboux", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · identificación por completar"
    },
    picard: {
        id: "picard", name: "Picard", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · identificación por completar"
    },
    zaremba: {
        id: "zaremba", name: "Zaremba", dates: "",
        bio: "El apellido aparece en el esquema; la identificación completa está pendiente de confirmación.", works: [],
        kind: "Matemático · identificación por completar"
    },
    brashman: {
        id: "brashman", name: "Brashman", dates: "",
        bio: "Nombre transcrito del esquema; la identificación completa está pendiente de confirmación.", works: [],
        kind: "Matemático · identificación por completar"
    },
    chebyshev: {
        id: "chebyshev", name: "Chebyshev", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · identificación por completar"
    },
    markov: {
        id: "markov", name: "Markov", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · identificación por completar"
    },
    voronoi: {
        id: "voronoi", name: "Voronoi", dates: "",
        bio: "El apellido aparece en el esquema; la identificación completa está pendiente de confirmación.", works: [],
        kind: "Matemático · identificación por completar"
    },
    sierpinski: {
        id: "sierpinski", name: "Sierpiński", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · identificación por completar"
    },
    mazurkiewicz: {
        id: "mazurkiewicz", name: "S. Mazurkiewicz", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · identificación por completar"
    },
    hilbert: {
        id: "hilbert", name: "David Hilbert", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · identificación por completar"
    },
    steinhaus: {
        id: "steinhaus", name: "H. Steinhaus", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · identificación por completar"
    },
    rajchman: {
        id: "rajchman", name: "A. Rajchman", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · identificación por completar"
    },
    zygmund: {
        id: "zygmund", name: "A. Zygmund", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · identificación por completar"
    },
    stein: {
        id: "stein", name: "Elias Stein", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · identificación por completar"
    },
    tao: {
        id: "tao", name: "Terence Tao", dates: "1975–",
        bio: "Terence Tao es un matemático australiano-estadounidense, conocido por sus contribuciones al análisis armónico, ecuaciones en derivadas parciales, combinatoria y teoría de números.",
        works: ["Nonlinear Dispersive Equations (2006)","An Introduction to Measure Theory (2011)"],
        kind: "Matemático · contemporáneo",
        photo: "images/TerenceTao.png"
    }
};

// Tao_1: fragmento más próximo a Terence Tao.
const TerenceTao_tree_1 = [
    { ...people.hilbert,       x: 190, y: 190 },
    { ...people.steinhaus,     x: 190, y: 440 },
    { ...people.rajchman,      x: 270, y: 710 },
    { ...people.mazurkiewicz,  x: 790, y: 430 },
    { ...people.zygmund,       x: 660, y: 760 },
    { ...people.stein,         x: 660, y: 1030 },
    { ...people.tao,           x: 660, y: 1300 }
];

const TerenceTao_edges_1 = [
    ["hilbert", "steinhaus"],
    ["steinhaus", "rajchman"],
    ["rajchman", "zygmund"],
    ["mazurkiewicz", "rajchman"],
    ["mazurkiewicz", "zygmund"],
    ["zygmund", "stein"],
    ["stein", "tao"]
];

// Tao_2: Zaremba y Voronoi convergen en Sierpiński.
const TerenceTao_tree_2 = [
    { ...people.zaremba,      x: 300, y: 280 },
    { ...people.voronoi,      x: 760, y: 280 },
    { ...people.sierpinski,   x: 530, y: 680 },
    { ...people.mazurkiewicz, x: 530, y: 1050 }
];

const TerenceTao_edges_2 = [
    ["zaremba", "sierpinski"],
    ["voronoi", "sierpinski"],
    ["sierpinski", "mazurkiewicz"]
];

// Fragmento 3: rama de Poisson.
const TerenceTao_tree_3 = [
    { ...people.poisson,  x: 180, y: 160 },
    { ...people.chasles,  x: 180, y: 360 },
    { ...people.darboux,  x: 145, y: 610 },
    { ...people.picard,   x: 430, y: 610 },
    { ...people.zaremba,  x: 285, y: 880 }
];

const TerenceTao_edges_3 = [
    ["poisson", "chasles"],
    ["chasles", "darboux"],
    ["darboux", "picard"],
    ["darboux", "zaremba"],
    ["picard", "zaremba"]
];

// Fragmento 4: rama de Brashman.
const TerenceTao_tree_4 = [
    { ...people.brashman,  x: 735, y: 270 },
    { ...people.chebyshev, x: 735, y: 470 },
    { ...people.markov,    x: 735, y: 670 },
    { ...people.voronoi,   x: 735, y: 880 }
];

const TerenceTao_edges_4 = [
    ["brashman", "chebyshev"],
    ["chebyshev", "markov"],
    ["markov", "voronoi"]
];

/*
 * portales:
 * - kind: "unknown" representa un ∞ sin continuación definida en el esquema.
 * - kind: "link" enlaza con otro fragmento y, cuando procede, con el nodo
 *   compartido que corresponde al punto de entrada.
 *
 * Tao_1 y Tao_2 reutilizan los mismos ids de las personas compartidas.
 */
const trees = {
    TerenceTao_tree_1: {
        people: TerenceTao_tree_1,
        edges: TerenceTao_edges_1,
        label: "Terence Tao",
        portals: [
            { id: "unknown_hilbert", x: 190, y: 90, kind: "unknown" },
            {
                id: "from_mazurkiewicz_to_tree_2",
                x: 790, y: 320,
                kind: "link",
                target: "TerenceTao_tree_2",
                targetNode: "mazurkiewicz"
            }
        ]
    },

    TerenceTao_tree_2: {
        people: TerenceTao_tree_2,
        edges: TerenceTao_edges_2,
        label: "S. Mazurkiewicz",
        portals: [
            {
                id: "zaremba_to_tree_3",
                x: 300, y: 170,
                kind: "link",
                target: "TerenceTao_tree_3",
                targetNode: "zaremba"
            },
            {
                id: "voronoi_to_tree_4",
                x: 760, y: 170,
                kind: "link",
                target: "TerenceTao_tree_4",
                targetNode: "voronoi"
            }
        ]
    },

    TerenceTao_tree_3: {
        people: TerenceTao_tree_3,
        edges: TerenceTao_edges_3,
        label: "Zaremba",
        portals: [
            { id: "unknown_poisson", x: 180, y: 70, kind: "unknown" }
        ]
    },

    TerenceTao_tree_4: {
        people: TerenceTao_tree_4,
        edges: TerenceTao_edges_4,
        label: "Voronoi",
        portals: [
            { id: "unknown_brashman", x: 735, y: 180, kind: "unknown" }
        ]
    }
};

for (const tree of Object.values(trees)) {
    tree.byId = Object.fromEntries(tree.people.map(person => [person.id, person]));
}

// Fragmento inicial al cargar la aplicación.
const initialTree = "TerenceTao_tree_1";
