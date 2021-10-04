const { ArrowCircleUpIcon, RssIcon } = require('@heroicons/react/outline')
const clsx = require('clsx')
const { html } = require('htm/preact')

const Breadcrumb = require('./Breadcrumb')
const SkipLink = require('./SkipLink')
const site = require('../data/site')
const { isNetlifyProductionContext } = require('../utils')
const entity = require('../utils/entity')
const { isDevelopmentBuild } = require('../utils/env')
const navItems = require('../utils/navItems')

module.exports = ({
  children,
  intro,
  metaDescription,
  metaTitle,
  page,
  title,
}) => html`
  <html lang="en">
    <${Head}
      intro=${intro}
      metaDescription=${metaDescription}
      metaTitle=${metaTitle}
      page=${page}
      title=${title}
    />
    <body
      class=${clsx(
        'bg-gray-50 break-words font-sans',
        isDevelopmentBuild && 'debug-screens'
      )}
      id="top"
    >
      <div class="max-w-4xl mx-auto p-6">
        <${Header} page=${page} />
        <main class="mb-12 pt-12" id="main">
          ${page.url !== '/' &&
          page.url !== '/404.html' &&
          html`
            <${Breadcrumb} url=${page.url} />
          `}
          ${children}
        </main>
        <${Footer} />
      </div>
    </body>
  </html>
`

function Head({ intro, metaDescription, metaTitle, page, title }) {
  return html`
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>
        ${(metaTitle || title).trim()}
        ${page.url !== '/' && ` ${entity.ndash} ${site.title}`}
      </title>

      <link rel="canonical" href=${`${site.url}${page.url}`} />

      ${(metaDescription || intro || '').trim() &&
      html`
        <meta
          name="description"
          content=${(metaDescription || intro).trim().replace(/\n/g, ' ')}
        />
      `}

      <!-- Favicon formats generated with https://realfavicongenerator.net/ 👍 -->
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fc8181" />
      <meta name="theme-color" content="#fc8181" />

      <link
        rel="preload"
        href="/fonts/Inter/Inter.latin.var.woff2?v=3.15"
        as="font"
        type="font/woff2"
        crossorigin
      />
      <link
        rel="preload"
        href="/fonts/JetBrains Mono/jetbrains-mono-v3-latin-regular.woff2"
        as="font"
        type="font/woff2"
        crossorigin
      />

      <link rel="stylesheet" href="/main.css" />

      <link
        rel="alternate"
        type="application/atom+xml"
        href="/feeds/all.xml"
        title="All content (Atom/RSS)"
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        href="/feeds/blog.xml"
        title="Blog (Atom/RSS)"
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        href="/feeds/weekly-log.xml"
        title="Weekly log (Atom/RSS)"
      />

      <link
        rel="alternate"
        type="application/json+feed"
        href="/feeds/all.json"
        title="All content (JSON)"
      />
      <link
        rel="alternate"
        type="application/json+feed"
        href="/feeds/blog.json"
        title="Blog (JSON)"
      />
      <link
        rel="alternate"
        type="application/json+feed"
        href="/feeds/weekly-log.json"
        title="Weekly log (JSON)"
      />

      ${isNetlifyProductionContext &&
      html`
        <script
          data-api="/elbisualp/api/event"
          data-domain="mtsknn.fi"
          defer
          src="/elbisualp/js/script.js"
        ></script>
      `}
    </head>
  `
}

function Header({ page }) {
  return html`
    <header class="border-b border-gray-300 pb-6">
      <${SkipLink} class="main-skip-link xl:!mr-6" href="#main">
        Skip to content
      <//>

      <nav
        aria-label="Main navigation"
        class="flex flex-col justify-between text-center sm:flex-row sm:text-left"
      >
        <a
          aria-label="mtsknn dot f i - go to the front page."
          class="font-bold font-mono hover:text-red-600 active:text-red-700 xl:text-lg"
          href="/"
        >
          <!--
            Even though the link has an aria-label,
            VoiceOver on iPad would sometimes choose one of the elements below
            and read it instead of the aria-label.
            Thus the aria-hidden is required even though it seems redundant.
          -->
          <span aria-hidden="true">
            ${page.url === '/'
              ? html`
                  m
                  <span class="logo-character">a</span>
                  t
                  <span class="logo-character logo-character--length-2">
                    ia
                  </span>
                  s
                  <span class="logo-character">${entity.nbsp}</span>
                  k
                  <span class="logo-character">i</span>
                  nn
                  <span class="logo-character logo-character--length-4">
                    unen
                  </span>
                  <span class="logo-domain-extension">.fi</span>
                `
              : html`
                  mtsknn
                  <span class="opacity-50">.fi</span>
                `}
          </span>
        </a>
        <div class="-ml-6 space-x-6 space-y-4 sm:space-y-0 xl:space-x-8">
          ${navItems.topNav.map(
            (item, i) => html`
              <a
                class=${clsx(
                  'inline-block whitespace-no-wrap',
                  (page.url || '').startsWith(item.href) && 'font-bold',
                  i === 0 && 'mt-4 ml-6 sm:mt-0 sm:ml-0',
                  'hover:text-red-600 active:text-red-800 xl:text-lg'
                )}
                href=${item.href}
              >
                ${item.text}
              </a>
            `
          )}
          <a
            aria-label="RSS/Atom and JSON feeds"
            class=${clsx(
              'inline-block text-gray-500',
              (page.url || '').startsWith('/feeds/') && 'text-gray-800',
              'hover:text-red-600 active:text-red-800'
            )}
            href="/feeds/"
          >
            <${RssIcon}
              aria-hidden="true"
              class="align-text-top inline-block xl:align-top xl:!w-6"
              style=${{ width: '1.25rem' }}
            />
          </a>
        </div>
      </nav>
    </header>
  `
}

function Footer() {
  return html`
    <footer
      class="border-t border-gray-300 flex items-baseline justify-between pt-6 text-gray-700 text-sm xl:text-base"
    >
      <div class="text-gray-500 text-left">
        ${entity.copy} ${site.title} 2020${entity.ndash}2021.
      </div>
      <a aria-label="Scroll to top" class="ml-4 hover:opacity-75" href="#top">
        <${ArrowCircleUpIcon}
          aria-hidden="true"
          class="align-top inline text-gray-500"
          style=${{ width: '1.25rem' }}
        />
      </a>
    </footer>
  `
}
