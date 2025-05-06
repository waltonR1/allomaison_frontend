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

  /**
   * 选择框样式（根据当前选中的值动态变色）
   * @param value 当前 select 绑定的值，如 form.gender
   */
  const noPlaceholderInputClass = (value: string) =>
    [
      'w-full px-4 py-3 rounded-xl border focus:ring-2 focus:outline-none transition',
      isDark.value
        ? 'bg-gray-700 border-gray-700 focus:ring-amber-400'
        : 'bg-white border-gray-300 focus:ring-amber-400',
      value === '' ? (isDark.value ? 'text-gray-400' : 'text-gray-500')  : (isDark.value ? 'text-gray-100' : 'text-gray-900')
    ].join(' ')


  /** 按钮样式 */
  const buttonClass = computed(() =>
    [
      'w-full flex justify-center py-3 px-4 rounded-xl border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition',
      isDark.value
        ? 'bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400'
        : 'bg-amber-400 hover:bg-amber-500 text-white focus:ring-amber-400'
    ].join(' ')
  )

  /** 文件上传样式 */
  const fileInputClass = computed(() =>
    [
      'block w-full text-sm text-gray-500 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm  file:text-white',
      isDark.value
        ? 'bg-gray-700 text-gray-100 file:bg-amber-500 hover:file:bg-amber-600'
        : 'bg-white text-gray-900 file:bg-amber-400 hover:file:bg-amber-500'
    ].join(' ')
  )


  return { inputClass, noPlaceholderInputClass, buttonClass, fileInputClass }
}
