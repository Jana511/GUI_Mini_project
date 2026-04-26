<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useProducts } from '../composable/useProducts'
import { useCart } from '../composable/useCard'

const route = useRoute()
const { filteredProducts, fetchProducts } = useProducts()
const { addToCart } = useCart()

onMounted(fetchProducts)

const product = computed(() => {
  return filteredProducts.value.find(p => p.id === Number(route.params.id))
})

const buyNow = (product: any) => {
  alert(`Buying: ${product.title}`)
}
</script>

<template>
  <div v-if="product" class="container mx-auto p-10">
    <router-link to="/" class="mb-6 inline-block text-[#FF85A1] font-bold uppercase tracking-widest no-underline hover:translate-x-[-5px] transition-transform">
      ← Back to Store
    </router-link>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-10 rounded-[2.5rem] shadow-sm border border-pink-50">
      
      <div class="bg-[#FFF9FA] rounded-3xl p-8 flex items-center justify-center border border-pink-50">
        <img :src="product.thumbnail" :alt="product.title" class="max-h-96 object-contain hover:scale-105 transition-transform duration-500" />
      </div>
      
      <div class="flex flex-col justify-center">
        <h1 class="text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight">{{ product.title }}</h1>
        <p class="text-gray-500 leading-relaxed mb-8 text-lg">{{ product.description }}</p>
        
        <p class="text-4xl font-black text-[#FF85A1] mb-8">${{ product.price }}</p>
        
        <div class="flex flex-col gap-4">
          <button 
            @click="addToCart(product)" 
            class="bg-[#FF85A1] text-white py-5 rounded-2xl font-black uppercase hover:bg-[#FF6B91] hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-pink-100"
          >
            Add to Cart
          </button>
          
          <button 
            @click="buyNow(product)"
            class="bg-white text-[#FF85A1] border-2 border-[#FF85A1] py-5 rounded-2xl font-black uppercase hover:bg-pink-50 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Buy now
          </button>
        </div>

        <div class="mt-8 pt-8 border-t border-pink-50 flex items-center gap-4">
          <span class="text-[10px] font-black text-pink-200 uppercase tracking-[0.3em]">Category</span>
          <span class="bg-pink-50 text-[#FF85A1] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            {{ product.category }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* පිටුවට මෘදු පෙනුමක් ලබා දීමට */
.no-underline {
  text-decoration: none;
}
</style>