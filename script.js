console.log('map');
require([
  "esri/map",
  "esri/dijit/HomeButton",
  "esri/geometry/webMercatorUtils",
  "esri/dijit/BasemapToggle",
  "esri/geometry/Point",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/graphic",
  "dojo/_base/array",
  "dojo/dom-style",
  "dojox/widget/ColorPicker",
  "dojo/dom",
  "dojo/domReady!"
], function(
  Map, HomeButton, webMercatorUtils, BasemapToggle, Point, SimpleMarkerSymbol, Graphic, arrayUtils, domStyle, ColorPicker, dom
){

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

  map.on("load", mapLoaded);

  function mapLoaded(){
    // Specify Blue Raster location
    var points = [[-77.086213,38.890841]];
    var iconPath = "M24.0,2.199C11.9595,2.199,2.199,11.9595,2.199,24.0c0.0,12.0405,9.7605,21.801,21.801,21.801c12.0405,0.0,21.801-9.7605,21.801-21.801C45.801,11.9595,36.0405,2.199,24.0,2.199zM31.0935,11.0625c1.401,0.0,2.532,2.2245,2.532,4.968S32.4915,21.0,31.0935,21.0c-1.398,0.0-2.532-2.2245-2.532-4.968S29.697,11.0625,31.0935,11.0625zM16.656,11.0625c1.398,0.0,2.532,2.2245,2.532,4.968S18.0555,21.0,16.656,21.0s-2.532-2.2245-2.532-4.968S15.258,11.0625,16.656,11.0625zM24.0315,39.0c-4.3095,0.0-8.3445-2.6355-11.8185-7.2165c3.5955,2.346,7.5315,3.654,11.661,3.654c4.3845,0.0,8.5515-1.47,12.3225-4.101C32.649,36.198,28.485,39.0,24.0315,39.0z";
    var initColor = "#ce641d";
    // loop through any points specified and add graphic
    arrayUtils.forEach(points, function(point) {
      var graphic = new Graphic(new Point(point), createSymbol(iconPath, initColor));
      map.graphics.add(graphic);
    });
  }

  function createSymbol(path, color){
    var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
    markerSymbol.setPath(path);
    markerSymbol.setColor(new dojo.Color(color));
    markerSymbol.setOutline(null);
    return markerSymbol;
  }

});

var infoSpan = document.getElementById('info');
infoSpan.addEventListener("click", function (){
  this.className = "";
  this.innerHTML = "";
})
