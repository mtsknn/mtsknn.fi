/* eslint-disable no-console */

const { isProductionEnv } = require('./utils')

// "If you return a `function`, we'll use the return value from that function."
// Source: https://www.11ty.dev/docs/data-js/
module.exports = () =>
  /**
   * Throws an error in production mode,
   * otherwise logs the error to the console.
   * Useful in Pug templates.
   *
   * @param {string} message Error message
   */
  function error(message) {
    if (isProductionEnv) throw new Error(message)
    else console.error('❗', message)
  }
