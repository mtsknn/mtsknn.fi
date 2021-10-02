const { html } = require('htm/preact')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItAttrs = require('markdown-it-attrs')
const markdownItDeflist = require('markdown-it-deflist')
const markdownItFootnote = require('markdown-it-footnote')
const markdownItLinkAttributes = require('markdown-it-link-attributes')
const { render } = require('preact-render-to-string')

const { slugify } = require('./slugify')
const CodeBlock = require('../components/CodeBlock')

const md = markdownIt({
  highlight: (code, lang, attrs) =>
    render(html`<${CodeBlock} attrs=${attrs} code=${code} lang=${lang} />`),
  html: true,
})
  .use(markdownItAnchor, {
    level: [2, 3],
    slugify,

    // The "Link after header" style might be nicer,
    // but styling would probably be difficult before this is implemented:
    // https://github.com/valeriangalliat/markdown-it-anchor/issues/100
    permalink: markdownItAnchor.permalink.headerLink({
      // `class` not set because
      // it would anyway get overridden by the `link-attributes` plugin
    }),
  })
  .use(markdownItAttrs)
  .use(markdownItDeflist)
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
// let's instead export the whole `markdown-it` parser.
// This is also used in the Eleventy config
module.exports = md
