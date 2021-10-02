const site = require('../data/site')
const { byUrl } = require('../data/sort')

module.exports = ({ collections }) =>
  [...collections.all]
    // The order doesn't matter (https://stackoverflow.com/q/1274974/1079869),
    // but sorted lines look better
    .sort(byUrl)
    .map((page) => `${site.url}${page.url}`)
    .concat('') // Add an empty line to the end, just in case
    .join('\n')
