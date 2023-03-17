const sort = {
  alphabetically: (a, b) => a.localeCompare(b, 'en', { sensitivity: 'accent' }),
  byUrl: (a, b) => sort.alphabetically(a.url, b.url),
}

module.exports = sort
