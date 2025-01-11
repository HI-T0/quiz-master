import { motion } from 'framer-motion'

type KeyStatus = 'unused' | 'wrong' | 'misplaced' | 'correct'

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void
  keyStatuses: Record<string, KeyStatus>
}

const KEYBOARD_LAYOUT = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]

export default function VirtualKeyboard({ onKeyPress, keyStatuses }: VirtualKeyboardProps) {
  const getKeyColor = (key: string) => {
    switch (keyStatuses[key]) {
      case 'correct':
        return 'bg-green-500 text-white'
      case 'misplaced':
        return 'bg-yellow-500 text-white'
      case 'wrong':
        return 'bg-gray-500 text-white'
      default:
        return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <div className="mt-4">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((key) => (
            <motion.button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`mx-1 w-10 h-12 rounded font-bold ${getKeyColor(key)}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {key}
            </motion.button>
          ))}
        </div>
      ))}
    </div>
  )
}

