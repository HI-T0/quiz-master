'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useGameStore } from '@/store/gameStore'

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { resetGame } = useGameStore();

  useEffect(() => {
    audioRef.current = new Audio('/buttons.wav');
  }, []);

  const handleClick = () => {
    audioRef.current?.play().catch((error) => {
      console.error('Error playing sound:', error);
    });
  };

  const handleStartOver = () => {
    audioRef.current?.play().catch((error) => {
      console.error('Error playing sound:', error);
    });
    resetGame();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-pink-400 to-orange-500 relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStartOver}
        className="absolute top-4 right-4 bg-white text-pink-500 font-bold py-2 px-4 rounded-full text-sm shadow-lg hover:bg-pink-100 transition-colors"
      >
        Start Over
      </motion.button>
      <div className="text-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold mb-8 text-white"
        >
          Welcome to Wordle Quest 🔤
        </motion.h1>
        <motion.p
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl mb-8 text-white"
        >
          Challenge yourself with a series of Wordle puzzles!
        </motion.p>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            href="/game" 
            className="inline-block bg-white text-pink-500 font-bold py-3 px-6 rounded-full text-xl shadow-lg hover:bg-pink-100 transition-colors"
            onClick={handleClick}
          >
            Start Playing 🚀
          </Link>
        </motion.div>
      </div>
    </main>
  )
}

