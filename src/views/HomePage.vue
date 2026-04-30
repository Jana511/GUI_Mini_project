<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDarkMode } from '../composable/useDarkMode' 

const router = useRouter()
const { isDark } = useDarkMode() 

// State for newsletter email
const newsletterEmail = ref('')
const isSubscribed = ref(false)

// Best Sellers Products with Images - Price & Rating Inside Image
const bestSellers = ref([
  {
    id: 1,
    title: 'Summer Dresses',
    price: '$29.99',
    originalPrice: '$59.99',
    rating: 4.8,
    reviewCount: 234,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&h=500&fit=crop',
    discount: '50% OFF',
    delay: 0
  },
  {
    id: 2,
    title: 'Designer Sunglasses',
    price: '$49.99',
    originalPrice: '$99.99',
    rating: 4.6,
    reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    discount: '50% OFF',
    delay: 0.1
  },
  {
    id: 3,
    title: 'Beauty Sets',
    price: '$19.99',
    originalPrice: '$39.99',
    rating: 4.9,
    reviewCount: 456,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop',
    discount: '50% OFF',
    delay: 0.2
  }
])

// Instagram Feed Images with real photos
const instagramFeed = ref([
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&h=300&fit=crop',
    alt: 'Fashion Look 1',
    likes: '12.5k',
    delay: 0
  },
  {
    id: 2,
    image: 'https://static.vecteezy.com/system/resources/previews/047/984/625/large_2x/a-rack-of-beautiful-prom-dresses-in-various-colors-and-styles-hanging-on-hangers-at-the-back-wall-of-an-evening-wear-store-with-bright-lights-and-blurred-background-free-photo.jpg',
    alt: 'Fashion Look 2',
    likes: '8.2k',
    delay: 0.05
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=300&h=300&fit=crop',
    alt: 'Fashion Look 3',
    likes: '15.3k',
    delay: 0.1
  },
  {
    id: 4,
    image: 'https://static.vecteezy.com/system/resources/previews/036/800/686/large_2x/ai-generated-fashionable-wedding-dress-hanging-in-a-boutique-elegant-and-glamorous-generated-by-ai-photo.jpg',
    alt: 'Fashion Look 4',
    likes: '10.1k',
    delay: 0.15
  },
  {
    id: 5,
    image: 'https://as2.ftcdn.net/jpg/03/21/68/65/1000_F_321686568_cSXVysoKOFTLljosiZkFbjhR2qb4uLFM.jpg',
    alt: 'Fashion Look 5',
    likes: '22.7k',
    delay: 0.2
  },
  {
    id: 6,
    image: 'https://jsaeyedocs.com/wp-content/uploads/2023/07/What-Are-Polarized-Sunglasses-Are-They-Better-For-Eyes_-1.jpg',
    alt: 'Fashion Look 6',
    likes: '6.4k',
    delay: 0.25
  }
])

// Navigate to products page
const goToProducts = () => {
  router.push('/products')
}

// Navigate to specific category
const goToCategory = (category: string) => {
  router.push({ path: '/products', query: { category } })
}

// Navigate to product detail
const goToProduct = (productId: number) => {
  router.push(`/product/${productId}`)
}

// Handle newsletter subscription
const subscribeNewsletter = () => {
  if (newsletterEmail.value && newsletterEmail.value.includes('@')) {
    isSubscribed.value = true
    setTimeout(() => {
      isSubscribed.value = false
      newsletterEmail.value = ''
    }, 3000)
  } else {
    alert('Please enter a valid email address')
  }
}

// Scroll to section
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  section?.scrollIntoView({ behavior: 'smooth' })
}

// Counter animation for stats
const stats = ref([
  { value: 0, target: 500, label: 'Happy Customers', suffix: '+' },
  { value: 0, target: 120, label: 'Premium Brands', suffix: '+' },
  { value: 0, target: 2000, label: 'Products', suffix: '+' },
  { value: 0, target: 24, label: 'Support', suffix: '/7' }
])

