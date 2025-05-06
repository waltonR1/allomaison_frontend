<script setup lang="ts">
import { ref, onMounted } from 'vue'

import HeroSection    from '@/components/HeroSection.vue'
import CategoryGrid   from '@/components/CategoryGrid.vue'
import LatestRequests from '@/components/LatestRequests.vue'
import TopProviders   from '@/components/TopProviders.vue'

const showPage = ref(false)
onMounted(() => setTimeout(() => (showPage.value = true), 100))

</script>

<template>
    <HeroSection />
    <CategoryGrid :show-page="showPage" />
    <LatestRequests :show-page="showPage" />
    <TopProviders :show-page="showPage" />
</template>

<style scoped>
</style>