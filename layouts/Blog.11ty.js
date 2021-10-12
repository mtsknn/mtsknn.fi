const { html } = require('htm/preact')

const Base = require('../components/Base')
const BlogList = require('../components/BlogList')
const Markdown = require('../components/Markdown')

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
        <${BlogList} posts=${blogPosts} />
      </div>
    <//>
  `
}
