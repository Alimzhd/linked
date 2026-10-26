# Panduan Update Data Produk LINKED!

## File Template yang Sudah Siap

- `src/data/charms-template.json` - Template 14 charm berdasarkan produk Anda
- `src/data/products-template.json` - Template produk pre-made dan individual

## Cara Update Foto Nanti

### Step 1: Siapkan Foto
- Background putih konsisten
- Ukuran minimal 800x800px
- Format JPG atau WebP

### Step 2: Upload ke Folder
Taruh di: `public/images/charms/` dan `public/images/products/`

### Step 3: Aktifkan Template
```bash
cp src/data/charms-template.json src/data/charms.json
cp src/data/products-template.json src/data/products.json
```

### Step 4: Update imageUrl di JSON
Ganti placeholder paths dengan foto asli Anda.

## Current Inventory: 14 Charms

- 6 Colorful Enamel (Rp 15k each)
- 4 Minimalist Silver (Rp 12k each)  
- 3 Spider-Man Licensed (Rp 25k each)
- 1 Plain base link (Rp 0)

