<script setup lang="ts">

import type { Product } from '../composable/useProducts'

defineProps<{
  product: Product
}>()
</script>

<template>
  <div class="group bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 cursor-pointer active:scale-95">
    <div class="relative overflow-hidden rounded-2xl bg-gray-50 mb-6 aspect-square flex items-center justify-center p-4">
      <img 
        :src="product.thumbnail" 
        :alt="product.title"
        class="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
      />
    </div>

    <div class="space-y-2">
      <h3 class="font-black text-gray-900 truncate leading-tight">{{ product.title }}</h3>
      <div class="flex items-center justify-between">
        <p class="text-xl font-black text-blue-600">${{ product.price }}</p>
        <span class="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{{ product.category }}</span>
      </div>
    </div>
  </div>
</template>