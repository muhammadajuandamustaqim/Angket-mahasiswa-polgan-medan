import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowLeft,
  GraduationCap,
  Instagram,
  Youtube,
  Facebook
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
      <Header />
      
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Terima Kasih!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Data survey Anda telah berhasil dikirim. Tim kami akan segera menghubungi 
              Anda untuk informasi lebih lanjut mengenai program beasiswa.
            </p>
            
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-4">Apa Selanjutnya?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Review Data</h3>
                  <p className="text-white/80 text-sm">Tim kami akan mengevaluasi data Anda</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Wawancara</h3>
                  <p className="text-white/80 text-sm">Kami akan menghubungi untuk wawancara</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Pengumuman</h3>
                  <p className="text-white/80 text-sm">Hasil seleksi akan diumumkan via WhatsApp</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Butuh Bantuan?
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan 
              atau membutuhkan informasi lebih lanjut.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Telepon</h3>
                <p className="text-gray-600">+62 89614035812</p>
                <p className="text-sm text-gray-500">Senin - Jumat, 08:00 - 17:00</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-gray-600">+62 89614035812</p>
                <p className="text-sm text-gray-500">24/7 Customer Service</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">polganmedan@gmail.com</p>
                <p className="text-sm text-gray-500">Respon dalam 24 jam</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Alamat</h3>
                <p className="text-gray-600">BC Medan, Jl. Arief Rahman Hakim No.193, Tegal Sari II, Kec. Medan Area, Kota Medan, Sumatera Utara 20216</p>
                <p className="text-sm text-gray-500">Medan, Sumatera Utara</p>
              </div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Ikuti Kami di Sosial Media
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Dapatkan informasi terbaru tentang program beasiswa, kegiatan kampus, 
              dan tips seputar pendidikan.
            </p>
            
            <div className="flex justify-center space-x-6">
              <a 
                href="https://www.instagram.com/polgan_ar_hakim?igsh=MTJrcjBhYmFsMW9lNA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full hover:scale-110 transition-transform duration-300"
              >
                <Instagram className="w-6 h-6 text-white" />
              </a>
              <a 
                href="https://www.youtube.com/@POLGANMEDAN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-full hover:scale-110 transition-transform duration-300"
              >
                <Youtube className="w-6 h-6 text-white" />
              </a>
              <a 
                href="https://www.facebook.com/share/19jdCmLvTk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full hover:scale-110 transition-transform duration-300"
              >
                <Facebook className="w-6 h-6 text-white" />
              </a>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-secondary flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali ke Beranda
              </Link>
              <Link to="/survey" className="btn-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Isi Survey Lagi
              </Link>
            </div>
            
            <div className="mt-8 p-4 bg-primary-50 rounded-lg">
              <p className="text-primary-800 flex items-center justify-center">
                <Heart className="w-5 h-5 mr-2 fill-current" />
                Terima kasih telah mempercayai Politeknik Ganesha Medan!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default ThankYouPage 