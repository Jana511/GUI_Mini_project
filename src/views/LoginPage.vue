<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composable/useAuth'
import { useDarkMode } from '../composable/useDarkMode'

const { login } = useAuth()
const { isDark } = useDarkMode()
const router = useRouter()

const username = ref('emilys') 
const password = ref('emilyspass')

const handleLogin = async () => {
  const success = await login(username.value, password.value)
  if (success) {
    router.push('/')
  } else {
    alert('Invalid Credentials!')
  }
}
</script>

<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen flex bg-[#FFF9FA] dark:bg-[#0A0A0A] font-serif transition-colors duration-500">
    
    <div class="hidden lg:block w-1/2 relative overflow-hidden bg-[#FDF2F5] dark:bg-[#121212]">
      <img 
        src="https://static.vecteezy.com/system/resources/previews/071/002/990/large_2x/happy-woman-in-pink-suit-with-shopping-bags-retail-therapy-sale-concept-photo.jpg" 
        class="absolute inset-0 w-full h-full object-cover opacity-100 dark:opacity-60 transition-opacity"
        alt="Shopping Girl"
      />
      <div class="absolute inset-0 bg-pink-100/10 dark:bg-black/30"></div>
    </div>

    <div class="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 bg-white dark:bg-[#151515] transition-colors duration-500">
      <div class="max-w-md w-full mx-auto">
        
        <h3 class="text-xl font-bold mb-10 tracking-tighter italic text-gray-800 dark:text-[#FF85A1]">StyleHub</h3>

        <h1 class="text-5xl font-bold mb-2 uppercase tracking-tighter text-gray-900 dark:text-white">Sign In</h1>
        <p class="text-gray-400 dark:text-gray-500 text-sm mb-10 italic font-sans">Welcome ✨</p>

        <div class="space-y-4 mb-8 font-sans">
          <button type="button" class="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-100 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-[12px] font-semibold text-gray-600 dark:text-gray-300">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google" />
            Continue with Google
          </button>
          <button type="button" class="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-100 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-[12px] font-semibold text-gray-600 dark:text-gray-300">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" class="w-5 h-5" alt="Facebook" />
            Continue with Facebook
          </button>
        </div>

        <div class="relative flex py-6 items-center mb-4">
          <div class="flex-grow border-t border-gray-100 dark:border-white/5"></div>
          <span class="flex-shrink mx-4 text-gray-300 dark:text-gray-600 text-[10px] uppercase tracking-widest font-sans">Or continue with email</span>
          <div class="flex-grow border-t border-gray-100 dark:border-white/5"></div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6 font-sans">
          <div>
            <label class="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Email Address</label>
            <input 
              v-model="username" 
              type="text" 
              placeholder="you@example.com" 
              class="w-full p-4 bg-[#FFF9FA] dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:bg-white dark:focus:bg-white/10 outline-none transition-all text-sm dark:text-white"
            />
          </div>
          
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="text-[10px] uppercase font-bold tracking-widest text-gray-400">Password</label>
              <a href="#" class="text-[10px] text-gray-400 dark:text-gray-500 underline uppercase tracking-widest">Forgot?</a>
            </div>
            <input 
              v-model="password" 
              type="password" 
              placeholder="Enter your password" 
              class="w-full p-4 bg-[#FFF9FA] dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl focus:bg-white dark:focus:bg-white/10 outline-none transition-all text-sm dark:text-white"
            />
          </div>

          <button type="submit" class="w-full py-4 bg-[#FF85A1] dark:bg-[#FF85A1] text-white font-bold rounded-xl hover:opacity-90 transition-all uppercase tracking-widest text-[11px] mt-4 shadow-lg shadow-brown-100 dark:shadow-none">
            SIGN IN →
          </button>
        </form>

        <p class="text-center text-xs text-gray-400 mt-12 font-sans tracking-wide">
          New to StyleHub? <a href="#" class="text-[#FF85A1] dark:text-[#FF85A1] font-bold border-b border-[#FF85A1] dark:border-[#FF85A1] ml-1">Create account</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;600;700&display=swap');

.font-serif { font-family: 'Playfair Display', serif; }
.font-sans { font-family: 'Inter', sans-serif; }
</style>