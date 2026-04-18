<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import NavBar from './components/NavBar.vue';
import ProductCard from './components/ProductCard.vue';
import FilterBar from './components/FilterBar.vue';

/**
 * Product Data Structure.
 * Adheres to strict typing requirements of the assignment.
 */
interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

const products = ref<Product[]>([]);
const loading = ref(true);
const selectedCategory = ref('all');

/**
 * Fetches data from DummyJSON API.
 * limit=0 ensures all 190+ products are fetched for better filtering.
 */
const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=0');
    const data = await response.json();
    
    // Whitelist of categories relevant to our E-commerce store domain
    const allowed = [
      'beauty', 'fragrances', 'mens-shirts', 'womens-dresses', 
      'womens-bags', 'mens-wallets', 'tops', 'womens-shoes', 
      'mens-shoes', 'mens-pants', 'jewelry', 'sunglasses', 
      'mens-watches', 'womens-watches', 'skin-care'
    ];

    products.value = data.products.filter((p: Product) => 
      allowed.includes(p.category)
    );
  } catch (error) {
    console.error("Data Fetch Error:", error);
  } finally {
    loading.value = false;
  }
};

/**
 * Logic to filter products based on the selected category button.
 * Specific logic added to handle combined "Shoes" category.
 */
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return products.value;
  }
  
  // Custom logic to include both gender categories under "Shoes"
  if (selectedCategory.value === 'all-shoes') {
    return products.value.filter(p => 
      p.category === 'mens-shoes' || p.category === 'womens-shoes'
    );
  }
  
  return products.value.filter(p => p.category === selectedCategory.value);
});

const handleFilter = (category: string) => {
  selectedCategory.value = category;
};

onMounted(fetchProducts);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />
    
    <main class="container mx-auto py-10 px-6">
      <header class="mb-10 text-center">
        <h1 class="text-3xl font-extrabold text-red-900 uppercase">StyleHub Collection</h1>
        <div class="h-1.5 w-24 bg-blue-600 mx-auto mt-3 rounded-full"></div>
      </header>

      <FilterBar @filter-change="handleFilter" />

      <div v-if="loading" class="flex flex-col items-center py-24">
        <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
        <p class="mt-4 text-gray-500 animate-pulse">Updating catalog...</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <ProductCard 
          v-for="item in filteredProducts" 
          :key="item.id" 
          :product="item" 
        />
      </div>

      <div v-if="!loading && filteredProducts.length === 0" class="text-center py-20 text-pray-400">
        No items available for this selection.
      </div>
    </main>
  </div>
</template>