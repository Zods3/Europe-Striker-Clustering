# Europe Striker Clustering — Web Visualization System

Sistem ini merupakan aplikasi web berbasis React yang digunakan untuk memvisualisasikan hasil klasterisasi penyerang sepak bola dari liga top Eropa. Klasterisasi dilakukan menggunakan algoritma **HDBSCAN** berdasarkan data statistik performa pemain.

Aplikasi ini dikembangkan sebagai pendamping penelitian skripsi dan bertujuan untuk memudahkan eksplorasi, analisis, serta interpretasi hasil klasterisasi pemain secara interaktif.

---

## Live Demo
Website siap digunakan dan dapat diakses melalui tautan berikut:  
**https://europe-striker-clustering.vercel.app/**

---

## Data & Metode
- **Sumber Data**: Transfermarkt.com  
- **Metode Klasterisasi**: HDBSCAN  
- **Evaluasi Klaster**: Davies–Bouldin Index (DBI) dan Density-Based Cluster Validity (DBCV)

---

## ✨ Fitur Utama
- Visualisasi hasil klasterisasi pemain dalam tampilan **2D dan 3D**
- Informasi ringkasan dan karakteristik setiap klaster
- Pencarian pemain berdasarkan nama dan filter klaster
- Halaman **Player Detail** berisi statistik lengkap dan nilai PCA
- Fitur **Compare Player** untuk membandingkan dua pemain secara langsung
- Halaman **About** dan **Help** sebagai dokumentasi penggunaan sistem

---

## Struktur Direktori
- **src/** : Source code aplikasi React
- **public/** : Asset publik
- **data/** : File JSON hasil clustering dan evaluasi

---

## Persyaratan Sistem
- **Node.js** (disarankan versi LTS)
- **npm** atau **yarn**
- **Browser** modern (Chrome / Firefox)

---

## Cara Menjalankan Aplikasi (Local)

Untuk menjalankan aplikasi secara lokal, silakan jalankan perintah berikut secara berurutan melalui terminal:

```bash
git clone https://github.com/Zods3/Europe-Striker-Clustering.git
cd europe-striker-clustering
npm install
npm start
