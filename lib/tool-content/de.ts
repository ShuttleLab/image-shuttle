import type { ToolContentMap } from "./types";

export const content: ToolContentMap = {
  "compress-jpg": {
    metaTitle: "JPG komprimieren online — kostenloser JPEG-Kompressor | Image Shuttle",
    metaDescription:
      "JPG/JPEG-Bilder kostenlos online komprimieren. Dateigröße um bis zu 80 % reduzieren mit Qualitätsregler – kein Upload, 100 % privat, im Browser verarbeitet.",
    h1: "JPG-Bilder komprimieren",
    lead: "Verkleinere JPG/JPEG-Fotos um bis zu 80 % mit einem Qualitätsregler. Kostenlos, schnell und vollständig privat – alles läuft in deinem Browser, ganz ohne Upload.",
    steps: [
      { title: "JPG hochladen", desc: "Ziehe deine JPG/JPEG-Dateien per Drag & Drop in den Upload-Bereich oder klicke zum Durchsuchen. Du kannst viele Dateien gleichzeitig auswählen." },
      { title: "Qualität wählen", desc: "Wähle eine Voreinstellung oder feinjustiere den Regler und prüfe dann die Vorher/Nachher-Vorschau, um das richtige Verhältnis von Größe und Qualität zu finden." },
      { title: "Herunterladen", desc: "Wende die Komprimierung an und lade dein kleineres JPG herunter. Alles läuft lokal – deine Bilder verlassen niemals dein Gerät." },
    ],
    faqs: [
      { q: "Wie viel kleiner wird mein JPG?", a: "Typischerweise 40–80 % kleiner, je nach Foto und gewählter Qualität. Detailreiche Fotos lassen sich weniger stark komprimieren als einfache Grafiken." },
      { q: "Verringert die Komprimierung die Bildqualität?", a: "Die JPEG-Komprimierung ist verlustbehaftet, aber bei hohen Qualitätseinstellungen ist der Unterschied kaum sichtbar. Nutze den Vorher/Nachher-Regler, um es vor dem Download zu prüfen." },
      { q: "Werden meine Bilder auf einen Server hochgeladen?", a: "Nein. Die gesamte Komprimierung läuft über die Canvas API in deinem Browser, sodass deine Fotos auf deinem Gerät bleiben – 100 % privat." },
      { q: "Gibt es ein Limit für Dateigröße oder Anzahl?", a: "Es gibt kein Limit in der App; nur der Arbeitsspeicher deines Browsers setzt Grenzen. Du kannst viele Dateien gleichzeitig im Stapel komprimieren." },
      { q: "Kann ich JPG stattdessen in WebP oder AVIF umwandeln?", a: "Ja. Wähle WebP oder AVIF als Ausgabeformat für noch kleinere Dateien bei ähnlicher Qualität." },
    ],
  },
  "compress-png": {
    metaTitle: "PNG komprimieren online — kostenloser PNG-Kompressor | Image Shuttle",
    metaDescription:
      "PNG-Bilder kostenlos online komprimieren. PNG-Dateigröße um 30–70 % reduzieren bei erhaltener Transparenz – kein Upload, 100 % privat, WebAssembly im Browser.",
    h1: "PNG-Bilder komprimieren",
    lead: "Reduziere PNG-Dateigrößen um 30–70 %, während die Transparenz erhalten bleibt. Kostenlos, schnell und vollständig privat – dank WebAssembly im Browser, ganz ohne Upload.",
    steps: [
      { title: "PNG hochladen", desc: "Ziehe deine PNG-Dateien per Drag & Drop hinein oder klicke zum Durchsuchen. Die Stapelauswahl vieler Dateien gleichzeitig wird unterstützt." },
      { title: "Komprimieren", desc: "Der WebAssembly-Quantisierer reduziert die Farbpalette und behält dabei den Alphakanal bei, sodass die Transparenz erhalten bleibt." },
      { title: "Herunterladen", desc: "Vergleiche mit dem Vorher/Nachher-Regler und lade dein kleineres PNG herunter. Nichts wird hochgeladen – alles läuft lokal." },
    ],
    faqs: [
      { q: "Bleibt die Transparenz beim Komprimieren von PNG erhalten?", a: "Ja. Der Alphakanal bleibt vollständig erhalten, sodass transparente und halbtransparente Bereiche unverändert bleiben." },
      { q: "Wie stark kann ich ein PNG verkleinern?", a: "Meist 30–70 %, je nach Inhalt. Grafiken, Logos und Screenshots mit wenigen Farben lassen sich am stärksten komprimieren." },
      { q: "Ist es verlustfrei oder verlustbehaftet?", a: "Es nutzt WebAssembly-Quantisierung (verlustbehaftete Palettenreduktion) für große Einsparungen bei visuell scharfen Bildern." },
      { q: "Werden meine Dateien hochgeladen?", a: "Nein. Die Komprimierung erfolgt vollständig in deinem Browser, sodass deine PNGs niemals dein Gerät verlassen." },
      { q: "Sollte ich fürs Web besser WebP verwenden?", a: "Für Websites ist WebP oft ~26 % kleiner als PNG bei ähnlicher Qualität und unterstützt ebenfalls Transparenz – hier kannst du auch konvertieren." },
    ],
  },
  "convert-to-webp": {
    metaTitle: "In WebP konvertieren online — kostenlos JPG/PNG zu WebP | Image Shuttle",
    metaDescription:
      "JPG- und PNG-Bilder kostenlos online in WebP konvertieren. 25–35 % kleinere Dateien mit Transparenz-Unterstützung – kein Upload, 100 % privat, im Browser.",
    h1: "Bilder in WebP konvertieren",
    lead: "Konvertiere JPG und PNG in WebP für 25–35 % kleinere Dateien mit voller Transparenz-Unterstützung. Kostenlos, privat und sofort – direkt in deinem Browser.",
    steps: [
      { title: "Bilder hochladen", desc: "Lege deine JPG- oder PNG-Dateien im Upload-Bereich ab oder klicke zum Durchsuchen. Mehrere Dateien werden unterstützt." },
      { title: "WebP auswählen", desc: "Wähle WebP als Ausgabeformat und stelle die Qualität ein, um Größe und Schärfe auszubalancieren." },
      { title: "Herunterladen", desc: "Konvertiere und lade deine WebP-Dateien herunter. Die gesamte Verarbeitung läuft lokal – nichts wird hochgeladen." },
    ],
    faqs: [
      { q: "Warum in WebP konvertieren?", a: "WebP-Dateien sind bei ähnlicher Qualität typischerweise 25–35 % kleiner als JPG/PNG, was deine Website beschleunigt und die Core Web Vitals verbessert." },
      { q: "Unterstützt WebP Transparenz?", a: "Ja, WebP unterstützt wie PNG einen Alphakanal, sodass transparente Bilder sauber konvertiert werden." },
      { q: "Unterstützen alle Browser WebP?", a: "Alle modernen Browser unterstützen WebP, was es zu einer sicheren Wahl für die Web-Auslieferung macht." },
      { q: "Werden meine Bilder hochgeladen?", a: "Nein. Die Konvertierung läuft über die Canvas API in deinem Browser – deine Dateien bleiben privat auf deinem Gerät." },
      { q: "Kann ich viele Bilder auf einmal konvertieren?", a: "Ja. Die Stapelkonvertierung mit paralleler Verarbeitung wird unterstützt." },
    ],
  },
  "convert-to-avif": {
    metaTitle: "In AVIF konvertieren online — kostenlos JPG/PNG zu AVIF | Image Shuttle",
    metaDescription:
      "Bilder kostenlos online in AVIF konvertieren. Dateien bis zu ~50 % kleiner als JPG bei ähnlicher Qualität – kein Upload, 100 % privat, im Browser.",
    h1: "Bilder in AVIF konvertieren",
    lead: "Konvertiere JPG und PNG in AVIF für Dateien, die bis zu ~50 % kleiner sind als JPG bei ähnlicher Qualität. Kostenlos, privat und vollständig in deinem Browser verarbeitet.",
    steps: [
      { title: "Bilder hochladen", desc: "Ziehe deine JPG- oder PNG-Dateien per Drag & Drop hinein oder klicke zum Durchsuchen. Mehrere Dateien können gleichzeitig konvertiert werden." },
      { title: "AVIF auswählen", desc: "Wähle AVIF als Ausgabeformat und passe die Qualität an deine Bedürfnisse an." },
      { title: "Herunterladen", desc: "Konvertiere und lade deine AVIF-Dateien herunter. Alles läuft lokal – kein Upload." },
    ],
    faqs: [
      { q: "Warum AVIF wählen?", a: "AVIF bietet die beste Komprimierung der gängigen Webformate – oft ~50 % kleiner als JPG bei ähnlicher Qualität – ideal für schnell ladende Websites." },
      { q: "Unterstützt AVIF Transparenz?", a: "Ja, AVIF unterstützt einen Alphakanal, sodass transparente Bilder erhalten bleiben." },
      { q: "Wird AVIF breit unterstützt?", a: "Alle aktuellen großen Browser unterstützen AVIF. Für ältere Browser solltest du ein JPG/WebP als Fallback bereithalten." },
      { q: "Werden meine Bilder an einen Server gesendet?", a: "Nein. Die Konvertierung erfolgt in deinem Browser, sodass deine Dateien privat bleiben." },
      { q: "Kann ich im Stapel in AVIF konvertieren?", a: "Ja. Wähle mehrere Dateien aus und konvertiere sie parallel." },
    ],
  },
  "resize-image": {
    metaTitle: "Bild verkleinern online — kostenloser pixelgenauer Resizer | Image Shuttle",
    metaDescription:
      "Bilder kostenlos online verkleinern. Exakte Pixelmaße festlegen oder prozentual skalieren mit Seitenverhältnis-Sperre – kein Upload, 100 % privat, im Browser.",
    h1: "Bilder verkleinern",
    lead: "Verkleinere Fotos auf exakte Pixelmaße (z. B. 512×512) oder prozentual, mit Seitenverhältnis-Sperre. Kostenlos, privat und sofort in deinem Browser.",
    steps: [
      { title: "Bild hochladen", desc: "Ziehe dein Bild per Drag & Drop hinein oder klicke zum Durchsuchen. JPG, PNG, WebP und AVIF werden alle unterstützt." },
      { title: "Maße festlegen", desc: "Gib eine exakte Breite und Höhe in Pixeln ein oder skaliere prozentual. Sperre das Seitenverhältnis, um Verzerrungen zu vermeiden." },
      { title: "Herunterladen", desc: "Wende an und lade dein verkleinertes Bild herunter. Die gesamte Verarbeitung läuft lokal – nichts wird hochgeladen." },
    ],
    faqs: [
      { q: "Kann ich auf eine exakte Größe wie 512×512 verkleinern?", a: "Ja. Gib die exakte Breite und Höhe in Pixeln ein und exportiere in diesen Maßen." },
      { q: "Bleibt beim Verkleinern das Seitenverhältnis erhalten?", a: "Aktiviere die Seitenverhältnis-Sperre, und die andere Dimension passt sich automatisch an, um Verzerrungen zu verhindern." },
      { q: "Verringert das Verkleinern die Qualität?", a: "Beim Verkleinern bleibt das Bild scharf. Beim Vergrößern werden vorhandene Pixel gestreckt, sodass extreme Vergrößerungen unscharf wirken können." },
      { q: "Werden meine Bilder hochgeladen?", a: "Nein. Das Verkleinern läuft vollständig in deinem Browser – deine Bilder bleiben auf deinem Gerät." },
      { q: "Welche Formate kann ich verkleinern?", a: "JPG, PNG, WebP und AVIF. Du kannst beim Verkleinern auch das Ausgabeformat ändern." },
    ],
  },
  "batch-compress": {
    metaTitle: "Bilder im Stapel komprimieren online — kostenloser Bulk-Kompressor | Image Shuttle",
    metaDescription:
      "Viele Bilder kostenlos im Stapel komprimieren. Dutzende JPG/PNG/WebP/AVIF-Dateien parallel komprimieren oder konvertieren – kein Upload, 100 % privat.",
    h1: "Bilder im Stapel komprimieren",
    lead: "Komprimiere oder konvertiere Dutzende Bilder auf einmal mit paralleler Verarbeitung. Kostenlos, privat und schnell – alles läuft lokal in deinem Browser.",
    steps: [
      { title: "Viele Bilder hochladen", desc: "Ziehe einen ganzen Ordner voller Bilder per Drag & Drop hinein oder wähle mehrere Dateien aus. JPG, PNG, WebP und AVIF werden unterstützt." },
      { title: "Optionen festlegen", desc: "Wähle eine einheitliche Qualität und ein Ausgabeformat, die auf jede Datei gleichzeitig angewendet werden." },
      { title: "Alle herunterladen", desc: "Verarbeite den Stapel parallel und lade deine komprimierten Bilder herunter. Nichts wird hochgeladen." },
    ],
    faqs: [
      { q: "Wie viele Bilder kann ich auf einmal komprimieren?", a: "Es gibt kein Limit in der App – nur der Arbeitsspeicher deines Browsers setzt Grenzen. Die Warteschlange verarbeitet Dateien parallel über deine CPU-Kerne." },
      { q: "Kann ich Formate in einem Stapel mischen?", a: "Ja. Du kannst JPG, PNG, WebP und AVIF zusammen hinzufügen und auf alle einheitliche Einstellungen anwenden." },
      { q: "Werden meine Dateien irgendwohin hochgeladen?", a: "Nein. Jede Datei wird in deinem Browser verarbeitet, sodass deine Bilder privat bleiben." },
      { q: "Kann ich beim Stapelkomprimieren gleichzeitig konvertieren?", a: "Ja. Wähle ein Ausgabeformat (z. B. WebP), um jede Datei während der Komprimierung zu konvertieren." },
      { q: "Verlangsamt die Stapelverarbeitung meinen Browser?", a: "Sie nutzt Web Workers, die auf deine CPU-Kernanzahl abgestimmt sind, und hält die Oberfläche während der Arbeit reaktionsfähig." },
    ],
  },
};
