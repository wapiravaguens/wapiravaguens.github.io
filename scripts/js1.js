var markers = [];
var police = [];
var library = [];
var crime = [];
var park = [];
var scrollCount = 0;

// Google Map
var map;
var Chicago;
var markerP;
var infowindowP;
function initMap() {
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    center: {lat: 41.8708, lng: -87.6505},
    zoom: 14
  });

  markerP = new google.maps.Marker({ 
    position: {lat: 41.8708, lng: -87.6505}, 
    map: map,
    icon: { url: 'http://www.fancyicons.com/free-icons/232/science/png/256/university_256.png',  scaledSize : new google.maps.Size(35, 35)},
    title: 'Department of Computer Science'
  })

  infowindowP = new google.maps.InfoWindow({content: 'Department of Computer Science'});
  infowindowP.open(markerP.get('map'), markerP);
  markerP.addListener('click', function() {
    setMapDefault();
  });

  Chicago = new google.maps.LatLng(41.8708, -87.6505);
  dataPlaces();
  var weather = getCurrentWeather(41.8708, -87.6505);
  document.getElementById("weather").innerHTML = "Current weather is " + weather.Weather + ", " + weather.Temp + "°F";

}

// Query dataSet affordable rental housing developments
function dataPlaces(){
  $.ajax({
    url: "https://data.cityofchicago.org/resource/uahe-iimk.json",
    type: "GET",
    data: {
      "$where" : "latitude != 0 AND longitude != 0",
      "$$app_token" : "ONMw6rs4vX99YkE7M5cOetVo9"
    }
  }).done(function(data) {
    for (var i = data.length - 1; i >= 0; i--) {
      var location = new google.maps.LatLng(data[i].latitude, data[i].longitude);
      markers[i] = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Affordable Place',
        icon: {url: 'http://www.vavos.nl/images/ico-in-rond-huis.png', scaledSize : new google.maps.Size(35, 35)},
      });
      markers[i].data = data[i];
      markers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(location, Chicago) / 1000;
      markers[i].libraries = 0;
      markers[i].security = 50;
      markers[i].parks = 0;
      addMarker(markers[i]);
    }
    dataLibraries();
  });
}

// Query dataSet Libraries
function dataLibraries(){
  $.ajax({
    url: "https://data.cityofchicago.org/resource/psqp-6rmg.json",
    type: "GET",
    data: {
      "$$app_token" : "ONMw6rs4vX99YkE7M5cOetVo9"
    }
  }).done(function(data) {
    for (var i = data.length - 1; i >= 0; i--) {
      var location = new google.maps.LatLng(data[i].location.coordinates[1], data[i].location.coordinates[0]);
      library[i] = new google.maps.Marker({ 
        position: location,
        map: map,
        icon: { url: 'http://biblioteca.unedteruel.org/images/librosicono.png', scaledSize : new google.maps.Size(35, 35)},
        title: 'Library',
      })
      library[i].data = data[i];
      addMarkerLib(library[i]);
      for (var j = markers.length - 1; j >= 0; j--) {
        var markerLocation = new google.maps.LatLng(markers[j].data.latitude, markers[j].data.longitude);
        var distance = google.maps.geometry.spherical.computeDistanceBetween(markerLocation, location);
        if (distance < 2000) {
          markers[j].libraries += 1;
        }
      }
    }
    dataParks();
    clearMarkers(library);
  });
}

// Query dataSet police station
function dataPolices(){
  $.ajax({
      url: "https://data.cityofchicago.org/resource/9rg7-mz9y.json",
      type: "GET",
      data: {
        "$where" : "latitude != 0 AND longitude != 0",
        "$$app_token" : "ONMw6rs4vX99YkE7M5cOetVo9"
      }
    }).done(function(data) {
      for (var i = data.length - 1; i >= 0; i--) {
        var location = new google.maps.LatLng(data[i].latitude, data[i].longitude);
        police[i] = new google.maps.Marker({ 
          position: location,
          map: map,
          icon: { url: 'http://icon-icons.com/icons2/35/PNG/512/police_avatar_person_2845.png', scaledSize : new google.maps.Size(35, 35)},
          title: 'Police Station'
        })
        police[i].data = data[i];
        addMarkerPolice(police[i]);
        for (var j = markers.length - 1; j >= 0; j--) {
          var markerLocation = new google.maps.LatLng(markers[j].data.latitude, markers[j].data.longitude);
          var distance = google.maps.geometry.spherical.computeDistanceBetween(markerLocation, location);
          if (distance < 2000) {
            markers[j].security += 20;
          }
        }
      }
      dataCrimes();
      clearMarkers(police);
  });
}

