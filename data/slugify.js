const slugify = require('slugify')

// "If you return a `function`, we'll use the return value from that function."
// Source: https://www.11ty.dev/docs/data-js/
module.exports = () => (text = '') => {
  // This works for the "C#" tag but not when a longer text contains "C#". Might
  // want to do something about this someday
  if (text.toLowerCase() === 'c#') return 'csharp'

  return slugify(text, { lower: true, strict: true })
}
