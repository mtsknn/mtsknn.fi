/* eslint-disable import/no-extraneous-dependencies, no-console */

const clipboardy = require('clipboardy')
const { default: endent } = require('endent')

const { slugify } = require('../data/slugify')

const args = process.argv.slice(2)
const [title] = args

if (args.length !== 1 || title.trim().length === 0) {
  console.log(endent`
    Usage:
      npm run slugify "Title of the blog post"
    Note:
      Leave backticks out (or escape them)
  `)
} else {
  const slugifiedTitle = slugify(title)
  clipboardy.writeSync(slugifiedTitle)
  console.log(`Slugified title (copied to the clipboard):\n${slugifiedTitle}`)
}
