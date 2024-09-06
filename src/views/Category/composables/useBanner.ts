import { onMounted, ref } from 'vue'

import { getBannerAPI } from '@/api/category'
export function useBanner() {
  // 获取banner
  const bannerList = ref([])

  const getBanner = async () => {
    const res = (await getBannerAPI({
      distributionSite: '2'
    })) as any
    bannerList.value = res.result
  }

  onMounted(() => {
    getBanner()
  })

  return {
    bannerList
  }
}
