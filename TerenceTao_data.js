/*
 * data.js — Genealogía artificial de Terence Tao
 *
 * Los índices siguen el orden de exploración desde Terence Tao hacia sus
 * antecesores: tree_1 (más próximo a Tao), tree_2 y tree_3.
 *
 * Los registros personales se declaran una sola vez en TerenceTao_people.
 * Cuando una persona aparece en dos fragmentos, se reutiliza el mismo id y
 * se crea una instancia visual con coordenadas propias mediante spread.
 *
 * Las coordenadas son una reconstrucción aproximada de la fotografía,
 * distribuidas para el lienzo SVG actual (aprox. 1120 × 1620).
 */

const TerenceTao_people = {
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
        id: "tao", name: "Terence Tao", dates: "",
        bio: "Datos biográficos pendientes de documentar.", works: [],
        kind: "Matemático · contemporáneo"
    }
};

// Tao_1: fragmento más próximo a Terence Tao.
const TerenceTao_tree_1 = [
    { ...TerenceTao_people.hilbert,       x: 190, y: 190 },
    { ...TerenceTao_people.steinhaus,     x: 190, y: 440 },
    { ...TerenceTao_people.rajchman,      x: 270, y: 710 },
    { ...TerenceTao_people.mazurkiewicz,  x: 790, y: 430 },
    { ...TerenceTao_people.zygmund,       x: 660, y: 760 },
    { ...TerenceTao_people.stein,         x: 660, y: 1030 },
    { ...TerenceTao_people.tao,           x: 660, y: 1300 }
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
    { ...TerenceTao_people.zaremba,      x: 300, y: 280 },
    { ...TerenceTao_people.voronoi,      x: 760, y: 280 },
    { ...TerenceTao_people.sierpinski,   x: 530, y: 680 },
    { ...TerenceTao_people.mazurkiewicz, x: 530, y: 1050 }
];

const TerenceTao_edges_2 = [
    ["zaremba", "sierpinski"],
    ["voronoi", "sierpinski"],
    ["sierpinski", "mazurkiewicz"]
];

// Fragmento 3: rama de Poisson.
const TerenceTao_tree_3 = [
    { ...TerenceTao_people.poisson,  x: 180, y: 160 },
    { ...TerenceTao_people.chasles,  x: 180, y: 360 },
    { ...TerenceTao_people.darboux,  x: 145, y: 610 },
    { ...TerenceTao_people.picard,   x: 430, y: 610 },
    { ...TerenceTao_people.zaremba,  x: 285, y: 880 }
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
    { ...TerenceTao_people.brashman,  x: 735, y: 270 },
    { ...TerenceTao_people.chebyshev, x: 735, y: 470 },
    { ...TerenceTao_people.markov,    x: 735, y: 670 },
    { ...TerenceTao_people.voronoi,   x: 735, y: 880 }
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
        label: "Terence Tao · fragmento 1",
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
        label: "Terence Tao · fragmento 2",
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
        label: "Terence Tao · rama de Poisson",
        portals: [
            { id: "unknown_poisson", x: 180, y: 70, kind: "unknown" }
        ]
    },

    TerenceTao_tree_4: {
        people: TerenceTao_tree_4,
        edges: TerenceTao_edges_4,
        label: "Terence Tao · rama de Brashman",
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
