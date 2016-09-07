function initMap() {
  // console.log('title:', JSON.stringify(title));
  // console.log('currentUser Visited:', JSON.stringify(visited));
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
      center: {lat: 32.825716, lng: -83.654822},
      zoom: 7,
    });


    var searchOptions = title ? ('?title=' + title) : '';
    map.data.loadGeoJson('/campsites/data' + searchOptions);
    // Set the global styles.
    map.data.setStyle(function(feature) {

      //******** YOU ARE SO CLOSE RIGHT HERE ***************
      // console.log('Feature ID:', map.data.feature);
      // console.log('Feature: ', feature);
      // console.log('Feature Property ID:', map.data.feature.getProperty('_id'));

      // console.log('check visisted:',visited.split(',').indexOf(feature.getId()));
      var campName = feature.getProperty('properties.title');
      if (visited.split(',').indexOf(feature.getId()) >= 0) {
        return ({
          icon: '/img/waypoint_4.png',
          visible: true,
          clickable: true,
          label: campName
        });
      } else {
        return ({
          icon: '/img/waypoint_1.png',
          visible: true,
          clickable: true,
          label: campName
        });
      }
    });

  map.data.addListener('mouseover', function(event) {
    map.data.overrideStyle(event.feature, { icon: '/img/waypoint_2.png' });
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

    map.data.overrideStyle(event.feature, { icon: '/img/waypoint_3.png'})
    $('#' + event.feature.getProperty('facilityID')).addClass('highlightCamp');
  });
}

