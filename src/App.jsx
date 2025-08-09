import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SurveyPage from './pages/SurveyPage'
import ThankYouPage from './pages/ThankYouPage'
import AdminDashboard from './pages/AdminDashboard'
import FirebaseDebug from './components/FirebaseDebug'
import FirebaseTest from './components/FirebaseTest'
import EnvTest from './components/EnvTest'
import FirebaseConnectionTest from './components/FirebaseConnectionTest'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/debug" element={<FirebaseDebug />} />
        <Route path="/test" element={<FirebaseTest />} />
        <Route path="/env-test" element={<EnvTest />} />
        <Route path="/firebase-connection" element={<FirebaseConnectionTest />} />
      </Routes>
    </div>
  )
}

export default App 