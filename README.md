# TRABALHO.FUTURO — Da oficina à robótica

Site escolar com três páginas sobre a evolução das máquinas e das relações de trabalho.

## Como abrir
Extraia o ZIP e abra `index.html` em um navegador atualizado.

## Páginas
- `index.html`: início, com banner interativo (clique no botão central, escolha uma revolução industrial e veja as informações principais; use "Voltar" ou Esc para retornar). O card "Evolução dos carros" mostra, em ilustrações animadas, como os carros e a automação evoluíram a cada revolução (`carros.js`).
- `conteudo.html`: linha do tempo com filtros por período; cada etapa tem um bloco "Saiba mais" (contexto, datas, personagens, conexão com hoje), além de tabela comparativa e glossário.
- `cidade.html` + `cidade.js`: minigame "Cidade em Revolução". Construa uma cidade isométrica e leve-a das oficinas artesanais até a Indústria 4.0, equilibrando empregos, energia, poluição, qualificação e bem-estar. Há eventos históricos (greves, fumaça, automação) com escolhas, e o progresso é salvo no navegador (localStorage).

## Tecnologias
HTML, CSS e JavaScript. A tipografia personalizada usa Google Fonts; se estiver sem internet, o navegador usa fontes alternativas.

## Referências incluídas
- Encyclopaedia Britannica — Industrial Revolution
- Organização Internacional do Trabalho
- IBGE

## Aparência (botão no topo de todas as páginas)
- **Escuro** (padrão): fundo escuro com brilhos roxo, ciano e laranja.
- **Claro**: fundo claro em todo o site, indicado para quem enxerga melhor com fundo claro.
A escolha fica salva no navegador. No `style.css`, o tema é controlado pelo atributo `data-tema` da tag `<html>`.
As fontes foram ampliadas para facilitar a leitura (nenhum texto fica menor que 12 px).

## Arquivos (todos na mesma pasta)
`index.html`, `conteudo.html`, `cidade.html`, `style.css`, `script.js`, `carros.js`, `cidade.js`

## Fotos (seção "Pessoas por trás das máquinas", "Um dia na vida", abertura de cada etapa e card "Evolução dos carros")
O site tenta carregar cada foto nesta ordem; se nada funcionar, mostra uma ilustração (ou esconde a faixa de foto), e nada quebra:
1. **Arquivo local na mesma pasta do site**, com um destes nomes: `foto-fiandeira-1909.jpg`, `foto-linha-ford-1913.jpg`, `foto-greve-1917.jpg`, `foto-trabalho-hoje.jpg`.
2. **Arquivo fixo do Wikimedia Commons** (domínio público): *Spinner in Globe Cotton Mill* (Lewis Hine, 1909) e *A-line1913* (Ford, 1913).
3. **Foto principal de um artigo da Wikipédia**, buscada automaticamente quando há internet (por exemplo: Spinning jenny, Ford Model T, Nissan Leaf, Greve geral de 1917). O código só usa imagens do Commons com licença livre (domínio público ou Creative Commons) e monta o crédito automaticamente, com link para a página da imagem.

Os **cards do banner** da página inicial e a **ficha das construções do minigame** (ao passar o mouse em oficina, moinho, fábrica a vapor, estação, usina, linha de montagem, fábrica automatizada, data center, usina solar e fábrica 4.0) também mostram uma foto real quando há internet.

No card "Evolução dos carros", o botão **Foto real** mostra uma foto da etapa (precisa de internet); **Ilustração** volta ao desenho.
Para trocar o assunto de uma foto, altere o atributo `data-wiki` (por exemplo, `en:Ford_Model_T` ou `pt:Greve_geral_de_1917`) na imagem correspondente.
Os personagens dos blocos "Um dia na vida" são **ilustrativos**, criados a partir de fatos históricos, e estão identificados assim no site.

## Versão de teste de paleta
Paleta de teste: vinho `#651424`, branco `#ffffff` e laranja `#ff5825` (mais tons derivados). Para voltar ao visual anterior, use o pacote `MUNDO-SENAI-atualizado.zip`.
