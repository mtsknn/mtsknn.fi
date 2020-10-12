const markdownIt = require('markdown-it')

const slugify = require('./slugify')()

const md = markdownIt({ html: true })
  .use(require('markdown-it-anchor'), {
    level: 2,
    permalink: true,
    permalinkSpace: false,
    slugify,

    // `permalinkClass` not set because it would anyway get overridden by the
    // `link-attributes` plugin

    // `permalinkSymbol` not set because the link's contents are replaced by the
    // `heading-anchor-links` transform
  })
  .use(require('markdown-it-link-attributes'), [
    {
      pattern: /^#/,
      attrs: {
        class: 'link link-anchor',
      },
    },
    {
      pattern: /^https?:\/\/(?!mtsknn\.fi)/,
      attrs: {
        class: 'link link-external',
      },
    },
    {
      attrs: {
        class: 'link',
      },
    },
  ])

// Since Pug filters don't support dynamic data (e.g. `:md= post.data.intro`),
// let's instead export the whole `markdown-it` parser. This is also used in the
// 11ty config
module.exports = md
