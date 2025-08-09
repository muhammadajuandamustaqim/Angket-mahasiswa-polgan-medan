import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword 
} from 'firebase/auth'
import { auth } from '../firebase/config'

// Admin login with Firebase Authentication
export const adminLogin = async (email, password) => {
  try {
    console.log('Attempting login with email:', email)
    console.log('Firebase config check:', {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Not set',
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Not set',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Set' : 'Not set'
    })
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    console.log('Login successful for user:', user.email)
    
    // Store admin session
    localStorage.setItem('adminAuthenticated', 'true')
    localStorage.setItem('adminLoginTime', new Date().toISOString())
    localStorage.setItem('adminEmail', user.email)
    
    return { success: true, user }
  } catch (error) {
    console.error('Login error details:', {
      code: error.code,
      message: error.message,
      email: email
    })
    
    // Handle specific Firebase auth errors
    let errorMessage = 'Terjadi kesalahan saat login. Silakan coba lagi.'
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Email tidak terdaftar sebagai admin.'
        break
      case 'auth/wrong-password':
        errorMessage = 'Password salah. Silakan coba lagi.'
        break
      case 'auth/invalid-email':
        errorMessage = 'Format email tidak valid.'
        break
      case 'auth/too-many-requests':
        errorMessage = 'Terlalu banyak percobaan login. Silakan coba lagi nanti.'
        break
      case 'auth/user-disabled':
        errorMessage = 'Akun admin telah dinonaktifkan.'
        break
      case 'auth/network-request-failed':
        errorMessage = 'Koneksi internet bermasalah. Periksa koneksi Anda.'
        break
      case 'auth/invalid-api-key':
        errorMessage = 'Konfigurasi Firebase tidak valid. Hubungi administrator.'
        break
      case 'auth/app-not-authorized':
        errorMessage = 'Aplikasi tidak diotorisasi. Periksa konfigurasi Firebase.'
        break
      case 'auth/operation-not-allowed':
        errorMessage = 'Metode login tidak diizinkan. Periksa pengaturan Firebase.'
        break
      default:
        errorMessage = `Gagal login: ${error.message}`
    }
    
    throw new Error(errorMessage)
  }
}

// Admin logout
export const adminLogout = async () => {
  try {
    await signOut(auth)
    
    // Clear admin session
    localStorage.removeItem('adminAuthenticated')
    localStorage.removeItem('adminLoginTime')
    localStorage.removeItem('adminEmail')
    
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    throw new Error('Gagal logout. Silakan coba lagi.')
  }
}

// Check if user is authenticated
export const checkAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      localStorage.setItem('adminAuthenticated', 'true')
      localStorage.setItem('adminEmail', user.email)
      console.log('User authenticated:', user.email)
    } else {
      // User is signed out
      localStorage.removeItem('adminAuthenticated')
      localStorage.removeItem('adminEmail')
      console.log('User signed out')
    }
    
    if (callback) {
      callback(user)
    }
  })
}

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser
}

// Check if user is admin (you can add additional admin validation here)
export const isAdmin = (user) => {
  // For now, we'll consider any authenticated user as admin
  // You can add more specific admin validation logic here
  // For example, check against a list of admin emails or custom claims
  return user && user.email
}

// Create admin account (for initial setup - use only once)
export const createAdminAccount = async (email, password) => {
  try {
    console.log('Creating admin account for:', email)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log('Admin account created successfully:', userCredential.user.email)
    return { success: true, user: userCredential.user }
  } catch (error) {
    console.error('Error creating admin account:', error)
    
    let errorMessage = 'Gagal membuat akun admin.'
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Email sudah terdaftar.'
        break
      case 'auth/invalid-email':
        errorMessage = 'Format email tidak valid.'
        break
      case 'auth/weak-password':
        errorMessage = 'Password terlalu lemah. Minimal 6 karakter.'
        break
      case 'auth/network-request-failed':
        errorMessage = 'Koneksi internet bermasalah. Periksa koneksi Anda.'
        break
      case 'auth/invalid-api-key':
        errorMessage = 'Konfigurasi Firebase tidak valid. Hubungi administrator.'
        break
      case 'auth/operation-not-allowed':
        errorMessage = 'Pembuatan akun tidak diizinkan. Periksa pengaturan Firebase.'
        break
      default:
        errorMessage = `Gagal membuat akun admin: ${error.message}`
    }
    
    throw new Error(errorMessage)
  }
}

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...')
    console.log('Auth instance:', auth)
    console.log('Current user:', auth.currentUser)
    return { success: true, message: 'Firebase connection successful' }
  } catch (error) {
    console.error('Firebase connection test failed:', error)
    return { success: false, error: error.message }
  }
}
