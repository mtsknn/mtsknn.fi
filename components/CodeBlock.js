const hljs = require('highlight.js')
const { html } = require('htm/preact')

const entity = require('../data/entity')

module.exports = ({ attrs, code, lang }) => {
  let highlightedCode

  if (lang && hljs.getLanguage(lang)) {
    try {
      highlightedCode = hljs.highlight(code, { language: lang }).value
    } catch {
      console.error(`⚠ Error highlighting ${lang} code:\n${code}`)
    }
  } else {
    console.error(`⚠ Unsupported code highlighting language: ${lang}`)
  }

  return html`
    <!--
      Needed by markdown-it;
      if this doesn't start with '<pre',
      markdown-it will wrap the return value in its own <pre> tag 🙄
    -->
    <pre class="hidden"></pre>

    <div
      class="bg-gray-100 border-t border-b max-w-none -mx-6 my-4 relative sm:border sm:mx-0 sm:rounded-md"
    >
      <${LineHighlights} lines=${getLineHighlights(attrs)} />

      <!-- Hack: Prettier would misbehave with a regular '<pre' -->
      <${'pre'} class="hljs px-6 py-4 relative sm:px-5">
        <code
          class="inline-block min-w-full"
          dangerouslySetInnerHTML=${highlightedCode && {
            __html: highlightedCode,
          }}
        >
          ${!highlightedCode && code}
        </code>
      <//>
    </div>
  `
}

// Inspiration: https://github.com/11ty/eleventy-plugin-syntaxhighlight/issues/42
function LineHighlights({ lines }) {
  if (lines.length === 0) {
    return null
  }

  return html`
    <!-- TODO: Replace the style attr with something better -->
    <div
      aria-hidden="true"
      class="absolute pt-4 select-none w-full"
      style="font-size: 0.8888889em; line-height: 1.75"
    >
      ${lines.map((isHighlighted) =>
        isHighlighted
          ? html`<div class="bg-gray-200 w-full">${entity.nbsp}</div>`
          : html`<br />`
      )}
    </div>
  `
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
