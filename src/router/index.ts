import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductsPage from '../views/ProductsPage.vue'      // ✅ මෙය තියෙනවද?
import ProductDetail from '../views/ProductDetails.vue'
import CartPage from '../views/cartPage.vue'
import LoginPage from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'Home', 
      component: HomePage 
    },
    { 
      path: '/products',           // ✅ මෙම route එක තියෙනවද?
      name: 'Products', 
      component: ProductsPage 
    },
    { 
      path: '/product/:id', 
      name: 'ProductDetail', 
      component: ProductDetail, 
      props: true 
    },
    { 
      path: '/cart', 
      name: 'Cart', 
      component: CartPage 
    },
    { 
      path: '/login', 
      name: 'Login', 
      component: LoginPage 
    }
  ]
})

export default router