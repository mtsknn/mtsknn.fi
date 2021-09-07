const datetime = require('../../data/datetime')
const md = require('../../data/md')
const site = require('../../data/site')

function getDateTime(date) {
  // Posts don't have publication times (only dates),
  // so let's use a hard-coded time
  return `${datetime.robot(date)}T12:00:00+03:00`
}

module.exports = {
  eleventyComputed: {
    feedUrl: (data) => `${site.url}${data.permalink}`,
  },
  eleventyExcludeFromCollections: true,

  getFullContent(item) {
    return (
      md.render(item.data.intro) +
      md
        .render(item.templateContent)
        .replace(/<a class="link link-permalink".+<\/a>/g, '')
    )
  },
  getFeedUpdatedDate(items) {
    const dates = items
      .flatMap((item) => [item.date, item.data.updated])
      .filter(Boolean)
      .sort((a, b) => b - a)
    return getDateTime(dates[0])
  },
  getPublishedDate(item) {
    return getDateTime(item.date)
  },
  getUpdatedDate(item) {
    return getDateTime(item.data.updated)
  },
}
