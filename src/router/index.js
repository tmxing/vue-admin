import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 项目刚运行时重定向到登录页面
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/views/login/index')
  },

  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/list',
    meta: { title: '顾客管理', icon: 'example' },
    children: [{
      path: 'list',
      name: 'Customer',
      component: () => import('@/pages/customer/Customer'),
      meta: { title: '顾客管理', icon: 'dashboard' }
    },{
        path: 'detail',
        name: 'Detail',
        component: () => import('@/pages/customer/List'),
        meta: { title: '顾客详情', icon: 'tree' },
        hidden: true
    }]
  },
  
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    meta: { title: '产品管理', icon: 'example' },
    children: [{
      path: 'list',
      name: 'Product',
      component: () => import('@/pages/product/Product'),
      meta: { title: '产品管理', icon: 'dashboard' }
    },{
        path: 'detail',
        name: 'Detail',
        component: () => import('@/pages/product/List'),
        meta: { title: '产品详情', icon: 'tree' },
        hidden: true
    }]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order',
    meta: { title: '订单管理', icon: 'example' },
    children: [{
      path: 'order',
      name: 'Order',
      component: () => import('@/pages/order/Order'),
      meta: { title: '订单管理', icon: 'dashboard' }
    },{
      path: 'list',
      name: 'List',
      component: () => import('@/pages/order/List'),
      meta: { title: '订单详情', icon: 'dashboard' },
      hidden:true
    }]
  },
  
  {
    path: '/waiter',
    component: Layout,
    redirect: '/waiter/waiter',
    meta: { title: '员工管理', icon: 'example' },
    children: [{
      path: 'waiter',
      name: 'Waiter',
      component: () => import('@/pages/waiter/Waiter'),
      meta: { title: '员工管理', icon: 'dashboard' }
    },{
      path: 'list',
      name: 'List',
      component: () => import('@/pages/waiter/List'),
      meta: { title: '员工管理', icon: 'dashboard' },
      hidden:true
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
