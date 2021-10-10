const { html } = require('htm/preact')

const Base = require('../components/Base')
const Markdown = require('../components/Markdown')

module.exports = (data) => {
  const { content, intro, title, year } = data

  return html`
    <${Base} ...${data}>
      <article class="prose xl:prose-lg">
        <div class="max-w-none">
          <h1>
            <${Markdown} inline>${title}<//>
            <span class="text-gray-500">${` (${year})`}</span>
          </h1>
        </div>

        <p class="lead">
          <${Markdown} inline>${intro}<//>
        </p>

        <hr aria-hidden="true" />

        <${Markdown}>${content}<//>
      </article>
    <//>
  `
}
