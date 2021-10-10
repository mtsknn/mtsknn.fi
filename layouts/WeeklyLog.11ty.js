const { html } = require('htm/preact')

const Base = require('../components/Base')
const Markdown = require('../components/Markdown')
const datetime = require('../utils/datetime')

module.exports = (data) => {
  const { collections, content, intro, title } = data

  return html`
    <${Base} ...${data}>
      <div class="prose xl:prose-lg">
        <h1>
          <${Markdown} inline>${title}<//>
        </h1>
        <p class="lead">
          <${Markdown} inline>${intro}<//>
        </p>

        <${Markdown}>${content}<//>

        <!-- TODO: Replace the hardcoded year with dynamic years -->
        <h2 id="2021">2021</h2>

        ${collections.weeklyLogEntries.map(
          (entry) => html`
            <article>
              <h3 class="sm:inline-block sm:!mb-0 sm:mr-4">
                <a class="link" href=${entry.url}>${entry.data.title}</a>
              </h3>
              <p
                class="text-gray-600 !-mb-2 sm:inline-block sm:!mb-0 xl:text-lg"
              >
                <span class="sr-only">Published on${' '}</span>
                <time datetime=${datetime.robot(entry.date)}>
                  ${datetime.human(entry.date)}
                </time>
              </p>
              <p class="sm:!mb-0 !mt-4">
                <${Markdown} inline>${entry.data.intro}<//>
              </p>
            </article>
          `
        )}

        <!--
          TODO: Move this section to the content file?
          Though the problem there is that
          we can't access the 'datetime' helper.
        -->
        <h2 id="whats-the-current-week-number">
          What's the current week number?
        </h2>

        <p>
          Today (this page is automatically rebuilt once per day) is${' '}
          <strong>
            ${new Date().toLocaleString('en', { dateStyle: 'full' })}
          </strong>
          , and it's${' '}
          <strong>the ${datetime.nthWeek(new Date())} week</strong>
          ${' '}here in Finland.
        </p>
        <p>
          Did you know that${' '}
          <a
            class="link"
            href="/weekly-log/2021/02/#calculating-week-numbers-is-complex"
          >
            calculating week numbers is complex
          </a>
          ? In your area the current week number might be something else than
          here.${' '}
          <a
            class="link"
            href="/weekly-log/2021/02/#calculating-week-numbers-is-complex"
          >
            I learned that on the 2nd week of 2021.
          </a>
        </p>
      </div>
    <//>
  `
}
