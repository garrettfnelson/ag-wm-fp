// "use strict";

var geoJsonLayer;
var map;
var info = L.control();

window.onload = function () {
  renderMap();
}

function renderMap() {

  var map = L.map('map').setView([37.5, -119], 6);

  var baseMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
  }).addTo(map);

  geojson = L.geoJSON(countyBoundaries, {
    style: style,
    onEachFeature: onEachFeature,
}).addTo(map);
}

function style(){
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    //dashArray: '3',
    fillOpacity: 1,
    fillColor: 'rgb(132,54,64)'
  };
}

function triggerMapHighlight(stateName) {
  var layers = geojson.getLayers();

  for (var i = 0; i < layers.length; i++) {
    if (layers[i].feature.properties.COUNTY_NAME === stateName) {
      var layer = layers[i];

      layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }
  }
}

function triggerMapReset(stateName) {
  var layers = geojson.getLayers();
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].feature.properties.COUNTY_NAME === stateName) {
      var layer = layers[i];
      geojson.resetStyle(layer);
    }
  }
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: 'rgb(45,18,22)',
    dashArray: '',
    fillColor: 'rgb(96,40,46)',
    fillOpacity: 1
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}


function resetHighlight(e) {
  geojson.resetStyle(e.target);

}

function click(c){
  if (c.properties && c.properties.COUNTY_NAME){
    layer.bindPopup("County: " + c.properties.COUNTY_NAME);
  }
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: click
  });

}

