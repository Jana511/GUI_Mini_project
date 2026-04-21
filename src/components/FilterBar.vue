<script setup lang="ts">
defineProps<{
  modelValue: string;
  selectedCategory: string;
  maxPrice: number;
}>();

defineEmits(['update:modelValue', 'update:selectedCategory', 'update:maxPrice']);

const categories = [
  { name: 'All Selected Items', value: 'all' },
  { name: 'Mens Shoes', value: 'mens-shoes' },
  { name: 'Womens Shoes', value: 'womens-shoes' },
  { name: 'Bags', value: 'womens-bags' },
  { name: 'Perfume', value: 'fragrances' },
  { name: 'Watches', value: 'mens-watches' },
  { name: 'Sunglasses', value: 'sunglasses' },
  { name: 'Skincare', value: 'skin-care' },
  { name: 'Beauty', value: 'beauty' }
];
</script>

<template>
  <div class="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-10">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <input 
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        placeholder="Search products..." 
        class="bg-gray-50 border-none px-5 py-3 rounded-2xl text-sm"
      />
      <select 
        :value="selectedCategory"
        @change="$emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)"
        class="bg-gray-50 border-none px-5 py-3 rounded-2xl text-sm"
      >
        <option v-for="cat in categories" :key="cat.value" :value="cat.value">{{ cat.name }}</option>
      </select>
      <input 
        type="range" min="0" max="2000" :value="maxPrice"
        @input="$emit('update:maxPrice', Number(($event.target as HTMLInputElement).value))"
        class="w-full h-2 bg-gray-100 rounded-lg cursor-pointer"
      />
    </div>
  </div>
</template>