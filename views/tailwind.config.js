/** @type {import('tailwindcss').Config} */ 
module.exports = { 
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },

  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}", 
  ], 
  theme: { 
    extend: { 
      colors:{ 
        // 'd-lasalle' : '#617A55', 
        // 'l-lasalle' : '#A4D0A4', 
        // 'lasalle-white' : '#D9D9D9', 
        // 'green-upvote' : '#A4D0A4',
        // 'red-downvote' : '#D0A4A4',
        // // 'd-lasalle' : '#617A55', 
        // // 'l-lasalle' : '#A4D0A4', 
        // // 'lasalle-white' : '#D9D9D9' 

        // 'main-background' : '#F4F9F4', // color for the background/body of the pages of the web
        // 'primary-component' : '#5C8D89', // for the navbar,  and/or heading area of sidebar and other components
        // 'accent' : '#A7D7C5', // accent color for the components
        // 'primary-text' : '#74B49B' // used for texts we might want to highlight

        'dark-navy': '#001C30',
        'teal': '#176B87',
        'mint': '#64CCC5',
        'sky': '#DAFFFB',

        'dark-gray': '#1E2022',
        'blue-gray': '#52616B',
        'light-blue-gray': '#C9D6DF',
        'almost-white': '#F0F5F9',

        'dark-green': '#0EA293'
      }, 
    }, 
  }, 
  plugins: [], 
}

