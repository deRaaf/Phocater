<template lang="html">
  <div class="upload-wrap">
    <button class="btn">Kies een foto</button>
    <input ref="fileinput" @change="onChange" id="file-input" type="file" accept="image/jpeg"/>
  </div>
</template>

<script>
import EXIF from '../../node_modules/exif-js/exif'

export default {
  methods: {
    toDecimal(number) {
      return number[0].numerator + number[1].numerator /
          (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
    },

    onChange(image) {
      var input = this.$refs.fileinput
      var file = input.files[0]
      var self = this;
      
      if (image) {
        EXIF.getData(file, function() {

          var lat = EXIF.getTag(this, 'GPSLatitude');
          var long = EXIF.getTag(this, 'GPSLongitude');

          if (lat && long) {
            // Display the uploaded image if there's GPS data
            self.readURL(input);

            //Convert lat & long to decimal so Leaflet can understand it
            var lat_dec = self.toDecimal(lat);
            var long_dec = self.toDecimal(long);

            // Send lat and long to the leafletmap component
            self.$llBus.$emit('send-latlong', lat_dec, long_dec);
          }
          else {
            // No metadata found
            self.clearFileInput(input);
            alert("Geen GPS data gevonden in afbeelding '" + file.name + "'.");
          }
        })
      } else {
        alert("Dat is geen afbeelding");
      }
    },

    // Clear file input if there's no exif data
    clearFileInput(ctrl) {
      ctrl.value = null;
    },

    // Read the file and send it to the uploadedimage component
    readURL(input) {

      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var self = this

        reader.onload = function(e) {
          var data = e.target.result
          self.$eventBus.$emit('send-data', data);
        }

        reader.readAsDataURL(input.files[0]);
      }
    }
 }
}
</script>

<style lang="scss">
@import "../assets/scss/settings.scss";

.upload-wrap  {
position: relative;
overflow: hidden;
width: 170px;
margin: 0 auto;
padding: 20px 0;

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
</style>