// Query dataSet parks
function dataParks(){
  $.ajax({
    url: "https://data.cityofchicago.org/resource/4xwe-2j3y.json",
    type: "GET",
    data: {
      "$$app_token" : "ONMw6rs4vX99YkE7M5cOetVo9"
    }
  }).done(function(data) {
    for (var i = data.length - 1; i >= 0; i--) {
      if (data[i].location != undefined) {
        var location = new google.maps.LatLng(data[i].location.coordinates[1], data[i].location.coordinates[0]);
        for (var j = markers.length - 1; j >= 0; j--) {
          var markerLocation = new google.maps.LatLng(markers[j].data.latitude, markers[j].data.longitude);
          var distance = google.maps.geometry.spherical.computeDistanceBetween(markerLocation, location);
          if (distance < 1200) {
            markers[j].parks += 1;
          }
        }  
      }
    }
    dataPolices();
  });
}

// Query dataSet crimes
function dataCrimes(){
  $.ajax({
      url: "https://data.cityofchicago.org/resource/6zsd-86xi.json",
      type: "GET",
      data: {
        "$limit" : 2000,
        "$where" : "latitude != 0 AND longitude != 0",
        "$$app_token" : "ONMw6rs4vX99YkE7M5cOetVo9"
      }
    }).done(function(data) {
      for (var i = data.length - 1; i >= 0; i--) {
        var location = new google.maps.LatLng(data[i].latitude, data[i].longitude);
        for (var j = markers.length - 1; j >= 0; j--) {
          var markerLocation = new google.maps.LatLng(markers[j].data.latitude, markers[j].data.longitude);
          var distance = google.maps.geometry.spherical.computeDistanceBetween(markerLocation, location);
          if (distance < 1000) {
            markers[j].security -= 0.5;
          }
        }
        
      }
      createItems();
  });
}


// Add markers map
var prev_infowindow ;
function addMarker(marker) {
  var infowindow = new google.maps.InfoWindow({
    content: marker.data.property_name
  });

  marker.addListener('click', function() {
    if (prev_infowindow != undefined) {
      prev_infowindow.close();
    }
    prev_infowindow = infowindow;
    infowindow.open(marker.get('map'), marker);
    showInformation(marker);
    updateList(marker);
  });
}

// Show data in information section
function showInformation(marker){
  document.getElementById("property-name").innerHTML = "<b>Properity Name</b>: " + marker.data.property_name;
  document.getElementById("property-type").innerHTML = "<b>Properity Type</b>: " + marker.data.property_type;
  document.getElementById("community-area-name").innerHTML = "<b>Community Area Name</b>: " + marker.data.community_area;
  document.getElementById("address").innerHTML = "<b>Address</b>: " + marker.data.address;
  document.getElementById("management_company").innerHTML = "<b>Management Company</b>: " + marker.data.management_company;
  document.getElementById("phone-number").innerHTML = "<b>Phone Number</b>: " + marker.data.phone_number;
}

// Action when a item of the list is click
var selected;
function clickList(item){
  if (selected != undefined) {
    selected.setAttribute("class", "list-group-item");
  }
  selected = item;
  item.setAttribute("class", "list-group-item active");

  showInformation(item.marker);
  var position = new google.maps.LatLng(item.marker.data.latitude, item.marker.data.longitude);
  map.setCenter(position);

  var infowindow = new google.maps.InfoWindow({
    content: item.marker.data.property_name
  });
  if (prev_infowindow != undefined) {
    prev_infowindow.close();
  }
  prev_infowindow = infowindow;
  infowindow.open(item.marker.get('map'), item.marker);
}

// Update list when a marker is click
function updateList(marker){
  if (selected != undefined) {
    selected.setAttribute("class", "list-group-item");
  }
  selected = marker.item;
  marker.item.setAttribute("class", "list-group-item active");
  scroll(marker.item);
}

// Order list by distance
function orderByDistance() {
  document.getElementById("list").innerHTML = "";
  markers.sort(function(a, b){return b.distance - a.distance});
  orderList();
  clickList(markers[markers.length - 1].item);
  scroll(markers[markers.length - 1].item);
}

// Order list by libraries
function orderByLibraries() {
  document.getElementById("list").innerHTML = "";
  markers.sort(function(a, b){return a.libraries - b.libraries});
  orderList();
  clickList(markers[markers.length - 1].item);
  scroll(markers[markers.length - 1].item);
}

// Order list by security
function orderBySecurity() {
  document.getElementById("list").innerHTML = "";
  markers.sort(function(a, b){return a.security - b.security});
  orderList();
  clickList(markers[markers.length - 1].item);
  scroll(markers[markers.length - 1].item);
}

function orderByParks() {
  document.getElementById("list").innerHTML = "";
  markers.sort(function(a, b){return a.parks - b.parks});
  orderList();
  clickList(markers[markers.length - 1].item);
  scroll(markers[markers.length - 1].item);
}

