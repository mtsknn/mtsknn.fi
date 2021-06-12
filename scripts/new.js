/* eslint-disable import/no-extraneous-dependencies, no-console */

const { default: endent } = require('endent')
const fs = require('fs')
const path = require('path')

const { slugify } = require('../data/slugify')

const args = process.argv.slice(2)
const [type, title] = args

// ESLint doesn't like top-level `return`s,
// so let's use an IIFE
;(() => {
  if (args.length !== 2 || type !== 'post' || title.trim().length === 0) {
    console.log(endent`
      Usage:
        npm run new post "Title of the blog post"
      Note:
        Leave backticks out (or escape them)
    `)
    return
  }

  const contentTypeFolder = path.resolve(`${__dirname}/../content/blog/`)
  const templateFile = path.resolve(`${contentTypeFolder}/_template.md`)
  const draftsFolder = path.resolve(`${contentTypeFolder}/drafts/`)
  const targetFile = path.resolve(`${draftsFolder}/${slugify(title)}.md`)

  if (!fs.existsSync(templateFile)) {
    console.log(`Error: Can't find template:\n${templateFile}`)
    return
  }

  if (fs.existsSync(targetFile)) {
    console.log(`Draft already exists:\n${targetFile}`)
    return
  }

  fs.mkdirSync(draftsFolder, { recursive: true })
  fs.copyFileSync(templateFile, targetFile)
  console.log(`Created draft:\n${targetFile}`)
})()
