/*
 * mapa.js — Mapa automático de matemáticos nodales.
 *
 * Requiere Tree_data.js cargado antes de este archivo.
 * No necesita una lista manual de matemáticos nodales.
 *
 * Regla: el matemático nodal de cada fragmento es el que tiene la mayor
 * coordenada y (el que aparece más abajo en el diagrama).
 *
 * Los enlaces del mapa se deducen de los portales kind: "link" declarados
 * en trees. Son rutas de navegación, no relaciones académicas.
 */

(function initializeNodalMap() {
    "use strict";

    const svg = document.getElementById("nodalMap");
    const edgeGroup = document.getElementById("mapEdges");
    const nodeGroup = document.getElementById("mapNodes");
    const searchInput = document.getElementById("nodeSearch");
    const clearButton = document.getElementById("clearNodeSearch");
    const mapStatus = document.getElementById("mapStatus");
    const nodeCount = document.getElementById("nodeCount");
    /* const fragmentCount = document.getElementById("fragmentCount"); */
    const emptyState = document.getElementById("mapEmpty");
    const mapViewport = document.getElementById("mapViewport");

    const required = [
        svg, edgeGroup, nodeGroup, searchInput, clearButton,
        mapStatus, nodeCount, emptyState
    ];

    if (required.some(element => !element)) {
        console.error("Faltan elementos HTML necesarios para mapa.js.");
        return;
    }

    if (typeof trees === "undefined" || !Object.keys(trees).length) {
        mapStatus.textContent = "No se encontró Tree_data.js o no contiene fragmentos.";
        console.error("No se encontró el objeto global 'trees'.");
        return;
    }

    const SVG_NS = "http://www.w3.org/2000/svg";
    const NODE_WIDTH = 250;
    const NODE_HEIGHT = 112;
    const X_GAP = 340;
    const TOP_MARGIN = 100;
    const COMPONENT_GAP = 170;

    function normalize(value) {
        return String(value ?? "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("es")
            .trim();
    }

    function svgElement(tag, attributes = {}, textContent = null) {
        const element = document.createElementNS(SVG_NS, tag);
        Object.entries(attributes).forEach(([name, value]) => {
            element.setAttribute(name, String(value));
        });
        if (textContent !== null) element.textContent = textContent;
        return element;
    }

    // Encuentra el nodo situado más abajo de cada fragmento.
    function getNodalPerson(tree) {
        if (!Array.isArray(tree.people) || tree.people.length === 0) return null;

        return tree.people.reduce((lowest, person) => {
            if (!lowest) return person;
            return Number(person.y ?? 0) > Number(lowest.y ?? 0)
                ? person
                : lowest;
        }, null);
    }

    const nodalById = new Map();
    const focalByTree = new Map();

    // Una persona compartida en varios fragmentos aparece una sola vez en el mapa.
    for (const [treeId, tree] of Object.entries(trees)) {
        const focal = getNodalPerson(tree);
        if (!focal || !focal.id) continue;

        focalByTree.set(treeId, focal.id);

        if (!nodalById.has(focal.id)) {
            nodalById.set(focal.id, {
                id: focal.id,
                person: focal,
                treeId: treeId,
                treeIds: [treeId]
            });
        } else {
            const existing = nodalById.get(focal.id);
            existing.treeIds.push(treeId);
        }
    }

    const nodalPeople = [...nodalById.values()];

    // Genera los enlaces leyendo los portales del objeto trees.
    const links = [];
    const seenLinks = new Set();

    for (const [sourceTreeId, tree] of Object.entries(trees)) {
        const sourceId = focalByTree.get(sourceTreeId);
        if (!sourceId) continue;

        for (const portal of tree.portals || []) {
            if (portal.kind !== "link" || !trees[portal.target]) continue;

            const targetId = focalByTree.get(portal.target);
            if (!targetId || targetId === sourceId) continue;

            const key = `${sourceId}=>${targetId}`;
            if (seenLinks.has(key)) continue;

            seenLinks.add(key);
            links.push({ source: sourceId, target: targetId });
        }
    }

     // Calcula componentes y niveles sin requerir coordenadas adicionales en data.js.
    function calculateLayout(nodes, directedLinks) {
        const ids = nodes.map(node => node.id);
        const undirected = new Map(ids.map(id => [id, new Set()]));
        const indegree = new Map(ids.map(id => [id, 0]));

        directedLinks.forEach(link => {
            if (!undirected.has(link.source) || !undirected.has(link.target)) return;

            undirected.get(link.source).add(link.target);
            undirected.get(link.target).add(link.source);
            indegree.set(link.target, indegree.get(link.target) + 1);
        });

        const positions = new Map();
        const visited = new Set();
        const roots = ids.filter(id => indegree.get(id) === 0);
        const startOrder = roots.concat(ids.filter(id => !roots.includes(id)));

        let yOffset = 0;
        let maxWidth = 900;

        for (const start of startOrder) {
            if (visited.has(start)) continue;

            // Identificar el componente.
            const component = [];
            const queue = [start];
            const componentSeen = new Set([start]);

            while (queue.length) {
                const current = queue.shift();
                component.push(current);

                for (const neighbor of undirected.get(current)) {
                    if (!componentSeen.has(neighbor)) {
                        componentSeen.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }

            // Encontrar la raíz.
            const componentRoots = component.filter(id =>
                !directedLinks.some(link =>
                    link.target === id && componentSeen.has(link.source)
                )
            );

            const root = componentRoots[0] || start;

            // Calcular niveles.
            const depths = new Map([[root, 0]]);
            const levelQueue = [root];

            while (levelQueue.length) {
                const current = levelQueue.shift();

                for (const neighbor of undirected.get(current)) {
                    if (!depths.has(neighbor)) {
                        depths.set(neighbor, depths.get(current) + 1);
                        levelQueue.push(neighbor);
                    }
                }
            }

            const levels = new Map();

            component.forEach(id => {
                const depth = depths.get(id) ?? 0;

                if (!levels.has(depth)) levels.set(depth, []);
                levels.get(depth).push(id);
                visited.add(id);
            });

            const maxDepth = Math.max(...depths.values());
            const maxLevelSize = Math.max(
                ...[...levels.values()].map(level => level.length)
            );

            // Dimensiones del componente.
            const componentWidth = Math.max(
                700,
                (maxLevelSize - 1) * X_GAP + NODE_WIDTH + 200
            );

            const componentHeight = Math.max(
                480,
                maxDepth * X_GAP + 2 * TOP_MARGIN
            );

            // Distribución: raíz abajo y descendientes hacia arriba.
            for (const [depth, levelIds] of levels) {
                levelIds.sort((a, b) =>
                    nodalById.get(a).person.name.localeCompare(
                        nodalById.get(b).person.name, "es"
                    )
                );

                levelIds.forEach((id, index) => {
                    const x = componentWidth / 2 +
                        (index - (levelIds.length - 1) / 2) * X_GAP;

                    const y = yOffset + componentHeight -
                        TOP_MARGIN - depth * X_GAP;

                    positions.set(id, { x, y });
                });
            }

            maxWidth = Math.max(maxWidth, componentWidth);
            yOffset += componentHeight + COMPONENT_GAP;
        }

        return {
            positions,
            width: maxWidth,
            height: Math.max(560, yOffset + 30)
        };
    }

    const layout = calculateLayout(nodalPeople, links);
    const positionById = layout.positions;

    function fitMapToViewport() {
        const availableWidth = mapViewport.clientWidth;
        const availableHeight = mapViewport.clientHeight;

        const baseWidth = Math.max(availableWidth, 900);
        const baseHeight = baseWidth * layout.height / layout.width;

        const scale = Math.min(
            1,
            availableWidth / baseWidth,
            availableHeight / baseHeight
        );

        svg.style.minWidth = "0";
        svg.style.width = `${baseWidth * scale}px`;
        svg.style.height = `${baseHeight * scale}px`;
        svg.style.margin = "0 auto";
    }

    function drawLinks() {
        links.forEach(link => {
            const from = positionById.get(link.source);
            const to = positionById.get(link.target);
            if (!from || !to) return;

            const startY = from.y - NODE_HEIGHT / 2;
            const endY = to.y + NODE_HEIGHT / 2;

            const controlOffset = Math.max(
                55,
                (startY - endY) * 0.42
            );

            const path = svgElement("path", {
                d: `M ${from.x} ${startY}
                    C ${from.x} ${startY - controlOffset},
                      ${to.x} ${endY + controlOffset},
                      ${to.x} ${endY}`,
                class: "map-edge"
            });

            edgeGroup.appendChild(path);

            const label = svgElement("text", {
                x: (from.x + to.x) / 2,
                y: (startY + endY) / 2 - 12,
                class: "map-edge-label"
            }, "ir al fragmento");

            edgeGroup.appendChild(label);
        });
    }

    function openGenealogy(record) {
        const params = new URLSearchParams();
        params.set("tree", record.treeId);
        params.set("node", record.id);
        window.location.href = `visor.html?${params.toString()}`;
    }

    function drawNodes() {
        nodalPeople.forEach(record => {
            const position = positionById.get(record.id);
            if (!position) return;

            const group = svgElement("g", {
                class: "map-node",
                transform: `translate(${position.x - NODE_WIDTH / 2}, ${position.y - NODE_HEIGHT / 2})`,
                tabindex: "0",
                role: "link",
                "aria-label": `Abrir genealogía de ${record.person.name}`,
                "data-id": record.id
            });

            group.appendChild(svgElement("rect", {
                width: NODE_WIDTH,
                height: NODE_HEIGHT,
                rx: 13
            }));

            /*group.appendChild(svgElement("text", {
                x: NODE_WIDTH / 2,
                y: 25,
                class: "node-kicker"
            }, "MATEMÁTICO NODAL"));*/

            group.appendChild(svgElement("text", {
                x: NODE_WIDTH / 2,
                y: 56,
                class: "node-name"
            }, record.person.name));

            const fragmentText = record.treeIds.length === 1
                ? "1 fragmento de genealogía"
                : `${record.treeIds.length} fragmentos disponibles`;

            group.appendChild(svgElement("text", {
                x: NODE_WIDTH / 2,
                y: 83,
                class: "node-detail"
            }, fragmentText));

            group.addEventListener("click", () => openGenealogy(record));
            group.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openGenealogy(record);
                }
            });

            nodeGroup.appendChild(group);
        });
    }

    function renderMap() {
        edgeGroup.innerHTML = "";
        nodeGroup.innerHTML = "";

        svg.setAttribute("viewBox", `0 0 ${layout.width} ${layout.height}`);
        svg.setAttribute("width", layout.width);
        svg.setAttribute("height", layout.height);

        drawLinks();
        drawNodes();

        nodeCount.textContent = `${nodalPeople.length} matemáticos nodales`;
        /* fragmentCount.textContent = `${Object.keys(trees).length} fragmentos`; */
        mapStatus.textContent = `${nodalPeople.length} nodos · ${links.length} rutas de navegación`;

        applySearch();
    }

    function applySearch() {
        const query = normalize(searchInput.value);
        let matches = 0;

        nodeGroup.querySelectorAll(".map-node").forEach(node => {
            const record = nodalById.get(node.dataset.id);
            const searchable = normalize([
                record.person.name,
                record.id,
                ...record.treeIds,
                ...record.treeIds.map(treeId => trees[treeId].label || "")
            ].join(" "));

            const isMatch = Boolean(query) && searchable.includes(query);
            const isDim = Boolean(query) && !isMatch;

            node.classList.toggle("is-dim", isDim);
            node.classList.toggle("is-match", isMatch);

            if (!query || isMatch) matches += 1;
        });

        emptyState.hidden = matches !== 0;
        mapStatus.textContent = query
            ? `${matches} de ${nodalPeople.length} nodos encontrados`
            : `${nodalPeople.length} nodos · ${links.length} rutas de navegación`;
    }

    searchInput.addEventListener("input", applySearch);
    clearButton.addEventListener("click", () => {
        searchInput.value = "";
        applySearch();
        searchInput.focus();
    });

    if (nodalPeople.length === 0) {
        mapStatus.textContent = "No hay fragmentos con matemáticos nodales.";
        emptyState.hidden = false;
        return;
    }

    renderMap();
    fitMapToViewport();
})();
