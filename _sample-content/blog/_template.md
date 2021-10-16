---
# Required fields
#################

# Aim for max 60 characters:
#       ←----------------------------------------------------------→
title: 'Post title. Plain text, single line'

# Only date, no time.
# If future date, the post will be shown only locally until the date.
date: 2020-12-24

intro: |
  Intro text,
  single paragraph.
  Supports Markdown: _italic_, **bold** etc.
  But maybe don't use links here.

# Order alphabetically
tags:
  - C#
  - Clean code
  - Markdown

# Optional fields
#################

# Only date, no time.
# Update when you modify the post significantly.
# Don't update when doing minor updates like fixing typos.
updated: 2021-01-01

metaDescription: |
  Plain text,
  single line,
  but can be split on multiple lines like this to ease editing.
  Might be displayed in Google search results.
  If not set, `intro` will be used
  (but any Markdown in it will NOT be parsed).

# Aim for max 60 characters
metaTitle: |
  Plain text,
  single line,
  but can be split on multiple lines like this to ease editing.
  Displayed in the browser tab and Google.
  If not set, `title` will be used.
---

## First heading

The post body goes here.
Go wild!

## Using headings

Using headings is optional.

If you have at least two level 2 headings (`##`):

- A Table of Contents (TOC) will be added to the post.
- You must start the body text[^1] with a level 2 heading (`##`).
  Otherwise the document structure would be incorrect:
  the beginning of the body text would belong to the TOC section.

## Images and other assets

If the post contains images or other embeddable assets,
create a folder for the post
and name the Markdown file as `index.md`.
E.g. `content/blog/my-first-post/index.md`.

Then you can
[include images as you normally do in Markdown](https://mtsknn.fi/blog/how-to-remember-markdowns-link-syntax/#btw-images).
E.g. `![alt text](./my-image.png)`.

[^1]:
    The body text starts right after the front matter.
    And this is a footnote by the way!
