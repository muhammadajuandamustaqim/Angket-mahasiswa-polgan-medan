import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, GraduationCap, User } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/images/362-3622539_logo-polgan-hi-res-politeknik-ganesha-medan.png" 
              alt="Logo Politeknik Ganesha Medan" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Politeknik Ganesha</h1>
              <p className="text-sm text-gray-600">Medan</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#tentang" className="text-gray-700 hover:text-primary-600 transition-colors duration-300">
              Tentang Kami
            </a>
            <a href="#keunggulan" className="text-gray-700 hover:text-primary-600 transition-colors duration-300">
              Keunggulan
            </a>
            <a href="#beasiswa" className="text-gray-700 hover:text-primary-600 transition-colors duration-300">
              Beasiswa
            </a>
            <a href="#kontak" className="text-gray-700 hover:text-primary-600 transition-colors duration-300">
              Kontak
            </a>
            <Link to="/survey" className="btn-primary">
              Isi Angket
            </Link>
            <Link to="/admin" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-300">
              <User className="w-5 h-5" />
              <span>Admin</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#tentang" className="text-gray-700 hover:text-primary-600 transition-colors duration-300">
                Tentang Kami
              </a>
              <a href="#keunggulan" className="text-gray-700 hover:text-primary-600 transition-colors duration-300">
                Keunggulan
              </a>
              <a href="#beasiswa" className="text-gray-700 hover:text-primary-600 transition-colors duration-300">
                Beasiswa
              </a>
              <a href="#kontak" className="text-gray-700 hover:text-primary-600 transition-colors duration-300">
                Kontak
              </a>
              <Link to="/survey" className="btn-primary text-center">
                Isi Angket
              </Link>
              <Link to="/admin" className="flex items-center justify-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-300">
                <User className="w-5 h-5" />
                <span>Admin</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 