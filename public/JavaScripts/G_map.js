let google_map_global;
let google_map_marker_initial;
let NamYang;
let marker_basket = [];


function initMap() {

	NamYang = {lat:37.6360028, lng:127.2165279};

	google_map_global = new google.maps.Map(document.getElementById('googlemap'), {
		center : NamYang,
		zoom: 14
	});

	google_map_marker_initial = new google.maps.Marker({
		position : NamYang,
		map: google_map_global
	});
}

function MOVE_TO_SELECTED_BUSSTOP(BS_ID) {
	
	$.ajax({

		type: "GET",
		url: "/system/location_call?BS_ID="+BS_ID,
		dataType: "JSON",
		success: function (response) {
			// alert(JSON.stringify(response));
			let LatLng = new google.maps.LatLng(response);			
			google_map_global.panTo(LatLng);
			markerPush(LatLng,BS_ID);
			
		}

	});

}

function markerPush(LatLng,BS_ID){
	
    let google_map_marker = new google.maps.Marker({
		position : LatLng,
		draggable : false,
		animation: google.maps.Animation.DROP,
		map: google_map_global
	});

	google_map_marker.setAnimation(google.maps.Animation.BOUNCE);
	google_map_marker.setMap(google_map_global);
	
	let marker_basket_item = {};
	marker_basket_item.BS_ID = BS_ID;
	marker_basket_item.MARKER_OBJECT = google_map_marker;

	marker_basket.push(marker_basket_item);
}

function markerPop(BS_ID) {
	
	// [{},{}]
	marker_basket.forEach((element,index,array) => {
		if(element.BS_ID == BS_ID){
			element.MARKER_OBJECT.setMap(null);
			array.splice(index,1);
		}

	});

	if(marker_basket.length == 0){
		google_map_global.panTo(NamYang);
	}

}

