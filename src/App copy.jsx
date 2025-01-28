import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [showExplosion, setShowExplosion] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  let typingTimeout = null

  const handleClick = () => {
    setCount(count + 1)
    setShowExplosion(true)
    setTimeout(() => setShowExplosion(false), 500) // Reset after animation
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    setIsTyping(true)
    
    // Clear existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    
    // Set new timeout
    typingTimeout = setTimeout(() => {
      setIsTyping(false)
    }, 1000) // Wait 1 second after last keystroke
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }
    }
  }, [])

  // Create 12 particles for the explosion
  const particles = [...Array(12)].map((_, i) => ({
    x: Math.cos(i * (360 / 12) * (Math.PI / 180)) * 100,
    y: Math.sin(i * (360 / 12) * (Math.PI / 180)) * 100,
  }))

  return (
    <>
      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4}}
            exit={{ opacity: 0 }}
            className="fixed inset-0 -z-10 s"
          >
            <div className="animated-grid" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-center pb-4">
        <motion.img 
          src={viteLogo} 
          alt="Vite logo" 
          className="w-24 h-24"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.img 
          src={reactLogo} 
          alt="React logo" 
          className="w-24 h-24"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.p 
        className="text-5xl text-orange-500 font-bold text-center p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        This is React with tailwind and framer motion!
      </motion.p>

      <motion.div 
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div className="relative">
          <button 
            onClick={handleClick} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Click me {count}
          </button>

          <AnimatePresence>
            {showExplosion && (
              <div className="absolute top-1/2 left-1/2">
                {particles.map((particle, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [1, 0],
                      x: particle.x,
                      y: particle.y,
                    }}
                    exit={{ scale: 0, x: 0, y: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        <input 
          placeholder="Enter anything" 
          type="text" 
          className="border-2 border-gray-300 rounded-md p-2 mt-8" 
          value={inputValue} 
          onChange={handleInputChange}
        />

        <p className="text-2xl text-blue-500 font-bold mt-6">
          {inputValue ? (
            <>
              You entered: <br />
              <span className="text-xl text-gray-500">{inputValue}</span>
            </>
          ) : ''}
        </p>
      </motion.div>
    </>
  )
}

export default App
