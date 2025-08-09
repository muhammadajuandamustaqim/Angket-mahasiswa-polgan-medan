import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'Apa syarat untuk mendapatkan beasiswa ini?',
      answer: 'Syarat utama adalah lulusan SMA/SMK/MA tahun 2024, memiliki nilai rata-rata minimal 7.5, dan mengisi survey ini dengan lengkap. Beasiswa akan diberikan berdasarkan hasil seleksi yang meliputi nilai akademik, motivasi, dan kondisi ekonomi keluarga.'
    },
    {
      question: 'Berapa lama proses seleksi beasiswa?',
      answer: 'Proses seleksi berlangsung selama 2-3 minggu setelah deadline pendaftaran. Tim kami akan mengevaluasi semua data yang masuk, melakukan wawancara dengan kandidat terpilih, dan mengumumkan hasilnya via WhatsApp.'
    },
    {
      question: 'Apakah beasiswa ini benar-benar 100% gratis?',
      answer: 'Ya, beasiswa ini benar-benar 100% gratis! Anda tidak perlu membayar SPP, uang gedung, atau biaya administrasi lainnya. Bahkan Anda akan mendapatkan uang saku bulanan untuk biaya hidup dan transportasi.'
    },
    {
      question: 'Jurusan apa saja yang tersedia?',
      answer: 'Kami menyediakan 3 program studi: Teknik Informatika, Manajemen Informatika, dan Akuntansi. Semua program studi sudah terakreditasi dan memiliki kerja sama dengan industri.'
    },
    {
      question: 'Bagaimana jika saya tidak diterima beasiswa?',
      answer: 'Jika tidak diterima beasiswa, Anda tetap bisa mendaftar sebagai mahasiswa reguler dengan berbagai kemudahan pembayaran seperti cicilan atau beasiswa parsial. Tim kami akan membantu memberikan alternatif pembiayaan yang sesuai.'
    },
    {
      question: 'Apakah ada jaminan kerja setelah lulus?',
      answer: 'Ya, kami memiliki program jaminan kerja melalui kerja sama dengan 100+ perusahaan partner. Setelah lulus, Anda akan ditempatkan di perusahaan sesuai dengan jurusan dan kompetensi yang dimiliki.'
    },
    {
      question: 'Kapan perkuliahan dimulai?',
      answer: 'Perkuliahan akan dimulai pada bulan Agustus 2024. Sebelumnya akan ada orientasi mahasiswa baru dan persiapan akademik untuk memastikan Anda siap menghadapi dunia perkuliahan.'
    },
    {
      question: 'Bagaimana cara menghubungi tim admin?',
      answer: 'Anda bisa menghubungi tim admin melalui WhatsApp di +62 812 3456 7890, email di info@polganesha.ac.id, atau datang langsung ke kampus di Jl. Soekarno-Hatta No. 123, Medan. Tim kami siap membantu 24/7.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="text-gray-600">
          Temukan jawaban untuk pertanyaan-pertanyaan umum seputar beasiswa
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-300 flex items-center justify-between"
            >
              <span className="font-semibold text-gray-900 pr-4">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="bg-primary-50 rounded-lg p-4">
          <p className="text-primary-800 font-medium">
            Masih punya pertanyaan? Jangan ragu untuk menghubungi kami!
          </p>
          <div className="flex justify-center space-x-4 mt-3">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              Chat WhatsApp
            </a>
            <a
              href="mailto:info@polganesha.ac.id"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              Kirim Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ 