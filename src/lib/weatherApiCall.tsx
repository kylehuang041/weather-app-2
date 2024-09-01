const getWeatherInfo = async (location: string) => {
  let city: string | undefined;
  let lat: number | undefined;
  let lon: number | undefined;
  if (location.includes(",")) {
    const coords = location.split(", ");
    lat = parseFloat(coords[0]);
    lon = parseFloat(coords[1]);
  } else {
    city = location;
  }
  let response: Response | undefined;
  if (city) {
    response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`, {
      method: 'GET',
    });
  } else if (lat && lon) {
    response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`, {
      method: 'GET',
    });
  }

  // Check if response is defined before accessing its properties
  if (!response || !response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  return data;
}

export default getWeatherInfo;