const { html } = require('htm/preact')

const Base = require('../components/Base')
const Markdown = require('../components/Markdown')
const PostMeta = require('../components/PostMeta')
const TableOfContents = require('../components/TableOfContents')

module.exports = (data) => {
  const {
    collections: { weeklyLogEntries },
    content,
    intro,
    page,
    title,
    updated,
  } = data

  const currentEntryIndex = weeklyLogEntries.findIndex(
    (entry) => entry.url === page.url
  )
  const nextEntry = weeklyLogEntries[currentEntryIndex - 1]
  const previousEntry = weeklyLogEntries[currentEntryIndex + 1]

  return html`
    <${Base} ...${data}>
      <div class="prose xl:prose-lg">
        <div class="max-w-none text-center">
          <h1 class="!mb-6">
            <${Markdown} inline>${title}<//>
          </h1>
          <${PostMeta} date=${page.date} updated=${updated} />
        </div>
        <p class="lead">
          <${Markdown} inline>${intro}<//>
        </p>

        <hr aria-hidden="true" />

        <${TableOfContents} markdown=${content} />
        <${Markdown}>${content}<//>

        <hr aria-hidden="true" />

        <h2>💁‍♂️ More Weekly log entries</h2>

        ${nextEntry &&
        html`
          <p>
            <a class="link" href=${nextEntry.url}>
              <em>Next week:</em>
              ${' '}${nextEntry.data.title}
            </a>
          </p>
        `}
        ${previousEntry &&
        html`
          <p>
            <a class="link" href=${previousEntry.url}>
              <em>Previous week:</em>
              ${' '}${previousEntry.data.title}
            </a>
          </p>
        `}
      </div>
    <//>
  `
}
