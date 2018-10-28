<template lang="html">
  <header>
    <h1 class="title">{{title}}</h1>
    <span class="subtitle">{{subtitle}}</span>
  </header>
</template>

<script>
export default {
  props: ['title', 'subtitle']
}
</script>

<style lang="scss">
header {
  margin-bottom: 15px;

  .title {
    margin: 0;
  }
}
</style>
