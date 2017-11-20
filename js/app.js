/* draws overlays of teh precints using points defined in coords.js */
var map;
var infowindow;



function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    //center: {lat: 39.9985, lng: -75.289},
    center: {lat: 40.033211, lng: -75.277137 },
    zoom: 13
  });
  infoWindow = new google.maps.InfoWindow({});

  //construct the polygons
    var len = precincts.length;
    var polygon;
    var currentPrecinict;
    var lastPrecinct;
    for (var i=0; i < len; i++){
          polygon = new google.maps.Polygon({
          paths: precincts[i].coords,
          strokeColor: precincts[i].strokeColor,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: precincts[i].fillColor,
          fillOpacity: 0.15
        });
        polygon.setMap(map);

        precincts[i].polygon = polygon;

        polygon.addListener('click', (function(polygonCopy, iCopy) {
          return function(){
            if (lastPrecinct) {
            lastPrecinct.polygon.setMap(null);
            lastPrecinct.polygon.fillOpacity = 0.15;
            lastPrecinct.polygon.setMap(map);
            }
            currentPrecinct = precincts[iCopy];
            currentPrecinct.polygon.setMap(null);
            currentPrecinct.polygon.fillOpacity = 0.3;
            currentPrecinct.polygon.setMap(map);
            lastPrecinct = currentPrecinct;
            showPollPlace(currentPrecinct);
          };

        })(polygon, i));

    }

    function showPollPlace(precinct) {

      // Replace the info window's content and position.
      infoWindow.setContent(precinct.contentString);
      infoWindow.setPosition(precinct.position);

      infoWindow.open(map);
    }

}
