<script setup lang="ts">
// ✅ Fixed import - changed from 'useCard' to 'useCart'
import { useCart } from '../composable/useCard'
import { useAuth } from '../composable/useAuth'
import { useDarkMode } from '../composable/useDarkMode'

const { cartCount } = useCart()
const { currentUser, logout } = useAuth()
const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <nav class="sticky top-0 z-50 bg-[#1A1A1A] shadow-2xl border-b border-white/5 p-4 transition-colors duration-500">
    <div class="container mx-auto flex justify-between items-center">
      
      <!-- Logo -->
      <router-link to="/" class="flex items-center space-x-3 no-underline">
        <div class="w-10 h-10 bg-[#FF85A1] rounded-xl flex items-center justify-center shadow-lg shadow-pink-900/20 group-hover:rotate-12 transition-transform">
          <span class="text-white font-black text-xl italic">S</span>
        </div>
        <h1 class="text-2xl font-black tracking-tighter uppercase italic text-white">
          Style<span class="text-[#FF85A1]">Hub</span>
        </h1>
      </router-link>

      <!-- Desktop Navigation Links -->
      <div class="hidden md:flex space-x-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest items-center">
        
        <!-- Home Link -->
        <router-link to="/" class="hover:text-[#FF85A1] transition-colors no-underline">
          Home
        </router-link>
        
        <!-- Products Link - links to /products page -->
        <router-link to="/products" class="hover:text-[#FF85A1] transition-colors no-underline">
          Products
        </router-link>
        
        <!-- Cart Link -->
        <router-link to="/cart" class="hover:text-[#FF85A1] transition-colors no-underline">
          Cart
        </router-link>
        
        <!-- User Authentication Section -->
        <div v-if="currentUser" class="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          <span class="text-pink-300 italic font-medium text-[10px]">
            Hi, {{ currentUser.firstName }}
          </span>
          <button 
            @click="logout" 
            class="bg-white/10 hover:bg-[#FF85A1] text-gray-300 hover:text-white px-3 py-1 rounded-lg text-[9px] font-black transition-all"
          >
            LOGOUT
          </button>
        </div>

        <!-- Login Link (when not logged in) -->
        <router-link 
          v-else 
          to="/login" 
          class="bg-white/10 hover:bg-[#FF85A1] text-white px-6 py-2 rounded-full border border-white/10 transition-all no-underline font-bold"
        >
          Login
        </router-link>
      </div>

      <!-- Right Side Icons -->
      <div class="flex items-center space-x-5">
        
        <!-- Dark Mode Toggle -->
        <button 
          @click="toggleDark" 
          class="text-gray-400 hover:text-[#FF85A1] transition-all text-[11px] font-bold uppercase tracking-wider"
        >
          <span v-if="isDark">LIGHT MODE</span>
          <span v-else>DARK MODE</span>
        </button>
        
        <!-- Search Icon (links to products) -->
        <router-link 
          to="/products" 
          class="relative bg-white/5 p-2.5 rounded-xl border border-white/10 hover:border-pink-500/30 transition-all no-underline hover:scale-110 transform duration-200"
        >
          <span class="text-lg">🔍</span>
        </router-link>
        
        <!-- Cart Icon with Badge -->
        <router-link 
          to="/cart" 
          class="relative bg-white/5 p-2.5 rounded-xl border border-white/10 hover:border-pink-500/30 transition-all no-underline hover:scale-110 transform duration-200"
        >
          <span class="text-lg">🛒</span>
          <span 
            v-if="cartCount > 0" 
            class="absolute -top-2 -right-2 bg-[#FF85A1] text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 border-[#1A1A1A]"
          >
            {{ cartCount }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.no-underline { 
  text-decoration: none !important; 
}

.router-link-active { 
  color: #FF85A1 !important; 
}

/* Optional: Add hover transition for all links */
a, button {
  transition: all 0.2s ease;
}
</style>