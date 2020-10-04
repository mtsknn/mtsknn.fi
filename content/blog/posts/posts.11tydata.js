const { isDraftOrScheduledPost, isProd } = require('../../../data/utils');

module.exports = {
  // Default to an empty string or `md.render()` will break in many places
  intro: '',

  eleventyComputed: {
    eleventyExcludeFromCollections: (data) =>
      isProd() && isDraftOrScheduledPost(data),
    permalink: (data) =>
      isProd() && isDraftOrScheduledPost(data)
        ? false
        : data.page.filePathStem.replace('/blog/posts/', '/blog/') + '/',
  },
  layout: 'post.pug',
}
