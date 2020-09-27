const markdownIt = require('markdown-it')({ html: true })
markdownIt.use(require('markdown-it-link-attributes'), {
  attrs: {
    class: 'link',
  },
})

// Since Pug filters don't support dynamic data (e.g. `:md= post.data.intro`),
// let's instead export the whole `markdown-it` parser. This is also used in the
// 11ty config
module.exports = markdownIt
