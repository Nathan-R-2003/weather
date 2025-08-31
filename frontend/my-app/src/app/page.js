'use client'

import Image from "next/image";
import {useState, useEffect} from "react";


export default function Home() {
  
	//Defaults coords to Orlando 
	const [city, setCity] = useState("Orlando");
	const [lat, setLat] = useState(28.538336);
	const [lon, setLon] = useState(-81.379234);

	//function to get user's city based on coordinates
	const getUserCity = async (lat, lon) => {

		var requestOptions = {
  			method: 'GET',
		};

		const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${process.env.NEXT_PUBLIC_REVERSE_GEOCODING_API_KEY}`, requestOptions)
  		.catch(error => console.log('error', error));

		const data = await response.json();
		setCity(data.features[0].properties.city);
	};

	useEffect(() => {
		if('geolocation' in navigator){
		
			navigator.geolocation.getCurrentPosition(position => {
				setLat(position.coords.latitude)
				setLon(position.coords.longitude);
			});

			getUserCity(lat, lon);
		}

		getForeCast(lat, lon)
	})

	const getForeCast = async (lat, lon) => {

		var requestOptions = {
  			method: 'GET',
		};

		const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`, requestOptions)
		.catch(error => console.log('error', error));

		const data = await response.json();

		const hourlyForecast = await fetch(data.properties.forecastHourly, requestOptions)
		.catch(error => console.log('error', error));

		const hourlyForecastData = await hourlyForecast.json();

		console.log(hourlyForecastData.properties.periods);

	}
	
	return(
		<p>{city}</p>
	)
	
}
