// alert('hello');

window.onload = function () {
	findMe();
};

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
