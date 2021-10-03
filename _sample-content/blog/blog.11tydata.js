const { isProductionBuild } = require('../../utils/env')
const { isDraft, isScheduled } = require('../../utils')

module.exports = {
  // Without a default value, `md.render(intro)` would throw an error.
  // Besides, a heads-up text like this is more helpful.
  intro: '⚠ *Missing intro text*',

  eleventyComputed: {
    eleventyExcludeFromCollections: (data) =>
      isProductionBuild && (isDraft(data) || isScheduled(data)),
    permalink: (data) =>
      isProductionBuild && (isDraft(data) || isScheduled(data))
        ? false
        : data.permalink,
  },
  layout: 'BlogPost',
}
