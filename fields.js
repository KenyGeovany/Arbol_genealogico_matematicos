/*
 * fields.js — Índice de medallistas de la Medalla Fields.
 * Fuente principal de nombres y años: International Mathematical Union (IMU).
 * https://www.mathunion.org/imu-awards/fields-medal
 *
 * Para añadir nuevos medallistas, incorpora registros a fieldsMedalists.
 * Para vincular una genealogía, asigna el nombre exacto del fragmento en `tree`.
 * Si `tree` es null, el registro aparece como "Genealogía en preparación".
 */

const fieldsMedalists = [
    // 2026
    { id: "yu-deng", name: "Yu Deng", year: 2026, areas: ["Ecuaciones diferenciales parciales", "Teoría cinética"], summary: "Derivación rigurosa de la ecuación de Boltzmann desde dinámicas de esferas duras y avances en ecuaciones cinéticas de ondas y dinámica de Schrödinger no lineal.", tree: null },
    { id: "john-pardon", name: "John Pardon", year: 2026, areas: ["Geometría simpléctica", "Topología"], summary: "Nuevos métodos para ciclos fundamentales virtuales, categorías de Fukaya y conteo de curvas holomorfas; también contribuciones a la topología de 3-variedades y teoría de nudos.", tree: null },
    { id: "jacob-tsimerman", name: "Jacob Tsimerman", year: 2026, areas: ["Geometría aritmética", "Geometría algebraica"], summary: "Uso de la o-minimalidad en geometría aritmética y algebraica compleja, con aplicaciones a conjeturas centrales como André–Oort.", tree: null },
    { id: "hong-wang", name: "Hong Wang", year: 2026, areas: ["Análisis armónico", "Teoría geométrica de la medida"], summary: "Avances en suavizado local, restricción de Fourier, conjuntos de distancias de Falconer, conjuntos de Furstenberg y el problema de Kakeya.", tree: null },

    // 2022
    { id: "hugo-duminil-copin", name: "Hugo Duminil-Copin", year: 2022, areas: ["Probabilidad", "Física matemática"], summary: "Resultados fundamentales en percolación y modelos de espines, incluidos modelos relacionados con Ising.", tree: null },
    { id: "june-huh", name: "June Huh", year: 2022, areas: ["Combinatoria", "Geometría algebraica"], summary: "Aplicación de ideas de geometría algebraica, en particular teoría de Hodge, a problemas de combinatoria.", tree: null },
    { id: "james-maynard", name: "James Maynard", year: 2022, areas: ["Teoría analítica de números"], summary: "Nuevos métodos para estudiar la distribución de los números primos, incluidos avances sobre brechas entre primos y números con pocos factores primos.", tree: null },
    { id: "maryna-viazovska", name: "Maryna Viazovska", year: 2022, areas: ["Teoría de números", "Geometría discreta"], summary: "Demostración de la optimalidad del empaquetamiento de esferas en dimensión 8 y contribuciones a problemas relacionados en otras dimensiones.", tree: null },

    // 2018
    { id: "caucher-birkar", name: "Caucher Birkar", year: 2018, areas: ["Geometría algebraica"], summary: "Contribuciones al programa de modelos mínimos y a la clasificación de variedades algebraicas, especialmente variedades de Fano.", tree: null },
    { id: "alessio-figalli", name: "Alessio Figalli", year: 2018, areas: ["Cálculo de variaciones", "Transporte óptimo"], summary: "Resultados en transporte óptimo y ecuaciones diferenciales, con aplicaciones a regularidad y problemas variacionales.", tree: null },
    { id: "peter-scholze", name: "Peter Scholze", year: 2018, areas: ["Geometría aritmética", "Teoría de números"], summary: "Desarrollo de los espacios perfectoid y nuevas herramientas para problemas de geometría aritmética.", tree: null },
    { id: "akshay-venkatesh", name: "Akshay Venkatesh", year: 2018, areas: ["Teoría de números", "Teoría de representación"], summary: "Conexiones profundas entre teoría de números, dinámica, formas automorfas y teoría de representación.", tree: null },

    // 2014
    { id: "artur-avila", name: "Artur Avila", year: 2014, areas: ["Sistemas dinámicos"], summary: "Contribuciones a la teoría de sistemas dinámicos, en particular operadores de Schrödinger cuasiperiódicos y dinámica unidimensional.", tree: null },
    { id: "manjul-bhargava", name: "Manjul Bhargava", year: 2014, areas: ["Teoría de números", "Álgebra"], summary: "Nuevos métodos para contar estructuras aritméticas y estudiar formas de grado superior.", tree: null },
    { id: "martin-hairer", name: "Martin Hairer", year: 2014, areas: ["Análisis estocástico", "Ecuaciones diferenciales parciales"], summary: "Creación de la teoría de estructuras de regularidad para dar sentido a ecuaciones diferenciales parciales estocásticas singulares.", tree: null },
    { id: "maryam-mirzakhani", name: "Maryam Mirzakhani", year: 2014, areas: ["Geometría", "Sistemas dinámicos"], summary: "Estudio de la geometría y dinámica de superficies de Riemann y espacios de módulos.", tree: null },

    // 2010
    { id: "elon-lindenstrauss", name: "Elon Lindenstrauss", year: 2010, areas: ["Teoría ergódica", "Teoría de números"], summary: "Aplicaciones de métodos ergódicos a problemas de teoría de números y equidistribución.", tree: null },
    { id: "ngo-bao-chau", name: "Ngô Bảo Châu", year: 2010, areas: ["Teoría de números", "Programa de Langlands"], summary: "Demostración del lema fundamental, una pieza central del programa de Langlands.", tree: null },
    { id: "stanislav-smirnov", name: "Stanislav Smirnov", year: 2010, areas: ["Probabilidad", "Física matemática"], summary: "Demostraciones de invariancia conforme en modelos de percolación y modelos relacionados de física estadística.", tree: null },
    { id: "cedric-villani", name: "Cédric Villani", year: 2010, areas: ["Análisis", "Transporte óptimo"], summary: "Contribuciones a la teoría cinética, la ecuación de Boltzmann y el transporte óptimo.", tree: null },

    // 2006
    { id: "andrei-okounkov", name: "Andrei Okounkov", year: 2006, areas: ["Teoría de representación", "Geometría", "Probabilidad"], summary: "Conexiones entre teoría de representación, geometría algebraica y probabilidad.", tree: null },
    { id: "grigori-perelman", name: "Grigori Perelman", year: 2006, areas: ["Geometría", "Topología"], summary: "Contribuciones decisivas al flujo de Ricci y a la demostración de la conjetura de Poincaré. Rechazó la medalla.", note: "Rechazó aceptar la Medalla Fields.", tree: null },
    { id: "terence-tao", name: "Terence Tao", year: 2006, areas: ["Análisis armónico", "Ecuaciones diferenciales parciales", "Teoría de números"], summary: "Contribuciones extraordinariamente amplias en análisis armónico, ecuaciones en derivadas parciales, combinatoria y teoría de números.", tree: "TerenceTao_tree_1" },
    { id: "wendelin-werner", name: "Wendelin Werner", year: 2006, areas: ["Probabilidad", "Física matemática"], summary: "Trabajos sobre movimiento browniano, geometría aleatoria y límites de escala de modelos bidimensionales.", tree: null },

    // 2002
    { id: "laurent-lafforgue", name: "Laurent Lafforgue", year: 2002, areas: ["Teoría de números", "Programa de Langlands"], summary: "Demostración de casos importantes de la correspondencia de Langlands para cuerpos de funciones.", tree: null },
    { id: "vladimir-voevodsky", name: "Vladimir Voevodsky", year: 2002, areas: ["Geometría algebraica", "Teoría de homotopía"], summary: "Desarrollo de la teoría de homotopía motivada y demostración de la conjetura de Milnor.", tree: null },

    // 1998
    { id: "richard-borcherds", name: "Richard E. Borcherds", year: 1998, areas: ["Álgebra", "Teoría de números"], summary: "Contribuciones a las álgebras de vértices, formas automorfas y simetrías relacionadas con el retículo de Leech.", tree: null },
    { id: "timothy-gowers", name: "W. Timothy Gowers", year: 1998, areas: ["Análisis funcional", "Combinatoria"], summary: "Resultados en espacios de Banach y avances que impulsaron la combinatoria aditiva moderna.", tree: null },
    { id: "maxim-kontsevich", name: "Maxim Kontsevich", year: 1998, areas: ["Geometría", "Física matemática"], summary: "Contribuciones a la cuantización por deformación, geometría simpléctica y teoría de invariantes.", tree: null },
    { id: "curtis-mcmullen", name: "Curtis T. McMullen", year: 1998, areas: ["Sistemas dinámicos", "Geometría"], summary: "Trabajos en dinámica compleja, geometría hiperbólica y geometría de variedades.", tree: null },

    // 1994
    { id: "jean-bourgain", name: "Jean Bourgain", year: 1994, areas: ["Análisis armónico", "Teoría ergódica", "Ecuaciones diferenciales"], summary: "Resultados fundamentales en análisis armónico, teoría ergódica, espacios de Banach y ecuaciones diferenciales.", tree: null },
    { id: "pierre-louis-lions", name: "Pierre-Louis Lions", year: 1994, areas: ["Ecuaciones diferenciales parciales", "Análisis"], summary: "Contribuciones a ecuaciones diferenciales no lineales, problemas de Hamilton–Jacobi y análisis matemático aplicado.", tree: null },
    { id: "jean-christophe-yoccoz", name: "Jean-Christophe Yoccoz", year: 1994, areas: ["Sistemas dinámicos"], summary: "Resultados profundos en dinámica holomorfa y sistemas dinámicos diferenciables.", tree: null },
    { id: "efim-zelmanov", name: "Efim Zelmanov", year: 1994, areas: ["Álgebra", "Teoría de grupos"], summary: "Resolución del problema restringido de Burnside y contribuciones a álgebras no asociativas.", tree: null },

    // 1990
    { id: "vladimir-drinfeld", name: "Vladimir Drinfeld", year: 1990, areas: ["Geometría algebraica", "Teoría de números"], summary: "Trabajos sobre grupos cuánticos, geometría algebraica y el programa de Langlands.", tree: null },
    { id: "vaughan-jones", name: "Vaughan F. R. Jones", year: 1990, areas: ["Álgebra", "Topología"], summary: "Descubrimiento del polinomio de Jones para nudos y contribuciones a las álgebras de operadores.", tree: null },
    { id: "shigefumi-mori", name: "Shigefumi Mori", year: 1990, areas: ["Geometría algebraica"], summary: "Desarrollo del programa de modelos mínimos en geometría algebraica de variedades de dimensión superior.", tree: null },
    { id: "edward-witten", name: "Edward Witten", year: 1990, areas: ["Física matemática", "Topología"], summary: "Uso de ideas de teoría cuántica de campos para obtener resultados e invariantes matemáticos.", tree: null },

    // 1986
    { id: "simon-donaldson", name: "Simon K. Donaldson", year: 1986, areas: ["Geometría diferencial", "Topología"], summary: "Nuevos invariantes de variedades suaves de dimensión cuatro mediante teoría de Yang–Mills.", tree: null },
    { id: "gerd-faltings", name: "Gerd Faltings", year: 1986, areas: ["Geometría aritmética", "Teoría de números"], summary: "Demostración de la conjetura de Mordell y avances en geometría aritmética.", tree: null },
    { id: "michael-freedman", name: "Michael H. Freedman", year: 1986, areas: ["Topología", "Geometría"], summary: "Clasificación topológica de variedades simplemente conexas de dimensión cuatro y demostración de la conjetura de Poincaré topológica en dimensión cuatro.", tree: null },

    // 1982
    { id: "alain-connes", name: "Alain Connes", year: 1982, areas: ["Álgebra de operadores", "Geometría no conmutativa"], summary: "Contribuciones a las álgebras de operadores y creación de herramientas fundamentales de geometría no conmutativa.", tree: null },
    { id: "william-thurston", name: "William P. Thurston", year: 1982, areas: ["Topología", "Geometría"], summary: "Revolución en la topología de variedades tridimensionales y en la geometría hiperbólica.", tree: null },
    { id: "shing-tung-yau", name: "Shing-Tung Yau", year: 1982, areas: ["Geometría diferencial", "Análisis geométrico"], summary: "Demostración de la conjetura de Calabi y contribuciones centrales a la geometría diferencial.", tree: null },

    // 1978
    { id: "pierre-deligne", name: "Pierre René Deligne", year: 1978, areas: ["Geometría algebraica", "Teoría de números"], summary: "Demostración de las conjeturas de Weil y contribuciones a la teoría de Hodge y las representaciones.", tree: null },
    { id: "charles-fefferman", name: "Charles L. Fefferman", year: 1978, areas: ["Análisis", "Ecuaciones diferenciales"], summary: "Resultados fundamentales en análisis complejo, análisis armónico y ecuaciones diferenciales parciales.", tree: null },
    { id: "gregori-margulis", name: "Gregori A. Margulis", year: 1978, areas: ["Grupos de Lie", "Teoría ergódica"], summary: "Trabajos sobre retículos en grupos de Lie, superrigidez y aplicaciones a problemas de teoría de números.", tree: null },
    { id: "daniel-quillen", name: "Daniel G. Quillen", year: 1978, areas: ["Álgebra", "Topología algebraica"], summary: "Desarrollo de la K-teoría algebraica y contribuciones a la teoría homotópica.", tree: null },

    // 1974
    { id: "enrico-bombieri", name: "Enrico Bombieri", year: 1974, areas: ["Teoría de números", "Análisis"], summary: "Contribuciones a la teoría de números, especialmente al método del tamiz y a problemas de distribución de primos.", tree: null },
    { id: "david-mumford", name: "David Bryant Mumford", year: 1974, areas: ["Geometría algebraica"], summary: "Contribuciones a la teoría de variedades algebraicas y espacios de módulos.", tree: null },

    // 1970
    { id: "alan-baker", name: "Alan Baker", year: 1970, areas: ["Teoría de números", "Teoría de la trascendencia"], summary: "Teoremas sobre formas lineales en logaritmos y consecuencias para ecuaciones diofánticas.", tree: null },
    { id: "heisuke-hironaka", name: "Heisuke Hironaka", year: 1970, areas: ["Geometría algebraica"], summary: "Demostración de la resolución de singularidades en característica cero.", tree: null },
    { id: "serge-novikov", name: "Serge Novikov", year: 1970, areas: ["Topología", "Geometría"], summary: "Contribuciones a la topología algebraica y diferencial, incluida la teoría de foliaciones y la conjetura de Novikov.", tree: null },
    { id: "john-thompson", name: "John Griggs Thompson", year: 1970, areas: ["Álgebra", "Teoría de grupos"], summary: "Contribuciones decisivas a la teoría de grupos finitos, incluida la clasificación de grupos simples finitos.", tree: null },

    // 1966
    { id: "michael-atiyah", name: "Michael F. Atiyah", year: 1966, areas: ["Geometría", "Topología"], summary: "Desarrollo de la teoría K y del teorema del índice junto con Isadore Singer.", tree: null },
    { id: "paul-cohen", name: "Paul J. Cohen", year: 1966, areas: ["Lógica matemática", "Teoría de conjuntos"], summary: "Creación del método de forcing y demostración de la independencia de la hipótesis del continuo y del axioma de elección respecto de ZF.", tree: null },
    { id: "alexander-grothendieck", name: "Alexander Grothendieck", year: 1966, areas: ["Geometría algebraica", "Álgebra"], summary: "Reformulación de la geometría algebraica mediante esquemas y desarrollo de nuevas herramientas cohomológicas.", tree: null },
    { id: "stephen-smale", name: "Stephen Smale", year: 1966, areas: ["Topología", "Sistemas dinámicos"], summary: "Contribuciones a la topología diferencial y a los sistemas dinámicos, incluido el estudio de sistemas estructuralmente estables.", tree: null },

    // 1962
    { id: "lars-hormander", name: "Lars Hörmander", year: 1962, areas: ["Análisis", "Ecuaciones diferenciales parciales"], summary: "Desarrollo de la teoría moderna de operadores diferenciales lineales y distribuciones.", tree: null },
    { id: "john-milnor", name: "John W. Milnor", year: 1962, areas: ["Topología", "Geometría diferencial"], summary: "Descubrimiento de estructuras diferenciables exóticas en esferas de dimensión siete y contribuciones a la topología diferencial.", tree: null },

    // 1958
    { id: "klaus-roth", name: "Klaus F. Roth", year: 1958, areas: ["Teoría de números", "Aproximación diofántica"], summary: "Teorema de Roth sobre aproximación diofántica de números algebraicos.", tree: null },
    { id: "rene-thom", name: "René Thom", year: 1958, areas: ["Topología", "Geometría"], summary: "Contribuciones a la teoría del cobordismo y al desarrollo de la teoría de singularidades.", tree: null },

    // 1954
    { id: "kunihiko-kodaira", name: "Kunihiko Kodaira", year: 1954, areas: ["Geometría algebraica", "Análisis complejo"], summary: "Resultados fundamentales sobre variedades complejas y clasificación de superficies algebraicas.", tree: null },
    { id: "jean-pierre-serre", name: "Jean-Pierre Serre", year: 1954, areas: ["Topología", "Geometría algebraica", "Teoría de números"], summary: "Contribuciones a la topología algebraica, la geometría algebraica y la teoría de números.", tree: null },

    // 1950
    { id: "laurent-schwartz", name: "Laurent Schwartz", year: 1950, areas: ["Análisis funcional"], summary: "Creación de la teoría de distribuciones, que amplió el marco del análisis y de las ecuaciones diferenciales.", tree: null },
    { id: "atle-selberg", name: "Atle Selberg", year: 1950, areas: ["Teoría de números", "Análisis"], summary: "Contribuciones a la teoría analítica de números, la fórmula de traza de Selberg y métodos de cribado.", tree: null },

    // 1936
    { id: "lars-ahlfors", name: "Lars Valerian Ahlfors", year: 1936, areas: ["Análisis complejo", "Geometría"], summary: "Contribuciones a la teoría de funciones de variable compleja y al desarrollo de la teoría de superficies de Riemann.", tree: null },
    { id: "jesse-douglas", name: "Jesse Douglas", year: 1936, areas: ["Cálculo de variaciones", "Geometría"], summary: "Solución del problema de Plateau en su formulación clásica mediante métodos del cálculo de variaciones.", tree: null }
];

