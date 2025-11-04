"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    })
    const element = document.getElementById("about")
    if (element) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4"
          >
            О КНУ им. Ж. Балтабаева
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="/beautiful-university-campus-kyrgyzstan.jpg"
              alt="КНУ Кампус"
              className="rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 cursor-pointer"
            />
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-6 leading-relaxed">
              КНУ им. Ж. Балтабаева — один из ведущих университетов Кыргызской Республики, обеспечивающий высокое
              качество образования и научных исследований.
            </motion.p>
            <div className="space-y-4">
              {[
                { title: "Основана", desc: "1925 год" },
                { title: "Студентов", desc: "Более 20,000" },
                { title: "Факультетов", desc: "12 факультетов" },
                { title: "Партнеры", desc: "Университеты по всему миру" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <span className="text-white font-bold">{index + 1}</span>
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-blue-900">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
