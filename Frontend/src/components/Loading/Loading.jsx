'use client'

import React from 'react'

const Loading= ({height}) => {
  return (
    <div className="loader-container" style={{height:`${height ? "100vh" : ""}`}}>
      <div className="leaf-loader">
        <div className="leaf"></div>
        <div className="leaf"></div>
        <div className="leaf"></div>
      </div>
      <p className="loading-text">Loading natural goodness...</p>

      <style jsx>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          background-color: #f0f4f0;
        }

        .leaf-loader {
          position: relative;
          width: 100px;
          height: 100px;
        }

        .leaf {
          position: absolute;
          width: 50px;
          height: 50px;
          background-color: #4caf50;
          border-radius: 50% 0;
          transform-origin: 100% 100%;
        }

        .leaf:nth-child(1) {
          animation: leafFall 1.5s ease-in-out infinite;
        }

        .leaf:nth-child(2) {
          animation: leafFall 1.5s ease-in-out infinite 0.5s;
        }

        .leaf:nth-child(3) {
          animation: leafFall 1.5s ease-in-out infinite 1s;
        }

        @keyframes leafFall {
          0% {
            transform: rotate(0deg) scale(0);
            opacity: 0.2;
          }
          50% {
            transform: rotate(180deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(360deg) scale(0);
            opacity: 0.2;
          }
        }

        .loading-text {
          margin-top: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 18px;
          color: #2e7d32;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default Loading