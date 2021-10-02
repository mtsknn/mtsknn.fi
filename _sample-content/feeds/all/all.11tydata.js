const site = require('../../../data/site')
const entity = require('../../../utils/entity')

module.exports = {
  collectionsKey: 'allContentPages',
  description: 'Blog posts and weekly log entries.',
  homeUrl: `${site.url}/`,
  title: `${site.title} ${entity.ndash} All content`,
}
