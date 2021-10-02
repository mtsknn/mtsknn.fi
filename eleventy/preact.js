const path = require('path')
const { isValidElement } = require('preact')
const PreactCompat = require('preact/compat')
const { render } = require('preact-render-to-string')

const componentsFolderPath = './components/'

module.exports = (config) => {
  aliasReactToPreact()
  disableComponentCache(config)

  config.addTransform('preactLayouts', (content) => {
    if (!isValidElement(content)) {
      return content
    }

    const html = render(content)
      // Markdown is rendered to `<markdown>` tags
      // because React doesn't allow using `dangerouslySetInnerHTML` with fragments
      .replace(/<\/?markdown>/g, '')

    return `<!DOCTYPE html>${html}`
  })

  config.addWatchTarget(componentsFolderPath)
}

/**
 * Alias React to Preact
 * to make 3rd party React libraries work properly,
 * e.g. `@heroicons/react`.
 *
 * Code taken from here and simplified:
 * https://preactjs.com/guide/v8/switching-to-preact/#aliasing-in-node-using-module-alias.
 * The page is about Preact v8, but seems to work with v10 too.
 * The v10 docs are missing similar instructions for some reason.
 */
function aliasReactToPreact() {
  // eslint-disable-next-line global-require
  require('react')

  // eslint-disable-next-line no-underscore-dangle
  module.constructor._cache[require.resolve('react')].exports = PreactCompat
}

/**
 * Disable Node.js's `require()` cache for the files in the `components` folder.
 *
 * Does not actually _disable_ the cache,
 * but automatically clears the cache
 * after any of the files are modified.
 * So practically disables it.
 *
 * Needed because Node.js aggressively caches `require()`'d files.
 * Otherwise modifying component files might not take effect.
 * Dunno where the problem actually is: in Node.js, Browsersync or Eleventy.
 *
 * Interestingly,
 * layout files are not cached aggressively
 * even though they are Preact components too.
 * Possibly because the `components` folder is an "extra folder" to Eleventy.
 *
 * @param {object} config
 * Eleventy's config object.
 */
function disableComponentCache(config) {
  const componentsFolderFullPath = path.resolve(componentsFolderPath)

  // The `beforeWatch` event is run before each re-build.
  // https://www.11ty.dev/docs/events/#beforewatch
  config.on('beforeWatch', (changedFiles) => {
    const relativeChangedFilesPaths = changedFiles.map(path.normalize)
    const relativeComponentsFolderPath = componentsFolderPath
      .slice(2) // Omit `./` from the start
      .replace(/\//g, path.sep)

    if (
      !relativeChangedFilesPaths.some((changedFilePath) =>
        changedFilePath.startsWith(relativeComponentsFolderPath)
      )
    ) {
      // No files were modified under the `components` folder
      // -> no need to clear the cache
      return
    }

    Object.keys(require.cache).forEach(
      (cachePath) =>
        cachePath.startsWith(componentsFolderFullPath) &&
        delete require.cache[cachePath]
    )
  })
}
