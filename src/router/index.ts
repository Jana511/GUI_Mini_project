import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductDetail from '../views/ProductDetails.vue' // මෙහි නම පරීක්ෂා කරන්න

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/product/:id', name: 'ProductDetail', component: ProductDetail, props: true }
  ]
})

export default router