(function initializeFieldsIndex() {
    "use strict";

    const searchInput = document.getElementById("fieldsSearch");
    const yearFilter = document.getElementById("yearFilter");
    const areaFilter = document.getElementById("areaFilter");
    const clearButton = document.getElementById("clearFilters");
    const tableBody = document.getElementById("medalistTableBody");
    const resultCount = document.getElementById("resultCount");
    const emptyState = document.getElementById("emptyState");
    const totalCount = document.getElementById("totalCount");
    const latestYear = document.getElementById("latestYear");

    const required = [searchInput, yearFilter, areaFilter, clearButton,
        tableBody, resultCount, emptyState, totalCount, latestYear];
    if (required.some(element => !element)) {
        console.error("Faltan elementos del índice Fields en index.html.");
        return;
    }

    const years = [...new Set(fieldsMedalists.map(person => person.year))]
        .sort((a, b) => b - a);
    const areas = [...new Set(fieldsMedalists.flatMap(person => person.areas))]
        .sort((a, b) => a.localeCompare(b, "es"));

    years.forEach(year => {
        const option = document.createElement("option");
        option.value = String(year);
        option.textContent = String(year);
        yearFilter.appendChild(option);
    });

    areas.forEach(area => {
        const option = document.createElement("option");
        option.value = area;
        option.textContent = area;
        areaFilter.appendChild(option);
    });

    totalCount.textContent = String(fieldsMedalists.length);
    latestYear.textContent = String(Math.max(...years));

    function normalize(value) {
        return String(value ?? "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("es")
            .trim();
    }

    function render() {
        const query = normalize(searchInput.value);
        const year = yearFilter.value;
        const area = areaFilter.value;

        const filtered = fieldsMedalists
            .filter(person => {
                const haystack = normalize([
                    person.name,
                    person.year,
                    person.areas.join(" "),
                    person.summary,
                    person.note || ""
                ].join(" "));

                return (!query || haystack.includes(query)) &&
                    (!year || String(person.year) === year) &&
                    (!area || person.areas.includes(area));
            })
            .sort((a, b) => b.year - a.year || a.name.localeCompare(b.name, "es"));

        tableBody.innerHTML = filtered.map(person => {
            const areasHTML = person.areas
                .map(areaName => `<span class="area-tag">${escapeHTML(areaName)}</span>`)
                .join(" ");
            const genealogyHTML = person.tree
                ? `<a class="genealogy-link" href="visor.html?tree=${encodeURIComponent(person.tree)}">Abrir genealogía <span aria-hidden="true">↗</span></a>`
                : `<span class="genealogy-pending">En preparación</span>`;
            const noteHTML = person.note
                ? `<span class="person-note">${escapeHTML(person.note)}</span>`
                : "";

            return `
                <tr>
                    <td class="year-cell">${person.year}</td>
                    <td class="name-cell">
                        <strong>${escapeHTML(person.name)}</strong>
                        ${noteHTML}
                    </td>
                    <td class="areas-cell">${areasHTML}</td>
                    <td class="summary-cell">${escapeHTML(person.summary)}</td>
                    <td class="genealogy-cell">${genealogyHTML}</td>
                </tr>
            `;
        }).join("");

        resultCount.textContent = `${filtered.length} de ${fieldsMedalists.length} medallistas`;
        emptyState.hidden = filtered.length !== 0;
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);
    }

    searchInput.addEventListener("input", render);
    yearFilter.addEventListener("change", render);
    areaFilter.addEventListener("change", render);
    clearButton.addEventListener("click", () => {
        searchInput.value = "";
        yearFilter.value = "";
        areaFilter.value = "";
        render();
        searchInput.focus();
    });

    render();
})();
