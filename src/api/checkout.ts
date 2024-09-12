import Request from '@/utils/requests'
/**
 * 获取结算信息
 */
export const getCheckoutInfoAPI = () => {
  return Request({
    url: '/member/order/pre'
  })
}

// 创建订单
export const createOrderAPI = (data: any) => {
  return Request({
    url: '/member/order',
    method: 'POST',
    data
  })
}
