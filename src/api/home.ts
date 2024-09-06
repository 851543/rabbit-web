import Request from '@/utils/requests'

/**
 * 获取轮廓图
 * @returns
 */
export function getBannerAPI() {
  return Request({
    url: '/home/banner'
  })
}

/**
 * 获取新鲜好物
 * @returns
 */
export function findNewAPI() {
  return Request({
    url: '/home/new'
  })
}

/**
 * 获取人气推荐
 * @returns
 */
export function findHotAPI() {
  return Request({
    url: '/home/hot'
  })
}

export const getGoodsAPI = () => {
  return Request({
    url: '/home/goods'
  })
}
