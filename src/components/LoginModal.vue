<template>
  <div class="modal" id="login-modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Login</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="submitLoginForm()">
          <div class="modal-body">
            <div class="mb-3">
              <label for="login-form__text-input" class="form-label">Email address</label>
              <input
                  type="email"
                  class="form-control"
                  id="login-form__text-input"
                  v-model="state.email"
                  aria-describedby="login-form__text-id"
              >
              <div class="form-text" id="login-form__text-id">
                Login with your email address to perform searches.
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary">
              Login
            </button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { Modal } from 'bootstrap'
import { reactive } from 'vue'
export default {
  name: 'LoginModal',
  setup() {
    const state = reactive({
      email: null
    })
    const authStore = useAuthStore()

    const submitLoginForm = () => {
      authStore.login(state.email)
      authStore.hideLoginModal()
    }
    return {
      state,
      submitLoginForm
    }
  },
  mounted() {
    const modalDiv = document.getElementById('login-modal')
    const loginModal = new Modal(modalDiv, {})
    const authStore = useAuthStore()
    /**
     * Listen for state changes in auth store to figure out if the modal should display or not
     */
    authStore.$subscribe((mutation, state) => {
      if (state.showModal === true) {
        loginModal.show()
      } else if (state.showModal === false) {
        loginModal.hide()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  #login-modal {
    button {
      color: white;
    }
  }
</style>
