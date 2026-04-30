<script setup lang="ts">
// Assessment එකට අනුව strict typing භාවිතා කිරීම
import type { Product } from '../composable/useProducts'
import { useDarkMode } from '../composable/useDarkMode'

const { isDark } = useDarkMode()

// Props define කිරීම
defineProps<{
  product: Product
}>()
</script>

<template>
  <div 
    :class="{ 'dark': isDark }"
    class="group bg-white dark:bg-[#1b1414] rounded-[2.5rem] p-5 shadow-sm hover:shadow-2xl hover:shadow-pink-100/50 dark:hover:shadow-pink-900/20 transition-all duration-500 border border-pink-50 dark:border-white/10 cursor-pointer active:scale-95"
  >
    <div class="relative overflow-hidden rounded-[2rem] bg-[#FFF9FA] dark:bg-[#2D2D2D] mb-6 aspect-square flex items-center justify-center p-6 transition-colors duration-500">
      <img 
        :src="product.thumbnail" 
        :alt="product.title"
        class="max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      
      <div class="absolute inset-0 bg-pink-100/5 dark:bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
        <span class="bg-white/90 dark:bg-black/60 backdrop-blur-sm text-[#FF85A1] text-[9px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          Quick View
        </span>
      </div>
    </div>

    <div class="space-y-4 px-1">
      <div class="flex flex-col gap-1">
        <span class="text-[9px] font-black text-pink-200 dark:text-gray-400 uppercase tracking-widest">
          {{ product.brand || 'Fashion Essentials' }}
        </span>
        <h3 class="font-black text-gray-800 dark:text-white leading-tight text-base group-hover:text-[#FF85A1] transition-colors line-clamp-1">
          {{ product.title }}
        </h3>
      </div>
      
      <div class="flex items-center justify-between pt-1">
        <p class="text-xl font-black text-[#FF85A1] tracking-tight">
          ${{ product.price }}
        </p>
        
        <span class="text-[9px] font-black text-[#FF85A1] uppercase tracking-widest bg-pink-50 dark:bg-pink-500/10 px-3 py-1.5 rounded-lg border border-pink-100 dark:border-pink-500/20 transition-colors">
          {{ product.category }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Image Shadow effect */
.group:hover img {
  filter: drop-shadow(0 15px 25px rgba(255, 133, 161, 0.25));
}

/* Ensure title stays on one line - FIXED with both vendor and standard properties */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-clamp: 1;  /* ✅ Standard property added */
  overflow: hidden;
}
</style>