/**
 * @brief Wrapper for weather api
 * @author Kyle Huang
 * @date 8/28/2024
 * @version 0.1
 */

/**
 * @brief Fetches the current weather information from the API.
 * @param {Object} params - Parameters for the weather API request.
 * @param {string} [params.city] - The city name (optional).
 * @param {string} [params.country] - The country code (optional).
 * @param {string} [params.latitude] - The latitude coordinate (optional).
 * @param {string} [params.longitude] - The longitude coordinate (optional).
 * @returns {Promise<Object>} - A promise that resolves to the weather data object.
 */
const getWeatherWrapper = async ({city, country, latitude: lat, longitude: lon} : {city?: string; country?: string; latitude?: string; longitude?: string;}) => {
  const cityOrCountry = city || country;
  const latAndLon = lat && lon;

  if (country && !city) throw new Error("You cannot just pass in country.");

  // check if inputs are not empty
  if (cityOrCountry || latAndLon) {
    // check if latitude and longitude are in the right range
    if (latAndLon && (parseFloat(lat) < -90 || parseFloat(lat) > 90 || parseFloat(lon) < -180 || parseFloat(lon) > 180)) {
      throw new Error('Invalid latitude or longitude');
    }

    // fetch data with API call
    let response: Response | undefined;
    const query = cityOrCountry ? `/api/weather?cityCountry=${encodeURIComponent(city || "Seattle")},${country}` : `/api/weather?lat=${lat}&lon=${lon}`;
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

export default getWeatherWrapper;