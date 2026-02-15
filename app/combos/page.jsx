"use client";

import { useEffect, useState } from "react";
import ComboCard from "@/app/components/ComboCard";
import { combos } from "@/app/config/combos";
import { motion } from "framer-motion";
import Image from "next/image";

const Combos = () => {
  const [comboData, setComboData] = useState([]);

  useEffect(() => {
    setComboData(combos);
    window.scrollTo(0, 0);
  }, []);

  const isOdd = comboData.length % 2 !== 0;

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
          Combo Offers
        </h1>
        
        {/* Subtitle */}
        <p className="text-white/80 text-center text-sm lg:text-base max-w-2xl -mt-4">
          Save more with our exclusive combo packages!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full">
          {comboData &&
            comboData.map((combo, index) => {
              const isLastAndOdd = isOdd && index === comboData.length - 1;

              return (
                <motion.div
                  key={combo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.08, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className={`w-full ${
                    isLastAndOdd 
                      ? 'md:col-span-2 md:max-w-md md:mx-auto' 
                      : 'md:max-w-md md:mx-auto'
                  }`}
                >
                  <ComboCard data={combo} index={index} />
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

export default Combos;