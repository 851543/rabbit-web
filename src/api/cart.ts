import Request from '@/utils/requests'
// 加入购物车
export const insertCartAPI = ({ skuId, count }: any) => {
  return Request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

export const findNewCartListAPI = () => {
  return Request({
    url: '/member/cart'
  })
}

// 删除购物车
export const delCartAPI = (ids: any) => {
  return Request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

export const mergeCartAPI = (data: any) => {
  return Request({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}
