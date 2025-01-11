import { useGameStore } from '../store/gameStore'

// Simulated leaderboard data
const simulatedLeaderboard = [
  { username: 'PuzzleMaster', level: 10, score: 5000 },
  { username: 'QuizWhiz', level: 9, score: 4500 },
  { username: 'BrainTeaser', level: 8, score: 4000 },
  { username: 'LogicLord', level: 7, score: 3500 },
  { username: 'EnigmaExpert', level: 6, score: 3000 },
  { username: 'RiddleRanger', level: 5, score: 2500 },
  { username: 'MathMagician', level: 4, score: 2000 },
  { username: 'WordWizard', level: 3, score: 1500 },
  { username: 'CipherSolver', level: 2, score: 1000 },
  { username: 'PuzzleNewbie', level: 1, score: 500 },
]

function updateLeaderboard() {
  const { updateLeaderboard, username, level, score } = useGameStore.getState()
  
  // Add the current user to the leaderboard
  const updatedLeaderboard = [
    ...simulatedLeaderboard,
    { username, level, score }
  ]
  
  // Sort the leaderboard by score (descending)
  updatedLeaderboard.sort((a, b) => b.score - a.score)
  
  // Update the leaderboard in the store
  updateLeaderboard(updatedLeaderboard)
  
  console.log('Leaderboard updated:', updatedLeaderboard)
}

// Run the update
updateLeaderboard()

