/* ============================================================
   CIDADE EM REVOLUÇÃO — minigame
   Cidade isométrica que evolui pelas revoluções industriais.
   ============================================================ */
(() => {
  "use strict";

  /* ---------- constantes e utilitários ---------- */
  const N = 8, TW = 104, TH = 52, W = 940, H = 600, OX = W / 2, OY = 128;
  const CHAVE = "cidade-industrial-v1";
  const $ = id => document.getElementById(id);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rnd = (a, b) => a + Math.random() * (b - a);

  const hex2rgb = h => { h = h.replace("#", ""); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
  const rgb2css = c => `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
  const shade = (h, f) => { const c = hex2rgb(h), t = f < 0 ? 0 : 255, p = Math.abs(f); return rgb2css(c.map(v => v + (t - v) * p)); };
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

  /* ---------- tipos de construção ---------- */
  const base = { moradia: 0, empregos: 0, prod: 0, energia: 0, poluicao: 0, bem: 0, qual: 0, exigeQual: 0 };
  const mk = (id, o) => ({ id, ...base, ...o });
  const LISTA = [
    mk("casa", { nome: "Casa", emoji: "🏠", era: 0, custo: 40, cor: "#e7c9a0", moradia: 4, bem: 1,
      info: "No início da industrialização, a maior parte das pessoas vivia no campo ou em pequenas vilas. As cidades industriais cresceram com a migração de gente em busca de trabalho." }),
    mk("oficina", { nome: "Oficina artesanal", emoji: "🔨", era: 0, custo: 70, cor: "#c98a4b", empregos: 4, prod: 5, poluicao: 1,
      info: "Nas oficinas, artesãos dominavam várias etapas da produção com ferramentas manuais. A produção era pequena e lenta." }),
    mk("moinho", { nome: "Moinho de água", emoji: "⚙️", era: 0, custo: 90, cor: "#e6d3a3", empregos: 3, prod: 6,
      info: "Moinhos de água e de vento aproveitavam a energia da natureza para moer grãos e acionar equipamentos simples." }),
    mk("mercado", { nome: "Mercado", emoji: "🧺", era: 0, custo: 80, cor: "#e8c07a", empregos: 3, prod: 4, bem: 2,
      info: "O crescimento do comércio aumentou a procura por mercadorias e ajudou a criar as condições para a industrialização." }),
    mk("parque", { nome: "Praça e parque", emoji: "🌳", era: 0, custo: 50, cor: "#4fae5f", bem: 3, poluicao: -2,
      info: "Praças e áreas verdes ajudam a melhorar a qualidade do ar e a vida das pessoas nas cidades." }),

    mk("fabrica_vapor", { nome: "Fábrica a vapor", emoji: "🏭", era: 1, custo: 160, cor: "#9a4f3c", empregos: 14, prod: 22, poluicao: 6, bem: -3,
      info: "A máquina a vapor, aperfeiçoada por James Watt, passou a movimentar fábricas têxteis. O trabalho seguia o ritmo das máquinas e do relógio." }),
    mk("estacao", { nome: "Estação ferroviária", emoji: "🚂", era: 1, custo: 140, cor: "#d9c9a8", empregos: 6, prod: 12, poluicao: 2,
      info: "As ferrovias aceleraram o transporte de matérias-primas e mercadorias e aproximaram cidades e regiões." }),
    mk("vila", { nome: "Vila operária", emoji: "🏘️", era: 1, custo: 90, cor: "#a67b5b", moradia: 10, bem: -2,
      info: "Muitos trabalhadores viviam em moradias apertadas e com pouca infraestrutura nas cidades industriais do século XIX." }),

    mk("usina", { nome: "Usina elétrica", emoji: "⚡", era: 2, custo: 220, cor: "#6e7fa3", empregos: 6, energia: 30, poluicao: 7,
      info: "A eletricidade permitiu levar energia a fábricas e casas. No início, grande parte dela vinha da queima de carvão." }),
    mk("linha_montagem", { nome: "Linha de montagem", emoji: "🚗", era: 2, custo: 260, cor: "#4d6a8f", empregos: 24, prod: 48, energia: -12, poluicao: 5, bem: -2,
      info: "Com a linha de montagem, Henry Ford ampliou a produção em massa: cada trabalhador fazia uma etapa repetitiva do trabalho." }),
    mk("escola", { nome: "Escola técnica", emoji: "📘", era: 2, custo: 120, cor: "#f0d8a0", empregos: 3, qual: 4, bem: 3,
      info: "Fábricas mais complexas exigiam trabalhadores com formação técnica, e as escolas profissionalizantes ganharam importância." }),
    mk("bairro", { nome: "Bairro planejado", emoji: "🏙️", era: 2, custo: 140, cor: "#d7b48c", moradia: 14, energia: -2, bem: 1,
      info: "O crescimento das cidades industriais exigiu planejamento de moradia, transporte e saneamento." }),

    mk("fabrica_robo", { nome: "Fábrica automatizada", emoji: "🤖", era: 3, custo: 380, cor: "#cfd8e8", empregos: 14, prod: 95, energia: -20, poluicao: 4, exigeQual: 6,
      info: "Robôs industriais executam tarefas repetitivas ou perigosas, mas exigem trabalhadores qualificados para programar e manter as máquinas." }),
    mk("centro_comp", { nome: "Centro de computação", emoji: "💻", era: 3, custo: 300, cor: "#5e8fe0", empregos: 12, prod: 55, energia: -8, exigeQual: 3, bem: 1,
      info: "Computadores mudaram escritórios e fábricas: controle de estoque, projetos e comunicação ficaram muito mais rápidos." }),
    mk("centro_senai", { nome: "Centro de formação", emoji: "🎓", era: 3, custo: 220, cor: "#3fd2a0", empregos: 5, qual: 8, energia: -4, bem: 4,
      info: "A formação profissional prepara pessoas para novas tecnologias. No Brasil, instituições como o SENAI (criado em 1942) cumprem esse papel." }),

    mk("datacenter", { nome: "Data center de IA", emoji: "🖥️", era: 4, custo: 520, cor: "#2b2f5a", empregos: 10, prod: 150, energia: -30, poluicao: 2, exigeQual: 10,
      info: "Data centers armazenam e processam os dados usados por IA e serviços digitais, e consomem muita energia." }),
    mk("solar", { nome: "Usina solar", emoji: "☀️", era: 4, custo: 300, cor: "#2d7be0", empregos: 3, energia: 28, bem: 1,
      info: "A energia solar gera eletricidade com baixa poluição local, ajudando a conciliar tecnologia e meio ambiente." }),
    mk("fabrica40", { nome: "Fábrica 4.0", emoji: "🌐", era: 4, custo: 600, cor: "#26345f", empregos: 20, prod: 130, energia: -22, poluicao: 1, exigeQual: 8,
      info: "Na Indústria 4.0, sensores, internet das coisas e análise de dados conectam máquinas e ajudam a identificar falhas em tempo real." })
  ];
  const T = Object.fromEntries(LISTA.map(t => [t.id, t]));

  /* ---------- eras e objetivos ---------- */
  const ERAS = [
    { nome: "Antes das máquinas", periodo: "até c. 1760", cor: "#8b5cf6", ceu: ["#c7e3ff", "#fff1d6"], terreno: "#56c068", custo: 260 },
    { nome: "1ª Revolução Industrial", periodo: "c. 1760–1850", cor: "#f97316", ceu: ["#ddd6f0", "#f7e1c8"], terreno: "#7fb15c", custo: 700,
      intro: "A máquina a vapor e o carvão mudam a produção. Surgem as fábricas, as estações ferroviárias e as vilas operárias. Mas atenção: a fumaça cresce e as moradias ficam apertadas." },
    { nome: "2ª Revolução Industrial", periodo: "c. 1870–1914", cor: "#06b6d4", ceu: ["#c4b5fd", "#fed7aa"], terreno: "#6fa56b", custo: 1600,
      intro: "Eletricidade, petróleo e aço. A linha de montagem permite produzir em massa, mas as fábricas agora precisam de energia. Construa usinas e invista em formação técnica." },
    { nome: "3ª Revolução Industrial", periodo: "c. 1950–2000", cor: "#7c3aed", ceu: ["#a5f3fc", "#ede9fe"], terreno: "#5fb07a", custo: 3600,
      intro: "Computadores e robôs chegam às fábricas. A automação eleva a produção, mas exige qualificação: sem pessoas preparadas, as máquinas rendem menos e o desemprego cresce." },
    { nome: "4ª Revolução Industrial", periodo: "século XXI", cor: "#d946ef", ceu: ["#c7d2fe", "#f5d0fe"], terreno: "#4fc29a", custo: 0,
      intro: "Inteligência artificial, sensores e dados conectam tudo. Os data centers consomem muita energia: use fontes limpas, cuide das pessoas e mostre que tecnologia e bem-estar podem andar juntos." }
  ];
  const q = (t, v, m, inv, un) => ({ t, v, m, inv: !!inv, un: un || "" });
  const OBJS = [
    [q("Chegar a 12 habitantes", s => s.pop, 12), q("Ter 2 locais de trabalho (oficina, moinho ou mercado)", s => s.C.oficina + s.C.moinho + s.C.mercado, 2), q("Manter o bem-estar acima de 40", s => Math.round(s.bem), 40)],
    [q("Chegar a 35 habitantes", s => s.pop, 35), q("Construir 1 fábrica a vapor", s => s.C.fabrica_vapor, 1), q("Construir 1 estação ferroviária", s => s.C.estacao, 1), q("Manter o bem-estar acima de 40", s => Math.round(s.bem), 40)],
    [q("Chegar a 70 habitantes", s => s.pop, 70), q("Construir 1 usina elétrica", s => s.C.usina, 1), q("Construir 1 linha de montagem", s => s.C.linha_montagem, 1), q("Construir 1 escola técnica", s => s.C.escola, 1)],
    [q("Chegar a 110 habitantes", s => s.pop, 110), q("Construir 1 fábrica automatizada", s => s.C.fabrica_robo, 1), q("Construir 1 centro de formação", s => s.C.centro_senai, 1), q("Desemprego abaixo de 15%", s => Math.round(s.des * 100), 15, true, "%")],
    [q("Chegar a 150 habitantes", s => s.pop, 150), q("Construir 1 usina solar", s => s.C.solar, 1), q("Ter 1 data center ou fábrica 4.0", s => s.C.datacenter + s.C.fabrica40, 1), q("Bem-estar acima de 60", s => Math.round(s.bem), 60), q("Poluição abaixo de 10", s => Math.round(s.pol), 10, true)]
  ];

  /* ---------- estado ---------- */
  let S;
  const novoEstado = () => ({
    era: 0, cap: 260, pop: 0, bem: 50, tick: 0, grid: Array(N * N).fill(null),
    poluBonus: 0, qualBonus: 0, greve: 0, mods: [], diario: [], proxEvento: 24, venceu: false,
    st: { pop: 0, emp: 0, jobs: 0, housing: 0, bem: 50, pol: 0, supE: 0, demE: 0, provQ: 0, reqQ: 0, des: 0, liquido: 0, C: {}, n: 0 }
  });
  let tool = null, hover = null, vel = 1, pausado = true, modalAberto = false;
  let tt = 0, acc = 0, ultimo = performance.now(), dtF = 0, fantasma = false;
  const humo = [];
  const estrelas = Array.from({ length: 70 }, () => [rnd(0, W), rnd(0, 260), rnd(0, 6.28)]);
  const nuvens = Array.from({ length: 5 }, () => ({ x: rnd(0, W), y: rnd(20, 150), s: rnd(.6, 1.3), v: rnd(4, 10) }));
  let ceuAtual = null;

  /* ---------- cálculo da economia ---------- */
  function contar() { const C = {}; LISTA.forEach(t => C[t.id] = 0); S.grid.forEach(c => { if (c) C[c]++; }); return C; }
  function calc() {
    const C = contar();
    const r = { C, moradia: 0, empregos: 0, supE: 0, demE: 0, pol: 0, bemB: 0, provQ: S.qualBonus, reqQ: 0, n: 0, manut: 0 };
    LISTA.forEach(t => {
      const n = C[t.id]; if (!n) return;
      r.n += n; r.manut += n * (0.8 + 0.5 * t.era); r.moradia += n * t.moradia; r.empregos += n * t.empregos;
      if (t.energia > 0) r.supE += n * t.energia; else r.demE += -n * t.energia;
      r.pol += n * t.poluicao; r.bemB += n * t.bem; r.provQ += n * t.qual; r.reqQ += n * t.exigeQual;
    });
    r.pol = Math.max(0, r.pol + S.poluBonus);
    return r;
  }

  function passo() {
    S.tick++;
    S.mods = S.mods.filter(m => m.ate > S.tick);
    if (S.greve > 0) S.greve--;
    const c = calc();
    const modBem = S.mods.filter(m => m.tipo === "bem").reduce((a, m) => a + m.v, 0);

    /* população */
    const demanda = Math.min(c.moradia, Math.ceil(c.empregos * 1.2));
    if (S.pop < demanda) S.pop = Math.min(demanda, S.pop + (S.bem >= 35 ? 2 : 0) + (S.bem >= 60 ? 1 : 0));
    else if (S.pop > demanda) S.pop = Math.max(demanda, S.pop - 1);
    if (S.bem < 25) S.pop = Math.max(0, S.pop - 1);

    /* emprego e bem-estar */
    const emp = Math.min(S.pop, c.empregos);
    const des = S.pop > 0 ? (S.pop - emp) / S.pop : 0;
    const efE = c.demE > 0 ? Math.min(1, c.supE / c.demE) : 1;
    let alvo = 42 + c.bemB - c.pol * 0.6 - des * 40 + modBem;
    if (S.pop > c.moradia) alvo -= 8;
    if (efE < 1) alvo -= 6 * (1 - efE);
    S.bem += (clamp(alvo, 0, 100) - S.bem) * 0.35;

    /* produção */
    const lf = c.empregos > 0 ? Math.min(1, S.pop / c.empregos) : 0;
    const qf = c.reqQ > 0 ? clamp(c.provQ / c.reqQ, 0.35, 1) : 1;
    let prod = 0;
    LISTA.forEach(t => {
      const n = c.C[t.id]; if (!n || !t.prod) return;
      prod += n * t.prod * lf * (t.energia < 0 ? efE : 1) * (t.exigeQual ? qf : 1);
    });
    prod *= (S.greve > 0 ? 0.5 : 1) * (S.bem < 30 ? 0.85 : 1);
    const imposto = emp * 0.6, manut = c.manut;
    const liquido = prod + imposto - manut;
    S.cap += liquido;
    if (S.cap < 0) S.cap = 0;

    S.st = { pop: S.pop, emp, jobs: c.empregos, housing: c.moradia, bem: S.bem, pol: c.pol, supE: c.supE, demE: c.demE, provQ: c.provQ, reqQ: c.reqQ, des, liquido, C: c.C, n: c.n, efE, qf };

    /* eventos */
    if (S.tick >= S.proxEvento && !modalAberto) sortearEvento();
    atualizarTudo();
    if (S.tick % 5 === 0) salvar();
  }

  function atualizarStats() { /* recalcula sem avançar o tempo (após construir/demolir) */
    const c = calc();
    const emp = Math.min(S.pop, c.empregos), des = S.pop > 0 ? (S.pop - emp) / S.pop : 0;
    S.st = { ...S.st, pop: S.pop, emp, jobs: c.empregos, housing: c.moradia, bem: S.bem, pol: c.pol, supE: c.supE, demE: c.demE, provQ: c.provQ, reqQ: c.reqQ, des, C: c.C, n: c.n };
  }

  /* ---------- eventos educativos ---------- */
  const addMod = (tipo, v, dur) => S.mods.push({ tipo, v, ate: S.tick + dur });
  const EVENTOS = [
    { id: "greve", cond: s => s.era >= 1 && (s.st.C.fabrica_vapor + s.st.C.linha_montagem + s.st.C.fabrica_robo + s.st.C.fabrica40) >= 1, emoji: "✊",
      titulo: "Greve de operários",
      texto: "Os trabalhadores das fábricas cruzam os braços. Reclamam de jornadas longas, salários baixos e condições de trabalho difíceis.",
      fato: "Greves e sindicatos foram decisivos para conquistar jornadas menores, salários melhores e direitos trabalhistas.",
      opcoes: [
        { t: "Negociar melhorias", sub: "−80 de capital • bem-estar +10 por um tempo", fn: () => { S.cap = Math.max(0, S.cap - 80); addMod("bem", 10, 20); return "Diálogo e melhorias acalmaram os operários."; } },
        { t: "Ignorar o protesto", sub: "Produção −50% e bem-estar −10 por um tempo", fn: () => { S.greve = 12; addMod("bem", -10, 14); return "A greve paralisou parte da produção."; } }
      ] },
    { id: "fumaca", cond: s => s.st.pol >= 12, emoji: "🌫️",
      titulo: "Fumaça sobre a cidade",
      texto: "A queima de carvão e as chaminés deixam o ar pesado. Moradores reclamam de tosse e de roupas sujas.",
      fato: "Nas cidades industriais do século XIX, a poluição do ar e dos rios foi um dos primeiros grandes problemas ambientais.",
      opcoes: [
        { t: "Instalar filtros e plantar árvores", sub: "−100 de capital • poluição −3 de forma permanente", fn: () => { S.cap = Math.max(0, S.cap - 100); S.poluBonus -= 3; return "Os filtros e as árvores melhoraram o ar."; } },
        { t: "Ignorar por enquanto", sub: "Bem-estar −8 por um tempo e −2 habitantes", fn: () => { addMod("bem", -8, 15); S.pop = Math.max(0, S.pop - 2); return "Algumas famílias deixaram a cidade."; } }
      ] },
    { id: "migrantes", cond: s => s.era >= 1 && s.st.housing >= s.pop + 6 && s.st.jobs >= s.pop + 4, emoji: "🚶",
      titulo: "Migrantes chegam do campo",
      texto: "Famílias do interior chegam à cidade em busca de emprego nas fábricas.",
      fato: "A migração do campo para as cidades foi uma das maiores mudanças sociais da industrialização.",
      opcoes: [
        { t: "Oferecer moradia e acolhida", sub: "−50 de capital • +6 habitantes e bem-estar +4 por um tempo", fn: () => { S.cap = Math.max(0, S.cap - 50); S.pop += 6; addMod("bem", 4, 15); return "Os recém-chegados foram bem recebidos."; } },
        { t: "Deixar que se virem sozinhos", sub: "+6 habitantes, mas bem-estar −8 por um tempo", fn: () => { S.pop += 6; addMod("bem", -8, 15); return "Muitos improvisaram moradias precárias."; } }
      ] },
    { id: "automacao", cond: s => s.st.C.fabrica_robo >= 1, emoji: "🤖",
      titulo: "A automação chegou",
      texto: "Os robôs fazem parte do trabalho que antes era manual. Alguns funcionários temem perder o emprego.",
      fato: "Cada nova tecnologia muda as profissões. Requalificar trabalhadores ajuda as pessoas a acompanharem as mudanças.",
      opcoes: [
        { t: "Requalificar a equipe", sub: "−120 de capital • qualificação +3 de forma permanente", fn: () => { S.cap = Math.max(0, S.cap - 120); S.qualBonus += 3; return "A equipe aprendeu a operar as novas máquinas."; } },
        { t: "Dispensar parte da equipe", sub: "+150 de capital, −4 habitantes e bem-estar −8 por um tempo", fn: () => { S.cap += 150; S.pop = Math.max(0, S.pop - 4); addMod("bem", -8, 20); return "A cidade economizou, mas perdeu moradores e confiança."; } }
      ] },
    { id: "apagao", cond: s => s.era >= 2 && s.st.demE > s.st.supE, emoji: "💡",
      titulo: "Apagão!",
      texto: "A demanda de energia superou a oferta. Máquinas desaceleram e a cidade fica no escuro por algumas horas.",
      fato: "Com a eletricidade, fábricas e cidades passaram a depender de redes elétricas. Planejar a geração de energia é essencial.",
      opcoes: [{ t: "Entendi: vou construir mais energia", sub: "Construa usinas elétricas ou solares", fn: () => "Hora de investir em geração de energia." }] },
    { id: "feira", cond: s => s.era >= 1, emoji: "💡",
      titulo: "Feira de invenções",
      texto: "Inventores apresentam novas máquinas e processos. Apoiar novas ideias pode trazer retorno, mas nem sempre dá certo.",
      fato: "Muitas invenções da industrialização, como o tear mecânico e o telefone, vieram de anos de tentativas e erros.",
      opcoes: [
        { t: "Patrocinar os inventores", sub: "−90 de capital • chance de ganhar +260", fn: () => { S.cap = Math.max(0, S.cap - 90); if (Math.random() < 0.6) { S.cap += 260; return "Uma invenção deu certo e rendeu lucros!"; } return "Desta vez a ideia não deu retorno."; } },
        { t: "Guardar o dinheiro", sub: "Nada muda", fn: () => "Você preferiu não arriscar." }
      ] }
  ];

  function sortearEvento() {
    S.proxEvento = S.tick + Math.round(rnd(22, 34));
    const ok = EVENTOS.filter(e => e.cond(S));
    if (!ok.length) return;
    mostrarModal(ok[Math.floor(Math.random() * ok.length)]);
  }

  function mostrarModal(ev) {
    modalAberto = true;
    const el = $("evento");
    el.innerHTML = `<div class="modal-caixa"><span class="modal-emoji">${ev.emoji}</span><p class="modal-tag">EVENTO NA CIDADE</p><h3>${ev.titulo}</h3><p class="modal-texto">${ev.texto}</p>
      <div class="modal-opcoes">${ev.opcoes.map((o, i) => `<button class="modal-op" data-i="${i}"><b>${o.t}</b><span>${o.sub}</span></button>`).join("")}</div>
      <p class="modal-fato"><b>Fato histórico:</b> ${ev.fato}</p></div>`;
    el.hidden = false;
    el.querySelectorAll(".modal-op").forEach(b => b.addEventListener("click", () => {
      const msg = ev.opcoes[+b.dataset.i].fn();
      el.hidden = true; modalAberto = false;
      registrar(`${ev.emoji} ${msg}`);
      atualizarStats(); atualizarTudo(); salvar();
    }));
    el.querySelector(".modal-op").focus();
  }

  /* ---------- diário, aviso ---------- */
  function registrar(txt) { S.diario.unshift(txt); S.diario = S.diario.slice(0, 6); desenharDiario(); aviso(txt); }
  let avisoTimer = 0;
  function aviso(txt) { const t = $("aviso"); t.textContent = txt; t.classList.add("on"); clearTimeout(avisoTimer); avisoTimer = setTimeout(() => t.classList.remove("on"), 2600); }
  function desenharDiario() { $("diario").innerHTML = S.diario.map(d => `<li>${d}</li>`).join("") || "<li class='vazio'>As notícias da cidade aparecem aqui.</li>"; }

  /* ---------- ações do jogador ---------- */
  function clicarTile(i) {
    if (modalAberto || pausado && $("intro") && !$("intro").hidden) return;
    if (!tool) { aviso("Escolha uma construção na lista ao lado."); return; }
    const atual = S.grid[i];
    if (tool === "demolir") {
      if (!atual) return;
      S.cap += Math.round(T[atual].custo * 0.5); S.grid[i] = null;
      registrar(`🧹 ${T[atual].nome} demolido(a).`);
    } else {
      const t = T[tool];
      if (atual) { aviso("Este terreno já está ocupado."); return; }
      if (t.era > S.era) { aviso("Essa construção ainda não está disponível nesta era."); return; }
      if (S.cap < t.custo) { aviso("Capital insuficiente."); return; }
      S.cap -= t.custo; S.grid[i] = tool;
      pop_efeito(i);
      aviso(`${t.emoji} ${t.nome} construído(a).`);
    }
    atualizarStats(); atualizarTudo(); salvar();
  }
  const brilhos = [];
  function pop_efeito(i) { brilhos.push({ i, t: 0 }); }

  function avancarEra() {
    const obj = OBJS[S.era], custo = ERAS[S.era].custo;
    if (S.era >= 4) return;
    if (!obj.every(o => objOk(o)) || S.cap < custo) return;
    S.cap -= custo; S.era++;
    montarPaleta(); atualizarTudo();
    const E = ERAS[S.era];
    registrar(`🚀 A cidade entrou na ${E.nome}!`);
    mostrarModal({ emoji: "🚀", titulo: E.nome, texto: E.intro, fato: `Período aproximado: ${E.periodo}. Veja os detalhes na linha do tempo do site.`, opcoes: [{ t: "Continuar", sub: "Novas construções liberadas", fn: () => "Novas construções liberadas." }] });
    salvar();
  }
  const objOk = o => o.inv ? o.v(S.st) <= o.m : o.v(S.st) >= o.m;

  /* ---------- interface ---------- */
  const fmt = n => Math.round(n).toLocaleString("pt-BR");
  function atualizarTudo() {
    const s = S.st;
    $("h-cap").textContent = fmt(S.cap);
    $("h-liq").textContent = (s.liquido >= 0 ? "+" : "") + fmt(s.liquido) + "/turno";
    $("h-liq").className = s.liquido >= 0 ? "pos" : "neg";
    $("h-pop").textContent = `${fmt(s.pop)} / ${fmt(s.housing)}`;
    $("h-emp").textContent = `${fmt(s.emp)} / ${fmt(s.jobs)}`;
    $("h-pol").textContent = fmt(s.pol);
    $("h-bem").textContent = fmt(s.bem) + "%";
    $("h-bar").style.width = clamp(s.bem, 0, 100) + "%";
    $("h-bar").style.background = s.bem >= 60 ? "var(--green)" : s.bem >= 35 ? "var(--yellow)" : "var(--orange)";
    $("c-ene").hidden = !(s.supE || s.demE);
    $("h-ene").textContent = `${fmt(s.supE)} / ${fmt(s.demE)}`;
    $("c-ene").classList.toggle("alerta", s.demE > s.supE);
    $("c-qual").hidden = !(s.reqQ || s.provQ);
    $("h-qual").textContent = `${fmt(s.provQ)} / ${fmt(s.reqQ)}`;
    $("c-qual").classList.toggle("alerta", s.reqQ > s.provQ);
    $("c-pol").classList.toggle("alerta", s.pol >= 12);
    $("c-emp").classList.toggle("alerta", s.des > 0.25);

    /* era e objetivos */
    const E = ERAS[S.era];
    $("era-nome").textContent = E.nome; $("era-periodo").textContent = E.periodo;
    $("era-card").style.setProperty("--cor", E.cor);
    $("era-prog").textContent = `Era ${S.era + 1} de 5`;
    const obj = OBJS[S.era];
    $("objs").innerHTML = obj.map(o => { const ok = objOk(o), v = o.v(S.st); return `<li class="${ok ? "ok" : ""}"><i>${ok ? "✓" : ""}</i><span>${o.t}</span><em>${v}${o.un}</em></li>`; }).join("");
    const tudoOk = obj.every(o => objOk(o));
    const btn = $("avancar");
    if (S.era < 4) {
      btn.hidden = false;
      btn.disabled = !(tudoOk && S.cap >= E.custo);
      btn.innerHTML = `Avançar para a próxima revolução <b>💰 ${fmt(E.custo)}</b>`;
      btn.title = tudoOk ? (S.cap >= E.custo ? "" : "Falta capital") : "Cumpra os objetivos primeiro";
    } else {
      btn.hidden = true;
      if (tudoOk && !S.venceu) { S.venceu = true; mostrarFinal(); }
    }
    /* ferramentas */
    document.querySelectorAll(".ferr").forEach(b => {
      const id = b.dataset.id; if (id === "demolir") return;
      b.classList.toggle("caro", S.cap < T[id].custo);
    });
  }

  function montarPaleta() {
    let h = `<button class="ferr demolir" data-id="demolir"><span class="emo">🧹</span><b>Demolir</b><i>devolve 50%</i></button>`;
    for (let e = 0; e <= 4; e++) {
      const bloq = e > S.era, itens = LISTA.filter(t => t.era === e);
      h += `<div class="pal-era ${bloq ? "bloq" : ""}" style="--cor:${ERAS[e].cor}"><h5>${bloq ? "🔒 " : ""}${ERAS[e].nome}</h5>`;
      if (bloq) h += `<p class="pal-previa" title="Desbloqueie avançando de era">${itens.map(t => `<span>${t.emoji}</span>`).join("")}</p></div>`;
      else h += `<div class="pal-itens">` + itens.map(t => `<button class="ferr" data-id="${t.id}"><span class="emo">${t.emoji}</span><b>${t.nome}</b><i>💰 ${t.custo}</i></button>`).join("") + `</div></div>`;
    }
    const p = $("paleta"); p.innerHTML = h;
    p.querySelectorAll(".ferr").forEach(b => {
      b.addEventListener("click", () => escolherFerramenta(b.dataset.id));
      b.addEventListener("pointerenter", () => { if (b.dataset.id !== "demolir") mostrarInfo(b.dataset.id); });
      b.addEventListener("focus", () => { if (b.dataset.id !== "demolir") mostrarInfo(b.dataset.id); });
    });
    marcarFerramenta();
  }
  function escolherFerramenta(id) { tool = tool === id ? null : id; marcarFerramenta(); if (tool && tool !== "demolir") mostrarInfo(tool); }
  function marcarFerramenta() { document.querySelectorAll(".ferr").forEach(b => b.classList.toggle("ativa", b.dataset.id === tool)); $("cv-wrap").classList.toggle("com-ferr", !!tool); }

  function efeitos(t) {
    const e = [];
    if (t.moradia) e.push(`🏠 +${t.moradia} moradias`);
    if (t.empregos) e.push(`👷 +${t.empregos} empregos`);
    if (t.prod) e.push(`💰 +${t.prod} por turno`);
    if (t.energia) e.push(`⚡ ${t.energia > 0 ? "+" : ""}${t.energia} energia`);
    if (t.poluicao) e.push(`🌫️ ${t.poluicao > 0 ? "+" : ""}${t.poluicao} poluição`);
    if (t.bem) e.push(`😊 ${t.bem > 0 ? "+" : ""}${t.bem} bem-estar`);
    if (t.qual) e.push(`🎓 +${t.qual} qualificação`);
    if (t.exigeQual) e.push(`🎓 exige ${t.exigeQual} de qualificação`);
    return e;
  }
  function mostrarInfo(id) {
    const t = T[id];
    $("info").innerHTML = `<div class="info-topo"><span class="info-emo">${t.emoji}</span><div><b>${t.nome}</b><small style="color:color-mix(in srgb,${ERAS[t.era].cor} 55%,#2e1065)">${ERAS[t.era].nome} • 💰 ${t.custo}</small></div></div>
      <div class="info-chips">${efeitos(t).map(x => `<em>${x}</em>`).join("")}</div><p>${t.info}</p>`;
  }

  /* ---------- final ---------- */
  function mostrarFinal() {
    const s = S.st, pts = Math.round(s.pop * 3 + s.bem * 5 + S.cap / 10 - s.pol * 5);
    const nivel = pts > 1400 ? "Cidade modelo" : pts > 900 ? "Cidade próspera" : "Cidade em crescimento";
    const el = $("final");
    el.innerHTML = `<div class="modal-caixa"><span class="modal-emoji">🏆</span><p class="modal-tag">MISSÃO CUMPRIDA</p><h3>Sua cidade chegou à Indústria 4.0!</h3>
      <p class="modal-texto">Você guiou a cidade das oficinas artesanais até a era da inteligência artificial, equilibrando produção, energia, meio ambiente e pessoas.</p>
      <div class="final-stats"><div><b>${fmt(s.pop)}</b><span>habitantes</span></div><div><b>${fmt(s.bem)}%</b><span>bem-estar</span></div><div><b>${fmt(pts)}</b><span>pontos</span></div></div>
      <p class="final-nivel">${nivel}</p>
      <p class="modal-fato"><b>O que ficou:</b> a tecnologia só gera progresso para todos quando vem acompanhada de qualificação, direitos do trabalho e cuidado com o ambiente.</p>
      <div class="modal-opcoes"><button class="modal-op" id="f-seguir"><b>Continuar construindo</b><span>Sua cidade continua ativa</span></button><a class="modal-op" href="conteudo.html"><b>Rever a linha do tempo</b><span>Revise cada revolução</span></a></div></div>`;
    el.hidden = false; modalAberto = true;
    $("f-seguir").addEventListener("click", () => { el.hidden = true; modalAberto = false; salvar(); });
  }

  /* ---------- persistência ---------- */
  function salvar() { try { localStorage.setItem(CHAVE, JSON.stringify({ ...S, st: undefined })); } catch (e) { /* ignorar */ } }
  function carregar() {
    try {
      const d = JSON.parse(localStorage.getItem(CHAVE) || "null");
      if (!d || !Array.isArray(d.grid) || d.grid.length !== N * N) return null;
      return d;
    } catch (e) { return null; }
  }

  /* =====================  DESENHO  ===================== */
  const cv = $("cidade"), ctx = cv.getContext("2d");
  function ajustar() { const dpr = Math.min(2, window.devicePixelRatio || 1); cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }

  const tilePos = (x, y) => ({ sx: OX + (x - y) * TW / 2, sy: OY + (x + y) * TH / 2 });
  const P = (o, tx, ty, z) => [o.sx + (tx - ty) * TW / 2, o.sy + (tx + ty) * TH / 2 - z];
  function poly(pts, fill, line) {
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
    if (line) { ctx.strokeStyle = "rgba(10,5,30,.35)"; ctx.lineWidth = 1; ctx.stroke(); }
  }
  function caixa(o, cx, cy, hx, hy, z0, z1, cor) {
    poly([P(o, cx - hx, cy + hy, z0), P(o, cx + hx, cy + hy, z0), P(o, cx + hx, cy + hy, z1), P(o, cx - hx, cy + hy, z1)], shade(cor, -0.16), true);
    poly([P(o, cx + hx, cy + hy, z0), P(o, cx + hx, cy - hy, z0), P(o, cx + hx, cy - hy, z1), P(o, cx + hx, cy + hy, z1)], shade(cor, -0.36), true);
    poly([P(o, cx - hx, cy - hy, z1), P(o, cx + hx, cy - hy, z1), P(o, cx + hx, cy + hy, z1), P(o, cx - hx, cy + hy, z1)], shade(cor, 0.12), true);
  }
  function piramide(o, cx, cy, hx, hy, z1, rh, cor) {
    const A = P(o, cx, cy, z1 + rh);
    poly([P(o, cx - hx, cy + hy, z1), P(o, cx + hx, cy + hy, z1), A], shade(cor, -0.04), true);
    poly([P(o, cx + hx, cy + hy, z1), P(o, cx + hx, cy - hy, z1), A], shade(cor, -0.3), true);
  }
  function janelas(o, cx, cy, hx, hy, z0, z1, cols, rows, cor, pisca) {
    const Hh = z1 - z0;
    for (let lado = 0; lado < 2; lado++) for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const u0 = (i + .25) / cols, u1 = (i + .75) / cols, v0 = z0 + Hh * (j + .22) / rows, v1 = z0 + Hh * (j + .68) / rows;
      let pts;
      if (lado === 0) { const a = cx - hx + 2 * hx * u0, b = cx - hx + 2 * hx * u1; pts = [P(o, a, cy + hy, v0), P(o, b, cy + hy, v0), P(o, b, cy + hy, v1), P(o, a, cy + hy, v1)]; }
      else { const a = cy + hy - 2 * hy * u0, b = cy + hy - 2 * hy * u1; pts = [P(o, cx + hx, a, v0), P(o, cx + hx, b, v0), P(o, cx + hx, b, v1), P(o, cx + hx, a, v1)]; }
      const on = !pisca || Math.sin(tt * 2 + i * 3.1 + j * 1.7 + lado * 5) > -0.3;
      ctx.globalAlpha = lado ? 0.8 : 1; poly(pts, on ? cor : "rgba(10,5,30,.45)"); ctx.globalAlpha = 1;
    }
  }
  function chamine(o, tx, ty, z1, fumo) {
    caixa(o, tx, ty, 0.06, 0.06, 0, z1, "#6b5b52");
    if (fumo && !fantasma && !pausado && Math.random() < 0.05 * fumo * Math.min(vel, 3)) {
      const p = P(o, tx, ty, z1 + 2);
      humo.push({ x: p[0], y: p[1], vx: rnd(2, 8), vy: rnd(-16, -24), r: rnd(3, 5), a: 0.55 });
    }
  }
  function arvore(o, tx, ty, k) {
    const b = P(o, tx, ty, 0), sway = Math.sin(tt * 1.3 + k) * 1.2;
    ctx.fillStyle = "#6b4a2f"; ctx.fillRect(b[0] - 1.5, b[1] - 10, 3, 10);
    const c = [b[0] + sway, b[1] - 17];
    ctx.fillStyle = "#2f8a46"; ctx.beginPath(); ctx.arc(c[0], c[1], 9, 0, 7); ctx.fill();
    ctx.fillStyle = "#47b863"; ctx.beginPath(); ctx.arc(c[0] - 2.5, c[1] - 3, 5.5, 0, 7); ctx.fill();
  }
  function emoji(txt, x, y, s) { ctx.font = `${s}px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(txt, x, y); }
  const corJanela = () => S.era <= 1 ? "#ffd98a" : S.era === 2 ? "#ffe9a0" : S.era === 3 ? "#bfeaff" : "#7fffe9";

  const DRAW = {
    casa(o, t) { caixa(o, 0, 0, .26, .26, 0, 16, t.cor); piramide(o, 0, 0, .31, .31, 16, 13, "#b5523b"); janelas(o, 0, 0, .26, .26, 0, 16, 1, 1, corJanela()); },
    oficina(o, t) { caixa(o, 0, 0, .33, .28, 0, 18, t.cor); piramide(o, 0, 0, .37, .32, 18, 10, "#6b3b24"); janelas(o, 0, 0, .33, .28, 0, 18, 2, 1, corJanela()); chamine(o, .2, -.14, 32, .6); },
    moinho(o, t) {
      caixa(o, -.05, 0, .22, .22, 0, 30, t.cor); piramide(o, -.05, 0, .26, .26, 30, 12, "#8a4a35");
      const c = P(o, .17, 0, 14); ctx.save(); ctx.translate(c[0], c[1]); ctx.transform(1, -.5, 0, 1, 0, 0); ctx.rotate(tt * .9);
      ctx.strokeStyle = "#5b3b22"; ctx.lineWidth = 2.4; ctx.beginPath();
      for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * 13, Math.sin(a) * 13); }
      ctx.stroke(); ctx.fillStyle = "#4aa0d8"; for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; ctx.fillRect(Math.cos(a) * 13 - 3, Math.sin(a) * 13 - 3, 6, 6); } ctx.restore();
      const r = P(o, .3, .22, 0); ctx.fillStyle = "rgba(90,180,240,.6)"; ctx.beginPath(); ctx.ellipse(r[0], r[1] + 2, 10, 4, 0, 0, 7); ctx.fill();
    },
    mercado(o, t) {
      caixa(o, 0, 0, .34, .3, 0, 10, t.cor);
      for (let i = 0; i < 6; i++) { const a = -.34 + i * .68 / 6, b = a + .68 / 6; poly([P(o, a, -.3, 10), P(o, b, -.3, 10), P(o, b, .3, 10), P(o, a, .3, 10)], i % 2 ? "#fff3e0" : "#e5483b"); }
      ctx.fillStyle = "#f6b73c"; const q = P(o, .1, .38, 4); ctx.fillRect(q[0] - 4, q[1] - 4, 8, 6);
    },
    parque(o, t) {
      poly([P(o, -.5, -.5, 0), P(o, .5, -.5, 0), P(o, .5, .5, 0), P(o, -.5, .5, 0)], "#3f9a54");
      poly([P(o, -.05, -.5, 0), P(o, .05, -.5, 0), P(o, .05, .5, 0), P(o, -.05, .5, 0)], "#d9c493");
      arvore(o, -.25, -.2, 0); arvore(o, .22, -.28, 2); arvore(o, -.18, .25, 4); arvore(o, .28, .22, 5);
    },
    fabrica_vapor(o, t) {
      caixa(o, 0, 0, .38, .3, 0, 26, t.cor);
      for (const x of [-.24, 0, .24]) piramide(o, x, 0, .13, .3, 26, 9, "#4b3b36");
      janelas(o, 0, 0, .38, .3, 0, 26, 4, 1, "#ffb24a", true);
      chamine(o, -.3, -.22, 52, 1.4); chamine(o, .0, -.25, 46, 1.1);
    },
    estacao(o, t) {
      caixa(o, 0, -.08, .38, .2, 0, 16, t.cor); caixa(o, 0, -.08, .42, .24, 16, 19, "#5a4a46");
      caixa(o, .27, -.14, .07, .07, 0, 36, "#bfae88"); piramide(o, .27, -.14, .09, .09, 36, 8, "#7a3b34");
      const c = P(o, .27, -.07, 28); ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(c[0] + 2, c[1] + 1, 3.2, 0, 7); ctx.fill();
      ctx.strokeStyle = "#5f5f6a"; ctx.lineWidth = 1.5;
      for (const ty of [.28, .38]) { const a = P(o, -.5, ty, 0), b = P(o, .5, ty, 0); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
      const tx = ((tt * .18) % 1.5) - .75; if (tx > -.5 && tx < .5) { caixa(o, tx, .33, .1, .05, 1, 9, "#c2432e"); chamine(o, tx - .06, .33, 14, .5); }
    },
    vila(o, t) {
      for (const [x, y] of [[-.22, 0], [.22, 0]]) { caixa(o, x, y, .16, .3, 0, 14, t.cor); caixa(o, x, y, .18, .32, 14, 16, "#5a3d2c"); janelas(o, x, y, .16, .3, 0, 14, 1, 1, corJanela()); }
      chamine(o, -.2, -.15, 26, .4);
    },
    usina(o, t) {
      caixa(o, -.1, .05, .3, .26, 0, 22, t.cor); caixa(o, -.1, .05, .33, .29, 22, 25, "#3b4660"); janelas(o, -.1, .05, .3, .26, 0, 22, 3, 1, "#ffe27a", true);
      chamine(o, .25, -.22, 54, 1.5); chamine(o, .08, -.3, 46, 1.2);
      const p = P(o, -.1, .05, 36 + Math.sin(tt * 3) * 3);
      const g = ctx.createRadialGradient(p[0], p[1], 2, p[0], p[1], 20); g.addColorStop(0, "rgba(255,226,90,.65)"); g.addColorStop(1, "rgba(255,226,90,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p[0], p[1], 20, 0, 7); ctx.fill(); emoji("⚡", p[0], p[1], 17);
    },
    linha_montagem(o, t) {
      caixa(o, 0, 0, .42, .32, 0, 22, t.cor); janelas(o, 0, 0, .42, .32, 0, 22, 4, 1, corJanela(), true);
      poly([P(o, -.4, -.06, 22), P(o, .4, -.06, 22), P(o, .4, .06, 22), P(o, -.4, .06, 22)], "#2b3447");
      const x = ((tt * .35) % 1) * .8 - .4; caixa(o, x, 0, .08, .05, 22, 29, "#e5483b"); caixa(o, x, 0, .04, .04, 29, 32, "#ffd23f");
      chamine(o, -.3, -.24, 36, .9);
    },
    escola(o, t) {
      caixa(o, 0, 0, .34, .26, 0, 24, t.cor); piramide(o, 0, 0, .38, .3, 24, 8, "#b24a4a"); janelas(o, 0, 0, .34, .26, 0, 24, 3, 2, "#9fd8ff");
      const a = P(o, .25, -.2, 24), b = P(o, .25, -.2, 50); ctx.strokeStyle = "#cfcfd8"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      const w = Math.sin(tt * 4) * 2; ctx.fillStyle = "#33e1ff"; ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(b[0] + 13, b[1] + 3 + w); ctx.lineTo(b[0], b[1] + 8); ctx.fill();
    },
    bairro(o, t) {
      for (const [x, y] of [[-.24, -.2], [.24, -.14], [0, .24]]) { caixa(o, x, y, .14, .14, 0, 15, t.cor); piramide(o, x, y, .17, .17, 15, 9, "#c46a4a"); janelas(o, x, y, .14, .14, 0, 15, 1, 1, corJanela()); }
      const l = P(o, .02, -.12, 14); ctx.fillStyle = "rgba(255,230,140,.9)"; ctx.beginPath(); ctx.arc(l[0], l[1], 2.4, 0, 7); ctx.fill();
    },
    fabrica_robo(o, t) {
      caixa(o, 0, 0, .4, .32, 0, 30, t.cor); janelas(o, 0, 0, .4, .32, 0, 30, 3, 1, "#7ad7ff");
      caixa(o, 0, 0, .43, .35, 30, 32, "#3a8ad6");
      const b = P(o, -.05, 0, 32), a = Math.sin(tt * 1.6) * .9;
      const e1 = [b[0] + Math.cos(-1.1 + a * .4) * 16, b[1] + Math.sin(-1.1 + a * .4) * 16], e2 = [e1[0] + Math.cos(.2 + a) * 15, e1[1] + Math.sin(.2 + a) * 11];
      ctx.strokeStyle = "#ff8a3d"; ctx.lineWidth = 4; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(e1[0], e1[1]); ctx.lineTo(e2[0], e2[1]); ctx.stroke();
      ctx.fillStyle = "#ffd23f"; for (const p of [b, e1, e2]) { ctx.beginPath(); ctx.arc(p[0], p[1], 3, 0, 7); ctx.fill(); }
      chamine(o, .3, -.25, 38, .5);
    },
    centro_comp(o, t) {
      caixa(o, 0, 0, .24, .24, 0, 58, t.cor); janelas(o, 0, 0, .24, .24, 0, 58, 2, 6, "#bff3ff", true);
      const a = P(o, 0, 0, 58), b = P(o, 0, 0, 74); ctx.strokeStyle = "#dfe6ff"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      ctx.fillStyle = Math.sin(tt * 5) > 0 ? "#ff4f9a" : "#7a2a4a"; ctx.beginPath(); ctx.arc(b[0], b[1], 2.4, 0, 7); ctx.fill();
    },
    centro_senai(o, t) {
      caixa(o, 0, 0, .36, .28, 0, 28, t.cor); caixa(o, 0, 0, .39, .31, 28, 31, "#1b8a68"); janelas(o, 0, 0, .36, .28, 0, 28, 3, 2, "#e9fff7");
      const p = P(o, 0, 0, 52 + Math.sin(tt * 2) * 2); emoji("🎓", p[0], p[1], 22);
    },
    datacenter(o, t) {
      caixa(o, 0, 0, .4, .34, 0, 34, t.cor);
      for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
        const on = Math.sin(tt * (2 + i) + j * 2.3 + i) > 0, a = P(o, -.34 + i * .22, .34, 6 + j * 8);
        ctx.fillStyle = on ? (j % 2 ? "#ff4f9a" : "#33e1ff") : "#2d2a55"; ctx.fillRect(a[0], a[1], 4, 3);
      }
      caixa(o, -.15, -.1, .1, .1, 34, 40, "#8a90b0"); caixa(o, .15, .08, .1, .1, 34, 40, "#8a90b0");
    },
    solar(o, t) {
      poly([P(o, -.5, -.5, 0), P(o, .5, -.5, 0), P(o, .5, .5, 0), P(o, -.5, .5, 0)], "#5d7a59");
      for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
        const cx = -.3 + i * .3, cy = -.22 + j * .42, z0 = 6, z1 = 14;
        poly([P(o, cx - .12, cy - .17, z1), P(o, cx + .12, cy - .17, z1), P(o, cx + .12, cy + .17, z0), P(o, cx - .12, cy + .17, z0)], "#1f55b8", true);
        const g = ((tt * .5 + i * .2 + j * .1) % 1); const gx = cx - .12 + g * .24;
        poly([P(o, gx, cy - .17, z1), P(o, gx + .03, cy - .17, z1), P(o, gx + .03, cy + .17, z0), P(o, gx, cy + .17, z0)], "rgba(255,255,255,.55)");
      }
    },
    fabrica40(o, t) {
      caixa(o, 0, 0, .4, .32, 0, 32, t.cor); janelas(o, 0, 0, .4, .32, 0, 32, 4, 2, "#7fffe9", true);
      const cor = `rgba(51,225,255,${0.55 + Math.sin(tt * 3) * .3})`; ctx.strokeStyle = cor; ctx.lineWidth = 2; ctx.shadowColor = "#33e1ff"; ctx.shadowBlur = 10;
      const pts = [P(o, -.4, .32, 32), P(o, .4, .32, 32), P(o, .4, -.32, 32)]; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(pts[1][0], pts[1][1]); ctx.lineTo(pts[2][0], pts[2][1]); ctx.stroke(); ctx.shadowBlur = 0;
      const a = P(o, .25, -.2, 32), b = P(o, .25, -.2, 58); ctx.strokeStyle = "#dfe6ff"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      for (let k = 0; k < 3; k++) { const r = ((tt * .8 + k / 3) % 1); ctx.strokeStyle = `rgba(255,79,154,${1 - r})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(b[0], b[1], 3 + r * 16, 0, 7); ctx.stroke(); }
      const d = P(o, Math.cos(tt * .9) * .38, Math.sin(tt * .9) * .3, 60 + Math.sin(tt * 3) * 3); ctx.fillStyle = "#ffd23f"; ctx.beginPath(); ctx.arc(d[0], d[1], 3, 0, 7); ctx.fill(); ctx.fillStyle = "rgba(255,210,63,.35)"; ctx.beginPath(); ctx.arc(d[0], d[1], 7, 0, 7); ctx.fill();
    }
  };

  /* céu */
  function atualizarCeu() {
    const alvo = ERAS[S.era].ceu.map(hex2rgb);
    if (!ceuAtual) ceuAtual = alvo.map(c => c.slice());
    for (let i = 0; i < 2; i++) ceuAtual[i] = mix(ceuAtual[i], alvo[i], 0.03);
  }
  function desenharCeu() {
    atualizarCeu();
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, rgb2css(ceuAtual[0])); g.addColorStop(1, rgb2css(ceuAtual[1]));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    if (S.era >= 2) { ctx.fillStyle = "#7c3aed"; estrelas.forEach(s => { ctx.globalAlpha = (S.era >= 4 ? .45 : S.era === 3 ? .15 : .2) * (0.5 + 0.5 * Math.sin(tt * 1.5 + s[2])); ctx.fillRect(s[0], s[1], 1.6, 1.6); }); ctx.globalAlpha = 1; }
    const fumo = clamp(S.st.pol / 40, 0, .5);
    nuvens.forEach(n => {
      n.x += n.v * dtF; if (n.x > W + 120) n.x = -120;
      ctx.fillStyle = S.era >= 4 ? "rgba(255,255,255,.6)" : `rgba(${255 - fumo * 150},${255 - fumo * 150},${255 - fumo * 140},.5)`;
      ctx.beginPath(); ctx.ellipse(n.x, n.y, 52 * n.s, 14 * n.s, 0, 0, 7); ctx.ellipse(n.x + 28 * n.s, n.y + 3, 34 * n.s, 11 * n.s, 0, 0, 7); ctx.fill();
    });
  }

  /* terreno */
  function desenharTerreno(x, y, i) {
    const o = tilePos(x, y), polu = clamp(S.st.pol / 40, 0, 1);
    const c = mix(hex2rgb(ERAS[S.era].terreno), hex2rgb("#9a8fb8"), polu * .8);
    const xadrez = (x + y) % 2 ? 1 : 0;
    const cor = rgb2css(c.map(v => v * (xadrez ? 0.93 : 1)));
    if (y === N - 1) poly([P(o, -.5, .5, 0), P(o, .5, .5, 0), P(o, .5, .5, -16), P(o, -.5, .5, -16)], "#5b3f2e", true);
    if (x === N - 1) poly([P(o, .5, .5, 0), P(o, .5, -.5, 0), P(o, .5, -.5, -16), P(o, .5, .5, -16)], "#432d20", true);
    poly([P(o, -.5, -.5, 0), P(o, .5, -.5, 0), P(o, .5, .5, 0), P(o, -.5, .5, 0)], cor);
    ctx.strokeStyle = "rgba(255,255,255,.07)"; ctx.lineWidth = 1; ctx.stroke();
    if (hover === i) {
      const ocupado = !!S.grid[i]; let ok = true, cl = "rgba(255,255,255,.28)";
      if (tool && tool !== "demolir") { ok = !ocupado && T[tool].era <= S.era && S.cap >= T[tool].custo; cl = ok ? "rgba(198,255,74,.45)" : "rgba(255,79,154,.5)"; }
      else if (tool === "demolir") cl = ocupado ? "rgba(255,138,61,.55)" : "rgba(255,255,255,.2)";
      poly([P(o, -.5, -.5, 0), P(o, .5, -.5, 0), P(o, .5, .5, 0), P(o, -.5, .5, 0)], cl);
    }
  }

  function render(now) {
    const dt = Math.min(0.1, (now - ultimo) / 1000); ultimo = now; dtF = dt; tt += dt;
    if (!pausado && !modalAberto) { acc += dt * 1000 * vel; while (acc >= 1000) { acc -= 1000; passo(); } }
    ctx.clearRect(0, 0, W, H);
    desenharCeu();
    for (let s = 0; s < 2 * N - 1; s++) for (let x = 0; x < N; x++) { const y = s - x; if (y < 0 || y >= N) continue; desenharTerreno(x, y, y * N + x); }
    for (let s = 0; s < 2 * N - 1; s++) for (let x = 0; x < N; x++) {
      const y = s - x; if (y < 0 || y >= N) continue;
      const id = S.grid[y * N + x], o = tilePos(x, y);
      if (id) {
        let esc = 1; const br = brilhos.find(b => b.i === y * N + x); if (br) { br.t += dt; esc = 1 + Math.max(0, .25 * Math.sin(Math.min(1, br.t / .4) * Math.PI)); }
        if (esc !== 1) { ctx.save(); ctx.translate(o.sx, o.sy); ctx.scale(1, esc); ctx.translate(-o.sx, -o.sy); }
        DRAW[id](o, T[id]);
        if (esc !== 1) ctx.restore();
      } else if (hover === y * N + x && tool && tool !== "demolir" && T[tool].era <= S.era) {
        fantasma = true; ctx.globalAlpha = 0.62; DRAW[tool](o, T[tool]); ctx.globalAlpha = 1; fantasma = false;
      }
    }
    for (let i = brilhos.length - 1; i >= 0; i--) if (brilhos[i].t > .5) brilhos.splice(i, 1);
    /* fumaça */
    for (let i = humo.length - 1; i >= 0; i--) {
      const p = humo[i]; p.x += p.vx * dt; p.y += p.vy * dt; p.r += 7 * dt; p.a -= 0.22 * dt;
      if (p.a <= 0) { humo.splice(i, 1); continue; }
      const tom = S.era <= 1 ? 90 : 170; ctx.fillStyle = `rgba(${tom},${tom},${tom + 12},${p.a})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
    }
    if (humo.length > 220) humo.splice(0, humo.length - 220);
    /* escurece com poluição alta */
    const pol = clamp((S.st.pol - 10) / 40, 0, .35); if (pol > 0) { ctx.fillStyle = `rgba(110,70,150,${pol})`; ctx.fillRect(0, 0, W, H); }
    requestAnimationFrame(render);
  }

  /* ---------- entrada do mouse ---------- */
  function tileDoPonteiro(e) {
    const r = cv.getBoundingClientRect(), mx = (e.clientX - r.left) * W / r.width, my = (e.clientY - r.top) * H / r.height;
    const dx = mx - OX, dy = my - OY, x = Math.round(dy / TH + dx / TW), y = Math.round(dy / TH - dx / TW);
    return x >= 0 && y >= 0 && x < N && y < N ? y * N + x : null;
  }
  cv.addEventListener("pointermove", e => {
    hover = tileDoPonteiro(e);
    if (hover !== null && S.grid[hover] && (!tool || tool === "demolir")) mostrarInfo(S.grid[hover]);
  });
  cv.addEventListener("pointerleave", () => { hover = null; });
  cv.addEventListener("pointerdown", e => { const i = tileDoPonteiro(e); hover = i; if (i !== null) clicarTile(i); });

  /* ---------- controles ---------- */
  function definirVel(v) {
    if (v === 0) { pausado = true; } else { pausado = false; vel = v; }
    document.querySelectorAll(".vel").forEach(b => b.classList.toggle("on", (+b.dataset.v === 0 && pausado) || (!pausado && +b.dataset.v === vel)));
  }
  document.querySelectorAll(".vel").forEach(b => b.addEventListener("click", () => definirVel(+b.dataset.v)));
  $("avancar").addEventListener("click", avancarEra);
  $("reiniciar").addEventListener("click", () => {
    if (!confirm("Começar uma nova cidade? O progresso atual será apagado.")) return;
    try { localStorage.removeItem(CHAVE); } catch (e) { /* ignorar */ }
    iniciar(false); $("intro").hidden = false; definirVel(0);
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { tool = null; marcarFerramenta(); }
    if (e.key === " " && !modalAberto && $("intro").hidden && document.activeElement === document.body) { e.preventDefault(); definirVel(pausado ? vel : 0); }
  });

  /* ---------- início ---------- */
  function iniciar(carregarSalvo) {
    const d = carregarSalvo ? carregar() : null;
    S = novoEstado();
    if (d) Object.assign(S, d, { st: S.st });
    ceuAtual = null; tool = null; modalAberto = false; $("evento").hidden = true; $("final").hidden = true;
    montarPaleta(); atualizarStats(); desenharDiario(); atualizarTudo();
    $("info").innerHTML = `<p class="info-vazio">Passe o mouse sobre uma construção para ver o que ela faz e a história por trás dela.</p>`;
  }
  function demo() {
    S.era = 4; S.cap = 99999; LISTA.forEach((t, i) => { S.grid[i + 3] = t.id; }); S.pop = 60; S.bem = 70;
    montarPaleta(); atualizarStats(); atualizarTudo(); $("intro").hidden = true; definirVel(1);
    window.__c = { get S() { return S; }, EVENTOS, mostrarModal, passo, avancarEra };
  }

  ajustar();
  const salvo = carregar();
  iniciar(false);
  $("btn-novo").addEventListener("click", () => { iniciar(false); $("intro").hidden = true; definirVel(1); });
  const bc = $("btn-continuar");
  if (salvo && salvo.tick > 0) { bc.hidden = false; bc.addEventListener("click", () => { iniciar(true); $("intro").hidden = true; definirVel(1); }); }
  definirVel(0);
  if (/[?&]demo/.test(location.search)) demo();
  requestAnimationFrame(render);
})();
