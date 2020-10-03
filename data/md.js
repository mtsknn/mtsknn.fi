const markdownIt = require('markdown-it')

const slugify = require('./slugify')()

const md = markdownIt({ html: true })
  .use(require('markdown-it-anchor'), {
    level: 2,
    permalink: true,
    permalinkAttrs: () => ({
      'aria-hidden': 'true',
      title: 'Link to this section',
    }),

    // `permalinkClass` not set because it would anyway get overridden by the
    // `link-attributes` plugin

    permalinkSpace: false,
    permalinkSymbol: '#',
    slugify,
  })
  .use(require('markdown-it-link-attributes'), [
    {
      pattern: /^#/,
      attrs: {
        class: 'link link-anchor',
      },
    },
    {
      pattern: /^https:\/\/(?!(www\.)?mtsknn\.fi)/,
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
  .use(require('markdown-it-toc-done-right'), {
    level: 2,
    linkClass: 'link',
    slugify,
  })

// Since Pug filters don't support dynamic data (e.g. `:md= post.data.intro`),
// let's instead export the whole `markdown-it` parser. This is also used in the
// 11ty config
module.exports = md
