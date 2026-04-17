<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NavBar from './components/NavBar.vue';
import ProductCard from './components/ProductCard.vue';

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
    const response = await fetch('https://dummyjson.com/products?limit=0');
    const data = await response.json();
    
    const allowed = [
  'beauty', 
  'fragrances', 
  'mens-shirts', 
  'womens-dresses', 
  'womens-bags', 
  'womens-wallets',
  'mens-wallets', 
  'tops', 
  'womens-shoes', 
  'mens-shoes',
  'jewelry',       
  'sunglasses',    
  'mens-watches',  
  'womens-watches',
  'mens-caps',  
  'accessories',  
  'skin-care'
];

    products.value = data.products.filter((p: Product) => 
      allowed.includes(p.category)
    );
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProducts);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />
    <main class="container mx-auto py-10 px-6">
      <header class="mb-10 text-center">
        <h1 class="text-3xl font-black text-pink-900 uppercase">My Collection</h1>
      </header>

      <div v-if="loading" class="flex flex-col items-center py-20 text-blue-600">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600 mb-4"></div>
        <p>Fetching items...</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard 
          v-for="item in products" 
          :key="item.id" 
          :product="item" 
        />
      </div>
    </main>
  </div>
</template>