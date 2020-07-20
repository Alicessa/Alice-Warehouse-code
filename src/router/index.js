import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'//缺省时候重定向到/home
    },
    {
      path: '/home',
      component: () => import ('../views/home/Home.vue')
    },
    {
      path: '/category',
      component: () => import ('../views/category/Category')
    },
    {
      path: '/cart',
      component: () => import ('../views/cat/Cat')
    },
    {
      path: '/profile',
      component: () => import ('../views/profile/Profile')
    },
    {
      path :'/detail/:iid',
      component:()=>import('../views/detail/Detail')

    }
  ],
  mode:'history'
})