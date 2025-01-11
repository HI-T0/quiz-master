import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type KeyStatus = 'unused' | 'wrong' | 'misplaced' | 'correct'

interface GameState {
  userName: string | null
  level: number
  score: number
  hints: number
  wordleAttempts: string[]
  currentWord: string
  badges: string[]
  useVirtualKeyboard: boolean
  keyStatuses: Record<string, KeyStatus>
  streak: number
  lastPlayedDate: string | null
  totalGames: number
  totalWins: number
  totalGuesses: number
  bestStreak: number
  setUserName: (name: string) => void
  initializeGame: () => void
  incrementLevel: () => void
  addScore: (points: number) => void
  useHint: () => void
  addWordleAttempt: (attempt: string) => void
  setNewWord: () => void
  addBadge: (badge: string) => void
  resetGame: () => void
  toggleVirtualKeyboard: () => void
  updateKeyStatuses: (attempt: string, currentWord: string) => void
  resetKeyStatuses: () => void
  updateStreak: (won: boolean) => void
  updateStatistics: (attempts: number, won: boolean) => void
}

const words = [
  // 4-letter words
  'PLAY', 'GAME', 'CODE', 'QUIZ', 'WORD',
  // 5-letter words
  'REACT', 'STYLE', 'FRAME', 'STACK', 'ROUTE',
  // 6-letter words
  'PUZZLE', 'CODING', 'SYNTAX', 'SCRIPT', 'DESIGN',
  // 7-letter words
  'PROGRAM', 'DEVELOP', 'WEBSITE', 'BACKEND', 'FRONTEND',
  // 8-letter words
  'FUNCTION', 'DATABASE', 'ALGORITHM', 'VARIABLE', 'TEMPLATE',
  // 9-letter words
  'INTERFACE', 'FRAMEWORK', 'COMPONENT', 'DEBUGGING', 'RECURSION',
  // 10-letter words
  'JAVASCRIPT', 'TYPESCRIPT', 'RESPONSIVE', 'DEPLOYMENT', 'MIDDLEWARE'
]

const MAX_LEVEL = 140

const initialKeyStatuses: Record<string, KeyStatus> = {}
'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
  initialKeyStatuses[letter] = 'unused'
})

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      userName: null,
      level: 1,
      score: 0,
      hints: 3,
      wordleAttempts: [],
      currentWord: words[0],
      badges: [],
      useVirtualKeyboard: true,
      keyStatuses: { ...initialKeyStatuses },
      streak: 0,
      lastPlayedDate: null,
      totalGames: 0,
      totalWins: 0,
      totalGuesses: 0,
      bestStreak: 0,
      setUserName: (name: string) => set({ userName: name }),
      initializeGame: () => {
        const { userName, level } = get()
        if (!userName) {
          set({ 
            level: 1, 
            score: 0, 
            hints: 3,
            wordleAttempts: [],
            currentWord: words[0],
            badges: [],
            keyStatuses: { ...initialKeyStatuses }
          })
        } else {
          set({ 
            currentWord: words[(level - 1) % words.length],
            keyStatuses: { ...initialKeyStatuses }
          })
        }
      },
      incrementLevel: () => {
        const newLevel = Math.min(get().level + 1, MAX_LEVEL)
        set({ 
          level: newLevel,
          wordleAttempts: [],
          hints: get().hints + 1,
          currentWord: words[(newLevel - 1) % words.length],
          keyStatuses: { ...initialKeyStatuses }
        })
      },
      addScore: (points) => set((state) => ({ score: state.score + points })),
      useHint: () => set((state) => ({ hints: Math.max(0, state.hints - 1) })),
      addWordleAttempt: (attempt) => 
        set((state) => ({ wordleAttempts: [...state.wordleAttempts, attempt] })),
      setNewWord: () => {
        const newLevel = get().level
        set({ 
          currentWord: words[(newLevel - 1) % words.length],
          keyStatuses: { ...initialKeyStatuses }
        })
      },
      addBadge: (badge: string) => set((state) => ({ badges: [...state.badges, badge] })),
      resetGame: () => {
        set({
          level: 1,
          score: 0,
          hints: 3,
          wordleAttempts: [],
          currentWord: words[0],
          badges: [],
          keyStatuses: { ...initialKeyStatuses }
        })
      },
      toggleVirtualKeyboard: () => set((state) => ({ useVirtualKeyboard: !state.useVirtualKeyboard })),
      updateKeyStatuses: (attempt: string, currentWord: string) => {
        const newKeyStatuses = { ...get().keyStatuses }
        attempt.split('').forEach((letter, index) => {
          if (currentWord[index] === letter) {
            newKeyStatuses[letter] = 'correct'
          } else if (currentWord.includes(letter)) {
            if (newKeyStatuses[letter] !== 'correct') {
              newKeyStatuses[letter] = 'misplaced'
            }
          } else {
            if (newKeyStatuses[letter] === 'unused') {
              newKeyStatuses[letter] = 'wrong'
            }
          }
        })
        set({ keyStatuses: newKeyStatuses })
      },
      resetKeyStatuses: () => set({ keyStatuses: { ...initialKeyStatuses } }),
      updateStreak: (won: boolean) => {
        const today = new Date().toDateString()
        const { lastPlayedDate, streak, bestStreak } = get()
        
        if (won) {
          if (lastPlayedDate === today) {
            set({ streak: streak + 1 })
          } else if (lastPlayedDate === new Date(Date.now() - 86400000).toDateString()) {
            const newStreak = streak + 1
            set({ 
              streak: newStreak, 
              bestStreak: Math.max(bestStreak, newStreak),
              lastPlayedDate: today
            })
          } else {
            set({ streak: 1, lastPlayedDate: today })
          }
        } else {
          set({ streak: 0, lastPlayedDate: today })
        }
      },
      updateStatistics: (attempts: number, won: boolean) => {
        set((state) => ({
          totalGames: state.totalGames + 1,
          totalWins: state.totalWins + (won ? 1 : 0),
          totalGuesses: state.totalGuesses + attempts
        }))
      }
    }),
    {
      name: 'wordle-quest-storage',
    }
  )
)

