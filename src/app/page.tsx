/**
 * @brief Code of the home page
 * @author Kyle Huang
 * @date 8/28/2024
 * @version 0.1
 */

"use client";

import Navbar from "@/components/Navbar";
import Wrapper from "@/components/Wrapper";
import Hero from "@/components/Hero";
import Form from "@/components/WeatherForm";
import Footer from "@/components/Footer";
import { weatherFormHeader, weatherDisplayHeader, textColor } from "@/data";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collisions";
import WeatherDisplay from "@/components/WeatherDisplay";
import React, { useState } from "react";

export const WeatherContext = React.createContext<[any, React.Dispatch<React.SetStateAction<any>>]>([null, () => {}]);

export default function Home() {
  const [data, setData] = useState<any>(null);

  return (
    <WeatherContext.Provider value={[data, setData]}>
      <BackgroundBeamsWithCollision>
        <main className={`${textColor} w-full h-full flex flex-col gap-7`}>
          <Navbar />
          <Wrapper className="mt-[10rem] w-full h-full">
            <Hero className="shadow-lg bg-[#0f0f0f]" />
            <Form className="max-w-2xl mx-auto" value={weatherFormHeader} />
            <WeatherDisplay className="max-w-2xl mx-auto" value={weatherDisplayHeader} />
          </Wrapper>
          <Footer />
        </main>
      </BackgroundBeamsWithCollision>
    </WeatherContext.Provider>
  );
}
