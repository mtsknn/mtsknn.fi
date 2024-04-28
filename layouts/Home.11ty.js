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
