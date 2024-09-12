// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/api/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 1. 定义state - cartList
    const cartList = ref([])
    const userStore = useUserStore()
    const isLogin = computed(() => (userStore.userInfo as { token: any }).token)
    // 2. 定义action - addCart
    const addCart = async (goods: never) => {
      const { skuId, count } = goods
      if (isLogin.value) {
        // 登录之后的加入购车逻辑
        await insertCartAPI({ skuId, count })
        updateNewList()
      } else {
        // 添加购物车操作
        // 已添加过 - count + 1
        // 没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find(
          (item) => (goods as { skuId: any }).skuId === (item as { skuId: any }).skuId
        )
        if (item) {
          // 找到了
          ;(item as { count: any }).count += (goods as { count: any }).count
        } else {
          // 没找到
          cartList.value.push(goods)
        }
      }
    }
    // 删除购物车
    const delCart = async (skuId: any) => {
      if (isLogin.value) {
        await delCartAPI([skuId])
        updateNewList()
      } else {
        // 思路：
        // 1. 找到要删除项的下标值 - splice
        // 2. 使用数组的过滤方法 - filter
        const idx = cartList.value.findIndex((item) => skuId === (item as { skuId: any }).skuId)
        cartList.value.splice(idx, 1)
      }
    }

    const clearCart = () => {
      cartList.value = []
    }

    const updateNewList = async () => {
      const res: any = await findNewCartListAPI()
      cartList.value = res.result
    }
    // 单选功能
    const singleCheck = (skuId: any, selected: any) => {
      // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
      const item: any = cartList.value.find((item) => (item as { skuId: any }).skuId === skuId)
      item.selected = selected
    }
    // 全选功能action
    const allCheck = (selected: any) => {
      // 把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item) => ((item as { selected: any }).selected = selected))
    }

    // 是否全选计算属性
    const isAll = computed(() =>
      cartList.value.every((item) => (item as { selected: any }).selected)
    )
    // 计算属性
    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + (c as { count: any }).count, 0)
    )
    const allPrice = computed(() =>
      cartList.value.reduce(
        (a, c) => a + (c as { count: any }).count * (c as { price: any }).price,
        0
      )
    )
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => (item as { selected: any }).selected)
        .reduce((a, c) => a + (c as { count: any }).count, 0)
    )
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => (item as { selected: any }).selected)
        .reduce((a, c) => a + (c as { count: any }).count * (c as { price: any }).price, 0)
    )
    return {
      cartList,
      delCart,
      addCart,
      singleCheck,
      allCheck,
      clearCart,
      updateNewList,
      isAll,
      allCount,
      allPrice,
      selectedCount,
      selectedPrice
    }
  },
  {
    persist: true
  }
)
