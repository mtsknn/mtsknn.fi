const dedent = require('dedent')

const site = require('../data/site')

module.exports = dedent`
  User-agent: *
  Allow: /

  Sitemap: ${site.url}${site.sitemapUrl}
`
