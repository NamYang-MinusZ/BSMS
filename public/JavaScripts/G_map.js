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

function markerAdder(){
    let TARGET_POS = {lat:37.6360028, lng:127.2165279};

    google_map_marker = new google.maps.Marker({
		position : TARGET_POS,
		map: google_map
	});
    
}

