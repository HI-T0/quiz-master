'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'

interface WelcomeScreenProps {
  onComplete: () => void
}

const funFacts = [
  "The word 'quiz' was allegedly invented by a Dublin theater owner in 1782.",
  "The longest word in the English language is 'pneumonoultramicroscopicsilicovolcanoconiosis'.",
  "The dot over the letter 'i' is called a tittle.",
  "The shortest complete sentence in the English language is 'I am.'",
  "The word 'alphabet' comes from the first two letters of the Greek alphabet: alpha and beta."
]

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [name, setName] = useState('')
  const { setUserName } = useGameStore()
  const [fact, setFact] = useState('')
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setFact(funFacts[Math.floor(Math.random() * funFacts.length)])
  }, [])

  useEffect(() => {
    audioRef.current = new Audio('/buttons.wav');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      audioRef.current?.play().then(() => {
        setUserName(name.trim());
        onComplete();
      }).catch((error) => {
        console.error('Error playing sound:', error);
        setUserName(name.trim());
        onComplete();
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full"
    >
      <motion.h2 
        className="text-3xl font-bold mb-6 text-center text-purple-600"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to Wordle Quest!
      </motion.h2>
      <motion.p 
        className="mb-6 text-center text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        What should we call you?
      </motion.p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter your name"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-purple-500 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-purple-600 transition-colors shadow-lg"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Start Playing 🚀
        </motion.button>
      </form>
      <motion.div
        className="mt-8 p-4 bg-indigo-100 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">Fun Fact:</h3>
        <p className="text-gray-700">{fact}</p>
      </motion.div>
    </motion.div>
  )
}

