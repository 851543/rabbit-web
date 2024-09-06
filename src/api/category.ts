import Request from '@/utils/requests'

export const getTopCategoryAPI = (id: any) => {
  return Request({
    url: '/category',
    params: {
      id
    }
  })
}

export function getBannerAPI(params: any = {}) {
  // 默认为1 商品为2
  const { distributionSite = '1' } = params
  return Request({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}
