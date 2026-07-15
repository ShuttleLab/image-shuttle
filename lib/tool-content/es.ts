import type { ToolContentMap } from "./types";

export const content: ToolContentMap = {
  "compress-jpg": {
    metaTitle: "Comprimir JPG en línea — Compresor de JPEG gratis | Image Shuttle",
    metaDescription:
      "Comprime imágenes JPG/JPEG en línea gratis. Reduce el tamaño hasta un 80 % con un control de calidad ajustable, sin subidas, 100 % privado, en tu navegador.",
    h1: "Comprimir imágenes JPG",
    lead: "Reduce las fotos JPG/JPEG hasta un 80 % con un control de calidad. Gratis, rápido y totalmente privado: todo se ejecuta en tu navegador sin subidas.",
    steps: [
      { title: "Sube tu JPG", desc: "Arrastra y suelta tus archivos JPG/JPEG en el área de carga, o haz clic para explorar. Puedes seleccionar muchos archivos a la vez." },
      { title: "Elige la calidad", desc: "Selecciona un ajuste predefinido o afina el control deslizante, y previsualiza el antes/después para lograr el equilibrio adecuado entre tamaño y calidad." },
      { title: "Descarga", desc: "Aplica la compresión y descarga tu JPG más ligero. Todo ocurre localmente: tus imágenes nunca salen de tu dispositivo." },
    ],
    faqs: [
      { q: "¿Cuánto se reducirá mi JPG?", a: "Normalmente entre un 40 y un 80 %, según la foto y la calidad que elijas. Las fotos con muchos detalles se comprimen menos que los gráficos sencillos." },
      { q: "¿La compresión reducirá la calidad de la imagen?", a: "La compresión JPEG tiene pérdidas, pero con ajustes de alta calidad la diferencia es difícil de percibir. Usa el control deslizante de antes/después para confirmarlo antes de descargar." },
      { q: "¿Se suben mis imágenes a un servidor?", a: "No. Toda la compresión se ejecuta en tu navegador mediante la Canvas API, así que tus fotos permanecen en tu dispositivo: 100 % privado." },
      { q: "¿Hay un límite de tamaño o de cantidad de archivos?", a: "No hay límite a nivel de la aplicación; solo la memoria de tu navegador. Puedes comprimir muchos archivos por lotes a la vez." },
      { q: "¿Puedo convertir el JPG a WebP o AVIF en su lugar?", a: "Sí. Elige WebP o AVIF como formato de salida para obtener archivos aún más pequeños con una calidad similar." },
    ],
  },
  "compress-png": {
    metaTitle: "Comprimir PNG en línea — Compresor de PNG gratis | Image Shuttle",
    metaDescription:
      "Comprime imágenes PNG en línea gratis. Reduce el tamaño un 30–70 % conservando la transparencia, sin subidas, 100 % privado, con WebAssembly en el navegador.",
    h1: "Comprimir imágenes PNG",
    lead: "Reduce el tamaño de los PNG un 30–70 % manteniendo intacta la transparencia. Gratis, rápido y totalmente privado, impulsado por WebAssembly en el navegador y sin subidas.",
    steps: [
      { title: "Sube tu PNG", desc: "Arrastra y suelta tus archivos PNG o haz clic para explorar. Se admite la selección por lotes de muchos archivos a la vez." },
      { title: "Comprime", desc: "El cuantizador de WebAssembly reduce la paleta de colores conservando el canal alfa, de modo que la transparencia se mantiene." },
      { title: "Descarga", desc: "Compara con el control deslizante de antes/después y descarga tu PNG más ligero. No se sube nada: todo se ejecuta localmente." },
    ],
    faqs: [
      { q: "¿La compresión de PNG conserva la transparencia?", a: "Sí. El canal alfa se conserva por completo, así que las zonas transparentes y semitransparentes permanecen intactas." },
      { q: "¿Cuánto puedo reducir un PNG?", a: "Normalmente entre un 30 y un 70 %, según el contenido. Los gráficos, logotipos y capturas con pocos colores son los que más se comprimen." },
      { q: "¿Es sin pérdidas o con pérdidas?", a: "Usa cuantización con WebAssembly (reducción de paleta con pérdidas) para lograr un gran ahorro manteniendo las imágenes visualmente nítidas." },
      { q: "¿Se suben mis archivos?", a: "No. La compresión ocurre por completo en tu navegador, así que tus PNG nunca salen de tu dispositivo." },
      { q: "¿Debería usar WebP para la web en su lugar?", a: "Para sitios web, WebP suele ser un ~26 % más pequeño que PNG con una calidad similar y también admite transparencia: aquí también puedes convertir." },
    ],
  },
  "convert-to-webp": {
    metaTitle: "Convertir a WebP en línea — JPG/PNG a WebP gratis | Image Shuttle",
    metaDescription:
      "Convierte imágenes JPG y PNG a WebP en línea gratis. Consigue archivos un 25–35 % más pequeños con soporte de transparencia, sin subidas, 100 % privado, en tu navegador.",
    h1: "Convertir imágenes a WebP",
    lead: "Convierte JPG y PNG a WebP para lograr archivos un 25–35 % más pequeños con soporte completo de transparencia. Gratis, privado e instantáneo, directamente en tu navegador.",
    steps: [
      { title: "Sube las imágenes", desc: "Suelta tus archivos JPG o PNG en el área de carga, o haz clic para explorar. Se admiten varios archivos." },
      { title: "Selecciona WebP", desc: "Elige WebP como formato de salida y ajusta la calidad para equilibrar tamaño y nitidez." },
      { title: "Descarga", desc: "Convierte y descarga tus archivos WebP. Todo el procesamiento es local: no se sube nada." },
    ],
    faqs: [
      { q: "¿Por qué convertir a WebP?", a: "Los archivos WebP suelen ser un 25–35 % más pequeños que JPG/PNG con una calidad similar, lo que acelera tu sitio y mejora las Core Web Vitals." },
      { q: "¿WebP admite transparencia?", a: "Sí, WebP admite un canal alfa como PNG, así que las imágenes transparentes se convierten sin problemas." },
      { q: "¿Todos los navegadores admiten WebP?", a: "Todos los navegadores modernos admiten WebP, lo que lo convierte en una opción segura para la entrega web." },
      { q: "¿Se suben mis imágenes?", a: "No. La conversión se ejecuta en tu navegador mediante la Canvas API: tus archivos permanecen privados en tu dispositivo." },
      { q: "¿Puedo convertir muchas imágenes a la vez?", a: "Sí. Se admite la conversión por lotes con procesamiento en paralelo." },
    ],
  },
  "convert-to-avif": {
    metaTitle: "Convertir a AVIF en línea — JPG/PNG a AVIF gratis | Image Shuttle",
    metaDescription:
      "Convierte imágenes a AVIF en línea gratis. Consigue archivos hasta un ~50 % más pequeños que JPG con una calidad similar, sin subidas, 100 % privado, en el navegador.",
    h1: "Convertir imágenes a AVIF",
    lead: "Convierte JPG y PNG a AVIF para lograr archivos hasta un ~50 % más pequeños que JPG con una calidad similar. Gratis, privado y procesado por completo en tu navegador.",
    steps: [
      { title: "Sube las imágenes", desc: "Arrastra y suelta tus archivos JPG o PNG, o haz clic para explorar. Se pueden convertir varios archivos a la vez." },
      { title: "Selecciona AVIF", desc: "Elige AVIF como formato de salida y ajusta la calidad según tus necesidades." },
      { title: "Descarga", desc: "Convierte y descarga tus archivos AVIF. Todo se ejecuta localmente: sin subidas." },
    ],
    faqs: [
      { q: "¿Por qué elegir AVIF?", a: "AVIF ofrece la mejor compresión de los formatos web habituales, a menudo un ~50 % más pequeño que JPG con una calidad similar, ideal para sitios de carga rápida." },
      { q: "¿AVIF admite transparencia?", a: "Sí, AVIF admite un canal alfa, así que las imágenes transparentes se conservan." },
      { q: "¿AVIF tiene amplia compatibilidad?", a: "Todos los navegadores principales actuales admiten AVIF. Para navegadores antiguos, mantén una alternativa en JPG/WebP." },
      { q: "¿Se envían mis imágenes a un servidor?", a: "No. La conversión ocurre en tu navegador, así que tus archivos permanecen privados." },
      { q: "¿Puedo convertir a AVIF por lotes?", a: "Sí. Selecciona varios archivos y conviértelos en paralelo." },
    ],
  },
  "resize-image": {
    metaTitle: "Redimensionar imagen en línea — Ajuste a píxeles exactos gratis | Image Shuttle",
    metaDescription:
      "Redimensiona imágenes en línea gratis. Define dimensiones exactas en píxeles o escala por porcentaje con bloqueo de relación de aspecto, sin subidas, 100 % privado, en tu navegador.",
    h1: "Redimensionar imágenes",
    lead: "Redimensiona fotos a dimensiones exactas en píxeles (p. ej. 512×512) o por porcentaje, con bloqueo de relación de aspecto. Gratis, privado e instantáneo en tu navegador.",
    steps: [
      { title: "Sube tu imagen", desc: "Arrastra y suelta tu imagen o haz clic para explorar. Se admiten JPG, PNG, WebP y AVIF." },
      { title: "Define las dimensiones", desc: "Introduce un ancho y un alto exactos en píxeles, o escala por porcentaje. Bloquea la relación de aspecto para evitar distorsiones." },
      { title: "Descarga", desc: "Aplica y descarga tu imagen redimensionada. Todo el procesamiento es local: no se sube nada." },
    ],
    faqs: [
      { q: "¿Puedo redimensionar a un tamaño exacto como 512×512?", a: "Sí. Escribe el ancho y el alto exactos en píxeles y exporta con esas dimensiones." },
      { q: "¿El redimensionado mantendrá la relación de aspecto?", a: "Activa el bloqueo de la relación de aspecto y la otra dimensión se ajustará automáticamente para evitar el estiramiento." },
      { q: "¿Redimensionar reduce la calidad?", a: "Reducir el tamaño mantiene la nitidez. Ampliar agranda los píxeles existentes, así que una ampliación extrema puede verse borrosa." },
      { q: "¿Se suben mis imágenes?", a: "No. El redimensionado se ejecuta por completo en tu navegador: tus imágenes permanecen en tu dispositivo." },
      { q: "¿Qué formatos puedo redimensionar?", a: "JPG, PNG, WebP y AVIF. También puedes cambiar el formato de salida al redimensionar." },
    ],
  },
  "batch-compress": {
    metaTitle: "Comprimir imágenes por lotes en línea — Compresor masivo gratis | Image Shuttle",
    metaDescription:
      "Comprime muchas imágenes a la vez gratis. Comprime o convierte docenas de archivos JPG/PNG/WebP/AVIF en paralelo, sin subidas, 100 % privado, en tu navegador.",
    h1: "Comprimir imágenes por lotes",
    lead: "Comprime o convierte docenas de imágenes a la vez con procesamiento en paralelo. Gratis, privado y rápido: todo se ejecuta localmente en tu navegador.",
    steps: [
      { title: "Sube muchas imágenes", desc: "Arrastra y suelta una carpeta entera de imágenes o selecciona varios archivos. Se admiten JPG, PNG, WebP y AVIF." },
      { title: "Configura las opciones", desc: "Elige una única calidad y formato de salida para aplicarlos a todos los archivos a la vez." },
      { title: "Descarga todo", desc: "Procesa el lote en paralelo y descarga tus imágenes comprimidas. No se sube nada." },
    ],
    faqs: [
      { q: "¿Cuántas imágenes puedo comprimir a la vez?", a: "No hay límite a nivel de la aplicación, solo la memoria de tu navegador. La cola procesa los archivos en paralelo aprovechando los núcleos de tu CPU." },
      { q: "¿Puedo mezclar formatos en un mismo lote?", a: "Sí. Puedes añadir JPG, PNG, WebP y AVIF juntos y aplicar los mismos ajustes a todos." },
      { q: "¿Se suben mis archivos a algún sitio?", a: "No. Cada archivo se procesa en tu navegador, así que tus imágenes permanecen privadas." },
      { q: "¿Puedo convertir mientras comprimo por lotes?", a: "Sí. Elige un formato de salida (p. ej. WebP) para convertir cada archivo a medida que se comprime." },
      { q: "¿El procesamiento por lotes ralentiza mi navegador?", a: "Usa Web Workers ajustados al número de núcleos de tu CPU, lo que mantiene la interfaz fluida mientras trabaja." },
    ],
  },
};
