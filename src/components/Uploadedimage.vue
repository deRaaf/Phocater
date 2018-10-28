<template lang="html">
  <div class="img-wrapper">
    <img ref="image" id="img-uploaded" :src="image" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: ""
    }
  },
  created() {
    this.$eventBus.$on('send-data', (data) => {
      this.image = data
    });
  }
}
</script>

<style lang="scss">
.img-wrapper {

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
