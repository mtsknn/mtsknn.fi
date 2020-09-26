module.exports = (config) => {
  config.addCollection('blog_posts', (collection) =>
    [...collection.getFilteredByGlob('./content/blog/**/*.md')].reverse()
  )

  config.addPassthroughCopy({ './assets/favicon/': '/' })

  return {
    dir: { input: 'content' },
  }
}
