<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'

import { fetchProviderApplications, reviewProviderApplication } from '@/api/withTokenAPI'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useAdminStore } from '@/stores/adminStore.ts'
import type { AdminProviderApplication } from '@/types/types.ts'



const theme = useThemeStore()
const adminStore = useAdminStore()
const { isDark } = storeToRefs(theme)
const {isLoggedIn} = storeToRefs(adminStore)

const providerApplications = ref<AdminProviderApplication[]>([])
const loadingProvider = ref<boolean>(false)
const reviewingId = ref<number | null>(null)

const showCertModal = ref(false)
const currentCertImages = ref<string[]>([])

const handleViewCertificates = (certs: string[]) => {
  currentCertImages.value = certs
  showCertModal.value = true
}

const loadProviderApplications = async (): Promise<void> => {
  loadingProvider.value = true
  try {
    providerApplications.value = await fetchProviderApplications() as AdminProviderApplication[]
  } finally {
    loadingProvider.value = false
  }
}

const handleReview = async (applicationId: number, status: string): Promise<void> => {
  reviewingId.value = applicationId
  await reviewProviderApplication(applicationId, status)
  await loadProviderApplications()
  reviewingId.value = null
}

onMounted(() => {
  if (!isLoggedIn.value) {
    router.replace('/')
  }
  loadProviderApplications()
})
</script>

<template>
  <main class="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div :class="[isDark ? 'bg-gray-800' : 'bg-white','w-full max-w-6xl shadow-xl rounded-2xl p-8 space-y-6 transition duration-500']">
      <h1 class="text-3xl font-bold text-center">Provider Applications</h1>

      <div v-if="loadingProvider" class="text-center text-gray-500">
        Loading...
      </div>

      <div v-else>
        <table class="w-full text-sm table-auto border-collapse">
          <thead>
          <tr :class="isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'">
            <th class="p-3 text-left">ID</th>
            <th class="p-3 text-left">UserId</th>
            <th class="p-3 text-left">City</th>
            <th class="p-3 text-left">Category</th>
            <th class="p-3 text-left">Experiences</th>
            <th class="p-3 text-left">Certifications</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Operate</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in providerApplications" :key="item.applicationId" :class="[isDark ? 'border-gray-600 hover:bg-gray-700': 'hover:bg-gray-50','border-b']">
            <td class="p-3">{{ item.applicationId }}</td>
            <td class="p-3">{{ item.customerId }}</td>
            <td class="p-3">{{ item.city }}</td>
            <td class="p-3">{{ item.categories }}</td>
            <td class="p-3">{{ item.experiences }}</td>
            <td class="p-3">
              <button @click="handleViewCertificates(item.certifications)" class="w-40 h-10 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded shadow">
                Check Certification
              </button>
            </td>
            <td class="p-3">
                <span :class="[{'text-yellow-600': item.status === 'PENDING','text-green-600': item.status === 'approved','text-red-600': item.status === 'rejected'},'font-semibold capitalize']">
                  {{ item.status }}
                </span>
            </td>
            <td class="p-3 space-x-2">
              <template v-if="item.status === 'PENDING'">
                <button @click="handleReview(item.applicationId, 'approve')" :disabled="reviewingId === item.applicationId" class="px-3 py-1 w-20 bg-green-500 hover:bg-green-600 text-white rounded shadow disabled:opacity-50">
                  {{ reviewingId === item.applicationId ? 'Processing…' : 'Approve' }}
                </button>
                <button @click="handleReview(item.applicationId, 'reject')" :disabled="reviewingId === item.applicationId" class="mt-3 px-3 py-1 w-20 bg-red-500 hover:bg-red-600 text-white rounded shadow disabled:opacity-50">
                  Reject
                </button>
              </template>
              <template v-else>
                <span class="text-gray-400 italic">processed</span>
              </template>
            </td>
          </tr>
          </tbody>
        </table>

        <div v-if="providerApplications.length === 0" class="text-center text-gray-400 mt-6">
          No applications found.
        </div>
      </div>
    </div>
  </main>

  <teleport to="body">
    <div v-if="showCertModal" class="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center">
      <div :class="[isDark ? 'bg-gray-900 border border-amber-50' : 'bg-white', 'p-6 rounded-2xl shadow-lg w-96']">
        <h2 :class="[isDark ? 'text-white' : 'text-gray-800', 'text-xl font-bold mb-4']">Certifications</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <img v-for="(img, index) in currentCertImages" :key="index" :src="img.fileUrl" class="max-w-full max-h-80 object-contain border rounded" alt="certificate" />
        </div>
        <div class="text-center mt-4">
          <button @click="showCertModal = false" class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800">
            Close
          </button>
        </div>
      </div>
    </div>
  </teleport>


</template>


<style scoped>
</style>