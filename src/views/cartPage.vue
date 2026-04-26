<script setup lang="ts">
import { useCart } from '../composable/useCard'
const { cart, removeFromCart, updateQuantity, totalPrice } = useCart()
</script>

<template>
  <div class="container mx-auto p-10 max-w-4xl">
    <h1 class="text-4xl font-black mb-10 uppercase tracking-tighter text-gray-800">
      Shopping <span class="text-[#FF85A1]">Cart</span>
    </h1>

    <div v-if="cart.length === 0" class="text-center py-20 bg-[#FFF9FA] rounded-[3rem] border-2 border-dashed border-pink-100">
      <div class="text-5xl mb-4">🛒</div>
      <p class="text-pink-300 font-bold uppercase italic tracking-widest">Your cart is empty</p>
      <router-link to="/" class="mt-6 inline-block bg-[#FF85A1] text-white px-8 py-3 rounded-full font-black no-underline uppercase text-xs shadow-lg shadow-pink-100 hover:scale-105 transition-all">
        Back to Store
      </router-link>
    </div>

    <div v-else>
      <div v-for="item in cart" :key="item.id" class="flex items-center gap-8 bg-white p-6 rounded-3xl shadow-sm mb-4 border border-pink-50 hover:shadow-md transition-shadow">
        <div class="w-24 h-24 bg-[#FFF9FA] rounded-2xl p-2 flex items-center justify-center">
          <img :src="item.thumbnail" class="max-w-full max-h-full object-contain" />
        </div>

        <div class="flex-1">
          <h2 class="font-bold text-gray-800 text-xl">{{ item.title }}</h2>
          <p class="text-[#FF85A1] font-black text-lg">${{ item.price }}</p>
        </div>

        <div class="flex items-center gap-3 bg-pink-50/50 p-1 rounded-full border border-pink-50">
          <button 
            @click="updateQuantity(item.id, item.quantity - 1)" 
            class="w-8 h-8 bg-white text-[#FF85A1] rounded-full shadow-sm hover:bg-[#FF85A1] hover:text-white text-xl font-bold transition-all disabled:opacity-30"
            :disabled="item.quantity <= 1"
          >−</button>
          <span class="w-8 text-center font-black text-gray-700">{{ item.quantity }}</span>
          <button 
            @click="updateQuantity(item.id, item.quantity + 1)" 
            class="w-8 h-8 bg-white text-[#FF85A1] rounded-full shadow-sm hover:bg-[#FF85A1] hover:text-white text-xl font-bold transition-all"
          >+</button>
        </div>

        <div class="w-24 text-right font-black text-lg text-gray-800">
          ${{ (item.price * item.quantity).toFixed(2) }}
        </div>

        <button 
  @click="removeFromCart(item.id)" 
  class="group flex items-center gap-2 bg-pink-50 text-[#FF85A1] px-4 py-2 rounded-xl font-bold uppercase text-[10px] hover:bg-[#FF85A1] hover:text-white transition-all duration-300 border border-pink-100/50 shadow-sm shadow-pink-100/20"
>
  <span class="text-[12px] group-hover:rotate-12 transition-transform">🗑️</span>
  Remove
</button>
      </div>

      <div class="mt-10 p-6 bg-[#1A1A1A] text-white rounded-[3rem] flex justify-between items-center shadow-2xl">
        <div class="flex flex-col">
          <span class="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Total Balance</span>
          <span class="text-4xl font-black">${{ totalPrice.toFixed(2) }}</span>
        </div>
        <button class="bg-[#FF85A1] px-12 py-4 rounded-2xl font-black uppercase text-sm hover:bg-[#FF6B91] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-pink-900/20">
          Checkout Now
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-underline {
  text-decoration: none;
}
</style>