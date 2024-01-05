import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    redirect: to => {
      return { path: '/demo', query: { token: to.query.token } }
    },
    component: () => import('../views/index.vue'),
    children: [
      { 
        path: '/demo', 
        name: 'Demo',
        meta: {
          title: '示例'
        },
        component: () => import('../views/index/demo.vue') 
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string)??'大屏模板';
  next();
});

export default router
