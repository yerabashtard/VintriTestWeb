<template>
  <div class="beer-display-list__wrapper">
    <BeerItem
      v-for="beer in beers"
      :key="beer.id"
      :id="beer.id"
      :name="beer.name"
      :description="beer.description"
      :first_brewed="beer.first_brewed"
      :food_pairings="beer.food_pairing"
      :image_url="beer.image_url"
      />
  </div>
</template>

<script>
  import BeerItem from './BeerItem'
  export default {
    name: 'BeerDisplayList',
    components: { BeerItem },
    props: {
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
