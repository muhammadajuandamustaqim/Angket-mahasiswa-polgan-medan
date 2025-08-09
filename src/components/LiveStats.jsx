import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Clock, Award } from 'lucide-react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

const LiveStats = () => {
  const [stats, setStats] = useState({
    totalSurveys: 0,
    todaySurveys: 0,
    topJurusan: 'Teknik Informatika',
    avgTime: '5 menit'
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'surveys'))
        const surveys = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          submittedAt: doc.data().submittedAt?.toDate() || new Date()
        }))

        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        
        // Count jurusan
        const jurusanCount = {}
        surveys.forEach(survey => {
          const jurusan = survey.jurusanDiminati || 'Lainnya'
          jurusanCount[jurusan] = (jurusanCount[jurusan] || 0) + 1
        })

        const topJurusan = Object.keys(jurusanCount).reduce((a, b) => 
          jurusanCount[a] > jurusanCount[b] ? a : b, 'Teknik Informatika'
        )

        setStats({
          totalSurveys: surveys.length,
          todaySurveys: surveys.filter(s => s.submittedAt >= today).length,
          topJurusan,
          avgTime: '5 menit'
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const statItems = [
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Total Survey',
      value: stats.totalSurveys,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Hari Ini',
      value: stats.todaySurveys,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: 'Jurusan Favorit',
      value: stats.topJurusan,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: 'Rata-rata Waktu',
      value: stats.avgTime,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        📊 Statistik Live Survey
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center mx-auto mb-3`}>
              <div className={item.color}>
                {item.icon}
              </div>
            </div>
            <div className={item.color}>
              <div className="text-2xl font-bold">{item.value}</div>
            </div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Update</span>
        </div>
      </div>
    </div>
  )
}

export default LiveStats 