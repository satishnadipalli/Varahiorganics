import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import Rating from '@mui/material/Rating'; 
import Typography from '@mui/material/Typography';

// import React, { useState } from 'react'
// import { Rating } from "@mui/material"

const NewfeedBack = ({setIsOpen, productId}) => {
    const [rateValue, setrateValue] = useState(null)
    
    const [feedData, setFeedData] = useState({
        user: "",
        profilePhoto: "",
        rateGiven: rateValue,
        feed: ""
    })

    console.log(rateValue)

    function handleModel() {
      setIsOpen(false)
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
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
                                    fontSize: '2.5rem',  // Increase this value to make stars bigger
                                },
                                '& .MuiRating-iconFilled': {
                                    color: '#FFD700',  // Gold color for filled stars
                                },
                                '& .MuiRating-iconHover': {
                                    color: '#FFED4A',  // Lighter gold color on hover
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
                            onClick={handleModel}
                            className="w-1/2 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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



    