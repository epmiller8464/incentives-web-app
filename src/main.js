import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'

import './scss/styles.scss'

import '@popperjs/core'

import * as bootstrap from 'bootstrap'

const app = createApp(App)

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.authFree)) {
//     next()
//   } else {
//     requireAuth(to, from, next, router.app)
//   }
// })
//
// preserve query params
// router.beforeEach((to, from, next) => {
//   function hasQueryParams(q) {
//     return !!Object.keys(q).length
//   }
//   if (
//     hasQueryParams(from.query) &&
//     !hasQueryParams(to.query) &&
//     from.path !== to.path &&
//     from.path !== '/login'
//   ) {
//     delete from.query.redirect
//     next({ ...to, query: from.query })
//   } else {
//     next()
//   }
// })

app.use(createPinia()).use(router).mount('#app')
