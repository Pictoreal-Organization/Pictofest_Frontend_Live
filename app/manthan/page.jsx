"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "@/app/api";
import EventCard from "@/app/components/EventCard";
import { motion } from "framer-motion";

const Manthan = () => {
  const [manthanEvent, setManthanEvent] = useState(null); // Use a single object for "Manthan" event.

  const getWorkshops = async () => {
    try {
      const response = await axios.get(`${baseURL}/events/category/EVENTS`);
      const allEvents = response?.data?.data;
      // Filter the event with the name "Manthan"
      const manthan = allEvents.find(event => event.name === "Manthan");
      setManthanEvent(manthan);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getWorkshops();
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[url('/img/sponsor/background.png')] bg-cover min-h-dvh px-3">
      <div className="max-w-sm lg:max-w-4xl mx-auto flex flex-col lg:gap-1 gap-2 justify-center items-center lg:py-14 py-8">
        <h1 className="text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900 heading-font mt-20">
          MANTHAN
        </h1>
        {/* Render only if manthanEvent is available */}
        {manthanEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full" // Fixed width and height for card
          >
            <EventCard data={manthanEvent} />
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Manthan;
