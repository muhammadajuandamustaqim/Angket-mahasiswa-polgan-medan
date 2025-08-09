import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../firebase/config'
import { signInAnonymously } from 'firebase/auth'

export const submitSurvey = async (surveyData) => {
  try {
    // Ensure we have an authenticated session if Firestore rules require it
    if (!auth.currentUser) {
      try {
        await signInAnonymously(auth)
      } catch (e) {
        // If anonymous sign-in fails, continue; write may still be allowed by rules
        console.warn('Anonymous sign-in failed:', e?.message || e)
      }
    }

    const docRef = await addDoc(collection(db, 'surveys'), {
      ...surveyData,
      submittedAt: serverTimestamp(),
      status: 'pending'
    })
    
    console.log('Survey submitted successfully with ID:', docRef.id)
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Error submitting survey:', error)
    throw new Error('Gagal mengirim data survey. Silakan coba lagi.')
  }
}

export const validateSurveyData = (data) => {
  const errors = {}
  
  // Validate required fields
  const requiredFields = [
    'rencanaSetelahLulus',
    'jurusanDiminati', 
    'jenjangStudi',
    'lokasiKuliah',
    'pembiayaKuliah',
    'perkiraanBiaya',
    'alasanMemilihKampus',
    'sosialMediaFavorit',
    'mediaBerita',
    'nama',
    'noWA',
    'alamat',
    'asalSekolah',
    'kelasJurusan'
  ]
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      errors[field] = 'Field ini wajib diisi'
    }
  })
  
  // Validate WhatsApp number format
  if (data.noWA && !/^(\+62|62|0)8[1-9][0-9]{6,9}$/.test(data.noWA.replace(/\s/g, ''))) {
    errors.noWA = 'Format nomor WhatsApp tidak valid'
  }
  
  return errors
} 