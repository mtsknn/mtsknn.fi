const { html } = require('htm/preact')
const { render } = require('preact-render-to-string')

const site = require('../data/site')

module.exports = (data) => {
  const {
    collections,
    collectionsKey,
    description,
    feedUrl,
    getFeedUpdatedDate,
    getFullContent,
    getPublishedDate,
    getUpdatedDate,
    homeUrl,
    title,
  } = data

  const items = collections[collectionsKey]

  return (
    // eslint-disable-next-line prefer-template
    '<?xml version="1.0" encoding="utf-8" ?>' +
    render(html`
      <feed xmlns="http://www.w3.org/2005/Atom">
        <id>${homeUrl}</id>
        <title>${title}</title>
        <subtitle>${description}</subtitle>
        <link href=${homeUrl} />
        <link href=${feedUrl} rel="self" />
        <updated>${getFeedUpdatedDate(items)}</updated>
        <author>
          <name>${site.author.name}</name>
          <email>${site.author.email}</email>
        </author>
        ${items.map((item) => {
          const fullUrl = `${site.url}${item.url}`
          return html`
            <entry>
              <id>${fullUrl}</id>
              <title>${item.data.title}</title>
              <link href=${fullUrl} />
              <published>${getPublishedDate(item)}</published>
              <updated>
                <!--
                  The '<updated>' element is always required:
                  https://validator.w3.org/feed/docs/atom.html#requiredEntryElements
                -->
                ${item.data.updated
                  ? getUpdatedDate(item)
                  : getPublishedDate(item)}
              </updated>
              ${(item.data.tags || []).map(
                (tag) => html`<category term=${tag} />`
              )}
              <content type="html">${getFullContent(item)}</content>
            </entry>
          `
        })}
      </feed>
    `)
  )
}
