const { html } = require('htm/preact')

const datetime = require('../utils/datetime')
const slugify = require('../utils/slugify')

// Using `en-GB` because it doesn't use Oxford commas (`en-US` does)
const listFormatter = new Intl.ListFormat('en-GB', { type: 'conjunction' })

module.exports = ({ date, updated, tags = [] }) => html`
  <p class="!mb-0">
    Published on${' '}
    <time class="whitespace-no-wrap" datetime=${datetime.robot(date)}>
      ${datetime.human(date)}
    </time>
    ${date > Date.now() &&
    html`
      <span aria-hidden="true" title="Scheduled">${' '}⌚</span>
    `}

    <!-- -->

    ${tags.length > 0 &&
    html`
      ${' '}
      <span class="inline-block">
        in${' '}
        ${listFormatter.formatToParts(tags).map(({ type, value }) =>
          type === 'literal'
            ? value // ', ' or ' and '
            : html`
                <a
                  class="link whitespace-no-wrap"
                  href=${`/blog/tags/${slugify(value)}/`}
                >
                  ${value}
                </a>
              `
        )}
      </span>
    `}
  </p>

  ${updated &&
  html`
    <p class="!mt-0">
      Last updated on${' '}
      <time class="whitespace-no-wrap" datetime=${datetime.robot(updated)}>
        ${datetime.human(updated)}
      </time>
    </p>
  `}
`
