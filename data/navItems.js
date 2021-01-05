const navItems = {}

// Items in the top nav and breadcrumb navs
navItems.all = [
  { href: '/blog/', text: 'Blog' },
  { href: '/blog/tags/', text: 'Tags' },
  { href: '/cookbook/', text: 'Cookbook' },
]

navItems.topNav = navItems.all.filter((item) =>
  ['Blog', 'Cookbook'].includes(item.text)
)

module.exports = navItems
