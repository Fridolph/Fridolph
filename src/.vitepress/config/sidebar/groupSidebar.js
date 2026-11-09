const domains = [
  { text: '前端开发', directories: ['01htmlcss', '02js', '07vue', '08react', '09build', '11ts', '14app', '15radash'] },
  { text: '后端开发', directories: ['05node', '18nestjs', '19database', '20deploy'] },
  { text: 'AI 应用开发', directories: ['17ai'] },
  { text: '通用基础', directories: ['03algo', '04http', '10safe', '12broswer', '13solution', '16patterns'] },
  { text: '性能优化', directories: ['06opt'] },
]

function directoryOf(item) {
  const ownDirectory = item.link?.split('/')[2]
  if (ownDirectory && /^\d{2}/.test(ownDirectory)) return ownDirectory
  for (const child of item.items ?? []) {
    const directory = directoryOf(child)
    if (directory) return directory
  }
}

export function groupSidebar(items) {
  const grouped = new Set()
  const sections = domains.map(({ text, directories }) => ({
    text,
    collapsed: false,
    items: items.filter(item => {
      if (!directories.includes(directoryOf(item))) return false
      grouped.add(item)
      return true
    }),
  })).filter(section => section.items.length)
  return [...items.filter(item => !grouped.has(item)), ...sections]
}
