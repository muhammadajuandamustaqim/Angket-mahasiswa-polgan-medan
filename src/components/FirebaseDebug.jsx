import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react'
import { testFirebaseConnection } from '../services/authService'

const FirebaseDebug = () => {
  const [debugInfo, setDebugInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const runDebugTest = async () => {
    setIsLoading(true)
    setDebugInfo(null)

    try {
      // Check environment variables
      const envCheck = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Set' : '❌ Not set',
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Not set',
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Not set',
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Not set',
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Not set',
        appId: import.meta.env.VITE_FIREBASE_APP_ID ? '✅ Set' : '❌ Not set',
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ? '✅ Set' : '❌ Not set'
      }

      // Test Firebase connection
      const connectionTest = await testFirebaseConnection()

      setDebugInfo({
        timestamp: new Date().toISOString(),
        environment: envCheck,
        connection: connectionTest,
        userAgent: navigator.userAgent,
        localStorage: {
          adminAuthenticated: localStorage.getItem('adminAuthenticated'),
          adminEmail: localStorage.getItem('adminEmail'),
          adminLoginTime: localStorage.getItem('adminLoginTime')
        }
      })
    } catch (error) {
      setDebugInfo({
        timestamp: new Date().toISOString(),
        error: error.message,
        stack: error.stack
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyDebugInfo = () => {
    if (debugInfo) {
      const debugText = JSON.stringify(debugInfo, null, 2)
      navigator.clipboard.writeText(debugText)
      alert('Debug info copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Firebase Debug</h1>
            <p className="text-gray-600">Diagnosis masalah konfigurasi Firebase</p>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-blue-600" />
                <p className="text-sm text-blue-800">
                  Klik tombol di bawah untuk menjalankan diagnosis Firebase
                </p>
              </div>
            </div>
          </div>

          {/* Debug Button */}
          <div className="text-center mb-8">
            <button
              onClick={runDebugTest}
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Menjalankan Diagnosis...</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>Jalankan Diagnosis Firebase</span>
                </>
              )}
            </button>
          </div>

          {/* Debug Results */}
          {debugInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Environment Variables */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Environment Variables
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {Object.entries(debugInfo.environment || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{key}:</span>
                      <span className={value.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connection Test */}
              {debugInfo.connection && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    {debugInfo.connection.success ? (
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 mr-2 text-red-600" />
                    )}
                    Firebase Connection Test
                  </h3>
                  <div className="text-sm">
                    <p className={debugInfo.connection.success ? 'text-green-600' : 'text-red-600'}>
                      {debugInfo.connection.message || debugInfo.connection.error}
                    </p>
                  </div>
                </div>
              )}

              {/* Local Storage */}
              {debugInfo.localStorage && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-blue-600" />
                    Local Storage Status
                  </h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(debugInfo.localStorage).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className={value ? 'text-green-600' : 'text-gray-500'}>
                          {value || 'Not set'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error Information */}
              {debugInfo.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    Error Information
                  </h3>
                  <div className="text-sm text-red-700">
                    <p><strong>Error:</strong> {debugInfo.error}</p>
                    {debugInfo.stack && (
                      <details className="mt-2">
                        <summary className="cursor-pointer font-medium">Stack Trace</summary>
                        <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-x-auto">
                          {debugInfo.stack}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              )}

              {/* Copy Button */}
              <div className="text-center">
                <button
                  onClick={copyDebugInfo}
                  className="btn-secondary flex items-center justify-center mx-auto"
                >
                  <Info className="w-5 h-5 mr-2" />
                  <span>Copy Debug Info</span>
                </button>
              </div>

              {/* Timestamp */}
              <div className="text-center text-xs text-gray-500">
                Diagnosis run at: {debugInfo.timestamp}
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Politeknik Ganesha Medan
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Firebase Debug Tool v1.0
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default FirebaseDebug
