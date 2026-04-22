<script setup lang="ts">
import { useCart } from '../composable/useCard'
const { cartCount } = useCart()
</script>

<template>
  <nav class="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 shadow-xl p-4">
    <div class="container mx-auto flex justify-between items-center">
      
      <router-link to="/" class="flex items-center space-x-3 group cursor-pointer text-white no-underline">
        <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
          <span class="text-purple-700 font-black text-xl">S</span>
        </div>
        <h1 class="text-2xl font-black tracking-tighter uppercase italic">StyleHub</h1>
      </router-link>

      <div class="hidden md:flex space-x-8 text-[12px] font-black text-purple-100 uppercase tracking-widest">
        <router-link to="/" class="hover:text-white transition-colors no-underline">Home</router-link>
        <router-link to="/" class="hover:text-white transition-colors no-underline">Products</router-link>
        <router-link to="/cart" class="hover:text-white transition-colors no-underline">Cart</router-link>
      </div>

      <div class="flex items-center space-x-5">
        <button class="text-white hover:scale-110 transition-transform">
          <span class="text-xl">🔍</span>
        </button>
        
        <router-link to="/cart" class="relative bg-white/10 p-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all group no-underline">
          <span class="text-xl text-white">🛒</span>
          <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">
            {{ cartCount }}
          </span>
        </router-link>
      </div>

    </div>
  </nav>
</template>

<style scoped>

.no-underline {
  text-decoration: none;
}
</style>