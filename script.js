console.log('map');
require([
  "esri/map",
  "esri/dijit/HomeButton",
  "esri/geometry/webMercatorUtils",
  "esri/dijit/BasemapToggle",
  "esri/dijit/Search",
  "esri/geometry/Extent",
  "esri/graphic",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/geometry/screenUtils",
  "dojo/dom",
  "dojo/dom-construct",
  "dojo/query",
  "dojo/_base/Color",
  "dojo/dom",
  "dojo/domReady!"
], function(
  Map, HomeButton, webMercatorUtils, BasemapToggle, Search, Extent, Graphic, SimpleMarkerSymbol, screenUtils, dom, domConstruct, query, Color
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

  var search = new Search({
    map: map,
  }, dom.byId("search"));
  search.startup();

  map.on("load", enableSpotlight);
  search.on("select-result", showLocation);
  search.on("clear-search", removeSpotlight);

  function enableSpotlight() {
    var html = "<div id='spotlight' class='spotlight'></div>";
    domConstruct.place(html, dom.byId("map_container"), "first");
  }

  function showLocation(e) {
    map.graphics.clear();
    var point = e.result.feature.geometry;
    var symbol = new SimpleMarkerSymbol().setStyle(
      SimpleMarkerSymbol.STYLE_SQUARE).setColor(
        new Color([255,0,0,0.5])
      );
      var graphic = new Graphic(point, symbol);
      map.graphics.add(graphic);

      map.infoWindow.setTitle("Search Result");
      map.infoWindow.setContent(e.result.name);
      map.infoWindow.show(e.result.feature.geometry);
    }

    function removeSpotlight() {
      map.infoWindow.hide();
      map.graphics.clear();
    }

  });

  var infoSpan = document.getElementById('info');
  infoSpan.addEventListener("click", function (){
    this.className = "";
    this.innerHTML = "";
  })
