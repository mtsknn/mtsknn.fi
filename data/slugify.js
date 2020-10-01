const slugify = require('slugify')

// "If you return a `function`, we'll use the return value from that function."
// Source: https://www.11ty.dev/docs/data-js/
module.exports = () => (text = '') =>
  slugify(text, { lower: true, strict: true })
