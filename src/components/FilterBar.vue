<script setup lang="ts">
defineProps<{
  modelValue: string;
  selectedCategory: string;
  maxPrice: number;
  sortBy: string;
}>();

defineEmits([
  'update:modelValue',
  'update:selectedCategory',
  'update:maxPrice',
  'update:sortBy'
]);

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Mens shirt', value: 'mens-shirts' },
  { name: 'Women fashion', value: 'women-fashion' },   // will include tops + womens-dresses
  { name: 'Bags', value: 'womens-bags' },
  { name: 'Perfume', value: 'fragrances' },
  { name: 'Watches', value: 'mens-watches' },
  { name: 'Sunglasses', value: 'sunglasses' },
  { name: 'Skincare', value: 'skin-care' },
  { name: 'Beauty', value: 'beauty' }
];

const sortOptions = [
  { name: 'Default', value: 'default' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
  { name: 'Name A-Z', value: 'name-asc' },
  { name: 'Name Z-A', value: 'name-desc' }
];
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md border-l-4 border-indigo-400 border-t border-r border-b p-5 mb-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <!-- Search -->
      <div>
        <label class="block text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
          SEARCH PRODUCT
        </label>
        <input
          type="text"
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          placeholder="What are you looking for?"
          class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
        />
      </div>

      <!-- Category -->
      <div>
        <label class="block text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
          CATEGORY
        </label>
        <select
          :value="selectedCategory"
          @change="$emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)"
          class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
        >
          <option v-for="cat in categories" :key="cat.value" :value="cat.value">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <!-- Max Price -->
      <div>
        <label class="block text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
          MAX PRICE: ${{ maxPrice }}
        </label>
        <input
          type="range"
          :value="maxPrice"
          @input="$emit('update:maxPrice', Number(($event.target as HTMLInputElement).value))"
          min="0"
          max="2000"
          step="10"
          class="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-indigo-600"
        />
        <div class="flex justify-between text-xs text-gray-400 mt-1">
          <span>$0</span>
          <span>$2000+</span>
        </div>
      </div>

      <!-- Sort By -->
      <div>
        <label class="block text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
          SORT BY
        </label>
        <select
          :value="sortBy"
          @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value)"
          class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
        >
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
            {{ opt.name }}
          </option>
        </select>
      </div>

    </div>
  </div>
</template>
