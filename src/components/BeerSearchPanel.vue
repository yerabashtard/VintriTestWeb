<template>
  <div class="beer-search">
    <div class="beer-search__panel">

      <div class="beer-search__count">
        <strong>Beer entries retrieved: </strong> {{ beerCount }}
      </div>

      <form class=beer-search__form @submit.prevent="sendSearchRequest(email)">
        <input
          id="beer-search__form_input"
          type="text"
          v-model="state.searchQuery"
          placeholder="Search for beers by name here"
          @focus="disableError"
        />
        <button :disabled="state.disableButton">
          Go!
        </button>
      </form>

      <div class="error" v-if="state.error">
        There was a problem obtaining the requested data. Please try again...
      </div>

    </div>
  </div>

  <BeerDisplayList :beers=state.beers :email="email" />
</template>

<script>
  import BeerRequests from './../api/beer_api_requests'
  import BeerDisplayList from './BeerDisplayList'
  import { computed, reactive } from 'vue'
  export default {
    name: 'BeerSearchPanel',
    props: {
      email: {
        type: String,
        required: true
      }
    },
    components: { BeerDisplayList },
    setup() {
      const state = reactive({
        entries: 0,
        searchQuery: '',
        disableButton: false,
        error: false,
        beers: []
      })
      // Get number of beers for display in the search box
      const beerCount = computed(() => state.beers.length)

      /**
       * The user has requested a search for a beer. Disable searching and send the request to the
       * server to get the results and set the beers state once the call comes back successfully.
       * The child component will get the list through props so the UI can be populated.
       * Alternatively put an error message up if there was a problem.
       *
       * @param email - Email address of the user making the request
       */
      const sendSearchRequest = async (email) => {
        if (state.searchQuery.length > 0) {
          state.disableButton = true
          try {
            state.beers = await BeerRequests.getBeer(email, state.searchQuery)
          } catch (err) {
            console.error(`Could not send search request. Reason: ${err.response?.data?.toString()}`)
            state.error = true
          }
          state.disableButton = false
          state.searchQuery = ''
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
        sendSearchRequest,
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

      .error {
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
