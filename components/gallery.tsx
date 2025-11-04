"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    })
    const element = document.getElementById("gallery")
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const images = [
    "/gallery/knu-campus-main.jpg",
    "/gallery/knu-library.jpg",
    "/gallery/knu-lecture-hall.jpg",
    "/gallery/knu-courtyard.jpg",
    "/gallery/knu-building.jpg",
    "/gallery/knu-students.jpg",
  ]

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4"
          >
            Фотогалерея КНУ им. Ж. Балтабаева
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"
          />
        </div>

        <motion.div className="grid md:grid-cols-3 gap-6 mb-12">
          {images.map((image, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={imageVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              whileHover={{ scale: 1.1 }}
              className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Галерея КНУ ${index + 1}`}
                className="w-full h-48 object-cover"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent flex items-end justify-center pb-4"
              >
                <span className="text-white font-semibold">Просмотреть</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              src={images[currentIndex]}
              alt="Основное изображение КНУ"
              className="w-full h-96 object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-transparent to-transparent" />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft size={28} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight size={28} />
          </motion.button>

          <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                animate={{
                  width: index === currentIndex ? 32 : 12,
                  backgroundColor: index === currentIndex ? "rgb(34, 211, 238)" : "rgba(255, 255, 255, 0.5)",
                }}
                transition={{ duration: 0.3 }}
                className="h-2 rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
