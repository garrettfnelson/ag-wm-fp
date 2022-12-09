// "use strict";

var geoJsonLayer;
var unwanted;
var map;
var info = L.control();

countyTotalValue = [354256600, 379886384, 57386400, 107282000,
  64051000, 163407000, 6507842000, 1772000,
  2935242000, 314806935, 1187655880, 4100983000,
  15146100, 3090100, 2534797900, 1421099000, 216800,
  5221558000, 14101751300, 44155300, 15431400, 304953200,
  2857932000, 580184000, 39252600, 39252600, 9149106000, 4317046000,
  16516000, 2639779783, 220256000, 81646000, 5125800, 428541500, 12265459372,
  626424000, 3265000, 4265000, 1785545000, 1444071200, 2035648006]
countyNames = ['Alameda', 'Amador', 'Calaveras', 'Colusa',
'Contra Costa', 'El Dorado', 'Fresno', 'Glenn', 'Kern',
'Kings', 'Lake', 'Madera', 'Marin', 'Mariposa', 'Mendocino',
'Merced', 'Mono', 'Monterey', 'Napa', 'Nevada', 'Placer', 'Riverside', 
'Sacramento', 'San Benito', 'San Bernardino', 'San Diego', 'San Joaquin',
'San Luis Obispo', 'San Mateo', 'Santa Barbara', 'Santa Clara', 'Santa Cruz', 
'Shasta', 'Solano', 'Sonoma', 'Stanislaus', 'Tehama', 'Trinity', 'Tulare', 'Yolo', 'Yuba']

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

  unwanted = L.geoJSON(unwantedBoundaries, {
    style: unwantedStyle,
  }).addTo(map);

  info.addTo(map);
};

function style(feature){
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    //dashArray: '3',
    fillOpacity: 1,
    fillColor: getColor(feature)
    
  };
}

function getColor(feature) {

  for (var i = 0; i < countyNames.length; i++) {

    if(feature.properties.COUNTY_NAME == countyNames[i]) {
          
      if(countyTotalValue[i] > 11751495550) {
        return '#843640';
      }
      else if(countyTotalValue[i] > 9401239800) {
        return '#90474e';
      }
      else if(countyTotalValue[i] > 7050984050) {
        return '#9d5b60';
      }
      else if(countyTotalValue[i] > 4700728300) {
        return '#a96e72';
      }
      else if(countyTotalValue[i] > 2350472550) {
        return '#b9888a';
      }
      else {
        return '#cba7a8';
      }
    }
  }
}

function unwantedStyle(){
  return {
    weight: 2,
    opacity: 1,
    color: 'white',
    //dashArray: '3',
    fillOpacity: 1,
    fillColor: 'grey'
  }
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

        info.update(layer.feature.properties.COUNTY_NAME);
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
      info.update()
    }
  }
}

function highlightFeature(e, data) {
  var layer = e.target;

  layer.setStyle({
    weight: 5,
    color: 'rgb(45,18,22)',
    // color: 'rgb(250,250,250)',
    dashArray: '',
    fillColor: 'rgb(96,40,46)',
    fillOpacity: 1
  });

  // highlightChart(layer.feature.properties.COUNTY_NAME)

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties.COUNTY_NAME);

}


function resetHighlight(e, data) {
  geojson.resetStyle(e.target);

  var layer = e.target; 

  info.update();

  // resetChart(layer.feature.properties.COUNTY_NAME)

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

// info section of map

info.onAdd = function (map) {
  //"this" returns to info. 
  this._div = L.DomUtil.create('div', 'info');
  //the following line calls info.update(props) function. Again, this refers to 'info' here
  this.update();
  return this._div;
};

//Update the info based on what state user has clicked on
info.update = function (stateName) {

  this._div.innerHTML = ('</b><h4>Select a County to View</h4>');

  for (var i = 0; i < countyNames.length; i++) {
    if (countyNames[i] == stateName) {
      this._div.innerHTML = (stateName ? '<h4>This is ' + '<b>' + stateName + '</b>' + ' County<h4> <h4>Total Wine Value Produced </h4> <h4>from 1980-2020: <b>$' + countyTotalValue[i] + '</b></h4>' : '<h4>Select a County to View</h4>');
    }
  }
};

