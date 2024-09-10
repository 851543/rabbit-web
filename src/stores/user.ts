import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }: any) => {
      const res = (await loginAPI({ account, password })) as any
      userInfo.value = res.result
    }
    const reUserInfo = () => {
      userInfo.value = {}
    }
    // 3. 以对象的格式把state和action return
    return {
      userInfo,
      getUserInfo,
      reUserInfo
    }
  },
  {
    persist: true
  }
)
