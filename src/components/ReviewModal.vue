<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/themeStore.ts'
import { useFormClasses } from '@/utils/useFormClasses.ts'

const props = defineProps<{
  showReviewModal: boolean,
  selectedOrderId: number
}>()

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'submitReview', payload: { orderId: number, text: string, rating: number }): void
}>()

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)
const { inputClass } = useFormClasses()

const reviewText = ref('')
const rating = ref(0)
const hoverRating = ref(0)

const setRating = (i: number) => {
  rating.value = hoverRating.value || i
}

const handleHover = (i: number, e: MouseEvent) => {
  const { offsetX, target } = e
  const el = target as HTMLElement
  const ratio = offsetX / el.offsetWidth
  hoverRating.value = i - (ratio < 0.5 ? 0.5 : 0)
}

const getStarWidth = (i: number) => {
  const active = hoverRating.value || rating.value
  if (i <= active) return '100%'
  if (i - 0.5 === active) return '50%'
  return '0%'
}

watch(() => props.showReviewModal, (val) => {
  if (!val) {
    reviewText.value = ''
    rating.value = 0
  }
})

const cancel = () => {
  reviewText.value = ''
  emit('close')
}

const submit = () => {
  if (!reviewText.value.trim()) return
  emit('submitReview', {
    orderId: props.selectedOrderId,
    text: reviewText.value.trim(),
    rating: rating.value
  })
  reviewText.value = ''
  rating.value = 0
}
</script>

<template>
  <teleport to="body">
    <div v-if="showReviewModal" class="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-30">
      <div :class="[isDark ? 'bg-gray-900 border border-amber-50' : 'bg-white', 'p-6 rounded-2xl shadow-lg w-96']">
        <h2 :class="[isDark ? 'text-white' : 'text-gray-800', 'text-xl font-bold mb-4']">Leave a Review</h2>
        <textarea v-model="reviewText" rows="5" placeholder="Write your review..." :class="[inputClass]" />

        <div class="flex items-center space-x-1 cursor-pointer select-none">
          <span v-for="i in 5" :key="i" class="relative text-2xl" @click="setRating(i)" @mousemove="handleHover(i, $event)" @mouseleave="hoverRating = 0">
            <span class="absolute top-0 left-0 overflow-hidden" :style="{ width: getStarWidth(i) }" :class="isDark ? 'text-amber-400' : 'text-yellow-500'">★</span>
            <span class="text-gray-300">★</span>
          </span>
          <span class="text-sm ml-2 text-gray-500">{{ rating.toFixed(1) }}/5</span>
        </div>

        <div class="flex justify-end mt-4 space-x-2">
          <button @click="cancel" class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800">
            Cancel
          </button>
          <button @click="submit" class="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white">
            Submit
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>

</style>