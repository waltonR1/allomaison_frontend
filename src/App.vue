<script setup lang="ts">
import MainLayout from '@/views/MainLayout.vue'
import { useUserStore } from '@/stores/userStore.ts'
import { useAdminStore} from '@/stores/adminStore.ts'

const userStore = useUserStore();
const adminStore = useAdminStore();
userStore.checkExpired();
adminStore.checkExpired();
</script>

<template>
  <MainLayout />
</template>

<style scoped>

</style>
