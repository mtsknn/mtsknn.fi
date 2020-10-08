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
        // All colors have been overwritten since we have modified the gray
        // palette. The order of the object keys is the same as in the source:
        // https://github.com/tailwindlabs/tailwindcss-typography/blob/v0.2.0/src/styles.js
        css: {
          color: theme('colors.gray.700'),
          maxWidth: null,
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
            fontWeight: null,
            fontStyle: null,
            color: theme('colors.gray.900'),
            borderLeftColor: theme('colors.gray.300'),
          },
          'blockquote p:first-of-type::before': {
            content: null,
          },
          'blockquote p:last-of-type::after': {
            content: null,
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
            fontWeight: null,

            backgroundColor: theme('colors.gray.200'),
            borderRadius: theme('borderRadius.default'),
            padding: `${theme('padding.px')} ${theme('padding.1')}`,
            whiteSpace: 'break-spaces',
          },
          'code::before': {
            content: null,
          },
          'code::after': {
            content: null,
          },
          pre: {
            color: theme('colors.gray.100'), // The default is 300 but too dark
            backgroundColor: theme('colors.gray.800'),
          },
          'pre code': {
            whiteSpace: 'pre',
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
    debugScreens: {
      position: ['bottom', 'right'],
    },
  },
  // https://tailwindcss.com/docs/configuring-variants#ordering-variants
  // https://tailwindcss.com/docs/configuring-variants#default-variants-reference
  variants: {
    fontSize: ({ after }) => after(['important']),
    margin: ({ after }) => after(['important']),
    padding: ({ after }) => after(['focus', 'important']),
    textColor: ({ after }) => after(['active', 'important']),
    width: ({ after }) => after(['important']),
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-important')(),
    process.env.NODE_ENV === 'development'
      && require('tailwindcss-debug-screens'),
  ],
}
