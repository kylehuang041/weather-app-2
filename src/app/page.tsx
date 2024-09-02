/**
 * @brief Code of the home page
 * @author Kyle Huang
 * @date 8/28/2024
 * @version 0.1
 */

"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WeatherForm from "@/components/WeatherForm";
import Footer from "@/components/Footer";
import { weatherFormHeader, weatherDisplayHeader, textColor } from "@/data";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collisions";
import WeatherDisplay from "@/components/WeatherDisplay";
import { ContentWrapper } from "@/contexts/Content";

export default function Home() {
  return (
    <main className={`${textColor} w-full h-full flex flex-col gap-7`}>
      <BackgroundBeamsWithCollision>
        <Navbar />
        <ContentWrapper className="mt-[10rem] w-full h-full">
          <Hero className="shadow-lg bg-[#0f0f0f]" />
          <WeatherForm
            className="max-w-2xl mx-auto w-fit sm:w-full"
            value={weatherFormHeader}
          />
          <WeatherDisplay
            className="max-w-2xl mx-auto w-fit sm:w-full"
            value={weatherDisplayHeader}
          />
        </ContentWrapper>
        <Footer />
      </BackgroundBeamsWithCollision>
    </main>
  );
}
