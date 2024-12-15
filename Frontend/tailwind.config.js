export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color: {
        'ama-black': 'black',
        'ama-white': 'gray',
        'amazon-back': 'yellow',
        'back' : 'whitesmoke'
      },
      height: {
        '22': '55px',
        '100': '600px',
        '25': '90px',
        '21': '36px',
        '1' : '0.3px'
      },
      border: {
        '1': '1px'
      },
      width: {
        '1': '1px',
        '100': '600px',
        "150" : "635px"
      },
      fontSize: {
        'xs': '10px',
        'sm': '12px',
        'rr': '14px',
        'mm': '19px'
      },
      margin: {
        '100': '440px'
      },
      lineHeight: {
        '3': '3px',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
      },
      screens: {  
        sm: '500px', 
        
      },
      zIndex: {
        '500': 90,
      }
    }
  },
  plugins: [],
}