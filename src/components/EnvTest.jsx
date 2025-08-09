import { useState, useEffect } from 'react'

const EnvTest = () => {
  const [envVars, setEnvVars] = useState({})

  useEffect(() => {
    // Test all possible ways to access environment variables
    setEnvVars({
      // Direct access
      direct: {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      },
      // Check if they exist
      exists: {
        apiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
      },
      // Check length
      length: {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.length || 0,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.length || 0,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.length || 0,
      },
      // Check if undefined
      undefined: {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY === undefined,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN === undefined,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID === undefined,
      }
    })
  }, [])

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Environment Variables Test</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Direct Values:</h3>
          <div className="space-y-1 text-sm">
            <div>API Key: <span className="font-mono">{envVars.direct?.apiKey || 'undefined'}</span></div>
            <div>Auth Domain: <span className="font-mono">{envVars.direct?.authDomain || 'undefined'}</span></div>
            <div>Project ID: <span className="font-mono">{envVars.direct?.projectId || 'undefined'}</span></div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Exists Check:</h3>
          <div className="space-y-1 text-sm">
            <div>API Key: <span className={envVars.exists?.apiKey ? 'text-green-600' : 'text-red-600'}>{envVars.exists?.apiKey ? 'true' : 'false'}</span></div>
            <div>Auth Domain: <span className={envVars.exists?.authDomain ? 'text-green-600' : 'text-red-600'}>{envVars.exists?.authDomain ? 'true' : 'false'}</span></div>
            <div>Project ID: <span className={envVars.exists?.projectId ? 'text-green-600' : 'text-red-600'}>{envVars.exists?.projectId ? 'true' : 'false'}</span></div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Length Check:</h3>
          <div className="space-y-1 text-sm">
            <div>API Key: <span className="font-mono">{envVars.length?.apiKey}</span></div>
            <div>Auth Domain: <span className="font-mono">{envVars.length?.authDomain}</span></div>
            <div>Project ID: <span className="font-mono">{envVars.length?.projectId}</span></div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Undefined Check:</h3>
          <div className="space-y-1 text-sm">
            <div>API Key: <span className={envVars.undefined?.apiKey ? 'text-red-600' : 'text-green-600'}>{envVars.undefined?.apiKey ? 'true' : 'false'}</span></div>
            <div>Auth Domain: <span className={envVars.undefined?.authDomain ? 'text-red-600' : 'text-green-600'}>{envVars.undefined?.authDomain ? 'true' : 'false'}</span></div>
            <div>Project ID: <span className={envVars.undefined?.projectId ? 'text-red-600' : 'text-green-600'}>{envVars.undefined?.projectId ? 'true' : 'false'}</span></div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <div className="text-xs">
          <div>import.meta.env keys: {Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')).join(', ')}</div>
          <div>All env keys: {Object.keys(import.meta.env).join(', ')}</div>
        </div>
      </div>
    </div>
  )
}

export default EnvTest
