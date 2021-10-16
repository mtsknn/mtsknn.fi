const { html } = require('htm/preact')

const Base = require('../components/Base')
const BlogList = require('../components/BlogList')

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
          ${tag}
        </h1>

        <${BlogList}
          headingLevel=${2}
          posts=${collections.blogPostsWithTag(tag)}
        />
      </div>
    <//>
  `
}
