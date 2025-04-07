import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from '@/shared/guards';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      beforeEnter: [isAuthenticatedGuard],
      component: () => import('@/views/AppTodo.vue')
    },
    {
      path: '/about',
      component: () => import('@/views/AppAbout.vue')
    },
    {
      path: '/privacy-policy',
      component: () => import('@/views/AppPolicy.vue')
    },
    {
      path: '/login',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/views/AppLogin.vue')
    },
    {
      path: '/register',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/views/AppSignup.vue')
    },
    {
      path: '/profile',
      beforeEnter: [isAuthenticatedGuard],
      component: () => import('@/views/AppProfile.vue')
    },
    {
      path: '/:notfound(.*)*',
      component: () => import('@/views/AppNotFound.vue')
    }
  ]
});

export default router;
