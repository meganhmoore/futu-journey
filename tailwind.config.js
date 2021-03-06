module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  important: true,
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#009f77',
      'secondary': '#200a74',
      'futuPink': '#fcd4e1',
      'futuGrey': '#d9d9d9',
      'futuGreen': '#009f77',
      'futuDarkBlue': '#200a74',
      'futuLightBlue': '#cdedfd',
      'futuBrightBlue': '#51d0d3'
    })
  },
  variants: {},
  plugins: [],
}
