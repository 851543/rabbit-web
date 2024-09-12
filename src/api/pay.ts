import Request from '@/utils/requests'

export const getOrderAPI = (id: any) => {
  return Request({
    url: `/member/order/${id}`
  })
}
