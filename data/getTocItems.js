const { JSDOM } = require('jsdom')

const { slugify } = require('./slugify')

// "If you return a `function`, we'll use the return value from that function."
// Source: https://www.11ty.dev/docs/data-js/
module.exports = () =>
  function getTocItems(html) {
    const uniqueSlugs = new Set()
    const dom = new JSDOM(html)

    return [...dom.window.document.body.querySelectorAll('h2, h3')].reduce(
      (result, heading) => {
        const item = createItem(heading)
        const prevH3 = result[result.length - 1]

        if (heading.tagName === 'H2') {
          result.push(item)
        } else if (heading.tagName === 'H3') {
          prevH3.subItems.push(item)
        }

        return result
      },
      []
    )

    function createItem(heading) {
      const nodes = [...heading.childNodes[0].childNodes]

      const itemHtml = nodes.reduce(
        (result, node) => result + (node.outerHTML || node.textContent),
        ''
      )

      const text = nodes.reduce((result, node) => result + node.textContent, '')
      const slug = getUniqueSlug(text)

      return {
        content: itemHtml,
        href: `#${slug}`,
        subItems: [],
      }
    }

    function getUniqueSlug(text) {
      const slug = slugify(text)

      let uniqueSlug = slug
      let i = 1

      while (uniqueSlugs.has(uniqueSlug)) {
        uniqueSlug = `${slug}-${i}`
        i += 1
      }

      uniqueSlugs.add(uniqueSlug)
      return uniqueSlug
    }
  }
