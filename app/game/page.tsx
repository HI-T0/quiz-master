'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import WordlePuzzle from '@/components/puzzles/WordlePuzzle'
import WelcomeScreen from '@/components/WelcomeScreen'
import { useGameStore } from '@/store/gameStore'
import confetti from 'canvas-confetti'

const MAX_LEVEL = 140

export default function Game() {
  const { userName, level, score, streak, initializeGame } = useGameStore()
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    initializeGame()
    setShowWelcome(userName === null)
  }, [initializeGame, userName])

  useEffect(() => {
    if (level > 1) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [level])

  if (showWelcome) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-purple-400 to-indigo-600">
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      </main>
    )
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-400 to-indigo-600"
    >
      <motion.h1 
        className="text-4xl md:text-6xl font-bold mb-8 text-white text-center"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        Welcome back, {userName}!
      </motion.h1>
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <div className="mb-6 flex justify-between items-center">
          <motion.p 
            className="text-2xl font-bold text-purple-600"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Level: {level}/{MAX_LEVEL}
          </motion.p>
          <motion.p 
            className="text-2xl font-bold text-indigo-600"
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Score: {score}
          </motion.p>
        </div>
        <motion.div
          className="mb-4 bg-yellow-100 p-3 rounded-lg text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg font-semibold text-yellow-800">
            Current Streak: <span className="text-2xl font-bold">{streak}</span>
          </p>
        </motion.div>
        <WordlePuzzle />
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/statistics" className="text-purple-600 hover:text-purple-800 font-semibold">
            View Statistics
          </Link>
        </motion.div>
      </motion.div>
    </motion.main>
  )
}

