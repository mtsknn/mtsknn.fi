const navItems = {}

// Items in the top nav and breadcrumb navs
navItems.all = [
  { href: '/blog/', text: 'Blog' },
  { href: '/blog/tags/', text: 'Tags' },
  { href: '/projects/', text: 'Projects' },
]

navItems.topNav = navItems.all.filter((item) =>
  ['Blog', 'Projects'].includes(item.text)
)

module.exports = navItems
