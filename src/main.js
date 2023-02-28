import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HelloWorld from '@/components/HelloWorld.vue'

import './scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

const routes = [
  { path: '/', component: HelloWorld },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
const app = createApp(App)
  .use(router)
  .mount('#app')
