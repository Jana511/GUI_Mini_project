<script setup lang="ts">
import type { Product } from '../composable/useProducts'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="group bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-500 border border-pink-50 cursor-pointer active:scale-95">
    
    <div class="relative overflow-hidden rounded-2xl bg-[#FFF9FA] mb-6 aspect-square flex items-center justify-center p-4">
      <img 
        :src="product.thumbnail" 
        :alt="product.title"
        class="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
      />
      
      </div>

    <div class="space-y-3">
      <h3 class="font-bold text-gray-800 truncate leading-tight group-hover:text-[#FF85A1] transition-colors">
        {{ product.title }}
      </h3>
      
      <div class="flex items-center justify-between">
        <p class="text-xl font-black text-[#FF85A1]">${{ product.price }}</p>
        
        <span class="text-[9px] font-black text-pink-300 uppercase tracking-widest bg-pink-50 px-2 py-1 rounded-md">
          {{ product.category }}
        </span>
      </div>

      </div>
  </div>
</template>

<style scoped>
.group:hover img {
  filter: drop-shadow(0 10px 15px rgba(255, 133, 161, 0.2));
}
</style>