const $ = (s, r = document) => r.querySelector(s);
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const root = document.documentElement;
const css = v => getComputedStyle(root).getPropertyValue(v).trim();

/* ---------- Thème clair / sombre ---------- */
let saved = null;
try { saved = localStorage.getItem("portfolio-theme"); } catch (e) {}
root.dataset.theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
let PAL = [];
const pal = () => { PAL = ["--saf", "--ter", "--mag", "--teal"].map(css); };
$("#theme-toggle").onclick = () => {
  const n = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = n;
  try { localStorage.setItem("portfolio-theme", n); } catch (e) {}
  pal(); drawDrift();
};

/* ---------- Machine à écrire ---------- */
const words = [
  "curieuse de tout ce que le numérique peut couvrir.",
  "en recherche d’un stage dès le 8 mars 2027.",
  "passionnée par la donnée, le web et les réseaux."
];
let wi = 0, ci = 0, del = false;
function type() {
  const el = $("#typewriter"), w = words[wi];
  if (RM) { el.textContent = w; return; }
  ci += del ? -1 : 1;
  el.textContent = w.slice(0, ci);
  if (!del && ci === w.length) { del = true; return setTimeout(type, 1800); }
  if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; }
  setTimeout(type, del ? 25 : 45);
}

/* ---------- Données du portfolio ---------- */
const TL = [
  ["2024", "Bac STMG", "Mention Bien, major de promotion"],
  ["2024 – 2025", "BUT Informatique, 1re année", "IUT de Créteil-Vitry"],
  ["2025 – 2026", "BUT 2, parcours AGED", "Données, web, algorithmes, réseaux"],
  ["Avril – Juin 2026", "Stage en Malaisie", "Data drift et monitoring · CeRDaS, Universiti Teknologi PETRONAS"],
  ["2026 – 2027", "BUT 3", "Dernière ligne droite"],
  ["8 mars 2027", "Mon prochain stage", "À écrire, peut-être avec vous"]
];
const CATCOL = { Data: "--teal", Web: "--ter", Algo: "--mag", "Réseau": "--saf", Conception: "--tx", Automatisation: "--saf" };
const P = [
  { t: "Monitoring de data drift", k: 1, c: ["Data", "Automatisation"], l: ["Python"], d: "Détection de dérive sur des données de capteurs : scripts modulaires pour automatiser l’analyse et les contrôles qualité, avec un tableau de bord Streamlit.", s: "KS-test · PSI · Streamlit · WSL" },
  { t: "Ce portfolio", c: ["Web"], l: ["JavaScript"], d: "Site conçu et codé à la main, sans framework : nom en points animés, simulateur de dérive de données (PSI, KS), mini-jeu, filtres et graphiques générés par les données.", s: "HTML · CSS · JavaScript · Canvas" },
  { t: "Tableau de bord Excel : santé en France", c: ["Data"], l: [], d: "Tableau de bord interactif sur les professionnels de santé (données Assurance Maladie, plus de 259 000 lignes). Nettoyage des données, tableaux croisés dynamiques, segments et graphiques, avec une note sur les limites des données.", s: "Excel · Power Query · TCD · Segments" },
  { t: "Tableaux de bord Power BI", c: ["Data"], l: ["SQL"], d: "Dans deux matières, des tableaux de bord construits sur un modèle de données en étoile (par exemple des magasins et leurs tickets de caisse), avec des visuels interactifs.", s: "Power BI · Modélisation en étoile · Tableaux de bord" },
  { t: "Données océaniques", c: ["Data", "Web"], l: ["Python", "SQL", "PHP", "JavaScript"], d: "De la donnée brute NetCDF (API Copernicus Marine) à une appli PHP en MVC avec cartes interactives.", s: "NetCDF · MySQL · PDO · Leaflet" },
  { t: "Données environnementales", c: ["Data", "Automatisation"], l: ["Python", "SQL"], d: "Mon premier projet en Agile : données hydrologiques de l’API Hub’eau, importées automatiquement par script et stockées en base.", s: "Hub’eau · JSON · SQLite · DBeaver" },
  { t: "Réseau de stations Vélib’", c: ["Algo", "Data"], l: ["Python"], d: "Un réseau réel traduit en graphe, puis optimisé et visualisé sur une carte interactive.", s: "Delaunay · Kruskal · SciPy · Folium" },
  { t: "Analyse de données de santé", c: ["Data", "Web"], l: ["Python", "SQL"], d: "Exploration de la base publique Ameli, visualisations et petite appli de consultation avec filtres.", s: "Pandas · Matplotlib · Flask · SQLite" },
  { t: "Carte interactive de cinémas", c: ["Data"], l: ["Python"], d: "Scraping de séances sur AlloCiné, puis carte Folium des salles.", s: "Scraping · Folium" },
  { t: "Séries temporelles", c: ["Data"], l: ["Python"], d: "Décomposition saisonnière de données de consommation énergétique.", s: "Tendance · Saisonnalité" },
  { t: "Cryptographie AES", c: ["Réseau"], l: ["Python"], d: "Implémentation de l’algorithme de chiffrement AES.", s: "AES · Python" },
  { t: "Topologie multi-VLAN", c: ["Réseau"], l: [], d: "Routage inter-VLAN et RIP v2 simulés sous Packet Tracer.", s: "Packet Tracer · RIP v2" },
  { t: "Microservices", c: ["Conception", "Web"], l: ["Java", "Python"], d: "Une API Spring Boot/MongoDB couplée à un service Flask.", s: "Spring Boot · MongoDB · Flask" },
  { t: "Pattern Composite", c: ["Conception"], l: ["Java"], d: "Implémentation du pattern Composite, testée avec JUnit.", s: "Java · JUnit · IntelliJ" },
  { t: "Workflow de commande de pizza", c: ["Conception"], l: ["JavaScript"], d: "Processus modélisé en BPMN puis exécuté sur Camunda Platform 8.", s: "BPMN · Camunda 8 · Node.js" },
  { t: "Modélisation de bases de données", c: ["Conception", "Data"], l: ["SQL"], d: "Dépendances fonctionnelles, 3NF et BCNF.", s: "3NF · BCNF" }
];
$("[data-k=p]").dataset.n = P.length;
$("[data-k=l]").dataset.n = new Set(P.flatMap(p => p.l)).size;

