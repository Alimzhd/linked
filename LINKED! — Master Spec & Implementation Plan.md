# **LINKED! — Master Spec & Implementation Plan** 

Oct 20, 2026 · @Alimzuhdi 

LINKED! dibangun sebagai situs statis React dengan satu fitur andalan, Customizer gelang 18 slot, dan hero animasi 15 detik yang dibuat dengan kode, bukan file video. 

Dokumen ini adalah hasil **Plan-Only Mode** : tidak ada kode yang ditulis, hanya keputusan yang sudah bisa dikerjakan. Setelah disetujui tim, tiap fitur dikerjakan dengan alur **Spec** (requirements → design → tasks), dan perubahan kecil dengan **Quick Spec** . 

## **Ringkasan** 

|Hal|Keputusan|
|---|---|
|Stack|Vite + React + TypeScript + Tailwind CSS + Motion (Framer Motion). Tanpa<br>server.|
|Hero|Animasi 15 detik berbasis kode (SVG + timeline), berulang, dengan poster<br>statis untuk pengguna yang mematikan animasi|
|Customizer|18 link standar (ukuran S 17, M 18, L 20), klik-untuk-tambah dan seret-ke-<br>slot, snap magnetik|
|Harga|Total = harga gelang dasar + Σ tambahan tiap charm, dihitung langsung|
|Navigasi|Home · Shop · Customize · About Us · Cart. Cart berupa slide-over, FAQ ada di<br>About dan footer|
|Checkout|Simulasi: ringkasan pesanan lalu kirim lewat WhatsApp. Tidak ada<br>pembayaran nyata|
|Porsi charm|Charm hanya tampil sebagai aksen. Satu kelompok charm per layar, sisanya<br>ruang kosong|
|Konten|Tanpa testimoni palsu. Harga dan stok contoh diberi label|



## **Perlu konfirmasi tim** 

- ☐ Tenggat pengumpulan proyek (belum disebut, jadi jadwal di bagian 8 memakai minggu relatif) 

- ☐ Checkout lewat WhatsApp disetujui, atau cukup berhenti di halaman ringkasan 

- ☐ Aset charm dibuat sendiri sebagai ilustrasi SVG, atau memakai foto produk asli 

## **Evaluasi brief** 

Brief sudah kuat di arah visual dan fitur andalan. Sebelas poin di bawah ini berbenturan satu sama lain atau terlalu luas untuk tim pemula, dan tiap poin sudah diberi keputusan. 

|#|Poin di brief|Masalah|Keputusan|
|---|---|---|---|
|1|Customizer 20<br>slot|Italian bracelet dewasa<br>umumnya 17–22 link, ukuran<br>wanita tipikal 18 (ODS Jewellers<br>).<br>Angka 20 terlalu panjang untuk<br>default|Default 18 slot. Pilihan S 17, M 18, L<br>20|
|2|Hero "video" 15<br>detik|File MP4 berat, buram di layar<br>besar, sulit diedit tim|Animasi dari kode, timeline 15 detik,<br>berulang. MP4 opsional untuk<br>presentasi|
|3|Header<br>glassmorphism|Efek kaca di banyak elemen cepat<br>terlihat template|Hanya header. Blur kecil, menjadi<br>solid putih setelah scroll|
|4|Stack: HTML /<br>React / Next / Vue|Terlalu banyak pilihan, tim belum<br>tentu sepakat|Satu stack: Vite + React + TS +<br>Tailwind + Motion|
|5|Menu punya FAQ<br>di file teks, tidak<br>di brief|Dua dokumen tidak sama|5 menu utama. FAQ jadi bagian di<br>About dan footer|
|6|Cart sebagai<br>halaman dan<br>sebagai slide-over|Dua versi untuk satu fitur|Slide-over untuk cart, satu<br>halaman /checkout untuk alamat<br>dan ringkasan|
|7|Reviews dan<br>testimonial|Testimoni karangan terasa palsu<br>dan bisa menyesatkan|Hanya tampil bila dari uji coba nyata.<br>Default: tanpa testimoni|
|8|Gambar contoh<br>dari referensi<br>(Etsy, dll.)|Hak cipta, dan gaya foto tidak<br>seragam|Aset dibuat sendiri: ilustrasi SVG<br>charm atau foto sendiri|
|9|Silver<br>#E2E8F0|Kontras dengan latar<br>#F9F9FB<br>sekitar 1,2 : 1, tidak terbaca<br>sebagai teks|Silver hanya untuk garis, isian, dan<br>gradien logam. Teks selalu charcoal|
|10|Level<br>"Awwwards"|Terlalu ambisius bila semua<br>dikejar sekaligus|Tiga tingkat: MVP, Polished, Stretch<br>(bagian 8)|
|11|Template Wix|Tugas ini berbantuan AI coding,|Wix hanya jadi inspirasi tata letak|
||sebagai referensi|bukan membangun di Wix|dan ritme, kode ditulis sendiri|



Catatan angka poin 9: perbandingan kontras dihitung dari luminansi relatif kedua warna, perlu dicek ulang dengan alat kontras sebelum finalisasi. 

## **Arah visual dan aturan anti AI-slop** 

