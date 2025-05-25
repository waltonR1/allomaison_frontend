import { createApp, h, ref } from 'vue'
import ModalDialog from '@/components/ModalDialog.vue'

export function useModal() {
  function alert(message: string): Promise<void> {
    return new Promise(resolve => {
      const visible = ref(true)
      const container = document.createElement('div')
      document.body.appendChild(container)
      const app = createApp({
        render() {
          return h(ModalDialog, {
            modelValue: visible.value,
            'onUpdate:modelValue': (v: boolean) => {
              visible.value = v
              if (!v) {
                app.unmount()
                document.body.removeChild(container)
                resolve()
              }
            },
            message,
            mode: 'alert',
            onOk: () => {
              visible.value = false
            }
          })
        }
      })
      app.mount(container)
    })
  }

  function confirm(message: string): Promise<boolean> {
    return new Promise(resolve => {
      const visible = ref(true)
      const container = document.createElement('div')
      document.body.appendChild(container)
      const app = createApp({
        render() {
          return h(ModalDialog, {
            modelValue: visible.value,
            'onUpdate:modelValue': (v: boolean) => {
              visible.value = v
              if (!v) {
                app.unmount()
                document.body.removeChild(container)
              }
            },
            message,
            mode: 'confirm',
            onOk: () => {
              visible.value = false
              resolve(true)
            },
            onCancel: () => {
              visible.value = false
              resolve(false)
            }
          })
        }
      })
      app.mount(container)
    })
  }

  return { alert, confirm }
}