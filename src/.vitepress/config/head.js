export default (base) => [
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['link', { rel: 'apple-touch-icon', href: `${base}favicon.ico` }],
  ['link', { rel: 'mask-icon', href: `${base}favicon.ico`, color: '#3eaf7c' }],
  ['meta', { name: 'msapplication-TileImage', content: `${base}favicon.ico` }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ['link', { rel: 'shortcut icon', href: `${base}favicon.ico` }]
]
