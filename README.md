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
- **Escuro**: fundo escuro em todo o site.
- **Misto** (padrão): fundo escuro com seções claras intercaladas, para dar contraste.
- **Claro**: fundo claro em todo o site, indicado para quem enxerga melhor com fundo claro.
A escolha fica salva no navegador. No `style.css`, o tema é controlado pelo atributo `data-tema` da tag `<html>`.

## Arquivos (todos na mesma pasta)
`index.html`, `conteudo.html`, `cidade.html`, `style.css`, `script.js`, `carros.js`, `cidade.js`
