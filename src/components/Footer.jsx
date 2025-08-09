import { Link } from 'react-router-dom'
import { GraduationCap, MapPin, Phone, Mail, Instagram, Youtube, Facebook } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 rounded-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Politeknik Ganesha</h3>
                <p className="text-sm text-gray-400">Medan</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Wujudkan masa depanmu bersama Politeknik Ganesha Medan. 
              Kualitas pendidikan terbaik dengan beasiswa 100% gratis.
            </p>
            <Link to="/survey" className="btn-primary">
              Isi Angket Sekarang
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu Utama</h4>
            <ul className="space-y-2">
              <li>
                <a href="#tentang" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#keunggulan" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Keunggulan
                </a>
              </li>
              <li>
                <a href="#beasiswa" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Program Beasiswa
                </a>
              </li>
              <li>
                <a href="#testimoni" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Testimoni
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">
                BC Medan, Jl. Arief Rahman Hakim No.193, Tegal Sari II, Kec. Medan Area, Kota Medan, Sumatera Utara 20216
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">
                  +62 89614035812
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">
                polganmedan@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/polgan_ar_hakim?igsh=MTJrcjBhYmFsMW9lNA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-lg hover:scale-110 transition-transform duration-300"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://www.youtube.com/@POLGANMEDAN"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-lg hover:scale-110 transition-transform duration-300"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://www.facebook.com/share/19jdCmLvTk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg hover:scale-110 transition-transform duration-300"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
            </div>
            
            {/* WhatsApp Contact */}
            <div className="mt-6">
              <a 
                href="https://wa.me/6289614035812" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>Chat WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Politeknik Ganesha Medan. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 