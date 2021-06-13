const entity = require('../../../data/entity')
const site = require('../../../data/site')

module.exports = {
  collectionsKey: 'blogPosts',
  description: 'My great blog.',
  homeUrl: `${site.url}/blog/`,
  title: `${site.title} ${entity.ndash} Blog`,
}
