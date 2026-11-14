const byId=Object.fromEntries(people.map(p=>[p.id,p]));
const byId2=Object.fromEntries(secondPeople.map(p=>[p.id,p]));
const svg=document.getElementById("graph"),eg=document.getElementById("edges"),ng=document.getElementById("nodes");
let mode="tree",selected=null,positions={},active="main";
const ps=()=>active==="main"?people:secondPeople, es=()=>active==="main"?edges:secondEdges, map=()=>active==="main"?byId:byId2;
function treePositions(){positions={};ps().forEach(p=>positions[p.id]={x:p.x,y:p.y});}

function showMain(){active="main";selected=null;treePositions();document.getElementById("backBtn").style.display="none";document.getElementById("viewLabel").textContent="Distribución reconstruida a partir de la fotografía";document.getElementById("search").value="";document.getElementById("panel").innerHTML='<div class="hint">Selecciona un matemático en el diagrama para abrir su ficha.</div><div class="portrait">∑</div>';draw();window.scrollTo({top:0,behavior:"smooth"});}
function showSecond(){active="second";selected=null;treePositions();document.getElementById("backBtn").style.display="inline-block";document.getElementById("viewLabel").textContent="Genealogía anterior a Zwinger · segundo árbol";document.getElementById("search").value="";document.getElementById("panel").innerHTML='<div class="hint">Segundo árbol genealógico. Selecciona un nombre para consultar su ficha.</div><div class="portrait">∞</div>';draw();window.scrollTo({top:0,behavior:"smooth"});}
function nodeSize(p){return {w:Math.max(112,Math.min(236,p.name.length*8.1+30)),h:p.dates?54:46};}
function clipPoint(from,to,size){const dx=to.x-from.x,dy=to.y-from.y;const scale=1/Math.max(Math.abs(dx)/(size.w/2),Math.abs(dy)/(size.h/2),0.0001);return {x:from.x+dx*scale,y:from.y+dy*scale};}
function draw(){
 eg.innerHTML="";ng.innerHTML="";
 const peopleNow=ps(), positionsNow=positions;
 const maxX=Math.max(1120,...peopleNow.map(p=>positionsNow[p.id].x+nodeSize(p).w/2+70));
 const maxY=Math.max(active==="main"?1500:1620,...peopleNow.map(p=>positionsNow[p.id].y+nodeSize(p).h/2+65));
 svg.setAttribute("viewBox",`0 0 ${maxX} ${maxY}`);
 // Nodes are drawn first so their actual dimensions determine where arrows meet their borders.
 peopleNow.forEach(p=>{const pos=positionsNow[p.id],sz=nodeSize(p),g=document.createElementNS("http://www.w3.org/2000/svg","g");g.setAttribute("class","node"+(selected===p.id?" selected":""));g.dataset.id=p.id;g.setAttribute("transform",`translate(${pos.x-sz.w/2},${pos.y-sz.h/2})`);const r=document.createElementNS("http://www.w3.org/2000/svg","rect");r.setAttribute("width",sz.w);r.setAttribute("height",sz.h);g.appendChild(r);const t=document.createElementNS("http://www.w3.org/2000/svg","text");t.setAttribute("x",sz.w/2);t.setAttribute("y",p.dates?20:sz.h/2);t.textContent=p.name;g.appendChild(t);if(p.dates){const d=document.createElementNS("http://www.w3.org/2000/svg","text");d.setAttribute("class","dates");d.setAttribute("x",sz.w/2);d.setAttribute("y",39);d.textContent=p.dates;g.appendChild(d);}g.onclick=()=>select(p.id);ng.appendChild(g);});
 es().forEach(([a,b])=>{const A=positionsNow[a],B=positionsNow[b];if(!A||!B)return;const pA=map()[a],pB=map()[b],sA=nodeSize(pA),sB=nodeSize(pB),from=clipPoint(A,B,sA),to=clipPoint(B,A,sB);const path=document.createElementNS("http://www.w3.org/2000/svg","path");path.setAttribute("d",`M${from.x},${from.y} L${to.x},${to.y}`);path.setAttribute("class","edge");eg.appendChild(path);});
 const inf=document.createElementNS("http://www.w3.org/2000/svg","g");inf.setAttribute("class","node infinity");const ix=active==="main"?115:750;inf.setAttribute("transform",`translate(${ix-54},0)`);inf.innerHTML='<rect width="108" height="40"/><text x="54" y="21">∞</text>';if(active==="main")inf.onclick=showSecond;else inf.onclick=showMain;ng.appendChild(inf);
 filter();
}
function select(id){selected=id;const p=map()[id];draw();const initials=p.name.split(/[ .-]/).filter(Boolean).map(x=>x[0]).slice(0,2).join("").toUpperCase();document.getElementById("panel").innerHTML=`<h2>${p.name}</h2><div class="dates">${p.dates||"Fechas por verificar"}</div><div class="portrait">${initials}</div><span class="tag">${p.kind}</span><h3>Biografía</h3><p>${p.bio}</p><h3>Obras principales</h3><p class="hint">Bibliografía pendiente de documentación.</p><h3>Conexiones en tu esquema</h3><p>${es().filter(e=>e[0]===id).map(e=>"→ "+map()[e[1]].name).concat(es().filter(e=>e[1]===id).map(e=>"← "+map()[e[0]].name)).join("<br>")||"Sin conexiones registradas."}</p>`;}
function filter(){const q=document.getElementById("search").value.trim().toLocaleLowerCase("es");document.querySelectorAll(".node[data-id]").forEach(n=>{const p=map()[n.dataset.id],m=!!q&&p.name.toLocaleLowerCase("es").includes(q);n.classList.toggle("dim",!!q&&!m);n.classList.toggle("match",m);});if(q){const p=ps().find(x=>x.name.toLocaleLowerCase("es").includes(q));if(p){const n=document.querySelector(`.node[data-id="${p.id}"]`);if(n)n.scrollIntoView({behavior:"smooth",block:"center",inline:"center"});}}}
document.getElementById("treeBtn").onclick=()=>{treePositions();draw();};
document.getElementById("search").addEventListener("input",filter);
document.getElementById("resetBtn").onclick=()=>{document.getElementById("search").value="";selected=null;treePositions();draw();document.getElementById("panel").innerHTML='<div class="hint">Selecciona un matemático en el diagrama para abrir su ficha.</div><div class="portrait">∑</div>';};
document.getElementById("backBtn").onclick=showMain;
treePositions();draw();
