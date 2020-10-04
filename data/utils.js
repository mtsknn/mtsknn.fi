const now = Date.now()

module.exports = {
  isDraftOrScheduledPost: (data) => data.draft || data.date >= now,
  isProd: () => process.env.NODE_ENV === 'production',
}
