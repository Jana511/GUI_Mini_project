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
    <router-link to="/" class="mb-6 inline-block text-blue-600 font-bold uppercase tracking-widest">
      ← Back to Store
    </router-link>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
      <div class="bg-gray-50 rounded-3xl p-8 flex items-center justify-center">
        <img :src="product.thumbnail" :alt="product.title" class="max-h-96 object-contain" />
      </div>
      
      <div class="flex flex-col justify-center">
        <h1 class="text-5xl font-black text-gray-900 mb-4 tracking-tight">{{ product.title }}</h1>
        <p class="text-gray-500 leading-relaxed mb-8 text-lg">{{ product.description }}</p>
        <p class="text-4xl font-black text-blue-600 mb-8">${{ product.price }}</p>
        
        <!-- පළමු බොත්තම -->
        <button 
          @click="addToCart(product)" 
          class="bg-black text-white py-5 rounded-2xl font-black uppercase hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          Add to Cart
        </button>
        
        <!-- මෙන්න spacer එක – මෙය නිසැකවම හිස් තැනක් හදයි -->
        <div class="h-6"></div>
        
        <!-- දෙවන බොත්තම -->
        <button 
          @click="buyNow(product)"
          class="bg-black text-white py-5 rounded-2xl font-black uppercase hover:scale-105 active:scale-95 transition-all shadow-lg"
        >
          Buy now
        </button>
      </div>
    </div>
  </div>
</template>