---
title: Project X

# Year is shown next to the title
year: 2021
# If you want to use `{{ entity.ndash }}`,
# you have to do it in `eleventyComputed`:
eleventyComputed:
  year: '2020{{ entity.ndash }}2021'

# Date is not shown, but is used for sorting (newest first)
date: 2021-05

# If you don't want to create a page for the project (`/projects/project-x/`),
# set `permalink` to `false` and provide `externalUrl`:
permalink: false
externalUrl: 'https://github.com/...'

linkText: Read more

intro: |
  Text...
metaDescription: |
  Optional override for `intro`
metaTitle: |
  Optional override for `title`
---

The content area right here
is rendered on the project's own page
(which is created only if `permalink` is not `false`).
