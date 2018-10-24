<template>
  <div id="app">
    <div class="container">
      <pageheader></pageheader>
      <uploadedimage></uploadedimage>
      <imagemeta></imagemeta>
    </div>
  </div>
</template>

<script>
import Pageheader from './components/Pageheader.vue'
import Imagemeta from './components/Imagemeta.vue'
import Uploadedimage from './components/Uploadedimage.vue'

export default {
  name: 'app',
  components: {
    Pageheader,
    Imagemeta,
    Uploadedimage
  }
}
</script>

<style lang="scss">
@import url('https://unpkg.com/leaflet@1.3.4/dist/leaflet.css');
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');
@import "./assets/scss/settings.scss";

body {
  margin: 0;
  font-family: 'Roboto Mono', sans-serif;
  background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
  margin: 0;
  color: $black;

  .container {
    background: #fff;
    width: 590px;
    margin: 0 auto;
    padding: 20px 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: height 0.5s;
  }
}
</style>
