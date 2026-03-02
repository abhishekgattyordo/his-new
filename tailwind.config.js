// // tailwind.config.js
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "./app/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: '#f0fdf4',
//           100: '#dcfce7',
//           200: '#bbf7d0',
//           300: '#86efac',
//           400: '#4ade80',
//           500: '#22c55e',
//           600: '#16a34a',  // your main green
//           700: '#15803d',
//           800: '#166534',
//           900: '#14532d',
//         },
//       },
//     },
//   },
//   plugins: [],
// }


// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',  // your main green
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
    },
  },
  plugins: [],
}


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',  // your main green
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Status colors for beds
        status: {
          available: '#10b981',   // green
          occupied: '#3b82f6',     // blue
          cleaning: '#f59e0b',     // amber
          maintenance: '#6b7280',  // gray
          reserved: '#8b5cf6',     // purple
        },
      },
      // Border colors for left border indicator
      borderColor: {
        'status-available': '#10b981',
        'status-occupied': '#3b82f6',
        'status-cleaning': '#f59e0b',
        'status-maintenance': '#6b7280',
        'status-reserved': '#8b5cf6',
      },
      // Background colors for badges (if needed)
      backgroundColor: {
        'status-available': '#10b981',
        'status-occupied': '#3b82f6',
        'status-cleaning': '#f59e0b',
        'status-maintenance': '#6b7280',
        'status-reserved': '#8b5cf6',
      },
      // Animation for recently changed beds
      keyframes: {
        'pulse-status': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
      },
      animation: {
        'pulse-status': 'pulse-status 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};