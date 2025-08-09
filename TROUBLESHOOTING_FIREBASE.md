# Troubleshooting Firebase Authentication

## Masalah: "Gagal login. Silakan coba lagi."

Jika Anda mengalami error "Gagal login. Silakan coba lagi." meskipun akun sudah ada di Firebase, ikuti langkah-langkah diagnosis berikut:

## Langkah 1: Gunakan Firebase Debug Tool

1. **Akses Debug Tool:**
   - Buka browser dan akses: `http://localhost:3000/debug`
   - Klik tombol "Jalankan Diagnosis Firebase"
   - Periksa hasil diagnosis

2. **Periksa Environment Variables:**
   - Pastikan semua environment variables sudah diatur dengan benar
   - Jika ada yang "❌ Not set", perbaiki di file `.env.local`

## Langkah 2: Periksa Konfigurasi Firebase

### 1. Firebase Console Setup
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project Anda
3. Pastikan **Authentication** sudah diaktifkan:
   - Klik **Authentication** di sidebar
   - Pastikan **Email/Password** provider sudah **Enabled**

### 2. Firebase Project Settings
1. Di Firebase Console, klik **Project Settings** (⚙️ icon)
2. Scroll ke bawah ke bagian **Your apps**
3. Pastikan web app sudah terdaftar
4. Copy konfigurasi yang benar ke `.env.local`

### 3. Environment Variables yang Benar
```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Langkah 3: Periksa Akun Admin

### 1. Verifikasi Akun di Firebase Console
1. Buka Firebase Console → **Authentication**
2. Klik tab **Users**
3. Pastikan akun admin ada dalam daftar
4. Periksa status akun (tidak disabled)

### 2. Test Login dengan Firebase Console
1. Di Firebase Console → **Authentication**
2. Klik **Add user** (untuk test)
3. Buat akun test dengan email dan password sederhana
4. Coba login dengan akun test ini

## Langkah 4: Periksa Browser Console

1. **Buka Developer Tools:**
   - Tekan `F12` atau `Ctrl+Shift+I`
   - Klik tab **Console**

2. **Coba Login dan Periksa Error:**
   - Akses `/admin` dan coba login
   - Perhatikan error messages di console
   - Error akan menunjukkan masalah spesifik

## Langkah 5: Common Issues dan Solusi

### Issue 1: "auth/invalid-api-key"
**Solusi:**
- Periksa `VITE_FIREBASE_API_KEY` di `.env.local`
- Pastikan API key benar dan tidak ada spasi ekstra
- Restart development server setelah mengubah environment variables

### Issue 2: "auth/user-not-found"
**Solusi:**
- Pastikan akun sudah dibuat di Firebase Console
- Periksa email yang dimasukkan sudah benar
- Coba buat akun baru untuk test

### Issue 3: "auth/wrong-password"
**Solusi:**
- Periksa password yang dimasukkan
- Pastikan tidak ada spasi di awal atau akhir
- Coba reset password di Firebase Console

### Issue 4: "auth/network-request-failed"
**Solusi:**
- Periksa koneksi internet
- Coba refresh halaman
- Periksa firewall atau proxy settings

### Issue 5: "auth/operation-not-allowed"
**Solusi:**
- Di Firebase Console → Authentication → Sign-in method
- Pastikan **Email/Password** provider sudah **Enabled**
- Jika belum, enable dan klik **Save**

### Issue 6: "auth/app-not-authorized"
**Solusi:**
- Periksa domain yang diizinkan di Firebase Console
- Tambahkan `localhost` ke authorized domains jika testing lokal

## Langkah 6: Testing Step by Step

### 1. Test Environment Variables
```javascript
// Buka browser console dan jalankan:
console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Not set')
console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Not set')
console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Set' : 'Not set')
```

### 2. Test Firebase Connection
```javascript
// Di browser console:
import { auth } from './src/firebase/config'
console.log('Auth instance:', auth)
console.log('Current user:', auth.currentUser)
```

### 3. Test Login Function
```javascript
// Di browser console:
import { adminLogin } from './src/services/authService'
adminLogin('your-email@example.com', 'your-password')
  .then(result => console.log('Login success:', result))
  .catch(error => console.error('Login error:', error))
```

## Langkah 7: Reset dan Setup Ulang

### Jika Masalah Berlanjut:

1. **Clear Browser Data:**
   - Clear localStorage: `localStorage.clear()`
   - Clear cookies dan cache browser

2. **Restart Development Server:**
   ```bash
   npm run dev
   ```

3. **Recreate Admin Account:**
   - Hapus akun admin di Firebase Console
   - Buat akun baru dengan email dan password yang berbeda

4. **Check Firebase Rules:**
   - Pastikan Firestore rules tidak memblokir authentication
   - Gunakan rules yang lebih permisif untuk testing

## Langkah 8: Contact Support

Jika semua langkah di atas sudah dicoba tapi masalah masih berlanjut:

1. **Collect Debug Information:**
   - Jalankan Firebase Debug Tool di `/debug`
   - Copy hasil diagnosis
   - Screenshot error messages

2. **Provide Information:**
   - Firebase project ID
   - Error messages lengkap
   - Browser dan OS yang digunakan
   - Steps yang sudah dicoba

## Prevention Tips

### 1. Environment Variables
- Selalu gunakan `.env.local` untuk environment variables
- Jangan commit file `.env.local` ke repository
- Gunakan `.env.example` sebagai template

### 2. Firebase Configuration
- Simpan konfigurasi Firebase dengan aman
- Backup konfigurasi di tempat yang aman
- Gunakan environment variables untuk semua konfigurasi

### 3. Testing
- Test login functionality secara berkala
- Monitor Firebase Console untuk aktivitas mencurigakan
- Backup data survey secara berkala

---

**Catatan:** Panduan ini dibuat untuk membantu mengatasi masalah Firebase Authentication. Jika masalah masih berlanjut, hubungi tim developer untuk bantuan lebih lanjut.
