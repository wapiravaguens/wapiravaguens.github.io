var markers = [];
var police = [];
var library = [];
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
    icon: { url: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png'},
    title: 'Department of Computer Science'
  })

  infowindowP = new google.maps.InfoWindow({content: 'Department of Computer Science'});
  infowindowP.open(markerP.get('map'), markerP);
  markerP.addListener('click', function() {
    setMapDefault();
  });

  Chicago = new google.maps.LatLng(41.8708, -87.6505);
  // Query dataSet affordable rental housing developments
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
        title: 'Affordable Place'
      });
      markers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(location, Chicago) / 1000;
      markers[i].data = data[i];
      addMarker(markers[i]);

      // $.ajax({
      //   url: "http://campuapi.azurewebsites.net/Home/ZillowApi?url=GetSearchResults.htm?zws-id=X1-ZWz1fqj5j6s3yj_4dboj$address=" + data[i].address + "$citystatezip=Chicago%2C+IL$rentzestimate=true",
      //   type: "GET",
      //   crossDomain: true,
      //   datatype: "xml",
      // }).done(function(data) {
      //   var info = xml2json(data);
      //   if (info["SearchResults:searchresults"].message.code ==  0) {
      //     console.log(info);
      //   }
      // });
    }
    createItems();
  });

  // Query dataSet librarys
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
        icon: { url: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png'},
        title: 'Library',
      })
      library[i].data = data[i];
      addMarkerLib(library[i]);
    }
    clearMarkers(library);
  });

  // Query dataSet police station
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
          icon: { url: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_black.png'},
          title: 'Police Station'
        })
        police[i].data = data[i];
        addMarkerPolice(police[i]);
      }
      clearMarkers(police);
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
  crimes(marker.data.community_area_number);
  document.getElementById("property-name").innerHTML = "<b>Properity Name</b>: " + marker.data.property_name;
  document.getElementById("property-type").innerHTML = "<b>Properity Type</b>: " + marker.data.property_type;
  document.getElementById("community-area-name").innerHTML = "<b>Community Area Name</b>: " + marker.data.community_area;
  document.getElementById("distance").innerHTML = "<b>Distance</b>: " + marker.distance.toFixed(2) + "km";
  document.getElementById("address").innerHTML = "<b>Address</b>: " + marker.data.address;
  document.getElementById("management_company").innerHTML = "<b>Management Company</b>: " + marker.data.management_company;
  document.getElementById("phone-number").innerHTML = "<b>Phone Number</b>: " + marker.data.phone_number;
}

// Show data of crimes in information section
function crimes(community_area_number){
  $.ajax({
    url: 'https://data.cityofchicago.org/resource/6zsd-86xi.json?$query=SELECT community_area, count(community_area) WHERE community_area = \'' + community_area_number + '\' AND year = 2017 GROUP BY community_area',
    type: "GET",
    data: {
      "$$app_token" : "ONMw6rs4vX99YkE7M5cOetVo9"
  }
  }).done(function(data) {
    if (community_area_number != undefined) {
      document.getElementById("crimes-2017").innerHTML = "<b>Number of crimes in 2017 in the community</b>: " + data[0].count_community_area;
    } else {
      document.getElementById("crimes-2017").innerHTML = "<b>Number of crimes in 2017 in the community</b>: undefined";
    }
  });
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
  // var position = new google.maps.LatLng(marker.data.latitude, marker.data.longitude);
  // map.setCenter(position);
  scroll(marker.item);
}

// help scroll list
function scroll(item){
  $("#list").scrollTop(item.scroll);
}

// Order list by distance
function orderByDistance() {
  document.getElementById("list").innerHTML = "";
  markers.sort(function(a, b){return b.distance - a.distance});
  createItems();
  clickList(markers[markers.length - 1].item);
  scroll(markers[markers.length - 1].item);
}

// create items and append to listItem
function createItems(){
  scrollCount = 0;
  for (var i = markers.length - 1; i >= 0; i--) {
  var listItem = document.createElement("a");
      listItem.setAttribute("class","list-group-item");
      listItem.setAttribute("onclick","clickList(this)");
      listItem.innerHTML = "<h4 class=list-group-item-heading>" + markers[i].data.property_name +"</h4>" + "<p class=list-group-item-text>" + "<span class=\'label label-info\'>" + "Distance: " + markers[i].distance.toFixed(2) + "km" +"</span>" + "</p>";
      // listItem.innerHTML = "<h4 class=list-group-item-heading>" + markers[i].data.property_name +"</h4>" + "<p class=list-group-item-text>" + "Distance: " + markers[i].distance.toFixed(2) + "km" +"</p>";
      listItem.marker = markers[i];
      $("#list").append(listItem);

      // Association between markers and listItem
      markers[i].item = listItem;

      // Set scroll control
      listItem.scroll = scrollCount;
      scrollCount += 63;    
  }
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
  if ((document.getElementById("policeStation").innerHTML) == "Show Police Station") {
    document.getElementById("policeStation").innerHTML = "Hide Police Station";
    showMarkers(police);
  } else {
    document.getElementById("policeStation").innerHTML = "Show Police Station";
    if (prev_infowindow_p != undefined) {
      prev_infowindow_p.close();
    }
    clearMarkers(police);
  }
}

// markers Librarys
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

// button "Librarys"
function librarys(){
  if ((document.getElementById("librarys").innerHTML) == "Show Librarys") {
    document.getElementById("librarys").innerHTML = "Hide Librarys";
    showMarkers(library);
  } else {
    document.getElementById("librarys").innerHTML = "Show Librarys";
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

// parse xml to json
function xml2json(xml) {
  try {
    var obj = {};
    if (xml.children.length > 0) {
      for (var i = 0; i < xml.children.length; i++) {
        var item = xml.children.item(i);
        var nodeName = item.nodeName;

        if (typeof (obj[nodeName]) == "undefined") {
          obj[nodeName] = xml2json(item);
        } else {
          if (typeof (obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];

            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xml2json(item));
        }
      }
    } else {
      obj = xml.textContent;
    }
    return obj;
  } catch (e) {
      console.log(e.message);
  }
}