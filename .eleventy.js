const fs = require('fs')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const md = require('./data/md')

module.exports = (config) => {
  config.addCollection('blog_posts', (collection) =>
    [...collection.getFilteredByGlob('./content/blog/**/*.md')].reverse()
  )

  config.addPassthroughCopy({ './assets/favicon/': '/' })

  config.addPlugin(syntaxHighlight, { alwaysWrapLineHighlights: true })

  config.setBrowserSyncConfig({
    callbacks: {
      // This nifty code was copied from here:
      // https://github.com/11ty/eleventy-base-blog/blob/v5.0.2/.eleventy.js#L56-L64
      ready(err, browserSync) {
        const notFoundContent = fs.readFileSync('./_site/404.html')

        // Provides the 404 content without redirect
        browserSync.addMiddleware('*', (req, res) => {
          res.write(notFoundContent)
          res.end()
        })
      },
    },
    files: './_site/main.css',
    ghostMode: false,
    open: true,
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
