import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

const EMAIL = 'email'
const IS_AUTHENTICATED = 'isAuthenticated'
export const useAuthStore = defineStore("auth", {

  state: () => ({
    isAuthenticated: useStorage(IS_AUTHENTICATED, false, sessionStorage),
    user: {
      email: useStorage(EMAIL, '', sessionStorage)
    },
    showModal: false
  }),

  actions: {
    showLoginModal() {
      this.$patch({
        showModal: true
      })
    },

    hideLoginModal() {
      this.$patch({
        showModal: false
      })
    },

    login(email) {
      sessionStorage.setItem(EMAIL, email)
      sessionStorage.setItem(IS_AUTHENTICATED, true)
      this.$patch({
        isAuthenticated: true,
        user: {
          email: email
        }
      })
    },

    logout() {
      sessionStorage.clear()
      this.$reset()
    }
  }

})
