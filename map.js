function initMap() {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: {lat: 33.7788718, lng: -84.3872202},
      zoom: 9
  });
  map.data.loadGeoJson('http://localhost:3000/data');
}
