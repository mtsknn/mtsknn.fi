const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItAttrs = require('markdown-it-attrs')
const markdownItFootnote = require('markdown-it-footnote')
const markdownItLinkAttributes = require('markdown-it-link-attributes')

const { slugify } = require('./slugify')

const md = markdownIt({ html: true })
  .use(markdownItAnchor, {
    level: [2, 3],
    permalink: true,
    permalinkSpace: false,
    slugify,

    // `permalinkClass` not set because it would anyway get overridden by the
    // `link-attributes` plugin

    // `permalinkSymbol` not set because the link's contents are replaced by the
    // `heading-anchor-links` transform
  })
  .use(markdownItAttrs)
  .use(markdownItFootnote)
  .use(markdownItLinkAttributes, [
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

// Disable the default `<hr>` and CSS classes
md.renderer.rules.footnote_block_open = () => '<section><ol>'

// Since Pug filters don't support dynamic data (e.g. `:md= post.data.intro`),
// let's instead export the whole `markdown-it` parser. This is also used in the
// 11ty config
module.exports = md
