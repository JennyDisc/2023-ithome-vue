//  法1：路由為 createWebHistory 寫法

// import { createRouter, createWebHistory } from 'vue-router'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     // 註冊會員頁面
//     {
//       path: '/',
//       component: () => import('../views/FrontLayout.vue'),
//     },
//     {
//       path: '/login',
//       component: () => import('../views/front/LoginView.vue'),
//     },
//     // 多層路由
//     {
//       path: '/login/main',
//       component: () => import('../views/front/MainView.vue')
//     },
//     {
//       path: '/login/pocket',
//       component: () => import('../views/front/PocketView.vue')
//     },
//     {
//       path: '/login/comment',
//       component: () => import('../views/front/CommentView.vue')
//     },
//     // comment寫法2(html不使用v-if與v-else)
//     // {
//     //   path: '/login/comment2',
//     //   component: () => import('../views/front/CommentView2.vue')
//     // },
//     {
//       path: '/adminlogin',
//       component: () => import('../views/BackLayout.vue')
//     },
//     {
//       path: '/adminlogin/main',
//       component: () => import('../views/admin/AdminMain.vue')
//     },
//     // restaurantlist寫法1(新增餐廳區塊與api回傳資料的表格分開呈現。新增餐廳列就不受api資料表格排序影響)
//     {
//       path: '/adminlogin/restaurantlist',
//       component: () => import('../views/admin/AdminResList.vue')
//     },
//     // restaurantlist寫法2(api回傳資料的表格最末列為新增餐廳區。新增餐廳列受api資料表格排序影響)
//     {
//       path: '/adminlogin/restaurantlist2',
//       component: () => import('../views/admin/AdminResList2.vue')
//     },
//   ]
// })

// export default router

//  法2：路由為 createWebHashHistory 寫法
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // 註冊會員頁面
    {
      path: '/',
      component: () => import('../views/FrontLayout.vue'),
    },
    {
      path: '/login',
      component: () => import('../views/front/LoginView.vue'),
    },
    // 多層路由
    {
      path: '/login/main',
      component: () => import('../views/front/MainView.vue')
    },
    {
      path: '/login/pocket',
      component: () => import('../views/front/PocketView.vue')
    },
    {
      path: '/login/comment',
      component: () => import('../views/front/CommentView.vue')
    },
    // comment寫法2(html不使用v-if與v-else)
    // {
    //   path: '/login/comment2',
    //   component: () => import('../views/front/CommentView2.vue')
    // },
    {
      path: '/adminlogin',
      component: () => import('../views/BackLayout.vue')
    },
    {
      path: '/adminlogin/main',
      component: () => import('../views/admin/AdminMain.vue')
    },
    // restaurantlist寫法1(新增餐廳區塊與api回傳資料的表格分開呈現。新增餐廳列就不受api資料表格排序影響)
    {
      path: '/adminlogin/restaurantlist',
      component: () => import('../views/admin/AdminResList.vue')
    },
    // restaurantlist寫法2(api回傳資料的表格最末列為新增餐廳區。新增餐廳列受api資料表格排序影響)
    {
      path: '/adminlogin/restaurantlist2',
      component: () => import('../views/admin/AdminResList2.vue')
    },
  ]
})

export default router