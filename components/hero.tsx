"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Добро пожаловать в КНУ",
      subtitle: "Ведущий университет Кыргызстана",
      image: "/university-building-modern-campus.jpg",
    },
    {
      title: "Образование Мирового Уровня",
      subtitle: "Подготовка лидеров завтрашнего дня",
      image: "/students-studying-library-modern.jpg",
    },
    {
      title: "Инновационные Программы",
      subtitle: "Объединяя традицию и современность",
      image: "/university-lecture-hall-technology.jpg",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.1,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.6,
      },
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Slider */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={index}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-800/60 to-transparent"
                  />
                </motion.div>
              ),
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            key={currentSlide}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="text-center text-white max-w-2xl mx-auto px-4"
          >
            <motion.h1
              variants={childVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 drop-shadow-lg"
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p
              variants={childVariants}
              className="text-xl sm:text-2xl md:text-3xl text-cyan-200 mb-8 drop-shadow-md"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            <motion.button
              variants={childVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
            >
              Начать обучение
            </motion.button>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronLeft size={28} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronRight size={28} />
        </motion.button>

        {/* Dots */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-cyan-400 w-8" : "bg-white/50 w-3 hover:bg-white/70"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