LINKED! tampil seperti majalah toko perhiasan: banyak ruang kosong, huruf besar yang tegas, dan logam sebagai satu-satunya "dekorasi". Charm adalah isi produk, bukan wallpaper. 

### **Dari video referensi Anda** 

Empat video yang diunggah memberi pola yang bisa dipakai langsung: 

- **Showreel 15 detik (video 3):** judul sans tebal dengan satu kata _serif miring_ , label mikro monospace di sudut (nomor scene, timecode), bingkai siku di empat sudut, satu warna aksen, dan kartu kecil melayang yang masuk bergantian. 

- **Build isometrik (video 4):** satu kalimat per scene, penghitung progres 0–100%, objek tumbuh dari satu bentuk sederhana. Cocok untuk perakitan gelang. 

- **Estra (video 2):** pergantian scene lewat geser horizontal dengan titik indikator. Cocok untuk carousel koleksi. 

- **Tutorial prompt (video 1):** menjelaskan bahwa showreel semacam ini dibuat dari satu prompt yang menghasilkan animasi HTML deterministik, lalu dirender ke MP4. Itu dasar keputusan hero berbasis kode. 

### **Palet** 

|Token|Hex|Dipakai untuk|Tidak dipakai untuk|
|---|---|---|---|
|ink|#121212|Teks, tombol utama, footer|Latar besar di luar footer dan|
||||scene gelap hero|
|paper|#F9F9FB|Latar halaman||
|steel|#E2E8F0|Garis, kartu, gradien logam|Teks|
|blush|#F4E8E1|Latar bagian khusus (About, hadiah), hover kartu|Tombol|



Gradien logam hanya untuk badan link dan charm: <mark>#FFFFFF → #CBD5E1 → #F1F5F9 → #94A3B8</mark> pada sudut 135°. Tidak dipakai di latar atau teks. 

### **Tipografi** 

|Peran|Font|Catatan|
|---|---|---|
|Judul dan isi|Plus Jakarta Sans|Satu keluarga, bobot 400 / 500 / 700. Rubik dibuang<br>karena sudutnya bulat dan terkesan anak-anak|
|Kata aksen di judul|Instrument Serif<br>miring|Maksimal satu kata per judul|
|Label mikro|Geist Mono atau<br>JetBrains Mono|Hanya untuk nomor scene, harga kecil, jumlah link|



### **Tata letak** 

- Grid 12 kolom, margin 24 px di ponsel dan 64 px di desktop. Jarak antarbagian 120 px di desktop. 

- Foto atau ilustrasi gelang tampil besar dan satu per satu. Tidak ada deretan lebih dari 4 charm dalam satu pandangan di luar Customizer. 

- Radius seragam 12 px. Garis 1 px warna <mark>steel</mark> . Tanpa bayangan tebal. 

- Judul rata kiri. Rata tengah hanya untuk hero dan penutup. 

### **Daftar larangan (anti AI-slop)** 

- Tanpa gradien ungu atau biru, tanpa blob warna, tanpa partikel acak. 

- Tanpa ikon emoji sebagai dekorasi dan tanpa tiga kartu identik "ikon + judul + teks". 

- Tanpa kata kosong seperti _revolusioner_ , _elevate_ , _unleash_ , _seamless_ . Teks menyebut hal konkret: bahan, ukuran, harga. 

- Tanpa teks Lorem Ipsum dan tanpa testimoni karangan. 

- Glassmorphism hanya di header. 

- Tiap bagian halaman harus bisa menjawab "apa yang dilakukan pengunjung di sini". Jika tidak, dibuang. 

## **Motion spec** 

Gerak di LINKED! punya tiga tugas: memperkenalkan merek lewat hero 15 detik, menjelaskan perpindahan halaman, dan memberi umpan balik fisik pada Customizer. Gerak yang tidak melakukan salah satu dari ketiganya dibuang. 

### **Dari video referensi ke perilaku situs** 

Video yang Anda unggah dipakai sebagai acuan gaya gerak, bukan untuk dipasang atau ditiru scene demi scene. Tabel ini menerjemahkan pola di video menjadi aturan untuk seluruh situs. Hero 15 detik di bawah hanya salah satu penerapannya. 

|Pola di video|Penerapan di situs|
|---|---|
|Label mono kecil di sudut (nomor scene,<br>timecode)|Label bagian seperti<br>02 · SHOPdi atas judul bagian<br>Home dan About. Tidak dipasang di tiap elemen|
|Satu kata serif miring di dalam judul sans tebal|Aturan judul di semua halaman|
|Kartu kecil masuk bergantian|Stagger pada grid Shop dan daftar item Cart|
|Angka yang naik (penghitung progres, kartu<br>rumus)|Harga di Customizer dan jumlah link|
|Satu kalimat per scene, pergantian bersih|Home berisi satu pesan per layar dengan transisi<br>_mask_antar bagian|
|Geser horizontal dengan titik indikator (Estra)|Carousel koleksi unggulan|



