'use client'

import Image from "next/image";


export default function Home() {
  
	//Defaults coords to Orlando 
	var city = "Orlando";
	var location = {lat: 28.538336, 
					lon: -81.379234}

	//function to get user's city based on coordinates
	const getUserCity = async (lat, lon) => {

		var requestOptions = {
  			method: 'GET',
		};

		const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${process.env.NEXT_PUBLIC_REVERSE_GEOCODING_API_KEY}`, requestOptions)
  		.catch(error => console.log('error', error));

		const data = await response.json();
		city = data.features[0].properties.city;
	};

	
	if('geolocation' in navigator){
		
		navigator.geolocation.getCurrentPosition(position => {
			location.lat = position.coords.latitude;
			location.lon = position.coords.longitude;
		});

		getUserCity(location.lat, location.lon);
	}

	
	
}
