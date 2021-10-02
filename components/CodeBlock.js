const { html } = require('htm/preact')
const Prism = require('prismjs')
const PrismLanguageLoader = require('prismjs/components/index.js')

const entity = require('../utils/entity')

setupPrism()

module.exports = ({ attrs, code, lang }) => {
  return html`
    <!-- Prettier would mess up the indentation with a regular '<pre' -->
    <!--
      'aria-label', 'role' and 'tabindex'
      for keyboard accessibility. 👍
      See https://marcus.io/blog/accessible-overflow

      Not sure if it's a good idea
      to duplicate the 'aria-label'
      across all code blocks on a page...
    -->
    <${'pre'}
      aria-label="Code block"
      class="language-${lang} bg-white border-t border-b max-w-none -mx-6 my-4 relative sm:border sm:mx-0 sm:rounded-md"
      role="region"
      tabindex="0"
    >
      <code class="min-w-full !px-6 py-4 relative sm:!px-5">
        <${LineHighlights} lines=${getLineHighlights(attrs)} />
        <${Code}
          highlightedCode=${highlightCode(code, lang)}
          plainCode=${code}
        />
      </code>
    <//>
  `
}

// Inspiration: https://github.com/11ty/eleventy-plugin-syntaxhighlight/issues/42
function LineHighlights({ lines }) {
  if (lines.length === 0) {
    return null
  }

  // Using `<span>`s instead of `<div>`s
  // because `<div>`s are not allowed inside `<code>`
  return html`
    <span aria-hidden="true" class="absolute -ml-6 select-none w-full sm:-ml-5">
      ${lines.map((isHighlighted) =>
        isHighlighted
          ? html`
              <span
                class="bg-gray-100 block border-gray-300 border-l-6 sm:border-l-4"
              >
                ${entity.nbsp}
              </span>
            `
          : html` <br /> `
      )}
    </span>
  `
}

function Code({ highlightedCode, plainCode }) {
  // Same here:
  // using `<span>`s instead of `<div>`s
  // because `<div>`s are not allowed inside `<code>`
  return html`
    <!--
      The negative margin and padding make it easier to select text with the mouse
      when the code block contains line highlights
    -->
    <span
      class="actual-code inline-block -ml-6 pl-6 relative sm:-ml-5 sm:pl-5"
      dangerouslySetInnerHTML=${highlightedCode && {
        __html: highlightedCode,
      }}
    >
      ${!highlightedCode && plainCode}
    </span>
  `
}

function setupPrism() {
  // Must be loaded before loading the Diff Highlight plugin
  loadPrismLanguage('diff')

  // Disable console logging when attempting to load an invalid language
  // because we'll log ourselves in `loadPrismLanguage()`
  PrismLanguageLoader.silent = true

  // eslint-disable-next-line global-require
  require('prismjs/plugins/diff-highlight/prism-diff-highlight')
}

/**
 * @param {string} lang
 */
function loadPrismLanguage(lang) {
  // Needed for `diff-*` code blocks to work.
  // Without this the first one wouldn't be highlighted but the rest would.
  // Not sure why; maybe I'm using the Diff Highlight plugin incorrectly?
  if (lang.startsWith('diff-')) {
    return Prism.languages.diff
  }

  if (!Prism.languages[lang]) {
    PrismLanguageLoader(lang)
  }

  if (!Prism.languages[lang]) {
    console.error(
      `❗ Unsupported code highlighting language: ${lang}, ${Prism.languages[lang]}`
    )
  }

  return Prism.languages[lang]
}

/**
 * @param {string} code
 * @param {string} lang
 * @returns {string | null}
 */
function highlightCode(code, lang) {
  if (!lang) {
    console.error('❗ Missing language in code block')
    return null
  }

  if (lang === 'text') {
    return null
  }

  try {
    return Prism.highlight(code, loadPrismLanguage(lang), lang)
  } catch (e) {
    console.error(`❗ Error highlighting ${lang} code: ${e}`)
    return null
  }
}

/**
 * @param {string} attributes
 * The attributes of a Markdown code block,
 * i.e. whatever comes after ` ```lang `.
 *
 * @returns {boolean[]}
 * An array of booleans
 * where `true` means a highlighted line
 * and `false` means a regular line.
 * The length of the array
 * equals to the line number of the last highlighted line.
 *
 * @example
 * getLineHighlights('')
 * //=> []
 *
 * @example
 * getLineHighlights('3')
 * //=> [false, false, true]
 *
 * @example
 * getLineHighlights('2,5-7,9')
 * //=> [false, true, false, false, true, true, true, false, true]
 */
function getLineHighlights(attributes) {
  const maxLineNumber = attributes.match(/(\d+)$/)?.[0]

  const highlightedLines = attributes.split(',').flatMap((lineNumbers) => {
    const [from, to] = lineNumbers.split('-').map(Number)
    return to ? range(from, to) : from
  })

  return range(1, maxLineNumber).reduce((lines, lineNumber) => {
    lines.push(highlightedLines.includes(lineNumber))
    return lines
  }, [])
}

/**
 * @param {number} from
 * Start number, inclusive.
 *
 * @param {number} to
 * End number, inclusive.
 *
 * @returns {number[]}
 * An array of integers.
 *
 * @example
 * range(5, 8)
 * //=> [5, 6, 7, 8]
 */
function range(from, to) {
  return Array.from({ length: to - from + 1 }, (_, i) => i + from)
}
