import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

Vue.use(VueRouter)

const menuOne = {
  path: '/menu/one',
  // name: '菜单栏1',
  component: () => import('@/views/Page1.vue')
  // 元信息
  // meta: {}
}
const menuTwo = {
  path: '/menu/two',
  // name: '菜单栏1',
  component: () => import('@/views/Page1.vue')
}
const error404 = {
  path: '*',
  name: 'NotFound',
  component: NotFound
}

// 路由规则和字符串的映射关系
const mapObject = {
  '/': menuOne,
  '/menu/one': menuOne,
  '/menu/two': menuTwo
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/menu/one',
    children: [
      // {
      //   path: '/menu/one',
      //   // name: '菜单栏1',
      //   component: () => import('@/views/Page1.vue')
      // }, {
      //   path: '/menu/two',
      //   // name: '菜单栏2',
      //   component: () => import('@/views/Page1.vue')
      // },
      // {
      //   path: '/menu/three',
      //   component: () => import('@/views/Page1.vue')
      // }, {
      //   path: '/menu/four',
      //   component: () => import('@/views/Page1.vue')
      // }, {
      //   path: '/menu/five',
      //   component: () => import('@/views/Page1.vue')
      // }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  // {
  //   path: '*',
  //   name: 'NotFound',
  //   component: NotFound
  // }
]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
// 重写了原型上的push方法，统一的处理了错误信息
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  // 先判断去哪里，再判断有无 token，没有 token 返回登录页
  const token = sessionStorage.getItem('token') || ''
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

// 定义动态添加路由的方法
export const initDynamicRoutes = () => {
  console.log('根据后端返回的权限标识，动态生成路由', router)
  const currentRoutes = router.options.routes
  // 遍历二级权限
  const rightList = store.state.rightList
  rightList.forEach(item => {
    item.children.forEach(item => {
      // item 二级权限
      const temp = mapObject[item.path]
      temp.meta = item.rights
      currentRoutes[0].children.push(temp)
    })
  })
  // router.addRoutes(currentRoutes)
  // 接收一个对象或者字符串
  currentRoutes.forEach((item, index) => {
    router.addRoute(item)
    if (item.children) {
      item.children.forEach(item => router.addRoute(item))
    }
  })

  // 在所有动态路由添加完成后，再添加404页面路由
  router.addRoute(error404)
}

export default router
