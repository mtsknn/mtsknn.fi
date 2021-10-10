const { HomeIcon } = require('@heroicons/react/outline')
const { ChevronRightIcon } = require('@heroicons/react/solid')
const { html } = require('htm/preact')

const navItems = require('../utils/navItems')

module.exports = ({ url }) => {
  if (!url) return null

  return html`
    <nav aria-label="Breadcrumb" class="mb-4">
      <ul>
        <li class="inline list-none">
          <a
            aria-label="Home"
            class="text-gray-500 hover:text-red-600 active:text-red-800"
            href="/"
          >
            <${HomeIcon}
              aria-hidden="true"
              class="align-text-bottom inline"
              style=${{ width: '1.25rem' }}
            />
          </a>
          <${ChevronRightIcon}
            aria-hidden="true"
            class="inline mx-2 text-gray-500"
            style=${{ width: '1.25rem' }}
          />
        </li>
        ${getBreadcrumbItems(url).map(
          (item) => html`
            <li class="inline list-none">
              <a class="link" href=${item.href}>${item.text}</a>
              <${ChevronRightIcon}
                aria-hidden="true"
                class="inline mx-2 text-gray-500"
                style=${{ width: '1.25rem' }}
              />
            </li>
          `
        )}
      </ul>
    </nav>
  `
}

/**
 * @typedef Item
 * @prop {string} href
 * @prop {string} text
 */

/**
 * @param {string} urlPath URL pathname of the current page
 * @returns {Item[]} Array of nav items (from `navItems.js`) to show in the breadcrumb
 */
function getBreadcrumbItems(urlPath) {
  return getCumulativeUrlSegments(urlPath)
    .slice(0, -1) // Drop the last page, it's not shown in the breadcrumb
    .map((href) => {
      const found = navItems.all.find((item) => item.href === href)
      if (!found) {
        throw new Error(`❗ No breadcrumb item found for the href "${href}"`)
      }
      return found
    })
}

/**
 * @param {string} urlPath URL pathname
 * @returns {string[]} Array of cumulative URL segments
 *
 * @example
 * getCumulativeUrlSegments('/foo/bar/baz/')
 * //=> ['/foo/', '/foo/bar/', '/foo/bar/baz/']
 */
function getCumulativeUrlSegments(urlPath) {
  return Array.from(
    urlPath
      .replace('/drafts/', '/')
      // Looks scary but is not!
      // To understand it,
      // you only need to read this one long blog post. ;-)
      // https://mtsknn.fi/blog/converting-a-path-into-cumulative-segments-in-javascript/
      .matchAll(/(?<=(.+\/))/g),
    (match) => match[1]
  )
}
