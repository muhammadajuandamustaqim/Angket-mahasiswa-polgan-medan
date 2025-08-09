import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Phone, Mail, MapPin, GraduationCap, Calendar, School, BookOpen, Globe, Heart, TrendingUp } from 'lucide-react'

const SurveyDetailModal = ({ survey, isOpen, onClose }) => {
  if (!survey) return null

  // Do not lock background scroll to avoid stuck scroll issues across devices
  useEffect(() => {
    return () => {
      // ensure any previous styles are cleared
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [])

  const surveyDetails = [
    {
      icon: <User className="w-5 h-5" />,
      label: 'Nama Lengkap',
      value: survey.nama || '-'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Nomor WhatsApp',
      value: survey.noWA || '-'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: survey.email || '-'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Alamat',
      value: survey.alamat || '-'
    },
    {
      icon: <School className="w-5 h-5" />,
      label: 'Asal Sekolah',
      value: survey.asalSekolah || '-'
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      label: 'Kelas/Jurusan',
      value: survey.kelasJurusan || '-'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Rencana Setelah Lulus',
      value: survey.rencanaSetelahLulus || '-'
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: 'Jurusan Diminati',
      value: survey.jurusanDiminati || '-'
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      label: 'Jenjang Studi',
      value: survey.jenjangStudi || '-'
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: 'Lokasi Kuliah',
      value: survey.lokasiKuliah || '-'
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: 'Pembiaya Kuliah',
      value: survey.pembiayaKuliah || '-'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Perkiraan Biaya',
      value: survey.perkiraanBiaya || '-'
    },
    {
      icon: <Heart className="w-5 h-5" />,
      label: 'Alasan Memilih Kampus',
      value: survey.alasanMemilihKampus || '-'
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: 'Sosial Media Favorit',
      value: survey.sosialMediaFavorit || '-'
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: 'Media Berita',
      value: survey.mediaBerita || '-'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Tanggal Submit',
      value: survey.submittedAt ? survey.submittedAt.toLocaleString('id-ID') : '-'
    }
  ]

  const content = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] overflow-y-auto" aria-modal="true" role="dialog">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay (non-clickable) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-transparent transition-opacity z-[900] pointer-events-none"
              aria-hidden="true"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full z-[1001] pointer-events-auto"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="/images/362-3622539_logo-polgan-hi-res-politeknik-ganesha-medan.png" 
                      alt="Logo Politeknik Ganesha Medan" 
                      className="w-8 h-8 object-contain"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Detail Survey Calon Mahasiswa
                      </h3>
                      <p className="text-primary-100 text-sm">
                        ID: {survey.id}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white hover:text-primary-100 transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {surveyDetails.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-primary-600 mt-0.5">
                          {detail.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            {detail.label}
                          </p>
                          <p className="text-sm text-gray-900 break-words">
                            {detail.value}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                {/* Status editor */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">Status:</span>
                  <select
                    defaultValue={survey.status || 'pending'}
                    onChange={(e) => survey.onStatusChange && survey.onStatusChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    // Copy survey data to clipboard
                    const surveyText = surveyDetails
                      .map(detail => `${detail.label}: ${detail.value}`)
                      .join('\n')
                    navigator.clipboard.writeText(surveyText)
                    alert('Data survey telah disalin ke clipboard!')
                  }}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Salin Data
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )

  return createPortal(content, document.body)
}

export default SurveyDetailModal



