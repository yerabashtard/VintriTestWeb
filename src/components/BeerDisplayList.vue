<template>
  <div class="beer-display-list__wrapper">
    <BeerItem :email="email"
      v-for="beer in beers"
      :key="beer.id"
      :id="beer.id"
      :name="beer.name"
      :description="beer.description"
      :first_brewed="beer.first_brewed"
      :food_pairing="beer.food_pairing"
      />
  </div>
</template>

<script>
  import BeerItem from './BeerItem'
  export default {
    name: 'BeerDisplayList',
    components: { BeerItem },
    props: {
      email: {
        type: String,
        required: true
      },
      beers: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .beer-display-list__wrapper {
    display: grid;
    grid-gap: 10px;
    margin-bottom: auto;
  }
</style>
