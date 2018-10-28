<template lang="html">
  <div id="leaflet-map"></div>
</template>

<script>
import L from '../../node_modules/leaflet/dist/leaflet'

export default {
  data() {
    return {
      lat: "",
      long: ""
    }
  },
  methods: {
    displayMap() {

      //Set map view to coordinates
      var mymap = L.map('leaflet-map').setView([this.lat, this.long], 13);

      // Put a marker on the location of the coordinates
      L.marker([this.lat, this.long]).addTo(mymap);

      //Initialize map, import tiles from Mapbox
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoidGxiZHIiLCJhIjoiY2ptdW0zbTA1MGZ4ZjNrbzh2MWo0a2owMCJ9.2SiG1bQFeuPbwQzBA902TQ'
      }).addTo(mymap);
    }
  },

  created() {
    this.$llBus.$on('send-latlong', (lat_dec, long_dec) => {
      this.lat = lat_dec
      this.long = long_dec

      this.displayMap();
    });
  }
}
</script>

<style lang="scss">
  #leaflet-map {
    height: 250px;
  }
</style>
