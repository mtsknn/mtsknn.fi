const now = Date.now()

module.exports = {
  isDraft: (data) => data.page.filePathStem.startsWith('/blog/drafts/'),
  isProductionEnv: process.env.NODE_ENV === 'production',
  isScheduled: (data) => data.date >= now,
}
