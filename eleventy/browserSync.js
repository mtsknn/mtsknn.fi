const fs = require('fs')

module.exports = (config) => {
  // See https://browsersync.io/docs/options for all options
  config.setBrowserSyncConfig({
    callbacks: {
      ready(err, browserSync) {
        // Mimics the redirect rules in the `_redirects` file (generated from `redirects.liquid`).
        // Does not check for redirect rules in the `netlify.toml` file.
        browserSync.addMiddleware('*', (req, res, next) => {
          const redirectsFile = fs.readFileSync('./_site/_redirects', 'utf-8')
          const redirects = redirectsFile
            .split('\n')
            .filter((line) => !line.startsWith('#'))
            .filter((line) => line.trim().length > 0)
            .map((line) => line.split(/ +/))
            .map(([fromUrl, toUrl, status]) => ({
              fromUrl,
              toUrl,
              status: Number(status) || 301,
            }))

          const redirect = redirects.find(({ fromUrl }) => fromUrl === req.url)
          if (redirect) {
            res.writeHead(redirect.status, { location: redirect.toUrl })
            res.end()
          } else {
            next()
          }
        })

        // Provides the 404 content without redirect. Original source:
        // https://github.com/11ty/eleventy-base-blog/blob/v5.0.2/.eleventy.js#L56-L64
        browserSync.addMiddleware('*', (req, res) => {
          const notFoundContent = fs.readFileSync('./_site/404.html')
          res.write(notFoundContent)
          res.end()
        })
      },
    },

    // > Browsersync can watch your files as you work.
    // > Changes you make will either be injected into the page (CSS & images)
    // > or will cause all browsers to do a full-page refresh.
    files: './_site/main.css',

    // > Clicks, scrolls & form inputs on any device
    // > will be mirrored to all others.
    // Annoying feature
    ghostMode: false,

    // Enable to create a public URL (https://something-random.loca.lt/);
    // useful when testing on mobile devices
    tunnel: false,

    // > Browsersync includes a user-interface
    // > that is accessed via a separate port.
    // > The UI allows to controls all devices,
    // > push sync updates
    // > and much more.
    // Not needed
    ui: false,
  })
}
