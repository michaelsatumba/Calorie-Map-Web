// alert('hello');

const weight = document.getElementById('weight');

mapboxgl.accessToken =
	'pk.eyJ1IjoibWljaGFlbHNhdHVtYmFtYXBzIiwiYSI6ImNrdm15Z204YjAzajIyb3F2YWRkcjFuaWQifQ.X0jvoZunwGoLmk00y6CNog';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
	enableHighAccuracy: true,
});

function successLocation(position) {
	// console.log(position);
	setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
	setupMap([-122.4194, 37.7749]);
}

function setupMap(center) {
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v9',
		center: center,
		zoom: 15,
	});

	const nav = new mapboxgl.NavigationControl();
	map.addControl(nav);

	const directions = new MapboxDirections({
		accessToken: mapboxgl.accessToken,
		unit: 'imperial',
		profile: 'mapbox/walking',
		alternatives: true,
		congestion: true,
		// geocoder:
	});

	map.on('load', function () {
		directions.setOrigin('Oxnard'); // On load, set the origin.
		directions.setDestination('Ventura'); // On load, set the destination.
	});

	directions.on('route', function (e) {
		// console.log(e.route); // Logs the current route shown in the interface.
		// console.log(e.route[0].distance); // Logs the distance in meters
		// const distanceMeters = e.route[0].distance;
		// const distanceMiles = distanceMeters * 0.000621;
		// console.log(distanceMiles); // Logs the distance in miles.
		// console.log(e.route[0].duration); // Logs the duration in seconds.
		const seconds = e.route[0].duration;
		const minutes = seconds / 60;
		// console.log(minutes); // Logs the duration in minutes.
		weight.addEventListener('input', () => {
			// alert(weight.value);
			// console.log(weight.value);
			let x = weight.value;
			let y = minutes;
			// console.log(x);
			// console.log(y);
			let result = ((3.5 * (x * 0.45359237) * 3.5) / 200) * y;
			document.getElementById('caloriesExpended').innerHTML =
				Math.floor(result);
		});
	});

	map.addControl(directions, 'top-left');

	// Calories burned per minute = (MET x body weight in Kg x 3.5) ÷ 200
	// Calories burned = ((MET x body weight in Kg x 3.5) ÷ 200) * minute
	// MET walking = 3
	// lbs to kg = lbs * 0.45359237
	//EXAMPLE
	/*
		const weight = 160 
		const walkingMins = 60
        ((3 * (160 * 0.45359237) * 3.5 ) / 200) * 60
	*/
}
