import Vue from 'vue'
import router from '@/router'

Vue.directive('permission', {
  inserted (el, bind) {
    // 被绑定的元素插入到父节点下面时触发，bind（只调用一次），update（所在组件的 VNode 更新时调用，可能发生在子 VNode 之前），componentUpdated（所在组件 VNode 更新及 子 VNode 全部更新后调用）
    const { action, effect } = bind.value
    const meta = router.currentRoute.meta
    if (meta.indexOf(action) === -1) {
      if (effect === 'disabled') {
        el.disabled = true
        el.classList.add('is-disabled')
      } else {
        el.parentNode.removeChild(el)
      }
    }
  }
})