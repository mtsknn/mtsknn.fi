const clsx = require('clsx')
const { html } = require('htm/preact')

const Base = require('../components/Base')
const Markdown = require('../components/Markdown')

module.exports = (data) => {
  const {
    collections: { projects },
    intro,
    title,
  } = data

  return html`
    <${Base} ...${data}>
      <div class="prose xl:prose-lg">
        <h1>${title}</h1>

        <p class="lead">
          <${Markdown} inline>${intro}<//>
        </p>

        <hr aria-hidden="true" />

        ${projects.length > 0
          ? projects.map(
              (project) => html`
                <h2>
                  <${Markdown} inline>${project.data.title}<//>
                  <span class="text-gray-500">
                    ${' '}(${project.data.year})
                  </span>
                </h2>
                <${Markdown}>${project.data.intro}<//>

                <p>
                  <a
                    class=${clsx(
                      'link',
                      project.data.externalUrl && 'link-external'
                    )}
                    href=${project.url || project.data.externalUrl}
                  >
                    <${Markdown} inline>${project.data.linkText}<//>
                  </a>
                </p>
              `
            )
          : html`
              <p>No projects yet. 🤷‍♂️</p>
            `}
      </div>
    <//>
  `
}
