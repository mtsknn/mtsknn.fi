const { slugify } = require('../../data/slugify')

module.exports.data = {
  layout: 'BlogTag',
  pagination: {
    data: 'collections.blogTags',
    addAllPagesToCollections: true,
    size: 1,
    alias: 'tag',
  },
  permalink: (data) => `/blog/tags/${slugify(data.tag)}/`,
  eleventyComputed: {
    metaDescription: (data) => `Blog posts tagged with "${data.tag}."`,
    metaTitle: (data) => `${data.tag} blog posts`,
  },
}
