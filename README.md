# 💍 Royal Digital Wedding Invitation - Silvia & Riyandi

Website undangan pernikahan digital interaktif dan responsif untuk **The Wedding of Silvia Wulandari & Riyandi Wahyudi**, dirancang dengan estetika mewah (*Royal Midnight Navy & Champagne Gold*), transisi halus, audio persisten lintas halaman, serta integrasi buku doa tamu realtime.

🌐 **Live Demo:** [https://weddingsw.site](https://weddingsw.site)  
📅 **Hari Bahagia:** Minggu, 20 September 2026  
📍 **Lokasi:** Kediaman Mempelai Wanita, Jl. Cempaka Putih Barat XIX, Jakarta Pusat  

---

## ✨ Fitur Utama

- 💌 **Personalisasi Tamu Undangan:** Mendukung parameter nama tamu otomatis via URL query string (`?to=Nama+Tamu`).
- 🎵 **Persistent Audio Player:** Dilengkapi fitur *playback memory resume* berbasis `sessionStorage`, sehingga musik latar tetap mengalun tanpa jeda saat berpindah rute halaman maupun saat tamu menekan tombol *Back* browser.
- 📖 **Kitab Doa & Ucapan (Wishes & RSVP):** Formulir ucapan selamat dan konfirmasi kehadiran yang terhubung langsung ke database MySQL.
- 📱 **WhatsApp Open Graph Optimized:** Link preview di WhatsApp, Facebook, dan Telegram otomatis memunculkan thumbnail gambar beresolusi optimal dan metadata resmi.
- ⚡ **Full Static Export (SSG):** Dibangun menggunakan arsitektur statis Next.js yang sangat ringan dan cepat diakses melalui server web LiteSpeed / Apache.

---

## 🛠️ Tech Stack

### Frontend & Core
- **Framework:** [Next.js](https://nextjs.org/) (App Router, Static HTML Export)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Typography:** Cormorant Garamond (Serif) & Plus Jakarta Sans (Sans-serif) via `next/font/google`
- **Animations:** Custom CSS Keyframes, SVG Filter Glows, & Tailwind Animate

### Backend & Storage
- **Database:** MySQL
- **API Handler:** PHP Script (`api_wishes.php`) untuk memproses input dan read ucapan secara asynchronous
- **Web Server:** cPanel LiteSpeed Web Server dengan konfigurasi custom `.htaccess`

---

## 📁 Struktur Direktori

```text
wedding-invitation/
├── app/
│   ├── globals.css           # Styling global & variasi tema
│   ├── layout.tsx            # Root layout, Google Fonts, Open Graph, & Global MusicPlayer
│   └── page.tsx              # Beranda & Cover Gate
├── public/
│   ├── audio/                # Asset audio (wedding.mp3)
│   ├── favicon.ico           # Ikon browser
│   ├── og-image.jpg          # Thumbnail preview Open Graph untuk medsos/WA
│   └── ...
├── src/
│   └── components/
│       ├── audio/
│       │   └── MusicPlayer.tsx          # Pemutar musik dengan memori sessionStorage
│       ├── cover/
│       │   ├── CoverGate.tsx            # Gerbang pembuka & nama tamu undangan
│       │   ├── Globe3D.tsx              # Efek dekorasi visual
│       │   └── SpotlightBg.tsx
│       ├── decorations/                 # Dekorasi floral & ornamen emas
│       └── sections/
│           ├── CoupleProfile.tsx        # Profil kedua mempelai
│           ├── EventScheduleRSVP.tsx    # Rincian akad, resepsi, maps, & rekening
│           └── WelcomeQuote.tsx
├── .htaccess                 # Routing LiteSpeed, Trailing Slash fix & API rewrite
├── api_wishes.php            # Endpoint database MySQL untuk ucapan/RSVP
├── next.config.ts            # Konfigurasi Next.js (output: 'export')
└── README.md
