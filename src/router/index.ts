import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { title, pages } from '@/common/constant/index';

const routes: Array<RouteRecordRaw> = pages.map((item) => {
  const obj:any = {
    path: `/${item.name === 'index' ? '' : item.name}`,
    name: item.name,
    meta: {
      title: item.title
    },
    component: () => import(`@/views/${item.name}.vue`),
  };
  if (item.subPages.length) {
    obj.redirect = (to:any) => {
      return { path: `${item.name === 'index' ? '' : `/${item.name}`}/${item.subPages[0].name}`, query: { token: to.query.token } }
    }
    obj.children = item.subPages.map(child => ({
      path: `${item.name === 'index' ? '' : `/${item.name}`}/${child.name}`,
      name: child.name,
      meta: {
        title: child.title
      },
      component: () => import(`@/views/${item.name}/${child.name}.vue`)
    }));
  }
  return obj;
});

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string)??title;
  next();
});

export default router;