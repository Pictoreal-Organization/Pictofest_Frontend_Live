// "use client";

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { baseURL } from "@/app/api";
// import EventCard from "@/app/components/EventCard";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const dummyEvents = [
//     {
//     id: 1,
//     name: "Texture Art + Neon fluid painting",
//     price: 1200,
//   },
//   {
//     id: 2,
//     name: "Live Pottery",
//     price: 800,
//   },
//   {
//     id: 3,
//     name: "Pics-o-Reel",
//     price: 0,
//   },
//   {
//     id: 4,
//     name: "Coastal Crimes",
//     price: null,
//   },

// ];

// const Events = () => {
//   const [events, setEvents] = useState([]);

//   const getEvents = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/events/category/EVENTS`);
//       setEvents(response?.data?.data?.length ? response.data.data : dummyEvents);
//     } catch (err) {
//       console.log("API failed, using dummy data");
//       setEvents(dummyEvents);
//     }
//   };


//   {/*const getEvents = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/events/category/EVENTS`);
//       setEvents(response?.data?.data);
//     } catch (err) {
//       console.log(err?.response?.data?.message);
//     }
//   };*/}

//   useEffect(() => {
//     getEvents();
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <main className="relative min-h-screen overflow-x-hidden overflow-y-hidden">
//       {/* ============================================================
//           1. DYNAMIC BACKGROUND LAYER (FIXED)
//           ============================================================ */}
//       <div className="fixed top-0 left-0 w-full h-screen -z-10">
//         {/* Mobile Background */}
//         <div className="block md:hidden w-full h-full relative">
//           <Image
//             src="/img/common/general-mobile-bg.png"
//             alt="Mobile Background"
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>

//         {/* Desktop Background */}
//         <div className="hidden md:block w-full h-full relative">
//           <Image
//             src="/img/common/desktop-bg.png"
//             alt="Desktop Background"
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-6 lg:gap-8 justify-center items-center lg:py-14 py-8 px-4">
//         <h1 className="text-4xl lg:text-5xl tracking-tight text-[#FBCC12] heading-font mt-15">
//           Events
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mt-2">
//           {events &&
//             events.map((event, index) => (
//               <motion.div
//                 key={event.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
//                 className="w-full"
//               >
//                 <EventCard data={event} index={index} />
//               </motion.div>
//             ))}
//         </div>
//       </div>

//       <motion.div
//         className="hidden lg:block fixed bottom-0 left-0 w-full z-0 pointer-events-none"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{
//           duration: 0.5,
//           delay: 0,
//           ease: "easeOut"
//         }}
//       >
//         <div className="relative w-full h-64">
//           <Image
//             src="/img/events/city_26.svg"
//             alt="City Skyline"
//             fill
//             className="object-contain object-bottom" 
//             priority={false}
//             sizes="100vw"
//           />
//         </div>
//       </motion.div>
//     </main>
//   );
// };

// export default Events;


"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "@/app/api";
import EventCard from "@/app/components/EventCard";
import { motion } from "framer-motion";
import Image from "next/image";

const Events = () => {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await axios.get(`${baseURL}/events/category/EVENT`);
      setEvents(response?.data?.data || []);
    } catch (err) {
      console.log(err?.response?.data?.message);
      setEvents([]); // no dummy – behaves like original
    }
  };

  useEffect(() => {
    getEvents();
    window.scrollTo(0, 0);
  }, []);

  const isOdd = events.length % 2 !== 0;

  return (
    <main className="relative min-h-screen overflow-x-hidden overflow-y-hidden">
      {/* Background Layer */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        {/* Mobile Background */}
        <div className="block md:hidden w-full h-full relative">
          <Image
            src="/img/common/general-mobile-bg.png"
            alt="Mobile Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Desktop Background */}
        <div className="hidden md:block w-full h-full relative">
          <Image
            src="/img/common/desktop-bg.png"
            alt="Desktop Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-6 lg:gap-8 justify-center items-center lg:py-14 py-8 px-4">
        <h1 className="text-4xl lg:text-5xl tracking-tight text-white heading-font mt-11">
          Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full">
          {events &&
            events.map((event, index) => {
              // Check if this is the last item and total count is odd
              const isLastAndOdd = isOdd && index === events.length - 1;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`w-full ${isLastAndOdd ? 'md:col-span-2 md:max-w-md md:mx-auto' : 'md:max-w-md md:mx-auto'}`}
                >
                  <EventCard data={event} index={index} />
                </motion.div>
              );
            })}
        </div>
      </div>

      <motion.div
        className="hidden lg:block fixed bottom-0 left-0 w-full z-0 pointer-events-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative w-full h-64">
          <Image
            src="/img/events/city_26.svg"
            alt="City Skyline"
            fill
            className="object-contain object-bottom"
            sizes="100vw"
          />
        </div>
      </motion.div>
    </main>
  );
};

export default Events;
