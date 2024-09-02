/**
 * @brief calls weather api to get current weather
 * @param location {string} - city,country=lat,lon
 */
const getWeatherInfo = async ({city, country, latitude, longitude, unit} : {city?: string; country?: string; latitude?: string; longitude?: string; unit: string | undefined;}) => {
  const cityOrCountry = city || country;
  const latAndLon = latitude && longitude;

  // check if inputs are not empty
  if (cityOrCountry || latAndLon) {
    // check if latitude and longitude are in the right range
    if (latAndLon && (parseFloat(latitude) < -90 || parseFloat(latitude) > 90 || parseFloat(longitude) < -180 || parseFloat(longitude) > 180)) {
      throw new Error('Invalid latitude or longitude');
    }

    // fetch data with API call
    let response: Response | undefined;
    const query = cityOrCountry ? `/api/weather?city=${encodeURIComponent(city ?? "Seattle")},${country}&units=${unit || 'imperial'}` : `/api/weather?lat=${latitude}&lon=${longitude}&units=${unit || 'imperial'}`;
    response = await fetch(query, {
      method: 'GET',
    });

    // check if response is valid
    if (!response || !response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json(); // convert data into json
    return data;
  } else {
    throw new Error('No valid location provided');
  }
}

export default getWeatherInfo;