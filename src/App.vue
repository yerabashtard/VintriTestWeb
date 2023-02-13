<template>
  <div id="app">
    <nav>
      <div class="navigation__logo">
        Better Beer Bureau
      </div>
      <div class="navigation__user">
        {{ state.user.email }}
      </div>
    </nav>
    <BeerSearchPanel :email="state.user.email" />
  </div>
</template>

<script>
  import { reactive } from 'vue'
  import BeerSearchPanel from './components/BeerSearchPanel'
  export default {
    name: 'App',
    components: { BeerSearchPanel },
    setup() {
      const state = reactive({
        user: {
          email: 'testuser@testing.com'
        }
      })

      return {
        state
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
      }
    }
  }
</style>
