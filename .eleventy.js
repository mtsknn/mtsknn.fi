const md = require('./data/md')

module.exports = (config) => {
  config.addCollection('blog_posts', (collection) =>
    [...collection.getFilteredByGlob('./content/blog/**/*.md')].reverse()
  )

  config.addPassthroughCopy({ './assets/favicon/': '/' })

  // "This will likely become the default in an upcoming major version."
  // See https://www.11ty.dev/docs/data-deep-merge/
  config.setDataDeepMerge(true)

  config.setLibrary('md', md)

  return {
    dir: {
      input: 'content',

      // These are relative to the input dir
      data: '../data',
      includes: '../layouts',
    },
  }
}
