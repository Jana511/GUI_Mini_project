<script setup lang="ts">
defineProps<{
  modelValue: string;
  selectedCategory: string;
  maxPrice: number;
}>();

defineEmits(['update:modelValue', 'update:selectedCategory', 'update:maxPrice']);

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Beauty', value: 'beauty' },
  { name: 'Fragrances', value: 'fragrances' },
  { name: 'Skincare', value: 'skin-care' },
  { name: 'Watches', value: 'mens-watches' },
  { name: 'Bags', value: 'womens-bags' },
  { name: 'Shoes', value: 'mens-shoes' }
];
</script>

<template>
  <div class="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-10 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div>
        <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-2">Search Product</label>
        <input 
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          type="text" 
          placeholder="What are you looking for?" 
          class="w-full bg-gray-50 border-none px-5 py-3 rounded-2xl focus:ring-2 focus:ring-blue-500/10 transition-all text-sm"
        />
      </div>

      <div>
        <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-2">Category</label>
        <select 
          :value="selectedCategory"
          @change="$emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)"
          class="w-full bg-gray-50 border-none px-5 py-3 rounded-2xl focus:ring-2 focus:ring-blue-500/10 text-sm"
        >
          <option v-for="cat in categories" :key="cat.value" :value="cat.value">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-2">Max Price: ${{ maxPrice }}</label>
        <input 
          type="range" 
          min="0" 
          max="2000" 
          :value="maxPrice"
          @input="$emit('update:maxPrice', Number(($event.target as HTMLInputElement).value))"
          class="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

    </div>
  </div>
</template>