const getWeatherInfo = async (location: string) => {
  console.log(location)
  let city: string | undefined;
  let lat: string | undefined;
  let lon: string | undefined;

  // parse location to city or latitude and longitude
  if (location.includes(",")) {
    const coords = location.split(",");
    lat = coords[0];
    lon = coords[1];
  } else {
    city = location;
  }
  console.log(city, lat, lon);

  // check if inputs are not empty
  if (city || (lat && lon)) {
    // check if latitude and longitude are in the right range
    if (lat && lon && (parseFloat(lat) < -90 || parseFloat(lat) > 90 || parseFloat(lon) < -180 || parseFloat(lon) > 180)) {
      throw new Error('Invalid latitude or longitude');
    }

    // fetch data with API call
    let response: Response | undefined;
    response = await fetch(city ? `/api/weather?city=${encodeURIComponent(city)}` : `/api/weather?lat=${lat}&lon=${lon}`, {
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