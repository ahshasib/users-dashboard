import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 0.1,
              delay: i * 0.2,
            }}
            className="w-4 h-4 bg-pink-400 rounded-full"
          />
        ))}
      </div>
    </div>
  )
}
