const { html } = require('htm/preact')

const Markdown = require('./Markdown')
const PostMeta = require('./PostMeta')
const { isDraft } = require('../utils')

module.exports = ({ headingLevel, posts }) => {
  if (posts.length === 0) {
    return html`
      <p>No blog posts yet. 🤷‍♂️</p>
    `
  }

  return posts.map(
    (post) => html`
      <article>
        <!-- h3 styles, even if h2 -->
        <${`h${headingLevel}`} class="!text-xl xl:!text-2xl">
          ${isDraft(post.data) &&
          html`
            <span aria-hidden="true" class="pr-3" title="Draft">✏</span>
          `}
          <a class="link" href=${post.url}>
            <${Markdown} inline>${post.data.title}<//>
          </a>
        <//>
        <div class="text-sm xl:text-base">
          <${PostMeta}
            date=${post.date}
            updated=${post.data.updated}
            tags=${post.data.tags}
          />
        </div>
        <p>
          <${Markdown} inline>${post.data.intro}<//>
        </p>
      </article>
    `
  )
}
