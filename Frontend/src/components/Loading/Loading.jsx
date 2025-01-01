// 'use client'

// import React from 'react'

// const Loading= ({height}) => {
//   return (
//     <div className="loader-container" style={{height:`${height ? "100vh" : ""}`}}>
//       <div className="leaf-loader">
//         <div className="leaf"></div>
//         <div className="leaf"></div>
//         <div className="leaf"></div>
//       </div>
//       <p className="loading-text">Loading natural goodness...</p>

//       <style jsx>{`
//         .loader-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           min-height: 80vh;
//           background-color: #f0f4f0;
//         }

//         .leaf-loader {
//           position: relative;
//           width: 100px;
//           height: 100px;
//         }

//         .leaf {
//           position: absolute;
//           width: 50px;
//           height: 50px;
//           background-color: #4caf50;
//           border-radius: 50% 0;
//           transform-origin: 100% 100%;
//         }

//         .leaf:nth-child(1) {
//           animation: leafFall 1.5s ease-in-out infinite;
//         }

//         .leaf:nth-child(2) {
//           animation: leafFall 1.5s ease-in-out infinite 0.5s;
//         }

//         .leaf:nth-child(3) {
//           animation: leafFall 1.5s ease-in-out infinite 1s;
//         }

//         @keyframes leafFall {
//           0% {
//             transform: rotate(0deg) scale(0);
//             opacity: 0.2;
//           }
//           50% {
//             transform: rotate(180deg) scale(1);
//             opacity: 1;
//           }
//           100% {
//             transform: rotate(360deg) scale(0);
//             opacity: 0.2;
//           }
//         }

//         .loading-text {
//           margin-top: 20px;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           font-size: 18px;
//           color: #2e7d32;
//           animation: pulse 1.5s ease-in-out infinite;
//         }

//         @keyframes pulse {
//           0%, 100% {
//             opacity: 0.6;
//           }
//           50% {
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default Loading



import React from 'react'
// import { SunspotLoader } from "react-awesome-loaders";

const Loading= ({height}) => {
  return (
    <div className="loader-container " style={{height:`${height ? "100vh" : "100vh"}`,backgroundColor:"white",minHeight:"70vh",overflow:"hidden"}}>
      {/* <div className="leaf-loader"> */}
        <div class="loader"></div>
      {/* </div> */}
      <style jsx>{`
      .loader-container{
        background-color:"white" !important;
      }
        .loader {
        position: relative;
        width: 2.5em;
        height: 2.5em;
        transform: rotate(165deg);
        }
  

        .loader:before, .loader:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 0.5em;
        height: 0.5em;
        border-radius: 0.25em;
        transform: translate(-50%, -50%);
        }

        .loader:before {
        animation: before8 2s infinite;
        }

        .loader:after {
        animation: after6 2s infinite;
        }

        @keyframes before8 {
        0% {
          width: 0.5em;
          box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
        }

        35% {
          width: 2.5em;
          box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
        }

        70% {
          width: 0.5em;
          box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
        }

        100% {
          box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
        }
        }

        @keyframes after6 {
        0% {
          height: 0.5em;
          box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
        }

        35% {
          height: 2.5em;
          box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
        }

        70% {
          height: 0.5em;
          box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
        }

        100% {
          box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
        }
        }

        .loader {
        position: absolute;
        top: calc(50% - 1.25em);
        left: calc(50% - 1.25em);
        }
      `}</style>
    </div>
  )
}

export default Loading