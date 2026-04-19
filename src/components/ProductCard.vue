<script setup lang="ts">
import type { Product } from './useProducts'

defineProps<{ product: Product }>()
</script>

<template>
  <div class="bg-white p-4 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
    <div class="h-56 overflow-hidden rounded-[2rem] bg-gray-50 flex items-center justify-center p-6 relative">
      <div class="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">
        {{ product.category.replace('-', ' ') }}
      </div>
      <img 
        :src="product.thumbnail" 
        :alt="product.title" 
        class="h-full object-contain group-hover:scale-110 transition-transform duration-700" 
      />
    </div>

    <div class="mt-6 px-2 text-center">
      <h3 class="font-bold text-gray-800 text-md truncate">{{ product.title }}</h3>
      <p class="text-[10px] text-gray-400 uppercase font-bold tracking-tighter mt-1">
        Premium Collection
      </p>
      
      <div class="mt-4 flex flex-col items-center">
        <span class="text-2xl font-black text-blue-600">${{ product.price }}</span>
        <button class="mt-4 w-full bg-gray-900 text-white py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-100 active:scale-95">
          View Details
        </button>
      </div>
    </div>
  </div>
</template>