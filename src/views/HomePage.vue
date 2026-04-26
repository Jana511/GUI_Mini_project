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

const openProduct = (item: any) => { router.push(`/product/${item.id}`) }

const scrollToProducts = () => {
  const productsSection = document.getElementById('products-section')
  productsSection?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => { fetchProducts() })
</script>

<template>
  <main class="min-h-screen bg-[#FFF9FA] container mx-auto px-6 pt-0 -mt-20">
    
    <section class="py-0 px-6 text-center mb-10 max-w-5xl mx-auto flex flex-col items-center">
      
      <div class="h-[500px] w-full max-w-[650px] flex items-center justify-center overflow-hidden mb-1 mt-16 transform hover:scale-105 transition-transform duration-1000">
        <img 
          src="https://static.vecteezy.com/system/resources/previews/031/418/335/large_2x/trendy-stylish-woman-rejoicing-with-sales-shopping-time-isolated-on-pink-studio-background-wearing-casual-outfit-straw-hat-summer-mood-photo.jpg" 
          class="h-full w-full object-contain rounded-[4rem]" 
          alt="StyleHub Hero Image"
        />
      </div>
      
      <div class="space-y-1">
        <h1 class="text-3xl md:text-3xl font-black text-gray-950 tracking-tight italic font-serif uppercase">
          Welcome to Style<span class="text-[#FF85A1]">Hub</span>
        </h1>
        <p class="text-pink-300 text-[10px] font-bold italic tracking-[0.4em] uppercase opacity-80">
          Your Light Fashion Destination
        </p>
      </div>
      
      <button 
        @click="scrollToProducts" 
        class="mt-6 bg-[#FF85A1] text-[12px] text-white uppercase tracking-[0.4em] font-black px-12 py-3.5 rounded-full shadow-lg shadow-pink-100/50 hover:bg-[#FF6B91] transition-all"
      >
        Shop Now →
      </button>
    </section>

    <FilterBar 
      id="filter-section"
      v-model="searchQuery" 
      v-model:selectedCategory="selectedCategory" 
      v-model:maxPrice="maxPrice"
      v-model:sortBy="sortBy"
      class="mb-10"
    />

    <div v-if="loading" class="text-center py-24 text-[10px] font-black tracking-[0.5em] animate-pulse text-pink-300 uppercase">
      Curating style for you...
    </div>

    <div v-else-if="filteredProducts.length > 0" id="products-section" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 scroll-mt-24">
      <ProductCard 
        v-for="item in filteredProducts" 
        :key="item.id" 
        :product="item" 
        @click="openProduct(item)" 
      />
    </div>

    <div v-else class="text-center py-24 text-pink-200 text-[10px] font-black uppercase tracking-[0.5em]">
      No products found.
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&display=swap');
.font-serif { font-family: 'Playfair Display', serif; }
</style>