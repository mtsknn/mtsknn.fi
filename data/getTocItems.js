const md = require('./md')

// "If you return a `function`, we'll use the return value from that function."
// Source: https://www.11ty.dev/docs/data-js/
module.exports = () => (markdown) => {
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
