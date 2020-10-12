const { JSDOM } = require('jsdom')

const { slugify } = require('./slugify')

// "If you return a `function`, we'll use the return value from that function."
// Source: https://www.11ty.dev/docs/data-js/
module.exports = () => (html) => {
  const uniqueSlugs = new Set()
  const dom = new JSDOM(html)

  return [...dom.window.document.body.querySelectorAll('h2, h3, h4')].reduce(
    (result, heading) => {
      const item = createItem(heading)
      const prevH3 = result[result.length - 1]
      const prevH4 = prevH3?.subItems[prevH3.subItems.length - 1]

      if (heading.tagName === 'H2') {
        result.push(item)
      } else if (heading.tagName === 'H3') {
        prevH3.subItems.push(item)
      } else if (heading.tagName === 'H4') {
        prevH4.subItems.push(item)
      }

      return result
    },
    []
  )

  function createItem(heading) {
    // Ignore the anchor link (last child)
    const nodes = [...heading.childNodes].slice(0, -1)

    const html = nodes
      .map((node) => node.outerHTML || node.textContent)
      .join('')

    const text = nodes.map((node) => node.textContent).join('')
    const slug = getUniqueSlug(slugify(text))

    return {
      content: html,
      href: `#${slug}`,
      subItems: [],
    }
  }

  function getUniqueSlug(slug) {
    let uniqueSlug = slug
    let i = 1

    while (uniqueSlugs.has(uniqueSlug)) {
      uniqueSlug = `${slug}-${i}`
      i++
    }

    uniqueSlugs.add(uniqueSlug)
    return uniqueSlug
  }
}
