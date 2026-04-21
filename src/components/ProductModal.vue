<script setup lang="ts">

import type { Product } from '../composable/useProducts'


defineProps<{
  product: Product | null;
  isOpen: boolean;
}>()


defineEmits(['close'])
</script>

<template>
  <div v-if="isOpen && product" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="bg-white rounded-[2.5rem] max-w-2xl w-full p-8 relative shadow-2xl transition-all">
      
      <button @click="$emit('close')" class="absolute top-6 right-6 text-2xl font-bold text-gray-400 hover:text-black">&times;</button>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div class="bg-gray-50 rounded-3xl p-6 flex items-center justify-center">
          <img :src="product.thumbnail" :alt="product.title" class="max-h-64 object-contain" />
        </div>
        
        <div class="space-y-4">
          <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">
            {{ product.category }}
          </span>
          <h2 class="text-3xl font-black text-gray-900 leading-tight">{{ product.title }}</h2>
          <p class="text-gray-500 text-sm leading-relaxed">{{ product.description }}</p>
          <div class="flex items-center justify-between pt-4">
            <p class="text-3xl font-black text-blue-600">${{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>