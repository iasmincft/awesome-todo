import { defineBoot } from '#q-app/wrappers'
import { LocalStorage } from 'quasar'

export default defineBoot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const loggedIn = LocalStorage.getItem('loggedIn')

    const isAuthPage = to.path === '/auth'

    if (!loggedIn && !isAuthPage) {
      next('/auth')
    }
    else if (loggedIn && isAuthPage) {
      next('/')
    }
    else {
      next()
    }
  })
})