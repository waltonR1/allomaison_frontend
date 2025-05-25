<script setup lang="ts">
import { reactive, ref, toRaw, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'

import { useProviderInfoStore } from '@/stores/providerInfoStore.ts'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import { updateProviderInfo } from '@/api/withTokenAPI.ts'
import { useCityStore } from '@/stores/cityStore.ts'
import { useCategoriesStore } from '@/stores/categoriesStore.ts'
import type { ProviderInfo } from '@/types/types'


const themeStore = useThemeStore()
const userStore = useUserStore()
const providerInfoStore = useProviderInfoStore()
const categoriesStore = useCategoriesStore()
const cityStore = useCityStore()

const { isDark } = storeToRefs(themeStore)
const { userId, isLoggedIn } = storeToRefs(userStore)
const providerInfo = storeToRefs(providerInfoStore)


const isEditing = ref(false)
const form = reactive<Partial<ProviderInfo>>({})

// 数组字段需要特别处理
const arrayFields: Array<'servicesOffered' | 'providerLabels'> = ['servicesOffered', 'providerLabels']

// css 样式
const { inputClass, buttonClass } = useFormClasses()


const startEdit = () => {
  // 基础字段
  Object.assign(form, toRaw(providerInfoStore.$state))
  // 深拷贝数组字段，方便增删
  arrayFields.forEach(key => {
    const val = providerInfoStore[key]
    form[key] = Array.isArray(val) ? [...val] : []
  })
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  Object.keys(form).forEach(k => delete (form as any)[k])
}

const preprocessForm = (): Partial<ProviderInfo> => {
  const processed: Partial<ProviderInfo> = {}
  const basicFields: Array<'category' |'city' | 'description' | 'serviceArea' | 'availabilityTime' | 'priceRange'> = ['category', 'city', 'description', 'serviceArea', 'availabilityTime', 'priceRange']
  basicFields.forEach((key) => {
    const val = form[key]
    if (val !== undefined && val !== null) {
      processed[key] = val
    }
  })
  arrayFields.forEach((key) => {
    const val = form[key]
    if (Array.isArray(val)) {
      processed[key] = val.filter(Boolean)
    }
  })
  return processed
}

const saveEdit = async () => {
  try {
    if (providerInfo.providerId.value) {
      const providerInfoForm = preprocessForm()
      const res = await updateProviderInfo(Number(providerInfo.providerId.value), providerInfoForm)
      if (res.status === 200) {
        providerInfoStore.$patch(providerInfoForm)
        cancelEdit()
      } else {
        console.warn('error while saving provider info')
      }
    }
  } catch (error) {
    console.error('Update failed', error)
  }
}

onMounted(async () => {
  await Promise.all([
    categoriesStore.fetchCategories(),
    cityStore.fetchCities(),
    providerInfoStore.fetchProviderInfo(Number(userId.value)),
  ])
  if (!isLoggedIn.value) await router.replace('/')
})
</script>

<template>
  <main class="py-12 px-4">
    <div class="max-w-4xl mx-auto select-none">
      <div :class="[isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800', 'rounded-3xl shadow-xl overflow-hidden transition-colors duration-500']">

        <div :class="[isDark ? 'bg-amber-500' : 'bg-amber-400', 'px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4']">
          <div>
            <h1 class="text-3xl font-bold tracking-tight">{{ providerInfo.providerName.value }}</h1>
            <p :class="isDark ? 'text-gray-200' : 'text-gray-100'">Provider ID: {{ providerInfo.providerId.value }}</p>
          </div>
          <span class="text-black inline-flex items-center px-3 py-1 rounded-full text-xl font-medium bg-white bg-opacity-20 backdrop-blur-sm">
            {{ providerInfo.category.value || '—' }}
          </span>
        </div>

        <div class="p-8 space-y-10">
          <section>
            <h2 class="text-xl font-semibold mb-2">Description</h2>
            <template v-if="isEditing">
              <textarea v-model="(form as any).description" rows="3" :class="[inputClass, 'w-full text-lg']" />
            </template>
            <p v-else class="leading-relaxed text-lg whitespace-pre-line">{{ providerInfo.description.value || '—' }}</p>
          </section>


          <section>
            <h2 class="text-xl font-semibold mb-2">Services Offered</h2>

            <template v-if="isEditing">
              <div class="space-y-2">
                <div v-for="(_, idx) in (form.servicesOffered as string[])" :key="idx" class="flex gap-2 items-center">
                  <input v-model="(form.servicesOffered as string[])[idx]" :class="[inputClass, 'flex-1']" placeholder="Service name" />
                  <button type="button" @click="(form.servicesOffered as string[]).splice(idx,1)" class="text-red-500 text-sm">Remove</button>
                </div>
                <button type="button" @click="(form.servicesOffered as string[]).push('')" class="text-sm text-amber-600">+ Add service</button>
              </div>
            </template>

            <div v-else class="flex flex-wrap gap-2">
              <span v-for="service in providerInfo.servicesOffered.value" :key="service" class="px-3 py-1 rounded-full text-sm font-medium" :class="isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'">
                {{ service }}
              </span>
              <span v-if="!(providerInfo.servicesOffered.value?.length)" class="text-gray-500">—</span>
            </div>
          </section>


          <section>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-1">City</label>
                <template v-if="isEditing">
                  <select v-model="form.city" :class="[inputClass, 'w-full text-lg']">
                    <option disabled value="" hidden>Select City</option>
                    <option v-for="city in cityStore.cities" :key="city.zipcode">{{ city.city }}</option>
                  </select>
                </template>
                <p v-else>{{ providerInfo.city.value || '—' }}</p>
              </div>


              <div>
                <label class="block text-sm font-medium mb-1">Service Area</label>
                <template v-if="isEditing">
                  <input v-model="form.serviceArea" :class="[inputClass, 'w-full text-lg']" placeholder="Example: Paris + 10km" />
                </template>
                <p v-else>{{ providerInfo.serviceArea.value || '—' }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Availability</label>
                <template v-if="isEditing">
                  <input v-model="form.availabilityTime" :class="[inputClass, 'w-full text-lg']" placeholder="Example: Mon–Fri: 08:00–19:00" />
                </template>
                <p v-else>{{ providerInfo.availabilityTime.value || '—' }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Price Range</label>
                <template v-if="isEditing">
                  <input v-model="form.priceRange" :class="[inputClass, 'w-full text-lg']" placeholder="Example €20–€30/hour" />
                </template>
                <p v-else>{{ providerInfo.priceRange.value || '—' }}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-2">Qualifications</h2>

            <template v-if="isEditing">
              <div class="space-y-2">
                <div v-for="(_, idx) in (form.providerLabels as string[])" :key="idx" class="flex gap-2 items-center">
                  <input v-model="(form.providerLabels as string[])[idx]" :class="[inputClass, 'flex-1']" placeholder="Qualification" />
                  <button type="button" @click="(form.providerLabels as string[]).splice(idx,1)" class="text-red-500 text-sm">Remove</button>
                </div>
                <button type="button" @click="(form.providerLabels as string[]).push('')" class="text-sm text-amber-600">+ Add label</button>
              </div>
            </template>

            <div v-else class="flex flex-wrap gap-2">
              <span v-for="label in providerInfo.providerLabels.value" :key="label" class="px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-blue-100 text-blue-800">{{ label }}</span>
              <span v-if="!(providerInfo.providerLabels.value?.length)" class="text-gray-500">—</span>
            </div>
          </section>


          <div class="flex justify-end gap-4 pt-4">
            <button v-if="!isEditing" type="button" @click="startEdit" :class="[buttonClass, 'text-base']">Edit Profile</button>
            <template v-else>
              <button type="button" @click="cancelEdit" :class="[isDark ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 border-gray-300', 'px-5 py-2 rounded-xl border']">Cancel</button>
              <button type="button" @click="saveEdit" :class="[isDark ? 'bg-amber-500 hover:bg-amber-600' : 'bg-amber-400 hover:bg-amber-500', 'text-white px-5 py-2 rounded-xl shadow focus:ring-2 focus:ring-offset-2 focus:ring-amber-400']">Save</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
