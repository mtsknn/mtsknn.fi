const slugify = require('slugify')

const mySlugify = (text = '') => {
  // This works for the "C#" tag but not when a longer text contains "C#". Might
  // want to do something about this someday
  if (text.toLowerCase() === 'c#') return 'csharp'

  return slugify(text, { lower: true, strict: true })
}

// For templates (automatically available)
module.exports = () => mySlugify

// For JS files: `const { slugify } = require('./data/slugify')`
module.exports.slugify = mySlugify
