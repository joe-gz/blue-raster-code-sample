console.log('map');
require([
  "esri/map",
  "esri/dijit/HomeButton",
  "esri/geometry/webMercatorUtils",
  "esri/dijit/BasemapToggle",
  "dojo/dom",
  "dojo/domReady!"
], function(
  Map, HomeButton, webMercatorUtils, BasemapToggle, dom
)  {

  map = new Map("map", {
    // longitude, latitude
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
    console.log(mp);
    //display mouse coordinates
    dom.byId("info").innerHTML = "Longitude: " + mp.x.toFixed(3) + ", " + "Latitude: " + mp.y.toFixed(3);
    var info = dom.byId("info");
    info.className += " active-latlong";
  }

  // Set home button to recenter to GA
  var home = new HomeButton({
    map: map
  }, "HomeButton");
  home.startup();

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

var infoSpan = document.getElementById('info');
infoSpan.addEventListener("click", function (){
  this.className = "";
  this.innerHTML = "";
})
