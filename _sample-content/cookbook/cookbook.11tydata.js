const { isDraft, isProductionEnv, isScheduled } = require('../../data/utils')

module.exports = {
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) =>
      isProductionEnv && (isDraft(data) || isScheduled(data)),
    permalink: (data) =>
      isProductionEnv && (isDraft(data) || isScheduled(data))
        ? false
        : data.permalink,
  },
  layout: 'cookbook-recipe.pug',
}
