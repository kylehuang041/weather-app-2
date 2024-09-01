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
import { ExpandableCards } from "@/components/History";
import { weatherFormHeader, textColor } from "@/data";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collisions";
import React, { useState } from 'react'
import { historyHeader } from "@/data"


export const HistoryContext = React.createContext(null);

export default function Home() {
  const [history, setHistory] = useState([]);

  return (
    <HistoryContext.Provider value={[ history, setHistory ]}>
      <BackgroundBeamsWithCollision>
        <main className={`${textColor} w-full h-[100%] flex flex-col gap-7`}>
          <Navbar />
          <Wrapper className="mt-[10rem] w-full h-full">
            <Hero className="shadow-lg bg-[#0f0f0f]" />
            <Form className="max-w-2xl mx-auto" value={weatherFormHeader} />
            <ExpandableCards
              value={historyHeader}
              className="min-h-[500px] shadow-lg overflow-y-scroll h-full max-w-2xl mx-auto p-4 my-8 border border-black rounded-lg"
            />
          </Wrapper>
          <Footer />
        </main>
      </BackgroundBeamsWithCollision>
    </HistoryContext.Provider>
  );
}
