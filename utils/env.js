const isProductionBuild = process.env.NODE_ENV === 'production'

const env = {
  /**
   * Whether the current Netlify deploy context is `production`.
   *
   * Other possible contexts are `deploy-preview` and `branch-deploy`,
   * so returns `false` in deploy previews ("PR previews") and branch deploys.
   *
   * Returns `false` in non-Netlify environments, e.g. localhost.
   *
   * @see <https://docs.netlify.com/configure-builds/environment-variables/#build-metadata>
   */
  isNetlifyProductionContext: process.env.CONTEXT === 'production',

  isDevelopmentBuild: !isProductionBuild,
  isProductionBuild,
}

module.exports = env
