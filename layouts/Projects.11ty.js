const { html } = require('htm/preact')

const Base = require('../components/Base')
const Markdown = require('../components/Markdown')

module.exports = (data) => {
  const {
    collections: { projects },
    title,
  } = data

  return html`
    <${Base} ...${data}>
      <div class="prose xl:prose-lg">
        <h1>${title}</h1>

        ${projects.length > 0
          ? html`
              <dl class="!ml-0">
                ${projects.map(
                  (project) => html`
                    <dt>
                      <a class="link" href=${project.url}>
                        <${Markdown} inline>${project.data.title}<//>
                      </a>
                      <span class="block text-gray-500">
                        ${project.data.year}
                      </span>
                    </dt>
                    <dd>
                      <${Markdown} inline>${project.data.intro}<//>
                    </dd>
                  `
                )}
              </dl>
            `
          : html`
              <p>No projects yet. 🤷‍♂️</p>
            `}
      </div>
    <//>
  `
}
