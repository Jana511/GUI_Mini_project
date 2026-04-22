import { ref, computed } from 'vue'
import type { Product } from './useProducts'   // Product interface එක useProducts වෙතින් ගන්න

const cart = ref<Product[]>([])

export function useCart() {
  const addToCart = (product: Product) => {
    cart.value.push(product)
    console.log("Added to cart:", product.title)
  }

  const removeFromCart = (index: number) => {
    cart.value.splice(index, 1)
  }

  const totalPrice = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.price, 0)
  })

  const cartCount = computed(() => cart.value.length)

  return {
    cart,
    addToCart,
    removeFromCart,
    totalPrice,
    cartCount
  }
}