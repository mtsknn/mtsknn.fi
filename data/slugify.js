const slugify = require('slugify')

const mySlugify = (text = '') => {
  return [text]
    .map((x) => x.replace(/\//g, '-'))
    .map((x) => x.replace(/C#/g, 'csharp'))
    .map((x) => x.replace(/\.NET/g, 'dotnet'))
    .map((x) => slugify(x, { lower: true, strict: true }))[0]
}

// For templates (automatically available)
module.exports = () => mySlugify

// For JS files: `const { slugify } = require('./data/slugify')`
module.exports.slugify = mySlugify
