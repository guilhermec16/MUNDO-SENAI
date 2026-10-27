/* ============================================================
   TRABALHO.FUTURO — scripts
   1) Filtros da linha do tempo (conteudo.html)
   2) Banner interativo da página inicial (index.html)
   ============================================================ */

document.documentElement.classList.add("js");

/* ---------- 1) Filtros da linha do tempo ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const filtros = document.querySelectorAll(".filtro");
  const etapas = document.querySelectorAll(".etapa");
  filtros.forEach(botao => botao.addEventListener("click", () => {
    filtros.forEach(item => item.classList.remove("ativo"));
    botao.classList.add("ativo");
    const filtro = botao.dataset.filtro;
    etapas.forEach(etapa => {
      etapa.hidden = !(filtro === "todos" || etapa.dataset.etapa === filtro);
      if (!etapa.hidden) etapa.classList.add("visivel");
    });
  }));
});

/* ---------- 2) Banner interativo ---------- */
const SVG_ATTR = 'viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

const modelos = [
  {
    id: "antes",
    rotulo: "Antes das máquinas",
    cor: "#8b5cf6",
    x: "5%", y: "15%",
    arte: `<svg ${SVG_ATTR}>
      <path d="M22 66h60c7 0 12-5 14-12H38c-7 0-11 5-16 12z" fill="currentColor" fill-opacity=".18"/>
      <path d="M44 66v14h32V66"/><path d="M34 98h52l-5-18H39z" fill="currentColor" fill-opacity=".12"/>
      <path d="M62 18l24 24"/><rect x="52" y="10" width="26" height="14" rx="3" transform="rotate(45 65 17)" fill="currentColor" fill-opacity=".25"/>
      <path d="M64 38L36 60"/><path d="M98 50l8-5M100 60h10M96 70l8 5"/>
    </svg>`,
    data: "Até c. 1760",
    subtitulo: "Oficinas e manufaturas",
    titulo: "Antes das máquinas",
    texto: "Artesãos fabricavam produtos com ferramentas manuais, em oficinas ou em casa. Muitos dominavam várias etapas do trabalho, do início ao acabamento. Nas manufaturas, as tarefas começaram a ser divididas entre trabalhadores, mas a produção ainda dependia da força humana.",
    destaques: [["Energia","Força humana, animal, água e vento"],["Organização","Oficinas e manufaturas"],["Limite","Produção pequena e lenta"]],
    tecnologia: "Ferramentas manuais, teares manuais, moinhos de água e de vento.",
    trabalho: "Aprendizes, oficiais e mestres. Em muitas cidades, as corporações de ofício organizavam as profissões.",
    impacto: "O crescimento do comércio aumentou a procura por mercadorias e criou as condições para a industrialização.",
    marcos: ["Artesanato","Manufaturas","Corporações de ofício"],
    link: ["conteudo.html","Ver na linha do tempo ↗"]
  },
  {
    id: "rev1",
    rotulo: "Revolução Industrial 1",
    cor: "#f97316",
    x: "22%", y: "50%",
    arte: `<svg ${SVG_ATTR}>
      <rect x="14" y="48" width="62" height="26" rx="11" fill="currentColor" fill-opacity=".16"/>
      <path d="M26 48V30M20 30h16M58 48v-9h14v9"/>
      <rect x="76" y="40" width="22" height="34" rx="3"/><path d="M82 48h10"/>
      <circle cx="36" cy="88" r="14"/><circle cx="36" cy="88" r="3"/><path d="M36 74v28M22 88h28"/>
      <circle cx="78" cy="91" r="11"/><circle cx="78" cy="91" r="2.5"/>
      <path d="M10 104h100"/>
      <circle cx="30" cy="20" r="5"/><circle cx="42" cy="12" r="4"/><circle cx="52" cy="18" r="3"/>
    </svg>`,
    data: "c. 1760–1850",
    subtitulo: "A era do vapor",
    titulo: "1ª Revolução Industrial",
    texto: "Começou na Grã-Bretanha e transformou a produção artesanal em produção mecanizada nas fábricas. A máquina a vapor, o carvão e a indústria têxtil mudaram o ritmo do trabalho e a paisagem das cidades.",
    destaques: [["Onde começou","Grã-Bretanha"],["Energia","Carvão e vapor"],["Setor-chave","Indústria têxtil"]],
    tecnologia: "Máquina a vapor, carvão, máquinas de fiar e tecer, locomotiva a vapor.",
    trabalho: "Migração do campo para as cidades, jornadas longas, baixos salários e trabalho infantil. O ludismo foi um protesto contra certas máquinas.",
    impacto: "A produção cresceu muito, mas surgiram conflitos sobre salários, segurança e condições de vida dos trabalhadores.",
    marcos: ["Máquina a vapor de Watt","Ferrovias","Ludismo (c. 1811–1816)"],
    link: ["conteudo.html","Ver na linha do tempo ↗"]
  },
  {
    id: "rev2",
    rotulo: "Revolução Industrial 2",
    cor: "#06b6d4",
    x: "41%", y: "8%",
    arte: `<svg ${SVG_ATTR}>
      <path d="M46 76c-9-6-13-15-13-25a27 27 0 0 1 54 0c0 10-4 19-13 25v8H46z" fill="currentColor" fill-opacity=".14"/>
      <path d="M48 93h24M52 101h16"/>
      <path d="M63 32L52 54h14L55 76"/>
      <path d="M14 38l8 4M106 38l-8 4M8 56h10M102 56h10M18 18l7 7M102 18l-7 7"/>
    </svg>`,
    data: "c. 1870–1914",
    subtitulo: "A era da eletricidade",
    titulo: "2ª Revolução Industrial",
    texto: "Eletricidade, petróleo e aço transformaram fábricas, transportes e comunicações. A linha de montagem permitiu produzir grandes quantidades de mercadorias padronizadas, e o trabalho ficou mais intenso e organizado.",
    destaques: [["Energia","Eletricidade e petróleo"],["Material","Aço"],["Método","Linha de montagem"]],
    tecnologia: "Lâmpada elétrica, motor a combustão, telefone, telégrafo, aço e produtos químicos.",
    trabalho: "O taylorismo organizava e media as tarefas; o fordismo ampliou a produção em massa. Algumas funções se tornaram repetitivas.",
    impacto: "Sindicatos e movimentos de trabalhadores pressionaram por salários melhores, jornadas menores e direitos.",
    marcos: ["Lâmpada incandescente (1879)","Ford Modelo T (1908)","Taylor e Ford"],
    link: ["conteudo.html","Ver na linha do tempo ↗"]
  },
  {
    id: "rev3",
    rotulo: "Revolução Industrial 3",
    cor: "#7c3aed",
    x: "58%", y: "48%",
    arte: `<svg ${SVG_ATTR}>
      <rect x="22" y="96" width="50" height="10" rx="3" fill="currentColor" fill-opacity=".2"/>
      <circle cx="46" cy="90" r="6"/>
      <path d="M46 84l-6-36" stroke-width="7" stroke-opacity=".55"/>
      <circle cx="40" cy="44" r="6"/>
      <path d="M40 44l36-14" stroke-width="7" stroke-opacity=".55"/>
      <circle cx="78" cy="29" r="5"/><path d="M82 28l12-3M82 33l11 7"/>
      <rect x="82" y="62" width="30" height="24" rx="3" fill="currentColor" fill-opacity=".12"/><path d="M88 70h10M88 77h18"/>
    </svg>`,
    data: "c. 1950–2000",
    subtitulo: "A era digital e da automação",
    titulo: "3ª Revolução Industrial",
    texto: "A eletrônica, os computadores e as telecomunicações mudaram a indústria. Máquinas programáveis e robôs passaram a executar tarefas repetitivas ou perigosas com mais precisão, e o conhecimento técnico ganhou importância.",
    destaques: [["Tecnologia","Eletrônica e computadores"],["Método","Automação"],["Desafio","Qualificação profissional"]],
    tecnologia: "Transistor, computadores, controladores programáveis, robôs industriais e internet.",
    trabalho: "O toyotismo valorizou flexibilidade, redução de desperdícios e melhoria contínua. Algumas profissões foram transformadas ou substituídas.",
    impacto: "A produtividade aumentou, e aprender novas habilidades passou a ser parte da vida profissional.",
    marcos: ["Robô industrial Unimate (1961)","Computadores pessoais","Toyotismo"],
    link: ["conteudo.html","Ver na linha do tempo ↗"]
  },
  {
    id: "rev4",
    rotulo: "Revolução Industrial 4",
    cor: "#d946ef",
    x: "77%", y: "12%",
    arte: `<svg ${SVG_ATTR}>
      <rect x="38" y="38" width="44" height="44" rx="7" fill="currentColor" fill-opacity=".14"/>
      <rect x="50" y="50" width="20" height="20" rx="3"/>
      <path d="M46 38V26M60 38V22M74 38V26M46 82v12M60 82v16M74 82v12M38 46H26M38 60H22M38 74H26M82 46h12M82 60h16M82 74h12"/>
      <circle cx="46" cy="22" r="3.5"/><circle cx="60" cy="18" r="3.5"/><circle cx="74" cy="22" r="3.5"/>
      <circle cx="22" cy="60" r="3.5"/><circle cx="100" cy="60" r="3.5"/><circle cx="60" cy="102" r="3.5"/>
    </svg>`,
    data: "Século XXI",
    subtitulo: "A era dos sistemas conectados",
    titulo: "4ª Revolução Industrial",
    texto: "Inteligência artificial, internet das coisas, sensores e robótica avançada conectam máquinas, dados e sistemas. Fábricas inteligentes acompanham processos em tempo real e identificam falhas com mais rapidez.",
    destaques: [["Tecnologia","IA, IoT e sensores"],["Oportunidade","Novas profissões"],["Desafio","Uso responsável"]],
    tecnologia: "Inteligência artificial, internet das coisas, computação em nuvem, robôs colaborativos e gêmeos digitais.",
    trabalho: "Surgem trabalho remoto, serviços por aplicativo e funções ligadas a dados. Muitas tarefas mudam e exigem atualização constante.",
    impacto: "Educação, proteção social e direitos trabalhistas ajudam a distribuir melhor os benefícios e a lidar com privacidade e desigualdade.",
    marcos: ["Indústria 4.0 (termo de 2011)","Internet das coisas","Inteligência artificial"],
    link: ["conteudo.html","Ver na linha do tempo ↗"]
  },
  {
    id: "brasil",
    rotulo: "Indústria no Brasil",
    cor: "#fb923c",
    x: "81%", y: "52%",
    arte: `<svg ${SVG_ATTR}>
      <path d="M14 100V62l20 12V62l20 12V62l20 12V100z" fill="currentColor" fill-opacity=".15"/>
      <rect x="80" y="38" width="14" height="62" rx="2"/><path d="M78 38h18"/>
      <path d="M24 90h8M44 90h8M64 90h8"/>
      <circle cx="86" cy="28" r="5"/><circle cx="97" cy="18" r="4"/><circle cx="106" cy="10" r="3"/>
      <path d="M10 104h100"/>
    </svg>`,
    data: "Século XX – hoje",
    subtitulo: "Industrialização nacional",
    titulo: "A indústria no Brasil",
    texto: "A industrialização brasileira ganhou força no século XX. Com Getúlio Vargas, houve incentivo à indústria de base, como a Companhia Siderúrgica Nacional. Depois de 1950, a indústria automobilística cresceu e novas fábricas chegaram ao país.",
    destaques: [["Marco","Indústria de base"],["Expansão","Setor automobilístico"],["Questão atual","Desenvolvimento desigual"]],
    tecnologia: "Siderurgia, petróleo, automóveis e, mais recentemente, aviação e indústria digital.",
    trabalho: "Cidades cresceram e muitas pessoas migraram do campo e de outras regiões para os polos industriais.",
    impacto: "O processo foi desigual entre regiões. Hoje o país combina setores modernos com desafios de infraestrutura, investimento e formação profissional.",
    marcos: ["CSN (Volta Redonda)","Era Vargas","Indústria automobilística"],
    link: ["conteudo.html#brasil","Ver o Brasil na linha do tempo ↗"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const palco = document.getElementById("palco");
  if (!palco) return;

  const hub = document.getElementById("hub");
  const lista = document.getElementById("modelos");
  const voltar = document.getElementById("palco-voltar");
  const painel = document.getElementById("painel");
  const dica = document.getElementById("palco-dica");

  /* Cria os modelos clicáveis */
  modelos.forEach((m, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "modelo";
    b.dataset.id = m.id;
    b.style.setProperty("--x", m.x);
    b.style.setProperty("--y", m.y);
    b.style.setProperty("--cor", m.cor);
    b.style.setProperty("--d", `${i * 70}ms`);
    b.style.setProperty("--f", `${(i % 3) * 0.7}s`);
    b.setAttribute("aria-label", `${m.rotulo}: ver informações`);
    b.innerHTML = `<span class="modelo-flutua"><span class="modelo-arte">${m.arte}</span></span><span class="modelo-rotulo">${m.rotulo}<i></i></span>`;
    lista.appendChild(b);
  });

  const botoes = [...lista.querySelectorAll(".modelo")];
  let escolhido = null;

  const estado = (nome) => {
    palco.dataset.estado = nome;
    voltar.hidden = nome === "inicio";
    dica.hidden = nome !== "aberto";
    painel.setAttribute("aria-hidden", nome === "detalhe" ? "false" : "true");
    botoes.forEach(b => { b.tabIndex = nome === "aberto" ? 0 : -1; });
  };

  const montarPainel = (m) => {
    painel.style.setProperty("--cor", m.cor);
    painel.innerHTML = `
      <span class="painel-data">${m.data}</span>
      <p class="painel-sub">${m.subtitulo}</p>
      <h3 id="painel-titulo">${m.titulo}</h3>
      <p class="painel-texto">${m.texto}</p>
      <div class="painel-destaques">${m.destaques.map(d => `<div><span>${d[0]}</span><b>${d[1]}</b></div>`).join("")}</div>
      <div class="painel-blocos">
        <div><span>TECNOLOGIAS</span><p>${m.tecnologia}</p></div>
        <div><span>RELAÇÕES DE TRABALHO</span><p>${m.trabalho}</p></div>
        <div><span>IMPACTOS</span><p>${m.impacto}</p></div>
      </div>
      <div class="painel-rodape">
        <div class="painel-marcos">${m.marcos.map(x => `<em>${x}</em>`).join("")}</div>
        <a class="botao principal" href="${m.link[0]}">${m.link[1]}</a>
      </div>`;
    painel.scrollTop = 0;
  };

  const abrirLista = () => {
    escolhido = null;
    botoes.forEach(b => b.classList.remove("escolhido"));
    estado("aberto");
  };

  const escolher = (botao) => {
    const m = modelos.find(x => x.id === botao.dataset.id);
    if (!m) return;
    escolhido = botao;
    botoes.forEach(b => b.classList.toggle("escolhido", b === botao));
    montarPainel(m);
    estado("detalhe");
    voltar.focus({ preventScroll: true });
  };

  const voltarUmPasso = () => {
    if (palco.dataset.estado === "detalhe") {
      const anterior = escolhido;
      abrirLista();
      if (anterior) setTimeout(() => anterior.focus({ preventScroll: true }), 50);
    } else if (palco.dataset.estado === "aberto") {
      estado("inicio");
      hub.focus({ preventScroll: true });
    }
  };

  hub.addEventListener("click", () => { abrirLista(); setTimeout(() => botoes[0].focus({ preventScroll: true }), 80); });
  botoes.forEach(b => b.addEventListener("click", () => escolher(b)));
  voltar.addEventListener("click", voltarUmPasso);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && palco.dataset.estado !== "inicio") voltarUmPasso();
  });

  /* Inclinação 3D das imagens ao passar o mouse */
  const podeInclinar = window.matchMedia("(hover:hover)").matches && !window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  if (podeInclinar) {
    botoes.forEach(b => {
      const arte = b.querySelector(".modelo-arte");
      b.addEventListener("pointermove", e => {
        const r = arte.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        arte.style.transform = `perspective(520px) rotateX(${(-py * 22).toFixed(1)}deg) rotateY(${(px * 26).toFixed(1)}deg) scale(1.06)`;
      });
      b.addEventListener("pointerleave", () => { arte.style.transform = ""; });
    });
  }

  estado("inicio");
});


