import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const Request = axios.create({
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 50000
})

/**
 * axios请求拦截器
 */
Request.interceptors.request.use(
  (config) => {
    // 1. 从pinia获取token数据
    const userStore = useUserStore()
    // 2. 按照后端的要求拼接token数据
    const token = (userStore.userInfo as { token: any }).token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e)
)

/**
 * axios响应拦截器
 */
Request.interceptors.response.use(
  (res) => res.data,
  (e) => {
    ElMessage({
      type: 'warning',
      message: e.response.data.message
    })

    // 1. 从pinia获取token数据
    const userStore = useUserStore()
    if (e.response.status === 401) {
      userStore.reUserInfo()
      router.push('/login')
    }

    return Promise.reject(e)
  }
)

export default Request
