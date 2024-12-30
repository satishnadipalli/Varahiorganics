import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
        />
      ))}
      <motion.div
        className="absolute mb-56"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" fill="#F0F0F0" />
          <circle cx="50" cy="50" r="35" fill="#E0E0E0" />
          <circle cx="40" cy="40" r="5" fill="#C0C0C0" />
          <rect x="45" y="60" width="10" height="20" fill="#A0A0A0" />
          <rect x="40" y="80" width="20" height="5" fill="#A0A0A0" />
        </svg>
      </motion.div>
      <h1 className="text-6xl font-bold mb-4 mt-16">404</h1>
      <p className="text-2xl mb-8">Oops! You seem to be lost in space.</p>
      <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
        Return to Earth
      </Link>
    </div>
  )
}

