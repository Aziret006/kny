"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    // Сразу закрываем меню
    setIsMenuOpen(false)
    
    // Даем время на анимацию закрытия меню перед скроллом
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        // Учитываем высоту фиксированного хедера
        const headerHeight = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    }, 300) // Увеличил задержку для полного закрытия меню
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg z-50 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300"
            >
              КНУ
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white font-bold text-xl hidden sm:inline group-hover:text-cyan-300 transition-colors"
            >
              КНУ им. Ж. Балтабаева
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav variants={containerVariants} initial="hidden" animate="visible" className="hidden md:flex gap-8">
            {[
              { label: "О Нас", id: "about" },
              { label: "Программы", id: "programs" },
              { label: "Галерея", id: "gallery" },
              { label: "Отзывы", id: "testimonials" },
              { label: "Контакты", id: "contact" },
            ].map((item) => (
              <motion.button
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-cyan-300 transition-colors font-medium relative group"
              >
                {item.label}
                <motion.span
                  layoutId={`underline-${item.id}`}
                  className="absolute bottom-0 left-0 h-0.5 bg-cyan-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-white hover:text-cyan-300 transition-colors p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 90 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-blue-800/95 backdrop-blur-md rounded-lg mt-2"
            >
              <nav className="pb-4 space-y-2">
                {[
                  { label: "О Нас", id: "about" },
                  { label: "Программы", id: "programs" },
                  { label: "Галерея", id: "gallery" },
                  { label: "Отзывы", id: "testimonials" },
                  { label: "Контакты", id: "contact" },
                ].map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-3 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium active:bg-blue-600"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}