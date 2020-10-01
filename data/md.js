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
    permalinkClass: 'link link-permalink',
    permalinkSpace: false,
    permalinkSymbol: '#',
    slugify,
  })
  .use(require('markdown-it-link-attributes'), [
    {
      pattern: /^https:\/\/(?!(www\.)?mtsknn\.fi)/,
      attrs: {
        class: 'link link-external',
      },
    },
    {
      // Skip the permalink links created by the `markdown-it-anchor` and
      // `markdown-it-toc-done-right` plugins because those plugins have their
      // own similar options (and the values may be different)
      pattern: /^[^#]/,
      attrs: {
        class: 'link',
      },
    }
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
