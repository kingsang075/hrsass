// 权限导航，路由守卫
import router from '@/router'
import store from '@/store' // 引入store实例，和this.$store一样
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css'
const writeList = ['/login', '/404'] // 自定义白名单
// 前置守卫 next是必须执行的钩子。不执行页面会失败
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 如果有token
    if (to.path === '/login') {
      // 访问是登录页，跳到主页
      next('/')
    } else {
      if (!store.getters.userId) {
        // 如果没有id才表示当前用户资料没获取过
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有token情况下
    if (writeList.indexOf(to.path) > -1) {
      // 要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done() // 解决手动切换地址，进度条不关闭问题
})
// 后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
