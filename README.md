# Survey Angket Mahasiswa - Politeknik Ganesha Medan

Website survey angket mahasiswa modern untuk mengumpulkan data calon mahasiswa baru Politeknik Ganesha Medan dengan desain yang menarik dan responsif.

## 🎯 Fitur Utama

- **Landing Page Informatif**: Desain modern dengan informasi lengkap tentang kampus
- **Survey Interaktif**: Formulir survey 10 pertanyaan dengan validasi real-time
- **Responsive Design**: Optimal di desktop, tablet, dan mobile
- **Animasi Smooth**: Menggunakan Framer Motion untuk UX yang menarik
- **Firebase Integration**: Penyimpanan data survey ke Firestore
- **No Authentication**: Akses langsung tanpa login

## 🚀 Teknologi yang Digunakan

- **React 18** - Framework JavaScript modern
- **Vite** - Build tool yang cepat
- **TailwindCSS** - Framework CSS utility-first
- **Framer Motion** - Library animasi
- **Firebase Firestore** - Database cloud
- **React Router** - Routing aplikasi
- **Lucide React** - Icon library

## 📋 Struktur Halaman

### 1. Landing Page (/)
- Hero section dengan CTA utama
- Tentang Politeknik Ganesha
- Keunggulan kampus
- Program beasiswa
- Testimoni alumni
- Kontak dan footer

### 2. Survey Page (/survey)
- 10 pertanyaan survey bertahap
- Formulir data kontak
- Progress indicator
- Validasi real-time

### 3. Thank You Page (/thank-you)
- Konfirmasi pengiriman
- Informasi next steps
- Kontak support
- Social media links

### 4. Admin Dashboard (/admin)
- Password-protected admin panel
- View all survey submissions
- Export data to CSV
- Search and filter functionality
- Statistics dashboard

## 🛠️ Instalasi dan Setup

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd angket-mahasiswa
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Firebase
1. Buat project di [Firebase Console](https://console.firebase.google.com/)
2. Aktifkan Firestore Database
3. Copy file `env.example` ke `.env.local`
4. Isi konfigurasi Firebase di `.env.local`

### 4. Konfigurasi Environment Variables
```bash
# Copy file contoh
cp env.example .env.local

# Edit file .env.local dengan konfigurasi Firebase Anda
```

Lihat `FIREBASE_SETUP.md` untuk panduan lengkap setup Firebase.

### 5. Jalankan Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📊 Pertanyaan Survey

1. **Rencana setelah lulus SMA/SMK/MA**
2. **Jurusan yang diminati**
3. **Jenjang studi**
4. **Lokasi kuliah**
5. **Pembiaya kuliah**
6. **Perkiraan biaya kuliah per tahun**
7. **Alasan memilih kampus**
8. **Sosial media favorit**
9. **Media berita yang sering dibaca**
10. **Data kontak responden**

## 🎨 Desain dan UI/UX

### Color Scheme
- **Primary**: Red gradient (#dc2626 to #991b1b)
- **Secondary**: White and gray tones
- **Accent**: Green for success states

### Typography
- **Headings**: Poppins (Bold)
- **Body**: Inter (Regular)

### Components
- Custom button styles dengan hover effects
- Card components dengan shadow dan hover
- Responsive grid layouts
- Smooth animations dan transitions

## 📱 Responsive Design

Website dioptimalkan untuk:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🔧 Scripts

```bash
# Development
npm run dev

# Build untuk production
npm run build

# Preview build
npm run preview
```

## 📁 Struktur Folder

```
src/
├── components/          # Reusable components
│   ├── Header.jsx
│   └── Footer.jsx
├── pages/              # Page components
│   ├── LandingPage.jsx
│   ├── SurveyPage.jsx
│   ├── ThankYouPage.jsx
│   └── AdminDashboard.jsx
├── services/           # API services
│   └── surveyService.js
├── firebase/           # Firebase configuration
│   └── config.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🔒 Keamanan

- Validasi input di client-side dan server-side
- Sanitasi data sebelum disimpan ke database
- Rate limiting untuk mencegah spam
- HTTPS enforcement di production

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables
4. Deploy

### Netlify
1. Build project: `npm run build`
2. Upload `dist` folder ke Netlify
3. Configure redirects untuk SPA

## 📞 Support

Untuk bantuan teknis atau pertanyaan:
- Email: info@polganesha.ac.id
- WhatsApp: +62 812 3456 7890
- Website: [polganesha.ac.id](https://polganesha.ac.id)

## 📄 License

© 2024 Politeknik Ganesha Medan. All rights reserved.

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

**Dibuat dengan ❤️ untuk Politeknik Ganesha Medan** 