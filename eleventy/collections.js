const { isDraft, isScheduled } = require('../utils')
const { isProductionBuild } = require('../utils/env')
const { alphabetically } = require('../utils/sort')

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

  config.addCollection('projects', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./content/projects/**/*.md')
      // Newest first
      .reverse()
  )
}
