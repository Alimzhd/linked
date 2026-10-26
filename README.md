# LINKED! — Italian Charm Bracelet E-Commerce Platform

> **"YOUR WRIST, YOUR STORY."**  
> Toko online modern & minimalis untuk Italian Charm Bracelet modular 9mm berbasis Stainless Steel 316L, dilengkapi dengan studio interaktif 18-slot builder dan timeline animasi 15 detik berbasis kode.

---

## 💎 Arsitektur & Tech Stack

Aplikasi ini dibangun tanpa backend (serverless client-side architecture) sesuai ketetapan **Master Spec & Implementation Plan**:

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS dengan token desain kustom (Paper `#F9F9FB`, Ink `#121212`, Steel `#E2E8F0`, Blush `#F4E8E1`, dan Gradien Logam 135°)
- **Animasi & Motion**: Motion (`framer-motion`) untuk timeline hero 15 detik dan micro-interactions
- **Interaksi Drag & Drop**: `@dnd-kit/core` dengan snap magnetik berspring (`stiffness: 500, damping: 30`)
- **Routing**: React Router v6 dengan lazy-loading otomatis pada rute `/customize`
- **State & Penyimpanan**: React Context + `useReducer` dengan persistensi lokal (`linked.v1.cart`, `linked.v1.build`) yang dibungkus `try/catch` untuk keamanan private browsing

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

### 1. Prasyarat
- Node.js (versi 18+)
- npm atau pnpm / yarn

### 2. Instalasi & Menjalankan Dev Server
```bash
# Pindah ke direktori proyek
cd /home/alimzius/linked

# Instal dependensi (bila belum)
npm install

# Jalankan server pengembangan lokal (Vite)
npm run dev
```
Buka browser di `http://localhost:3000` (atau port yang ditampilkan di terminal).

### 3. Build untuk Produksi
```bash
npm run build
```
Hasil build statis akan tersimpan di direktori `dist/` dan siap dipasang di Vercel, Netlify, atau GitHub Pages.

---

## 📁 Struktur Direktori

```text
linked/
├── public/                 # Favicon dan aset statis
│   └── favicon.svg
├── src/
│   ├── app/                # Konfigurasi router dan layout utama
│   │   ├── Layout.tsx
│   │   └── router.tsx
│   ├── components/         # Komponen UI global reusabel
│   │   ├── Button.tsx
│   │   ├── CharmSvg.tsx    # 128x128 SVG generator untuk link & charm
│   │   ├── Footer.tsx
│   │   ├── Header.tsx      # Header glassmorphism (solid on scroll)
│   │   └── ProductCard.tsx
│   ├── data/               # Data katalog produk, charm, dan FAQ
│   │   ├── charms.json     # Pustaka charm (Basic, Cute, Funny, Letter)
│   │   ├── faq.json        # Tanya jawab produk
│   │   └── products.json   # Katalog produk Shop
│   ├── features/
│   │   ├── cart/           # Fitur keranjang & drawer slide-over
│   │   │   ├── CartDrawer.tsx
│   │   │   └── cartContext.tsx
│   │   ├── customizer/     # Studio perakitan gelang 18-slot
│   │   │   ├── BraceletBar.tsx
│   │   │   ├── CharmLibrary.tsx
│   │   │   ├── Slot.tsx
│   │   │   └── useBuilder.ts
│   │   └── hero/           # Hero showreel 15 detik berbasis kode SVG
│   │       └── HeroReel.tsx
│   ├── lib/
│   │   ├── format-rupiah.ts # Formatter mata uang IDR
│   │   └── storage.ts       # Safe LocalStorage wrapper
│   ├── pages/              # Halaman rute aplikasi
│   │   ├── About.tsx       # Narasi merek, tutorial 3 langkah, FAQ
│   │   ├── Checkout.tsx    # Formulir pengiriman & pembuat link wa.me
│   │   ├── Customize.tsx   # Halaman studio kustomisasi interaktif
│   │   ├── Home.tsx        # Halaman pembuka & koleksi unggulan
│   │   ├── ProductDetail.tsx # Detail produk /shop/:id
│   │   └── Shop.tsx        # Katalog dengan filter chips & grid 4/2
│   ├── styles/
│   │   └── tokens.css      # Variabel CSS warna, font, easing
│   ├── types/
│   │   └── index.ts        # Deklarasi tipe TypeScript tanpa 'any'
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ Cara Mengganti & Menambah Data Produk

Semua data tersimpan dalam berkas JSON murni di folder `src/data/`:

### 1. Menambah Charm Baru (`src/data/charms.json`)
Tambahkan objek dengan struktur berikut:
```json
{
  "id": "charm-cute-clover",
  "name": "Four Leaf Clover",
  "category": "cute",
  "addPrice": 15000,
  "inStock": true,
  "symbol": "clover",
  "description": "Charm keberuntungan empat daun bertekstur etsa logam presisi."
}
```

### 2. Menambah Produk Shop Baru (`src/data/products.json`)
```json
{
  "id": "prod-starter-gold",
  "name": "Vintage Satin Edition",
  "category": "Basic Links",
  "price": 119000,
  "material": "Stainless Steel 316L",
  "dimensions": "Lebar 9mm, Panjang 18 link (~16.5 cm)",
  "description": "Gelang dasar edisi polesan satin mewah.",
  "features": [
    "Material bedah tahan gores",
    "Kompatibel 100% dengan charm standar 9mm"
  ],
  "inStock": true,
  "isFeatured": true,
  "tag": "New Arrival"
}
```

---

## 🧮 Rumus Kalkulasi Harga Customizer

Setiap gelang dihitung secara dinamis:
$$\text{Total} = \text{Harga Gelang Dasar (Rp 99.000)} + \sum (\text{Harga Tambahan Tiap Charm})$$

- Modul link polos: Tambahan **Rp 0**
- Modul inisial huruf: Tambahan **Rp 12.000**
- Modul kategori Cute: Tambahan **Rp 15.000**
- Modul kategori Funny: Tambahan **Rp 18.000**
- Kemasan Gift Box kustom (opsional): Tambahan **Rp 25.000**

---

## 📱 Alur Pemesanan WhatsApp (wa.me)

Alur checkout tidak menggunakan payment gateway palsu, melainkan menyusun rincian pesanan terformat rapi dan langsung mengarahkan ke link `wa.me`:
```text
Halo LINKED!, saya mau pesan:

1. Gelang Custom, ukuran M (18 slot)
   Link polos x14, Embossed Heart x2, Initial A x2
   Jumlah 1, Rp 153.000

Kemasan: Signature Gift Box Set (+Rp 25.000)
Pesan Kartu Ucapan: "Happy Anniversary!"
Total: Rp 178.000

Nama: Sarah Aulia
Nomor WA: 081234567890
Alamat Pengiriman: Jl. Mawar No. 12, Jakarta Selatan
```
Pesan dienkripsi dengan `encodeURIComponent()` sehingga rapi terbaca di aplikasi WhatsApp pelanggan dan penjual.

---

## 🌟 Aturan Desain Anti AI-Slop yang Diterapkan
- Tidak ada gradien ungu/biru generik (hanya gradien logam 135° pada badan link/charm).
- Tipografi berkualitas tinggi (*Plus Jakarta Sans* untuk body/headings, *Instrument Serif Italic* maksimal satu kata aksen per judul, dan *Geist Mono* untuk micro-labels).
- Tidak ada ikon emoji, filler copy, atau klaim testimoni palsu.
- Glassmorphism hanya digunakan pada header (blur 12px, solid paper saat scroll).
