var google_map;
var google_map_marker;

function initMap() {
	var cen = {lat:37.551903, lng:126.991726};
	google_map = new google.maps.Map(document.getElementById('googlemap'), {
		center : cen,
		zoom: 14
	});
	google_map_marker = new google.maps.Marker({
		position : cen,
		map: google_map
	});
}

function moveToDarwin(name){
	map.setCenter(name);
	marker.setPosition(name);
}

function hi(){
    alert('hi');
}