|Pola di video|Penerapan di situs|
|---|---|
|Objek tumbuh dari satu bentuk sederhana<br>(isometrik)|Gelang tumbuh dari satu link, dan snap di<br>Customizer|
|Perbandingan easing (linear, ease-out, pegas)|Dua easing saja: ease-out expo untuk masuk, pegas<br>untuk snap|



### **Storyboard hero 15 detik** 

Hero dimainkan otomatis, tanpa suara, dan berulang. Setiap scene memakai satu ide dan satu kalimat, mengikuti ritme showreel referensi. 

|Scene|Detik|Visual|Teks di layar|Gerak|
|---|---|---|---|---|
|01 Link|0–3|Latar<br>paperkosong. Satu link baja<br>tergambar dari garis tipis menjadi<br>logam solid|Label mono<br>01<br>· LINKdan<br>timecode|Gambar garis 0,8<br>dtk, ease-out expo|
|02 Charm|3–6|Tiga charm (hati, bintang, huruf) jatuh<br>satu per satu dan menempel ke link|"Tambah<br>_cerita_."|Stagger 0,25 dtk,<br>snap magnetik|
|03 Rakit|6–10|Link bertambah sampai 18, garis lurus<br>melengkung menjadi gelang.<br>Penghitung "18 link · Rp…" naik|"Rakit sendiri.<br>Harganya<br>langsung<br>terlihat."|Morph garis ke<br>busur, count-up<br>angka|
|04 Mix|10–13|Latar menghangat ke<br>blush. Dua<br>charm bertukar tempat, gelang<br>berputar pelan|"Ganti kapan<br>saja."|Cross-fade 0,4 dtk,<br>putar 12°|
|05 Merek|13–15|Gelang bergeser ke samping,<br>wordmark LINKED! dan judul muncul,<br>dua tombol aktif|"YOUR WRIST,<br>YOUR_STORY_."|Mask reveal 0,6 dtk.<br>Lalu link terlepas<br>satu per satu untuk<br>kembali ke scene 01|



Aturan hero: 

- Dibuat dari SVG dan satu timeline (Motion atau GSAP), bukan video, sehingga tajam di semua layar dan teksnya bisa diedit. 

- Berhenti saat keluar dari layar atau tab tidak aktif. 

- Pengguna dengan pengaturan _reduced motion_ melihat poster statis: frame scene 05. 

- Animasi dipasang langsung di halaman Home dan tidak diekspor sebagai video. 

### **Transisi dan scroll** 

- **Antar halaman:** halaman lama memudar dan turun 8 px, halaman baru dibuka dengan _clip-path_ dari bawah. Total 450 ms. Header tetap di tempat. 

- **Grid produk:** muncul bergantian, jeda 60 ms per kartu, hanya sekali per kunjungan. 

- **Parallax:** hanya di hero dan foto About, pergeseran maksimal 40 px. 

### **Micro-interactions** 

|Elemen|Pemicu|Gerak|Durasi|
|---|---|---|---|
|Tombol|Hover|Isi charcoal naik dari bawah|250 ms|
|Kartu produk|Hover|Gambar zoom 1,04. Tombol_Quick add_naik|500 ms / 200 ms|
|Cart slide-<br>over|Buka / tutup|Masuk dari kanan, latar belakang<br>memudar. Item muncul bergantian|380 ms, jeda 40<br>ms|
|Charm di<br>Customizer|Dilepas dekat slot|Tertarik ke pusat slot, melebihi 4% lalu<br>mengendap|Pegas, kekakuan<br>500, redaman<br>30|
|Slot kosong|Charm didekatkan|Garis slot menyala dan berdenyut|1,6 dtk berulang|
|Harga total|Charm berubah|Angka berhitung ke nilai baru|300 ms|
|Ponsel|Charm menempel|Getar singkat bila peramban mendukung|10 ms|



### **Aturan performa** 

- Hanya <mark>transform</mark> dan <mark>opacity</mark> yang dianimasikan. Target 60 fps di ponsel menengah. 

- Tanpa three.js atau pustaka 3D. Rute Customizer dimuat saat dibuka ( _lazy_ ). 

- Gambar dalam format WebP dengan ukuran tetap agar tata letak tidak bergeser. 

- Mode _reduced motion_ : semua durasi menjadi 0 kecuali fade 150 ms. 

## **Sitemap dan copy per halaman** 

Situs punya lima menu dan dua jalur ke keranjang. Customize diberi warna aksen karena itu fitur andalan. 



<!-- Start of picture text -->
Dua jalur menuju satu keranjang: beli jadi atau rakit sendiri<br>Header di semua halaman: Home : Shop-Customize « About Us - Cart<br>Shop<br>Katalog + filter<br>Home Cart Checkout<br>Hero + koleksi Slide-over Ringkasan pesanan<br>Customize<br>Builder18 slot<br>About Us<br>Cerita merek + FAQ<br><!-- End of picture text -->

#### alur halaman · 5 halaman, 2 jalur ke keranjang 

Pengunjung yang ingin cepat membeli lewat Shop. Pengunjung yang ingin gelang sendiri lewat Customize. Keduanya berakhir di Cart yang sama. 