// Generate star rating function
const getStarRating = (rating: number) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
  return { fullStars, hasHalfStar, emptyStars }
}

onMounted(() => {
  // Animate stats when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.value.forEach(stat => {
          const interval = setInterval(() => {
            if (stat.value < stat.target) {
              stat.value += Math.ceil(stat.target / 50)
            } else {
              clearInterval(interval)
            }
          }, 20)
        })
        observer.disconnect()
      }
    })
  })
  
  const statsSection = document.querySelector('.stats-section')
  if (statsSection) observer.observe(statsSection)
  
  // Scroll Reveal Observer - elements fade in as you scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  
  // Observe all elements with scroll-reveal class
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    revealObserver.observe(el)
  })
})
</script>

<template>
  <main :class="{ 'dark': isDark }" class="min-h-screen bg-[#FFF9FA] dark:bg-[#0A0A0A] transition-colors duration-500 overflow-x-hidden">
    
    <!-- Hero Section with Photo Animation -->
    <section class="relative w-full h-[600px] lg:h-[750px] overflow-hidden bg-black">
      
      <!-- Animated Background Image - Slow Zoom In -->
      <div class="absolute inset-0 hero-image">
        <img 
          src="https://static.vecteezy.com/system/resources/previews/071/001/752/non_2x/beautiful-woman-in-pink-dress-with-shopping-bags-and-sunglasses-photo.jpg" 
          class="w-full h-full object-cover opacity-90 dark:opacity-60" 
          alt="StyleHub Hero Image"
        />
      </div>
      
      <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10"></div>
      
      <!-- Hero Content -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
        <div class="space-y-6 max-w-4xl mx-auto">
          
          <!-- Badge -->
          <div class="hero-badge">
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-4 border border-white/20 hover:scale-105 transition-transform duration-300">
              <span>✨</span>
              <span class="text-[10px] font-black text-white uppercase tracking-[0.3em]">NEW SEASON 2026</span>
              <span>✨</span>
            </div>
          </div>
          
          <!-- Title -->
          <div class="hero-title">
            <h1 class="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter italic font-serif uppercase drop-shadow-2xl leading-none">
              WELCOME TO 
              <span class="relative inline-block">
                STYLE<span class="text-[#FF85A1] relative">HUB</span>
              </span>
            </h1>
          </div>
          
          <!-- Tagline -->
          <div class="hero-tagline">
            <p class="text-pink-100 text-[11px] md:text-sm font-black italic tracking-[0.6em] uppercase drop-shadow-lg">
              YOUR LIGHT FASHION DESTINATION
            </p>
          </div>
          
          <!-- Description -->
          <div class="hero-description">
            <p class="text-white/80 text-xs md:text-sm max-w-xl mx-auto mt-4 font-light">
              Discover the latest trends with exclusive discounts up to 50% off. 
              Free shipping on orders over $50.
            </p>
          </div>
          
          <!-- Button -->
          <div class="hero-button">
            <button 
              @click="goToProducts" 
              class="bg-[#FF85A1] text-[11px] text-white uppercase tracking-[0.4em] font-black px-12 py-5 rounded-full transition-all duration-300 hover:shadow-[0_20px_50px_rgba(255,133,161,0.6)] hover:-translate-y-2 active:scale-95"
            >
              <span class="inline-flex items-center gap-2">
                SHOP NOW
                <span>→</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer scroll-indicator" @click="scrollToSection('featured-categories')">
        <div class="w-7 h-12 border-2 border-white rounded-full flex justify-center backdrop-blur-sm bg-white/5">
          <div class="w-1.5 h-2.5 bg-white rounded-full mt-2 scroll-dot"></div>
        </div>
      </div>
    </section>

    <!-- Trust Badges Section - Scroll Reveal -->
    <section class="py-8 border-b border-pink-50 dark:border-white/5 bg-white/50 dark:bg-black/20 overflow-hidden">
      <div class="container mx-auto px-6">
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          <div v-for="(badge, index) in [
            { icon: '🚚', title: 'FREE SHIPPING', desc: 'On orders $50+' },
            { icon: '🔄', title: '30-DAY RETURNS', desc: 'Easy returns policy' },
            { icon: '💳', title: 'SECURE PAYMENT', desc: '100% secure' },
            { icon: '⭐', title: '24/7 SUPPORT', desc: 'Dedicated assistance' }
          ]" :key="badge.title" 
               class="flex items-center gap-3 scroll-reveal"
               :style="{ transitionDelay: `${index * 0.1}s` }">
            <span class="text-2xl">{{ badge.icon }}</span>
            <div>
              <p class="text-[9px] font-black uppercase tracking-wider text-gray-600 dark:text-gray-400">{{ badge.title }}</p>
              <p class="text-[8px] text-gray-400">{{ badge.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED CATEGORIES SECTION - Scroll Reveal -->
    <section id="featured-categories" class="container mx-auto px-6 py-20">
      <div class="text-center mb-16 scroll-reveal">
        <span class="text-[#FF85A1] text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">
          ✨ SHOP BY CATEGORY ✨
        </span>
        <h2 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter italic font-serif">
          Featured <span class="text-[#FF85A1]">Categories</span>
        </h2>
        <div class="w-20 h-0.5 bg-[#FF85A1] mx-auto mt-6 rounded-full"></div>
      </div>

      <!-- 5 Categories Grid -->
      <div class="flex justify-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          
          <div 
            v-for="(cat, idx) in [
              { name: 'Bags & Accessories', category: 'womens-bags', img: 'https://media.wishque.com/data/images/products/12201/thumbnail/11425788_851779667453_0.65040100-1726903207.png', delay: 0.1 },
              { name: 'Women Fashion', category: 'women-fashion', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?fm=jpg&q=60&w=800&auto=format&fit=crop', delay: 0.15 },
              { name: 'Women Slippers', category: 'womens-shoes', img: 'https://ae-pic-a1.aliexpress-media.com/kf/S22fa5c950fab45068327f63f761f1cb2X.jpg', delay: 0.2 },
              { name: 'Beauty', category: 'beauty', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=1000&fit=crop', delay: 0.25 },
              { name: 'Perfume', category: 'fragrances', img: 'https://img.kwcdn.com/product/fancy/d9551ede-dedc-44c0-9ee3-44407e72478f.jpg', delay: 0.3 }
            ]"
            :key="idx"
            @click="goToCategory(cat.category)" 
            class="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.05] scroll-reveal"
            :style="{ transitionDelay: `${cat.delay}s` }"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 rounded-2xl"></div>
            <img 
              :src="cat.img" 
              :alt="cat.name"
              class="w-full h-[250px] object-cover transition-all duration-700 group-hover:scale-110 rounded-2xl"
            />
            <div class="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
              <h3 class="text-lg font-black mb-1">{{ cat.name }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- VIEW ALL PRODUCTS Button -->
      <div class="text-center mt-12 scroll-reveal" style="transition-delay: 0.35s">
        <button 
          @click="goToProducts" 
          class="inline-flex items-center gap-3 px-10 py-4 bg-transparent border-2 border-[#FF85A1] text-[#FF85A1] rounded-full font-black uppercase text-[11px] tracking-[0.2em] hover:bg-[#FF85A1] hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span>VIEW ALL PRODUCTS</span>
          <span>→</span>
        </button>
      </div>
    </section>

    <!-- Stats Counter Section - Scroll Reveal -->
    <section class="stats-section bg-gradient-to-r from-[#f2b1c0] to-[#f1a4b7] dark:from-[#1A1A1A] dark:to-[#2A2A2A] py-16">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div v-for="(stat, idx) in stats" :key="stat.label" class="space-y-2 scroll-reveal" :style="{ transitionDelay: `${idx * 0.1}s` }">
            <div class="text-4xl md:text-5xl font-black text-white">{{ stat.value }}{{ stat.suffix }}</div>
            <p class="text-white/80 text-[10px] font-black uppercase tracking-wider">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- BEST SELLERS SECTION - Scroll Reveal -->
    <section class="container mx-auto px-6 py-20">
      <div class="text-center mb-12 scroll-reveal">
        <span class="text-[#FF85A1] text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">
          ⭐ BEST SELLERS ⭐
        </span>
        <h2 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter italic font-serif">
          Most Loved <span class="text-[#FF85A1]">This Week</span>
        </h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-3">Shop our most popular items loved by customers worldwide</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="item in bestSellers" 
          :key="item.id"
          class="group cursor-pointer scroll-reveal"
          :style="{ transitionDelay: `${item.delay}s` }"
          @click="goToProduct(item.id)"
        >
          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/10 transition-all duration-300 hover:shadow-2xl">
            <img 
              :src="item.image" 
              :alt="item.title"
              class="w-full aspect-square object-cover transition-all duration-700 group-hover:scale-110"
            />
            
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <img 
                :src="item.hoverImage" 
                :alt="item.title"
                class="w-full h-full object-cover scale-110"
              />
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button class="bg-white text-[#FF85A1] text-[10px] font-black px-6 py-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  QUICK VIEW →
                </button>
              </div>
            </div>
            
            <div class="absolute top-3 left-3 z-10">
              <div class="bg-[#FF85A1] text-white text-[9px] font-black px-2 py-1 rounded-md shadow-lg">
                🔥 {{ item.discount }}
              </div>
            </div>
            
            <div class="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button class="bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#FF85A1] hover:text-white transition-colors duration-300">
                ♡
              </button>
            </div>
            
            <div class="absolute bottom-3 left-3 z-10 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <div class="flex items-center gap-2">
                <span class="text-white font-black text-lg">{{ item.price }}</span>
                <span class="text-gray-400 text-[10px] line-through">{{ item.originalPrice }}</span>
              </div>
            </div>
            
            <div class="absolute bottom-3 right-3 z-10 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <div class="flex items-center gap-1">
                <div class="flex text-yellow-400 text-[10px]">
                  <span v-for="n in getStarRating(item.rating).fullStars" :key="n">★</span>
                  <span v-if="getStarRating(item.rating).hasHalfStar">½</span>
                  <span v-for="n in getStarRating(item.rating).emptyStars" :key="n" class="text-gray-500">☆</span>
                </div>
                <span class="text-white text-[9px] font-bold">({{ item.reviewCount }})</span>
              </div>
            </div>
            
            <div class="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div class="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <div class="flex items-center gap-3">
                  <button class="text-[10px] font-bold text-gray-600 hover:text-[#FF85A1] transition-colors">S</button>
                  <span class="text-gray-300">|</span>
                  <button class="text-[10px] font-bold text-gray-600 hover:text-[#FF85A1] transition-colors">M</button>
                  <span class="text-gray-300">|</span>
                  <button class="text-[10px] font-bold text-gray-600 hover:text-[#FF85A1] transition-colors">L</button>
                  <span class="text-gray-300">|</span>
                  <button class="text-[10px] font-bold text-gray-600 hover:text-[#FF85A1] transition-colors">XL</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="text-center mt-4">
            <h3 class="font-black text-gray-800 dark:text-white group-hover:text-[#FF85A1] transition-colors duration-300">
              {{ item.title }}
            </h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section - Scroll Reveal -->
    <section class="bg-gradient-to-r from-[#f2b1c0] to-[#f1a4b7] dark:from-[#1A1A1A] dark:to-[#2A2A2A] py-20 mt-10 relative overflow-hidden">
      <div class="absolute top-10 left-10 opacity-30">
        <span class="text-2xl">✨</span>
      </div>
      <div class="absolute bottom-20 right-20 opacity-30">
        <span class="text-3xl">💫</span>
      </div>
      
      <div class="container mx-auto px-6 text-center relative z-10">
        <div class="max-w-2xl mx-auto scroll-reveal">
          <div class="text-5xl mb-4">✉️</div>
          <h3 class="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">STAY IN STYLE</h3>
          <p class="text-white/80 text-sm mt-2 mb-8">
            Subscribe and get <span class="font-bold text-white">10% off</span> your first purchase + exclusive early access
          </p>
          
          <div v-if="isSubscribed" class="mb-6 p-4 bg-green-500/20 border border-green-400 rounded-2xl">
            <p class="text-white text-sm font-bold">🎉 Thank you! Check your email for 10% off code.</p>
          </div>
          
          <div class="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input 
              v-model="newsletterEmail"
              type="email" 
              placeholder="Your email address" 
              class="flex-1 px-5 py-4 rounded-full bg-white/20 text-white placeholder-white/60 border border-white/30 outline-none text-sm focus:bg-white/30 transition focus:ring-2 focus:ring-white duration-300"
            >
            <button 
              @click="subscribeNewsletter"
              class="bg-white text-[#FF85A1] px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider hover:bg-gray-100 transition shadow-lg hover:scale-105 transform duration-300"
            >
              SUBSCRIBE →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- INSTAGRAM FEED SECTION - Scroll Reveal -->
    <section class="container mx-auto px-6 py-16">
      <div class="text-center mb-12 scroll-reveal">
        <div class="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-[#FF85A1] text-white px-6 py-2 rounded-full mb-4">
          <span class="text-xl">📸</span>
          <span class="text-[9px] font-black uppercase tracking-wider">INSTAGRAM</span>
        </div>
        <h3 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-3">
          FOLLOW US <span class="text-[#FF85A1]">@STYLEHUB</span>
        </h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Join our community of fashion lovers</p>
      </div>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        <div 
          v-for="item in instagramFeed" 
          :key="item.id"
          class="group relative overflow-hidden rounded-xl cursor-pointer scroll-reveal"
          :style="{ transitionDelay: `${item.delay}s` }"
          @click="goToProducts"
        >
          <img 
            :src="item.image" 
            :alt="item.alt"
            class="w-full aspect-square object-cover transition-all duration-500 group-hover:scale-110"
          />
          
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
            <div class="text-white text-[10px] font-black">
              ❤️ {{ item.likes }} likes
            </div>
          </div>
        </div>
      </div>
      
      <div class="text-center mt-10 scroll-reveal" style="transition-delay: 0.3s">
        <a 
          href="#" 
          class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-[#FF85A1] text-white rounded-full font-black text-[10px] uppercase tracking-wider hover:scale-105 transition-transform duration-300 shadow-lg"
        >
          FOLLOW ON INSTAGRAM
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&display=swap');

.font-serif { 
  font-family: 'Playfair Display', serif; 
}

/* ========== HERO SECTION PHOTO ANIMATION ========== */

/* Hero Background Image - Beautiful Slow Zoom */
.hero-image {
  animation: slowZoom 25s ease-in-out infinite alternate;
}

@keyframes slowZoom {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.15);
  }
}

/* Hero Badge - Slide Down */
.hero-badge {
  opacity: 0;
  transform: translateY(-30px);
  animation: slideDown 0.6s ease-out forwards;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hero Title - Slide Up */
.hero-title {
  opacity: 0;
  transform: translateY(50px);
  animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: 0.2s;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hero Tagline - Fade In */
.hero-tagline {
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
  animation-delay: 0.5s;
}

/* Hero Description - Fade In */
.hero-description {
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
  animation-delay: 0.7s;
}

/* Hero Button - Scale In */
.hero-button {
  opacity: 0;
  transform: scale(0.9);
  animation: scaleIn 0.5s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
  animation-delay: 0.9s;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Scroll Indicator - Bounce Animation */
.scroll-indicator {
  animation: bounce 2s ease-in-out infinite;
}

.scroll-dot {
  animation: scrollDot 1.5s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(10px) translateX(-50%);
  }
}

@keyframes scrollDot {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(15px);
  }
}

/* ========== SCROLL REVEAL ANIMATIONS ========== */
/* Elements appear as you scroll down */

.scroll-reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Hover Effects */
.group:hover img {
  transform: scale(1.1);
}

button {
  transition: all 0.3s ease;
}

:global(html) {
  scroll-behavior: smooth;
}
</style>