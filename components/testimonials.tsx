"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    })
    const element = document.getElementById("testimonials")
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const testimonials = [
    {
      name: "Азиза Кадырова",
      role: "Выпускница, IT специалист",
      text: "КНУ дал мне отличное образование и навыки, которые помогли мне получить работу в крупной компании. Я благодарна всем преподавателям!",
      avatar: "/placeholder.svg?key=9kp1x",
      rating: 5,
    },
    {
      name: "Булат Айдаров",
      role: "Выпускник, Инженер",
      text: "Современное оборудование и квалифицированные преподаватели сделали мое обучение незабываемым. Рекомендую КНУ всем!",
      avatar: "/placeholder.svg?key=8lm2y",
      rating: 5,
    },
    {
      name: "Нурай Абдулова",
      role: "Студентка 3 курса",
      text: "Я очень благодарна университету за прекрасную учебную среду и прекрасные возможности для развития. Здесь я нашла свою призвание!",
      avatar: "/placeholder.svg?key=5n3z0",
      rating: 5,
    },
  ]

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  const slideVariants = {
    enter: {
      opacity: 0,
      x: 100,
    },
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4"
          >
            Отзывы Студентов
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"
          />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 sm:p-12 shadow-xl"
            >
              {/* Stars */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-2 mb-6"
              >
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <Star size={20} className="fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-700 mb-8 leading-relaxed italic"
              >
                "{testimonials[currentIndex].text}"
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-cyan-400 cursor-pointer"
                />
                <div>
                  <h3 className="font-bold text-blue-900 text-lg">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute -left-12 sm:left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-lg text-white p-3 rounded-full transition-all duration-300 hidden sm:block"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute -right-12 sm:right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-lg text-white p-3 rounded-full transition-all duration-300 hidden sm:block"
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Mobile Navigation */}
          <motion.div className="flex justify-center gap-3 mt-8 sm:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-lg text-white p-2 rounded-full transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-lg text-white p-2 rounded-full transition-all duration-300"
            >
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </div>

        {/* Dots */}
        <motion.div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              animate={{
                width: index === currentIndex ? 32 : 12,
                backgroundColor: index === currentIndex ? "rgb(34, 211, 238)" : "rgb(191, 219, 254)",
              }}
              transition={{ duration: 0.3 }}
              className="h-3 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
