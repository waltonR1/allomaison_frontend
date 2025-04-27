<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'

import HeaderBar      from '@/components/HeaderBar.vue'
import HeroSection    from '@/components/HeroSection.vue'
import CategoryGrid   from '@/components/CategoryGrid.vue'
import LatestRequests from '@/components/LatestRequests.vue'
import TopProviders   from '@/components/TopProviders.vue'
import FooterBar      from '@/components/FooterBar.vue'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

const showPage = ref(false)
onMounted(() => setTimeout(() => (showPage.value = true), 100))

</script>

<template>
  <div :class="[isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800','min-h-screen flex flex-col transition-colors duration-500']">

    <HeaderBar />
    <HeroSection />
    <CategoryGrid :show-page="showPage" />
    <LatestRequests :show-page="showPage" />
    <TopProviders :show-page="showPage" />
    <FooterBar />
  </div>
</template>



<style scoped>

</style>