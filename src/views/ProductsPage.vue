<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProducts } from '../composable/useProducts'
// ❌ REMOVED: import { useCart } from '../composable/useCard'
import { useDarkMode } from '../composable/useDarkMode'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'

const router = useRouter()
const { isDark } = useDarkMode()

const { 
  loading,
  searchQuery,
  selectedCategory,
  maxPrice,
  sortBy,       
  filteredProducts,
  fetchProducts
} = useProducts()

// ❌ REMOVED: const { addToCart } = useCart()

const openProduct = (item: any) => {
  router.push(`/product/${item.id}`)
}

onMounted(() => { 
  fetchProducts()
  window.scrollTo(0, 0)
})
</script>

<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen bg-[#FFF9FA] dark:bg-[#0A0A0A] transition-colors duration-500">
    
    <!-- Page Header -->
    <section class="relative bg-gradient-to-r from-[#f2b1c0] to-[#f1a4b7] py-16 md:py-20">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="container mx-auto px-6 relative z-10">
        <h1 class="text-4xl md:text-6xl font-black text-white text-center tracking-tighter italic font-serif">
          Our <span class="text-[#1A1A1A]">Collection</span>
        </h1>
        <p class="text-white/80 text-center mt-4 text-sm tracking-wide max-w-2xl mx-auto">
          Discover the latest trends and timeless classics curated just for you
        </p>
      </div>
    </section>

    <!-- Filter Section -->
    <div class="container mx-auto px-6 -mt-8 relative z-20">
      <FilterBar 
        v-model="searchQuery" 
        v-model:selectedCategory="selectedCategory" 
        v-model:maxPrice="maxPrice"
        v-model:sortBy="sortBy"
        class="mb-8"
      />
    </div>

    <!-- Products Grid -->
    <div class="container mx-auto px-6 pb-20">
      
      <!-- Results Count -->
      <div class="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div class="flex items-center gap-2">
          <span class="text-[#FF85A1] text-sm font-black">✦</span>
          <span class="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
            {{ filteredProducts.length }} PRODUCTS FOUND
          </span>
        </div>
        <div class="flex items-center gap-3 text-[10px] text-gray-400">
          <span>Showing latest arrivals</span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-32">
        <div class="inline-block w-12 h-12 border-4 border-pink-100 border-t-[#FF85A1] rounded-full animate-spin mb-6"></div>
        <p class="text-[10px] font-black tracking-[0.5em] text-pink-300 dark:text-pink-400 uppercase animate-pulse">
          Curating style for you...
        </p>
      </div>

      <!-- Products Grid -->
      <div v-else-if="filteredProducts.length > 0" 
           class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        <ProductCard 
          v-for="item in filteredProducts" 
          :key="item.id" 
          :product="item" 
          @click="openProduct(item)" 
          class="hover:-translate-y-2 transition-all duration-500 cursor-pointer"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-32 border-2 border-dashed border-pink-100 dark:border-white/5 rounded-[3rem]">
        <div class="text-6xl mb-4">🛍️</div>
        <p class="text-pink-200 dark:text-gray-700 text-[10px] font-black uppercase tracking-[0.5em]">
          No products found matching your style.
        </p>
        <button 
          @click="selectedCategory = 'all'; searchQuery = ''; maxPrice = 2000"
          class="mt-6 text-[#FF85A1] text-[10px] font-black uppercase tracking-widest underline hover:no-underline transition"
        >
          Clear all filters
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&display=swap');

.font-serif { 
  font-family: 'Playfair Display', serif; 
}
</style>