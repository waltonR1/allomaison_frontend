<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  message: String,
  mode: {
    type: String,
    default: 'alert' // 'alert' | 'confirm'
  }
})
const emit = defineEmits(['update:modelValue', 'ok', 'cancel'])

const visible = ref(props.modelValue)
watch(() => props.modelValue, v => visible.value = v)

function onOk() {
  emit('ok')
  emit('update:modelValue', false)
}
function onCancel() {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>

<template>
    <div v-if="visible" class="fixed inset-0 z-50 top-10 flex items-start justify-center bg-opacity-40">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 min-w-[280px] max-w-xs">
        <div class="mb-4 text-lg text-gray-900 dark:text-gray-100">{{ message }}</div>
        <div class="flex justify-end gap-3">
          <button v-if="mode==='confirm'" @click="onCancel" class="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-800">取消</button>
          <button @click="onOk" class="px-4 py-1 rounded bg-amber-500 hover:bg-amber-600 text-white">确定</button>
        </div>
      </div>
    </div>
  </template>

<style scoped>
</style>