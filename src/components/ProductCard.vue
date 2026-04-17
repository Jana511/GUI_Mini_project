<script setup lang="ts">
interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
    <div class="h-40 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden mb-4">
      <img :src="product.thumbnail" :alt="product.title" class="max-h-full object-contain">
    </div>
    <div class="flex-grow">
      <span class="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{{ product.category }}</span>
      <h3 class="font-bold text-gray-800 text-sm mt-1 line-clamp-2">{{ product.title }}</h3>
      <p class="text-lg font-black text-gray-900 mt-2">${{ product.price }}</p>
    </div>
  </div>
</template>