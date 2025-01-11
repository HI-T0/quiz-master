'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import LevelCompleteScreen from '@/components/LevelCompleteScreen'
import VirtualKeyboard from '@/components/VirtualKeyboard'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function WordlePuzzle() {
  const { 
    level, 
    hints, 
    useHint: decrementHint, 
    incrementLevel, 
    addScore, 
    wordleAttempts, 
    addWordleAttempt, 
    currentWord,
    useVirtualKeyboard,
    toggleVirtualKeyboard,
    keyStatuses,
    updateKeyStatuses,
    resetKeyStatuses,
    updateStreak,
    updateStatistics
  } = useGameStore()
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [showLevelComplete, setShowLevelComplete] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [shakeCorrect, setShakeCorrect] = useState<boolean[]>([])
  const [revealedHints, setRevealedHints] = useState<string[]>([])

  useEffect(() => {
    setGuess('')
    setMessage('')
    setHintsUsed(0)
    setShowLevelComplete(false)
    setShakeCorrect([])
    setRevealedHints([])
    resetKeyStatuses()
  }, [currentWord, resetKeyStatuses])

  const playBellSound = () => {
    const audio = new Audio('/bell.wav')
    audio.play().catch(error => console.error('Error playing sound:', error))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const upperGuess = guess.toUpperCase()
    
    if (upperGuess.length !== currentWord.length) {
      setMessage(`Word must be ${currentWord.length} letters!`)
      return
    }

    const newShakeCorrect = upperGuess.split('').map((letter, index) => letter === currentWord[index])
    setShakeCorrect(newShakeCorrect)

    addWordleAttempt(upperGuess)
    updateKeyStatuses(upperGuess, currentWord)
    
    if (upperGuess === currentWord) {
      setMessage('Correct!')
      addScore(currentWord.length * 2)
      updateStreak(true)
      updateStatistics(wordleAttempts.length + 1, true)
      setShowLevelComplete(true)
    } else if (wordleAttempts.length + 1 >= 6) {
      setMessage(`Game over! The word was ${currentWord}`)
      updateStreak(false)
      updateStatistics(6, false)
      setShowLevelComplete(true)
    } else {
      setMessage('Try again!')
    }
    setGuess('')
  }

  const handleHintClick = () => {
    if (hints > 0 && revealedHints.length < currentWord.length) {
      playBellSound()
      decrementHint()
      setHintsUsed(hintsUsed + 1)
      const nextHintIndex = revealedHints.length
      setRevealedHints([...revealedHints, currentWord[nextHintIndex]])
      setShowHint(true)
      setTimeout(() => setShowHint(false), 3000)
    }
  }

  const handleContinue = () => {
    setShowLevelComplete(false)
    incrementLevel()
  }

  const handleKeyPress = (key: string) => {
    if (guess.length < currentWord.length) {
      setGuess(prevGuess => prevGuess + key)
    }
  }

  if (showLevelComplete) {
    return (
      <LevelCompleteScreen
        level={level}
        hintsUsed={hintsUsed}
        attempts={wordleAttempts.length}
        onContinue={handleContinue}
      />
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.h2 
        className="text-3xl font-bold mb-4 text-center text-purple-600"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Wordle Quest - Level {level}
      </motion.h2>
      
      <motion.div
        className="mb-4 flex justify-between items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-lg text-gray-600">Hints remaining: {hints}</p>
        <button
          onClick={handleHintClick}
          disabled={hints === 0 || revealedHints.length === currentWord.length}
          className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          Use Hint
        </button>
      </motion.div>
      
      {showHint && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg text-green-600 mt-2 text-center font-semibold"
        >
          Hint: The word contains {revealedHints.join(', ')}
        </motion.p>
      )}

      <motion.div 
        className="space-y-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {wordleAttempts.map((attempt, attemptIndex) => (
          <motion.div
            key={attemptIndex}
            className="flex justify-center space-x-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: attemptIndex * 0.1 }}
          >
            {attempt.split('').map((letter, letterIndex) => (
              <motion.div
                key={letterIndex}
                className={`w-12 h-12 flex items-center justify-center font-bold rounded-lg text-xl
                  ${currentWord[letterIndex] === letter ? 'bg-green-500 text-white' :
                    currentWord.includes(letter) ? 'bg-yellow-500 text-white' :
                    'bg-gray-200 text-gray-700'
                  }`}
                animate={shakeCorrect[letterIndex] && currentWord[letterIndex] === letter ? 
                  { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } } : 
                  {}
                }
              >
                {letter}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value.toUpperCase())}
          maxLength={currentWord.length}
          className="w-full p-3 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
          placeholder={`Enter ${currentWord.length}-letter word`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-purple-500 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-purple-600 transition-colors shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Submit Guess
        </motion.button>
      </form>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center font-bold text-lg ${
            message.includes('Correct') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </motion.p>
      )}

      {useVirtualKeyboard && (
        <VirtualKeyboard onKeyPress={handleKeyPress} keyStatuses={keyStatuses} />
      )}

      <div className="flex items-center space-x-2 mt-4 bg-gray-100 p-3 rounded-lg">
        <Switch
          id="virtual-keyboard"
          checked={useVirtualKeyboard}
          onCheckedChange={toggleVirtualKeyboard}
        />
        <Label htmlFor="virtual-keyboard" className="text-gray-700 font-medium">
          Use Virtual Keyboard
        </Label>
      </div>
    </motion.div>
  )
}

