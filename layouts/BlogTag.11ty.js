const { html } = require('htm/preact')

const Base = require('../components/Base')
const Markdown = require('../components/Markdown')
const datetime = require('../utils/datetime')

module.exports = (data) => {
  const { collections, tag } = data

  return html`
    <${Base} ...${data}>
      <div class="mt-6 prose xl:prose-lg">
        <h1 aria-label=${`Blog posts tagged with ${tag}`}>
          <span
            aria-hidden="true"
            class="block font-bold mb-2 text-gray-500 text-xl xl:mb-4 xl:text-2xl"
          >
            Blog posts tagged with${' '}
          </span>
          <span class="block">${tag}</span>
        </h1>

        <ol>
          ${collections.blogPostsWithTag(tag).map(
            (post) => html`
              <li>
                <a class="link" href=${post.url}>
                  <${Markdown} inline>${post.data.title}<//>
                </a>
                <span class="whitespace-no-wrap">
                  ${' ('}
                  <span class="sr-only">published on${' '}</span>
                  ${datetime.human(post.date)})
                </span>
              </li>
            `
          )}
        </ol>
      </div>
    <//>
  `
}
