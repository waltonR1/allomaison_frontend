import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme.ts'

/**
 * 提供表单输入框和按钮的 Tailwind 样式。
 *
 * 用法：
 * const { inputClass, buttonClass } = useFormClasses()
 */
export function useFormClasses () {
  const theme = useThemeStore()
  const { isDark } = storeToRefs(theme)

  /** 输入框样式 */
  const inputClass = computed(() =>
    [
      'w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition',
      isDark.value
        ? 'bg-gray-700 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-amber-400'
        : 'bg-white   border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-amber-400'
    ].join(' ')
  )

  /** 按钮样式 */
  const buttonClass = computed(() =>
    [
      'w-full flex justify-center py-3 px-4 rounded-xl border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition',
      isDark.value
        ? 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400'
        : 'bg-amber-400 hover:bg-amber-500 text-white focus:ring-amber-400'
    ].join(' ')
  )

  return { inputClass, buttonClass }
}
