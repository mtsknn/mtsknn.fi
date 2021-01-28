const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const fs = require('fs')

const md = require('./data/md')
const { isDraft, isProductionEnv, isScheduled } = require('./data/utils')
const transformHeadingAnchorLinks = require('./transforms/heading-anchor-links')

module.exports = (config) => {
  config.addCollection('blogPosts', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./content/blog/**/*.md')
      .filter((page) =>
        isProductionEnv ? !(isDraft(page.data) || isScheduled(page.data)) : true
      )
      // Newest first
      .reverse()
      // Drafts first
      .sort((a, b) => {
        if (isDraft(a.data) === isDraft(b.data)) return 0
        return isDraft(a.data) ? -1 : 1
      })
  )
  config.addCollection('blogTags', (collectionApi) => {
    const blogPosts = config.getCollections().blogPosts(collectionApi)
    const tags = new Set(blogPosts.flatMap((item) => item.data.tags || []))
    return [...tags].sort((a, b) =>
      a.localeCompare(b, 'en', { sensitivity: 'accent' })
    )
  })
  config.addCollection('blogPostsWithTag', (collectionApi) => {
    const blogPosts = config.getCollections().blogPosts(collectionApi)
    return (tag) => blogPosts.filter((post) => post.data.tags?.includes(tag))
  })

  config.addCollection('cookbookRecipes', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./content/cookbook/**/*.md')
      .filter((page) =>
        isProductionEnv ? !(isDraft(page.data) || isScheduled(page.data)) : true
      )
      .sort((a, b) => a.data.title.localeCompare(b.data.title, 'en'))
  )

  config.addPassthroughCopy({ './assets/favicon/': '/' })
  config.addPassthroughCopy({ './assets/fonts/': '/fonts/' })
  config.addPassthroughCopy('./content/blog/**/*.png')

  config.addPlugin(pluginSyntaxHighlight, { alwaysWrapLineHighlights: true })

  config.addTransform('heading-anchor-links', transformHeadingAnchorLinks)

  config.setBrowserSyncConfig({
    callbacks: {
      ready(err, browserSync) {
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
