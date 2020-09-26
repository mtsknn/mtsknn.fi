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
    extend: {},
  },
  variants: {
    margin: ({ after }) => after(['important']),
    padding: ({ after }) => after(['important']),
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-important')(),
  ],
}