// help order list-group
function orderList(){
  scrollCount = 0;
  for (var i = markers.length - 1; i >= 0; i--) {
    $("#list").append(markers[i].item);
    markers[i].item.scroll = scrollCount;
    scrollCount += 63; 
  }
}

// create items and append to listItem
function createItems(){
  scrollCount = 0;
  for (var i = markers.length - 1; i >= 0; i--) {
  var listItem = document.createElement("a");
      listItem.setAttribute("class","list-group-item");
      listItem.setAttribute("onclick","clickList(this)");
      listItem.innerHTML = "<h4 class=list-group-item-heading>" + markers[i].data.property_name +"</h4>" + "<p class=list-group-item-text>" 
      + "<span class=\'label label-info\'>" + "Distance: " + markers[i].distance.toFixed(2) + "km" +"</span>" 
      + " "+  "<span class=\'label label-info\'>" + "Security: " + markers[i].security +"</span>"
      + " "+  "<span class=\'label label-info\'>" + "Libraries: " + markers[i].libraries +"</span>" 
      + " "+  "<span class=\'label label-info\'>" + "Parks: " + markers[i].parks +"</span>" 
      +"</p>";
      listItem.marker = markers[i];
      $("#list").append(listItem);

      // Association between markers and listItem
      markers[i].item = listItem; 

      // Set scroll control
      listItem.scroll = scrollCount;
      scrollCount += 63; 
  }
}

// help scroll list
function scroll(item){
  $("#list").scrollTop(item.scroll);
}

// button "Default Position"
function setMapDefault() {
  infowindowP.open(markerP.get('map'), markerP);
  map.setCenter(Chicago);
  map.setZoom(14);
}

// markers police station
var prev_infowindow_p;
function addMarkerPolice(marker){
  var string =  "<b>Distric</b>: " + marker.data.district + " - " + marker.data.district_name  + "<br>" + "<b>Address</b>: " + marker.data.address + "<br>" + "<b>Phone</b>: " + marker.data.phone;
  var infowindow = new google.maps.InfoWindow({
    content: string,
  });

  marker.addListener('click', function() {
    if (prev_infowindow_p != undefined) {
      prev_infowindow_p.close();
    }
    if (prev_infowindow_l != undefined) {
      prev_infowindow_l.close();
    }
    prev_infowindow_p = infowindow;
    infowindow.open(marker.get('map'), marker);
  });
}

// button "Police Station"
function policeStation(){
  if ((document.getElementById("policeStation").innerHTML) == "Show Police Stations") {
    document.getElementById("policeStation").innerHTML = "Hide Police Stations";
    showMarkers(police);
  } else {
    document.getElementById("policeStation").innerHTML = "Show Police Stations";
    if (prev_infowindow_p != undefined) {
      prev_infowindow_p.close();
    }
    clearMarkers(police);
  }
}

// markers Libraries
var prev_infowindow_l;
function addMarkerLib(marker){
  var string =  "<b>Name</b>: " + marker.data.name_  + "<br>" + "<b>Address</b>: " + marker.data.address + "<br>" + "<b>Phone</b>: " + marker.data.phone;
  var infowindow = new google.maps.InfoWindow({
    content: string,
  });

  marker.addListener('click', function() {
    if (prev_infowindow_p != undefined) {
      prev_infowindow_p.close();
    }
    if (prev_infowindow_l != undefined) {
      prev_infowindow_l.close();
    }
    prev_infowindow_l = infowindow;
    infowindow.open(marker.get('map'), marker);
  });
}

// button "Libraries"
function libraries(){
  if ((document.getElementById("libraries").innerHTML) == "Show Libraries") {
    document.getElementById("libraries").innerHTML = "Hide libraries";
    showMarkers(library);
  } else {
    document.getElementById("libraries").innerHTML = "Show libraries";
    if (prev_infowindow_l != undefined) {
      prev_infowindow_l.close();
    }
    clearMarkers(library);
  }
}

// 3
// Show and Clear marker in the map
function setMapOnAll(map, marker) {
  for (var i = 0; i < marker.length; i++) {
    marker[i].setMap(map);
  }
}

function clearMarkers(marker) {
  setMapOnAll(null, marker);
}

function showMarkers(marker) {
  setMapOnAll(map, marker);
}

// Get Weather
function getCurrentWeather(lat, lng) {
  var url = "http://forecast.weather.gov/MapClick.php?lat=" + lat + "&lon=" + lng + "&FcstType=json";
  var resp;
  var xmlHttp;
  var obj;
 
  resp = "" ;
  xmlHttp = new XMLHttpRequest();

  if(xmlHttp != null)
  {
      xmlHttp.open( "GET", url, false );
      xmlHttp.send( null );
      resp = xmlHttp.responseText;
      obj = JSON.parse(resp);
  }

  return obj.currentobservation;
}