const { html } = require('htm/preact')

const SkipLink = require('./SkipLink')
const md = require('../utils/md')

module.exports = ({ markdown }) => {
  const items = getItems(markdown)

  if (items.length < 2) return null

  return html`
    <h2 class="tracking-widest uppercase !text-base !text-gray-700 xl:!text-lg">
      Table of contents
    </h2>
    <${SkipLink} href="#skip-toc">Skip table of contents<//>
    <nav aria-label="Table of contents">
      <${List} items=${items} />
    </nav>
    <hr aria-hidden="true" class="!mb-0" />
    <div id="skip-toc"></div>
  `
}

function List({ items }) {
  return html`
    <ol>
      ${items.map(
        (item) => html`
          <li>
            <a
              class="link"
              dangerouslySetInnerHTML=${{ __html: item.content }}
              href=${item.href}
            ></a>
            ${item.subItems.length > 0 &&
            html`<${List} items=${item.subItems} />`}
          </li>
        `
      )}
    </ol>
  `
}

function getItems(markdown) {
  const tokens = md.parse(markdown, {})

  /*
    Example `tokens` for `## Heading text with `inline code`;
    the `link_open` and `link_close` tokens are generated by `markdown-it-anchor`:
    [
      // ...
      {
        type: 'heading_open',
        tag: 'h2',
        content: '',
        // ...
      },
      {
        type: 'inline',
        tag: '',
        content: '',
        children: [
          {
            type: 'link_open',
            tag: 'a',
            content: '',
            // ...
          },
          {
            type: 'text',
            tag: '',
            content: 'Heading text with ',
            // ...
          },
          {
            type: 'code_inline',
            tag: 'code',
            content: 'inline code',
            // ...
          },
          {
            type: 'link_close',
            tag: 'a',
            content: '',
            // ...
          }
        ],
        // ...
      },
      {
        type: 'heading_close',
        tag: 'h2',
        content: '',
        // ...
      },
      // ...
    ]
  */

  const headingIndexes = tokens.reduce((indexes, token, index) => {
    if (token.type === 'heading_open' && ['h2', 'h3'].includes(token.tag)) {
      indexes.push(index)
    }
    return indexes
  }, [])

  return headingIndexes.reduce((items, index) => {
    const headingOpenToken = tokens[index]
    const headingContentTokens = tokens[index + 1].children
    const linkOpenToken = headingContentTokens[0]

    const content = md.renderer.render(
      // Omit `link_open` and `link_close`
      headingContentTokens.slice(1, -1)
    )

    const item = {
      content,
      href: linkOpenToken.attrGet('href'),
      subItems: [],
    }

    if (headingOpenToken.tag === 'h2') {
      items.push(item)
    } else {
      const prevH2 = items[items.length - 1]
      prevH2.subItems.push(item)
    }

    return items
  }, [])
}
