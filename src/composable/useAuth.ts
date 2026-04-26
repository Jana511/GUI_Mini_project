import { ref } from 'vue'
import type { User } from '../types/auth'

const currentUser = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))

export function useAuth() {
  const login = async (username: string, password: string) => {
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      
      if (!res.ok) throw new Error('Login Failed')
      
      const data: User = await res.json()
      currentUser.value = data
      localStorage.setItem('user', JSON.stringify(data)) // Persistence සඳහා
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('user')
  }

  return { currentUser, login, logout }
}