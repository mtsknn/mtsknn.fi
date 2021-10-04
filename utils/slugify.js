const slugify = require('slugify')

module.exports = (text = '') => {
  return [text]
    .map((x) => x.replace(/\//g, '-'))
    .map((x) => x.replace(/C#/g, 'csharp'))
    .map((x) => x.replace(/\.NET/g, 'dotnet'))
    .map((x) => slugify(x, { lower: true, strict: true }))[0]
}
