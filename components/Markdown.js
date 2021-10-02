const { html } = require('htm/preact')

const md = require('../data/md')

module.exports = ({ children, inline = false }) => html`
  <!--
    <markdown> tags are removed when rendering Preact components to HTML.
    Silly React doesn't allow using 'dangerouslySetInnerHTML' with fragments:
    https://github.com/facebook/react/issues/12014
  -->
  <markdown
    dangerouslySetInnerHTML=${{
      __html: md[inline ? 'renderInline' : 'render'](children),
    }}
  />
`