/* ---------- Rendu : parcours ---------- */
const cyc = ["--saf", "--ter", "--teal", "--mag"];
$("#tl").innerHTML = TL.map((e, i) =>
  `<div class="rv" style="--c:var(${cyc[i % 4]});--d:${i * .08}s"><small>${e[0]}</small><b>${e[1]}</b><span>${e[2]}</span></div>`).join("");

/* ---------- Rendu : projets (filtre par thème ou langage) ---------- */
const cats = ["Data", "Automatisation", "Web", "Algo", "Réseau", "Conception"];
let F = "Tous";
function setF(f) { F = f; renderP(); }
function renderP() {
  const base = ["Tous", ...cats];
  $("#chips").innerHTML = (base.includes(F) ? base : [...base, F]).map(c =>
    `<button type="button" aria-pressed="${c === F}" data-f="${c}">${c}</button>`).join("");
  $("#chips").querySelectorAll("button").forEach(b => b.onclick = () => setF(b.dataset.f));
  $("#grid").innerHTML = P.filter(p => F === "Tous" || p.c.includes(F) || p.l.includes(F)).map((p, i) =>
    `<article class="card" style="--c:var(${CATCOL[p.c[0]]});transition-delay:${i * .04}s"><small>${p.k ? "★ STAGE · " : ""}${p.c.join(" · ")}</small><h3>${p.t}</h3><p>${p.d}</p><div class="chips">${p.s.split(" · ").map(x => `<span>${x}</span>`).join("")}</div></article>`).join("");
  if (F === "Tous") $("#grid").insertAdjacentHTML("beforeend", '<article class="card more"><small>ET LE RESTE</small><h3>Plein d’autres TP et projets de groupe</h3><p>C’est l’essence même de ma formation professionnalisante ! Plusieurs de mes matières comptaient énormément de TP et de projets de groupe : tous ne sont pas listés ici. N’hésitez pas à me demander, j’en parle volontiers.</p></article>');
}
renderP();

/* ---------- Rendu : compétences = données de mes propres projets ---------- */
const cnt = {};
P.forEach(p => p.l.forEach(l => cnt[l] = (cnt[l] || 0) + 1));
const rank = Object.entries(cnt).sort((a, b) => b[1] - a[1]);
$("#bars").innerHTML = rank.map(([l, n], i) =>
  `<button class="bar" type="button" data-l="${l}" style="--c:var(${cyc[i % 4]});--w:${n / rank[0][1] * 100}%;--d:${i * .1}s"><b>${l}</b><i></i><em>${n} / ${P.length}</em></button>`).join("");
$("#bars").querySelectorAll(".bar").forEach(b => b.onclick = () => { setF(b.dataset.l); $("#projets").scrollIntoView(); });

