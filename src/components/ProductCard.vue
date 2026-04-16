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
  <div class="bg-white p-4 rounded-xl shadow-md hover:shadow-2xl transition-all border border-gray-100 flex flex-col justify-between h-full">
    <div>
      <div class="bg-gray-50 rounded-lg p-2 mb-4">
        <img :src="product.thumbnail" :alt="product.title" class="h-40 w-full object-contain mx-auto">
      </div>
      <span class="text-xs font-semibold text-blue-500 uppercase tracking-wider">{{ product.category }}</span>
      <h3 class="font-bold text-gray-800 text-lg mt-1 truncate">{{ product.title }}</h3>
    </div>
    
    <div class="mt-4 flex items-center justify-between">
      <span class="text-2xl font-bold text-gray-900">${{ product.price }}</span>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
        Add to Cart
      </button>
    </div>
  </div>
</template>