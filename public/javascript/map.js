function initMap() {
  console.log('title:', JSON.stringify(title));
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: {lat: 32.825716, lng: -83.654822},
      zoom: 7,
    });

    var searchOptions = title ? ('?title=' + title) : '';
    // map.data.loadGeoJson('https://waypoint-camp.herokuapp.com/campsites/data' + searchOptions);
    map.data.loadGeoJson('http://localhost:3000/campsites/data' + searchOptions);
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
    $('.highlightCamp').removeClass('highlightCamp');
    let targetSite = "#" + event.feature.getProperty('facilityID');

    $('.campView').scrollTop(0);
    $('.campView').animate({
      scrollTop: $(targetSite).offset().top - 200
    });
    // $('.campView').scrollTop($(targetSite).offset().top).scrollTop()
    $('#' + event.feature.getProperty('facilityID')).addClass('highlightCamp');
    // setTimeout(function(){
    //   $('#' + event.feature.getProperty('facilityID')).removeClass('highlightCamp');
    // }, 1500);
  });
}

