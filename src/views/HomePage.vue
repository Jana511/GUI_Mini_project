<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProducts } from '../composable/useProducts'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'

const router = useRouter()
const { 
  loading, searchQuery, selectedCategory, maxPrice, filteredProducts, fetchProducts 
} = useProducts()

const openProduct = (item: any) => {
  router.push(`/product/${item.id}`)
}


onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <main class="container mx-auto p-6">
    <FilterBar 
      v-model="searchQuery" 
      v-model:selectedCategory="selectedCategory" 
      v-model:maxPrice="maxPrice" 
    />

    <div v-if="loading" class="text-center py-24 text-2xl font-bold animate-pulse text-gray-400">
      LOADING PRODUCTS...
    </div>

    <div v-else-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <ProductCard 
        v-for="item in filteredProducts" 
        :key="item.id" 
        :product="item" 
        @click="openProduct(item)" 
      />
    </div>

    <div v-else class="text-center py-24 text-gray-500 font-bold uppercase">
      No Shoes or Bags found.
    </div>
  </main>
</template>