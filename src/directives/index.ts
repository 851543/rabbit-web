/**
 * 定义懒加载插件
 */
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app: any) {
    /**
     * 懒加载指令逻辑
     */
    app.directive('img-lazy', {
      mounted(el: any, binding: any) {
        /**
         * el 指令绑定元素
         * binding 指令表达式的值
         */
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value
            stop()
          }
        })
      }
    })
  }
}
