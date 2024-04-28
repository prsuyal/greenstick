module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'gs-blueish-black' : '#314848',
        'gs-ultralight-green' : '#edf6f0',
        'gs-light-green' : '#87cca1',
        'gs-dark-green' : '#40ac70',
        'gs-grayish-green' : '#acceb3',
        'gs-blueish-green' : '#bbe6c9',
        'gs-dark-gray' : '#828889',
        'gs-light-gray' : '#b8bcbd',
        'gs-sage-green' : '#7c9884'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
