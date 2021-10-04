const sort = {
  alphabetically: (a, b) => a.localeCompare(b, 'en', { sensitivity: 'accent' }),
  byDate: (a, b) => b.date - a.date,
  byTitle: (a, b) => sort.alphabetically(a.data.title, b.data.title),
  byUrl: (a, b) => sort.alphabetically(a.url, b.url),
}

module.exports = sort
