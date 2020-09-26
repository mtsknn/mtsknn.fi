const markdownIt = require('markdown-it')({ html: true })

// Since Pug filters don't support dynamic data (e.g. `:md= post.data.intro`),
// let's instead create a global `md.render()` function
module.exports = {
  render: (text) => markdownIt.render(text),
}
