const utils = {
  isDraft: (data) => data.page.filePathStem.includes('/drafts/'),
  isScheduled: (data) => data.date >= Date.now(),
}

module.exports = utils
