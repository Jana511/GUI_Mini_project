<template>
  <nav class="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 shadow-xl shadow-purple-900/10 px-6 py-4">
    <div class="container mx-auto flex justify-between items-center">
      
      <div class="flex items-center space-x-3 group cursor-pointer">
        <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
          <span class="text-purple-700 font-black text-xl">S</span>
        </div>
        <h1 class="text-2xl font-black tracking-tighter text-white uppercase italic">StyleHub</h1>
      </div>
      
      <div class="hidden md:flex space-x-8 text-[11px] font-black text-purple-100 uppercase tracking-[0.2em]">
        <a href="#" class="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all hover:after:w-full">Home</a>
        <a href="#" class="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all hover:after:w-full">Products</a>
        <a href="#" class="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all hover:after:w-full">Cart</a>
      </div>

      <div class="flex items-center space-x-5">
        <button class="text-white hover:scale-110 transition-transform">
          <span class="text-xl">🔍</span>
        </button>
        <button class="relative bg-white/10 p-2 rounded-xl border border-white/20 hover:bg-white/20 transition-all group">
          <span class="text-xl">🛒</span>
          <span class="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 border-purple-600 group-hover:animate-bounce">
            0
          </span>
        </button>
      </div>

    </div>
  </nav>
</template>