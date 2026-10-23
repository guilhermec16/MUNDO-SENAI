const questoes = [
{pergunta:"Como muitos produtos eram feitos antes da industrialização?",opcoes:["Por robôs programáveis","Manualmente por artesãos","Em linhas de montagem elétricas","Com computadores conectados"],certa:1},
{pergunta:"Qual tecnologia marcou a 1ª Revolução Industrial?",opcoes:["Inteligência artificial","Internet das coisas","Máquina a vapor","Computador pessoal"],certa:2},
{pergunta:"Uma consequência da expansão das fábricas foi...",opcoes:["O crescimento das cidades e a migração do campo","O fim imediato do trabalho manual","O desaparecimento do comércio","A redução de todas as jornadas"],certa:0},
{pergunta:"Quais fontes de energia e materiais se destacaram na 2ª Revolução Industrial?",opcoes:["Somente madeira e vento","Eletricidade, petróleo e aço","Energia solar e baterias modernas","Apenas carvão e ferramentas manuais"],certa:1},
{pergunta:"O fordismo está relacionado principalmente a...",opcoes:["Produção individual em oficinas","Trabalho exclusivamente remoto","Produção em massa e linha de montagem","Produção sem divisão de tarefas"],certa:2},
{pergunta:"O que o taylorismo buscava?",opcoes:["Eliminar todas as fábricas","Retornar à produção artesanal","Substituir a eletricidade por vapor","Organizar e medir tarefas para elevar a produtividade"],certa:3},
{pergunta:"Quais tecnologias marcaram a 3ª Revolução Industrial?",opcoes:["Eletrônica, computadores e automação","Somente ferramentas manuais","Máquina a vapor como única inovação","Carroças e moinhos tradicionais"],certa:0},
{pergunta:"O que caracteriza a 4ª Revolução Industrial?",opcoes:["A interrupção das comunicações","Máquinas, dados e sistemas digitais conectados","A volta exclusiva ao trabalho manual","O abandono dos computadores"],certa:1},
{pergunta:"Qual é um desafio ligado às novas tecnologias no trabalho?",opcoes:["Não precisar aprender novas habilidades","Garantir que toda profissão desapareça","Conciliar inovação com qualificação e direitos","Impedir qualquer mudança tecnológica"],certa:2},
{pergunta:"Qual período impulsionou a indústria de base no Brasil?",opcoes:["A Idade Média","O período colonial inicial apenas","A década de 2020 exclusivamente","O governo de Getúlio Vargas"],certa:3}
];

