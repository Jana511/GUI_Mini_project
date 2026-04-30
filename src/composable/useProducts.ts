import { ref, computed } from 'vue'

// 1. Interface එකට නව දත්ත (rating, stock, brand) එක් කිරීම
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  thumbnail: string;
  brand: string;   // නව දත්ත
  rating: number;  // නව දත්ත
  stock: number;   // නව දත්ත
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
      // DummyJSON API එකෙන් සියලුම නිෂ්පාදන ලබා ගැනීම
      const response = await fetch('https://dummyjson.com/products?limit=0')
      const data = await response.json()
      
      const allowedCategories = [ 
        'beauty', 'fragrances', 'womens-dresses', 
        'womens-bags', 'tops', 'womens-shoes', 
        'jewelry', 'sunglasses', 
        'womens-watches', 'skin-care'
      ]

      // Filter කිරීමේදී නව දත්ත (brand, rating, stock) නිවැරදිව පවතින බව තහවුරු කරයි
      products.value = data.products.filter((p: any) => 
        allowedCategories.includes(p.category)
      ).map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        category: p.category,
        description: p.description,
        thumbnail: p.thumbnail,
        brand: p.brand || 'StyleHub Premium', // Brand එකක් නැත්නම් default අගයක් ලබා දීම
        rating: p.rating,
        stock: p.stock
      }))
    } catch (error) {
      console.error("API Error:", error)
    } finally {
      loading.value = false
    }
  }

  const filteredProducts = computed(() => {
    let result = products.value.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      
      // Category matching
      let matchesCategory = false
      if (selectedCategory.value === 'all') {
        matchesCategory = true
      } else if (selectedCategory.value === 'women-fashion') {
        matchesCategory = product.category === 'womens-dresses' || product.category === 'tops'
      } else {
        matchesCategory = product.category === selectedCategory.value
      }
      
      const matchesPrice = product.price <= maxPrice.value
      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sorting Logic
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