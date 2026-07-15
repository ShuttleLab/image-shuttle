import type { ToolContentMap } from "./types";

export const content: ToolContentMap = {
  "compress-jpg": {
    metaTitle: "Comprimir JPG Online — Compressor de JPEG Grátis | Image Shuttle",
    metaDescription:
      "Comprima imagens JPG/JPEG online de graça. Reduza o tamanho do arquivo em até 80% com um controle de qualidade ajustável — sem envio, 100% privado, no navegador.",
    h1: "Comprimir imagens JPG",
    lead: "Reduza fotos JPG/JPEG em até 80% com um controle de qualidade. Grátis, rápido e totalmente privado — tudo roda no seu navegador, sem envios.",
    steps: [
      { title: "Envie seu JPG", desc: "Arraste e solte seus arquivos JPG/JPEG na área de envio ou clique para procurar. Você pode selecionar vários arquivos de uma vez." },
      { title: "Escolha a qualidade", desc: "Escolha uma predefinição de qualidade ou ajuste o controle deslizante e visualize o antes/depois para achar o equilíbrio ideal entre tamanho e qualidade." },
      { title: "Baixe", desc: "Aplique a compressão e baixe seu JPG menor. Tudo acontece localmente — suas imagens nunca saem do seu dispositivo." },
    ],
    faqs: [
      { q: "Quanto menor meu JPG vai ficar?", a: "Normalmente 40–80% menor, dependendo da foto e da qualidade escolhida. Fotos com muitos detalhes comprimem menos do que gráficos simples." },
      { q: "A compressão reduz a qualidade da imagem?", a: "A compressão JPEG é com perdas, mas em configurações de alta qualidade a diferença é difícil de notar. Use o controle de comparação antes/depois para conferir antes de baixar." },
      { q: "Minhas imagens são enviadas a um servidor?", a: "Não. Toda a compressão roda no seu navegador via Canvas API, então suas fotos permanecem no seu dispositivo — 100% privado." },
      { q: "Há limite de tamanho ou quantidade de arquivos?", a: "Não há limite no aplicativo; apenas a memória do seu navegador. Você pode comprimir muitos arquivos em lote de uma vez." },
      { q: "Posso converter JPG para WebP ou AVIF em vez disso?", a: "Sim. Escolha WebP ou AVIF como formato de saída para arquivos ainda menores com qualidade semelhante." },
    ],
  },
  "compress-png": {
    metaTitle: "Comprimir PNG Online — Compressor de PNG Grátis | Image Shuttle",
    metaDescription:
      "Comprima imagens PNG online de graça. Reduza o tamanho do PNG em 30–70% preservando a transparência — sem envio, 100% privado, compressão WebAssembly no navegador.",
    h1: "Comprimir imagens PNG",
    lead: "Reduza o tamanho dos arquivos PNG em 30–70% mantendo a transparência intacta. Grátis, rápido e totalmente privado — com WebAssembly no navegador e sem envios.",
    steps: [
      { title: "Envie seu PNG", desc: "Arraste e solte seus arquivos PNG ou clique para procurar. A seleção em lote é compatível com muitos arquivos de uma vez." },
      { title: "Comprima", desc: "O quantizador WebAssembly reduz a paleta de cores mantendo o canal alfa, então a transparência é preservada." },
      { title: "Baixe", desc: "Compare com o controle de antes/depois e baixe seu PNG menor. Nada é enviado — tudo roda localmente." },
    ],
    faqs: [
      { q: "A compressão de PNG mantém a transparência?", a: "Sim. O canal alfa é totalmente preservado, então as áreas transparentes e semitransparentes permanecem intactas." },
      { q: "Quanto posso reduzir um PNG?", a: "Geralmente 30–70%, dependendo do conteúdo. Gráficos, logos e capturas de tela com poucas cores comprimem mais." },
      { q: "É sem perdas ou com perdas?", a: "Usa quantização WebAssembly (redução de paleta com perdas) para grandes economias, mantendo as imagens visualmente nítidas." },
      { q: "Meus arquivos são enviados?", a: "Não. A compressão acontece inteiramente no seu navegador, então seus PNGs nunca saem do seu dispositivo." },
      { q: "Devo usar WebP para a web em vez disso?", a: "Para sites, o WebP costuma ser cerca de 26% menor que o PNG com qualidade semelhante e também suporta transparência — você pode converter aqui também." },
    ],
  },
  "convert-to-webp": {
    metaTitle: "Converter para WebP Online — JPG/PNG para WebP Grátis | Image Shuttle",
    metaDescription:
      "Converta imagens JPG e PNG para WebP online de graça. Arquivos 25–35% menores com suporte a transparência — sem envio, 100% privado, no seu navegador.",
    h1: "Converter imagens para WebP",
    lead: "Converta JPG e PNG para WebP e obtenha arquivos 25–35% menores com suporte total a transparência. Grátis, privado e instantâneo — direto no seu navegador.",
    steps: [
      { title: "Envie as imagens", desc: "Solte seus arquivos JPG ou PNG na área de envio ou clique para procurar. Vários arquivos são compatíveis." },
      { title: "Selecione WebP", desc: "Escolha WebP como formato de saída e defina a qualidade para equilibrar tamanho e nitidez." },
      { title: "Baixe", desc: "Converta e baixe seus arquivos WebP. Todo o processamento é local — nada é enviado." },
    ],
    faqs: [
      { q: "Por que converter para WebP?", a: "Arquivos WebP costumam ser 25–35% menores que JPG/PNG com qualidade semelhante, o que acelera seu site e melhora as Core Web Vitals." },
      { q: "O WebP suporta transparência?", a: "Sim, o WebP suporta um canal alfa como o PNG, então imagens transparentes são convertidas de forma limpa." },
      { q: "Todos os navegadores suportam WebP?", a: "Todos os navegadores modernos suportam WebP, tornando-o uma escolha segura para entrega na web." },
      { q: "Minhas imagens são enviadas?", a: "Não. A conversão roda no seu navegador via Canvas API — seus arquivos permanecem privados no seu dispositivo." },
      { q: "Posso converter muitas imagens de uma vez?", a: "Sim. A conversão em lote é compatível com processamento em paralelo." },
    ],
  },
  "convert-to-avif": {
    metaTitle: "Converter para AVIF Online — JPG/PNG para AVIF Grátis | Image Shuttle",
    metaDescription:
      "Converta imagens para AVIF online de graça. Arquivos até ~50% menores que o JPG com qualidade semelhante — sem envio, 100% privado, no navegador.",
    h1: "Converter imagens para AVIF",
    lead: "Converta JPG e PNG para AVIF e obtenha arquivos até ~50% menores que o JPG com qualidade semelhante. Grátis, privado e processado inteiramente no seu navegador.",
    steps: [
      { title: "Envie as imagens", desc: "Arraste e solte seus arquivos JPG ou PNG ou clique para procurar. Vários arquivos podem ser convertidos de uma vez." },
      { title: "Selecione AVIF", desc: "Escolha AVIF como formato de saída e ajuste a qualidade conforme sua necessidade." },
      { title: "Baixe", desc: "Converta e baixe seus arquivos AVIF. Tudo roda localmente — sem envios." },
    ],
    faqs: [
      { q: "Por que escolher AVIF?", a: "O AVIF oferece a melhor compressão entre os formatos comuns da web — muitas vezes ~50% menor que o JPG com qualidade semelhante — ideal para sites de carregamento rápido." },
      { q: "O AVIF suporta transparência?", a: "Sim, o AVIF suporta um canal alfa, então imagens transparentes são preservadas." },
      { q: "O AVIF tem suporte amplo?", a: "Todos os principais navegadores atuais suportam AVIF. Para navegadores antigos, mantenha um fallback em JPG/WebP." },
      { q: "Minhas imagens são enviadas a um servidor?", a: "Não. A conversão acontece no seu navegador, então seus arquivos permanecem privados." },
      { q: "Posso converter em lote para AVIF?", a: "Sim. Selecione vários arquivos e converta-os em paralelo." },
    ],
  },
  "resize-image": {
    metaTitle: "Redimensionar Imagem Online — Redimensionador em Pixels Exatos Grátis | Image Shuttle",
    metaDescription:
      "Redimensione imagens online de graça. Defina dimensões exatas em pixels ou escale por porcentagem com trava de proporção — sem envio, 100% privado, no navegador.",
    h1: "Redimensionar imagens",
    lead: "Redimensione fotos para dimensões exatas em pixels (ex.: 512×512) ou por porcentagem, com trava de proporção. Grátis, privado e instantâneo no seu navegador.",
    steps: [
      { title: "Envie sua imagem", desc: "Arraste e solte sua imagem ou clique para procurar. JPG, PNG, WebP e AVIF são todos compatíveis." },
      { title: "Defina as dimensões", desc: "Insira uma largura e uma altura exatas em pixels ou escale por porcentagem. Trave a proporção para evitar distorção." },
      { title: "Baixe", desc: "Aplique e baixe sua imagem redimensionada. Todo o processamento é local — nada é enviado." },
    ],
    faqs: [
      { q: "Posso redimensionar para um tamanho exato como 512×512?", a: "Sim. Digite a largura e a altura exatas em pixels e exporte nessas dimensões." },
      { q: "O redimensionamento mantém a proporção?", a: "Ative a trava de proporção e a outra dimensão se ajusta automaticamente para evitar esticamento." },
      { q: "O redimensionamento reduz a qualidade?", a: "A redução mantém a nitidez. A ampliação aumenta os pixels existentes, então ampliações extremas podem ficar borradas." },
      { q: "Minhas imagens são enviadas?", a: "Não. O redimensionamento roda inteiramente no seu navegador — suas imagens permanecem no seu dispositivo." },
      { q: "Quais formatos posso redimensionar?", a: "JPG, PNG, WebP e AVIF. Você também pode alterar o formato de saída ao redimensionar." },
    ],
  },
  "batch-compress": {
    metaTitle: "Comprimir Imagens em Lote Online — Compressor em Massa Grátis | Image Shuttle",
    metaDescription:
      "Comprima muitas imagens de uma vez de graça. Comprima ou converta dezenas de arquivos JPG/PNG/WebP/AVIF em paralelo — sem envio, 100% privado, no navegador.",
    h1: "Comprimir imagens em lote",
    lead: "Comprima ou converta dezenas de imagens de uma vez com processamento em paralelo. Grátis, privado e rápido — tudo roda localmente no seu navegador.",
    steps: [
      { title: "Envie muitas imagens", desc: "Arraste e solte uma pasta inteira de imagens ou selecione vários arquivos. JPG, PNG, WebP e AVIF são compatíveis." },
      { title: "Defina as opções", desc: "Escolha uma única qualidade e formato de saída para aplicar a todos os arquivos de uma vez." },
      { title: "Baixe tudo", desc: "Processe o lote em paralelo e baixe suas imagens comprimidas. Nada é enviado." },
    ],
    faqs: [
      { q: "Quantas imagens posso comprimir de uma vez?", a: "Não há limite no aplicativo — apenas a memória do seu navegador. A fila processa os arquivos em paralelo entre os núcleos da sua CPU." },
      { q: "Posso misturar formatos em um lote?", a: "Sim. Você pode adicionar JPG, PNG, WebP e AVIF juntos e aplicar configurações consistentes a todos." },
      { q: "Meus arquivos são enviados para algum lugar?", a: "Não. Cada arquivo é processado no seu navegador, então suas imagens permanecem privadas." },
      { q: "Posso converter enquanto comprimo em lote?", a: "Sim. Escolha um formato de saída (ex.: WebP) para converter cada arquivo à medida que ele é comprimido." },
      { q: "O processamento em lote deixa meu navegador lento?", a: "Ele usa Web Workers ajustados ao número de núcleos da sua CPU, mantendo a interface responsiva enquanto trabalha." },
    ],
  },
};
