const { JSDOM } = require('jsdom')

/**
 * Adds `aria-label`s and nicer contents for the heading anchor links created by
 * the `markdown-it-anchor` plugin.
 *
 * @param {string} content The HTML content of the page
 * @param {string} outputPath Path of the final HTML file, e.g. `_site/404.html`
 *
 * @returns {string} Transformed HTML
 */
module.exports = function(content, outputPath) {
  // `outputPath` is `false` if `permalink` is `false`
  if (!outputPath || !outputPath.endsWith('.html')) return content

  const { document } = new JSDOM(content).window
  let anchorLinks = document.body.querySelectorAll(
    'h2 .link.link-anchor, h3 .link.link-anchor, h4 .link.link-anchor'
  )

  if (anchorLinks.length === 0) return content

  anchorLinks.forEach((link) => {
    const heading = link.parentElement

    const headingText = [...heading.childNodes]
      .slice(0, -1) // Ignore the anchor link (last child node)
      .reduce((result, node) => result + node.textContent, '')
    link.setAttribute('aria-label', `Anchor link to section "${headingText}"`)

    link.innerHTML = getSvgHtml()

    // The link wrapper ties the link element to the heading's text so that the
    // link won't wrap to the next line alone
    const linkWrapper = createLinkWrapper(document)
    linkWrapper.appendChild(link)
    heading.appendChild(linkWrapper)
  })

  return document.documentElement.outerHTML
}

function getSvgHtml() {
  // Ugly string interpolation but spaces between the comment and the `<svg>`
  // tags would cause styling issues
  return (
    '<!--\`link\` icon by Heroicons (https://heroicons.com/), MIT Licensed-->' +
    `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        style="width: 1rem"
        viewBox="0 0 24 24"
      >
        <title>Link to this section</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    `.trim()
  )
}

function createLinkWrapper(document) {
  const template = document.createElement('template')

  // `&zwj;` = zero-width joiner
  template.innerHTML = `
    <span class="whitespace-no-wrap"><span aria-hidden="true">&zwj;</span></span>
  `.trim()

  return template.content.firstChild
}