/* ---------- 3) Efeitos de vida: entrada ao rolar, números, brilho do mouse, cartões que viram ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const reduzir = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* entrada ao rolar */
  document.querySelectorAll(".card,.etapa,.bloco-intro,.equipe-faixa,.reflexao-final,.fontes,.titulo-conteudo,.filtros,.palco").forEach((el, i) => {
    el.classList.add("revelar");
    if (el.matches(".card")) el.style.setProperty("--atraso", `${(i % 3) * 110}ms`);
  });
  const alvos = document.querySelectorAll(".revelar");
  if ("IntersectionObserver" in window && !reduzir) {
    const obs = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        el.classList.add("visivel");
        obs.unobserve(el);
        /* depois da animação, devolve o controle do hover ao CSS de cada elemento */
        setTimeout(() => el.classList.remove("revelar", "visivel"), 1200);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    alvos.forEach(el => obs.observe(el));
  } else {
    alvos.forEach(el => el.classList.remove("revelar"));
  }

  /* contadores */
  const contar = (el) => {
    const alvo = Number(el.dataset.alvo), suf = el.dataset.sufixo || "";
    if (reduzir || !alvo) { el.textContent = alvo + suf; return; }
    const ini = performance.now(), dur = 1400;
    const passo = (t) => {
      const p = Math.min(1, (t - ini) / dur), v = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      el.textContent = v + suf;
      if (p < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };
  const numeros = document.querySelectorAll(".stat b[data-alvo]");
  if (numeros.length && "IntersectionObserver" in window) {
    numeros.forEach(n => { n.textContent = "0" + (n.dataset.sufixo || ""); });
    const obsN = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { contar(e.target); obsN.unobserve(e.target); }
    }), { threshold: 0.6 });
    numeros.forEach(n => obsN.observe(n));
  }

  /* brilho que segue o mouse (fundo e cartões) */
  if (window.matchMedia("(hover:hover)").matches && !reduzir) {
    let quadro = null;
    document.addEventListener("pointermove", e => {
      if (quadro) return;
      quadro = requestAnimationFrame(() => {
        quadro = null;
        document.documentElement.style.setProperty("--cx", `${e.clientX}px`);
        document.documentElement.style.setProperty("--cy", `${e.clientY}px`);
        const alvo = e.target.closest && e.target.closest(".card,.etapa-conteudo");
        if (alvo) {
          const r = alvo.getBoundingClientRect();
          alvo.style.setProperty("--mx", `${e.clientX - r.left}px`);
          alvo.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
      });
    });
  }

  /* cartões "Você sabia?" */
  document.querySelectorAll(".flip").forEach(c => c.addEventListener("click", () => {
    const virado = c.classList.toggle("virado");
    c.setAttribute("aria-pressed", String(virado));
  }));
});


/* ---------- 4) "Saiba mais" na linha do tempo ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".saiba-mais");
  if (!botoes.length) return;
  const alternar = (b, abrir) => {
    const painel = b.nextElementSibling;
    b.setAttribute("aria-expanded", String(abrir));
    b.querySelector("span").textContent = abrir ? "Mostrar menos" : "Saiba mais";
    painel.hidden = !abrir;
  };
  botoes.forEach(b => b.addEventListener("click", () => alternar(b, b.getAttribute("aria-expanded") !== "true")));
  const todos = document.getElementById("expandir-tudo");
  if (todos) todos.addEventListener("click", () => {
    const abrir = todos.getAttribute("aria-pressed") !== "true";
    todos.setAttribute("aria-pressed", String(abrir));
    todos.textContent = abrir ? "Fechar todos os detalhes －" : "Abrir todos os detalhes ＋";
    botoes.forEach(b => alternar(b, abrir));
  });
});
