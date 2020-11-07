const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const fs = require('fs')

const md = require('./data/md')
const { isDraftOrScheduledPost, isProd } = require('./data/utils')
const transformHeadingAnchorLinks = require('./transforms/heading-anchor-links')

module.exports = (config) => {
  config.addCollection('blogPosts', (collections) =>
    collections
      .getFilteredByGlob('./content/blog/**/*.md')
      .filter((page) => isProd() ? !isDraftOrScheduledPost(page.data) : true)
      .reverse()
  )
  config.addCollection('blogTags', (collections) => {
    const tags = new Set(
      collections.getAll().flatMap((item) => item.data.tags || [])
    )
    return [...tags].sort((a, b) =>
      a.localeCompare(b, 'en', { sensitivity: 'accent' })
    )
  })

  config.addPassthroughCopy({ './assets/favicon/': '/' })

  /* TODO: This works only for this single blog post.
   * Relevant issue: <https://github.com/11ty/eleventy/issues/1140>.
   * So there are basically two options:
   * • Create a JS script which copies images to the correct folders
   *   • Unnecessarily complex solution?
   * • Adapt to Eleventy's default behavior as much as possible, i.e.:
   *   • Modify the folder structure to remove the need for custom permalinks
   *     • Move files in `content/blog/feeds/` to e.g. `content/blog-feeds/`
   *     • Move files in `content/blog/tags/` to e.g. `content/blog-tags/`
   *     • Copy the contents of `_template.md` and `posts.11tydata.js` to the readme
   *       because the files will now be in the private Git submodule
   *   • Use the standard `addPassthroughCopy` for all images
   * The second option seems better
   */
  config.addPassthroughCopy({
    './content/**/*.png': '/blog/episerver-how-to-change-contents-modified-date-programmatically/'
  })

  config.addPlugin(pluginSyntaxHighlight, { alwaysWrapLineHighlights: true })

  config.addTransform('heading-anchor-links', transformHeadingAnchorLinks)

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
