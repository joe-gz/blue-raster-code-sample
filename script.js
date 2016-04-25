console.log('map');
var map;

require(["esri/map",
"dojo/domReady!"],
function(Map) {
  map = new Map("map", {
    basemap: "topo",
    center: [-77.0340283,38.9048728], // longitude, latitude
    zoom: 13
  });
});

$(document).ready(function (){
  console.log('ready');
})
