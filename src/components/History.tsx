"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/components/hooks/use-outside-click";
import { IconTrash } from "@tabler/icons-react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { HistoryContext } from "@/app/page";
import { doc, collection, setDoc, getDoc } from "firebase/firestore";
import getWeatherInfo from "@/lib/weatherApiCall"


export function ExpandableCards({
  className,
  value,
}: {
  className?: string;
  value?: string;
}) {
  const [active, setActive] = useState<(typeof history)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const { user } = useUser();
  const [history, setHistory] = useContext(HistoryContext);

  useEffect(() => {
    if (user) { // if logged in with a user account, then save to firebase
      const clerkUserId = user.id;
      (async () => {
        const userRef = doc(db, "users", clerkUserId);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) { // create a clerk user id document if it doesn't exist already
          await setDoc(userRef, {
            [clerkUserId]: [] // collection of locations: city: string = city or coordinate: string = lat,lon.
          });
        } else {
          // save city or coordinate by clerk user id
          await setDoc(userRef, {
            [clerkUserId]: history.map((item: { data: { city?: string; lat: number; lon: number } }) => 
              item.data.city ? item.data.city : `${item.data.lat},${item.data.lon}`
            ),
          })
        }

        // Otherwise retrieve the fields using user id as the document
        const userHistory = await getDoc(userRef);
        const historyData = userHistory.data();

        // set history with the data retrieved
        setHistory(historyData);
      });
    } else { // use local storage if guest user or not logged in
      const localHistoryItem = localStorage.getItem("local_history");
      const local_history = JSON.parse(localHistoryItem || "[]");
      setHistory(local_history);
      console.log("history: ", history);
    }
  }, [user, history.length]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div id="history" className={className}>
      {/* Active Card */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.city}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.city}-${id}`}
              ref={ref}
              className="w-full max-w-[300px] h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.city}-${id}`}>
                {active.src && (
                  <Image
                    priority
                    width={100}
                    height={100}
                    src={active.src || ""}
                    alt={active.city}
                    className="w-full h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  />
                )}
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`city-${active.city}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.city}
                    </motion.h3>
                    <motion.p
                      layoutId={`temperature-${active.temperature}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.temperature}&deg; F
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.city}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-red-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <p>
                      Cloudy Humidity: <span>{active.humidity}</span>
                      <br />
                      Max Temperature: <span>{active.maxTemperature}</span>
                      <br />
                      Min Temperature: <span>{active.minTemperature}</span>
                      <br />
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Inactive card */}
      <ul className="max-w-2xl mx-auto w-full">
        <h2 className={`mb-4 text-bold text-4xl`}>{value}</h2>
        {history && history.length > 0 ? (
          history.map(
            (
              card: {
                city: string;
                temperature: string;
                src: string | undefined;
                ctaText: React.ReactNode;
              },
              index: number
            ) => (
              <motion.div
                key={`card-${card.city}-${id}`}
                layoutId={`card-${card.city}-${id}`}
                onClick={() => setActive(card)}
                className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
              >
                <div className="flex gap-4 flex-col md:flex-row">
                  <motion.div layoutId={`image-${card.city}-${id}`}>
                    {card.src && (
                      <Image
                        width={100}
                        height={100}
                        src={card.src || ""}
                        alt={card.city}
                        className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                      />
                    )}
                  </motion.div>
                  <div>
                    <motion.h3
                      layoutId={`city-${card.city}-${id}`}
                      className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                    >
                      {card.city}
                    </motion.h3>
                    <motion.p
                      layoutId={`temperature-${card.temperature}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                    >
                      {card.temperature}&deg; F
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  layoutId={`button-${card.city}-${id}`}
                  className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-red-500 hover:text-white text-black mt-4 md:mt-0"
                >
                  {card.ctaText}
                </motion.button>
              </motion.div>
            )
          )
        ) : (
          <p className="text-center text-neutral-500 dark:text-neutral-400">
            No history found
          </p>
        )}
      </ul>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    temperature: "71", // temperature
    city: "Seattle", // city
    src: "https://openweathermap.org/img/wn/10d@2x.png",
    ctaText: <IconTrash />,
    ctaLink: () => {
      console.log("removed");
      alert("removed");
    },
    // Replace content function with variables
    humidity: 67,
    maxTemperature: 296.56,
    minTemperature: 292.41,
  },
  // {
  //   temperature: "Babbu Maan",
  //   city: "Mitran Di Chhatri",
  //   src: "",
  //   ctaText: "Play",
  //   ctaLink: "https://ui.aceternity.com/templates",
  //   content: () => {
  //     return (
  //       <p>
  //         Babu Maan, a legendary Punjabi singer, is renowned for his soulful
  //         voice and profound lyrics that resonate deeply with his audience. Born
  //         in the village of Khant Maanpur in Punjab, India, he has become a
  //         cultural icon in the Punjabi music industry. <br /> <br /> His songs
  //         often reflect the struggles and triumphs of everyday life, capturing
  //         the essence of Punjabi culture and traditions. With a career spanning
  //         over two decades, Babu Maan has released numerous hit albums and
  //         singles that have garnered him a massive fan following both in India
  //         and abroad.
  //       </p>
  //     );
  //   },
  // },

  // {
  //   temperature: "Metallica",
  //   city: "For Whom The Bell Tolls",
  //   src: "",
  //   ctaText: "Play",
  //   ctaLink: "https://ui.aceternity.com/templates",
  //   content: () => {
  //     return (
  //       <p>
  //         Metallica, an iconic American heavy metal band, is renowned for their
  //         powerful sound and intense performances that resonate deeply with
  //         their audience. Formed in Los Angeles, California, they have become a
  //         cultural icon in the heavy metal music industry. <br /> <br /> Their
  //         songs often reflect themes of aggression, social issues, and personal
  //         struggles, capturing the essence of the heavy metal genre. With a
  //         career spanning over four decades, Metallica has released numerous hit
  //         albums and singles that have garnered them a massive fan following
  //         both in the United States and abroad.
  //       </p>
  //     );
  //   },
  // },
  // {
  //   temperature: "Led Zeppelin",
  //   city: "Stairway To Heaven",
  //   src: "",
  //   ctaText: "Play",
  //   ctaLink: "https://ui.aceternity.com/templates",
  //   content: () => {
  //     return (
  //       <p>
  //         Led Zeppelin, a legendary British rock band, is renowned for their
  //         innovative sound and profound impact on the music industry. Formed in
  //         London in 1968, they have become a cultural icon in the rock music
  //         world. <br /> <br /> Their songs often reflect a blend of blues, hard
  //         rock, and folk music, capturing the essence of the 1970s rock era.
  //         With a career spanning over a decade, Led Zeppelin has released
  //         numerous hit albums and singles that have garnered them a massive fan
  //         following both in the United Kingdom and abroad.
  //       </p>
  //     );
  //   },
  // },
  // {
  //   city: "Seattle",
  //   temperature: "Cloudy",
  //   src: `https://openweathermap.org/img/wn/01d@2x.png`,
  //   ctaText: "Select",
  //   ctaLink: "",
  //   content: () => {
  //     return (
  //       <p>
  //         Country<span>United States</span>
  //         Humidity<span>67</span>
  //         Max Temperature<span>296.56</span>
  //         Min Temperature<span>292.41</span>
  //       </p>
  //     );
  //   },
  // },
];
