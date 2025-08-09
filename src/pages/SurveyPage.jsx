import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ArrowRight, 
  GraduationCap, 
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { submitSurvey } from '../services/surveyService'

const SurveyPage = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Question 1: Rencana setelah lulus SMA/SMK/MA
    rencanaSetelahLulus: '',
    rencanaSetelahLulusLainnya: '',
    
    // Question 2: Jurusan yang diminati
    jurusanDiminati: '',
    
    // Question 3: Jenjang studi
    jenjangStudi: '',
    
    // Question 4: Lokasi kuliah
    lokasiKuliah: '',
    
    // Question 5: Pembiaya kuliah
    pembiayaKuliah: '',
    pembiayaKuliahLainnya: '',
    
    // Question 6: Perkiraan biaya kuliah per tahun
    perkiraanBiaya: '',
    
    // Question 7: Alasan memilih kampus
    alasanMemilihKampus: '',
    
    // Question 8: Sosial media favorit
    sosialMediaFavorit: '',
    
    // Question 9: Koran yang sering dibaca (opsional)
    mediaBerita: '',
    mediaBeritaLainnya: '',
    
    // Question 10: Kontak responden
    nama: '',
    noWA: '',
    alamat: '',
    asalSekolah: '',
    kelasJurusan: '',
    email: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startTime] = useState(new Date())

  const questions = [
    {
      id: 'rencanaSetelahLulus',
      question: 'Apa rencana Anda setelah lulus SMA/SMK/MA (sederajat)?',
      type: 'radio',
      options: [
        'Kuliah',
        'Kerja',
        'Kerja sambil kuliah',
        'Belum kerja',
        'Lainnya'
      ],
      hasOther: true
    },
    {
      id: 'jurusanDiminati',
      question: 'Jika Anda kuliah, jurusan yang Anda minati?',
      type: 'radio',
      options: [
        'Teknik Informatika',
        'Akuntansi',
        'Manajemen Informatika'
      ]
    },
    {
      id: 'jenjangStudi',
      question: 'Apa jenjang studi yang Anda pilih?',
      type: 'radio',
      options: [
        'D3',
        'S1',
        'D3-S1'
      ]
    },
    {
      id: 'lokasiKuliah',
      question: 'Di daerah mana Anda rencana kuliah?',
      type: 'radio',
      options: [
        'Medan',
        'Daerah Sumut',
        'Di luar Sumut',
        'Luar negeri'
      ]
    },
    {
      id: 'pembiayaKuliah',
      question: 'Siapa yang membiayai kuliah Anda?',
      type: 'radio',
      options: [
        'Sendiri',
        'Beasiswa',
        'Orang tua',
        'Lainnya'
      ],
      hasOther: true
    },
    {
      id: 'perkiraanBiaya',
      question: 'Berapa kesanggupan orang tua/Anda membiayai uang kuliah/tahunnya?',
      type: 'radio',
      options: [
        'Di bawah 3 juta',
        '3-5 jt',
        '5-8 jt',
        '8-12 jt',
        '12 ke atas'
      ]
    },
    {
      id: 'alasanMemilihKampus',
      question: 'Menurut Anda, kampus yang baik adalah?',
      type: 'radio',
      options: [
        'Adanya jaminan penempatan kerja',
        'Tempat strategis',
        'Telah terakreditasi',
        'Semuanya benar'
      ]
    },
    {
      id: 'sosialMediaFavorit',
      question: 'Sosial media apa yang paling sering Anda gunakan?',
      type: 'radio',
      options: [
        'Instagram',
        'TikTok',
        'YouTube',
        'Facebook',
        'Twitter/X',
        'LinkedIn',
        'Tidak menggunakan sosial media'
      ]
    },
    {
      id: 'mediaBerita',
      question: 'Jika Anda sering membaca koran, koran apa yang Anda sering baca?',
      type: 'radio',
      options: [
        'Kompas',
        'Waspada',
        'Analisa',
        'Tribun',
        'Lainnya',
        'Tidak membaca koran'
      ],
      hasOther: true
    }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateStep = () => {
    const newErrors = {}
    
    if (currentStep < questions.length) {
      const currentQuestion = questions[currentStep]
      if (!formData[currentQuestion.id]) {
        newErrors[currentQuestion.id] = 'Pertanyaan ini wajib diisi'
      }
      // If question has "Lainnya", ensure the additional text is provided
      if (currentQuestion.hasOther && formData[currentQuestion.id] === 'Lainnya') {
        const otherKey = `${currentQuestion.id}Lainnya`
        if (!formData[otherKey] || !formData[otherKey].trim()) {
          newErrors[otherKey] = 'Mohon isi pilihan lainnya'
        }
      }
    } else {
      // Validate contact information
      if (!formData.nama.trim()) newErrors.nama = 'Nama wajib diisi'
      if (!formData.noWA.trim()) newErrors.noWA = 'Nomor WhatsApp wajib diisi'
      if (!formData.alamat.trim()) newErrors.alamat = 'Alamat wajib diisi'
      if (!formData.asalSekolah.trim()) newErrors.asalSekolah = 'Asal sekolah wajib diisi'
      if (!formData.kelasJurusan.trim()) newErrors.kelasJurusan = 'Kelas/Jurusan wajib diisi'
      if (!formData.email.trim()) newErrors.email = 'Email wajib diisi'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Format email tidak valid'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep()) return
    
    setIsSubmitting(true)
    
    try {
      await submitSurvey(formData)
      navigate('/thank-you')
    } catch (error) {
      console.error('Error submitting survey:', error)
      alert('Terjadi kesalahan saat mengirim data. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderQuestion = (question) => {
    return (
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {question.question}
          </h3>
          <p className="text-gray-600">Pilih salah satu jawaban yang paling sesuai</p>
        </div>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:bg-gray-50 ${
                formData[question.id] === option
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={formData[question.id] === option}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${
                formData[question.id] === option
                  ? 'border-primary-600 bg-primary-600'
                  : 'border-gray-300'
              }`}>
                {formData[question.id] === option && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-gray-900 font-medium">{option}</span>
            </label>
          ))}

          {question.hasOther && formData[question.id] === 'Lainnya' && (
            <div className="mt-2">
              <input
                type="text"
                value={formData[`${question.id}Lainnya`]}
                onChange={(e) => handleInputChange(`${question.id}Lainnya`, e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors[`${question.id}Lainnya`] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tulis jawaban lainnya"
              />
              {errors[`${question.id}Lainnya`] && (
                <p className="text-red-600 text-sm mt-1">{errors[`${question.id}Lainnya`]}</p>
              )}
            </div>
          )}
        </div>
        
        {errors[question.id] && (
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{errors[question.id]}</span>
          </div>
        )}
      </motion.div>
    )
  }

  const renderContactForm = () => {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Data Kontak Anda
          </h3>
          <p className="text-gray-600">
            Mohon lengkapi data kontak Anda untuk keperluan follow-up beasiswa
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap *
            </label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => handleInputChange('nama', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.nama ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Masukkan nama lengkap"
            />
            {errors.nama && (
              <p className="text-red-600 text-sm mt-1">{errors.nama}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nomor WhatsApp *
            </label>
            <input
              type="tel"
              value={formData.noWA}
              onChange={(e) => handleInputChange('noWA', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.noWA ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Contoh: 081234567890"
            />
            {errors.noWA && (
              <p className="text-red-600 text-sm mt-1">{errors.noWA}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="contoh: nama@domain.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat Lengkap *
            </label>
            <textarea
              value={formData.alamat}
              onChange={(e) => handleInputChange('alamat', e.target.value)}
              rows={3}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.alamat ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Masukkan alamat lengkap"
            />
            {errors.alamat && (
              <p className="text-red-600 text-sm mt-1">{errors.alamat}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asal Sekolah *
            </label>
            <input
              type="text"
              value={formData.asalSekolah}
              onChange={(e) => handleInputChange('asalSekolah', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.asalSekolah ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nama sekolah Anda"
            />
            {errors.asalSekolah && (
              <p className="text-red-600 text-sm mt-1">{errors.asalSekolah}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kelas/Jurusan *
            </label>
            <input
              type="text"
              value={formData.kelasJurusan}
              onChange={(e) => handleInputChange('kelasJurusan', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.kelasJurusan ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Contoh: XII IPA 1 atau XII TKJ"
            />
            {errors.kelasJurusan && (
              <p className="text-red-600 text-sm mt-1">{errors.kelasJurusan}</p>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  const progress = ((currentStep + 1) / (questions.length + 1)) * 100
  const timeElapsed = Math.floor((new Date() - startTime) / 1000)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container-custom py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Langkah {currentStep + 1} dari {questions.length + 1}
            </span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</span>
              </div>
              <span className="text-sm font-medium text-primary-600">
                {Math.round(progress)}% Selesai
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-600 to-primary-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Survey Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {currentStep < questions.length ? (
              renderQuestion(questions[currentStep])
            ) : (
              renderContactForm()
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Sebelumnya</span>
              </button>
              
              {currentStep < questions.length ? (
                <button
                  onClick={nextStep}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Selanjutnya</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-primary flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Kirim Survey</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default SurveyPage 