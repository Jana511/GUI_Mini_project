<script setup lang="ts">
/**
 * Configuration for Filter Categories.
 * 'all-shoes' is a custom value used to group both mens and womens footwear.
 */
const categories = [
  { name: 'All', value: 'all' },
  { name: 'Beauty', value: 'beauty' },
  { name: 'Fragrances', value: 'fragrances' },
  { name: 'Men\'s Fashion', value: 'mens-shirts' },
  { name: 'Women\'s Fashion', value: 'womens-dresses' },
  { name: 'Shoes', value: 'all-shoes' }, 
  { name: 'Bags', value: 'womens-bags' },
  { name: 'Skin Care', value: 'skin-care' },
  { name: 'Watches', value: 'mens-watches' }
];

// Define event emitter for parent communication
defineEmits(['filter-change']);
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2 mb-8 px-4">
    <button 
      v-for="cat in categories" 
      :key="cat.value"
      @click="$emit('filter-change', cat.value)"
      class="px-5 py-2 rounded-full border border-gray-300 text-sm font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
    >
      {{ cat.name }}
    </button>
  </div>
</template>