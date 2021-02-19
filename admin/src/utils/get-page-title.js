import defaultSettings from '@/settings'

const title = defaultSettings.title || '学习网站管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
