const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const fs = require('fs')

const md = require('./data/md')
const { alphabetically, byDate } = require('./data/sort')
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
    return [...tags].sort(alphabetically)
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
      // Newest first
      .reverse()
  )

  config.addCollection('weeklyLogEntries', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./content/weekly-log/**/*.md')
      .filter((page) => (isProductionEnv ? !isScheduled(page.data) : true))
      // Newest first
      .reverse()
  )

  config.addCollection('allContentPages', (collectionApi) => {
    const collections = config.getCollections()

    const blogPosts = collections.blogPosts(collectionApi)
    const cookbookRecipes = collections.cookbookRecipes(collectionApi)
    const weeklyLogEntries = collections.weeklyLogEntries(collectionApi)

    return blogPosts.concat(cookbookRecipes, weeklyLogEntries).sort(byDate)
  })

  config.addPassthroughCopy({ './assets/favicon/': '/' })
  config.addPassthroughCopy({ './assets/fonts/': '/fonts/' })
  config.addPassthroughCopy('./content/**/*.{jpg,jpeg,png}')

  config.addPlugin(pluginSyntaxHighlight, { alwaysWrapLineHighlights: true })

  config.addTransform('heading-anchor-links', transformHeadingAnchorLinks)

  config.setBrowserSyncConfig({
    callbacks: {
      ready(err, browserSync) {
        browserSync.addMiddleware('/weekly-log/2021/', (req, res) => {
          res.writeHead(302, { location: '/weekly-log/#2021' })
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
