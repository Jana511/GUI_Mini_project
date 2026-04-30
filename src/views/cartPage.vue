<script setup lang="ts">
import { useCart } from '../composable/useCard'
import { useDarkMode } from '../composable/useDarkMode'

const { cart, removeFromCart, updateQuantity, totalPrice } = useCart()
const { isDark } = useDarkMode()

// Calculate item count
const itemCount = cart.value.reduce((sum, item) => sum + item.quantity, 0)

// Proceed to checkout
const proceedToCheckout = () => {
  alert(`Total: $${totalPrice.value.toFixed(2)}\nThank you for shopping at StyleHub!`)
}
</script>

<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen bg-[#FFF9FA] dark:bg-[#0A0A0A] transition-colors duration-500 py-10">
    <div class="container mx-auto max-w-6xl px-4 md:px-6">
      
      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
          Shopping <span class="text-[#FF85A1]">Cart</span>
        </h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">{{ itemCount }} items in your bag</p>
      </div>

      <!-- Empty Cart State -->
      <div v-if="cart.length === 0" class="text-center py-20 bg-white dark:bg-[#1A1A1A] rounded-3xl border border-pink-50 dark:border-white/5 shadow-sm">
        <div class="text-6xl mb-4">🛒</div>
        <p class="text-gray-400 font-black uppercase italic tracking-[0.3em] text-sm">Your bag is currently empty</p>
        <router-link to="/products" class="inline-block mt-6 bg-[#FF85A1] text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#FF6B91] transition">
          Continue Shopping
        </router-link>
      </div>

      <!-- Cart with Items -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Cart Items - Left Column (2/3 width on desktop) -->
        <div class="lg:col-span-2 space-y-6">
          <div 
            v-for="item in cart" 
            :key="item.id" 
            class="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-sm border border-pink-50 dark:border-white/5 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div class="flex flex-col sm:flex-row gap-6 p-6">
              
              <!-- Product Image -->
              <div class="w-full sm:w-32 h-32 bg-[#FFF9FA] dark:bg-[#2D2D2D] rounded-xl flex items-center justify-center flex-shrink-0">
                <img 
                  :src="item.thumbnail" 
                  :alt="item.title"
                  class="max-w-full max-h-full object-contain p-3"
                />
              </div>

              <!-- Product Details -->
              <div class="flex-1">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h3 class="font-black text-lg text-gray-900 dark:text-white">{{ item.title }}</h3>
                    <p class="text-[#FF85A1] font-bold text-sm mt-1">${{ item.price }}</p>
                    <div class="flex items-center gap-2 mt-2">
                      <div class="flex text-yellow-400 text-xs">
                        <span>★★★★</span>
                        <span class="text-gray-300">☆</span>
                      </div>
                      <span class="text-[10px] text-gray-400">(4.4/5)</span>
                    </div>
                  </div>
                  
                  <!-- Remove Button -->
                  <button 
                    @click="removeFromCart(item.id)"
                    class="text-gray-400 hover:text-red-500 text-sm transition-colors"
                  >
                    ✕ Remove
                  </button>
                </div>

                <!-- Quantity Selector -->
                <div class="flex items-center justify-between mt-4 pt-4 border-t border-pink-50 dark:border-white/10">
                  <div class="flex items-center gap-3">
                    <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">Quantity</span>
                    <div class="flex items-center gap-2 bg-[#FFF9FA] dark:bg-white/5 rounded-xl border border-pink-50 dark:border-white/10">
                      <button 
                        @click="updateQuantity(item.id, item.quantity - 1)" 
                        :disabled="item.quantity <= 1"
                        class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#FF85A1] disabled:opacity-30 disabled:cursor-not-allowed transition"
                      >
                        −
                      </button>
                      <span class="w-8 text-center font-bold text-gray-800 dark:text-white">{{ item.quantity }}</span>
                      <button 
                        @click="updateQuantity(item.id, item.quantity + 1)" 
                        class="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#FF85A1] transition"
                      >
                        +
                      </button>
                    </div>
                    <span class="text-[10px] text-green-500" v-if="item.stock">({{ item.stock }} in stock)</span>
                  </div>
                  
                  <!-- Item Total -->
                  <div class="text-right">
                    <p class="text-lg font-black text-gray-900 dark:text-white">
                      ${{ (item.price * item.quantity).toFixed(2) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary - Right Column (1/3 width on desktop) -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-sm border border-pink-50 dark:border-white/5 p-6 sticky top-24">
            
            <h2 class="text-xl font-black text-gray-900 dark:text-white mb-6">Order Summary</h2>
            
            <!-- Summary Items -->
            <div class="space-y-3 pb-4 border-b border-pink-50 dark:border-white/10">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">Subtotal ({{ itemCount }} items)</span>
                <span class="font-semibold text-gray-900 dark:text-white">${{ totalPrice.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">Shipping</span>
                <span class="font-semibold text-green-500">Free</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">Tax</span>
                <span class="font-semibold text-gray-900 dark:text-white">${{ (totalPrice * 0.1).toFixed(2) }}</span>
              </div>
            </div>
            
            <!-- Total -->
            <div class="flex justify-between items-center pt-4 pb-6">
              <span class="text-base font-black text-gray-900 dark:text-white uppercase tracking-wider">Total</span>
              <span class="text-2xl font-black text-[#FF85A1]">${{ (totalPrice + totalPrice * 0.1).toFixed(2) }}</span>
            </div>
            
            <!-- Promo Code -->
            <div class="mb-6">
              <div class="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Promo code" 
                  class="flex-1 px-4 py-3 bg-[#FFF9FA] dark:bg-white/5 border border-pink-50 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FF85A1]"
                />
                <button class="px-4 py-3 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 rounded-xl text-sm font-bold hover:bg-gray-200 transition">
                  Apply
                </button>
              </div>
            </div>
            
            <!-- Checkout Button -->
            <button 
              @click="proceedToCheckout"
              class="w-full bg-[#FF85A1] hover:bg-[#FF6B91] text-white py-4 rounded-xl font-black uppercase tracking-wider text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-pink-200 dark:shadow-none"
            >
              Proceed to Checkout →
            </button>
            
            <!-- Continue Shopping Link -->
            <router-link 
              to="/products" 
              class="block text-center mt-4 text-xs text-gray-400 hover:text-[#FF85A1] transition-colors"
            >
              ← Continue Shopping
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
button {
  transition: all 0.2s ease;
}

/* Custom scrollbar for cart items */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #FF85A1;
  border-radius: 10px;
}
</style>