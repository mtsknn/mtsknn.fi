const entity = require('../../../data/entity')
const site = require('../../../data/site')

module.exports = {
  title: `${site.title} ${entity.ndash} Weekly log`,
  description: "Highlights of what I'm working on. Updated weekly.",
  collectionsKey: 'weeklyLogEntries',
}
