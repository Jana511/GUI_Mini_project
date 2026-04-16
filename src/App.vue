<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NavBar from './components/NavBar.vue';
import ProductCard from './components/ProductCard.vue';

// 1. Strict TypeScript Interface
interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

const products = ref<Product[]>([]);
const loading = ref(true);


const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products.value = data.products; 
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProducts);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />

    <main class="container mx-auto py-12 px-6">
      <header class="text-center mb-12">
        <h2 class="text-4xl font-extrabold text-gray-900">Featured Products</h2>
        <p class="text-gray-500 mt-2">Discover our best collection from DummyJSON</p>
      </header>

      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <ProductCard 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </main>
   </div>
</template>