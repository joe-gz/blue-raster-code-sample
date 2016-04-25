console.log('map');
require([
  "esri/map",
  "esri/geometry/webMercatorUtils",
  "esri/dijit/BasemapToggle",
  "dojo/dom",
  "dojo/domReady!"
], function(
  Map, webMercatorUtils, BasemapToggle, dom
)  {

  map = new Map("map", {
    center: [-77.0340283,38.9048728],
    zoom: 16,
    basemap: "topo"
  });

  map.on("load", function() {
    //after map loads, connect to listen to mouse click
    map.on("click", showCoordinates);
  });

  function showCoordinates(evt) {
    //the map is in web mercator but display coordinates in geographic (lat, long)
    var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
    //display mouse coordinates
    dom.byId("info").innerHTML = mp.x.toFixed(3) + ", " + mp.y.toFixed(3);
  }

// Set satellite option for toggle
  var satellite = new BasemapToggle({
    map: map,
    basemap: "satellite"
  }, "SatelliteToggle");
  satellite.startup();

// Set streets option for toggle
  var streets = new BasemapToggle({
    map: map,
    basemap: "streets"
  }, "StreetToggle");
  streets.startup();

});
