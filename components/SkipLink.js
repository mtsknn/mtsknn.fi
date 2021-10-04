const clsx = require('clsx')
const { html } = require('htm/preact')

module.exports = ({ children, class: classes = '', href }) => html`
  <div class="absolute z-10">
    <a
      class=${clsx(
        'bg-orange-300 font-bold inline-block rounded sr-only underline !text-black',
        'focus:px-6 focus:py-4 focus:not-sr-only',
        classes
      )}
      href=${href}
    >
      ${children}
    </a>
  </div>
`
