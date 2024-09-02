/**
 * @brief This component displays weather content
 * @author Kyle Huang
 * @date 9/1/2024
 * @version 0.1
 */

import Image from "next/image";
import { textColor, weatherIconSize } from "@/data";
import { useEffect } from "react";
import { CardItem, CardBody, CardContainer } from "@/components/ui/3d-card"
import { useContentContext } from "@/contexts/Content";
import getWeatherWrapper from "@/lib/weatherApiCall";


/**
 * @brief Shows weather content
 * @param className {string} - Optional CSS class for styling
 * @param value {string} - Display value for the weather content
 * @return JSX
 */
const WeatherDisplay = ({
  className,
  value,
}: {
  className?: string;
  value?: string;
}) => {
  const {data, setData} = useContentContext();

  useEffect(() => {
    const fetchData = async () => { // refresh weather info
      const localData = JSON.parse(localStorage.getItem("weatherData") || "null");
      if (localData) {
        const newData = await getWeatherWrapper({latitude: localData.lat, longitude: localData.lon})
        setData(newData);
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const latitudeStr = latitude.toString();
            const longitudeStr = longitude.toString();
            const newData = await getWeatherWrapper({latitude: latitudeStr, longitude: longitudeStr})
            setData(newData);
          });
        }
      }
    };

    fetchData();
  }, [setData]);

  return (
    <div
      className={`${className} ${textColor} min-h-[455px] p-4 my-8 mx-4 border border-black shadow-[0px_2px_3px_5px_rgba(0,0,0,0.1)] hover:shadow-[0px_2px_3px_5px_rgba(0,0,0,0.05)] rounded-lg`}
    >
      <h2 className={`mb-4 text-bold text-4xl text-center sm:text-left`}>{value}</h2>
      {data && Object.keys(data).length > 0 ? (
        <div className="flex flex-col md:flex-row w-full min-h-[50vh] space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 flex flex-col items-center justify-center">
            <CardContainer>
              <CardBody>
              <CardItem translateZ="100" className="">
                  <Image
                    src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                    width={weatherIconSize}
                    height={weatherIconSize}
                    alt="Weather Icon"
                    className="border border-white rounded-lg object-cover mb-4"
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
            <p className="font-bold text-2xl">{data.temperature}&deg;F</p>
            <p className="">{data.city}, {data.country}</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-left">
              <p>Description: <span>{data.description}</span></p>
              <p>Max Temperature: <span>{data.temp_max}&deg;F</span></p>
              <p>Min Temperature: <span>{data.temp_min}&deg;F</span></p>
              <p>Humidity: <span>{data.humidity}</span></p>
              <p>Wind Speed: <span>{data.wind_speed}</span></p>
              <p>Latitude: <span>{data.lat}</span></p>
              <p>Longitude: <span>{data.lon}</span></p>
            </div>
          </div>
        </div>
      ) : (
        <p>No location provided. Please fill out the weather form.</p>
      )}
    </div>
  );
};

export default WeatherDisplay;
