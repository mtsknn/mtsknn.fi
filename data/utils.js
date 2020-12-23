const now = Date.now()

const utils = {
  isDraft: (data) => data.page.filePathStem.startsWith('/blog/drafts/'),
  isProductionEnv: process.env.NODE_ENV === 'production',
  isScheduled: (data) => data.date >= now,
}

module.exports = utils
