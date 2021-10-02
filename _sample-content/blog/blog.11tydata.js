const { isDraft, isProductionEnv, isScheduled } = require('../../data/utils')

module.exports = {
  // Without a default value, `md.render(intro)` would throw an error.
  // Besides, a heads-up text like this is more helpful.
  intro: '⚠ *Missing intro text*',

  eleventyComputed: {
    eleventyExcludeFromCollections: (data) =>
      isProductionEnv && (isDraft(data) || isScheduled(data)),
    permalink: (data) =>
      isProductionEnv && (isDraft(data) || isScheduled(data))
        ? false
        : data.permalink,
  },
  layout: 'BlogPost',
}
