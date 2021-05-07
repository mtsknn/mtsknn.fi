const entity = require('../../../data/entity')
const site = require('../../../data/site')

module.exports = {
  title: `${site.title} ${entity.ndash} All content`,
  description: 'Blog posts, cookbook recipes and weekly log entries.',
  collectionsKey: 'allContentPages',
}
