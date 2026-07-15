import type { ToolContentMap } from "./types";

export const content: ToolContentMap = {
  "compress-jpg": {
    metaTitle: "Compresser JPG en ligne — compresseur JPEG gratuit | Image Shuttle",
    metaDescription:
      "Compressez vos images JPG/JPEG en ligne gratuitement. Réduisez la taille jusqu'à 80 % avec un curseur de qualité — sans téléversement, 100 % privé, dans le navigateur.",
    h1: "Compresser des images JPG",
    lead: "Réduisez vos photos JPG/JPEG jusqu'à 80 % grâce à un curseur de qualité. Gratuit, rapide et totalement privé — tout s'exécute dans votre navigateur, sans téléversement.",
    steps: [
      { title: "Importez votre JPG", desc: "Glissez-déposez vos fichiers JPG/JPEG dans la zone d'importation, ou cliquez pour parcourir. Vous pouvez sélectionner plusieurs fichiers à la fois." },
      { title: "Choisissez la qualité", desc: "Sélectionnez un préréglage de qualité ou ajustez le curseur, puis comparez l'avant/après pour trouver le bon équilibre entre taille et qualité." },
      { title: "Téléchargez", desc: "Appliquez la compression et téléchargez votre JPG allégé. Tout se passe en local — vos images ne quittent jamais votre appareil." },
    ],
    faqs: [
      { q: "De combien mon JPG sera-t-il réduit ?", a: "En général de 40 à 80 %, selon la photo et la qualité choisie. Les photos détaillées se compressent moins que les graphiques simples." },
      { q: "La compression réduit-elle la qualité de l'image ?", a: "La compression JPEG est avec perte, mais aux réglages de haute qualité la différence est difficile à percevoir. Utilisez le curseur avant/après pour vérifier avant de télécharger." },
      { q: "Mes images sont-elles téléversées sur un serveur ?", a: "Non. Toute la compression s'exécute dans votre navigateur via l'API Canvas, vos photos restent donc sur votre appareil — 100 % privé." },
      { q: "Y a-t-il une limite de taille ou de nombre de fichiers ?", a: "Il n'y a aucune limite au niveau de l'application ; seule la mémoire de votre navigateur compte. Vous pouvez compresser de nombreux fichiers par lots." },
      { q: "Puis-je plutôt convertir le JPG en WebP ou AVIF ?", a: "Oui. Choisissez WebP ou AVIF comme format de sortie pour des fichiers encore plus légers à qualité comparable." },
    ],
  },
  "compress-png": {
    metaTitle: "Compresser PNG en ligne — compresseur PNG gratuit | Image Shuttle",
    metaDescription:
      "Compressez vos images PNG en ligne gratuitement. Réduisez la taille de 30 à 70 % en préservant la transparence — sans téléversement, 100 % privé, via WebAssembly.",
    h1: "Compresser des images PNG",
    lead: "Réduisez la taille de vos fichiers PNG de 30 à 70 % tout en conservant la transparence intacte. Gratuit, rapide et entièrement privé — propulsé par WebAssembly dans le navigateur, sans téléversement.",
    steps: [
      { title: "Importez votre PNG", desc: "Glissez-déposez vos fichiers PNG ou cliquez pour parcourir. La sélection par lots de nombreux fichiers est prise en charge." },
      { title: "Compressez", desc: "Le quantificateur WebAssembly réduit la palette de couleurs tout en conservant le canal alpha, la transparence est donc préservée." },
      { title: "Téléchargez", desc: "Comparez avec le curseur avant/après et téléchargez votre PNG allégé. Rien n'est téléversé — tout s'exécute en local." },
    ],
    faqs: [
      { q: "La compression PNG conserve-t-elle la transparence ?", a: "Oui. Le canal alpha est entièrement préservé, les zones transparentes et semi-transparentes restent donc intactes." },
      { q: "De combien puis-je réduire un PNG ?", a: "Généralement de 30 à 70 %, selon le contenu. Les graphiques, logos et captures d'écran aux couleurs limitées se compressent le plus." },
      { q: "Est-ce sans perte ou avec perte ?", a: "La méthode utilise une quantification WebAssembly (réduction de palette avec perte) pour de grandes économies tout en gardant des images visuellement nettes." },
      { q: "Mes fichiers sont-ils téléversés ?", a: "Non. La compression se fait entièrement dans votre navigateur, vos PNG ne quittent donc jamais votre appareil." },
      { q: "Devrais-je plutôt utiliser le WebP pour le web ?", a: "Pour les sites web, le WebP est souvent ~26 % plus léger que le PNG à qualité comparable et prend aussi en charge la transparence — vous pouvez aussi convertir ici." },
    ],
  },
  "convert-to-webp": {
    metaTitle: "Convertir en WebP en ligne — JPG/PNG vers WebP gratuit | Image Shuttle",
    metaDescription:
      "Convertissez vos images JPG et PNG en WebP en ligne gratuitement. Des fichiers 25 à 35 % plus légers avec transparence — sans téléversement, 100 % privé, dans le navigateur.",
    h1: "Convertir des images en WebP",
    lead: "Convertissez vos JPG et PNG en WebP pour des fichiers 25 à 35 % plus légers avec une prise en charge complète de la transparence. Gratuit, privé et instantané — directement dans votre navigateur.",
    steps: [
      { title: "Importez des images", desc: "Déposez vos fichiers JPG ou PNG dans la zone d'importation, ou cliquez pour parcourir. Plusieurs fichiers sont pris en charge." },
      { title: "Sélectionnez WebP", desc: "Choisissez WebP comme format de sortie et réglez la qualité pour équilibrer taille et netteté." },
      { title: "Téléchargez", desc: "Convertissez et téléchargez vos fichiers WebP. Tout le traitement est local — rien n'est téléversé." },
    ],
    faqs: [
      { q: "Pourquoi convertir en WebP ?", a: "Les fichiers WebP sont généralement 25 à 35 % plus légers que le JPG/PNG à qualité comparable, ce qui accélère votre site et améliore les Core Web Vitals." },
      { q: "Le WebP prend-il en charge la transparence ?", a: "Oui, le WebP prend en charge un canal alpha comme le PNG, les images transparentes se convertissent donc proprement." },
      { q: "Tous les navigateurs prennent-ils en charge le WebP ?", a: "Tous les navigateurs modernes prennent en charge le WebP, ce qui en fait un choix sûr pour la diffusion web." },
      { q: "Mes images sont-elles téléversées ?", a: "Non. La conversion s'exécute dans votre navigateur via l'API Canvas — vos fichiers restent privés sur votre appareil." },
      { q: "Puis-je convertir plusieurs images à la fois ?", a: "Oui. La conversion par lots est prise en charge avec un traitement parallèle." },
    ],
  },
  "convert-to-avif": {
    metaTitle: "Convertir en AVIF en ligne — JPG/PNG vers AVIF gratuit | Image Shuttle",
    metaDescription:
      "Convertissez vos images en AVIF en ligne gratuitement. Des fichiers jusqu'à ~50 % plus légers que le JPG à qualité comparable — sans téléversement, 100 % privé, dans le navigateur.",
    h1: "Convertir des images en AVIF",
    lead: "Convertissez vos JPG et PNG en AVIF pour des fichiers jusqu'à ~50 % plus légers que le JPG à qualité comparable. Gratuit, privé et traité entièrement dans votre navigateur.",
    steps: [
      { title: "Importez des images", desc: "Glissez-déposez vos fichiers JPG ou PNG, ou cliquez pour parcourir. Plusieurs fichiers peuvent être convertis à la fois." },
      { title: "Sélectionnez AVIF", desc: "Choisissez AVIF comme format de sortie et ajustez la qualité selon vos besoins." },
      { title: "Téléchargez", desc: "Convertissez et téléchargez vos fichiers AVIF. Tout s'exécute en local — sans téléversement." },
    ],
    faqs: [
      { q: "Pourquoi choisir l'AVIF ?", a: "L'AVIF offre la meilleure compression parmi les formats web courants — souvent ~50 % plus léger que le JPG à qualité comparable — idéal pour des sites au chargement rapide." },
      { q: "L'AVIF prend-il en charge la transparence ?", a: "Oui, l'AVIF prend en charge un canal alpha, les images transparentes sont donc préservées." },
      { q: "L'AVIF est-il largement pris en charge ?", a: "Tous les principaux navigateurs actuels prennent en charge l'AVIF. Pour les navigateurs plus anciens, conservez une solution de repli JPG/WebP." },
      { q: "Mes images sont-elles envoyées à un serveur ?", a: "Non. La conversion se fait dans votre navigateur, vos fichiers restent donc privés." },
      { q: "Puis-je convertir en AVIF par lots ?", a: "Oui. Sélectionnez plusieurs fichiers et convertissez-les en parallèle." },
    ],
  },
  "resize-image": {
    metaTitle: "Redimensionner une image en ligne — outil au pixel près gratuit | Image Shuttle",
    metaDescription:
      "Redimensionnez vos images en ligne gratuitement. Dimensions exactes en pixels ou mise à l'échelle en pourcentage avec verrouillage des proportions — sans téléversement, 100 % privé.",
    h1: "Redimensionner des images",
    lead: "Redimensionnez vos photos à des dimensions exactes en pixels (par ex. 512×512) ou en pourcentage, avec verrouillage des proportions. Gratuit, privé et instantané dans votre navigateur.",
    steps: [
      { title: "Importez votre image", desc: "Glissez-déposez votre image ou cliquez pour parcourir. JPG, PNG, WebP et AVIF sont tous pris en charge." },
      { title: "Définissez les dimensions", desc: "Saisissez une largeur et une hauteur exactes en pixels, ou mettez à l'échelle en pourcentage. Verrouillez les proportions pour éviter la distorsion." },
      { title: "Téléchargez", desc: "Appliquez et téléchargez votre image redimensionnée. Tout le traitement est local — rien n'est téléversé." },
    ],
    faqs: [
      { q: "Puis-je redimensionner à une taille exacte comme 512×512 ?", a: "Oui. Saisissez la largeur et la hauteur exactes en pixels et exportez à ces dimensions." },
      { q: "Le redimensionnement conserve-t-il les proportions ?", a: "Activez le verrouillage des proportions et l'autre dimension s'ajuste automatiquement pour éviter l'étirement." },
      { q: "Le redimensionnement réduit-il la qualité ?", a: "La réduction reste nette. L'agrandissement dilate les pixels existants, un agrandissement extrême peut donc paraître flou." },
      { q: "Mes images sont-elles téléversées ?", a: "Non. Le redimensionnement s'exécute entièrement dans votre navigateur — vos images restent sur votre appareil." },
      { q: "Quels formats puis-je redimensionner ?", a: "JPG, PNG, WebP et AVIF. Vous pouvez aussi changer le format de sortie lors du redimensionnement." },
    ],
  },
  "batch-compress": {
    metaTitle: "Compresser des images par lots en ligne — outil groupé gratuit | Image Shuttle",
    metaDescription:
      "Compressez plusieurs images à la fois gratuitement. Compressez ou convertissez des dizaines de fichiers JPG/PNG/WebP/AVIF en parallèle — sans téléversement, 100 % privé.",
    h1: "Compresser des images par lots",
    lead: "Compressez ou convertissez des dizaines d'images à la fois grâce au traitement parallèle. Gratuit, privé et rapide — tout s'exécute en local dans votre navigateur.",
    steps: [
      { title: "Importez de nombreuses images", desc: "Glissez-déposez un dossier entier d'images ou sélectionnez plusieurs fichiers. JPG, PNG, WebP et AVIF sont pris en charge." },
      { title: "Définissez les options", desc: "Choisissez une seule qualité et un format de sortie à appliquer à tous les fichiers en même temps." },
      { title: "Tout télécharger", desc: "Traitez le lot en parallèle et téléchargez vos images compressées. Rien n'est téléversé." },
    ],
    faqs: [
      { q: "Combien d'images puis-je compresser à la fois ?", a: "Il n'y a aucune limite au niveau de l'application — seule la mémoire de votre navigateur compte. La file d'attente traite les fichiers en parallèle sur les cœurs de votre processeur." },
      { q: "Puis-je mélanger les formats dans un même lot ?", a: "Oui. Vous pouvez ajouter ensemble des JPG, PNG, WebP et AVIF et appliquer des réglages cohérents à tous." },
      { q: "Mes fichiers sont-ils téléversés quelque part ?", a: "Non. Chaque fichier est traité dans votre navigateur, vos images restent donc privées." },
      { q: "Puis-je convertir pendant la compression par lots ?", a: "Oui. Choisissez un format de sortie (par ex. WebP) pour convertir chaque fichier au moment de sa compression." },
      { q: "Le traitement par lots ralentit-il mon navigateur ?", a: "Il utilise des Web Workers ajustés au nombre de cœurs de votre processeur, gardant l'interface réactive pendant le travail." },
    ],
  },
};
