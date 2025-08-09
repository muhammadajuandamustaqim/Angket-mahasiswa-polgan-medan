import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

// Firebase configuration
// Prefer env vars; fallback to known-good values from your Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBnufKgHdeEuvpXTrZTkPVB3kwoDB8vOJc',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'angket-mahasiswa.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'angket-mahasiswa',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'angket-mahasiswa.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '203655552828',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:203655552828:web:c760ac0129514f0721c839',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-RRCCGH3N2Y'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Firebase Authentication
export const auth = getAuth(app)

// Initialize Firebase Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

export default app 