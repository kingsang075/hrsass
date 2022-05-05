// 员工的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [{
    path: '', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理',
      icon: 'people' // 左侧导航读取title属性
    } // 路由元信息，可以放任何信息
  }, {
    path: 'detail/:id', // 动态路由参数
    component: () => import('@/views/employees/detail'),
    hidden: true,
    meta: {
      title: '员工详情'
    }
  }, {
    path: 'print/:id',
    component: () => import('@/views/employees/print'),
    hidden: true,
    meta: {
      title: '员工打印',
      icon: 'people'
    }
  }]
}

