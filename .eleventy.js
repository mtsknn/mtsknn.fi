const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const md = require('./data/md')
const setupBrowserSync = require('./eleventy/browserSync')
const setupCollections = require('./eleventy/collections')

module.exports = (config) => {
  setupBrowserSync(config)
  setupCollections(config)

  config.addPassthroughCopy({ './assets/favicon/': '/' })
  config.addPassthroughCopy({ './assets/fonts/': '/fonts/' })
  config.addPassthroughCopy('./content/**/*.{jpg,jpeg,png}')

  config.addPlugin(pluginSyntaxHighlight, { alwaysWrapLineHighlights: true })

  // Defaults to true in Eleventy 1.0.
  // https://www.11ty.dev/docs/data-deep-merge/
  config.setDataDeepMerge(true)

  config.setLibrary('md', md)

  return {
    dir: {
      input: './content/',

      // These are relative to the input dir
      data: '../data/',
      includes: '../layouts/',
    },
  }
}
