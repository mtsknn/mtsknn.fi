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
    extend: {
      colors: {
        // `cool-gray` colors borrowed from `@tailwindcss/ui`. These seem to be
        // better from accessibility perspective (easier to get high enough
        // contrasts)
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cfd8e3',
          400: '#97a6ba',
          500: '#64748b',
          600: '#475569',
          700: '#364152',
          800: '#27303f',
          900: '#1a202e',
        },
      },
    },
    typography: (theme) => ({
      default: {
        css: {
          'pre code::before': {
            // The default (empty string) is unnecessary
            content: 'none',
          },
          'pre code::after': {
            // The default (empty string) causes an empty line at the end of the
            // code block
            content: 'none',
          },

          // Overwrite all colors since we have modified the gray palette
          color: theme('colors.gray.700'),
          '[class~="lead"]': {
            color: theme('colors.gray.700'),
          },
          a: {
            color: theme('colors.gray.900'),
          },
          strong: {
            color: theme('colors.gray.900'),
          },
          'ol > li::before': {
            color: theme('colors.gray.500'), // The default is 600 but too dark
          },
          'ul > li::before': {
            backgroundColor: theme('colors.gray.400'),
          },
          hr: {
            borderColor: theme('colors.gray.300'),
          },
          blockquote: {
            color: theme('colors.gray.900'),
            borderLeftColor: theme('colors.gray.300'),
          },
          h1: {
            color: theme('colors.gray.900'),
          },
          h2: {
            color: theme('colors.gray.900'),
          },
          h3: {
            color: theme('colors.gray.900'),
          },
          h4: {
            color: theme('colors.gray.900'),
          },
          'figure figcaption': {
            color: theme('colors.gray.600'),
          },
          code: {
            color: theme('colors.gray.900'),
          },
          pre: {
            color: theme('colors.gray.100'), // The default is 300 but too dark
            backgroundColor: theme('colors.gray.800'),
          },
          thead: {
            color: theme('colors.gray.900'),
            borderBottomColor: theme('colors.gray.400'),
          },
          'tbody tr': {
            borderBottomColor: theme('colors.gray.300'),
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
