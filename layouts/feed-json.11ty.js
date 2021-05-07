module.exports = ({
  collections,
  collectionsKey,
  description,
  getFullContent,
  getPublishedDate,
  permalink,
  site,
  title,
}) => {
  const json = {
    version: 'https://jsonfeed.org/version/1.1',
    title,
    home_page_url: `${site.url}/`,
    feed_url: `${site.url}${permalink}`,
    description,

    // Maybe add `icon` later. (A picture of me? From the spec: "an image for
    // the feed suitable to be used in a timeline, much the way an avatar
    // might be used.")

    // From the spec: "should be [...] relatively small, but not smaller than
    // 64 x 64 pixels (so that it can look good on retina displays)." This
    // file is the smallest yet big enough at 180 x 180 pixels
    favicon: `${site.url}/apple-touch-icon.png`,

    authors: [
      {
        name: site.author.name,
        url: `${site.url}/`,
        // Maybe add `avatar` later
      },
    ],
    language: 'en-US',
    items: collections[collectionsKey].map((item) => {
      const fullUrl = `${site.url}${item.url}`
      return {
        id: fullUrl,
        url: fullUrl,
        title: item.data.title,
        content_html: getFullContent(item),
        summary:
          (item.data.metaDescription || item.data.intro)?.trim() || undefined,
        date_published: getPublishedDate(item),
        tags: item.data.tags,
      }
    }),
  }

  // Validate important fields that can possibly be undefined/empty
  // TODO: Move this elsewhere
  if (
    process.env.NODE_ENV === 'production' &&
    json.items.find((item) => !item.title || !item.content_html)
  ) {
    throw new Error('got you!')
  }

  return process.env.NODE_ENV === 'production'
    ? JSON.stringify(json)
    : JSON.stringify(json, null, 2) // Pretty print in dev mode
}
