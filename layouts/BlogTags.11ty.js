const { html } = require('htm/preact')

const Base = require('../components/Base')
const { slugify } = require('../utils/slugify')

module.exports = (data) => {
  const { collections, title } = data

  return html`
    <${Base} ...${data}>
      <div class="prose xl:prose-lg">
        <h1 class="text-center">${title}</h1>

        <ul>
          ${collections.blogTags.map((tag) => {
            const count = collections.blogPostsWithTag(tag).length
            const plural = count > 1
            return html`
              <li>
                <a class="link" href=${`/blog/tags/${slugify(tag)}/`}>
                  ${tag} (${count} blog post${plural ? 's' : ''})
                </a>
              </li>
            `
          })}
          ${collections.blogTags.length === 0 && html`<li>No tags yet. 🤷‍♂️</li>`}
        </ul>
      </div>
    <//>
  `
}
