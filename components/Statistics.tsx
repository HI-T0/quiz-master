import { useGameStore } from '@/store/gameStore'
import { motion } from 'framer-motion'

export default function Statistics() {
  const { streak, bestStreak, totalGames, totalWins, totalGuesses } = useGameStore()

  const averageGuesses = totalGames > 0 ? (totalGuesses / totalGames).toFixed(2) : '0.00'
  const winPercentage = totalGames > 0 ? ((totalWins / totalGames) * 100).toFixed(2) : '0.00'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-purple-100 p-4 rounded-lg">
          <p className="text-lg font-semibold text-purple-800">Current Streak</p>
          <p className="text-3xl font-bold text-purple-600">{streak}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <p className="text-lg font-semibold text-purple-800">Best Streak</p>
          <p className="text-3xl font-bold text-purple-600">{bestStreak}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <p className="text-lg font-semibold text-purple-800">Total Games</p>
          <p className="text-3xl font-bold text-purple-600">{totalGames}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <p className="text-lg font-semibold text-purple-800">Win Percentage</p>
          <p className="text-3xl font-bold text-purple-600">{winPercentage}%</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg col-span-2">
          <p className="text-lg font-semibold text-purple-800">Average Guesses</p>
          <p className="text-3xl font-bold text-purple-600">{averageGuesses}</p>
        </div>
      </div>
    </motion.div>
  )
}

