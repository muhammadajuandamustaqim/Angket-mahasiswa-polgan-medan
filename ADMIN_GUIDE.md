# 🛡️ Admin Dashboard Guide - Survey Angket Mahasiswa

## 📍 Akses Admin Dashboard

Admin dashboard dapat diakses melalui URL: `http://localhost:3000/admin`

## 🔐 Password Default

Password default untuk akses admin: **`polganesha2024`**

> ⚠️ **Penting**: Ganti password default ini untuk keamanan!

## 🎯 Fitur Admin Dashboard

### 1. **Dashboard Overview**
- Total survey yang diterima
- Survey hari ini
- Survey minggu ini  
- Survey bulan ini

### 2. **Data Survey**
- Daftar lengkap semua survey yang dikirim
- Informasi detail responden
- Status survey (pending, reviewed, approved, rejected)
- Tanggal dan waktu pengiriman

### 3. **Filter & Search**
- Pencarian berdasarkan nama, WhatsApp, atau sekolah
- Filter berdasarkan status survey
- Export data ke CSV

### 4. **Detail Survey**
- Klik "Lihat Detail" untuk melihat semua jawaban survey
- Data kontak lengkap responden
- Semua 10 pertanyaan survey

## 🔧 Setup Firebase

### 1. Buat Project Firebase
1. Kunjungi [Firebase Console](https://console.firebase.google.com/)
2. Buat project baru
3. Aktifkan Firestore Database

### 2. Update Konfigurasi
Edit file `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
}
```

### 3. Set Firestore Rules
Di Firebase Console, set Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /surveys/{document} {
      allow read, write: if true; // Untuk development
      // Untuk production, gunakan autentikasi yang lebih aman
    }
  }
}
```

## 🚀 Cara Menggunakan

### 1. **Login Admin**
- Buka `/admin`
- Masukkan password
- Klik "Masuk ke Dashboard"

### 2. **Lihat Data Survey**
- Semua survey akan ditampilkan dalam tabel
- Gunakan search untuk mencari data spesifik
- Filter berdasarkan status jika diperlukan

### 3. **Export Data**
- Klik tombol "Export CSV"
- File akan otomatis terdownload
- Format: `survey_data_YYYY-MM-DD.csv`

### 4. **Lihat Detail Survey**
- Klik "Lihat Detail" pada baris survey
- Popup akan menampilkan semua data responden

## 📊 Struktur Data Survey

Setiap survey berisi:

```javascript
{
  id: "auto-generated-id",
  nama: "Nama Lengkap",
  noWA: "081234567890",
  alamat: "Alamat Lengkap",
  asalSekolah: "Nama Sekolah",
  kelasJurusan: "XII IPA 1",
  
  // 9 Pertanyaan Survey
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
  submittedAt: "2024-01-15T10:30:00Z",
  status: "pending"
}
```

## 🔒 Keamanan

### Password Protection
- Admin dashboard dilindungi dengan password
- Session disimpan di localStorage
- Logout otomatis saat browser ditutup

### Data Protection
- Data survey disimpan di Firebase Firestore
- Backup otomatis oleh Firebase
- Akses terbatas hanya melalui admin dashboard

## 📱 Responsive Design

Admin dashboard responsive untuk:
- **Desktop**: Tampilan penuh dengan semua fitur
- **Tablet**: Layout yang dioptimalkan
- **Mobile**: Tampilan yang disesuaikan untuk layar kecil

## 🛠️ Troubleshooting

### Masalah Umum:

1. **Tidak bisa login**
   - Pastikan password benar
   - Cek console browser untuk error

2. **Data tidak muncul**
   - Pastikan Firebase config benar
   - Cek koneksi internet
   - Pastikan Firestore rules mengizinkan read

3. **Export CSV tidak berfungsi**
   - Pastikan browser mengizinkan download
   - Cek popup blocker

## 📞 Support

Untuk bantuan teknis:
- Email: info@polganesha.ac.id
- WhatsApp: +62 812 3456 7890

---

**⚠️ Catatan Keamanan:**
- Ganti password default segera setelah setup
- Backup data secara berkala
- Monitor akses admin dashboard
- Update Firebase rules untuk production 