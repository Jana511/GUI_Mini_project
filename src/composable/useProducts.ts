import { ref, computed } from 'vue'

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  thumbnail: string;
}

export function useProducts() {
  const loading = ref(false)
  const products = ref<Product[]>([])
  const searchQuery = ref('')
  const selectedCategory = ref('all')
  const maxPrice = ref(2000)

  const fetchProducts = async () => {
    loading.value = true
    try {
      const response = await fetch('https://dummyjson.com/products?limit=0')
      const data = await response.json()
      
      const allowedCategories = [ 'beauty', 
      'fragrances', 
      'mens-shirts', 
      'womens-dresses', 
      'womens-bags', 
      'mens-wallets', 
      'tops', 
      'womens-shoes', 
      'mens-shoes',
      'jewelry',       
      'sunglasses',    
      'mens-watches',  
      'womens-watches',
      'skin-care']
      products.value = data.products.filter((p: Product) => 
        allowedCategories.includes(p.category)
      )
    } catch (error) {
      console.error("API Error:", error)
    } finally {
      loading.value = false
    }
  }

  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value
      const matchesPrice = product.price <= maxPrice.value
      return matchesSearch && matchesCategory && matchesPrice
    })
  })

 
  return { 
    loading, searchQuery, selectedCategory, maxPrice, filteredProducts, fetchProducts 
  }
}