|Halaman|Urutan bagian|Copy kunci|
|---|---|---|
|Home|1. Hero animasi 15 detik. 2. Satu kalimat nilai<br>dan dua tombol. 3. Koleksi unggulan<br>(carousel 4 kartu). 4. Cuplikan Customizer:<br>satu gelang, satu tombol. 5. Footer|"YOUR WRIST, YOUR<br>_STORY_." Sub: "Gelang<br>kecil, cerita yang tak ada<br>habisnya. Mix your<br>charms, make it yours!"<br>Tombol:_Shop Now_dan<br>_Start Customizing_|
|Shop|Filter (Semua, Basic Links, Individual Charms,<br>Cute, Funny) dan urutan harga. Grid 4 kolom<br>di desktop, 2 di ponsel. Kartu: gambar, nama,<br>harga,_Quick add_|Detail produk di<br>/shop/:id: deskripsi,<br>bahan, ukuran link,<br>jumlah,_Add to cart_|
|Customize|Pilih ukuran, pustaka charm, preview gelang,<br>harga langsung,_Add to cart_. Rincian di bagian<br>6|"Pilih ukuran, tempel<br>charm, lihat hasilnya."|
|About Us|1. Pernyataan merek. 2. Kenapa Italian<br>bracelet. 3. Cara memasang charm (3<br>langkah). 4. FAQ akordeon (ukuran, bahan,<br>perawatan, pengiriman, cara memasang). 5.<br>Packaging dan hadiah|"Small charms, big<br>personality." Isi paragraf<br>dari teks tim yang sudah<br>ada, ditulis ulang pendek<br>dan konkret|
|Cart (slide-over)|Daftar item (gelang custom diringkas "18 link,<br>5 charm"), jumlah, pilihan kemasan (standar<br>atau kotak hadiah), kartu ucapan opsional,<br>subtotal|Tombol:_Lanjut ke_<br>_checkout_|
|Checkout (<br>/checkout)|Nama, nomor WhatsApp, alamat, catatan.<br>Ringkasan pesanan di sisi kanan|Tombol:_Kirim pesanan_<br>_via WhatsApp_|



Aturan copy: kalimat pendek, menyebut hal nyata (bahan, ukuran, harga), bahasa Indonesia dengan istilah Inggris hanya untuk nama fitur (Shop, Customize, Cart). Isi bahan, ukuran, dan pengiriman di FAQ harus sesuai produk yang benar-benar dijual tim, bukan diisi dari contoh. 

## **Spesifikasi Customizer** 

Customizer adalah satu-satunya halaman yang boleh ramai oleh charm, dan semua aturannya ada di bagian ini. Fitur ini dianggap selesai bila pengunjung bisa merakit gelang, melihat harganya, dan memasukkannya ke keranjang tanpa petunjuk tambahan. 

### **Alur pengguna** 

1. Pilih ukuran: S (17 link), M (18 link, default), atau L (20 link). 

2. Pilih charm dari pustaka dengan klik atau seret. 

3. Susun ulang atau hapus sampai puas, lihat harga berubah. 

4. Tekan _Add to cart_ . 

### **Tata letak** 

- **Desktop:** bilah preview gelang di atas selebar halaman. Di bawahnya pustaka charm dengan tab kategori (Basic Links, Cute, Funny, Huruf). Panel ringkasan di kanan tetap menempel: ukuran, jumlah charm, harga total, tombol. 

- **Ponsel:** preview di atas dan bisa digeser ke samping. Pustaka berupa _bottom sheet_ . Harga dan tombol menempel di dasar layar. 

- Ukuran slot 56 px di desktop dan 44 px di ponsel, sesuai batas aman area sentuh. 

### **Aturan interaksi** 

|Aksi|Cara|Hasil|
|---|---|---|
|Tambah (klik)|Klik charm di pustaka|Masuk ke slot kosong pertama dari kiri. Bila<br>penuh: "Semua slot terisi. Hapus satu charm<br>dulu."|
|Tambah (seret)|Seret charm ke slot|Menempel bila berada dalam 48 px dari pusat<br>slot. Bila slot terisi, charm lama diganti|
|Susun ulang|Seret charm ke slot lain|Dua charm bertukar tempat|
|Hapus|Tombol × saat hover atau<br>fokus, seret keluar bilah, atau<br>Backspace|Slot kembali jadi link polos|
|Urung / ulang|Ctrl atau Cmd + Z, tombol<br>Undo dan Redo|Riwayat 20 langkah|
|Kosongkan|Tombol_Reset_|Dialog konfirmasi, lalu semua slot jadi link polos|
|Ganti ukuran|Pilihan S / M / L|Jumlah slot berubah. Bila ada charm yang akan<br>terpotong, muncul konfirmasi dulu|
|Pakai keyboard|Tab ke slot, panah kiri atau<br>kanan pindah slot, Enter<br>memasang charm terpilih|Semua aksi di atas bisa dilakukan tanpa mouse|



### **Efek snap magnetik** 

- Saat charm diseret mendekat, slot terdekat menyala dan charm bayangan menempel di tengahnya. 

- Saat dilepas dalam radius 48 px, charm tertarik ke pusat slot dengan gerak pegas (kekakuan 500, redaman 30), melebihi sekitar 4% lalu mengendap. 

