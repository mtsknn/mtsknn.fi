const { html } = require('htm/preact')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItAttrs = require('markdown-it-attrs')
const markdownItDeflist = require('markdown-it-deflist')
const markdownItFootnote = require('markdown-it-footnote')
const markdownItLinkAttributes = require('markdown-it-link-attributes')
const { render } = require('preact-render-to-string')

const slugify = require('./slugify')
const CodeBlock = require('../components/CodeBlock')

const md = markdownIt({
  highlight: (code, lang, attrs) =>
    render(
      html`
        <${CodeBlock} attrs=${attrs} code=${code} lang=${lang} />
      `
    ),
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

// Original:
// https://github.com/markdown-it/markdown-it-footnote/blob/3.0.3/index.js#L29-L39
md.renderer.rules.footnote_ref = (tokens, idx, options, env, slf) => {
  const id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)
  const caption = slf.rules.footnote_caption(tokens, idx, options, env, slf)
  let refid = id

  if (tokens[idx].meta.subId > 0) {
    refid += ':' + tokens[idx].meta.subId
  }

  return render(html`
    <sup>
      <a
        aria-label=${`footnote ${id}`}
        class="link"
        href=${`#fn-${id}`}
        id=${`fnref-${refid}`}
      >
        ${caption}
      </a>
    </sup>
  `)
}

// Original:
// https://github.com/markdown-it/markdown-it-footnote/blob/3.0.3/index.js#L41-L45
md.renderer.rules.footnote_block_open = () => `
  <hr aria-hidden="true">
  <section aria-label="Footnotes">
    <h2 class="!text-base !text-gray-700 tracking-widest uppercase xl:!text-lg">
      Footnotes
    </h2>
    <ol>
`

// Original:
// https://github.com/markdown-it/markdown-it-footnote/blob/3.0.3/index.js#L51-L59
md.renderer.rules.footnote_open = (tokens, idx, options, env, slf) => {
  let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)

  if (tokens[idx].meta.subId > 0) {
    id += ':' + tokens[idx].meta.subId
  }

  return `<li id="${`fn-${id}`}">`
}

// Original:
// https://github.com/markdown-it/markdown-it-footnote/blob/3.0.3/index.js#L65-L74
md.renderer.rules.footnote_anchor = (tokens, idx, options, env, slf) => {
  let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf)

  if (tokens[idx].meta.subId > 0) {
    id += ':' + tokens[idx].meta.subId
  }

  return render(
    html`
      ${' '}
      <a
        aria-label="Back to reference"
        class="font-mono link"
        href=${`#fnref-${id}`}
      >
        <!--
          Without the 'font-mono' class
          this would look like an emoji instead of a Unicode symbol
          at least in Chrome on Windows
        -->
        ↩
      </a>
    `
  )
}

module.exports = md