document.addEventListener("DOMContentLoaded", () => {
  const filtros = document.querySelectorAll(".filtro");
  const etapas = document.querySelectorAll(".etapa");
  filtros.forEach(botao => botao.addEventListener("click", () => {
    filtros.forEach(item => item.classList.remove("ativo"));
    botao.classList.add("ativo");
    const filtro = botao.dataset.filtro;
    etapas.forEach(etapa => {
      etapa.hidden = !(filtro === "todos" || etapa.dataset.etapa === filtro);
    });
  }));

  const area = document.getElementById("quiz-perguntas");
  const formulario = document.getElementById("quiz-form");
  if (!area || !formulario) return;

  questoes.forEach((q, i) => {
    const secao = document.createElement("section");
    secao.className = "questao";
    secao.innerHTML = `<div class="questao-cabecalho"><div><span class="questao-num">PERGUNTA ${String(i+1).padStart(2,"0")} / 10</span><h2>${q.pergunta}</h2></div><span class="questao-pontos">1 ponto</span></div><div class="opcoes">${q.opcoes.map((opcao,j)=>`<button class="opcao" type="button" data-pergunta="${i}" data-opcao="${j}"><span class="letra">${String.fromCharCode(65+j)}</span><span>${opcao}</span></button>`).join("")}</div>`;
    area.appendChild(secao);
  });

  const atualizarProgresso = () => {
    const respondidas = new Set([...document.querySelectorAll(".opcao.escolhida")].map(b => b.dataset.pergunta)).size;
    document.getElementById("progresso-texto").textContent = `${respondidas} de 10 respondidas`;
    document.getElementById("barra-progresso").style.width = `${respondidas*10}%`;
  };

  area.addEventListener("click", evento => {
    const botao = evento.target.closest(".opcao");
    if (!botao) return;
    const grupo = area.querySelectorAll(`.opcao[data-pergunta="${botao.dataset.pergunta}"]`);
    grupo.forEach(opcao => opcao.classList.remove("escolhida"));
    botao.classList.add("escolhida");
    atualizarProgresso();
  });

  formulario.addEventListener("submit", evento => {
    evento.preventDefault();
    let pontos = 0;
    let respondidas = 0;
    questoes.forEach((q,i) => {
      const selecionada = area.querySelector(`.opcao.escolhida[data-pergunta="${i}"]`);
      if (selecionada) {
        respondidas++;
        if (Number(selecionada.dataset.opcao) === q.certa) pontos++;
      }
      area.querySelectorAll(`.opcao[data-pergunta="${i}"]`).forEach(opcao => {
        opcao.disabled = true;
        if (Number(opcao.dataset.opcao) === q.certa) opcao.classList.add("correta");
        else if (opcao.classList.contains("escolhida")) opcao.classList.add("errada");
      });
    });
    const resultado = document.getElementById("resultado-quiz");
    let mensagem = pontos >= 8 ? "Excelente! Você entendeu muito bem as transformações industriais." : pontos >= 5 ? "Bom trabalho! Revise os temas das perguntas que errou para consolidar o conteúdo." : "Continue explorando a linha do tempo e tente novamente. Aprender também é revisar!";
    resultado.innerHTML = `<div class="nota-grande">${pontos}<span style="font-size:22px;color:#a99d91"> / 10</span></div><h2>${pontos>=8?"História na ponta da língua!":pontos>=5?"Você está no caminho!":"Vamos aprender mais!"}</h2><p>${mensagem}</p><p>Você respondeu ${respondidas} das 10 perguntas. As opções verdes indicam as respostas corretas.</p><button type="button" class="botao principal" id="tentar-novamente">Tentar novamente ↻</button>`;
    resultado.classList.add("visivel");
    resultado.scrollIntoView({behavior:"smooth",block:"center"});
    document.getElementById("tentar-novamente").addEventListener("click", () => {
      area.querySelectorAll(".opcao").forEach(opcao => {opcao.disabled=false;opcao.classList.remove("escolhida","correta","errada")});
      resultado.classList.remove("visivel");
      atualizarProgresso();
      window.scrollTo({top:0,behavior:"smooth"});
    });
  });
});

