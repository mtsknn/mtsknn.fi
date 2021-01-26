const navItems = require('./navItems')

/**
 * @param {string} urlPath URL pathname
 * @returns {string[]} Array of cumulative URL segments
 *
 * @example
 * getCumulativeUrlSegments('/foo/bar/baz/')
 * //=> ['/foo/', '/foo/bar/', '/foo/bar/baz/']
 */
const getCumulativeUrlSegments = (urlPath) =>
  Array.from(
    urlPath
      .replace('/drafts/', '/')
      // Looks scary but is not!
      // To understand it,
      // you only need to read this one long blog post. ;-)
      // https://mtsknn.fi/blog/converting-a-path-into-cumulative-segments-in-javascript/
      .matchAll(/(?<=(.+\/))/g),
    (match) => match[1]
  )

const now = Date.now()

const utils = {
  getBreadcrumbItems: (urlPath) =>
    getCumulativeUrlSegments(urlPath)
      .slice(0, -1) // Drop the last page, it's not shown in the breadcrumb
      .map((href) => navItems.all.find((item) => item.href === href)),
  isDraft: (data) => data.page.filePathStem.includes('/drafts/'),
  isProductionEnv: process.env.NODE_ENV === 'production',
  isScheduled: (data) => data.date >= now,
}

module.exports = utils
