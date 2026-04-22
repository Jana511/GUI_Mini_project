<script setup lang="ts">
// Import from useCard (matching your filename)
import { useCart } from '../composable/useCard'

const { cart, removeFromCart, totalPrice } = useCart()
</script>

<template>
  <div class="container mx-auto p-10 max-w-4xl">
    <h1 class="text-4xl font-black mb-10 uppercase tracking-tighter">Shopping Cart</h1>
    
    <div v-if="cart.length === 0" class="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed">
      <p class="text-gray-400 font-bold uppercase italic">Your cart is empty</p>
      <router-link to="/" class="mt-4 inline-block text-blue-600 font-bold underline italic uppercase text-xs">Back to Store</router-link>
    </div>

    <div v-else>
      <div v-for="(item, index) in cart" :key="index" class="flex items-center gap-8 bg-white p-6 rounded-3xl shadow-sm mb-4 border border-gray-100">
        <img :src="item.thumbnail" class="w-24 h-24 object-contain" />
        <div class="flex-1">
          <h2 class="font-black text-xl">{{ item.title }}</h2>
          <p class="text-blue-600 font-black text-lg">${{ item.price }}</p>
        </div>
        <button @click="removeFromCart(index)" class="bg-red-50 text-red-500 px-4 py-2 rounded-xl font-bold uppercase text-xs hover:bg-red-500 hover:text-white transition-all">
          Remove
        </button>
      </div>

      <div class="mt-10 p-10 bg-black text-white rounded-[3rem] flex justify-between items-center shadow-2xl">
        <span class="text-4xl font-black">${{ totalPrice }}</span>
        <button class="bg-blue-600 px-10 py-5 rounded-2xl font-black uppercase text-sm">Checkout</button>
      </div>
    </div>
  </div>
</template>