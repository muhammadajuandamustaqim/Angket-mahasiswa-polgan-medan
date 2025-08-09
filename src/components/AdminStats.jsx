import { motion } from 'framer-motion'
import { Users, TrendingUp, Calendar, Award, Eye, Download, Filter } from 'lucide-react'

const AdminStats = ({ stats, onViewDetails, onExportData }) => {
  const statItems = [
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Total Survey',
      value: stats.total,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Jumlah survey yang telah dikirim'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: 'Hari Ini',
      value: stats.today,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Survey yang dikirim hari ini'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Minggu Ini',
      value: stats.thisWeek,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Survey dalam 7 hari terakhir'
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: 'Bulan Ini',
      value: stats.thisMonth,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Survey dalam 30 hari terakhir'
    }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            📊 Statistik Survey
          </h3>
          <p className="text-sm text-gray-600">
            Data real-time dari calon mahasiswa
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onViewDetails}
            className="flex items-center space-x-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm">Lihat Detail</span>
          </button>
          <button
            onClick={onExportData}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center group cursor-pointer"
            onClick={onViewDetails}
          >
            <div className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
              <div className={item.color}>
                {item.icon}
              </div>
            </div>
            <div className={item.color}>
              <div className="text-2xl font-bold">{item.value}</div>
            </div>
            <div className="text-sm text-gray-600 font-medium">{item.label}</div>
            <div className="text-xs text-gray-500 mt-1">{item.description}</div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live Update</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
            <span>Auto-refresh setiap 30 detik</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStats



