<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProducts } from '../components/useProducts'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'

const { loading, searchQuery, filteredProducts, fetchProducts } = useProducts()

// Local states for filtering
const selectedCategory = ref('all')
const maxPrice = ref(2000)

// Computed style filtering can be added to useProducts.ts as well, 
// but for now, we will handle the UI state here.

onMounted(fetchProducts)
</script>

<template>
  <main class="container mx-auto p-6">
    
    <FilterBar 
      v-model="searchQuery"
      v-model:selectedCategory="selectedCategory"
      v-model:maxPrice="maxPrice"
    />

    <div v-if="loading" class="text-center py-24 font-black text-gray-200 animate-pulse tracking-widest uppercase">
      Loading Assets
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <ProductCard 
        v-for="item in filteredProducts" 
        :key="item.id" 
        :product="item" 
      />
    </div>
    
  </main>
</template>