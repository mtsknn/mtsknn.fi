---
# Aim for max 60 characters:
#       ←----------------------------------------------------------→
title: 'Main tag: Recipe title. Plain text, single line'

# Only date, no time.
# If future date, the recipe will be shown only locally until the date.
date: 2020-12-24

# Shown on the recipe page (comparable with the intro of a blog post).
# Might be displayed in Google search results.
metaDescription: |
  Plain text,
  single line,
  but can be split on multiple lines like this to ease editing.

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

The recipe body goes here.
Go wild!

## Using headings

Using headings is optional.
If you do use them,
a Table of Contents (TOC) will be added to the recipe.

Guidelines:

- You must start the body text[^1] with a level 2 heading (`##`).
  Otherwise the document structure would be incorrect:
  the beginning of the body text would belong to the TOC section.
- You must use at least two level 2 headings (`##`).
  Otherwise the only heading would look lonely.
  - Exception:
    using a single level 2 heading for footnotes is a-okay.
    The TOC won't be rendered
    if the post contains only one level 2 heading.

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
    The body text starts right after the front matter.
    And this is a footnote by the way!