- Dilepas di luar radius: charm kembali ke asal dalam 300 ms. 

- Ponsel: getar 10 ms bila peramban mendukung. Suara klik tidak dipakai secara default. 

### **Rumus harga** 

Harga gelang dasar sudah termasuk link polos di semua slot. Setiap charm hanya menambah selisihnya. 

<mark>T = P_{dasar} + \sum_{i=1}^{n} t_i</mark> 

T total, <mark>P_dasar</mark> harga gelang dasar, t_i tambahan charm di slot ke-i (0 untuk link polos), n jumlah slot. 

|Contoh (angka sementara, tim mengisi harga asli)|Hitungan|Total|
|---|---|---|
|Gelang M, 5 charm Cute (+Rp 15.000), 2 huruf (+Rp|99.000 + 5 × 15.000 + 2 ×|Rp 198.000|
|12.000)|12.000||



### **Kasus tepi** 

- Charm habis stok: tampil abu-abu, tidak bisa dipasang, ada label "Habis". 

- Halaman dimuat ulang: susunan terakhir dipulihkan dari penyimpanan lokal. 

- Dua gelang dengan susunan identik di keranjang digabung menjadi jumlah 2. 

- Susunan kosong sepenuhnya (semua link polos) boleh ditambahkan ke keranjang sebagai gelang dasar. 

## **Arsitektur teknis** 

Semua berjalan di peramban tanpa server: data produk berupa file JSON, keranjang dan susunan gelang disimpan di penyimpanan lokal, dan hasil build bisa dipasang di hosting statis gratis. 

### **Stack** 

|Lapisan|Pilihan|Alasan|
|---|---|---|
|Build|Vite + React + TypeScript|Cepat, tanpa server, dan didukung baik oleh<br>alat AI coding|
|Routing|React Router (mode hash bila<br>dipasang di GitHub Pages)|Transisi halaman bisa dibungkus animasi|
|Styling|Tailwind CSS, token warna dan<br>huruf di satu file|Satu sumber untuk palet dan tipografi|
|Motion|Motion (Framer Motion) untuk UI<br>dan hero|Satu pustaka cukup. GSAP tidak dipakai<br>kecuali timeline hero tidak tertangani|
|Seret dan lepas|@dnd-kit/core|Mendukung sentuhan dan keyboard. HTML5<br>drag bawaan tidak jalan di ponsel|



|Lapisan|Pilihan|Alasan|
|---|---|---|
|State|React Context +<br>useReducer|Cukup untuk keranjang dan satu builder|
|Data|products.json,<br>charms.json,|Tim bisa mengganti isi tanpa menyentuh|
||faq.json|kode|
|Hosting|Netlify, Vercel, atau GitHub Pages|Statis dan gratis|



### **Struktur folder** 

- linked/ ├─ public/              poster-hero.webp, favicon └─ src/ ├─ app/              router, layout, providers 

- ├─ pages/            Home, Shop, ProductDetail, Customize, About, Checkout ├─ features/ │├─ customizer/    BraceletBar, Slot, CharmLibrary, useBuilder.ts, pricing.ts 

- │├─ cart/          CartDrawer, cartReducer.ts │└─ hero/          HeroReel.tsx, scenes/ ├─ components/       Button, Header, Footer, ProductCard ├─ data/             products.json, charms.json, faq.json ├─ styles/           tokens.css (warna, huruf, easing) └─ lib/              format-rupiah.ts, storage.ts 

### **Model data** 

