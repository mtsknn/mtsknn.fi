const { HomeIcon } = require('@heroicons/react/outline')
const { ChevronRightIcon } = require('@heroicons/react/solid')
const { html } = require('htm/preact')

const utils = require('../data/utils')

module.exports = ({ url }) => {
  if (!url) return null

  return html`
    <nav aria-label="Breadcrumb" class="mb-4 text-center">
      <ul>
        <li class="inline list-none">
          <a
            aria-label="Home"
            class="ml-4 text-gray-500 hover:text-red-600 active:text-red-800"
            href="/"
          >
            <${HomeIcon}
              aria-hidden="true"
              class="align-text-bottom inline"
              style=${{ width: '1.25rem' }}
            />
          </a>
          <${ChevronRightIcon}
            aria-hidden="true"
            class="inline mx-2 text-gray-500"
            style=${{ width: '1.25rem' }}
          />
        </li>
        ${utils.getBreadcrumbItems(url).map(
          (item) => html`
            <li class="inline list-none">
              <a class="link" href=${item.href}>${item.text}</a>
              <${ChevronRightIcon}
                aria-hidden="true"
                class="inline mx-2 text-gray-500"
                style=${{ width: '1.25rem' }}
              />
            </li>
          `
        )}
      </ul>
    </nav>
  `
}
