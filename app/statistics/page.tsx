'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Statistics from '@/components/Statistics'

export default function StatisticsPage() {
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
        Your Wordle Quest Statistics
      </motion.h1>
      <Statistics />
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link href="/game" className="text-white hover:text-purple-200 font-semibold text-lg">
          ← Back to Game
        </Link>
      </motion.div>
    </motion.main>
  )
}

