const fs = require('fs')
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const md = require('./data/md')

module.exports = (config) => {
  config.addCollection('blogPosts', (collection) =>
    collection.getFilteredByGlob('./content/blog/**/*.md').reverse()
  )
  config.addCollection('blogTags', (collection) => {
    const tags = new Set(
      collection.getAll().flatMap((item) => item.data.tags || [])
    )
    return [...tags].sort()
  })

  config.addPassthroughCopy({ './assets/favicon/': '/' })

  config.addPlugin(pluginSyntaxHighlight, { alwaysWrapLineHighlights: true })

  config.setBrowserSyncConfig({
    callbacks: {
      ready(err, browserSync) {
        browserSync.addMiddleware('/blog/', (req, res) => {
          res.writeHead(302, { location: '/' })
          res.end()
        })

        // Provides the 404 content without redirect. Source:
        // https://github.com/11ty/eleventy-base-blog/blob/v5.0.2/.eleventy.js#L56-L64
        const notFoundContent = fs.readFileSync('./_site/404.html')
        browserSync.addMiddleware('*', (req, res) => {
          res.write(notFoundContent)
          res.end()
        })
      },
    },
    files: './_site/main.css',
    ghostMode: false,
    ui: false,

    /* Uncomment this to create a public URL (`something.loca.lt`); useful when
     * testing with mobile devices */
    // tunnel: true,
  })

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
