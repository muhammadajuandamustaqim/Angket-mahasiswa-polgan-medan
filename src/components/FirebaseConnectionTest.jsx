import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, XCircle, Users, Database, Wifi } from 'lucide-react'
import { auth, db } from '../firebase/config'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { createAdminAccount } from '../services/authService'

const FirebaseConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState({
    auth: { status: 'testing', message: 'Testing...' },
    firestore: { status: 'testing', message: 'Testing...' },
    users: { status: 'testing', message: 'Testing...', count: 0 }
  })
  const [showCreateAdmin, setShowCreateAdmin] = useState(false)
  const [adminForm, setAdminForm] = useState({ email: '', password: '' })
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    testFirebaseConnection()
  }, [])

  const testFirebaseConnection = async () => {
    // Test Firebase Auth
    try {
      if (auth && auth.app) {
        setConnectionStatus(prev => ({
          ...prev,
          auth: { status: 'success', message: '✅ Firebase Auth connected' }
        }))
      } else {
        throw new Error('Auth not initialized')
      }
    } catch (error) {
      setConnectionStatus(prev => ({
        ...prev,
        auth: { status: 'error', message: `❌ Auth error: ${error.message}` }
      }))
    }

    // Test Firestore
    try {
      if (db) {
        // Try to read from a collection (even if empty)
        const testQuery = query(collection(db, 'surveys'), limit(1))
        await getDocs(testQuery)
        setConnectionStatus(prev => ({
          ...prev,
          firestore: { status: 'success', message: '✅ Firestore connected' }
        }))
      } else {
        throw new Error('Firestore not initialized')
      }
    } catch (error) {
      setConnectionStatus(prev => ({
        ...prev,
        firestore: { status: 'error', message: `❌ Firestore error: ${error.message}` }
      }))
    }

    // Check existing users (this will help us know if admin exists)
    try {
      // We can't directly query Firebase Auth users from client
      // But we can check if current user exists or try a test login
      setConnectionStatus(prev => ({
        ...prev,
        users: { 
          status: 'warning', 
          message: '⚠️ Cannot check users from client. Create admin if login fails.',
          count: 0 
        }
      }))
    } catch (error) {
      setConnectionStatus(prev => ({
        ...prev,
        users: { status: 'error', message: `❌ Users check error: ${error.message}`, count: 0 }
      }))
    }
  }

  const handleCreateAdmin = async (e) => {
    e.preventDefault()
    setIsCreating(true)
    
    try {
      await createAdminAccount(adminForm.email, adminForm.password)
      alert(`✅ Admin berhasil dibuat!\nEmail: ${adminForm.email}\nSekarang Anda bisa login dengan kredensial ini.`)
      setShowCreateAdmin(false)
      setAdminForm({ email: '', password: '' })
    } catch (error) {
      alert(`❌ Gagal membuat admin: ${error.message}`)
    } finally {
      setIsCreating(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />
      default: return <Wifi className="w-5 h-5 text-blue-600 animate-pulse" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'border-green-200 bg-green-50'
      case 'error': return 'border-red-200 bg-red-50'
      case 'warning': return 'border-yellow-200 bg-yellow-50'
      default: return 'border-blue-200 bg-blue-50'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/images/362-3622539_logo-polgan-hi-res-politeknik-ganesha-medan.png" 
                alt="Logo Politeknik Ganesha Medan" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Firebase Connection Test</h1>
            <p className="text-gray-600">Diagnosis koneksi Firebase dan status admin</p>
          </div>

          {/* Connection Status */}
          <div className="space-y-4 mb-8">
            {/* Firebase Auth Status */}
            <div className={`border-2 rounded-lg p-4 ${getStatusColor(connectionStatus.auth.status)}`}>
              <div className="flex items-center space-x-3">
                {getStatusIcon(connectionStatus.auth.status)}
                <div>
                  <h3 className="font-semibold text-gray-900">Firebase Authentication</h3>
                  <p className="text-sm text-gray-600">{connectionStatus.auth.message}</p>
                </div>
              </div>
            </div>

            {/* Firestore Status */}
            <div className={`border-2 rounded-lg p-4 ${getStatusColor(connectionStatus.firestore.status)}`}>
              <div className="flex items-center space-x-3">
                {getStatusIcon(connectionStatus.firestore.status)}
                <div>
                  <h3 className="font-semibold text-gray-900">Firestore Database</h3>
                  <p className="text-sm text-gray-600">{connectionStatus.firestore.message}</p>
                </div>
              </div>
            </div>

            {/* Users Status */}
            <div className={`border-2 rounded-lg p-4 ${getStatusColor(connectionStatus.users.status)}`}>
              <div className="flex items-center space-x-3">
                {getStatusIcon(connectionStatus.users.status)}
                <div>
                  <h3 className="font-semibold text-gray-900">Admin Users</h3>
                  <p className="text-sm text-gray-600">{connectionStatus.users.message}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Create Admin Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Admin Management</h3>
              <button
                onClick={() => setShowCreateAdmin(!showCreateAdmin)}
                className="btn-primary text-sm"
              >
                {showCreateAdmin ? 'Cancel' : 'Create Admin'}
              </button>
            </div>

            {showCreateAdmin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-50 rounded-lg p-4"
              >
                <form onSubmit={handleCreateAdmin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      value={adminForm.email}
                      onChange={(e) => setAdminForm({...adminForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="admin@polganesha.ac.id"
                      required
                      disabled={isCreating}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={adminForm.password}
                      onChange={(e) => setAdminForm({...adminForm, password: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Minimal 6 karakter"
                      required
                      disabled={isCreating}
                      minLength={6}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isCreating || !adminForm.email || !adminForm.password}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreating ? 'Creating...' : 'Create Admin Account'}
                  </button>
                </form>
              </motion.div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Troubleshooting:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Jika ada error "invalid-credential", buat admin terlebih dahulu</li>
              <li>• Pastikan email dan password sesuai dengan yang didaftarkan</li>
              <li>• Cek Firebase Console → Authentication untuk melihat users</li>
              <li>• Environment variables harus sudah terkonfigurasi dengan benar</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={testFirebaseConnection}
              className="flex-1 btn-secondary"
            >
              🔄 Test Again
            </button>
            <button
              onClick={() => window.location.href = '/admin'}
              className="flex-1 btn-primary"
            >
              🚀 Go to Admin Login
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default FirebaseConnectionTest