type Charm = { id: string; name: string; category: 'basic' | 'cute' | 'funny' | 'letter'; addPrice: number;            // tambahan dari link polos, rupiah inStock: boolean; }; 

type Build = { size: 'S' | 'M' | 'L'; slots: (string | null)[] };  // id charm per slot 

type CartItem = | { kind: 'product'; productId: string; qty: number } | { kind: 'custom'; build: Build; qty: number; unitPrice: number }; 

type CartState = { items: CartItem[]; packaging: 'standard' | 'gift'; giftNote?: string }; Kunci penyimpanan: <mark>linked.v1.build</mark> dan <mark>linked.v1.cart</mark> . Bila bentuk data berubah, naikkan angka versi agar data lama tidak merusak halaman. Semua akses penyimpanan dibungkus <mark>try/catch</mark> karena bisa gagal di mode privat. 

### **Mode kerja Spec** 

|Mode|Dipakai untuk|Keluaran|
|---|---|---|
|Plan-Only|Dokumen ini: memecah ide besar jadi rencana<br>tanpa mengubah kode|Rencana dan keputusan|
|Spec|Fitur besar: Customizer, Cart, Hero|Tiga berkas per fitur:<br>kebutuhan, desain, daftar<br>tugas|
|Quick Spec|Perubahan kecil: ganti copy, tambah kategori,<br>perbaiki tampilan|Daftar tugas singkat|



Aturan memberi tugas ke AI: satu fitur per perintah, selalu sertakan token desain dari bagian 3, minta kode TypeScript tanpa <mark>any</mark> , dan periksa hasilnya di peramban sebelum lanjut ke tugas berikutnya. 

## **Rencana kerja, peran, dan risiko** 

Pekerjaan dibagi menjadi 12 tugas dalam lima fase, dengan tiga gerbang pemeriksaan. Tiap tugas diberi tingkat: **MVP** (wajib), **Polished** (nilai tambah), **Stretch** (bila waktu ada). Jadwal memakai urutan, bukan tanggal, karena tenggat belum diketahui. 



<!-- Start of picture text -->
Customizer dikerjakan setelah toko dasar bisa dipakai<br>1Fondasi 2 Toko inti 3 Customizer 4Gerak 5 Final<br>TO sampai 72 13,74,79 15,76 17,18 710,711<br>repo, token, aset Shop, Cart, About builder dan snap hero, transisi QA, deploy, README<br>GateA Gate B Gate Cc<br>belanja dasar jalan custom masuk cart 60 fpsdi ponsel<br><!-- End of picture text -->

urutan kerja · 5 fase, 3 gate 

Gate A diperiksa Project Leader setelah toko dasar jalan. Gate B setelah gelang custom bisa dibeli. Gate C setelah animasi diuji di ponsel. 

### **Daftar tugas** 

|#|Tugas|Isi|Tingkat|Peran|Menunggu|
|---|---|---|---|---|---|
|T0|Persiapan|Repo, proyek Vite, token desain,<br>font|MVP|Developer|—|
|T1|Layout dan|Header sticky transparan, menu|MVP|Developer,|T0|
||navigasi|laci di ponsel, footer||UI/UX||



|#|Tugas|Isi|Tingkat|Peran|Menunggu|
|---|---|---|---|---|---|
|T2|Data dan aset|charms.json(minimal 12 charm),<br>products.json, ilustrasi SVG, copy|MVP|Content,<br>UI/UX|T0|
|T3|Shop dan<br>detail produk|Grid, filter, kartu, halaman<br>/shop/:id|MVP|Developer|T1, T2|
|T4|Cart dan<br>Checkout|Slide-over, kemasan, ringkasan,<br>kirim via WhatsApp|MVP|Developer|T3|
|T5|Customizer<br>inti|Slot, klik-untuk-tambah, hapus,<br>harga langsung, simpan lokal|MVP|Developer|T1, T2|
|T6|Customizer<br>lanjutan|Seret ke slot, snap magnetik,<br>undo, keyboard|Polished|Developer|T5|
|T7|Hero 15 detik|Lima scene, poster statis, mode<br>_reduced motion_|Polished|UI/UX,<br>Developer|T1|
|T8|Gerak<br>halaman|Transisi, stagger grid, micro-<br>interactions|Polished|Developer|T3|
|T9|About dan<br>FAQ|Narasi merek, cara memasang,<br>FAQ, kemasan|MVP|Content|T2|
|T10|QA dan rilis|Uji perangkat, aksesibilitas,<br>Lighthouse, deploy|MVP|QA|Semua|
|T11|Dokumentasi|README: cara menjalankan,<br>struktur folder, cara mengganti<br>data produk|MVP|Presenter|T10|



**Stretch:** tampilan gelang melingkar ( _wrist view_ ), tombol acak, tautan untuk membagikan susunan gelang, pilihan bahasa Inggris. 

### **Peran** 

Lembar kerja menyebut empat peran dari enam anggota. Dua peran sisanya diusulkan di bawah, nama anggota diisi tim. 

|Peran|Tanggung jawab|Tugas|
|---|---|---|
|Project Leader|Memegang dokumen ini, memeriksa gate,<br>memutuskan bila ada perbedaan pendapat|Semua gate|
|Content Strategist|Menulis copy, FAQ, isi data produk, memastikan<br>tidak ada teks generik|T2, T9|
|UI/UX Designer|Token desain, ilustrasi charm, storyboard hero|T1, T2, T7|



|Peran|Tanggung jawab|Tugas|
|---|---|---|
|Presenter|Menulis README dan menguji alur beli dari sudut<br>pengguna|T11|
|AI Coding Operator (usulan)|Menjalankan tugas ke alat AI satu per satu dan<br>menggabungkan hasilnya|T0 sampai T8|
|QA dan Aset (usulan)|Menguji di perangkat nyata, mengekspor aset,<br>memeriksa daftar bagian 9|T10|



### **Risiko** 

|Risiko|Dampak|Penanganan|
|---|---|---|
|Seret-lepas sulit di<br>ponsel|Customizer tidak bisa<br>dipakai di HP|Klik-untuk-tambah selalu jadi jalur utama. Seret<br>hanya peningkatan|
|Hero berat|Animasi patah di ponsel<br>menengah|Hanya<br>transformdan<br>opacity, berhenti di luar<br>layar, poster statis sebagai cadangan|
|Gaya charm tidak<br>seragam|Tampilan ramai dan<br>tidak profesional|Satu kanvas 128 × 128, satu gaya ilustrasi, satu<br>gradien logam|
|Teks terasa dibuat<br>AI|Melanggar syarat tim|Content Strategist menulis dari fakta produk. Daftar<br>larangan di bagian 3|
|Anggota memahami<br>hal berbeda|Pekerjaan bentrok|Dokumen ini jadi sumber tunggal. Perubahan lewat<br>Quick Spec dan disetujui Leader|
|Tenggat belum jelas|Terlambat|MVP selesai lebih dulu, Polished dan Stretch<br>menyusul|



## **Kriteria selesai dan QA** 

Setiap fitur dianggap selesai hanya bila kriteria di tabel terpenuhi, diperiksa di peramban, bukan hanya "kodenya sudah jadi". 

|Fitur|Selesai bila|
|---|---|
|Header|Menempel di atas, transparan di puncak halaman dan solid setelah scroll.<br>Di ponsel berubah menjadi menu laci yang bisa ditutup dengan tombol<br>Esc dan ketukan di luar|
|Hero|Berjalan 15 detik lalu berulang, berhenti di luar layar, menampilkan<br>poster statis bila_reduced motion_aktif|
|Shop|Filter mengubah daftar tanpa muat ulang._Quick add_menambah item ke<br>Cart dan membuka slide-over|



|Fitur|Selesai bila|
|---|---|
|Customizer|Gelang bisa dirakit dengan klik di ponsel dan dengan seret di desktop.<br>Harga sama dengan hitungan manual rumus di bagian 6. Susunan<br>bertahan setelah muat ulang|
|Cart|Jumlah bisa diubah, item bisa dihapus, kemasan menambah harga yang<br>benar, total sama dengan jumlah baris|
|Checkout|Form wajib terisi sebelum tombol aktif. Pesan WhatsApp berisi daftar<br>item, susunan charm, kemasan, dan total|
|About dan FAQ|Semua teks ditulis tim dan cocok dengan produk nyata|



### **Daftar periksa rilis** 

#### **Tampilan** 

- ☐ Tidak ada elemen di luar palet bagian 3, dan silver tidak dipakai untuk teks 

- ☐ Tidak ada lebih dari satu kelompok charm per layar di luar Customizer 

- ☐ Tidak ada Lorem Ipsum, testimoni karangan, atau kata dari daftar larangan 

- ☐ Tampil benar di lebar 360, 768, 1280, dan 1440 px tanpa gulir horizontal 

#### **Gerak** 

- ☐ Transisi halaman dan hero lancar di satu ponsel Android dan satu iPhone, bila tersedia 

- • ☐ Pengaturan _reduced motion_ di sistem benar-benar mematikan animasi 

- ☐ Snap Customizer terasa sama di mouse dan layar sentuh 

#### **Fungsi** 

- ☐ Cart dan susunan gelang bertahan setelah muat ulang dan tidak error di mode privat 

- • ☐ Tidak ada kesalahan merah di konsol peramban 

- ☐ Seluruh Customizer bisa dipakai hanya dengan keyboard 

#### **Mutu dan rilis** 

- ☐ Skor Lighthouse mobile: Performance dan Accessibility masing-masing di atas 90 (target tim, bisa disesuaikan) 

- ☐ Semua gambar punya teks alternatif, semua tombol punya label 

- ☐ Situs terpasang di hosting statis dan tautannya dibuka dari perangkat lain 

- ☐ Alur Home, Customize, Cart, Checkout berjalan tanpa error di situs yang sudah dipasang 

## **Prompt induk untuk AI coding** 

Prompt di bawah menggantikan prompt di brief dan sudah memuat semua keputusan dokumen ini. Tempel sebagai konteks awal, lalu beri tugas satu per satu (T0, T1, dan seterusnya) sesuai bagian 8. Prompt memakai bahasa Inggris karena alat AI coding paling stabil dengannya, sedangkan teks di situs tetap bahasa Indonesia. 

##### ROLE 

You are a senior frontend engineer and motion designer building a small, high-quality e- commerce site for LINKED!, an Italian charm bracelet brand. It is a school project, so the code must be readable and easy to explain. 

##### STACK (do not substitute) 

Vite + React 18 + TypeScript, Tailwind CSS, Motion (Framer Motion), React Router, @dnd-kit/core. No backend. Data in /src/data/*.json. Cart and builder state persist in localStorage (keys linked.v1.cart, linked.v1.build), always wrapped in try/catch. 

##### DESIGN TOKENS 

ink #121212, paper #F9F9FB, steel #E2E8F0 (lines, fills, metal gradients only, never text), blush #F4E8E1. 

Metal gradient for links and charms: 135deg, #FFFFFF, #CBD5E1, #F1F5F9, #94A3B8. Fonts: Plus Jakarta Sans (body, headings), Instrument Serif italic (one accent word per heading), Geist Mono (tiny labels only). 

Radius 12px, 1px steel borders, no heavy shadows. 12-column grid, 24px mobile margin, 64px desktop margin. 

##### ANTI-SLOP RULES 

No purple or blue gradients, no blobs, no random particles, no emoji icons, no three identical icon-title-text cards, no filler words (revolutionary, elevate, unleash, seamless), no lorem ipsum, no invented testimonials. If copy is missing, insert a visible [TODO copy] marker and never invent product claims. Glassmorphism only on the header (blur 12px, solid after scroll). Charms are accents: outside the Customizer, show at most one charm cluster per viewport. 

##### PAGES 

Header (all pages): Home, Shop, Customize, About Us, Cart (opens slide-over). Home: hero animation, headline YOUR WRIST, YOUR STORY. (italic serif on STORY), subline 'Gelang kecil, cerita yang tak ada habisnya. Mix your charms, make it yours!', buttons Shop Now and Start Customizing, featured carousel of 4 cards, one Customizer teaser. 

Shop: filter chips (Semua, Basic Links, Individual Charms, Cute, Funny), product grid 4 cols desktop and 2 mobile, card with image, name, price, Quick add. Detail page at /shop/:id. Customize: see CUSTOMIZER. 

About Us: brand statement 'Small charms, big personality.', why Italian bracelet, 3-step how to attach charms, FAQ accordion, packaging and gift. 

Cart slide-over: items, quantity, packaging (standard or gift box), optional gift note, subtotal, button to /checkout. 

Checkout: name, WhatsApp number, address, note, order summary, button that opens a wa.me link with the order text. No real payment. 

##### CUSTOMIZER 

Sizes: S 17 slots, M 18 slots (default), L 20 slots. Total = basePrice + sum(addPrice of each charm). Plain links add 0. 

Click a charm to fill the first empty slot. Drag a charm to a slot: if released within 48px of the slot center, snap with a spring (stiffness 500, damping 30, about 4% overshoot); otherwise return in 300ms. Drag between slots swaps them. Remove with x button, drag out, or Backspace. Undo and 

redo (20 steps). Reset with confirmation. Changing size warns before dropping charms. Fully keyboard operable. Slot size 56px desktop, 44px mobile. Out-of-stock charms are greyed out and cannot be placed. 

Price counts up over 300ms when it changes. 

##### MOTION 

Hero is a 15-second looping SVG timeline, not a video: 0-3s one steel link draws in; 3-6s three charms drop in and snap on; 6-10s links grow to 18 and curve into a bracelet while the price counter rises; 10-13s background warms to blush and two charms swap; 13-15s wordmark and headline reveal, then links detach to loop. Small mono labels with scene number and timecode in the corners. Pause when off-screen or tab hidden. Show a static poster when prefers-reducedmotion is set. 

Page transitions 450ms (fade and 8px drop out, clip-path reveal in). Grid cards stagger 60ms, once. Parallax max 40px, hero and About only. Animate only transform and opacity. Reduced motion: all durations 0 except 150ms fades. 

##### QUALITY 

Semantic HTML, visible focus states, alt text on all images, text contrast at least 4.5:1, no console errors, works at 360, 768, 1280, 1440px with no horizontal scroll. Lazy-load the Customizer route. 

##### WORKFLOW 

Work on exactly one task at a time from the task list I give you. Before coding, restate the task and list the files you will create or change. After coding, tell me how to test it in the browser. Do not start the next task until I confirm. 

Untuk perubahan kecil, pakai pola Quick Spec: "Ubah [hal], hanya di [berkas], jangan menyentuh bagian lain, jelaskan perubahan dalam tiga baris." 

## **Lampiran: draf isian Lembar Kerja KKA** 

Draf ini disusun dari dokumen ini agar bisa langsung disalin ke lembar kerja _Perencanaan Proyek Website_ . Tim boleh mengubah kata-katanya. 

|Bagian lembar kerja|Isian|
|---|---|
|Nama website|LINKED!|
|Ide website|Toko online Italian charm bracelet. Pembeli bisa memilih gelang<br>jadi atau merakit gelang sendiri dengan memilih charm, lalu<br>melihat hasil dan harganya langsung|
|Masalah yang dibantu|Pembeli sulit membayangkan gelang yang dirakit sendiri dan tidak<br>tahu total harganya sebelum memesan. LINKED! menampilkan<br>susunan gelang dan harga secara langsung|
|Peran|Lihat tabel Peran di bagian 8|



|No.|Nama fitur|Kegunaan|
|---|---|---|
|1|Customizer gelang|Pembeli menyusun charm di 18 slot dan melihat hasil<br>serta harga secara langsung|
|2|Katalog Shop dengan filter|Pembeli melihat gelang dan charm per kategori lalu<br>menambahkannya ke keranjang|
|3|Cart dan checkout via WhatsApp|Pembeli melihat ringkasan, memilih kemasan, lalu<br>mengirim pesanan ke penjual|
|4|Hero animasi 15 detik|Memperkenalkan merek dan cara kerja Customizer<br>dalam satu tampilan pembuka|



## **Sumber** 

- <u>ODS Jewellers, panduan Nomination Composable: jumlah link 17–22, ukuran wanita tipikal 18,</u> cara memilih ukuran, bahan stainless steel 

- <u>Wix: Jade Biju jewelry E-commerce: referensi struktur toko perhiasan minimalis (Shop,</u> Testimonials, Categories) 

- <u>Wix: Jewelry Store eCom: referensi urutan Hero, koleksi, Best-Sellers, FAQ</u> 

- Empat video referensi yang diunggah tim (showreel 15 detik, build isometrik, Estra, tutorial prompt) 

Harga, nama produk, dan angka performa di dokumen ini adalah contoh atau target tim, bukan data dari sumber di atas. 

