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
  { name: 'Women fashion', value: 'women-fashion' },
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
  <div class="bg-white rounded-[30px] shadow-sm border-l-4 border-[#FF85A1] border-t border-r border-b border-pink-50 p-6 mb-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      <div>
        <label class="block text-[10px] font-bold text-[#FF85A1] uppercase tracking-[0.2em] mb-3">
          SEARCH PRODUCT
        </label>
        <input
          type="text"
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          placeholder="Search items..."
          class="w-full px-4 py-3 bg-[#FFF9FA] border border-pink-50 rounded-2xl focus:ring-2 focus:ring-[#FFC2D1] focus:bg-white outline-none text-gray-600 text-sm transition-all"
        />
      </div>

      <div>
        <label class="block text-[10px] font-bold text-[#FF85A1] uppercase tracking-[0.2em] mb-3">
          CATEGORY
        </label>
        <select
          :value="selectedCategory"
          @change="$emit('update:selectedCategory', ($event.target as HTMLSelectElement).value)"
          class="w-full px-4 py-3 bg-[#FFF9FA] border border-pink-50 rounded-2xl focus:ring-2 focus:ring-[#FFC2D1] focus:bg-white outline-none text-gray-600 text-sm transition-all cursor-pointer custom-select"
        >
          <option v-for="cat in categories" :key="cat.value" :value="cat.value" class="pink-option">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-[10px] font-bold text-[#FF85A1] uppercase tracking-[0.2em] mb-3">
          MAX PRICE: <span class="text-gray-700">${{ maxPrice }}</span>
        </label>
        <input
          type="range"
          :value="maxPrice"
          @input="$emit('update:maxPrice', Number(($event.target as HTMLInputElement).value))"
          min="0"
          max="2000"
          step="10"
          class="w-full h-1.5 bg-pink-100 rounded-lg cursor-pointer accent-[#FF85A1]"
        />
        <div class="flex justify-between text-[9px] font-bold text-pink-200 mt-2 uppercase tracking-widest">
          <span>$0</span>
          <span>$2000+</span>
        </div>
      </div>

      <div>
        <label class="block text-[10px] font-bold text-[#FF85A1] uppercase tracking-[0.2em] mb-3">
          SORT BY
        </label>
        <select
          :value="sortBy"
          @change="$emit('update:sortBy', ($event.target as HTMLSelectElement).value)"
          class="w-full px-4 py-3 bg-[#FFF9FA] border border-pink-50 rounded-2xl focus:ring-2 focus:ring-[#FFC2D1] focus:bg-white outline-none text-gray-600 text-sm transition-all cursor-pointer custom-select"
        >
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value" class="pink-option">
            {{ opt.name }}
          </option>
        </select>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Range thumb එක සුදු පැහැයට සකසා ලස්සන shadow එකක් ලබා දීම */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: white;
  border: 3px solid #FF85A1;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(255, 133, 161, 0.2);
}

/* Browser එකේ Default එන නිල් පැහැය (Blue focus) ඉවත් කිරීමට.
   සටහන: සමහර Browsers වල 'option' එකේ color එක සීමා විය හැක.
*/
.custom-select option:checked {
  background-color: #FF85A1 !important;
  color: white !important;
}

/* Firefox සඳහා */
.pink-option:checked {
  background-color: #FF85A1 !important;
  color: white !important;
}
</style>