'use client'

import Image from "next/image";
import {useState, useEffect} from "react";
import '@geoapify/geocoder-autocomplete/styles/round-borders.css';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from '@geoapify/react-geocoder-autocomplete';



export default function Home() {
  
	//Defaults coords to Orlando 
	const [city, setCity] = useState("Orlando, FL");
	const [lat, setLat] = useState(28.538336);
	const [lon, setLon] = useState(-81.379234);
	const [searchValue, setSearchValue] = useState("");

	//function to get user's city based on coordinates
	const getUserCity = async (lat, lon) => {

		var requestOptions = {
  			method: 'GET',
		};

		const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${process.env.NEXT_PUBLIC_REVERSE_GEOCODING_API_KEY}`, requestOptions)
  		.catch(error => console.log('error', error));

		const data = await response.json();
		setCity(data.features[0].properties.city + ", " + data.features[0].properties.state_code);
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

	const onPlaceSelect = async () => {
		
	}
	
	return(
		<div className="main-container">
			<div className="small-display">
				<div className="search-container">
					<GeoapifyContext apiKey={process.env.NEXT_PUBLIC_REVERSE_GEOCODING_API_KEY}>
						<GeoapifyGeocoderAutocomplete
							placeholder="Enter city here"
							skipIcons={true}
							debounceDelay={600}
							skipSelectionOnArrowKey={true}
							value={searchValue}
							filterByCountryCode={['us']}
							placeSelect={onPlaceSelect}
						/>
					</GeoapifyContext>
				</div>
			</div>
			<div className="big-display">

			</div>
		</div>
	)
	
}
