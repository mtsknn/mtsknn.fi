---
# Aim for max 60 characters:
#       ←----------------------------------------------------------→
title: 'Main tag: Recipe title. Plain text, single line'

# Only date, no time.
# If future date, the recipe will be shown only locally until the date.
date: 2020-12-24

metaDescription: |
  Plain text,
  single line,
  but can be split on multiple lines like this to ease editing.
  Might be displayed in Google search results.

# Order alphabetically,
# or maybe the most important first.
# Haven't decided yet.
tags:
  - Clean code
  - JavaScript

# Optional
metaTitle: |
  Plain text,
  single line,
  but can be split on multiple lines like this to ease editing.
  Displayed in the browser tab and Google.
  If not set, `title` will be used.
---

## First heading

The recipe[^1] goes here.
Go wild!

## Using headings

Using headings is optional.
A recipe should be short,
so it'll never have a Table of Contents (TOC).

## Images and other assets

If the recipe contains images or other embeddable assets,
create a folder for the recipe
and name the Markdown file as `index.md`.
E.g. `content/cookbook/my-first-recipe/index.md`.

Then you can
[include images as you normally do in Markdown](https://mtsknn.fi/blog/how-to-remember-markdowns-link-syntax/#btw-images).
E.g. `![alt text](./my-image.png)`.

## Footnotes

[^1]:
    The recipe starts right after the front matter.
    And this is a footnote by the way!
