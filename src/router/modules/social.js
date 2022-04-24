// 社保的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/social',
  name: 'social',
  component: Layout,
  children: [{
    path: '', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
    component: () => import('@/views/social'),
    meta: {
      title: '社保',
      icon: 'table' // 左侧导航读取title属性
    } // 路由元信息，可以放任何信息
  }]
}
