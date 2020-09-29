module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ['./_site/**/*.html'],
    options: {
      // `!` added to the regex because of the `tailwindcss-important` plugin
      defaultExtractor: (content) => content.match(/[\w-/:!]+(?<!:)/g) || []
    },
  },
  theme: {
    typography: (theme) => ({
      default: {
        css: {
          'ul > li::before': {
            backgroundColor: theme('colors.gray.500'),
          },
        },
      },
    }),
  },
  variants: {
    margin: ({ after }) => after(['important']),
    padding: ({ after }) => after(['important']),
    textColor: ({ after }) => after(['active']),
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-important')(),
  ],
}
