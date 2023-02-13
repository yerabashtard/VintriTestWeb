<template>
  <div class="rating__modal">
    <div class="rating">
      id: {{ id }} name: {{ name }}

      <div class="rating__footer">
        <button>Close</button>
        <button>Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RatingModal.vue',
    props: {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .rating {
    width: 300px;
    height: 100px;
    border-radius: 10px;
    background-color: white;
    padding: 20px 20px;
    z-index: 1200;
    &__modal {
      background-color: rgba(0,0,0,0.4);
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      position: absolute;
    }
  }
</style>
