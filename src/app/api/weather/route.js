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
     * @param {number} lon - Longitude.
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
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?";
    const weatherApiKey = process.env.OPENWEATHERMAP_API_KEY;
    const weatherApiUrlFull = `${weatherApiUrl}${city ? `q=${city}` : (lat && lon ? `lat=${lat}&lon=${lon}` : '')}&appid=${weatherApiKey}`;
    console.log(weatherApiUrlFull)

    const response = await fetch(weatherApiUrlFull); // fetch weather data
    if (!response.ok) { // check if response is valid
      return new NextResponse(JSON.stringify({ error: 'Failed to fetch weather data' }), { status: CLI_ERR });
    }
    const weatherData = await response.json(); // parse data as json

    return new NextResponse(JSON.stringify({ // send data to client
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
    }), {
      status: OK,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    if (debug) {
      console.error('Error fetching weather data:', error);
    }
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch weather data' }), { status: SERV_ERR });
  }
};