import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductDetail from '../views/ProductDetails.vue'
import CartPage from '../views/cartPage.vue'
import LoginPage from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(),
  // පිටුව සුමටව scroll වීමට මෙම කොටස එක් කරන්න
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80, // Navbar එකට මුවා නොවී පරතරයක් තැබීමට
      }
    }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/product/:id', name: 'ProductDetail', component: ProductDetail, props: true },
    { path: '/cart', name: 'Cart', component: CartPage },
    { path: '/login', name: 'Login', component: LoginPage }
  ]
})

export default router