<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { reactive, ref, watch, toRaw, onMounted } from 'vue'
import { useThemeStore } from '@/stores/themeStore.ts'
import { type UserInfo, useUserInfoStore } from '@/stores/useInfoStore.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'
import axios from 'axios'
import { urls } from '@/utils/urls.ts'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

const userInfoStore = useUserInfoStore()
const userInfo = storeToRefs(userInfoStore)

onMounted(() =>{
  userInfoStore.fetchUserInfo()
})

const userStore = useUserStore()

const { inputClass, buttonClass, noPlaceholderInputClass } = useFormClasses()

const showImage = ref(true)
const isEditing = ref(false)

// ==== Avatar upload logic ====
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || !files.length) return
  const file = files[0]
  const formData = new FormData()
  formData.append('avatar', file)

  try {
    const res = await axios.post(urls.uploadAvatar, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (res.status === 200) {
      // Assume API returns the new avatar URL in res.data.avatarUrl
      const newUrl = res.data.avatarUrl
      userInfoStore.$patch({ avatarUrl: newUrl })
      userStore.$patch({ avatarUrl: newUrl })
      showImage.value = true
    } else {
      console.warn('error while uploading avatar')
    }
  } catch (error) {
    console.error('Upload failed', error)
  }
}
// ==================================

const form = reactive<Partial<UserInfo>>({})

const handleImgError = () => {
  showImage.value = false
}
watch(() => userInfo.avatarUrl?.value, () => {
  showImage.value = true
})

const startEdit = () => {
  Object.assign(form, toRaw(userInfoStore.$state))
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  Object.keys(form).forEach(k => delete form[k as keyof UserInfo])
}

const saveEdit = async () => {
  try {
    const res = await axios.put(urls.updateUserInfo, form,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });
    if (res.status === 200) {
      userInfoStore.$patch({ ...form })
      userStore.$patch({
        username: form.username
      })

      cancelEdit()
    } else {
      console.warn('error while saving user info')
    }
  } catch (error) {
    console.error('Update failed', error)
  }
}

const READONLY_FIELDS: Array<keyof UserInfo> = ['first_name', 'last_name', 'gender','birthday'];
const isReadOnly = (key: keyof UserInfo) => READONLY_FIELDS.includes(key as any);

const fields: { label: string; key: keyof UserInfo; type?: string }[] = [
  { label: 'First name', key: 'first_name' },
  { label: 'Last name', key: 'last_name' },
  { label: 'Gender', key: 'gender' },
  { label: 'Birthday', key: 'birthday', type: 'date' },
  { label:'Username', key:'username'},
  { label: 'Email', key: 'email', type: 'email' },
  { label: 'Phone', key: 'phone', type: 'tel' },
  { label: 'Address', key: 'address' },
  { label: 'City', key: 'city' },
  { label: 'Country', key: 'country' },
  { label: 'Zip code', key: 'zipCode' },
]

</script>

<template>
  <main class="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div :class="[isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900', 'p-8 rounded-3xl shadow-2xl transition duration-300 space-y-8']">

      <div class="flex flex-col items-center space-y-4">
        <div class="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-amber-400 shadow cursor-pointer hover:shadow-xl hover:bg-gray-300 hover:scale-110 transition" @click="triggerFileInput">
          <img v-if="showImage && userInfo.avatarUrl?.value" :src="userInfo.avatarUrl?.value" @error="handleImgError" alt="avatar" class="w-full h-full object-cover" />
          <svg v-else class="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>

          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
        </div>

        <h2 class="text-3xl font-bold">{{ userInfo.username.value }}</h2>
        <p :class="[isDark ? 'text-gray-500' : 'text-gray-400','text-sm']">
          Last login: {{ new Date(userInfo.lastLogin?.value ?? '').toLocaleString() }}
        </p>
        <button type="button" v-if="!isEditing" @click="startEdit" :class="buttonClass">
          Edit profile
        </button>
      </div>


      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div v-for="field in fields" :key="field.key">
          <label class="block text-sm font-medium mb-1">{{ field.label }}</label>

          <template v-if="isEditing && !isReadOnly(field.key)">
            <select v-if="field.key === 'gender'" v-model="form.gender" :class="noPlaceholderInputClass(form.gender ?? '')" :disabled="isReadOnly(field.key)">
              <option disabled value="" hidden >Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input v-else :type="field.type || 'text'" v-model="form[field.key]" :placeholder="field.label" :class="[inputClass,'text-lg']" :disabled="isReadOnly(field.key)" />
          </template>

          <p v-else :class="[isDark ? 'text-gray-500' : 'text-gray-400','text-lg']">
            {{ userInfo[field.key]?.value || '—' }}
          </p>
        </div>
      </div>

      <div v-if="isEditing" class="flex justify-end space-x-4 pt-4">
        <button type="button" @click="cancelEdit" class="px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">
          Cancel
        </button>
        <button type="button" @click="saveEdit" class="px-5 py-2 rounded-xl text-white bg-amber-500 hover:bg-amber-600 focus:ring-2 focus:ring-offset-2 focus:ring-amber-400">
          Save
        </button>
      </div>
    </div>
  </main>
</template>

<style>

</style>