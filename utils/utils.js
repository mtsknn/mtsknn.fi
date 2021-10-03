const now = Date.now()

const utils = {
  isDraft: (data) => data.page.filePathStem.includes('/drafts/'),
  isScheduled: (data) => data.date >= now,
}

module.exports = utils
