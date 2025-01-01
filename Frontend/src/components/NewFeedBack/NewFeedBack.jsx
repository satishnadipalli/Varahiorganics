'use client'

import React, { useState, useEffect } from 'react'
import { Rating } from "@mui/material"

const NewfeedBack = ({setIsOpen, productId}) => {
  const [rateValue, setrateValue] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const [feedData, setFeedData] = useState({
    user: "",
    profilePhoto: "",
    rateGiven: rateValue,
    feed: ""
  })

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 728)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    // Set isVisible to true after a short delay to trigger the transition
    const timer = setTimeout(() => setIsVisible(true), 50)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
      clearTimeout(timer)
    }
  }, [])

  function handleModel() {
    setIsVisible(false)
    setTimeout(() => setIsOpen(false), 300) // Wait for transition to finish before closing
  }

  function handleDetails(e) {
    const {value, name} = e.target
    setFeedData((previousData) => ({
      ...previousData,
      [name]: value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    feedData.rateGiven = rateValue;
    try {
      const response = await fetch(`https://varahiorganics.onrender.com/addreview/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(feedData)
      })
      if(response.ok) {
        console.log("Your response successfully added")
        handleModel()
      } 
    } catch (error) {
      console.error("Error submitting feedback:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        style={{
            fontFamily:"Manrope-Regular"
        }}
    >
      <div 
        className={`
          bg-white rounded-lg shadow-xl w-full 
          ${isMobile ? 'max-w-full' : 'max-w-md'} 
          p-6 transition-all duration-300 ease-in-out 
          ${isMobile 
            ? `${isVisible ? 'translate-y-0' : 'translate-y-full'} mt-auto`
            : 'translate-y-0'
          }
        `}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Your Rating { <span className="text-4xl ">
              {rateValue === null && "😴"}
              {rateValue === 1 && "😖"}
              {rateValue === 2 && "😣"}
              {rateValue === 3 && "😁"}
              {rateValue === 4 && "😀"}
              {rateValue === 5 && "😍"} 
            </span>}</h2>
           
            <Rating
              name="simple-controlled"
              value={rateValue}
              onChange={(event, newRateValue) => {
                setrateValue(newRateValue);
              }}
              sx={{
                '& .MuiRating-icon': {
                  fontSize: '2.5rem',
                },
                '& .MuiRating-iconFilled': {
                  color: '#FFD700',
                },
                '& .MuiRating-iconHover': {
                  color: '#FFED4A',
                }
              }}
            />
          </div>
          
          <input
            type="text"
            placeholder="Enter your name"
            value={feedData.user}
            onChange={handleDetails}
            name="user"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          
          <textarea
            placeholder="Give some feedback"
            value={feedData.feed}
            onChange={handleDetails}
            name="feed"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none"
            rows={4}
          />
          
          <div className="flex space-x-4">
            <button
              type="button"
              style={{fontFamily:"Manrope-Bold"}}
              onClick={handleModel}
              className="w-1/2 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{fontFamily:"Manrope-Bold"}}
              className="w-1/2 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewfeedBack

