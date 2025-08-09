# 🔥 Firebase Setup Guide - Survey Angket Mahasiswa

## 📋 Langkah-langkah Setup Firebase

### 1. Buat Project Firebase

1. **Kunjungi Firebase Console**
   - Buka [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Login dengan Google account

2. **Buat Project Baru**
   - Klik "Create a project" atau "Add project"
   - Masukkan nama project: `survey-angket-mahasiswa`
   - Klik "Continue"

3. **Konfigurasi Project**
   - Pilih "Enable Google Analytics" (opsional)
   - Klik "Create project"

### 2. Aktifkan Firestore Database

1. **Buka Firestore Database**
   - Di sidebar kiri, klik "Firestore Database"
   - Klik "Create database"

2. **Pilih Mode**
   - Pilih "Start in test mode" (untuk development)
   - Klik "Next"

3. **Pilih Lokasi**
   - Pilih lokasi terdekat (misal: `asia-southeast1`)
   - Klik "Done"

### 3. Dapatkan Konfigurasi Firebase

1. **Buka Project Settings**
   - Klik icon gear (⚙️) di sidebar
   - Pilih "Project settings"

2. **Tambahkan Web App**
   - Scroll ke bawah ke "Your apps"
   - Klik icon web (</>)
   - Masukkan nama app: `survey-web-app`
   - Klik "Register app"

3. **Copy Konfigurasi**
   - Firebase akan menampilkan konfigurasi seperti ini:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

### 4. Update File Konfigurasi

1. **Buat file `.env.local`**
   ```bash
   # Di root project, buat file .env.local
   touch .env.local
   ```

2. **Isi dengan konfigurasi Firebase**
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=AIzaSyC...your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123

   # Admin Password (ganti dengan password yang Anda inginkan)
   VITE_ADMIN_PASSWORD=polganesha2024
   ```

### 5. Set Firestore Rules

1. **Buka Firestore Database**
   - Klik "Rules" tab

2. **Update Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /surveys/{document} {
         allow read, write: if true; // Untuk development
       }
     }
   }
   ```

3. **Klik "Publish"**

## 🚀 Test Konfigurasi

### 1. Jalankan Development Server
```bash
npm run dev
```

### 2. Test Survey
- Buka `http://localhost:3000/survey`
- Isi survey lengkap
- Submit data

### 3. Test Admin Dashboard
- Buka `http://localhost:3000/admin`
- Login dengan password: `polganesha2024`
- Lihat data survey yang baru dikirim

## 🔒 Keamanan untuk Production

### 1. Update Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /surveys/{document} {
      allow read, write: if request.auth != null; // Hanya user yang login
    }
  }
}
```

### 2. Ganti Password Admin
- Update `VITE_ADMIN_PASSWORD` di `.env.local`
- Gunakan password yang kuat

### 3. Environment Variables
- Jangan commit file `.env.local` ke git
- Gunakan environment variables di hosting

## 📊 Struktur Data di Firestore

Collection: `surveys`

Document structure:
```javascript
{
  nama: "Nama Lengkap",
  noWA: "081234567890",
  alamat: "Alamat Lengkap",
  asalSekolah: "Nama Sekolah",
  kelasJurusan: "XII IPA 1",
  
  // Survey questions
  rencanaSetelahLulus: "Kuliah di Perguruan Tinggi",
  jurusanDiminati: "Teknik Informatika",
  jenjangStudi: "D3 (Diploma 3)",
  lokasiKuliah: "Kota Medan",
  pembiayaKuliah: "Beasiswa penuh",
  perkiraanBiaya: "Rp 5 - 10 juta",
  alasanMemilihKampus: "Akreditasi dan kualitas pendidikan",
  sosialMediaFavorit: "Instagram",
  mediaBerita: "Kompas.com",
  
  // Metadata
  submittedAt: Timestamp,
  status: "pending"
}
```

## 🛠️ Troubleshooting

### Error: "Firebase: Error (auth/unauthorized)"
- Pastikan Firestore rules mengizinkan read/write
- Cek konfigurasi Firebase

### Error: "Firebase: Error (app/no-app)"
- Pastikan Firebase sudah diinisialisasi
- Cek import dan konfigurasi

### Data tidak muncul di Admin Dashboard
- Cek koneksi internet
- Pastikan data sudah tersimpan di Firestore
- Refresh halaman admin

## 📞 Support

Jika mengalami masalah:
- Email: info@polganesha.ac.id
- WhatsApp: +62 812 3456 7890

---

**✅ Setelah setup selesai, website siap digunakan!** 