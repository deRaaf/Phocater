import EXIF from '../node_modules/exif-js/exif'
import L from '../node_modules/leaflet/dist/leaflet'
import $ from 'jquery';
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

window.onload=getExif;

function getExif() {
  // See if there's a file selected
    document.getElementById("file-input").onchange = function(e) {
      // Get the photo
        var file = e.target.files[0]
        if (file && file.name) {
            EXIF.getData(file, function() {
                // Get the latitude from the metadata
                var lat = EXIF.getTag(this, 'GPSLatitude');
                // Get the longitude from the metadata
                var long = EXIF.getTag(this, 'GPSLongitude');
                // Location for the location data to be outputted
                var latLong = document.getElementById("latLong");

                if (lat && long) {
                  //Convert lat & long to decimal so Leaflet can understand it
                  var lat_dec = toDecimal(lat);
                  var long_dec =  toDecimal(long);
                  //Output Coordinates
                  latLong.innerHTML = `${lat_dec} ${long_dec}`;

                  //Set the map to display the location of the coordinates
                  var mymap = L.map('leaflet-map').setView([lat_dec, long_dec], 13);
                  // Put a marker on the location of the coordinates
                  var marker = L.marker([lat_dec, long_dec]).addTo(mymap);

                  //Import tiles from Mapbox
                  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                      maxZoom: 18,
                      id: 'mapbox.streets',
                      accessToken: 'pk.eyJ1IjoidGxiZHIiLCJhIjoiY2ptdW0zbTA1MGZ4ZjNrbzh2MWo0a2owMCJ9.2SiG1bQFeuPbwQzBA902TQ'
                  }).addTo(mymap);
                } else {
                    // No metadata found
                    alert("No EXIF data found in image '" + file.name + "'.");
                }
            });
        }
    }
}

// Function to convert the coordiates from hours, minutes to decimal so leaflet can interpret it
var toDecimal = function (number) {
 return number[0].numerator + number[1].numerator /
     (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
 };

// Function to display the uploaded image
function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#img-uploaded').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#file-input").change(function() {
  readURL(this);
});
