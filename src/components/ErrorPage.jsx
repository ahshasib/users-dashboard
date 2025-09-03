'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa'

export default function ErrorPage({ message = "Something went wrong!" }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-yellow-400 text-6xl"
        >
          <FaExclamationTriangle />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Oops! Error Occurred
        </h1>

        <p className="text-gray-400 max-w-md mx-auto">
          {message} Please try again or go back to the previous page.
        </p>

        <button
          onClick={() => router.back()}
          className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold shadow hover:opacity-90 transition flex items-center gap-2"
        >
          <FaArrowLeft /> Go Back
        </button>
      </motion.div>
    </div>
  )
}