/* ---------- Apparition au scroll + compteurs ---------- */
function count() {
  document.querySelectorAll("[data-n]").forEach(el => {
    const n = +el.dataset.n, t0 = performance.now();
    const f = t => {
      const k = RM ? 1 : Math.min(1, (t - t0) / 1300);
      el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  });
}
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  io.unobserve(e.target);
  if (e.target.classList.contains("stats")) count();
}), { threshold: .15 });
document.querySelectorAll(".rv,.stats").forEach(el => io.observe(el));
addEventListener("scroll", () => {
  const h = root.scrollHeight - innerHeight;
  $("#bar").style.width = (h > 0 ? scrollY / h * 100 : 0) + "%";
}, { passive: true });

/* ---------- Ouverture : mon nom s’assemble en points de données ---------- */
const bg = $("#bg"), bx = bg.getContext("2d");
let W, H, mx = -999, my = -999, PT = [], G = 5;
bg.addEventListener("pointermove", e => { const r = bg.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
bg.addEventListener("pointerleave", () => { mx = my = -999; });
bg.addEventListener("click", () => PT.forEach(p => { p.vx = (Math.random() - .5) * 60; p.vy = (Math.random() - .8) * 50; }));
function build() {
  W = bg.width = bg.clientWidth; H = bg.height = bg.clientHeight;
  G = W < 600 ? 4 : 5;
  const o = document.createElement("canvas"); o.width = W; o.height = H;
  const c = o.getContext("2d");
  c.font = '700 100px "Cormorant Garamond", Georgia, serif';
  const fs = Math.min(100 * W * .92 / c.measureText("Erinn-Julia").width, H * .46);
  c.font = '700 ' + fs + 'px "Cormorant Garamond", Georgia, serif';
  c.textAlign = "center"; c.textBaseline = "middle";
  c.fillText("Erinn-Julia", W / 2, H * .3); c.fillText("Dupuy", W / 2, H * .76);
  const d = c.getImageData(0, 0, W, H).data;
  PT = [];
  for (let y = 0; y < H; y += G) for (let x = 0; x < W; x += G)
    if (d[(y * W + x) * 4 + 3] > 128) PT.push({ x: Math.random() * W, y: H + Math.random() * 200, tx: x, ty: y, vx: 0, vy: 0, c: Math.min(3, Math.floor(x / W * 4)) });
  if (RM) PT.forEach(p => { p.x = p.tx; p.y = p.ty; });
}
function frame() {
  bx.clearRect(0, 0, W, H);
  for (const p of PT) {
    p.vx += (p.tx - p.x) * .035; p.vy += (p.ty - p.y) * .035;
    const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
    if (d < 110) { p.vx += dx / (d || 1) * 4; p.vy += dy / (d || 1) * 4; }
    p.vx *= .84; p.vy *= .84; p.x += p.vx; p.y += p.vy;
    bx.fillStyle = PAL[p.c];
    bx.fillRect(p.x, p.y, G - 1.5, G - 1.5);
  }
  requestAnimationFrame(frame);
}

/* ---------- Data lab : PSI et KS en direct ---------- */
let seed = 7;
const rnd = () => { seed = seed + 0x6D2B79F5 | 0; let x = Math.imul(seed ^ seed >>> 15, 1 | seed); x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x; return ((x ^ x >>> 14) >>> 0) / 4294967296; };
const Z = Array.from({ length: 800 }, () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(6.2832 * rnd()));
const hist = (m, s, lo, hi, nb) => {
  const h = Array(nb).fill(0);
  Z.forEach(z => { const i = Math.floor((z * s + m - lo) / (hi - lo) * nb); h[Math.min(nb - 1, Math.max(0, i))]++; });
  return h.map(v => v / Z.length);
};
const dc = $("#drift"), dx = dc.getContext("2d");
function drawDrift() {
  const m = +$("#mu").value, s = +$("#sd").value, nb = 16;
  $("#o1").textContent = "+" + m.toFixed(2) + " σ";
  $("#o2").textContent = "× " + s.toFixed(2);
  const r = hist(0, 1, -4, 4, nb), c = hist(m, s, -4, 4, nb);
  const psi = r.reduce((a, e, i) => { const x = Math.max(c[i], 1e-4), y = Math.max(e, 1e-4); return a + (x - y) * Math.log(x / y); }, 0);
  const R = hist(0, 1, -6, 6, 120), C = hist(m, s, -6, 6, 120);
  let a = 0, b = 0, ks = 0;
  R.forEach((v, i) => { a += v; b += C[i]; ks = Math.max(ks, Math.abs(a - b)); });
  $("#psi").textContent = psi.toFixed(3);
  $("#ks").textContent = ks.toFixed(3);
  const lv = psi >= .25 ? 2 : (psi >= .1 || ks > .068) ? 1 : 0;
  const col = [css("--teal"), css("--saf"), css("--mag")][lv];
  const v = $("#verdict");
  v.textContent = ["Stable : rien à signaler.", "À surveiller : début de dérive.", "Dérive détectée : on déclenche l’alerte."][lv];
  v.style.setProperty("--c", col);
  const w = dc.width, h = dc.height, pad = 28, bw = (w - 2 * pad) / nb, base = h - 34, k = (base - 24) / .36;
  dx.clearRect(0, 0, w, h);
  dx.globalAlpha = 1; dx.lineWidth = 1.5;
  for (let i = 0; i < nb; i++) {
    dx.globalAlpha = .8; dx.fillStyle = col;
    dx.fillRect(pad + i * bw + 2, base - c[i] * k, bw - 4, c[i] * k);
    dx.globalAlpha = 1; dx.strokeStyle = css("--tx");
    dx.strokeRect(pad + i * bw + 2, base - r[i] * k, bw - 4, r[i] * k);
  }
  dx.strokeStyle = css("--mu"); dx.beginPath(); dx.moveTo(pad, base); dx.lineTo(w - pad, base); dx.stroke();
  dx.font = "12px JetBrains Mono, monospace"; dx.fillStyle = css("--mu");
  dx.fillText("contour : référence", pad, h - 12);
  dx.fillStyle = col; dx.fillText("plein : données actuelles", w / 2 - 20, h - 12);
}
$("#mu").oninput = $("#sd").oninput = drawDrift;
$("#sim").onclick = () => {
  const t0 = performance.now();
  const f = now => {
    const k = RM ? 1 : Math.min(1, (now - t0) / 2600);
    $("#mu").value = 1.6 * k; $("#sd").value = 1 + .4 * k;
    drawDrift();
    if (k < 1) requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
};

/* ---------- Mini-jeu : nettoyer le flux (et automatiser) ---------- */
const belt = $("#belt"), BH = 280, RH = 30;
let rows = [], lastOk = "", auto = false, st = { cp: 0, dp: 0, ca: 0, fa: 0, au: 0 }, lastT = 0, spawnT = 0;
function spawn() {
  const r = Math.random(), id = "capteur_" + String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");
  let txt, dirty = true;
  if (r < .1) txt = id + " · NaN";
  else if (r < .2) txt = id + " · " + (Math.random() < .5 ? "-999" : "999");
  else if (r < .3 && lastOk) txt = lastOk;
  else { txt = id + " · " + (10 + Math.random() * 30).toFixed(1); dirty = false; lastOk = txt; }
  const el = document.createElement("div");
  el.textContent = txt; el.style.transform = "translateY(" + -RH + "px)";
  belt.appendChild(el); rows.push({ el, y: -RH, dirty });
}
function kill(r, manual) {
  r.el.remove(); rows.splice(rows.indexOf(r), 1);
  if (!manual) st.au++; else if (r.dirty) st.ca++; else st.fa++;
}
belt.onclick = e => { const r = rows.find(x => x.el === e.target); if (r) kill(r, true); };
function game(now) {
  const dt = Math.min(.05, (now - lastT) / 1000 || 0); lastT = now;
  if ((spawnT -= dt) <= 0) { spawn(); spawnT = .75; }
  for (const r of rows.slice()) {
    r.y += 70 * dt;
    if (auto && r.dirty && r.y > 10) { kill(r, false); continue; }
    if (r.y > BH) { r.dirty ? st.dp++ : st.cp++; r.el.remove(); rows.splice(rows.indexOf(r), 1); continue; }
    r.el.style.transform = "translateY(" + r.y + "px)";
  }
  const tot = st.cp + st.dp;
  $("#gq").textContent = (tot ? Math.round(100 * st.cp / tot) : 100) + "%";
  $("#gc").textContent = st.ca + st.au;
  $("#gs").textContent = "Sales passées : " + st.dp + " · Fausses alertes : " + st.fa + " · Nettoyées par le script : " + st.au;
  requestAnimationFrame(game);
}
$("#auto").onclick = e => {
  auto = !auto; st = { cp: 0, dp: 0, ca: 0, fa: 0, au: 0 };
  e.target.textContent = auto ? "Désactiver le script" : "Activer le script";
  e.target.setAttribute("aria-pressed", auto);
};
requestAnimationFrame(game);

/* ---------- Démarrage ---------- */
pal(); drawDrift(); type();
(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { build(); frame(); });
let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(build, 200); });
