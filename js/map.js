"use strict";

var geojson;
var map;
var info = L.control();

window.onload = function () {
  renderMap();
  //addLayers();
  //style(feature);
}

function renderMap() {

  var map = L.map('map').setView([37.5, -119], 6);

  var baseMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
  }).addTo(map);

  let countiesLayer = L.geoJSON(counties, {
    style: style
  });

  map.addLayer(countiesLayer);

}


// function pointToCircle(feature, latlng) {
//   let fillColorVar = "";
//   let radiusColor = "";

//   let geojsonMarkerOptions = {
//     radius: 8,
//     fillColor: fillColorVar,
//     color: radiusColor,
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.8
//   };

//   let circleMarker = L.circleMarker(latlng, geojsonMarkerOptions);
//   return circleMarker;
// }

function style(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fillColor: 'blue' //getColor(feature.properties.density)
  };
}

// function addLayers() {
//   let countiesLayer = L.geoJSON(counties, {
//     style: style
//   });

//   map.addLayer(countiesLayer);
// };


