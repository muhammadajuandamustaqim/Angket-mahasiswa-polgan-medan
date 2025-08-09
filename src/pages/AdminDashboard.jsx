import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Download, 
  Filter,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  TrendingUp,
  Users,
  FileText,
  LogOut,
  Eye
} from 'lucide-react'
import { collection, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { adminLogout, checkAuthState, getCurrentUser } from '../services/authService'
import AdminHeader from '../components/AdminHeader'
import Footer from '../components/Footer'
import AdminLogin from '../components/AdminLogin'
import SurveyDetailModal from '../components/SurveyDetailModal'

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [surveys, setSurveys] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [statsData, setStatsData] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  })
  const [selectedSurvey, setSelectedSurvey] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = (authenticated) => {
    setIsAuthenticated(authenticated)
    setCurrentUser(getCurrentUser())
  }

  useEffect(() => {
    // Check Firebase authentication state
    const unsubscribe = checkAuthState((user) => {
      if (user) {
        setIsAuthenticated(true)
        setCurrentUser(user)
      } else {
        setIsAuthenticated(false)
        setCurrentUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchSurveys()
    }
  }, [isAuthenticated])

  const fetchSurveys = async () => {
    setLoading(true)
    setError(null)
    try {
      const q = query(collection(db, 'surveys'), orderBy('submittedAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const surveysData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        submittedAt: doc.data().submittedAt?.toDate() || new Date()
      }))
      setSurveys(surveysData)
      setStatsData(calculateStats(surveysData))
    } catch (error) {
      console.error('Error fetching surveys:', error)
      setError('Gagal mengambil data survey. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getFullYear(), now.getMonth() - 1, now.getDate())

    return {
      total: data.length,
      today: data.filter(s => s.submittedAt >= today).length,
      thisWeek: data.filter(s => s.submittedAt >= weekAgo).length,
      thisMonth: data.filter(s => s.submittedAt >= monthAgo).length
    }
  }

  const filteredSurveys = useMemo(() => {
    return surveys.filter(survey => {
      const matchesSearch = 
        survey.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.noWA?.includes(searchTerm) ||
        survey.asalSekolah?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFilter = filterStatus === 'all' || survey.status === filterStatus
      
      return matchesSearch && matchesFilter
    })
  }, [surveys, searchTerm, filterStatus])



  const exportToCSV = () => {
    const headers = [
      'Nama',
      'WhatsApp',
      'Alamat',
      'Asal Sekolah',
      'Kelas/Jurusan',
      'Rencana Setelah Lulus',
      'Jurusan Diminati',
      'Jenjang Studi',
      'Lokasi Kuliah',
      'Pembiaya Kuliah',
      'Perkiraan Biaya',
      'Alasan Memilih Kampus',
      'Sosial Media Favorit',
      'Media Berita',
      'Tanggal Submit'
    ]

    const csvContent = [
      headers.join(','),
      ...filteredSurveys.map(survey => [
        `"${survey.nama || ''}"`,
        `"${survey.noWA || ''}"`,
        `"${survey.alamat || ''}"`,
        `"${survey.asalSekolah || ''}"`,
        `"${survey.kelasJurusan || ''}"`,
        `"${survey.rencanaSetelahLulus || ''}"`,
        `"${survey.jurusanDiminati || ''}"`,
        `"${survey.jenjangStudi || ''}"`,
        `"${survey.lokasiKuliah || ''}"`,
        `"${survey.pembiayaKuliah || ''}"`,
        `"${survey.perkiraanBiaya || ''}"`,
        `"${survey.alasanMemilihKampus || ''}"`,
        `"${survey.sosialMediaFavorit || ''}"`,
        `"${survey.mediaBerita || ''}"`,
        `"${survey.submittedAt ? survey.submittedAt.toLocaleString('id-ID') : ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `survey_data_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const logout = async () => {
    try {
      await adminLogout()
      setIsAuthenticated(false)
      setCurrentUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      // Force logout even if Firebase logout fails
      setIsAuthenticated(false)
      setCurrentUser(null)
    }
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader currentUser={currentUser} onLogout={() => setIsAuthenticated(false)} />
      
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Kelola dan lihat data survey calon mahasiswa</p>
            {currentUser && (
              <p className="text-sm text-gray-500 mt-1">
                Login sebagai: <span className="font-medium text-primary-600">{currentUser.email}</span>
              </p>
            )}
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              onClick={exportToCSV}
              className="btn-secondary flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Survey</p>
                <p className="text-3xl font-bold text-gray-900">{statsData.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hari Ini</p>
                <p className="text-3xl font-bold text-gray-900">{statsData.today}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Minggu Ini</p>
                <p className="text-3xl font-bold text-gray-900">{statsData.thisWeek}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bulan Ini</p>
                <p className="text-3xl font-bold text-gray-900">{statsData.thisMonth}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama, WhatsApp, atau sekolah..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Survey List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data survey...</p>
            </div>
          ) : filteredSurveys.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Tidak ada data survey yang ditemukan</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Nama</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Kontak</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Asal Sekolah</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Jurusan Diminati</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Tanggal</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSurveys.map((survey, index) => (
                    <motion.tr
                      key={survey.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{survey.nama}</p>
                          <p className="text-sm text-gray-500">{survey.kelasJurusan}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-900">{survey.noWA}</p>
                          <p className="text-sm text-gray-500">{survey.alamat}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{survey.asalSekolah}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{survey.jurusanDiminati}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">
                          {survey.submittedAt?.toLocaleDateString('id-ID')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {survey.submittedAt?.toLocaleTimeString('id-ID')}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          survey.status === 'approved' ? 'bg-green-100 text-green-800' :
                          survey.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          survey.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {survey.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedSurvey({
                              ...survey,
                              onStatusChange: async (newStatus) => {
                                try {
                                  // Optimistic UI update
                                  setSurveys(prev => prev.map(s => s.id === survey.id ? { ...s, status: newStatus } : s))
                                  // Persist to Firestore
                                  const ref = doc(db, 'surveys', survey.id)
                                  await updateDoc(ref, { status: newStatus })
                                } catch (e) {
                                  console.error('Gagal update status:', e)
                                  // Revert if failed
                                  setSurveys(prev => prev.map(s => s.id === survey.id ? { ...s, status: survey.status } : s))
                                  alert('Gagal mengubah status. Coba lagi.')
                                }
                              }
                            })
                            setShowDetailModal(true)
                          }}
                          className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Lihat Detail</span>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
          >
            <p className="text-red-800">{error}</p>
            <button 
              onClick={fetchSurveys}
              className="mt-2 text-red-600 hover:text-red-800 underline"
            >
              Coba Lagi
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Survey Detail Modal */}
      <SurveyDetailModal
        survey={selectedSurvey}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false)
          setSelectedSurvey(null)
        }}
      />
      
      <Footer />
    </div>
  )
}

export default AdminDashboard 