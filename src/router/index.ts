import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductDetail from '../views/ProductDetails.vue'
import CartPage from '../views/cartPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/product/:id', name: 'ProductDetail', component: ProductDetail, props: true },
    { path: '/cart', name: 'Cart', component: CartPage }
  ]
})

export default router