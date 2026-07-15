import type { ToolContentMap } from "./types";

export const content: ToolContentMap = {
  "compress-jpg": {
    metaTitle: "Kompres JPG Online — Kompresor JPEG Gratis | Image Shuttle",
    metaDescription:
      "Kompres gambar JPG/JPEG online gratis. Kurangi ukuran file hingga 80% dengan penggeser kualitas — tanpa unggah, 100% privat, diproses di browser Anda.",
    h1: "Kompres Gambar JPG",
    lead: "Perkecil foto JPG/JPEG hingga 80% dengan penggeser kualitas. Gratis, cepat, dan sepenuhnya privat — semuanya berjalan di browser Anda tanpa unggahan.",
    steps: [
      { title: "Unggah JPG Anda", desc: "Seret dan lepas file JPG/JPEG Anda ke area unggah, atau klik untuk menjelajah. Anda bisa memilih banyak file sekaligus." },
      { title: "Pilih kualitas", desc: "Pilih preset kualitas atau atur penggesernya, lalu pratinjau sebelum/sesudah untuk mendapat keseimbangan ukuran dan kualitas yang tepat." },
      { title: "Unduh", desc: "Terapkan kompresi dan unduh JPG Anda yang lebih kecil. Semuanya terjadi secara lokal — gambar Anda tidak pernah meninggalkan perangkat Anda." },
    ],
    faqs: [
      { q: "Seberapa kecil JPG saya nantinya?", a: "Biasanya 40–80% lebih kecil, tergantung foto dan kualitas yang Anda pilih. Foto yang detail terkompres lebih sedikit dibanding grafik sederhana." },
      { q: "Apakah mengompres menurunkan kualitas gambar?", a: "Kompresi JPEG bersifat lossy, tetapi pada pengaturan kualitas tinggi perbedaannya sulit terlihat. Gunakan penggeser sebelum/sesudah untuk memastikan sebelum mengunduh." },
      { q: "Apakah gambar saya diunggah ke server?", a: "Tidak. Semua kompresi berjalan di browser Anda melalui Canvas API, jadi foto Anda tetap di perangkat Anda — 100% privat." },
      { q: "Apakah ada batasan ukuran atau jumlah file?", a: "Tidak ada batasan dari aplikasi; hanya memori browser Anda. Anda bisa mengompres banyak file sekaligus secara massal." },
      { q: "Bisakah saya mengonversi JPG ke WebP atau AVIF?", a: "Ya. Pilih WebP atau AVIF sebagai format keluaran untuk file yang lebih kecil lagi pada kualitas serupa." },
    ],
  },
  "compress-png": {
    metaTitle: "Kompres PNG Online — Kompresor PNG Gratis | Image Shuttle",
    metaDescription:
      "Kompres gambar PNG online gratis. Pangkas ukuran file PNG 30–70% sambil mempertahankan transparansi — tanpa unggah, 100% privat, kompresi WebAssembly di browser.",
    h1: "Kompres Gambar PNG",
    lead: "Kurangi ukuran file PNG 30–70% sambil menjaga transparansi tetap utuh. Gratis, cepat, dan sepenuhnya privat — ditenagai WebAssembly di browser tanpa unggahan.",
    steps: [
      { title: "Unggah PNG Anda", desc: "Seret dan lepas file PNG Anda atau klik untuk menjelajah. Pemilihan massal untuk banyak file sekaligus didukung." },
      { title: "Kompres", desc: "Pengkuantisasi WebAssembly mengurangi palet warna sambil menjaga saluran alfa, sehingga transparansi tetap terjaga." },
      { title: "Unduh", desc: "Bandingkan dengan penggeser sebelum/sesudah dan unduh PNG Anda yang lebih kecil. Tidak ada yang diunggah — semuanya berjalan secara lokal." },
    ],
    faqs: [
      { q: "Apakah mengompres PNG menjaga transparansi?", a: "Ya. Saluran alfa sepenuhnya dipertahankan, sehingga area transparan dan semi-transparan tetap utuh." },
      { q: "Seberapa kecil saya bisa memperkecil PNG?", a: "Biasanya 30–70%, tergantung isinya. Grafik, logo, dan tangkapan layar dengan warna terbatas terkompres paling banyak." },
      { q: "Apakah lossless atau lossy?", a: "Ini menggunakan kuantisasi WebAssembly (pengurangan palet secara lossy) untuk penghematan besar sambil menjaga gambar tetap tajam secara visual." },
      { q: "Apakah file saya diunggah?", a: "Tidak. Kompresi terjadi sepenuhnya di browser Anda, jadi PNG Anda tidak pernah meninggalkan perangkat Anda." },
      { q: "Sebaiknya saya pakai WebP untuk web?", a: "Untuk situs web, WebP sering ~26% lebih kecil dari PNG pada kualitas serupa dan juga mendukung transparansi — Anda juga bisa mengonversinya di sini." },
    ],
  },
  "convert-to-webp": {
    metaTitle: "Konversi ke WebP Online — JPG/PNG ke WebP Gratis | Image Shuttle",
    metaDescription:
      "Konversi gambar JPG dan PNG ke WebP online gratis. Dapatkan file 25–35% lebih kecil dengan dukungan transparansi — tanpa unggah, 100% privat, di browser Anda.",
    h1: "Konversi Gambar ke WebP",
    lead: "Konversi JPG dan PNG ke WebP untuk file 25–35% lebih kecil dengan dukungan transparansi penuh. Gratis, privat, dan instan — langsung di browser Anda.",
    steps: [
      { title: "Unggah gambar", desc: "Jatuhkan file JPG atau PNG Anda ke area unggah, atau klik untuk menjelajah. Banyak file didukung." },
      { title: "Pilih WebP", desc: "Pilih WebP sebagai format keluaran dan atur kualitas untuk menyeimbangkan ukuran dan kejernihan." },
      { title: "Unduh", desc: "Konversi dan unduh file WebP Anda. Semua pemrosesan bersifat lokal — tidak ada yang diunggah." },
    ],
    faqs: [
      { q: "Mengapa konversi ke WebP?", a: "File WebP biasanya 25–35% lebih kecil dari JPG/PNG pada kualitas serupa, yang mempercepat situs Anda dan meningkatkan Core Web Vitals." },
      { q: "Apakah WebP mendukung transparansi?", a: "Ya, WebP mendukung saluran alfa seperti PNG, sehingga gambar transparan terkonversi dengan rapi." },
      { q: "Apakah semua browser mendukung WebP?", a: "Semua browser modern mendukung WebP, menjadikannya pilihan aman untuk pengiriman web." },
      { q: "Apakah gambar saya diunggah?", a: "Tidak. Konversi berjalan di browser Anda melalui Canvas API — file Anda tetap privat di perangkat Anda." },
      { q: "Bisakah saya mengonversi banyak gambar sekaligus?", a: "Ya. Konversi massal didukung dengan pemrosesan paralel." },
    ],
  },
  "convert-to-avif": {
    metaTitle: "Konversi ke AVIF Online — JPG/PNG ke AVIF Gratis | Image Shuttle",
    metaDescription:
      "Konversi gambar ke AVIF online gratis. Dapatkan file hingga ~50% lebih kecil dari JPG pada kualitas serupa — tanpa unggah, 100% privat, berbasis browser.",
    h1: "Konversi Gambar ke AVIF",
    lead: "Konversi JPG dan PNG ke AVIF untuk file hingga ~50% lebih kecil dari JPG pada kualitas serupa. Gratis, privat, dan diproses sepenuhnya di browser Anda.",
    steps: [
      { title: "Unggah gambar", desc: "Seret dan lepas file JPG atau PNG Anda, atau klik untuk menjelajah. Banyak file bisa dikonversi sekaligus." },
      { title: "Pilih AVIF", desc: "Pilih AVIF sebagai format keluaran dan sesuaikan kualitasnya sesuai kebutuhan Anda." },
      { title: "Unduh", desc: "Konversi dan unduh file AVIF Anda. Semuanya berjalan secara lokal — tanpa unggahan." },
    ],
    faqs: [
      { q: "Mengapa memilih AVIF?", a: "AVIF menawarkan kompresi terbaik di antara format web umum — sering ~50% lebih kecil dari JPG pada kualitas serupa — ideal untuk situs yang cepat dimuat." },
      { q: "Apakah AVIF mendukung transparansi?", a: "Ya, AVIF mendukung saluran alfa, sehingga gambar transparan tetap terjaga." },
      { q: "Apakah AVIF didukung luas?", a: "Semua browser utama saat ini mendukung AVIF. Untuk browser lama, sediakan cadangan JPG/WebP." },
      { q: "Apakah gambar saya dikirim ke server?", a: "Tidak. Konversi terjadi di browser Anda, jadi file Anda tetap privat." },
      { q: "Bisakah saya mengonversi ke AVIF secara massal?", a: "Ya. Pilih banyak file dan konversi secara paralel." },
    ],
  },
  "resize-image": {
    metaTitle: "Ubah Ukuran Gambar Online — Pengubah Ukuran Piksel Presisi Gratis | Image Shuttle",
    metaDescription:
      "Ubah ukuran gambar online gratis. Atur dimensi piksel yang tepat atau skala per persen dengan kunci rasio aspek — tanpa unggah, 100% privat, di browser Anda.",
    h1: "Ubah Ukuran Gambar",
    lead: "Ubah ukuran foto ke dimensi piksel yang tepat (mis. 512×512) atau per persen, dengan kunci rasio aspek. Gratis, privat, dan instan di browser Anda.",
    steps: [
      { title: "Unggah gambar Anda", desc: "Seret dan lepas gambar Anda atau klik untuk menjelajah. JPG, PNG, WebP, dan AVIF semuanya didukung." },
      { title: "Atur dimensi", desc: "Masukkan lebar dan tinggi yang tepat dalam piksel, atau skalakan per persen. Kunci rasio aspek untuk menghindari distorsi." },
      { title: "Unduh", desc: "Terapkan dan unduh gambar Anda yang telah diubah ukurannya. Semua pemrosesan bersifat lokal — tidak ada yang diunggah." },
    ],
    faqs: [
      { q: "Bisakah saya mengubah ke ukuran tepat seperti 512×512?", a: "Ya. Ketik lebar dan tinggi yang tepat dalam piksel dan ekspor pada dimensi tersebut." },
      { q: "Apakah pengubahan ukuran menjaga rasio aspek?", a: "Aktifkan kunci rasio aspek dan dimensi lainnya akan menyesuaikan otomatis untuk mencegah peregangan." },
      { q: "Apakah mengubah ukuran menurunkan kualitas?", a: "Memperkecil tetap tajam. Memperbesar akan membesarkan piksel yang ada, jadi pembesaran ekstrem bisa tampak buram." },
      { q: "Apakah gambar saya diunggah?", a: "Tidak. Pengubahan ukuran berjalan sepenuhnya di browser Anda — gambar Anda tetap di perangkat Anda." },
      { q: "Format apa saja yang bisa saya ubah ukurannya?", a: "JPG, PNG, WebP, dan AVIF. Anda juga bisa mengganti format keluaran saat mengubah ukuran." },
    ],
  },
  "batch-compress": {
    metaTitle: "Kompres Gambar Massal Online — Kompresor Massal Gratis | Image Shuttle",
    metaDescription:
      "Kompres banyak gambar sekaligus gratis. Kompres atau konversi puluhan file JPG/PNG/WebP/AVIF secara paralel — tanpa unggah, 100% privat, di browser Anda.",
    h1: "Kompres Gambar Massal",
    lead: "Kompres atau konversi puluhan gambar sekaligus dengan pemrosesan paralel. Gratis, privat, dan cepat — semuanya berjalan secara lokal di browser Anda.",
    steps: [
      { title: "Unggah banyak gambar", desc: "Seret dan lepas satu folder gambar penuh atau pilih banyak file. JPG, PNG, WebP, dan AVIF didukung." },
      { title: "Atur opsi", desc: "Pilih satu kualitas dan format keluaran untuk diterapkan ke setiap file sekaligus." },
      { title: "Unduh semua", desc: "Proses seluruh batch secara paralel dan unduh gambar Anda yang telah dikompres. Tidak ada yang diunggah." },
    ],
    faqs: [
      { q: "Berapa banyak gambar yang bisa saya kompres sekaligus?", a: "Tidak ada batasan dari aplikasi — hanya memori browser Anda. Antrean memproses file secara paralel di seluruh inti CPU Anda." },
      { q: "Bisakah saya mencampur format dalam satu batch?", a: "Ya. Anda bisa menambahkan JPG, PNG, WebP, dan AVIF bersamaan serta menerapkan pengaturan yang konsisten ke semuanya." },
      { q: "Apakah file saya diunggah ke suatu tempat?", a: "Tidak. Setiap file diproses di browser Anda, jadi gambar Anda tetap privat." },
      { q: "Bisakah saya mengonversi saat mengompres massal?", a: "Ya. Pilih format keluaran (mis. WebP) untuk mengonversi setiap file saat dikompres." },
      { q: "Apakah pemrosesan massal memperlambat browser saya?", a: "Ini menggunakan Web Workers yang disetel dengan jumlah inti CPU Anda, menjaga antarmuka tetap responsif selama bekerja." },
    ],
  },
};
