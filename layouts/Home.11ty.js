const { ArrowNarrowRightIcon } = require('@heroicons/react/solid')
const { html } = require('htm/preact')
const fetch = require('node-fetch')

const Base = require('../components/Base')
const BlogList = require('../components/BlogList')
const Markdown = require('../components/Markdown')
const { isDraft } = require('../utils')
const { isDevelopmentBuild } = require('../utils/env')

module.exports = async (data) => {
  const {
    collections: { blogPosts },
    content,
    intro,
    title,
  } = data

  const latestBlogPosts = blogPosts
    .filter((post) => !isDraft(post.data))
    .slice(0, 3)

  const recentlyUpdatedBlogPosts = blogPosts
    .filter((post) => !isDraft(post.data))
    .filter((post) => !latestBlogPosts.includes(post))
    .filter((post) => post.data.updated)
    .sort((a, b) => b.data.updated - a.data.updated)
    .slice(0, 3)

  const mostVisitedBlogPosts = await getMostVisitedBlogPosts(blogPosts)

  return html`
    <${Base} ...${data}>
      <div class="prose xl:prose-lg">
        <h1>${title}</h1>

        <div class="lead">
          <${Markdown}>${intro}<//>
        </div>
        <${Markdown}>${content}<//>

        <ul class="sm:space-x-8">
          <li class="list-none !my-4 !pl-0 sm:inline">
            <span>
              <${FontAwesomeIcon.envelope}
                aria-hidden="true"
                class="align-text-bottom inline mr-3 text-gray-500"
                style=${{ width: '1.25rem' }}
              />

              <!-- Hardcoded for now™ -->
              hello @ this domain
            </span>
          </li>
          ${[
            {
              ariaLabel: 'My GitHub account',
              href: 'https://github.com/mtsknn',
              icon: 'github-alt',
              text: 'GitHub',
            },
            {
              ariaLabel: 'My Stack Overflow account',
              href: 'https://stackoverflow.com/users/1079869/matias-kinnunen',
              icon: 'stack-overflow',
              text: 'Stack Overflow',
            },
          ].map(
            (item) => html`
              <li class="list-none !my-4 !pl-0 sm:inline">
                <a aria-label=${item.ariaLabel} class="link" href=${item.href}>
                  <${FontAwesomeIcon[item.icon]}
                    aria-hidden="true"
                    class="align-text-bottom inline mr-3 text-gray-500"
                    style=${{ width: '1.25rem' }}
                  />
                  ${item.text}
                </a>
              </li>
            `
          )}
        </ul>

        <hr aria-hidden="true" />

        <h2>Latest blog posts</h2>
        <${BlogList} headingLevel=${3} posts=${latestBlogPosts} />

        <hr aria-hidden="true" />

        ${recentlyUpdatedBlogPosts.length > 0 &&
        html`
          <h2>Recently updated blog posts</h2>
          <${BlogList} headingLevel=${3} posts=${recentlyUpdatedBlogPosts} />

          <hr aria-hidden="true" />
        `}
        ${mostVisitedBlogPosts.length > 0 &&
        html`
          <h2>Most visited blog posts in the past 30 days</h2>
          <p>Table updated once a day.</p>

          <table>
            <thead>
              <tr>
                <th>Post</th>
                <th class="text-right">Visitors</th>
              </tr>
            </thead>
            <tbody>
              ${mostVisitedBlogPosts.map(
                (post) => html`
                  <tr>
                    <td>
                      <a class="link" href=${post.url}>
                        <${Markdown} inline>${post.title}<//>
                      </a>
                    </td>
                    <td class="text-right">
                      ${post.visitors.toLocaleString('en')}
                    </td>
                  </tr>
                `
              )}
            </tbody>
          </table>

          <hr aria-hidden="true" />
        `}

        <aside>
          <p class="!mb-3">
            <a class="link" href="/blog/">
              All blog posts
              <${ArrowNarrowRightIcon}
                aria-hidden="true"
                class="inline ml-2 text-gray-500"
                style=${{ width: '1.25rem' }}
              />
            </a>
          </p>
        </aside>
      </div>
    <//>
  `
}

async function getMostVisitedBlogPosts(allBlogPosts) {
  const plausibleApiToken = process.env.PLAUSIBLE_API_TOKEN
  const plausibleSiteId = process.env.PLAUSIBLE_SITE_ID

  if (!plausibleApiToken || !plausibleSiteId) {
    console.warn(
      'Missing PLAUSIBLE_API_TOKEN and/or PLAUSIBLE_SITE_ID env variables -> not getting most visited blog posts'
    )
    return []
  }

  if (isDevelopmentBuild) {
    // `min` is inclusive, `max` is exclusive
    const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)

    const oneFifth = Math.floor(allBlogPosts.length / 5)

    return [
      allBlogPosts[rand(oneFifth * 0, oneFifth * 1)],
      allBlogPosts[rand(oneFifth * 1, oneFifth * 2)],
      allBlogPosts[rand(oneFifth * 2, oneFifth * 3)],
      allBlogPosts[rand(oneFifth * 3, oneFifth * 4)],
      allBlogPosts[rand(oneFifth * 4, oneFifth * 5)],
    ]
      .map((post) => ({
        title: post.data.title,
        url: post.url,
        visitors: rand(1, 12_345),
      }))
      .sort((a, b) => b.visitors - a.visitors)
  }

  try {
    const response = await fetch(
      `https://plausible.io/api/v1/stats/breakdown?site_id=${plausibleSiteId}&period=30d&property=event:page`,
      {
        headers: { Authorization: `Bearer ${plausibleApiToken}` },
      }
    )
    const json = await response.json()

    return json.results
      .filter(
        ({ page: url }) =>
          url.startsWith('/blog/') &&
          !url.startsWith('/blog/tags/') &&
          url !== '/blog/'
      )
      .map(({ page: url, visitors }) => {
        const blogPost = allBlogPosts.find((post) => post.url === url)
        if (!blogPost) return null
        return { title: blogPost.data.title, url, visitors }
      })
      .filter(Boolean)
      .slice(0, 5)
  } catch (e) {
    console.error('Error getting most visited blog posts:', e)
    return []
  }
}

// Font Awesome Free 5.15.2 icons by @fontawesome - https://fontawesome.com.
// License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Code: MIT License)
function FontAwesomeIcon() {
  return null
}

FontAwesomeIcon.envelope = (props) => html`
  <svg fill="currentColor" viewBox="0 0 512 512" ...${props}>
    <path
      d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
    />
  </svg>
`

FontAwesomeIcon['github-alt'] = (props) => html`
  <svg fill="currentColor" viewBox="0 0 480 512" ...${props}>
    <path
      d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"
    />
  </svg>
`

FontAwesomeIcon['stack-overflow'] = (props) => html`
  <svg fill="currentColor" viewBox="0 0 384 512" ...${props}>
    <path
      d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"
    />
  </svg>
`
