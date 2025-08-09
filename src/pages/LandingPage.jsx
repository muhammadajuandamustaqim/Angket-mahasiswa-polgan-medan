import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Users, 
  Award, 
  Building, 
  CheckCircle, 
  Star,
  ArrowRight,
  BookOpen,
  Briefcase,
  User,
  Shield
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const LandingPage = () => {
  const advantages = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Pengajar Berkualitas",
      description: "Dosen berpengalaman dengan latar belakang industri dan akademisi terkemuka"
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Fasilitas Modern",
      description: "Laboratorium canggih, perpustakaan digital, dan infrastruktur terkini"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Akreditasi A",
      description: "Semua program studi terakreditasi A oleh BAN-PT"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Kerja Sama Industri",
      description: "Partnership dengan 100+ perusahaan untuk program magang dan kerja"
    }
  ]

  const testimonials = [
    {
      name: "Ahmad Rizki",
      role: "Alumni Teknik Informatika",
      company: "Software Engineer di Google",
      content: "Politeknik Ganesha memberikan saya fondasi yang kuat untuk karir di bidang teknologi. Program beasiswa sangat membantu saya fokus belajar.",
      rating: 5
    },
    {
      name: "Sarah Putri",
      role: "Alumni Manajemen Informatika",
      company: "Business Analyst di Tokopedia",
      content: "Kualitas pendidikan yang excellent dengan dosen yang sangat supportive. Saya berhasil mendapatkan pekerjaan impian berkat beasiswa ini.",
      rating: 5
    },
    {
      name: "Budi Santoso",
      role: "Alumni Akuntansi",
      company: "Project Manager di Pertamina",
      content: "Fasilitas laboratorium yang lengkap dan program magang yang terstruktur membuat saya siap menghadapi dunia kerja.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-transparent"></div>
        <div className="container-custom section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Ayo Wujudkan Masa Depanmu Bersama{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                  Politeknik Ganesha Medan!
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Isi angket untuk mendapatkan peluang beasiswa kuliah 100% gratis. 
                Raih pendidikan berkualitas dengan biaya terjangkau.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/survey" className="btn-primary text-lg px-8 py-4 flex items-center justify-center">
                  Isi Angket Sekarang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <a href="#tentang" className="btn-secondary text-lg px-8 py-4 flex items-center justify-center">
                  Pelajari Lebih Lanjut
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white text-center">
                <GraduationCap className="w-24 h-24 mx-auto mb-6 text-white/80" />
                <h3 className="text-2xl font-bold mb-4">Beasiswa 100% Gratis</h3>
                <p className="text-lg mb-6">Untuk 100 Mahasiswa Berprestasi</p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold">100%</div>
                    <div className="text-sm">Biaya Kuliah</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">100</div>
                    <div className="text-sm">Mahasiswa</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Tentang Politeknik Ganesha</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Politeknik Ganesha Medan adalah institusi pendidikan tinggi vokasi yang berkomitmen 
              menghasilkan lulusan berkualitas siap kerja dengan program beasiswa yang inovatif.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Visi & Misi</h3>
              <div className="space-y-6">
                <div className="bg-primary-50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold text-primary-800 mb-3">Visi</h4>
                  <p className="text-gray-700">
                    Menjadi politeknik terdepan dalam menghasilkan lulusan vokasi berkualitas 
                    yang siap kerja dan berdaya saing global.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Misi</h4>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                      Menyelenggarakan pendidikan vokasi berkualitas tinggi
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                      Mengembangkan penelitian terapan dan pengabdian masyarakat
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                      Membangun kerja sama dengan industri dan institusi pendidikan
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Program Studi</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-6 h-6" />
                  <span>Teknik Informatika</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-6 h-6" />
                  <span>Manajemen Informatika</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-6 h-6" />
                  <span>Akuntansi</span>
                </div>          
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="keunggulan" className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Kenapa Pilih Kami?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Politeknik Ganesha Medan menawarkan berbagai keunggulan yang menjadikan 
              kami pilihan terbaik untuk masa depan pendidikan Anda.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center"
              >
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship Section */}
      <section id="beasiswa" className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Program Beasiswa</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dapatkan kesempatan beasiswa 100% gratis untuk 100 mahasiswa berprestasi 
              di Politeknik Ganesha Medan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Keuntungan Beasiswa</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Biaya Kuliah 100% Gratis</h4>
                    <p className="text-gray-600">Tidak ada biaya SPP selama masa studi</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Uang Saku Bulanan</h4>
                    <p className="text-gray-600">Tunjangan untuk biaya hidup dan transportasi</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Program Magang</h4>
                    <p className="text-gray-600">Pengalaman kerja di perusahaan partner</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <CheckCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Jaminan Kerja</h4>
                    <p className="text-gray-600">Penempatan kerja setelah lulus</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Cara Mendapatkan Beasiswa</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Isi Angket Survey</h4>
                    <p className="text-white/80">Lengkapi formulir survey dengan data yang akurat</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Seleksi Administrasi</h4>
                    <p className="text-white/80">Tim kami akan mengevaluasi kelengkapan data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Wawancara</h4>
                    <p className="text-white/80">Tahap wawancara untuk mengetahui motivasi</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Pengumuman</h4>
                    <p className="text-white/80">Hasil seleksi akan diumumkan via WhatsApp</p>
                  </div>
                </div>
              </div>
              <Link to="/survey" className="btn-primary mt-6 w-full text-center">
                Mulai Isi Angket
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimoni" className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Testimoni Alumni</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dengarkan pengalaman langsung dari alumni yang telah merasakan 
              manfaat program beasiswa Politeknik Ganesha Medan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-primary-600">{testimonial.role}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Siap Wujudkan Masa Depanmu?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Jangan lewatkan kesempatan emas ini! Isi angket sekarang dan 
              dapatkan peluang beasiswa 100% gratis di Politeknik Ganesha Medan.
            </p>
            <Link to="/survey" className="btn-secondary text-lg px-8 py-4 inline-flex items-center">
              Isi Angket Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Hubungi Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ada pertanyaan tentang program beasiswa atau pendaftaran? 
              Jangan ragu untuk menghubungi kami kapan saja.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Telepon</h3>
              <p className="text-gray-600 mb-2">+62 61 1234 5678</p>
              <p className="text-sm text-gray-500">Senin - Jumat, 08:00 - 17:00</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">WhatsApp</h3>
              <p className="text-gray-600 mb-2">+62 812 3456 7890</p>
              <p className="text-sm text-gray-500">24/7 Customer Service</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Email</h3>
              <p className="text-gray-600 mb-2">info@polganesha.ac.id</p>
              <p className="text-sm text-gray-500">Respon dalam 24 jam</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Alamat</h3>
              <p className="text-gray-600 mb-2">Jl. Ganesha No. 123</p>
              <p className="text-sm text-gray-500">Medan, Sumatera Utara</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Jam Operasional</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Senin - Jumat</h4>
                  <p className="text-gray-600">08:00 - 17:00 WIB</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Sabtu</h4>
                  <p className="text-gray-600">08:00 - 14:00 WIB</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <p className="text-primary-800 font-medium">
                  🎓 Tim Admisi kami siap membantu Anda dalam proses pendaftaran beasiswa!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Admin Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Panel Administrator</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Akses dashboard admin untuk melihat data survey dan mengelola informasi calon mahasiswa
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Akses Terbatas</h3>
              <p className="text-gray-600 mb-6">
                Panel admin hanya dapat diakses oleh administrator Politeknik Ganesha Medan
              </p>
              <Link 
                to="/admin" 
                className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                <User className="w-5 h-5" />
                <span>Masuk ke Admin Panel</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage

