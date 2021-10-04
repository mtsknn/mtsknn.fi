const site = require('../../../data/site')
const entity = require('../../../utils/entity')

module.exports = {
  collectionsKey: 'weeklyLogEntries',
  description: "Highlights of what I'm working on. Updated weekly.",
  homeUrl: `${site.url}/weekly-log/`,
  title: `${site.title} ${entity.ndash} Weekly log`,
}
