let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const mapCenter = new google.maps.LatLng(latitude, longitude);
    map.setCenter(mapCenter);

    const marker = new google.maps.Marker({
        position: mapCenter,
        map: map,
        title: "Your Location"
    });

    searchNearbyPlaces(latitude, longitude);
}

function searchNearbyPlaces(latitude, longitude) {
    const radius = 1000;
    const apiKey = 'AIzaSyCauBvST5zOEV-dZlQJ80318LJbC0Dz3Tk'; // Substitua pela sua chave de API da Google Places

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                data.results.forEach(place => {
                    addMarker(place);
                });
            } else {
                alert("No nearby places found.");
            }
        })
        .catch(error => console.error('Error fetching nearby places:', error));
}

function addMarker(place) {
    const marker = new google.maps.Marker({
        position: { lat: place.geometry.location.lat, lng: place.geometry.location.lng },
        map: map,
        title: place.name
    });

    const infowindow = new google.maps.InfoWindow({
        content: `<h3>${place.name}</h3>`
    });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}


//   AIzaSyCauBvST5zOEV-dZlQJ80318LJbC0Dz3Tk    //