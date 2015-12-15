var TerrainTypeOptions = {
  getTileUrl: function(coord, zoom) {
      var normalizedCoord = getNormalizedCoord(coord, zoom);
      if (!normalizedCoord) {
        return null;
      }
      var bound = Math.pow(2, zoom);
      return '/images/maps/Illeos' +
          '/' + zoom + '/' + normalizedCoord.x + '-' +
          (bound - normalizedCoord.y - 1) + '.jpg';
  },
  tileSize: new google.maps.Size(256, 256),
  maxZoom: 3,
  minZoom: 0,
  radius: 1738000,
  name: 'Terrain'
};

// var TerrainTypeOptions = {
//   getTileUrl: function(coord, zoom) {
//       var normalizedCoord = getNormalizedCoord(coord, zoom);
//       if (!normalizedCoord) {
//         return null;
//       }
//       var bound = Math.pow(2, zoom);
//       return 'https://raw.githubusercontent.com/DonoA/DonoA.github.io/master/Map/Terrain' +
//           '/' + zoom + '/' + normalizedCoord.x + '-' +
//           (bound - normalizedCoord.y - 1) + '.png';
//   },
//   tileSize: new google.maps.Size(256, 256),
//   maxZoom: 4,
//   minZoom: 1,
//   radius: 1738000,
//   name: 'Terrain2'
// };

// var ClaimMapType = new google.maps.ImageMapType(ClaimTypeOptions);
var TerrainMapType = new google.maps.ImageMapType(TerrainTypeOptions);

var places = [
    {pos: new google.maps.LatLng(71.08431232536932, 43.046875), name: '1', data: "some words"}
    ];

function initialize() {
  var myLatlng = new google.maps.LatLng(0, 0);
  var mapOptions = {
    center: myLatlng,
    zoom: 1,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['Claims', 'Terrain']
    }
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  // map.mapTypes.set('Claims', ClaimMapType);
  // map.setMapTypeId('Claims');
  map.mapTypes.set('Terrain', TerrainMapType);
  map.setMapTypeId('Terrain');
    var markers = [];
  for (i = 0; i < places.length; i++) {
     markers[i] = new google.maps.Marker({
        map:map,
        data: places[i].data,
        title: places[i].name,
        draggable:false,
        animation: google.maps.Animation.DROP,
        position: places[i].pos
      });

      google.maps.event.addListener(markers[i], 'click', function(i) {
          for(j = 0; j < markers.length; j++){
            if(i.latLng.equals(markers[j].position)){
                console.log(markers[j].data);
            }
          }
        });
  }
//  marker = new google.maps.Marker({
//    map:map,
//    draggable:true,
//    animation: google.maps.Animation.DROP,
//    position: new google.maps.LatLng(10, 10)
//  });
//  google.maps.event.addListener(marker, 'click', toggleBounce);
}

// Normalizes the coords that tiles repeat across the x axis (horizontally)
// like the standard Google map tiles.
function getNormalizedCoord(coord, zoom) {
  var y = coord.y;
  var x = coord.x;

  // tile range in one direction range is dependent on zoom level
  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
  var tileRange = 1 << zoom;

  // don't repeat across y-axis (vertically)
  if (y < 0 || y >= tileRange) {
    return null;
  }

  // repeat across x-axis
  if (x < 0 || x >= tileRange) {
    return null;
  }

  return {
    x: x,
    y: y
  };
}
        var counter = 1;
function toggleBounce(marker) {
    console.log(marker);
//  if (marker.getAnimation() != null) {
//    marker.setAnimation(null);
//  } else {
//    marker.setAnimation(google.maps.Animation.BOUNCE);
//    console.log("{pos: new google.maps.LatLng"+marker.getPosition().toString()+", name: '"+counter+"'}, ");
//      counter++;
//  }
}

function toggleInfo() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    console.log("{pos: new google.maps.LatLng"+marker.getPosition().toString()+", name: '"+counter+"'}, ");
    counter++;
  }
}


google.maps.event.addDomListener(window, 'load', initialize);
