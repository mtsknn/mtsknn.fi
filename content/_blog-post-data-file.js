/*
 * A data file which sets some default values for blog posts
 * and adds support for draft blog posts.
 *
 * ❗ NOTE:
 * The `npm run postinstall` script (automatically run after `npm install`)
 * copies `content/_blog-post-data-file.js` to `content/blog/blog.11tydata.js`,
 * so don't edit the latter -- edit the former and rerun the script.
 *
 * This copying is needed because
 * `content/blog/` is a private Git submodule (see `README.md` for why),
 * so I can't create and save the data file to that folder.
 * Otherwise anyone else wouldn't have access to it.
 */

const { isDraftOrScheduledPost, isProd } = require('../../data/utils')

module.exports = {
  // Default to an empty string or `md.render()` will break in many places
  intro: '',

  eleventyComputed: {
    eleventyExcludeFromCollections: (data) =>
      isProd() && isDraftOrScheduledPost(data),
    permalink: (data) =>
      isProd() && isDraftOrScheduledPost(data) ? false : data.permalink,
  },
  layout: 'post.pug',
  toc: true,
}
