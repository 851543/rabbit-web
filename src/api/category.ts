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

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

export const getCategoryFilterAPI = (id: any) => {
  return Request({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}

/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data: any) => {
  return Request({
    url: '/category/goods/temporary',
    method: 'POST',
    data
  })
}
