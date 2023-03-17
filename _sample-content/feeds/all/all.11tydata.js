const entity = require('../../../data/entity')
const site = require('../../../data/site')

module.exports = {
  collectionsKey: 'allContentPages',
  description: 'Blog posts and other publications.',
  homeUrl: `${site.url}/`,
  title: `${site.title} ${entity.ndash} All content`,
}
