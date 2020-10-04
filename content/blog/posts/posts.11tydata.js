module.exports = {
  // Default to an empty string or `md.render()` will break in many places
  intro: '',

  eleventyComputed: {
    permalink: (data) =>
      data.page.filePathStem.replace('/blog/posts/', '/blog/') + '/',
  },
  layout: 'post.pug',
}
