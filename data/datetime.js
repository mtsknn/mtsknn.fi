const { format, localeFormat } = require('light-date')

const datetime = {
  human: (date) => format(date, `${localeFormat(date, '{MMM}')} {dd}, {yyyy}`),
  robot: (date) => format(date, '{yyyy}-{MM}-{dd}'),
}

module.exports = datetime
