# Firebase Authentication Setup Guide

## Overview
Sistem survey calon mahasiswa Politeknik Ganesha Medan sekarang menggunakan Firebase Authentication untuk keamanan admin panel. Panduan ini akan membantu Anda mengatur Firebase Authentication dengan benar.

## Prerequisites
- Firebase project sudah dibuat
- Firebase configuration sudah diatur di `.env.local`
- Firebase Firestore sudah dikonfigurasi

## Langkah-langkah Setup

### 1. Aktifkan Firebase Authentication

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda
3. Di sidebar kiri, klik **Authentication**
4. Klik **Get started**
5. Pilih tab **Sign-in method**
6. Aktifkan **Email/Password** provider:
   - Klik **Email/Password**
   - Toggle **Enable**
   - Klik **Save**

### 2. Atur Firebase Security Rules

1. Di Firebase Console, buka **Firestore Database**
2. Klik tab **Rules**
3. Update rules untuk mengamankan data survey:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Survey data - hanya admin yang bisa baca
    match /surveys/{document} {
      allow read: if request.auth != null;
      allow write: if true; // Calon mahasiswa bisa submit survey
    }
    
    // Admin users collection (opsional)
    match /adminUsers/{document} {
      allow read, write: if request.auth != null && 
        request.auth.token.email.matches('.*@polganesha\\.ac\\.id');
    }
  }
}
```

### 3. Buat Akun Admin Pertama

#### Opsi A: Menggunakan AdminSetup Component (Recommended)

1. Jalankan aplikasi: `npm run dev`
2. Buka browser dan akses: `http://localhost:5173/admin`
3. Jika belum ada admin, Anda akan diarahkan ke halaman setup
4. Isi form dengan:
   - **Email**: `admin@polganesha.ac.id` (atau email admin yang valid)
   - **Password**: Minimal 6 karakter
   - **Konfirmasi Password**: Ulangi password
5. Klik **Buat Akun Admin**
6. Setelah berhasil, Anda akan diarahkan ke halaman login

#### Opsi B: Menggunakan Firebase Console

1. Buka Firebase Console → Authentication
2. Klik **Add user**
3. Masukkan email dan password
4. Klik **Add user**

### 4. Login sebagai Admin

1. Setelah akun admin dibuat, akses: `http://localhost:5173/admin`
2. Masukkan email dan password yang telah dibuat
3. Klik **Masuk ke Dashboard**
4. Anda akan diarahkan ke Admin Dashboard

## Fitur Keamanan

### 1. Firebase Authentication
- Login menggunakan email dan password
- Session management otomatis
- Logout yang aman
- Error handling yang komprehensif

### 2. Admin Validation
- Hanya user yang terautentikasi yang bisa akses dashboard
- Session persistence menggunakan localStorage
- Auto-logout jika session expired

### 3. Data Protection
- Survey data hanya bisa dibaca oleh admin yang login
- Calon mahasiswa tetap bisa submit survey tanpa login
- Export data hanya tersedia untuk admin

## Troubleshooting

### Error: "Email tidak terdaftar sebagai admin"
- Pastikan akun admin sudah dibuat di Firebase Authentication
- Periksa email yang dimasukkan sudah benar
- Pastikan Firebase configuration sudah benar

### Error: "Password salah"
- Periksa password yang dimasukkan
- Pastikan tidak ada spasi di awal atau akhir password
- Coba reset password di Firebase Console jika perlu

### Error: "Terlalu banyak percobaan login"
- Firebase membatasi percobaan login untuk keamanan
- Tunggu beberapa menit sebelum mencoba lagi
- Periksa apakah ada aktivitas mencurigakan

### Error: "Akun admin telah dinonaktifkan"
- Akun mungkin dinonaktifkan di Firebase Console
- Hubungi administrator untuk mengaktifkan kembali
- Atau buat akun admin baru

## Best Practices

### 1. Password Security
- Gunakan password yang kuat (minimal 8 karakter)
- Kombinasikan huruf besar, kecil, angka, dan simbol
- Jangan gunakan password yang sama dengan akun lain
- Ganti password secara berkala

### 2. Email Security
- Gunakan email institusi (@polganesha.ac.id)
- Aktifkan 2FA jika memungkinkan
- Jangan bagikan kredensial login

### 3. Session Management
- Logout setelah selesai menggunakan dashboard
- Jangan biarkan browser terbuka di komputer umum
- Bersihkan cache browser secara berkala

## Menambah Admin Baru

Untuk menambah admin baru:

1. **Menggunakan AdminSetup** (jika masih ada akses):
   - Akses `/admin` dan gunakan fitur setup
   - Hanya bisa digunakan jika belum ada admin

2. **Menggunakan Firebase Console**:
   - Buka Firebase Console → Authentication
   - Klik **Add user**
   - Masukkan email dan password
   - Klik **Add user**

3. **Menggunakan Code** (untuk developer):
   ```javascript
   import { createAdminAccount } from './services/authService'
   
   // Buat admin baru
   await createAdminAccount('admin2@polganesha.ac.id', 'password123')
   ```

## Monitoring dan Logs

### Firebase Authentication Logs
1. Buka Firebase Console → Authentication
2. Klik tab **Users** untuk melihat semua user
3. Klik tab **Sign-in method** untuk melihat aktivitas login

### Firestore Logs
1. Buka Firebase Console → Firestore Database
2. Klik tab **Usage** untuk melihat aktivitas database
3. Monitor penggunaan storage dan bandwidth

## Backup dan Recovery

### Backup Data Survey
- Export data secara berkala menggunakan fitur "Export CSV"
- Simpan backup di lokasi yang aman
- Dokumentasikan proses backup

### Recovery Admin Account
- Jika admin utama lupa password:
  1. Buka Firebase Console → Authentication
  2. Cari user admin
  3. Klik **Reset password**
  4. Kirim email reset ke admin

## Support

Jika mengalami masalah dengan Firebase Authentication:

1. Periksa dokumentasi Firebase: https://firebase.google.com/docs/auth
2. Periksa error logs di browser console
3. Hubungi tim developer untuk bantuan teknis
4. Pastikan semua environment variables sudah diatur dengan benar

## Update History

- **v2.0**: Implementasi Firebase Authentication
- **v1.0**: Simple password authentication

---

**Catatan**: Panduan ini dibuat untuk administrator Politeknik Ganesha Medan. Jangan bagikan kredensial login kepada pihak yang tidak berwenang.



