"use client"

import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mb-8"
        >
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg mb-4 text-cyan-300">КНУ им. Ж. Балтабаева</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Ведущий университет Кыргызской Республики, готовящий специалистов мирового уровня.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-4 text-cyan-300">Быстрые ссылки</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {["О Нас", "Программы", "Галерея", "Контакты"].map((link) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <a href="#" className="hover:text-cyan-300 transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-4 text-cyan-300">Социальные сети</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((social) => (
                <motion.li key={social} whileHover={{ x: 5 }}>
                  <a href="#" className="hover:text-cyan-300 transition-colors">
                    {social}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-4 text-cyan-300">Контакты</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              г. Бишкек, бул. Чуй, 265
              <br />
              +996 (312) 66-23-19
              <br />
              info@knu.kg
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-blue-700 pt-8 origin-left"
        >
          <motion.div
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400"
          >
            <motion.p variants={itemVariants}>© {currentYear} КНУ им. Ж. Балтабаева. Все права защищены.</motion.p>
            <motion.div variants={itemVariants} className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-cyan-300 transition-colors">
                Политика Конфиденциальности
              </a>
              <a href="#" className="hover:text-cyan-300 transition-colors">
                Условия Использования
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
