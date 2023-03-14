import { createRouter, createWebHashHistory } from 'vue-router'
import GetStarted from '../views/GetStarted.vue'
import Survey from '@/views/Survey.vue'
import DoingSomeMath from '@/views/DoingSomeMath.vue'
import DisplayCase from '@/views/DisplayCase.vue'
import NotFoundError from '@/views/NotFoundError.vue'
/*React Pages*/

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/get-started',
  },
  {
    path: '/get-started',
    name: 'GetStarted',
    component: GetStarted,
  },
  {
    path: '/survey/:index(\\d)',
    name: 'Survey',
    component: Survey,
  },
  {
    path: '/results/',
    name: 'DoingSomeMath',
    component: DoingSomeMath,
  },
  {
    path: '/results/product-incentives',
    name: 'DisplayCase',
    component: DisplayCase,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundError,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes],
  linkActiveClass: 'active',
})

router.isReady().then(() => {
  console.log('route ready')
}).catch((error) => {
  console.error('catch the error', error)
})

export default router
