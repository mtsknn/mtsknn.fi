const { html } = require('htm/preact')

const Base = require('../components/Base')
const Markdown = require('../components/Markdown')

module.exports = (data) => {
  const { content, title } = data

  return html`
    <${Base} ...${data}>
      <div class="prose xl:prose-lg">
        <h1>${title}</h1>

        <${Markdown}>${content}<//>

        <!-- https://plausible.io/docs/404-error-pages-tracking -->
        <!-- prettier-ignore -->
        <script>
          window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
          plausible('404', { props: { path: document.location.pathname } })
        </script>
      </div>
    <//>
  `
}
