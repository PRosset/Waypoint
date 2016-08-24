function initMap() {
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: {lat: 33.7788718, lng: -84.3872202},
      zoom: 9,
    });

    // map.data.loadGeoJson('https://waypoint-camp.herokuapp.com/data');
    map.data.loadGeoJson('http://localhost:3000/data');
  // Set the global styles.
  map.data.setStyle(function(feature) {
    var campName = feature.getProperty('properties.title');
    return {
    // icon:'http://localhost:3000/public/img/waypoint.png',
    icon: 'http://i.imgur.com/eWVrVLf.png',
    visible: true,
    clickable: true,
    title: campName
    };
  });

  map.data.addListener('mouseover', function(event) {
    map.data.overrideStyle(event.feature, { icon: 'http://i.imgur.com/xW2U36C.png' });
  })

  map.data.addListener('mouseout', function(event) {
    map.data.revertStyle();
  });

  map.data.addListener('click', function(event) {
    let targetSite = "#" + event.feature.getProperty('facilityID');

    $('.campView').scrollTop(0);
    $('.campView').animate({
      scrollTop: $(targetSite).offset().top - 200
    });
    // $('.campView').scrollTop($(targetSite).offset().top).scrollTop()
    $('#' + event.feature.getProperty('facilityID')).addClass('highlightCamp');
    setTimeout(function(){
      $('#' + event.feature.getProperty('facilityID')).removeClass('highlightCamp');
    }, 1500);
  });
}

