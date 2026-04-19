import { ref, computed } from 'vue';

/**
 * [span_5](start_span)Strict TypeScript Interface for API response[span_5](end_span)
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
}

export function useProducts() {
  const products = ref<Product[]>([]);
  const loading = ref<boolean>(true);
  const searchQuery = ref<string>('');
  const selectedCategory = ref<string>('all');
  const maxPrice = ref<number>(2000);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=0');
      const data = await response.json();
      
      // ප්‍රවර්ග තේරීම (Filtering specific categories)
      const allowed = [
        'beauty', 'fragrances', 'mens-shirts', 'womens-dresses', 
        'womens-bags', 'sunglasses', 'mens-watches', 'skin-care'
      ];

      products.value = data.products.filter((p: Product) => allowed.includes(p.category));
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      loading.value = false;
    }
  };

  /**
   * [span_6](start_span)Filtered list based on search, category and price[span_6](end_span)
   */
  const filteredProducts = computed(() => {
    return products.value.filter((p) => {
      const matchesCategory = selectedCategory.value === 'all' || p.category === selectedCategory.value;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesPrice = p.price <= maxPrice.value;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  });

  return { 
    loading, searchQuery, selectedCategory, maxPrice, 
    filteredProducts, fetchProducts 
  };
}