import type { ToolContentMap } from "./types";

export const content: ToolContentMap = {
  "compress-jpg": {
    metaTitle: "Comprimere JPG online — Compressore JPEG gratuito | Image Shuttle",
    metaDescription:
      "Comprimi immagini JPG/JPEG online gratis. Riduci le dimensioni del file fino all'80% con un cursore di qualità regolabile — nessun caricamento, 100% privato, nel browser.",
    h1: "Comprimere immagini JPG",
    lead: "Riduci le foto JPG/JPEG fino all'80% con un cursore di qualità. Gratuito, veloce e completamente privato: tutto avviene nel tuo browser, senza caricamenti.",
    steps: [
      { title: "Carica il tuo JPG", desc: "Trascina e rilascia i tuoi file JPG/JPEG nell'area di caricamento, oppure clicca per sfogliare. Puoi selezionare molti file contemporaneamente." },
      { title: "Scegli la qualità", desc: "Scegli un preset di qualità o regola il cursore, poi visualizza l'anteprima prima/dopo per trovare il giusto equilibrio tra dimensione e qualità." },
      { title: "Scarica", desc: "Applica la compressione e scarica il tuo JPG più leggero. Tutto avviene localmente: le tue immagini non lasciano mai il tuo dispositivo." },
    ],
    faqs: [
      { q: "Quanto sarà più piccolo il mio JPG?", a: "In genere dal 40 all'80% più piccolo, a seconda della foto e della qualità che scegli. Le foto ricche di dettagli si comprimono meno delle grafiche semplici." },
      { q: "La compressione ridurrà la qualità dell'immagine?", a: "La compressione JPEG è con perdita, ma con impostazioni di alta qualità la differenza è difficile da notare. Usa il cursore prima/dopo per verificare prima di scaricare." },
      { q: "Le mie immagini vengono caricate su un server?", a: "No. Tutta la compressione avviene nel tuo browser tramite la Canvas API, quindi le tue foto restano sul tuo dispositivo — 100% privato." },
      { q: "C'è un limite di dimensione o di numero di file?", a: "Non c'è alcun limite a livello di app; solo la memoria del tuo browser. Puoi comprimere in blocco molti file contemporaneamente." },
      { q: "Posso convertire il JPG in WebP o AVIF?", a: "Sì. Scegli WebP o AVIF come formato di output per ottenere file ancora più piccoli a qualità simile." },
    ],
  },
  "compress-png": {
    metaTitle: "Comprimere PNG online — Compressore PNG gratuito | Image Shuttle",
    metaDescription:
      "Comprimi immagini PNG online gratis. Riduci le dimensioni dei PNG del 30-70% preservando la trasparenza — nessun caricamento, 100% privato, compressione WebAssembly nel browser.",
    h1: "Comprimere immagini PNG",
    lead: "Riduci le dimensioni dei file PNG del 30-70% mantenendo intatta la trasparenza. Gratuito, veloce e del tutto privato: basato su WebAssembly nel browser, senza caricamenti.",
    steps: [
      { title: "Carica il tuo PNG", desc: "Trascina e rilascia i tuoi file PNG o clicca per sfogliare. La selezione in blocco supporta molti file contemporaneamente." },
      { title: "Comprimi", desc: "Il quantizzatore WebAssembly riduce la palette dei colori mantenendo il canale alfa, così la trasparenza viene preservata." },
      { title: "Scarica", desc: "Confronta con il cursore prima/dopo e scarica il tuo PNG più leggero. Nulla viene caricato: tutto avviene localmente." },
    ],
    faqs: [
      { q: "La compressione del PNG mantiene la trasparenza?", a: "Sì. Il canale alfa è completamente preservato, quindi le aree trasparenti e semitrasparenti restano intatte." },
      { q: "Di quanto posso ridurre un PNG?", a: "Di solito dal 30 al 70%, a seconda del contenuto. Grafiche, loghi e screenshot con colori limitati si comprimono di più." },
      { q: "È senza perdita o con perdita?", a: "Usa la quantizzazione WebAssembly (riduzione della palette con perdita) per grandi risparmi mantenendo le immagini visivamente nitide." },
      { q: "I miei file vengono caricati?", a: "No. La compressione avviene interamente nel tuo browser, quindi i tuoi PNG non lasciano mai il tuo dispositivo." },
      { q: "Dovrei usare WebP per il web?", a: "Per i siti web, il WebP è spesso circa il 26% più piccolo del PNG a qualità simile e supporta anch'esso la trasparenza — puoi convertirlo anche qui." },
    ],
  },
  "convert-to-webp": {
    metaTitle: "Convertire in WebP online — Da JPG/PNG a WebP gratis | Image Shuttle",
    metaDescription:
      "Converti immagini JPG e PNG in WebP online gratis. Ottieni file più piccoli del 25-35% con supporto alla trasparenza — nessun caricamento, 100% privato, nel browser.",
    h1: "Convertire immagini in WebP",
    lead: "Converti JPG e PNG in WebP per file più piccoli del 25-35% con pieno supporto alla trasparenza. Gratuito, privato e istantaneo: direttamente nel tuo browser.",
    steps: [
      { title: "Carica le immagini", desc: "Rilascia i tuoi file JPG o PNG nell'area di caricamento, oppure clicca per sfogliare. Sono supportati più file." },
      { title: "Seleziona WebP", desc: "Scegli WebP come formato di output e imposta la qualità per bilanciare dimensione e nitidezza." },
      { title: "Scarica", desc: "Converti e scarica i tuoi file WebP. Tutta l'elaborazione è locale: nulla viene caricato." },
    ],
    faqs: [
      { q: "Perché convertire in WebP?", a: "I file WebP sono in genere più piccoli del 25-35% rispetto a JPG/PNG a qualità simile, il che velocizza il tuo sito e migliora i Core Web Vitals." },
      { q: "Il WebP supporta la trasparenza?", a: "Sì, il WebP supporta un canale alfa come il PNG, quindi le immagini trasparenti si convertono in modo pulito." },
      { q: "Tutti i browser supportano il WebP?", a: "Tutti i browser moderni supportano il WebP, il che lo rende una scelta sicura per la distribuzione web." },
      { q: "Le mie immagini vengono caricate?", a: "No. La conversione avviene nel tuo browser tramite la Canvas API: i tuoi file restano privati sul tuo dispositivo." },
      { q: "Posso convertire molte immagini contemporaneamente?", a: "Sì. La conversione in blocco è supportata con elaborazione parallela." },
    ],
  },
  "convert-to-avif": {
    metaTitle: "Convertire in AVIF online — Da JPG/PNG ad AVIF gratis | Image Shuttle",
    metaDescription:
      "Converti immagini in AVIF online gratis. Ottieni file fino a circa il 50% più piccoli del JPG a qualità simile — nessun caricamento, 100% privato, nel browser.",
    h1: "Convertire immagini in AVIF",
    lead: "Converti JPG e PNG in AVIF per file fino a circa il 50% più piccoli del JPG a qualità simile. Gratuito, privato ed elaborato interamente nel tuo browser.",
    steps: [
      { title: "Carica le immagini", desc: "Trascina e rilascia i tuoi file JPG o PNG, oppure clicca per sfogliare. Puoi convertire più file contemporaneamente." },
      { title: "Seleziona AVIF", desc: "Scegli AVIF come formato di output e regola la qualità secondo le tue esigenze." },
      { title: "Scarica", desc: "Converti e scarica i tuoi file AVIF. Tutto avviene localmente: nessun caricamento." },
    ],
    faqs: [
      { q: "Perché scegliere l'AVIF?", a: "L'AVIF offre la migliore compressione tra i comuni formati web — spesso circa il 50% più piccolo del JPG a qualità simile — ideale per siti a caricamento rapido." },
      { q: "L'AVIF supporta la trasparenza?", a: "Sì, l'AVIF supporta un canale alfa, quindi le immagini trasparenti vengono preservate." },
      { q: "L'AVIF è ampiamente supportato?", a: "Tutti gli attuali browser principali supportano l'AVIF. Per i browser più datati, mantieni un fallback JPG/WebP." },
      { q: "Le mie immagini vengono inviate a un server?", a: "No. La conversione avviene nel tuo browser, quindi i tuoi file restano privati." },
      { q: "Posso convertire in AVIF in blocco?", a: "Sì. Seleziona più file e convertili in parallelo." },
    ],
  },
  "resize-image": {
    metaTitle: "Ridimensionare immagine online — Ridimensionatore a pixel esatti gratis | Image Shuttle",
    metaDescription:
      "Ridimensiona immagini online gratis. Imposta dimensioni in pixel esatte o scala in percentuale con blocco delle proporzioni — nessun caricamento, 100% privato, nel browser.",
    h1: "Ridimensionare immagini",
    lead: "Ridimensiona le foto a dimensioni in pixel esatte (es. 512×512) o in percentuale, con blocco delle proporzioni. Gratuito, privato e istantaneo nel tuo browser.",
    steps: [
      { title: "Carica la tua immagine", desc: "Trascina e rilascia la tua immagine o clicca per sfogliare. JPG, PNG, WebP e AVIF sono tutti supportati." },
      { title: "Imposta le dimensioni", desc: "Inserisci una larghezza e un'altezza esatte in pixel, oppure scala in percentuale. Blocca le proporzioni per evitare distorsioni." },
      { title: "Scarica", desc: "Applica e scarica la tua immagine ridimensionata. Tutta l'elaborazione è locale: nulla viene caricato." },
    ],
    faqs: [
      { q: "Posso ridimensionare a una dimensione esatta come 512×512?", a: "Sì. Digita la larghezza e l'altezza esatte in pixel ed esporta a quelle dimensioni." },
      { q: "Il ridimensionamento manterrà le proporzioni?", a: "Attiva il blocco delle proporzioni e l'altra dimensione si regola automaticamente per evitare lo stiramento." },
      { q: "Il ridimensionamento riduce la qualità?", a: "La riduzione resta nitida. L'ingrandimento allarga i pixel esistenti, quindi un ingrandimento estremo può apparire sfocato." },
      { q: "Le mie immagini vengono caricate?", a: "No. Il ridimensionamento avviene interamente nel tuo browser: le tue immagini restano sul tuo dispositivo." },
      { q: "Quali formati posso ridimensionare?", a: "JPG, PNG, WebP e AVIF. Puoi anche cambiare il formato di output durante il ridimensionamento." },
    ],
  },
  "batch-compress": {
    metaTitle: "Comprimere immagini in blocco online — Compressore di massa gratuito | Image Shuttle",
    metaDescription:
      "Comprimi molte immagini in blocco gratis. Comprimi o converti decine di file JPG/PNG/WebP/AVIF in parallelo — nessun caricamento, 100% privato, nel browser.",
    h1: "Comprimere immagini in blocco",
    lead: "Comprimi o converti decine di immagini contemporaneamente con l'elaborazione parallela. Gratuito, privato e veloce: tutto avviene localmente nel tuo browser.",
    steps: [
      { title: "Carica molte immagini", desc: "Trascina e rilascia un'intera cartella di immagini o seleziona più file. JPG, PNG, WebP e AVIF sono supportati." },
      { title: "Imposta le opzioni", desc: "Scegli un'unica qualità e un formato di output da applicare a tutti i file contemporaneamente." },
      { title: "Scarica tutto", desc: "Elabora il blocco in parallelo e scarica le tue immagini compresse. Nulla viene caricato." },
    ],
    faqs: [
      { q: "Quante immagini posso comprimere contemporaneamente?", a: "Non c'è alcun limite a livello di app — solo la memoria del tuo browser. La coda elabora i file in parallelo sui core della tua CPU." },
      { q: "Posso mischiare i formati in un unico blocco?", a: "Sì. Puoi aggiungere insieme JPG, PNG, WebP e AVIF e applicare a tutti impostazioni coerenti." },
      { q: "I miei file vengono caricati da qualche parte?", a: "No. Ogni file viene elaborato nel tuo browser, quindi le tue immagini restano private." },
      { q: "Posso convertire durante la compressione in blocco?", a: "Sì. Scegli un formato di output (es. WebP) per convertire ogni file mentre viene compresso." },
      { q: "L'elaborazione in blocco rallenta il mio browser?", a: "Usa i Web Worker calibrati sul numero di core della tua CPU, mantenendo l'interfaccia reattiva mentre lavora." },
    ],
  },
};
