/*
 * app.js — Navegador de fragmentos genealógicos
 *
 * Requiere:
 *   1. data.js cargado ANTES que este archivo.
 *   2. Los elementos HTML con estos IDs:
 *      graph, edges, nodes, backBtn, viewLabel, search,
 *      panel, treeBtn y resetBtn.
 *
 * En el HTML, al final de <body>, usa:
 *   <script src="data.js"></script>
 *   <script src="app.js"></script>
 */

(function () {
    "use strict";

    function initializeApp() {
        // Comprobar que data.js se haya cargado correctamente.
        if (typeof trees === "undefined" || typeof initialTree === "undefined") {
            console.error(
                "No se encontraron 'trees' o 'initialTree'. " +
                "Comprueba que data.js esté cargado antes que app.js."
            );
            return;
        }

        const svg = document.getElementById("graph");
        const edgeGroup = document.getElementById("edges");
        const nodeGroup = document.getElementById("nodes");
        const backBtn = document.getElementById("backBtn");
        const viewLabel = document.getElementById("viewLabel");
        const searchInput = document.getElementById("search");
        const panel = document.getElementById("panel");
        const treeBtn = document.getElementById("treeBtn");
        const resetBtn = document.getElementById("resetBtn");
        const legend = document.querySelector(".legend");
        const toolbar = document.querySelector(".toolbar");
        const graphViewport = document.querySelector(".graph-viewport");
        
        const requiredElements = {
            graph: svg,
            edges: edgeGroup,
            nodes: nodeGroup,
            backBtn,
            viewLabel,
            search: searchInput,
            panel,
            treeBtn,
            resetBtn,
            graphViewport,
        };

        const missingElements = Object.entries(requiredElements)
            .filter(([, element]) => !element)
            .map(([id]) => id);

        if (missingElements.length) {
            console.error(
                "Faltan elementos HTML necesarios para app.js:",
                missingElements.join(", ")
            );
            return;
        }

        if (!trees[initialTree]) {
            console.error("El fragmento inicial no existe en data.js:", initialTree);
            return;
        }

        // Estado de navegación.
        let activeTree = initialTree;
        let selected = null;
        let positions = {};
        const history = [];

        const currentTree = () => trees[activeTree];
        const currentPeople = () => currentTree().people;
        const currentEdges = () => currentTree().edges;
        const currentMap = () => currentTree().byId;

        function nodeSize(person) {
            return {
                w: Math.max(112, Math.min(236, person.name.length * 8.1 + 30)),
                h: person.dates ? 54 : 46
            };
        }

        function clipPoint(from, to, size) {
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const scale = 1 / Math.max(
                Math.abs(dx) / (size.w / 2),
                Math.abs(dy) / (size.h / 2),
                0.0001
            );

            return {
                x: from.x + dx * scale,
                y: from.y + dy * scale
            };
        }

        function setTreePositions() {
            positions = {};
            currentPeople().forEach(person => {
                positions[person.id] = {
                    x: person.x,
                    y: person.y
                };
            });
        }

        let zoomLevel = 1;

        function setZoom(nextZoom, event = null) {
            const previousZoom = zoomLevel;

            zoomLevel = Math.max(0.5, Math.min(3, nextZoom));

            if (zoomLevel === previousZoom) return;

            const rect = graphViewport.getBoundingClientRect();

            // Punto sobre el que se aplicará el zoom.
            const localX = event
                ? event.clientX - rect.left
                : graphViewport.clientWidth / 2;

            const localY = event
                ? event.clientY - rect.top
                : graphViewport.clientHeight / 2;

            const pointX = graphViewport.scrollLeft + localX;
            const pointY = graphViewport.scrollTop + localY;

            // Escalar el SVG sin modificar el CSS.
            svg.style.width = `${100 * zoomLevel}%`;
            svg.style.minWidth = `${760 * zoomLevel}px`;

            requestAnimationFrame(() => {
                const ratio = zoomLevel / previousZoom;

                // Mantener el punto del cursor como centro del zoom.
                graphViewport.scrollLeft = pointX * ratio - localX;
                graphViewport.scrollTop = pointY * ratio - localY;
            });
        }

        function scrollGraphToBottom() {
            requestAnimationFrame(() => {
                graphViewport.scrollTop = graphViewport.scrollHeight;
            });
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

        function showInitialPanel() {
            panel.innerHTML =
                '<div class="hint">Selecciona un matemático en el diagrama para abrir su ficha.</div>' +
                '<div class="portrait">∞</div>' +
                '<p class="hint">Los símbolos ∞ sin enlace representan antecedentes no especificados.</p>';
        }

        function renderPersonPanel(id) {
            const person = currentMap()[id];
            if (!person) return;

            const initials = person.name
                .split(/[ .-]/)
                .filter(Boolean)
                .map(part => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

            const worksHTML = Array.isArray(person.works) && person.works.length
                ? `<ul>${person.works.map(work => `<li>${escapeHTML(work)}</li>`).join("")}</ul>`
                : '<p class="hint">Obras pendientes de documentación.</p>';

            const outgoing = currentEdges()
                .filter(([from]) => from === id)
                .map(([, to]) => `→ ${escapeHTML(currentMap()[to]?.name || to)}`);

            const incoming = currentEdges()
                .filter(([, to]) => to === id)
                .map(([from]) => `← ${escapeHTML(currentMap()[from]?.name || from)}`);

            const connections = outgoing.concat(incoming);
            const connectionsHTML = connections.length
                ? connections.map(connection => `<span>${connection}</span>`).join("<br>")
                : "Sin conexiones registradas en este fragmento.";

            const portraitHTML = person.photo /* ++ */
                ? `<img
                class="biography-photo"
                src="${escapeHTML(person.photo)}"
                alt="Retrato de ${escapeHTML(person.name)}"
                loading="lazy"
                  >`
                : `<div class="portrait">${escapeHTML(initials)}</div>`;

            panel.innerHTML = `
                <h2>${escapeHTML(person.name)}</h2>
                <div class="dates">${escapeHTML(person.dates || "Fechas por verificar")}</div>
                ${portraitHTML}
                <span class="tag">${escapeHTML(person.kind || "Matemático")}</span>
                <h3>Biografía</h3>
                <p>${escapeHTML(person.bio || "Biografía pendiente de documentación.")}</p>
                <h3>Obras principales</h3>
                ${worksHTML}
                <h3>Conexiones en este fragmento</h3>
                <p>${connectionsHTML}</p>
            `;

            const photo = panel.querySelector(".biography-photo");
            if (photo) {
                photo.addEventListener("error", () => {
                    const fallback = document.createElement("div");
                    fallback.className = "portrait";
                    fallback.textContent = initials;
                    photo.replaceWith(fallback);
                }, { once: true });
            }
        }

        function drawNodes() {
            currentPeople().forEach(person => {
                const position = positions[person.id];
                const size = nodeSize(person);
                const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

                group.setAttribute(
                    "class",
                    "node" + (selected === person.id ? " selected" : "")
                );
                group.dataset.id = person.id;
                group.setAttribute(
                    "transform",
                    `translate(${position.x - size.w / 2},${position.y - size.h / 2})`
                );

                const rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rectangle.setAttribute("width", size.w);
                rectangle.setAttribute("height", size.h);
                group.appendChild(rectangle);

                const name = document.createElementNS("http://www.w3.org/2000/svg", "text");
                name.setAttribute("x", size.w / 2);
                name.setAttribute("y", person.dates ? 20 : size.h / 2);
                name.textContent = person.name;
                group.appendChild(name);

                if (person.dates) {
                    const dates = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    dates.setAttribute("class", "dates");
                    dates.setAttribute("x", size.w / 2);
                    dates.setAttribute("y", 39);
                    dates.textContent = person.dates;
                    group.appendChild(dates);
                }

                group.addEventListener("click", () => selectPerson(person.id));
                nodeGroup.appendChild(group);
            });
        }

        function drawEdges() {
            currentEdges().forEach(([fromId, toId]) => {
                const fromPosition = positions[fromId];
                const toPosition = positions[toId];
                const fromPerson = currentMap()[fromId];
                const toPerson = currentMap()[toId];

                // Evita errores si una conexión apunta a un nodo inexistente.
                if (!fromPosition || !toPosition || !fromPerson || !toPerson) {
                    console.warn(
                        `Se omitió una conexión inválida: ${fromId} → ${toId}`
                    );
                    return;
                }

                const from = clipPoint(
                    fromPosition,
                    toPosition,
                    nodeSize(fromPerson)
                );
                const to = clipPoint(
                    toPosition,
                    fromPosition,
                    nodeSize(toPerson)
                );

                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", `M${from.x},${from.y} L${to.x},${to.y}`);
                path.setAttribute("class", "edge");
                edgeGroup.appendChild(path);
            });
        }

        function drawPortals() {
            const portals = currentTree().portals || [];

            portals.forEach(portal => {
                const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
                const isLink = portal.kind === "link";

                group.setAttribute(
                    "class",
                    "node infinity" + (isLink ? " portal-link" : " portal-unknown")
                );
                group.setAttribute(
                    "transform",
                    `translate(${portal.x - 54},${portal.y})`
                );

                const rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rectangle.setAttribute("width", "108");
                rectangle.setAttribute("height", "40");
                group.appendChild(rectangle);

                const infinity = document.createElementNS("http://www.w3.org/2000/svg", "text");
                infinity.setAttribute("x", "54");
                infinity.setAttribute("y", "21");
                infinity.textContent = "∞";
                group.appendChild(infinity);

                const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
                title.textContent = isLink
                    ? `Abrir ${portal.target}`
                    : "Antecedentes no especificados";
                group.appendChild(title);

                if (isLink) {
                    group.style.cursor = "pointer";
                    group.setAttribute("role", "button");
                    group.setAttribute("tabindex", "0");

                    const openTarget = event => {
                        if (event) event.stopPropagation();
                        showTree(portal.target, portal.targetNode || null, true);
                    };

                    group.addEventListener("click", openTarget);
                    group.addEventListener("keydown", event => {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openTarget(event);
                        }
                    });
                } else {
                    // Un infinito de tipo "unknown" es solo una marca visual,
                    // no conduce a otro fragmento.
                    group.style.cursor = "default";
                }

                nodeGroup.appendChild(group);
            });
        }

        function updateViewBox() {
            const people = currentPeople();
            const portals = currentTree().portals || [];

            const maxX = Math.max(
                1120,
                ...people.map(person => positions[person.id].x + nodeSize(person).w / 2 + 70),
                ...portals.map(portal => portal.x + 70)
            );

            const maxY = Math.max(
                900,
                ...people.map(person => positions[person.id].y + nodeSize(person).h / 2 + 65),
                ...portals.map(portal => portal.y + 60)
            );

            svg.setAttribute("viewBox", `0 0 ${maxX} ${maxY}`);
        }

        function draw() {
            edgeGroup.innerHTML = "";
            nodeGroup.innerHTML = "";

            updateViewBox();
            drawEdges();
            drawNodes();
            drawPortals();
            applyFilter(false);
        }

        function selectPerson(id) {
            if (!currentMap()[id]) return;
            selected = id;
            draw();
            renderPersonPanel(id);
        }

        function showTree(treeId, targetNode = null, remember = true) {
            const previousScrollY = window.scrollY;
            
            if (!trees[treeId]) {
                console.error("No existe el fragmento solicitado:", treeId);
                return;
            }

            if (remember && activeTree !== treeId) {
                history.push(activeTree);
            }

            activeTree = treeId;
            selected = null;
            setTreePositions();

            viewLabel.textContent = currentTree().label || treeId;
            searchInput.value = "";
            backBtn.style.display = history.length ? "inline-block" : "none";

            showInitialPanel();
            draw();

            // Cuando el portal especifica un nodo de entrada, lo resaltamos
            // y mostramos su ficha para que la continuidad sea evidente.
            if (targetNode && currentMap()[targetNode]) {
                selectPerson(targetNode);
            }
            scrollGraphToBottom();
            requestAnimationFrame(() => {
                window.scrollTo(0, previousScrollY);
            });
        }

        function goBack() {
            if (!history.length) return;
            const previousTree = history.pop();
            showTree(previousTree, null, false);
        }

        function applyFilter(scrollToMatch = true) {
            const query = searchInput.value.trim().toLocaleLowerCase("es");
            const people = currentPeople();
            let firstMatch = null;

            nodeGroup.querySelectorAll(".node[data-id]").forEach(node => {
                const person = currentMap()[node.dataset.id];
                if (!person) return;

                const matches = Boolean(query) &&
                    person.name.toLocaleLowerCase("es").includes(query);

                node.classList.toggle("dim", Boolean(query) && !matches);
                node.classList.toggle("match", matches);

                if (matches && !firstMatch) firstMatch = node;
            });

            if (query && firstMatch && scrollToMatch) {
                firstMatch.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                });
            }
        }

        function resetCurrentTree() {
            searchInput.value = "";
            selected = null;
            setTreePositions();
            showInitialPanel();
            draw();
            scrollGraphToBottom();
        }

        // Controles de la interfaz.
        backBtn.addEventListener("click", goBack);

        searchInput.addEventListener("input", () => applyFilter(true));

        resetBtn.addEventListener("click", resetCurrentTree);

        treeBtn.addEventListener("click", () => {
            if (!legend) return;

            const isSticky = toolbar &&
                ["sticky", "fixed"].includes(getComputedStyle(toolbar).position);

            const offset = isSticky
                ? toolbar.getBoundingClientRect().height - 8
                : -8;

            const target = legend.getBoundingClientRect().top +
                           window.scrollY - offset;

            window.scrollTo({
                top: Math.max(0, target),
                behavior: "smooth"
            });
        });

        graphViewport.addEventListener("wheel", event => {
            // Ctrl + rueda o Cmd + rueda en Mac.
            if (!event.ctrlKey && !event.metaKey) return;
        
            event.preventDefault();

            const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12;

            setZoom(zoomLevel * factor, event);

        }, { passive: false });

        // Desplazamiento del diagrama mediante arrastre del mouse.
        let dragState = null;

        graphViewport.style.cursor = "grab";

        graphViewport.addEventListener("pointerdown", event => {
            if (event.pointerType !== "mouse" || event.button !== 0) return;

            // No iniciar el arrastre sobre matemáticos o infinitos:
            // así sus clics siguen funcionando normalmente.
            if (event.target.closest(".node")) return;

            dragState = {
                pointerId: event.pointerId,
                startX: event.clientX,
                startY: event.clientY,
                scrollLeft: graphViewport.scrollLeft,
                scrollTop: graphViewport.scrollTop
            };

            graphViewport.setPointerCapture(event.pointerId);
        });

        graphViewport.addEventListener("pointermove", event => {
            if (!dragState || event.pointerId !== dragState.pointerId) return;

            const dx = event.clientX - dragState.startX;
            const dy = event.clientY - dragState.startY;

            graphViewport.scrollLeft = dragState.scrollLeft - dx;
            graphViewport.scrollTop = dragState.scrollTop - dy;

            graphViewport.style.cursor = "grabbing";
            event.preventDefault();
        });

        function stopGraphDrag(event) {
            if (!dragState || event.pointerId !== dragState.pointerId) return;

            dragState = null;
            graphViewport.style.cursor = "grab";
        }

        graphViewport.addEventListener("pointerup", stopGraphDrag);
        graphViewport.addEventListener("pointercancel", stopGraphDrag);

        // Iniciar la aplicación en el fragmento señalado por data.js.
        setTreePositions();
        viewLabel.textContent = currentTree().label || activeTree;
        backBtn.style.display = "none";
        showInitialPanel();
        draw();
        scrollGraphToBottom();
    }

    // Permite incluir app.js al final del body o cargarlo con defer desde head.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeApp);
    } else {
        initializeApp();
    }
})();
