import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/api/user'
import { useCartStore } from './cart'
import { mergeCartAPI } from '@/api/cart'

export const useUserStore = defineStore(
  'user',
  () => {
    const cartStore = useCartStore()
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }: any) => {
      const res = (await loginAPI({ account, password })) as any
      userInfo.value = res.result
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: (item as { skuId: any }).skuId,
            setected: (item as { setected: any }).setected,
            count: (item as { count: any }).count
          }
        })
      )
      cartStore.updateNewList()
    }
    const reUserInfo = () => {
      userInfo.value = {}
      cartStore.clearCart()
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
