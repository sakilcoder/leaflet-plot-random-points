
let centralLat = 47.811195;
let centralLng = 13.033229;
let zoom = 7;
let markersLayer;

var mymap = L.map('mapid').setView([centralLat, centralLng], zoom);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

function drawPoints(points) {

  if(markersLayer)
    mymap.removeLayer(markersLayer);
  //Loop through the markers array
  let markers =[];
  for (var i=0; i<points.length; i++) {
       
       var lat = points[i][0];
       var lon = points[i][1];
       var popupText = points[i][0] +", " + points[i][1];
      //  console.log(popupText);
       
        var markerLocation = new L.LatLng(lat, lon);
        var marker = new L.Marker(markerLocation).bindPopup(popupText);
        markers.push(marker);
    
    }
    markersLayer = L.layerGroup(markers).addTo(mymap);
}

function generatePointsAndUpdateMap(){
  let numberOfPoints=document.forms[0].points.value;
  let points = generatePoints(numberOfPoints);
  drawPoints(points);
}

function generatePoints(x) {
  let latLans =[];
  for(i=0; i<x; i++){
    let lat = generateRndNumber(centralLat-1, 2);
    let lng = generateRndNumber(centralLng-1, 2);

    latLans.push([lat, lng]);
  }
  // console.log(latLans);

  sortAndCount(latLans);

  return latLans;
}


function generateRndNumber(base,range) { 
    var result = base + Math.random() * range; 
    return result; 
}

// north-west =  0 to 90, 0 to -180
// north-east =  0 to 90, 0 to  180
// south-west =  0 to-90, 0 to -180
// south-east =  0 to-90, 0 to  180

function sortAndCount(latLans) {
  let nw = [];
  let ne = [];
  let se = [];
  let sw = [];
  let sorts=[];
  for (let i = 0; i < latLans.length; i++) {
    if(latLans[i][0]>=centralLat && latLans[i][0]<=90 && latLans[i][1]<=centralLng && latLans[i][1]>=-180){ // check north-west quadrants
      nw.push(latLans[i]);
    }else if(latLans[i][0]>=centralLat && latLans[i][0]<=90 && latLans[i][1]>=centralLng && latLans[i][1]<=180){ // check north-east quadrants
      ne.push(latLans[i]);
    }else if(latLans[i][0]<=centralLat && latLans[i][0]>=-90 && latLans[i][1]>=centralLng && latLans[i][1]<=180){ // check south-east quadrants
      se.push(latLans[i]);
    }else{ // rest are in south-west quadrants
      sw.push(latLans[i]);
    }        
  }

  let counts ="north-west: " + nw.length +", north-east: " + ne.length + ", south-west: " + sw.length + ", south-east: " + se.length;
  document.getElementById('counts').innerHTML=counts;

}