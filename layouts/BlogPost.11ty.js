const { html } = require('htm/preact')

const Base = require('../components/Base')
const Markdown = require('../components/Markdown')
const PostMeta = require('../components/PostMeta')
const TableOfContents = require('../components/TableOfContents')

module.exports = (data) => {
  const {
    collections: { blogPosts },
    content,
    intro,
    page,
    tags,
    title,
    updated,
  } = data

  const currentPostIndex = blogPosts.findIndex(({ url }) => url === page.url)
  const nextPost = blogPosts[currentPostIndex - 1]
  const previousPost = blogPosts[currentPostIndex + 1]

  return html`
    <${Base} ...${data}>
      <article class="prose xl:prose-lg">
        <div class="max-w-none">
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

      <aside class="prose xl:prose-lg">
        <hr aria-hidden="true" class="!mt-12" />

        <ul>
          ${nextPost &&
          html`
            <li>
              <em>Next blog post:</em>
              ${' '}
              <a class="link" href=${nextPost.url}>
                <${Markdown} inline>${nextPost.data.title}<//>
              </a>
            </li>
          `}
          ${previousPost &&
          html`
            <li>
              <em>Previous blog post:</em>
              ${' '}
              <a class="link" href=${previousPost.url}>
                <${Markdown} inline>${previousPost.data.title}<//>
              </a>
            </li>
          `}
        </ul>
      </aside>
    <//>
  `
}
