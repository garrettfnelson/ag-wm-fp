"use strict";

window.onload = function () {
    renderMap();
}

function renderMap () {
    var map = L.map('map').setView([37.5, -119], 6);
    
    var baseMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
  }).addTo(map);
};