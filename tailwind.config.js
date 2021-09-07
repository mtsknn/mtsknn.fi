/* eslint-disable global-require */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  experimental: {
    applyComplexClasses: true,
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-important')(),
    process.env.NODE_ENV === 'development' &&
      // eslint-disable-next-line import/no-extraneous-dependencies
      require('tailwindcss-debug-screens'),
  ],
  purge: {
    content: ['./_site/**/*.html'],
    options: {
      // `!` added to the regex because of the `tailwindcss-important` plugin
      defaultExtractor: (content) => content.match(/[\w-/:!]+(?<!:)/g) || [],
    },
  },
  theme: {
    debugScreens: {
      position: ['bottom', 'right'],
    },
    extend: {
      borderWidth: {
        6: '6px',
      },
      colors: {
        // `cool-gray` colors borrowed from `@tailwindcss/ui`. These seem to be
        // better from accessibility perspective (easier to get high enough
        // contrasts). See e.g. https://tailwindui.com/documentation
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
        // `indigo` colors also from `@tailwindcss/ui`. These look yummier
        indigo: {
          50: '#f0f5ff',
          100: '#e5edff',
          200: '#cddbfe',
          300: '#b4c6fc',
          400: '#8da2fb',
          500: '#6875f5',
          600: '#5850ec',
          700: '#5145cd',
          800: '#42389d',
          900: '#362f78',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
        sans: ['"Inter var experimental"', ...defaultTheme.fontFamily.sans],
      },
    },
    typography: (theme) => ({
      default: {
        // All gray colors have been overwritten since we have modified the gray
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

            backgroundColor: theme('colors.white'),
            borderRadius: theme('borderRadius.lg'),
            display: 'inline-block',
            lineHeight: theme('lineHeight.relaxed'),
            paddingLeft: theme('padding.1'),
            paddingRight: theme('padding.1'),
            borderWidth: theme('borderWidth.default'),
          },
          'code::before': {
            content: null,
          },
          'code::after': {
            content: null,
          },
          pre: {
            color: null,
            backgroundColor: null,
            borderRadius: null,
            marginTop: null,
            marginBottom: null,
            paddingTop: null,
            paddingRight: null,
            paddingBottom: null,
            paddingLeft: null,
          },
          'pre code': {
            padding: null,
            whiteSpace: 'pre',
          },
          'pre code::before': {
            content: null,
          },
          'pre code::after': {
            content: null,
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
      sm: {
        css: {
          pre: {
            borderRadius: null,
            marginTop: null,
            marginBottom: null,
            paddingTop: null,
            paddingRight: null,
            paddingBottom: null,
            paddingLeft: null,
          },
        },
      },
      lg: {
        css: {
          pre: {
            borderRadius: null,
            marginTop: null,
            marginBottom: null,
            paddingTop: null,
            paddingRight: null,
            paddingBottom: null,
            paddingLeft: null,
          },
        },
      },
      xl: {
        css: {
          pre: {
            borderRadius: null,
            marginTop: null,
            marginBottom: null,
            paddingTop: null,
            paddingRight: null,
            paddingBottom: null,
            paddingLeft: null,
          },
        },
      },
      '2xl': {
        css: {
          pre: {
            borderRadius: null,
            marginTop: null,
            marginBottom: null,
            paddingTop: null,
            paddingRight: null,
            paddingBottom: null,
            paddingLeft: null,
          },
        },
      },
    }),
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
}
