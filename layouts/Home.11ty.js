const { ArrowNarrowRightIcon } = require('@heroicons/react/solid')
const { html } = require('htm/preact')

const Base = require('../components/Base')
const BlogList = require('../components/BlogList')
const Markdown = require('../components/Markdown')
const { isDraft } = require('../utils')

module.exports = async (data) => {
  const {
    collections: { blogPosts },
    content,
    intro,
    title,
  } = data

  const latestBlogPosts = blogPosts
    .filter((post) => !isDraft(post.data))
    .slice(0, 3)

  const recentlyUpdatedBlogPosts = blogPosts
    .filter((post) => !isDraft(post.data))
    .filter((post) => !latestBlogPosts.includes(post))
    .filter((post) => post.data.updated)
    .sort((a, b) => b.data.updated - a.data.updated)
    .slice(0, 3)

  return html`
    <${Base} ...${data}>
      <div class="prose xl:prose-lg">
        <h1>${title}</h1>

        <div class="lead">
          <${Markdown}>${intro}<//>
        </div>
        <${Markdown}>${content}<//>

        <hr aria-hidden="true" />

        <h2>Latest blog posts</h2>
        <${BlogList} headingLevel=${3} posts=${latestBlogPosts} />

        <hr aria-hidden="true" />

        ${recentlyUpdatedBlogPosts.length > 0 &&
        html`
          <h2>Recently updated blog posts</h2>
          <${BlogList} headingLevel=${3} posts=${recentlyUpdatedBlogPosts} />

          <hr aria-hidden="true" />
        `}

        <aside>
          <p class="!mb-3">
            <a class="link" href="/blog/">
              All blog posts
              <${ArrowNarrowRightIcon}
                aria-hidden="true"
                class="inline ml-2 text-gray-500"
                style=${{ width: '1.25rem' }}
              />
            </a>
          </p>
        </aside>
      </div>
    <//>
  `
}