/* Cartões interativos da órbita na página inicial */
document.addEventListener("DOMContentLoaded", () => {
  const orbitItems = document.querySelectorAll(".orbita-item");
  if (!orbitItems.length || document.getElementById("janela-revolucao")) return;

  const conteudos = {
    "item-a": {
      data: "1760–1850",
      titulo: "1ª Revolução Industrial",
      subtitulo: "A era do vapor",
      texto: "A primeira Revolução Industrial começou na Grã-Bretanha e transformou a produção artesanal em produção mecanizada nas fábricas.",
      tecnologia: "Máquina a vapor, carvão e máquinas têxteis.",
      trabalho: "Muitas pessoas migraram do campo para as cidades. As jornadas eram longas e as condições de trabalho, frequentemente difíceis.",
      impacto: "A produção aumentou, mas surgiram conflitos sobre salários, exploração infantil e condições de trabalho."
    },
    "item-b": {
      data: "1870–1914",
      titulo: "2ª Revolução Industrial",
      subtitulo: "A era da eletricidade",
      texto: "Novas fontes de energia e materiais permitiram ampliar a indústria, os transportes e as comunicações.",
      tecnologia: "Eletricidade, petróleo, aço e linha de montagem.",
      trabalho: "O taylorismo organizava as tarefas e o fordismo ampliou a produção em massa. Algumas atividades se tornaram repetitivas.",
      impacto: "Sindicatos e movimentos trabalhistas lutaram por melhores salários, jornadas menores e direitos."
    },
    "item-c": {
      data: "1950–2000",
      titulo: "3ª Revolução Industrial",
      subtitulo: "A era digital e da automação",
      texto: "A eletrônica e os computadores mudaram a indústria, permitindo controlar máquinas e automatizar etapas da produção.",
      tecnologia: "Computadores, eletrônica, robôs industriais e telecomunicações.",
      trabalho: "Cresceu a demanda por conhecimentos técnicos, enquanto algumas funções foram automatizadas ou transformadas.",
      impacto: "A produtividade aumentou e a qualificação profissional tornou-se cada vez mais importante."
    },
    "item-d": {
      data: "Século XXI",
      titulo: "4ª Revolução Industrial",
      subtitulo: "A era dos sistemas conectados",
      texto: "Máquinas, programas e dados se conectam em tempo real, dando origem a fábricas inteligentes e novas formas de trabalhar.",
      tecnologia: "Inteligência artificial, internet das coisas, sensores e robótica avançada.",
      trabalho: "Surgem novas profissões e formas de trabalho, como atividades remotas e serviços mediados por aplicativos.",
      impacto: "Os desafios incluem qualificação, privacidade, desigualdade e proteção dos direitos dos trabalhadores."
    }
  };

  const janela = document.createElement("div");
  janela.id = "janela-revolucao";
  janela.className = "janela-revolucao";
  janela.setAttribute("aria-hidden", "true");
  janela.innerHTML = `
    <div class="janela-fundo" data-fechar="sim"></div>
    <section class="janela-cartao" role="dialog" aria-modal="true" aria-labelledby="janela-titulo">
      <button class="janela-fechar" type="button" aria-label="Fechar informações">×</button>
      <span class="janela-data"></span>
      <p class="janela-subtitulo"></p>
      <h2 id="janela-titulo"></h2>
      <p class="janela-texto"></p>
      <div class="janela-detalhe"><span>TECNOLOGIAS</span><p class="janela-tecnologia"></p></div>
      <div class="janela-detalhe"><span>RELAÇÕES DE TRABALHO</span><p class="janela-trabalho"></p></div>
      <div class="janela-detalhe"><span>IMPACTOS</span><p class="janela-impacto"></p></div>
      <a class="botao principal janela-link" href="conteudo.html">Ver linha do tempo ↗</a>
    </section>`;
  document.body.appendChild(janela);

  const fechar = () => {
    janela.classList.remove("aberta");
    janela.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-aberto");
  };

  const abrir = (chave) => {
    const item = conteudos[chave];
    if (!item) return;
    janela.querySelector(".janela-data").textContent = item.data;
    janela.querySelector(".janela-subtitulo").textContent = item.subtitulo;
    janela.querySelector("#janela-titulo").textContent = item.titulo;
    janela.querySelector(".janela-texto").textContent = item.texto;
    janela.querySelector(".janela-tecnologia").textContent = item.tecnologia;
    janela.querySelector(".janela-trabalho").textContent = item.trabalho;
    janela.querySelector(".janela-impacto").textContent = item.impacto;
    janela.classList.add("aberta");
    janela.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-aberto");
    janela.querySelector(".janela-fechar").focus();
  };

  orbitItems.forEach((botao) => {
    botao.setAttribute("role", "button");
    botao.setAttribute("tabindex", "0");
    botao.setAttribute("aria-haspopup", "dialog");
    botao.addEventListener("click", () => abrir(["item-a","item-b","item-c","item-d"].find(classe => botao.classList.contains(classe))));
    botao.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrir(["item-a","item-b","item-c","item-d"].find(classe => botao.classList.contains(classe)));
      }
    });
  });

  janela.addEventListener("click", (evento) => {
    if (evento.target.dataset.fechar === "sim" || evento.target.closest(".janela-fechar")) fechar();
  });
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && janela.classList.contains("aberta")) fechar();
  });
});
