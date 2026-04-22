<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProducts } from '../composable/useProducts'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'

const router = useRouter()
const {
  loading,
  searchQuery,
  selectedCategory,
  maxPrice,
  sortBy,           
  filteredProducts,
  fetchProducts
} = useProducts()

const openProduct = (item: any) => {
  router.push(`/product/${item.id}`)
}

const scrollToProducts = () => {
  const productsSection = document.getElementById('products-section')
  productsSection?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <main class="container mx-auto p-6">
    <!-- Hero Section -->
    <section class="bg-white border border-gray-100 rounded-xl shadow-sm py-6 px-4 text-center mb-8 max-w-md mx-auto">
      <div class="flex justify-center mb-3">
        <div class="w-14 h-14 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl flex items-center justify-center shadow-sm text-3xl">
          🛍️
        </div>
      </div>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
        Welcome to StyleHub
      </h1>
      <p class="text-gray-500 text-sm mt-1">
        Your Fashion Destination
      </p>
      <button 
        @click="scrollToProducts" 
        class="mt-3 bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-full shadow hover:bg-indigo-700 transition"
      >
        Shop Now →
      </button>
    </section>

    <!-- Filter Bar with sortBy binding -->
    <FilterBar 
      v-model="searchQuery" 
      v-model:selectedCategory="selectedCategory" 
      v-model:maxPrice="maxPrice"
      v-model:sortBy="sortBy"
    />

    <div v-if="loading" class="text-center py-24 text-2xl font-bold animate-pulse text-gray-400">
      LOADING PRODUCTS...
    </div>

    <div 
      v-else-if="filteredProducts.length > 0" 
      id="products-section"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      <ProductCard 
        v-for="item in filteredProducts" 
        :key="item.id" 
        :product="item" 
        @click="openProduct(item)" 
      />
    </div>

    <div v-else class="text-center py-24 text-gray-500 font-bold uppercase">
      No products found.
    </div>
  </main>
</template>