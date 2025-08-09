import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'

const FirebaseTest = () => {
  const [status, setStatus] = useState('Testing...')
  const [error, setError] = useState(null)
  const [config, setConfig] = useState({})

  useEffect(() => {
    const testFirebase = async () => {
      try {
        setConfig({
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Not set',
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Not set',
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Set' : 'Not set',
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? 'Set' : 'Not set',
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? 'Set' : 'Not set',
          appId: import.meta.env.VITE_FIREBASE_APP_ID ? 'Set' : 'Not set',
          measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ? 'Set' : 'Not set'
        })

        // Instead of anonymous sign-in, just verify the SDK initialized
        if (auth && auth.app && auth.app.options && auth.app.options.apiKey) {
          setStatus('✅ Firebase initialized successfully!')
        } else {
          throw new Error('Firebase app not initialized')
        }
      } catch (err) {
        setError(err.message)
        setStatus('❌ Firebase initialization check failed')
        console.error('Firebase test error:', err)
      }
    }

    testFirebase()
  }, [])

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Firebase Connection Test</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Environment Variables:</h3>
        <div className="space-y-1 text-sm">
          {Object.entries(config).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span>{key}:</span>
              <span className={value === 'Set' ? 'text-green-600' : 'text-red-600'}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Connection Status:</h3>
        <p className={status.includes('✅') ? 'text-green-600' : status.includes('❌') ? 'text-red-600' : 'text-blue-600'}>
          {status}
        </p>
      </div>

      {error && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-red-600">Error Details:</h3>
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </p>
        </div>
      )}

      <div className="text-xs text-gray-500 mt-4">
        <p>This test verifies SDK initialization without performing authentication.</p>
        <p>If this fails, check your Firebase configuration in src/firebase/config.js.</p>
      </div>
    </div>
  )
}

export default FirebaseTest
