const datetime = {
  human: (date) => date.toLocaleString('en', { dateStyle: 'medium' }),
  robot: (date) => date.toISOString().split('T')[0],
}

module.exports = datetime
