import { ref, computed } from 'vue'

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  thumbnail: string
  rating: number
}

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(true)
  const searchQuery = ref('')

  const fetchProducts = async () => {
    try {
      // Fetching all products to filter locally
      const response = await fetch('https://dummyjson.com/products?limit=0')
      const data = await response.json()
      
      // Target categories based on your request
      const targetCategories = [
        'mens-watches', 
        'womens-watches', 
        'womens-bags', 
        'mens-shoes',  
        'mens-shirts',  
        'womens-shoes', 
        'womens-dresses', 
        'tops', 
        'fragrances',   
        'skin-care',    
        'beauty',       
        'sunglasses'    
      ]

      // Filter products strictly by your requested categories
      products.value = data.products.filter((p: Product) => 
        targetCategories.includes(p.category)
      )
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      loading.value = false
    }
  }

  const filteredProducts = computed(() => {
    return products.value.filter(p => 
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  return { loading, searchQuery, filteredProducts, fetchProducts }
}