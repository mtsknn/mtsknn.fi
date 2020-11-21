const datetime = require('../../data/datetime')
const entity = require('../../data/entity')
const md = require('../../data/md')

module.exports = {
  layout: null,
  eleventyExcludeFromCollections: true,

  description:
    'A collection of my wildest adventures involving computers, cats and dragons. 🐱‍🐉',
  title: `Blog ${entity.ndash} Matias Kinnunen`,

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
