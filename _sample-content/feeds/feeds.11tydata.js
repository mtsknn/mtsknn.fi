const datetime = require('../../data/datetime')
const md = require('../../data/md')

module.exports = {
  eleventyExcludeFromCollections: true,

  getFullContent(post) {
    return (
      md.render(post.data.intro) +
      post.templateContent.replace(/<a class="link link-permalink".+<\/a>/g, '')
    )
  },
  getPublishedDate(post) {
    // Blog posts don't have publication times, so let's use a hard-coded value
    return `${datetime.robot(post.date)}T12:00:00+03:00`
  },
}
