/**
 * @brief This component has the form for calling the Weather API to fetch weather by city
 * @author Kyle Huang
 * @date 8/28/2024
 * @version 0.1
 */

"use client";

import LabelInputContainer from "./LabelInputContainer";
import { textColor } from "@/data";
import MagicButton from "@/components/ui/magic-button";
import { useState, useEffect, useContext, useRef } from "react"
import { HistoryContext } from "@/app/page";
import getWeatherInfo from "@/lib/weatherApiCall"
import { useUser } from "@clerk/nextjs";


/**
 * @brief A form component to get weather information
 * @returns Weather Form
 */
const Form = ({
  className = "",
  value = "",
}: {
  className?: string;
  value?: string;
}) => {
  const [location, setLocation] = useState<any>({
    city: "",
    latitude: "",
    longitude: "",
  });
  const [error, setError] = useState('')
  const [history, setHistory] = useContext(HistoryContext);
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useUser();

  const handleChange = (e: any) => {
    e.preventDefault();
    setLocation(() => {
      return {
        ...location,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await getWeatherInfo(location.city || `${location.latitude},${location.longitude}`);
      if (data) {
        setHistory((prevHistory: any[]) => [
          ...prevHistory,
          {
            name: `${data.city}-${data.country}-${data.lat}-${data.lon}`,
            data: data
          }
        ]);

        if (!user) { // if not logged in, save history into local storage
          localStorage.setItem("local_history", JSON.stringify(history));
        }

        // clear data
        if (formRef.current) {
          formRef.current.reset();
        }
        setLocation({
          city: "",
          latitude: "",
          longitude: "",
        });
        setError('');
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <form
      id="weather-form"
      onSubmit={handleSubmit}
      ref={formRef}
      className={`${className} ${textColor} p-4 my-8 mx-4 border border-black shadow-[0px_2px_3px_5px_rgba(0,0,0,0.1)] hover:shadow-[0px_2px_3px_5px_rgba(0,0,0,0.05)] rounded-lg`}
    >
      <h2 className={`mb-4 text-bold text-4xl`}>{value}</h2>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-3">
        <div className="col-span-1">
          <LabelInputContainer onChange={handleChange} value={"City"} />
        </div>
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-2">
          <LabelInputContainer onChange={handleChange} value={"Latitude"} />
          <LabelInputContainer onChange={handleChange} value={"Longitude"} />
        </div>
      </div>

      <MagicButton type="submit" className="mt-4" value="Submit &rarr;" />
      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}
    </form>
  );
};

export default Form;