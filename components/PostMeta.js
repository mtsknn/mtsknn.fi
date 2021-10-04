const { html } = require('htm/preact')

const datetime = require('../utils/datetime')
const slugify = require('../utils/slugify')

module.exports = ({ date, updated, tags = [] }) => html`
  <p class="!mb-0">
    Published on${' '}
    <time class="whitespace-no-wrap" datetime=${datetime.robot(date)}>
      ${datetime.human(date)}
    </time>

    ${tags.length > 0 &&
    html`
      ${' '}
      <span class="inline-block">
        in${' '}
        ${tags.map(
          (tag, i) => html`
            <a
              class="link whitespace-no-wrap"
              href=${`/blog/tags/${slugify(tag)}/`}
            >
              ${tag}
            </a>
            ${i < tags.length - 2 && ', '}
            <!-- -->
            ${i === tags.length - 2 && ' and '}
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
