const entity = require('../../../data/entity')
const site = require('../../../data/site')

module.exports = {
  title: `${site.title} ${entity.ndash} Blog`,
  description: 'My great blog.',
  collectionsKey: 'blogPosts',
}
