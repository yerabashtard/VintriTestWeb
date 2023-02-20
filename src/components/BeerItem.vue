<template>
  <div class="beer-item">

    <div class="beer-item__content_wrapper">

      <div class="beer-item__name_label">
        <label class="beer-item__name">Name:</label>
        <span id=beer-item__name_text>{{ name }}</span>
      </div>
      <div class="beer-item__description">
        <label class="beer-item__description_label">Description:</label>
        <span id=beer-item__description_text>{{ description }}</span>
      </div>
      <div class="beer-item__first_brewed">
        <label class="beer-item__first_brewed_label">First Brewed:</label>
        <span id=beer-item__first_brewed_text>{{ first_brewed }}</span>
      </div>
      <div class="beer-item__food_pairing">
        <label class="beer-item__food_pairing_label">Food Pairings:</label>
        <span id=beer-item__food_pairing_text>{{ food_pairing }}</span>
      </div>

    </div>

    <div class="beer-item__rating_container">

      <form class="beer-item__form" @submit.prevent>

        <label class="beer-item__select_label" for="beer-item__select">How would you rate this beer?</label>
        <div class="beer-item__select" id="beer-item__select">
          <label for="one">1</label>
          <input type="radio" id="one" value="1" v-model.number="state.selected" @focus="resetState" />
          <label for="two">2</label>
          <input type="radio" id="two" value="2" v-model.number="state.selected" @focus="resetState" />
          <label for="three">3</label>
          <input type="radio" id="three" value="3" v-model.number="state.selected" @focus="resetState" />
          <label for="four">4</label>
          <input type="radio" id="four" value="4" v-model.number="state.selected" @focus="resetState" />
          <label for="five">5</label>
          <input type="radio" id="five" value="5" v-model.number="state.selected" @focus="resetState" />
        </div>

        <label class="beer-item__comments_label" for="beer-item__textarea">Add a comment here:</label>
        <div class="beer-item__comments">
          <textarea id="beer-item__textarea" v-model="state.comments" @focus="resetState" />
        </div>

        <button
          @click="createRating(id, state.comments, state.selected)"
          :disabled="state.disableButton"
        >
          Submit Rating
        </button>

      </form>

    </div>

    <div class="beer-item__error" v-if="state.error">
      There was a problem creating a rating for this beer. Please try again later...
    </div>

    <div class="beer-item__success" v-if="state.success">
      Thank you for rating {{ name }}
    </div>
  </div>
</template>

<script>
  import { useAuthStore } from '@/store/auth'
  import BeerRequests from './../api/beer_api_requests'
  import { reactive } from 'vue'
  export default {
    name: 'BeerItem',
    props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      first_brewed: {
        type: String,
        required: true
      },
      food_pairing: {
        type: Array,
        required: false
      }
    },
    setup() {
      const state = reactive({
        selected: 5,
        comments: '',
        disableButton: false,
        error: false,
        success: false
      })

      /**
       * Send this rating to the Beer Server to be saved.
       *
       * @param id - Id of the beer being rated
       * @param comments - Optional parameter for any comments that should be added to the rating
       * @param rating - Rating given. Must be a number between 1 and 5 inclusive
       * @returns {Promise<void>}
       */
      const createRating = async (id, comments, rating) => {
        // Prevent double clicks and duplicate requests
        state.disableButton = true
        const body = { rating: rating, comments: comments }
        try {
          const authStore = useAuthStore()
          await BeerRequests.createRating(authStore?.user?.email, id, body)
        } catch (err) {
          console.error(`Could not send ratings request. Reason: ${err.response?.data?.toString()}`)
          state.error = true
        }
        // Add UI element to let user know action was successful
        state.success = true
        // Reset state now that the call has been successful
        state.selected = 5
        state.comments = ''
        state.disableButton = false
      }

      /**
       * This function will disable any error or success states on the page.
       */
      const resetState = () => {
        state.error = false
        state.success = false
      }

      return {
        state,
        createRating,
        resetState
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../styles/base.scss";
  .beer-item {
    padding: $beer-item-padding;
    margin: $beer-item-margin;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #DFE3E8;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.25s ease;

    .beer-item__content_wrapper {
      label {
        margin-right: 1em;
        font-weight: bold;
      }
    }

    .beer-item__rating_container {
      margin-top: 1.5em;
      margin-left: auto;
      margin-right: auto;

      .beer-item__select_label {
        font-weight: bold;
        font-size: 1em;
      }

      .beer-item__select {
        margin-top: 0.2em;
        margin-bottom: 1em;
        label {
          margin-right: 0.1em;
        }
        input {
          margin-right: 2em;
        }
      }

      .beer-item__comments {
        textArea {
          width: 60em;
          height: 3em;
        }
      }

      button {
        width: inherit;
        font-size: 16px;
        color: white;
        background-color: $primary-colour;
        border: none;
        border-radius: 5px;
        padding: 10px 15px;
      }
    }

    .beer-item__error {
      margin-top: 1em;
      color: red;
    }

    .beer-item__success {
      margin-top: 1em;
      color: green;
    }
  }
</style>
