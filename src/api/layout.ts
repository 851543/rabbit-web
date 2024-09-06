import Request from '@/utils/requests'

export function getCategoryAPI() {
  return Request({
    url: '/home/category/head'
  })
}
