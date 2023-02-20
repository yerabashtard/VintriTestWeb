<template>
  <div id="app">
    <LoginModal />
    <nav>
      <div class="navigation__logo">
        Better Beer Bureau
      </div>
      <div class="navigation__user">
        <div v-if=isAuthenticated class="navigation__authenticated">
          {{ user.email }}
          <button class="btn btn-primary" @click="authStore.logout()" >
            logout
          </button>
        </div>
        <div v-else >
          <button class="btn btn-primary" @click="authStore.showLoginModal()">
            Login
          </button>
        </div>
      </div>
    </nav>
    <BeerSearchPanel />
  </div>
</template>

<script>
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from '@/store/auth'
  import BeerSearchPanel from '@/components/BeerSearchPanel'
  import LoginModal from '@/components/LoginModal.vue'

  export default {
    name: 'App',
    components: { BeerSearchPanel, LoginModal },
    setup() {
      const authStore = useAuthStore()
      const { isAuthenticated, user } = storeToRefs(authStore)
      return {
        user,
        isAuthenticated,
        authStore
      }
    }
  }
</script>

<style lang="scss">
  @import "./styles/base.scss";
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100vh;
    background-color: #F3F5FA;

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 5%;
      background-color: $primary-colour;
      color: white;

      .navigation__logo {
        font-weight: bold;
        font-size: 24px;
      }

      .navigation__user {
        font-weight: bold;

        button {
          color: white;
        }
      }
    }
  }
</style>
