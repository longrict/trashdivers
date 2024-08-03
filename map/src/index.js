let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
	center: { lat: -34.397, lng: 150.644 },
	zoom: 10,
	disableDoubleClickZoom: true,
        streetViewControl: false,
    });

    map.addListener('click', function(e) {
	placeMarker(e.latLng, map);
    });

    function placeMarker(position, map) {
	var marker = new google.maps.Marker({
            position: position,
            map: map
	});
	var content = '<div>' +
	    '<h2>Garbage Type</h2>' +
	    '<button id="option1">Metal</button>' +
	    '<button id="option2">Paper</button>' +
	    '</div>';
	var infoWindow = new google.maps.InfoWindow({
	    content: content
	});

	// Open the InfoWindow on marker click
	google.maps.event.addListener(marker, 'click', function() {
	    infoWindow.open(map, marker);
	});

	// Add event listeners to the options
	google.maps.event.addDomListener(document.getElementById('option1'), 'click', function() {
	    alert('Garbage type set to metal!');
	});
	google.maps.event.addDomListener(document.getElementById('option2'), 'click', function() {
	    alert('Garbage type set to paper!');
	});
	map.panTo(position);
    }
}

initMap();
