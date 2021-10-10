const { html } = require('htm/preact')

const Base = require('../components/Base')
const Markdown = require('../components/Markdown')
const PostMeta = require('../components/PostMeta')
const { isDraft } = require('../utils')

module.exports = (data) => {
  const {
    collections: { blogPosts },
    content,
    intro,
    title,
  } = data

  return html`
    <${Base} ...${data}>
      <div class="prose xl:prose-lg">
        <h1>${title}</h1>

        <p class="lead">
          <${Markdown} inline>${intro}<//>
        </p>
        <${Markdown}>${content}<//>

        <h2>Coolest blog posts, hot off the press</h2>
        ${blogPosts.map(
          (post, i) => html`
            <article>
              <h3>
                ${isDraft(post.data) &&
                html`
                  <span aria-hidden="true" class="pr-3" title="Draft">✏</span>
                `}
                <a class="link" href=${post.url}>
                  <${Markdown} inline>${post.data.title}<//>
                </a>
              </h3>
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
            ${i !== blogPosts.length - 1 &&
            html`
              <hr aria-hidden="true" />
            `}
          `
        )}
        ${blogPosts.length === 0 &&
        html`
          <p>No blog posts yet. 🤷‍♂️</p>
        `}
      </div>
    <//>
  `
}
