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
      </div>
    <//>
  `
}
