import { onMounted, ref } from 'vue'

import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { getTopCategoryAPI } from '@/api/category'
export function useCategory() {
  const categoryData = ref({})
  const router = useRoute()

  const getTopCategory = async (id: any = router.params.id) => {
    const { result } = (await getTopCategoryAPI(id)) as any
    categoryData.value = result
  }

  onMounted(() => {
    getTopCategory()
  })

  onBeforeRouteUpdate((to) => {
    getTopCategory(to.params.id)
  })

  return {
    categoryData
  }
}
