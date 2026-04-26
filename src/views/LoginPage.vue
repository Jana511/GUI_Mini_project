<template>
  <div class="min-h-screen flex bg-[#FFF9FA] font-serif">
    
    <div class="hidden lg:block w-1/2 relative overflow-hidden bg-[#FDF2F5]">
      <img 
        src="https://static.vecteezy.com/system/resources/previews/031/418/283/large_2x/trendy-stylish-woman-rejoicing-with-sales-shopping-time-isolated-on-pink-studio-background-wearing-casual-outfit-straw-hat-summer-mood-photo.jpg" 
        class="absolute inset-0 w-full h-full object-cover"
        alt="Shopping Girl in Pink Dress"
      />
      <div class="absolute inset-0 bg-pink-200/10"></div>
    </div>

    <div class="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12 bg-white">
      <div class="max-w-md w-full mx-auto">
        
        <h3 class="text-xl font-bold mb-12 tracking-tighter italic text-[#FF85A1]">StyleHub</h3>

        <h1 class="text-4xl font-bold mb-2 uppercase tracking-tighter text-gray-800">Sign In</h1>
        <p class="text-pink-300 text-sm mb-10 italic font-sans">Welcome to styleHub 🛍️</p>

        <div class="space-y-4 mb-8 font-sans">
          <button type="button" class="w-full flex items-center justify-center gap-3 py-3.5 border border-pink-50 rounded-xl hover:bg-pink-50 transition-all text-[12px] font-semibold text-gray-600">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt="Google" />
            Continue with Google
          </button>
          <button type="button" class="w-full flex items-center justify-center gap-3 py-3.5 border border-pink-50 rounded-xl hover:bg-pink-50 transition-all text-[12px] font-semibold text-gray-600">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" class="w-5 h-5" alt="Facebook" />
            Continue with Facebook
          </button>
        </div>

        <div class="relative flex py-6 items-center mb-4">
          <div class="flex-grow border-t border-pink-50"></div>
          <span class="flex-shrink mx-4 text-pink-200 text-[10px] uppercase tracking-widest font-sans">Or continue with email</span>
          <div class="flex-grow border-t border-pink-50"></div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6 font-sans">
          <div>
            <label class="block text-[10px] uppercase font-bold tracking-widest text-pink-300 mb-2">Email Address</label>
            <input 
              v-model="username" 
              type="text" 
              placeholder="you@example.com" 
              class="w-full p-4 bg-[#FFF9FA] border border-pink-50 rounded-xl focus:bg-white focus:border-[#FFC2D1] outline-none transition-all text-sm font-sans"
            />
          </div>
          
          <div>
            <div class="flex justify-between items-center mb-2 font-sans">
              <label class="text-[10px] uppercase font-bold tracking-widest text-pink-300">Password</label>
              <a href="#" class="text-[10px] text-pink-300 underline uppercase tracking-widest hover:text-[#FF85A1]">Forgot password?</a>
            </div>
            <input 
              v-model="password" 
              type="password" 
              placeholder="Enter your password" 
              class="w-full p-4 bg-[#FFF9FA] border border-pink-50 rounded-xl focus:bg-white focus:border-[#FFC2D1] outline-none transition-all text-sm font-sans"
            />
          </div>

          <button type="submit" class="w-full py-4 bg-[#FF85A1] text-white font-bold rounded-xl hover:bg-[#FF6B91] transition-all shadow-md shadow-pink-100 uppercase tracking-widest text-[10px] mt-4">
            SIGN IN →
          </button>
        </form>

        <p class="text-center text-xs text-gray-400 mt-12 font-sans tracking-wide">
          New to StyleHub? <a href="#" class="text-[#FF85A1] font-bold border-b border-[#FF85A1] ml-1">Create account</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composable/useAuth'

const { login } = useAuth()
const router = useRouter()

const username = ref('emilys') 
const password = ref('emilyspass')

const handleLogin = async () => {
  const success = await login(username.value, password.value)
  if (success) {
    router.push('/')
  } else {
    alert('Invalid Credentials! (Try emilys / emilyspass)')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;600;700&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}
.font-sans {
  font-family: 'Inter', sans-serif;
}
</style>