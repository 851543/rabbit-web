import Request from '@/utils/requests'
/*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/

export const getUserOrder = (params: any) => {
  return Request({
    url: '/member/order',
    method: 'GET',
    params
  })
}
