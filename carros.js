/* ============================================================
   EVOLUÇÃO DOS CARROS — card extra do banner da página inicial
   Ilustrações próprias em SVG, uma para cada etapa da automação.
   ============================================================ */
(() => {
  "use strict";

  const SVG = 'viewBox="0 0 320 180" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" role="img"';

  const roda = (cx, cy, r, raios) => {
    let s = "";
    for (let i = 0; i < raios; i++) {
      const a = (i / raios) * Math.PI * 2;
      s += `<path d="M${cx} ${cy}L${(cx + Math.cos(a) * r * 0.92).toFixed(1)} ${(cy + Math.sin(a) * r * 0.92).toFixed(1)}" stroke-width="1.6"/>`;
    }
    return `<g class="roda" style="transform-origin:${cx}px ${cy}px"><circle cx="${cx}" cy="${cy}" r="${r}" class="f2"/><circle cx="${cx}" cy="${cy}" r="${(r * 0.42).toFixed(1)}"/>${s}</g>`;
  };
  const chao = '<path d="M8 152H312" stroke-dasharray="4 7" opacity=".45"/>';

  const ARTE = {
    carruagem: (t) => `<svg ${SVG} aria-label="${t}">${chao}
      <rect x="34" y="62" width="82" height="54" rx="10" class="f"/><path d="M28 64q47-28 94 0"/>
      <rect x="45" y="74" width="26" height="22" rx="4"/><rect x="80" y="74" width="26" height="22" rx="4"/>
      <path d="M116 98H176"/>
      ${roda(58, 126, 26, 10)}${roda(112, 136, 16, 8)}
      <path d="M170 92q-18 8-12 38"/>
      <ellipse cx="204" cy="100" rx="34" ry="19" class="f2"/>
      <path d="M226 86Q242 56 258 48L272 60Q256 72 244 106Z" class="f2"/>
      <ellipse cx="270" cy="58" rx="14" ry="7" transform="rotate(30 270 58)" class="f2"/><circle cx="274" cy="55" r="1.8" class="solid"/>
      <path d="M260 46l4-10 6 9"/>
      <path d="M186 114l-2 36M196 116l4 34M214 116l6 34M224 112l10 34" stroke-width="3.6"/>
    </svg>`,

    vapor: (t) => `<svg ${SVG} aria-label="${t}">${chao}
      <rect x="40" y="104" width="196" height="12" rx="3" class="f"/>
      <rect x="52" y="84" width="104" height="20" rx="4"/>
      <rect x="62" y="68" width="88" height="14" rx="7" class="f2"/><circle cx="148" cy="75" r="6"/>
      ${roda(88, 122, 30, 12)}${roda(248, 128, 24, 10)}
      <circle cx="240" cy="84" r="38" class="f2"/><path d="M204 84h72M212 66h56M212 102h56" stroke-width="1.6"/>
      <circle cx="222" cy="76" r="1.8" class="solid"/><circle cx="258" cy="76" r="1.8" class="solid"/><circle cx="240" cy="94" r="1.8" class="solid"/>
      <rect x="230" y="30" width="18" height="24" rx="2" class="f"/><path d="M226 30h26"/>
      <circle class="fumaca" cx="240" cy="22" r="6"/><circle class="fumaca f-b" cx="252" cy="12" r="8"/><circle class="fumaca f-c" cx="268" cy="8" r="10"/>
      <path d="M268 108l-10 18"/>
    </svg>`,

    modeloT: (t) => `<svg ${SVG} aria-label="${t}">${chao}
      <rect x="98" y="62" width="112" height="56" rx="6" class="f"/>
      <path d="M210 90H278Q286 90 286 98V118H210Z" class="f2"/>
      <rect x="280" y="92" width="8" height="26" rx="2" class="solid"/>
      <path d="M206 62V92" stroke-width="3.4"/>
      <path d="M92 62Q92 40 120 38H196"/><rect x="104" y="30" width="100" height="10" rx="5" class="f2"/><path d="M110 40V62M198 40V62"/>
      <rect x="132" y="74" width="32" height="18" rx="4"/><path d="M186 74l14-8"/><ellipse cx="202" cy="65" rx="5" ry="2"/>
      <rect x="92" y="118" width="124" height="6" rx="2"/>
      <path d="M52 128A32 32 0 0 1 116 128M214 128A32 32 0 0 1 278 128"/>
      <circle cx="290" cy="84" r="5" class="f2"/>
      ${roda(84, 128, 24, 12)}${roda(246, 128, 24, 12)}
    </svg>`,

    eletronico: (t) => `<svg ${SVG} aria-label="${t}">${chao}
      <path d="M40 124V106Q40 98 54 96L120 70Q130 64 148 64H206Q222 64 232 76L258 96Q286 98 288 112V124Z" class="f"/>
      <path d="M126 92L146 70H204Q214 70 222 80L236 92Z" class="f2"/><path d="M172 70V92M172 96V120M158 102h10"/>
      <rect x="274" y="102" width="12" height="6" rx="2" class="solid"/><rect x="40" y="102" width="8" height="8" rx="2" class="solid"/>
      ${roda(86, 126, 22, 6)}${roda(238, 126, 22, 6)}
      <g class="etiqueta"><rect x="30" y="14" width="50" height="24" rx="8" class="f2"/><text x="55" y="30" text-anchor="middle">ECU</text><path d="M55 38V60L246 86" stroke-dasharray="3 4" stroke-width="1.4"/></g>
      <g class="etiqueta e2"><rect x="104" y="14" width="50" height="24" rx="8" class="f2"/><text x="129" y="30" text-anchor="middle">ABS</text><path d="M129 38V90L88 112" stroke-dasharray="3 4" stroke-width="1.4"/></g>
      <g class="etiqueta e3"><rect x="178" y="14" width="64" height="24" rx="8" class="f2"/><text x="210" y="30" text-anchor="middle">Airbag</text><path d="M210 38V66" stroke-dasharray="3 4" stroke-width="1.4"/></g>
    </svg>`,

    autonomo: (t) => `<svg ${SVG} aria-label="${t}">${chao}
      <path d="M44 124V110Q44 100 62 98L112 92Q134 66 170 64H206Q234 66 248 92L276 100Q294 104 294 118V124Z" class="f"/>
      <path d="M126 92Q144 74 170 72H206Q226 74 238 92Z" class="f2"/><path d="M174 74V94M160 104h12"/>
      <path d="M282 102h12" stroke-width="3.6"/>
      <rect x="182" y="54" width="20" height="10" rx="3" class="solid"/><path class="varre" d="M192 54V46" style="transform-origin:192px 54px"/>
      <path class="onda" d="M176 44Q192 30 208 44"/><path class="onda o2" d="M168 36Q192 12 216 36"/>
      <path class="onda o3" d="M300 98Q312 108 300 118"/><path class="onda o4" d="M306 90Q322 108 306 126"/>
      <path d="M62 70l-9 16h10l-8 18" class="raio" stroke-width="2.8"/>
      ${roda(92, 126, 22, 5)}${roda(246, 126, 22, 5)}
    </svg>`
  };

  const ESTAGIOS = [
    {
      curto: "Antes", era: "Antes das máquinas", ano: "até c. 1760", titulo: "Carruagem puxada por cavalos", cor: "#8b5cf6", arte: "carruagem", nivel: 0,
      nivelTxt: "Nenhuma automação: tudo dependia do cocheiro e dos animais.",
      como_era: "Veículos de madeira com rodas grandes e pouca suspensão, puxados por cavalos ou bois. Viajar era lento e cansativo, e as estradas, em geral, eram de terra.",
      como_func: "A força vinha dos animais. O cocheiro guiava com rédeas e chicote, e o freio era um mecanismo simples nas rodas ou a própria parada dos animais.",
      curio: "A unidade “cavalo-vapor”, usada até hoje para medir motores, foi criada por James Watt para comparar a força das máquinas com a dos cavalos."
    },
    {
      curto: "1ª", era: "1ª Revolução Industrial", ano: "1769", titulo: "Fardier a vapor de Cugnot", cor: "#f97316", arte: "vapor", nivel: 1,
      nivelTxt: "Nível 1: a máquina faz a força, mas o condutor controla tudo.",
      como_era: "Um dos primeiros veículos autopropulsados da história: um carro pesado, de madeira e ferro, com três rodas e uma grande caldeira na frente. O francês Nicolas-Joseph Cugnot o projetou para puxar canhões.",
      como_func: "O carvão aquecia a água da caldeira, e o vapor empurrava pistões ligados à roda da frente. Era preciso reabastecer de água e combustível com frequência, e o veículo andava a poucos quilômetros por hora.",
      curio: "Segundo relatos, os testes mostraram que ele era difícil de controlar, e ele pode ter protagonizado um dos primeiros acidentes de automóvel."
    },
    {
      curto: "2ª", era: "2ª Revolução Industrial", ano: "1886–1913", titulo: "Do Benz Motorwagen ao Ford Modelo T", cor: "#06b6d4", arte: "modeloT", nivel: 2,
      nivelTxt: "Nível 2: motor de combustão e partida elétrica ajudam, mas o motorista faz tudo.",
      como_era: "O Motorwagen de Karl Benz (1886) é visto como o primeiro automóvel com motor de combustão feito para uso próprio. O Ford Modelo T (1908) era simples e resistente e, com a linha de montagem móvel (1913), ficou barato para milhões de pessoas.",
      como_func: "Motor a gasolina de combustão interna, câmbio e pedais manuais. No Modelo T a partida era por manivela; a partida elétrica chegou em 1912, em um Cadillac, e acabou com o risco da manivela.",
      curio: "Entre 1908 e 1927 foram fabricados mais de 15 milhões de Modelos T. O grande salto de automação dessa fase estava na fábrica."
    },
    {
      curto: "3ª", era: "3ª Revolução Industrial", ano: "1950–2000", titulo: "O carro da era eletrônica", cor: "#7c3aed", arte: "eletronico", nivel: 3,
      nivelTxt: "Nível 3: o computador assume tarefas pontuais, e o motorista continua dirigindo.",
      como_era: "Carros com injeção eletrônica, computador de bordo, freios ABS, airbag e vidros e travas elétricos. Nas fábricas, robôs soldavam e pintavam carrocerias; o primeiro robô industrial, o Unimate, trabalhou em uma fábrica da GM em 1961.",
      como_func: "Sensores medem rotação, temperatura e oxigênio, e um módulo eletrônico (ECU) ajusta a mistura de combustível. No ABS, sensores nas rodas evitam o travamento dos freios. O controle de cruzeiro (1958) mantém a velocidade sozinho.",
      curio: "O Mazda Eunos Cosmo (1990) foi o primeiro carro de produção com navegação por GPS."
    },
    {
      curto: "4ª", era: "4ª Revolução Industrial", ano: "século XXI", titulo: "Carro elétrico, conectado e autônomo", cor: "#d946ef", arte: "autonomo", nivel: 4,
      nivelTxt: "Nível 4 de 5: autônomo em condições e locais definidos. O nível 5, em qualquer lugar, ainda é uma meta.",
      como_era: "Carros elétricos (como o Nissan Leaf, de 2010), conectados à internet, com câmeras, radares e sensores ao redor. O software se atualiza pelo ar, como o de um celular.",
      como_func: "Câmeras, radar e lidar mapeiam o entorno, e a inteligência artificial reconhece pessoas, faixas e sinais e decide frear, acelerar ou virar. Já existem frenagem automática de emergência e manutenção de faixa, e há veículos autônomos em testes e em serviços limitados em algumas cidades.",
      curio: "A indústria classifica a direção automatizada em níveis de 0 a 5. No nível 5, o carro dirigiria sozinho em qualquer lugar e condição."
    }
  ];

  const iconeCard = `<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 82V72Q12 66 20 64L36 60Q44 44 60 44H80Q94 46 100 60L108 64Q112 66 112 74V82Z" fill="currentColor" fill-opacity=".18"/>
      <path d="M42 60Q50 50 60 50H80Q90 52 96 60Z"/>
      <circle cx="34" cy="84" r="9"/><circle cx="90" cy="84" r="9"/><circle cx="34" cy="84" r="2.5"/><circle cx="90" cy="84" r="2.5"/>
      <path d="M36 28Q60 10 84 28M45 36Q60 24 75 36"/><path d="M104 22l-5 9h6l-4 9"/>
    </svg>`;

  const modelo = {
    id: "carros", rotulo: "Evolução dos carros", cor: "#0891b2", x: "3%", y: "56%", arte: iconeCard,
    data: "séc. XVIII → hoje", subtitulo: "Do cavalo ao carro autônomo", titulo: "A evolução dos carros e da automação"
  };

  let timer = null, atual = 0, raiz = null;
  const parar = () => {
    if (timer) { clearInterval(timer); timer = null; }
    if (raiz) { const b = raiz.querySelector('[data-acao="play"]'); if (b) { b.classList.remove("tocando"); b.querySelector("span").textContent = "▶ Reproduzir"; } }
  };

  function mostrar(i, entrar) {
    atual = (i + ESTAGIOS.length) % ESTAGIOS.length;
    const e = ESTAGIOS[atual];
    raiz.style.setProperty("--cor", e.cor);
    const img = raiz.querySelector(".car-img");
    img.innerHTML = ARTE[e.arte](e.titulo);
    if (entrar) { img.classList.remove("entra"); void img.offsetWidth; img.classList.add("entra"); }
    raiz.querySelector(".car-legenda").innerHTML = `<b>${e.titulo}</b><span>${e.era} • ${e.ano}</span>`;
    const info = raiz.querySelector(".car-info");
    info.innerHTML = `<div class="car-bloco"><span>COMO ERA</span><p>${e.como_era}</p></div>
      <div class="car-bloco"><span>COMO FUNCIONAVA</span><p>${e.como_func}</p></div>
      <div class="car-curio"><b>Curiosidade:</b> ${e.curio}</div>`;
    if (entrar) { info.classList.remove("entra"); void info.offsetWidth; info.classList.add("entra"); }
    raiz.querySelectorAll(".car-nivel i").forEach((s, k) => s.classList.toggle("on", k < e.nivel));
    raiz.querySelector(".car-nivel-txt").textContent = e.nivelTxt;
    raiz.querySelectorAll(".car-tab").forEach((b, k) => { b.setAttribute("aria-selected", String(k === atual)); b.classList.toggle("ativo", k === atual); b.classList.toggle("feito", k < atual); });
  }

  function montar(painel, m) {
    parar();
    raiz = painel; atual = 0;
    painel.style.setProperty("--cor", ESTAGIOS[0].cor);
    painel.innerHTML = `
      <span class="painel-data">${m.data}</span>
      <p class="painel-sub">${m.subtitulo}</p>
      <h3 id="painel-titulo" class="car-titulo">${m.titulo}</h3>
      <div class="car-tabs" role="tablist" aria-label="Etapas da evolução dos carros">
        ${ESTAGIOS.map((e, i) => `<button class="car-tab" role="tab" type="button" data-i="${i}" style="--cor:${e.cor}" aria-selected="false"><span class="car-mini">${ARTE[e.arte](e.titulo)}</span><b>${e.curto}</b><small>${e.ano}</small></button>`).join("")}
      </div>
      <div class="car-cena">
        <div class="car-visual">
          <div class="car-img"></div>
          <p class="car-legenda"></p>
          <div class="car-nivel-wrap"><span class="car-nivel-rotulo">AUTOMAÇÃO</span><div class="car-nivel" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div></div>
          <p class="car-nivel-txt"></p>
          <div class="car-controles">
            <button type="button" class="car-btn" data-acao="ant" aria-label="Etapa anterior">‹</button>
            <button type="button" class="car-btn car-play" data-acao="play"><span>▶ Reproduzir</span></button>
            <button type="button" class="car-btn" data-acao="prox" aria-label="Próxima etapa">›</button>
          </div>
        </div>
        <div class="car-info" aria-live="polite"></div>
      </div>
      <div class="painel-rodape">
        <div class="painel-marcos"><em>Cugnot (1769)</em><em>Benz (1886)</em><em>Modelo T (1908)</em><em>ABS (1978)</em><em>Carros autônomos</em></div>
        <a class="botao principal" href="conteudo.html">Ver na linha do tempo ↗</a>
      </div>`;
    painel.querySelectorAll(".car-tab").forEach(b => b.addEventListener("click", () => { parar(); mostrar(+b.dataset.i, true); }));
    painel.querySelector('[data-acao="ant"]').addEventListener("click", () => { parar(); mostrar(atual - 1, true); });
    painel.querySelector('[data-acao="prox"]').addEventListener("click", () => { parar(); mostrar(atual + 1, true); });
    painel.querySelector('[data-acao="play"]').addEventListener("click", ev => {
      const b = ev.currentTarget;
      if (timer) { parar(); return; }
      b.classList.add("tocando"); b.querySelector("span").textContent = "⏸ Pausar";
      if (atual >= ESTAGIOS.length - 1) mostrar(0, true);
      timer = setInterval(() => {
        if (atual >= ESTAGIOS.length - 1) { parar(); return; }
        mostrar(atual + 1, true);
      }, 3600);
    });
    mostrar(0, false);
  }

  window.EvolucaoCarros = { modelo, montar, parar };
})();
