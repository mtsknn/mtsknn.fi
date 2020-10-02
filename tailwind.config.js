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
          // The default (`colors.gray.700`) is IMO a bit too light
          color: theme('colors.gray.800'),

          'ul > li::before': {
            // The default (`colors.gray.400`) is also a bit too light
            backgroundColor: theme('colors.gray.500'),
          },
          'pre code::before': {
            // Unnecessary
            content: 'none',
          },
          'pre code::after': {
            // Causes an empty line at the end of the code block
            content: 'none',
          },
        },
      },
    }),
  },
  variants: {
    fontSize: ({ after }) => after(['important']),
    margin: ({ after }) => after(['important']),
    padding: ({ after }) => after(['important']),
    textColor: ({ after }) => after(['active', 'important']),
    width: ({ after }) => after(['important']),
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-important')(),
  ],
}
