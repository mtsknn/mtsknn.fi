const setupBrowserSync = require('./eleventy/browserSync')
const setupCollections = require('./eleventy/collections')

module.exports = (config) => {
  setupBrowserSync(config)
  setupCollections(config)

  config.addPassthroughCopy({ './assets/favicon/': '/' })
  config.addPassthroughCopy({ './assets/fonts/': '/fonts/' })
  config.addPassthroughCopy('./content/**/*.{jpg,jpeg,png}')

  // Defaults to true in Eleventy 1.0.
  // https://www.11ty.dev/docs/data-deep-merge/
  config.setDataDeepMerge(true)

  // Disable automatic conversion of Markdown to HTML;
  // we'll call `md.render(content)` manually in layouts.
  // This way we can access pages' raw Markdown (via `content`)
  // which wouldn't otherwise be possible (https://github.com/11ty/eleventy/issues/1206).
  config.setLibrary('md', { render: (markdown) => markdown })

  return {
    dir: {
      input: './content/',

      // These are relative to the input dir
      data: '../data/',
      includes: '../layouts/',
    },
  }
}
