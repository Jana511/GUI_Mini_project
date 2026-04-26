import { ref, computed } from 'vue'
import type { Product } from './useProducts'

export interface CartItem extends Product {
  quantity: number
}

const cart = ref<CartItem[]>([])

// Load from localStorage
const savedCart = localStorage.getItem('cart')
if (savedCart) {
  cart.value = JSON.parse(savedCart)
}

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

export function useCart() {
  const addToCart = (product: Product, qty = 1) => {
    const existing = cart.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += qty
    } else {
      cart.value.push({ ...product, quantity: qty })
    }
    saveToLocalStorage()
  }

  const removeFromCart = (id: number) => {
    cart.value = cart.value.filter(item => item.id !== id)
    saveToLocalStorage()
  }

  // + / - සඳහා මෙම function එක අවශ්‍යයි
  const updateQuantity = (id: number, newQty: number) => {
    const item = cart.value.find(item => item.id === id)
    if (item && newQty >= 1) {
      item.quantity = newQty
      saveToLocalStorage()
    }
  }

  const totalPrice = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  const cartCount = computed(() => cart.value.length)

  return {
    cart,          // ref<CartItem[]> - template එකේ auto unwrap වේ
    addToCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    cartCount
  }
}