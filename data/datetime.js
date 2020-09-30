const { format, localeFormat } = require('light-date')

module.exports = {
  human: (date) => format(date, `${localeFormat(date, '{MMM}')} {dd}, {yyyy}`),
  robot: (date) => format(date, '{yyyy}-{MM}-{dd}'),
}
