import Request from '@/utils/requests'

export function loginAPI({ account, password }: any) {
  return Request({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}
