const { getWeek } = require('date-fns')

// By Константин Ван, https://stackoverflow.com/a/57518703/1079869
const getOrdinal = (number) => {
  const rules = new Intl.PluralRules('en', { type: 'ordinal' })
  const suffixes = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    other: 'th',
  }
  const suffix = suffixes[rules.select(number)]
  return number + suffix
}

const datetime = {
  human: (date) => date.toLocaleString('en', { dateStyle: 'medium' }),
  robot: (date) => date.toISOString().split('T')[0],

  // TODO: This looks a bit out of place. Move elsewhere?
  nthWeek: (date) =>
    getOrdinal(getWeek(date, { weekStartsOn: 1, firstWeekContainsDate: 4 })),
}

module.exports = datetime
