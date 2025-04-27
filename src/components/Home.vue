<!--废弃-->

<script setup lang="ts">
  import { ref,onMounted } from 'vue'

  const isDark = ref(false)
  const showPage = ref(false)

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
  }

  onMounted(() => {
    // 页面加载完后，触发卡片显示
    setTimeout(() => {
      showPage.value = true
    }, 100) // 微小延迟，让动画更流畅
  })

  const year = new Date().getFullYear()

  const categories = [
    "Cleaning", "Childcare", "Elder Care", "Appliance Cleaning", "Home Repairs", "Private Chef"
  ]

  const providers = [
    "Auntie Zhang", "Mr. Li", "Ms. Wang"
  ]
</script>

<template>
  <div :class="[isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800']" class="min-h-screen flex flex-col transition-colors duration-500">
    <header :class="[isDark ? 'bg-gray-800' : 'bg-white']" class="px-6 py-4 shadow flex justify-between items-center sticky top-0 z-10 transition-colors duration-500">
      <h1 class="text-3xl font-bold" :class="isDark ? 'text-amber-400' : 'text-amber-600'">AlloMaison</h1>
      <div class="flex items-center space-x-4">
        <button class="hover:text-amber-500 transition">Find Services</button>
        <button class="hover:text-amber-500 transition">Post a Request</button>
        <button class="hover:text-amber-500 transition">Become a Provider</button>
        <button class="px-4 py-2 rounded-lg" :class="isDark ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-amber-400 hover:bg-amber-500 text-white'">Login / Register</button>
        <!-- 暗色模式开关 -->
        <button @click="toggleDarkMode" class="ml-4 p-2 rounded-full border hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </header>

    <section :class="[isDark ? 'bg-gray-800' : 'bg-amber-50']" class="py-20 text-center transition-colors duration-500">
      <h2 class="text-5xl font-extrabold mb-6 transition-transform transform hover:scale-105 duration-300" :class="isDark ? 'text-amber-400' : 'text-amber-700'">
        Home Services, Simplified
      </h2>
      <p class="text-lg mb-10">Certified helpers available nationwide at your doorstep</p>
      <div class="flex justify-center space-x-6">
        <button class="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-white rounded-xl text-lg transition">Find a Provider</button>
        <button class="px-8 py-3 border-2 border-amber-400 text-amber-600 hover:bg-amber-100 rounded-xl text-lg transition">Post My Request</button>
      </div>
    </section>

    <section :class="[isDark ? 'bg-gray-900' : 'bg-white']" class="py-16 px-6 transition-colors duration-500">
      <h3 class="text-3xl font-semibold text-center mb-10">Popular Service Categories</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div
          v-for="(title, idx) in categories"
          :key="title"
          :class="[
            showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            isDark ? 'bg-gray-800' : 'bg-white',
            'rounded-2xl shadow-md p-6 text-center transition-all duration-700 delay-' + (idx * 100)
          ]"
        >
          <div class="text-xl font-bold mb-4" :class="isDark ? 'text-amber-400' : 'text-amber-700'">{{ title }}</div>
          <button class="text-sm text-amber-500 hover:underline">Learn More</button>
        </div>
      </div>
    </section>

    <section :class="[isDark ? 'bg-gray-800' : 'bg-amber-100']" class="py-16 px-6 transition-colors duration-500">
      <h3 class="text-3xl font-semibold text-center mb-10">Latest Requests</h3>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(id, idx) in [1,2,3]"
          :key="id"
          :class="[
            showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            isDark ? 'bg-gray-700' : 'bg-white',
            'rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-700 delay-' + (idx * 150)
          ]"
        >
          <div class="flex items-center mb-4">
            <div :class="[isDark ? 'bg-amber-600' : 'bg-amber-100']" class="w-12 h-12 rounded-full mr-4"></div>
            <div>
              <p class="font-bold">User{{ id }}</p>
              <p class="text-xs text-gray-500">City</p>
            </div>
          </div>
          <h4 class="text-lg font-bold mb-2" :class="isDark ? 'text-amber-400' : 'text-amber-700'">Looking for a Housekeeper</h4>
          <p class="text-sm mb-4">
            Need a cleaner twice a week, mainly for the kitchen and bathrooms.
          </p>
          <p class="text-xs text-right text-gray-400">5 minutes ago</p>
        </div>
      </div>
    </section>

    <section :class="[isDark ? 'bg-gray-900' : 'bg-white']" class="py-16 px-6 transition-colors duration-500">
      <h3 class="text-3xl font-semibold text-center mb-10">Top-rated Providers</h3>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(name, idx) in providers"
          :key="idx"
          :class="[
            showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            isDark ? 'bg-gray-800' : 'bg-white',
            'rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-700 delay-' + (idx * 150)
          ]"
        >
          <div class="flex items-center mb-4">
            <div :class="[isDark ? 'bg-amber-600' : 'bg-amber-100']" class="w-12 h-12 rounded-full mr-4"></div>
            <div>
              <p class="font-bold">{{ name }}</p>
              <p class="text-sm text-gray-500 flex items-center">
                <span class="text-yellow-400 mr-1">★</span> 4.{{ 9 - idx }}/5
              </p>
            </div>
          </div>
          <p class="text-sm">
            Specializes in home cleaning and deep sanitization, known for thorough and attentive service.
          </p>
        </div>
      </div>
    </section>
  </div>
  <div
    :class="[isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600']"
    class="py-10 px-6 transition-colors duration-500">

    <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      <!-- 品牌简述 -->
      <div>
        <h4 class="text-lg font-semibold mb-3"
            :class="isDark ? 'text-amber-400' : 'text-amber-700'">
          AlloMaison
        </h4>
        <p class="text-sm leading-relaxed">
          Home services, simplified. Certified helpers at your doorstep.
        </p>
      </div>

      <!-- 快速链接 -->
      <div>
        <h4 class="text-lg font-semibold mb-3"
            :class="isDark ? 'text-amber-400' : 'text-amber-700'">
          Quick Links
        </h4>
        <ul class="space-y-1">
          <li><a href="#" class="hover:underline">Find Services</a></li>
          <li><a href="#" class="hover:underline">Post a Request</a></li>
          <li><a href="#" class="hover:underline">Become a Provider</a></li>
        </ul>
      </div>

      <!-- 社交媒体 -->
      <div>
        <h4 class="text-lg font-semibold mb-3"
            :class="isDark ? 'text-amber-400' : 'text-amber-700'">
          Follow Us
        </h4>
        <div class="flex space-x-4">
          <a href="#" class="hover:underline">Twitter</a>
          <a href="#" class="hover:underline">Facebook</a>
          <a href="#" class="hover:underline">Instagram</a>
        </div>
      </div>
    </div>

    <!-- 版权行 -->
    <p class="text-xs text-center mt-8">
      © {{ year }} AlloMaison. All rights reserved.
    </p>
  </div>
</template>

<style scoped>

</style>