<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, computed, ref } from 'vue'
import { useProducts } from '../composable/useProducts'
import { useCart } from '../composable/useCard'  // ✅ Fixed: useCart
import { useDarkMode } from '../composable/useDarkMode'

const route = useRoute()
const { filteredProducts, fetchProducts } = useProducts()
const { addToCart } = useCart()
const { isDark } = useDarkMode()

// Quantity state
const quantity = ref(1)

const increaseQuantity = () => {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCartWithQuantity = () => {
  if (product.value) {
    addToCart(product.value, quantity.value)
    alert(`Added ${quantity.value} x ${product.value.title} to cart!`)
    quantity.value = 1
  }
}

const buyNow = () => {
  if (product.value) {
    addToCart(product.value, quantity.value)
    alert(`Buying: ${quantity.value} x ${product.value.title}\nTotal: $${(product.value.price * quantity.value).toFixed(2)}`)
  }
}

// Helper function to render star ratings - NOW USED in template
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  return '★'.repeat(fullStars) + (hasHalfStar ? '½' : '') + '☆'.repeat(emptyStars)
}

onMounted(fetchProducts)

const product = computed(() => {
  return filteredProducts.value.find(p => p.id === Number(route.params.id))
})
</script>

<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen bg-[#FFF9FA] dark:bg-[#0A0A0A] transition-colors duration-500 py-10">
    <div v-if="product" class="container mx-auto px-4 md:px-10">
      
      <router-link to="/products" class="mb-6 inline-flex items-center gap-2 text-[#FF85A1] font-bold uppercase tracking-widest no-underline hover:translate-x-[-5px] transition-transform text-xs">
        ← Back to Products
      </router-link>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 bg-white dark:bg-[#1A1A1A] p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-pink-50 dark:border-white/5">
        
        <div class="bg-[#FFF9FA] dark:bg-white/5 rounded-3xl p-8 flex items-center justify-center border border-pink-50 dark:border-white/5 overflow-hidden">
          <img 
            :src="product.thumbnail" 
            :alt="product.title" 
            class="max-h-96 object-contain hover:scale-110 transition-transform duration-700" 
          />
        </div>
        
        <div class="flex flex-col justify-center">
          
          <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
            <span class="text-[10px] font-black text-pink-300 uppercase tracking-[0.3em]">
              {{ product.brand || 'GLAMOUR BEAUTY' }}
            </span>
            <div class="flex items-center gap-2 bg-yellow-400/10 px-3 py-1.5 rounded-lg">
              <!-- ✅ USING THE renderStars FUNCTION NOW -->
              <div class="text-yellow-500 text-sm">
                {{ renderStars(product.rating) }}
              </div>
              <span class="text-yellow-700 dark:text-yellow-500 text-[10px] font-black">
                ({{ product.rating }} / 5)
              </span>
            </div>
          </div>

          <h1 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
            {{ product.title }}
          </h1>
          
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 text-sm md:text-base">
            {{ product.description }}
          </p>
          
          <div class="flex items-center gap-4 mb-8">
            <p class="text-4xl font-black text-[#FF85A1]">${{ product.price }}</p>
            <span v-if="product.stock" class="text-[9px] font-bold px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 uppercase tracking-widest border border-green-100 dark:border-none">
              {{ product.stock }} IN STOCK
            </span>
          </div>
          
          <div class="mb-8">
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
              QUANTITY
            </label>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-3 bg-[#FFF9FA] dark:bg-white/5 rounded-xl border border-pink-50 dark:border-white/10">
                <button 
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                  class="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#FF85A1] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xl font-bold"
                >
                  −
                </button>
                <span class="w-12 text-center font-black text-gray-800 dark:text-white text-lg">{{ quantity }}</span>
                <button 
                  @click="increaseQuantity"
                  :disabled="quantity >= product.stock"
                  class="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#FF85A1] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xl font-bold"
                >
                  +
                </button>
              </div>
              <span v-if="product.stock" class="text-[10px] text-green-500 font-bold">
                ({{ product.stock }} in stock)
              </span>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <button 
              @click="addToCartWithQuantity" 
              class="flex-1 bg-[#FF85A1] text-white py-5 rounded-2xl font-black uppercase tracking-wider hover:bg-[#FF6B91] transition-all shadow-lg shadow-pink-100 dark:shadow-none text-sm"
            >
              ADD TO CART
            </button>
            <button 
              @click="buyNow" 
              class="flex-1 bg-white dark:bg-transparent text-[#FF85A1] border-2 border-[#FF85A1] py-5 rounded-2xl font-black uppercase tracking-wider hover:bg-pink-50 dark:hover:bg-white/5 transition-all text-sm"
            >
              BUY NOW
            </button>
          </div>

          <div class="mt-8 pt-8 border-t border-pink-50 dark:border-white/10">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <span class="text-[10px] font-black text-pink-200 uppercase tracking-[0.3em]">Category</span>
                <span class="bg-pink-50 dark:bg-pink-900/20 text-[#FF85A1] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {{ product.category }}
                </span>
              </div>
              <span class="text-[9px] font-bold text-gray-400 uppercase">
                Product ID: #{{ product.id }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center min-h-screen gap-4">
      <div class="w-12 h-12 border-4 border-pink-100 border-t-[#FF85A1] rounded-full animate-spin"></div>
      <p class="text-[#FF85A1] font-black uppercase tracking-[0.4em] text-xs animate-pulse">
        Loading Details...
      </p>
    </div>
  </div>
</template>

<style scoped>
button {
  transition: all 0.2s ease;
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>