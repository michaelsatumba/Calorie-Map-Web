// alert('hello');

mapboxgl.accessToken =
	'pk.eyJ1IjoibWljaGFlbHNhdHVtYmFtYXBzIiwiYSI6ImNrdm15Z204YjAzajIyb3F2YWRkcjFuaWQifQ.X0jvoZunwGoLmk00y6CNog';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
	enableHighAccuracy: true,
});

function successLocation(position) {
	console.log(position);
	setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
	setupMap([-122.4194, 37.7749]);
}

function setupMap(center) {
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: center,
		zoom: 15,
	});

	const nav = new mapboxgl.NavigationControl();
	map.addControl(nav);

	var directions = new MapboxDirections({
		accessToken: mapboxgl.accessToken,
	});

	map.addControl(directions, 'top-left');
}

// window.onload = function () {
// 	findMe();
// };

/*
// location logic
function findMe() {
	// const status = document.querySelector('.place');

	function success(position) {
		// console.log(position);
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		// alert(latitude + ' ' + longitude);
		const geoURL =
			'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en';

		fetch(geoURL)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				// console.log(data.city);
				// status.textContent = `In ${data.city}, ${data.countryName}`;
				// document.querySelector('.currentPlace').textContent = `${data.city}`;
			});
	}

	function error(showError) {
		// status.textContent = `I'm going to find you`;
		// document.querySelector(
		// 	'.currentPlace'
		// ).textContent = `I'm still going to find you`;
		console.log(data);
	}

	navigator.geolocation.getCurrentPosition(success, error);
}
*/
