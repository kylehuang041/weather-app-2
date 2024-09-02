/**
 * @brief This component displays weather content
 * @author Kyle Huang
 * @date 9/1/2024
 * @version 0.1
 */


"use client";

import { Boxes } from "@/components/ui/background-boxes";
import ShimmerButton from "./ui/shimmer-button";
import Link from 'next/link';
import { useState, useEffect } from "react";

const Hero = ({ className }: { className?: string }) => {
  const [dateTime, setDateTime] = useState<string>(new Date().toLocaleString());

  useEffect(() => {
    // Function to update the dateTime state
    const updateDateTime = () => {
      setDateTime(new Date().toLocaleString());
    };

    // Set up a timer to update dateTime every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Cleanup function to clear the timer
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`${className} relative h-[80vh] w-full overflow-hidden`}>
      {/* Box Background */}
      <Boxes
        rows={50}
        cols={40}
        className="mt-[3rem] sm:mt-[4rem] bottom-5 lg:ml-[10rem]"
      />

      {/* Text Section */}
      <div
        className={`absolute left-20 top-10 sm:left-25 sm:top-20 md:left-40 md:top-40 lg:left-[35rem] lg:top-[10rem] transform bg-pink skew-x-[-24deg] skew-y-[14deg] bg-black-500 w-[40%]`}
      >
        <h2 className="relative leading-1 border rounded-lg p-2 sm:p-5 md:p-10 lg:p-3 w-full bg-[#ffffff] text-black font-bold text-2xl md:text-4xl lg:text-6xl">
          Get The Current Weather <em>Around The World</em>
        </h2>

        <h3 className="text-4xl mt-10 w-full">{dateTime}</h3>
      </div>

      {/* Link Section */}
      <Link href="/#weather-form" className={`absolute bottom-0 w-full transparent p-5 flex justify-center items-center`}>
        <ShimmerButton className="hover:scale-[102%] transition-transform duration-200" value={"Get Started"} />
      </Link>
    </div>
  );
};

export default Hero;
