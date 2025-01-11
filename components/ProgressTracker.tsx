import { useGameStore } from '@/store/gameStore'
import { motion } from 'framer-motion'

export default function ProgressTracker() {
  const { level, score, badges } = useGameStore()

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8 text-center bg-white p-6 rounded-lg shadow-lg"
    >
      <p className="text-2xl font-bold mb-2">📊 Progress</p>
      <p className="text-xl">🏆 Level: {level}</p>
      <p className="text-xl">💎 Score: {score}</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">🎖️ Badges:</h3>
        <ul className="flex flex-wrap gap-2 justify-center mt-2">
          {badges.map((badge: string, index: number) => (
            <motion.li
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold"
            >
              {badge}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

