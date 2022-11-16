// "use strict";

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

  L.geoJSON(countyBoundaries, {
    //filter: filterCounties
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

}

// function filterCounties(){
//   for (i=0; i<countyBoundaries.length; i++){
//     let jsonCountyName = countyBoundaries.features.properties.COUNTY_NAME;
//     console.log(jsonCountyName);
//     let csvCountyName = counties.features.properties.County;
//     for(j=0; i<counties.length; i++){
//       if(jsonCountyName[i] === csvCountyName[j]){
//         jsonCountyName.clearLayers();
//       }
//       else{ 
//         return true;
//       }
//     }
//   }
// };

function style(feature) {
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
    if (layers[i].feature.properties.name === stateName) {
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

// function triggerMapClick(stateName){
//     var layers = geojson.getLayers();

//     for (var i = 0; i < layers.length; i++){
//         if (layers[i].feature.properties.name === stateName){
//             var layer = layers[i];

//             layer.setStyle({
//                 weight: 7,
//                 color: 'darkgreen',
//                 dashArray: '',
//                 fillOpacity: 0.7
//             });
//             if(!L.Browser.ie && !L.Browser.opera && !L.Browser.edge){
//                 layer.bringToFront();
//             }

//         }
//     }
// }

function triggerMapReset(stateName) {
  var layers = geojson.getLayers();
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].feature.properties.name === stateName) {
      var layer = layers[i];
      geojson.resetStyle(layer);
    }
  }
}

function highlightFeature(e) {
  var layer = e.target;

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


function resetHighlight(e) {
  geojson.resetStyle(e.target);

}

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature
  });
}

