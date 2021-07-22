const fs = require('fs')

module.exports = (config) => {
  // See https://browsersync.io/docs/options for all options
  config.setBrowserSyncConfig({
    callbacks: {
      ready(err, browserSync) {
        browserSync.addMiddleware('/weekly-log/2021/', (req, res) => {
          res.writeHead(302, { location: '/weekly-log/#2021' })
          res.end()
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
