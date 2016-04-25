console.log('map');
require([
  "esri/map",
  "esri/dijit/BasemapToggle",
  "dojo/domReady!"
], function(
  Map, BasemapToggle
)  {

  map = new Map("map", {
    center: [-77.0340283,38.9048728],
    zoom: 16,
    basemap: "topo"
  });

  var satellite = new BasemapToggle({
    map: map,
    basemap: "satellite"
  }, "SatelliteToggle");
  satellite.startup();

  var streets = new BasemapToggle({
    map: map,
    basemap: "streets"
  }, "StreetToggle");
  streets.startup();

});

$(document).ready(function (){
  console.log('ready');
})
