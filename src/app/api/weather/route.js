/**
 * @brief Code for fetching weather information using OpenWeatherMap API
 * @author Kyle Huang
 * @date 8/28/2024
 * @version 0.1
 */

import { NextResponse } from 'next/server'

const debug = process.env.DEBUG_MODE === 'true';
const OK = 200;
const SERV_ERR = 500;
const CLI_ERR = 400;

export const GET = async (req) => {
  try {
    /**
     * OpenWeatherMap API
     * @link https://openweathermap.org/current
     * @param {number} lat - Latitude.
     * @param {number} lon - lonitude.
     * @param {string} appid - API key.
     * @return {JsonObject} - Weather data = {
     *   city {string},
     *   temperature {number},
     *   description {string},
     *   icon {string},
     *   country {string},
     *   lon {string},
     *   lat {string},
     *   timezone {string},
     *   humidity {string},
     *   temp_min {string},
     *   temp_max {string},
     *   wind_speed {string},
     * }
     */
    const url = new URL(req.url);
    const city = url.searchParams.get('city');
    const lat = url.searchParams.get('lat');
    const lon = url.searchParams.get('lon');
    const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?";
    const weatherApiKey = process.env.OPENWEATHERMAP_API_KEY;
    const weatherApiUrlFull = `${weatherApiUrl}${city ? `q=${city}` : ''}${lat ? `,${lat},${lon}` : ''}&appid=${weatherApiKey}`;

    if (city || (lat && lon)) {
      const response = await fetch(weatherApiUrlFull);
      if (!response.ok) {
        return NextResponse(JSON.stringify({ error: 'Failed to fetch weather data or you misspelled' }), { status: CLI_ERR });
      }
      const weatherData = await response.json();

      return NextResponse.json({
        city: weatherData.name,
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        country: weatherData.sys.country,
        lon: weatherData.coord.lon,
        lat: weatherData.coord.lat,
        timezone: weatherData.timezone,
        humidity: weatherData.main.humidity,
        temp_min: weatherData.main.temp_min,
        temp_max: weatherData.main.temp_max,
        wind_speed: weatherData.wind.speed,
        icon: weatherData.weather[0].icon,
      }, {
        status: OK,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return NextResponse(JSON.stringify({ error: 'Check your input, it either requires city or both lat and lon' }), { status: CLI_ERR });
    }
  } catch (error) {
    if (debug) {
      console.error('Error fetching weather data:', error);
    }
    return NextResponse(JSON.stringify({ error: 'Failed to fetch weather data' }), { status: SERV_ERR });
  }
};