const site = require('../../../data/site')
const entity = require('../../../utils/entity')

module.exports = {
  collectionsKey: 'blogPosts',
  description: 'My great blog.',
  homeUrl: `${site.url}/blog/`,
  title: `${site.title} ${entity.ndash} Blog`,
}
