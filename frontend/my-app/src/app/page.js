import Image from "next/image";
import navigator from "react";
import axios from 'axios';

export default function Home() {
  
	//Defaults coords to Orlando 
	const city = "Orlando";
	const location = {lat: 28.538336, 
					  lon: -81.379234}

	if('geolocation' in navigator){
		
		navigator.geolocation.getCurrentPosition(position => {
			location.lat = position.coords.lat;
			location.lon = position.coords.lon
		});

		getUserCity();
	}
	
	const getUserCity = async () => {
		const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lon}&format=json`, {
      		headers: {
        			'User-Agent': 'Clear Cast', // Nominatim requires this!
       				'Accept-Language': 'en',
     				},
		}).catch(e => {
			console.log(e);
		});

		const data = await response.json();
		console.log(data);
		city = data.address.city;
	};
	
}
