---
title: How to remember Markdown's link syntax
date: 2020-09-28
meta_description: |
  What was it again, `[text](url)` or `(text)[url]`? Spoiler: it's the former since it looks like a function call.
tags:
  - Markdown
intro: |
  What was it again, `[text](url)` or `(text)[url]`?
  Use this one weird trick to remember &ndash;
  Markdown consultants HATE it!

  Spoiler: it's the former since it looks like a function call.

  Let's also take a look at alternative link syntaxes.
---

[[toc]]

## It's `[text](url)` because it looks like a function call

Anti-mnemonic:
`(text)[url]` would look like you are accessing a value
from an array or from the `text` string
using the key `url`.
That wouldn't make as much sense, would it?

Thinking of functions,
you can also provide a title as the second argument.
These are all valid and identical
(according to the [CommonMark Spec](https://spec.commonmark.org/0.29/)):

```md
[text](url "title")
[text](url 'title')
[text](url (title))

Result (×3):
<a href="url" title="title">text</a>
```

(Looks like PrismJS can't correctly highlight this and some of the following code snippets.)

## Alternative link syntaxes

For completeness,
let's see other ways of specifying links in Markdown.

### Autolinks

These are easy &ndash;
just wrap an absolute URI or an email address in angle brackets:

```md
<https://example.com/foo/bar>
<mail@example.com>
```

### Reference links

A reference link consists of link text and a link label.
The link label should have a corresponding "link reference definition" somewhere in the document,
for example at the end of a section or at the end of the whole document.
Like so:

```md
Check out [foo][1], [bar][2] and [baz][3].

Do you know what's [my favorite search engine][duck]?
I like it more than [Microsoft's search engine][bing].

[1]: https://example.com/foo
[2]: https://example.com/bar
[3]: https://example.com/baz

[duck]: https://duck.com
[bing]: https://bing.com
```

But wait! There's more.

If the link text and label are the same
(labels are case-insensitive),
you can use "collapsed reference links" and drop the label:

```md
Check out [foo][], [Bar][] and [BAZ][].

[foo]: https://example.com/foo
[BAR]: https://example.com/bar
[baz]: https://example.com/baz
```

And "shortcut reference links" take a step further by allowing you to drop the empty brackets as well:

```md
Check out [foo], [Bar] and [BAZ].

[foo]: https://example.com/foo
[BAR]: https://example.com/bar
[baz]: https://example.com/baz
```

## Btw, images

I have previously struggled to remember the syntax for specifying images in Markdown.
While writing this blog post,
I realized that the syntax is the same as for links,
except that there's a bang (`!`) at the beginning:

```md
![alt text](url)
![foo][bar]
![ham][]
![spam]

Image with an empty alt text: ![](url)

[bar]: https://example.com/bar.jpg
[ham]: https://example.com/ham.jpg
[spam]: https://example.com/spam.jpg
```

## Further resources

The [CommonMark Spec](https://spec.commonmark.org/0.29/) has more examples and edge cases covered.
Check out these sections of the spec:

- [Links](https://spec.commonmark.org/0.29/#links)
- [Autolinks](https://spec.commonmark.org/0.29/#autolinks)
- [Reference links](https://spec.commonmark.org/0.29/#reference-link)
- [Images](https://spec.commonmark.org/0.29/#images)
