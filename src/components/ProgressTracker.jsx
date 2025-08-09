import { motion } from 'framer-motion'
import { CheckCircle, Circle, Clock, Award } from 'lucide-react'

const ProgressTracker = ({ currentStep, totalSteps, timeElapsed }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100

  const steps = [
    { name: 'Pertanyaan Survey', icon: <Circle className="w-5 h-5" /> },
    { name: 'Data Kontak', icon: <CheckCircle className="w-5 h-5" /> }
  ]

  const getStepStatus = (index) => {
    if (index === 0) {
      return currentStep < totalSteps - 1 ? 'active' : 'completed'
    } else {
      return currentStep === totalSteps - 1 ? 'active' : currentStep > totalSteps - 1 ? 'completed' : 'pending'
    }
  }

  const getStepIcon = (index) => {
    const status = getStepStatus(index)
    if (status === 'completed') {
      return <CheckCircle className="w-5 h-5 text-green-600" />
    } else if (status === 'active') {
      return <Clock className="w-5 h-5 text-primary-600 animate-pulse" />
    } else {
      return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStepClass = (index) => {
    const status = getStepStatus(index)
    if (status === 'completed') {
      return 'text-green-600 bg-green-50 border-green-200'
    } else if (status === 'active') {
      return 'text-primary-600 bg-primary-50 border-primary-200'
    } else {
      return 'text-gray-500 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Progress Survey</h3>
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-primary-600" />
          <span className="text-sm font-medium text-primary-600">
            {Math.round(progress)}% Selesai
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-primary-600 to-primary-700 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-300 ${getStepClass(index)}`}
          >
            {getStepIcon(index)}
            <div className="flex-1">
              <p className="font-medium">{step.name}</p>
              <p className="text-sm opacity-75">
                {getStepStatus(index) === 'completed' && 'Selesai'}
                {getStepStatus(index) === 'active' && 'Sedang berlangsung...'}
                {getStepStatus(index) === 'pending' && 'Menunggu'}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Time Tracker */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Waktu yang telah berlalu:</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Encouragement */}
      <div className="mt-4 p-3 bg-primary-50 rounded-lg">
        <p className="text-sm text-primary-800 text-center">
          {progress < 50 && '💪 Anda sudah setengah jalan!'}
          {progress >= 50 && progress < 100 && '🎯 Hampir selesai, tetap semangat!'}
          {progress === 100 && '🎉 Survey selesai! Terima kasih atas partisipasi Anda!'}
        </p>
      </div>
    </div>
  )
}

export default ProgressTracker 