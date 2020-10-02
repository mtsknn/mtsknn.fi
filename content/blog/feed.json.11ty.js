module.exports = class JsonFeed {
  data() {
    return {
      layout: null,
      eleventyExcludeFromCollections: true,
      permalink: '/blog/feed.json',
    }
  }

  render({ collections, datetime, entity, md, permalink, site }) {
    const json = {
      version: 'https://jsonfeed.org/version/1.1',
      title: `Blog ${entity.ndash} Matias Kinnunen`,
      home_page_url: `${site.url}/`,
      feed_url: `${site.url}${permalink}`,
      description:
        'A collection of my wildest adventures involving computers, cats and dragons. 🐱‍🐉',

      // Maybe add `icon` later. (A picture of me? From the spec: "an image for
      // the feed suitable to be used in a timeline, much the way an avatar
      // might be used.")

      // From the spec: "should be [...] relatively small, but not smaller than
      // 64 x 64 pixels (so that it can look good on retina displays)." This
      // file is the smallest yet big enough at 180 x 180 pixels
      favicon: `${site.url}/apple-touch-icon.png`,

      authors: [
        {
          name: 'Matias Kinnunen',
          url: `${site.url}/`,
          // Maybe add `avatar` later
        },
      ],
      language: 'en-US',
      items: collections.blog_posts.map((post) => {
        const fullUrl = `${site.url}${post.url}`
        return {
          id: fullUrl,
          url: fullUrl,
          title: post.data.title,
          content_html:
            md.render(post.data.intro) +
            post.templateContent.replace(
              /<a class="link link-permalink".+<\/a>/g,
              ''
            ),
          summary: post.data.meta_description?.trim() || undefined,

          // Blog posts don't have publication times, so let's just hard-code
          // some value
          date_published: `${datetime.robot(post.date)}T12:00:00+03:00`,

          tags: post.data.tags,
        }
      }),
    }

    // Validate important fields that can possibly be undefined/empty
    // TODO: Move this elsewhere
    if (
      process.env.NODE_ENV === 'production' &&
      json.items.find(({ title, content_html }) => !title || !content_html)
    ) {
      throw new Error('got you!')
    }

    return process.env.NODE_ENV === 'production'
      ? JSON.stringify(json)
      : JSON.stringify(json, null, 2) // Pretty print in dev mode
  }
}
