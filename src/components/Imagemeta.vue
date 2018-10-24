<template lang="html">
  <div class="img-meta-wrap">
    <div class="upload-wrap">
      <button class="btn">Kies een foto</button>
      <input id="file-input" type="file" />
    </div>
    <div class="img-meta">
      <span class="coords">Coördinaten van de foto zijn: <span id="latLong"></span></span>
      <span class="location-name">Locatie:</span>
    </div>
    <leafletmap></leafletmap>
  </div>
</template>

<script>
import Leafletmap from './Leafletmap.vue'

export default {
  components: {
    Leafletmap
  }
}
</script>

<style lang="scss">
@import "../assets/scss/settings.scss";

.img-meta-wrap {
  padding-top: 15px;

  .upload-wrap  {
  position: relative;
  overflow: hidden;
  width: 170px;
  margin: 0 auto;

    .btn {
      border: 2px solid $black;
      color: $black;
      background-color: $white;
      padding: 8px 20px;
      border-radius: 8px;
      font-size: 18px;
      font-weight: bold;
    }

    input[type=file] {
      font-size: 100px;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }

  .img-meta {
    font-size: 18px;
    margin: 15px 0px;

    .coords,
    .location-name {
      display: block;
    }
  }
}
</style>
