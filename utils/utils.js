const now = Date.now()

const utils = {
  isDraft: (data) => data.page.filePathStem.includes('/drafts/'),

  /**
   * Checks whether the current Netlify deploy context is `production`.
   *
   * Other possible contexts are `deploy-preview` and `branch-deploy`,
   * so returns `false` in deploy previews ("PR previews") and branch deploys.
   *
   * Returns `false` in non-Netlify environments, e.g. localhost.
   *
   * @see <https://docs.netlify.com/configure-builds/environment-variables/#build-metadata>
   */
  isNetlifyProductionContext: () => process.env.CONTEXT === 'production',

  isProductionEnv: process.env.NODE_ENV === 'production',
  isScheduled: (data) => data.date >= now,
}

module.exports = utils
