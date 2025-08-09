import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertTriangle } from 'lucide-react'

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Set deadline to 30 days from now
  const deadline = new Date()
  deadline.setDate(deadline.getDate() + 30)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = deadline.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [deadline])

  const timeUnits = [
    { label: 'Hari', value: timeLeft.days, color: 'bg-red-500' },
    { label: 'Jam', value: timeLeft.hours, color: 'bg-orange-500' },
    { label: 'Menit', value: timeLeft.minutes, color: 'bg-yellow-500' },
    { label: 'Detik', value: timeLeft.seconds, color: 'bg-green-500' }
  ]

  const isUrgent = timeLeft.days <= 7

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl p-6 ${isUrgent ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-primary-600 to-primary-700'} text-white`}
    >
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          {isUrgent ? (
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          ) : (
            <Clock className="w-6 h-6" />
          )}
          <h3 className="text-xl font-bold">
            {isUrgent ? '⏰ Deadline Mendekati!' : '⏰ Deadline Pendaftaran Beasiswa'}
          </h3>
        </div>
        <p className="text-white/90">
          {isUrgent 
            ? 'Hanya tersisa beberapa hari lagi untuk mendaftar beasiswa!'
            : 'Jangan lewatkan kesempatan emas ini!'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`w-16 h-16 ${unit.color} rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg`}>
              <span className="text-white font-bold text-lg">
                {unit.value.toString().padStart(2, '0')}
              </span>
            </div>
            <div className="text-sm font-medium text-white/90">{unit.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
          <span className="text-sm font-medium">
            {isUrgent ? '🚨 Segera Daftar Sekarang!' : '🎯 Jangan Sampai Terlewat'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default CountdownTimer 