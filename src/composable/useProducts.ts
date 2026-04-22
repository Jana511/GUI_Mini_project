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
  const sortBy = ref('default')

  const fetchProducts = async () => {
    loading.value = true
    try {
      const response = await fetch('https://dummyjson.com/products?limit=0')
      const data = await response.json()
      
      const allowedCategories = [ 
        'beauty', 'fragrances', 'mens-shirts', 'womens-dresses', 
        'womens-bags', 'mens-wallets', 'tops', 'womens-shoes', 
        'mens-shoes', 'jewelry', 'sunglasses', 'mens-watches', 
        'womens-watches', 'skin-care'
      ]
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
    let result = products.value.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      
      // Category matching with special case for 'women-fashion'
      let matchesCategory = false
      if (selectedCategory.value === 'all') {
        matchesCategory = true
      } else if (selectedCategory.value === 'women-fashion') {
        // Women fashion includes both 'womens-dresses' and 'tops'
        matchesCategory = product.category === 'womens-dresses' || product.category === 'tops'
      } else {
        matchesCategory = product.category === selectedCategory.value
      }
      
      const matchesPrice = product.price <= maxPrice.value
      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sorting
    switch (sortBy.value) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        result.sort((a, b) => a.id - b.id)
    }
    return result
  })

  return { 
    loading, 
    searchQuery, 
    selectedCategory, 
    maxPrice, 
    sortBy,
    filteredProducts, 
    fetchProducts 
  }
}