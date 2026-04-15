<script setup lang="ts">

import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    
    <NavBar />

    <main class="container mx-auto flex flex-col items-center justify-center pt-20 px-4">
      <div class="bg-white p-10 rounded-2xl shadow-xl text-center border border-gray-200">
        <h1 class="text-4xl font-extrabold text-blue-600 mb-4">
          SwiftCart Store
        </h1>
        <p class="text-gray-600 text-lg">
          Welcome! We are setting up your shopping experience.
        </p>
        <div class="mt-6">
          <span class="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            Ready to fetch products
          </span>
        </div>
      </div>
    </main>

  </div>
 </template>

<style>

 </style>