const { isProductionBuild } = require('../utils/env')
const { alphabetically, byDate } = require('../utils/sort')
const { isDraft, isScheduled } = require('../utils/utils')

module.exports = (config) => {
  config.addCollection('blogPosts', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./content/blog/**/*.md')
      .filter((page) =>
        isProductionBuild
          ? !(isDraft(page.data) || isScheduled(page.data))
          : true
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

  config.addCollection('weeklyLogEntries', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./content/weekly-log/**/*.md')
      .filter((page) => (isProductionBuild ? !isScheduled(page.data) : true))
      // Newest first
      .reverse()
  )

  config.addCollection('allContentPages', (collectionApi) => {
    const collections = config.getCollections()

    const blogPosts = collections.blogPosts(collectionApi)
    const weeklyLogEntries = collections.weeklyLogEntries(collectionApi)

    return blogPosts.concat(weeklyLogEntries).sort(byDate)
  })
}
