const { html } = require('htm/preact')

const Base = require('../components/Base')
const Markdown = require('../components/Markdown')
const PostMeta = require('../components/PostMeta')
const TableOfContents = require('../components/TableOfContents')

module.exports = (data) => {
  const { content, intro, page, tags, title, updated } = data

  return html`
    <${Base} ...${data}>
      <article class="prose xl:prose-lg">
        <div class="max-w-none text-center">
          <h1 class="!mb-6">
            <${Markdown} inline>${title}<//>
          </h1>
          <${PostMeta} date=${page.date} updated=${updated} tags=${tags} />
        </div>

        <p class="lead">
          <${Markdown} inline>${intro}<//>
        </p>

        <hr aria-hidden="true" />

        <${TableOfContents} markdown=${content} />
        <${Markdown}>${content}<//>
      </article>
    <//>
  `
}
