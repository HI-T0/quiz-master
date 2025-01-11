'use client'

import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useEffect, useRef } from 'react'

interface LevelCompleteScreenProps {
  level: number
  hintsUsed: number
  attempts: number
  onContinue: () => void
}

const MAX_LEVEL = 140 // Make sure this matches the MAX_LEVEL in the game store

export default function LevelCompleteScreen({ level, hintsUsed, attempts, onContinue }: LevelCompleteScreenProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/pop.wav');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
    audioRef.current.play().catch((error) => {
      console.error('Error playing sound:', error);
    });
  }, [])

  const handleShare = () => {
    const shareText = `I just completed level ${level}/${MAX_LEVEL} of Wordle Quest with ${hintsUsed} hints and ${attempts} attempts! Can you beat that? #WordleQuest`
    if (navigator.share) {
      navigator.share({
        title: 'Wordle Quest',
        text: shareText,
        url: window.location.href,
      })
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-2xl text-center w-full max-w-2xl mx-auto"
    >
      <motion.h2 
        className="text-4xl font-bold mb-6 text-purple-600"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Level {level}/{MAX_LEVEL} Complete!
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6 space-y-2"
      >
        <p className="text-xl">🎯 Hints used: <span className="font-bold text-indigo-600">{hintsUsed}</span></p>
        <p className="text-xl">🔢 Attempts: <span className="font-bold text-indigo-600">{attempts}</span></p>
      </motion.div>
      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="w-full bg-green-500 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-green-600 transition-colors shadow-lg"
        >
          Share 🎉
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="w-full bg-purple-500 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-purple-600 transition-colors shadow-lg"
        >
          {level < MAX_LEVEL ? 'Next Level 🚀' : 'Play Again 🔄'}
        </motion.button>
      </div>
    </motion.div>
  )
}

