<template>
  <div class="beer-search">
    <div class="beer-search__panel">

      <div class="beer-search__count">
        <strong>Beer entries retrieved: </strong> {{ beerCount }}
      </div>

      <form class=beer-search__form @submit.prevent="validateSearch()">
        <input
          id="beer-search__form_input"
          type="text"
          v-model="state.searchQuery"
          placeholder="Search for beers by name here"
          @focus="disableError"
        />
        <div class="spinner-border text-primary" v-if=state.fetchingData role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <button v-else :disabled="state.disableButton">
          Go!
        </button>
      </form>

      <div class="beer-search__error" v-if="state.error">
        {{ state.errorText }}
      </div>

    </div>
  </div>

  <BeerDisplayList :beers=state.beers />
</template>

<script>
  import { useAuthStore } from '@/store/auth'
  import BeerRequests from './../api/beer_api_requests'
  import BeerDisplayList from './BeerDisplayList'
  import { computed, reactive } from 'vue'
  import { storeToRefs } from 'pinia'
  export default {
    name: 'BeerSearchPanel',
    components: { BeerDisplayList },
    setup() {
      const state = reactive({
        entries: 0,
        searchQuery: '',
        disableButton: false,
        error: false,
        errorText: '',
        beers: [],
        fetchingData: false
      })
      // Get number of beers for display in the search box
      const beerCount = computed(() => state.beers.length)

      const authStore = useAuthStore()
      /**
       * Set up a listener for auth changes. If a user logs in after trying to perform a search we
       * can proceed with the search with the term provided.
       */
      authStore.$subscribe((mutation, state) => {
        if (state.isAuthenticated === true) {
          sendSearchRequest()
        }
      })
      const { isAuthenticated } = storeToRefs(authStore)
      /**
       * Perform a search for a beer based on input. Disable searching and send the request to the
       * server to get the results and set the beers state once the call comes back successfully.
       * The child component will get the list through props so the UI can be populated.
       * Alternatively put an error message up if there was a problem.
       */
      const sendSearchRequest = async () => {
        if (state.searchQuery.length > 0) {
          try {
            const authStore = useAuthStore()
            state.disableButton = true
            state.fetchingData = true
            state.beers = await BeerRequests.getBeer(authStore?.user?.email, state.searchQuery)
          } catch (err) {
            state.error = true
            const message = `Could not send search request. Reason: ${err.response?.data?.toString()}`
            console.error(message)
            state.errorText = message
          }
          state.disableButton = false
          state.fetchingData = false
          state.searchQuery = ''
        }
      }

      /**
       * Perform validation on the page before sending the search.
       *
       * - Make sure that there is a term provided for the search
       * - Make sure that the user is logged in and pop the login modal if they aren't
       */
      const validateSearch = () => {
        if (state.searchQuery.length === 0) {
          // If a search is requested, but no input is provided show an error
          state.error = true
          const message = 'Search cannot be blank'
          console.error(message)
          state.errorText = message
        } else if (!isAuthenticated.value) {
          // If user is not logged in pop the login modal
          authStore.showLoginModal()
        } else {
          sendSearchRequest()
        }
      }

      /**
       * This function will disable any error states on the page.
       */
      const disableError = () => {
        state.error = false
      }

      return {
        state,
        beerCount,
        validateSearch,
        disableError
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../styles/base.scss";
  .beer-search {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 50px;

    .beer-search__panel {
      padding: 20px;
      background-color: white;
      border-radius: 5px;
      border: 1px solid #DFE3E8;
      margin: 1em auto 1em auto;

      .beer-search__error {
        color: red;
      }

      input {
        width: 350px;
        margin: 20px auto;
        padding: 10px 45px;
        background: white url("@/assets/search-svgrepo-com.svg") no-repeat 15px center;
        background-size: 15px 15px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      }

      button {
        width: 60px;
        margin: 20px 20px;
        font-size: 16px;
        color: white;
        background-color: $primary-colour;
        border: none;
        border-radius: 5px;
        padding: 10px 15px;
      }
    }
  }
</style>
