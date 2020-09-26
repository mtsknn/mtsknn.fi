module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ['content/_includes/**/*.pug'],
    options: {
      // `!` added to the regex because of the `tailwindcss-important` plugin
      defaultExtractor: (content) => content.match(/[\w-/:!]+(?<!:)/g) || []
    },
  },
  theme: {
    extend: {},
  },
  variants: {
    padding: ({ after }) => after(['important']),
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-important')(),
  ],
}
