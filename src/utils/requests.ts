import axios from 'axios'

const Request = axios.create({
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 50000
})

/**
 * axios请求拦截器
 */
Request.interceptors.request.use(
  (config) => config,
  (e) => Promise.reject(e)
)

/**
 * axios响应拦截器
 */
Request.interceptors.response.use(
  (res) => res.data,
  (e) => Promise.reject(e)
)

export default Request
