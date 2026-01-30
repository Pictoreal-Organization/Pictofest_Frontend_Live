"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import About from "@/app/components/About";
import Events from "@/app/components/Events";
import Footer from "@/app/components/Footer";
import PrizePool from "./components/PrizePool";
import { useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const CURRENT_DB_VERSION = "2.0";
    const storedVersion = localStorage.getItem("dbVersion");
    if (storedVersion !== CURRENT_DB_VERSION) {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("dbVersion", CURRENT_DB_VERSION);
    }

    const handleScroll = () => {
      // Hide the badge after scrolling 50px
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.main
      className="relative min-h-screen w-full overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* ============================================================
          1. BACKGROUND LAYER
         ============================================================ */}
      <div className="absolute top-0 left-0 w-full -z-10 bg-[#1f024e] h-full object-cover">
        <div
          className="
            block lg:hidden
            w-full h-full
            bg-[url('/img/home/mobile-bg.png')]
            bg-repeat-y
            bg-top
            bg-[length:100%_auto]
          "
        />

        <div className="hidden lg:block w-full relative">
          <Image
            src="/img/home/desktop-bg.png"
            alt="Desktop Background"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* ============================================================
          2. HERO SECTION
         ============================================================ */}
      <div className="relative h-screen flex flex-col justify-start items-center pt-24 lg:pt-32">
        {/* --- A. LOGO WRAPPER --- */}
        <div className="relative z-20 flex flex-col items-center gap-2">
          {/* --- EARLY BIRD FLOATING BADGE --- */}
          {/* Desktop: Top Right of Logo */}
          <motion.div
            className="hidden md:block absolute -right-20 -top-12 z-30"
            initial={{ scale: 0, rotate: 15 }}
            animate={{ scale: 1, rotate: -10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
            onClick={() => toast.info("Ask at Desk for Offers")}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-full p-1 shadow-2xl">
                <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-full px-6 py-5 flex flex-col items-center justify-center min-w-[130px] border-2 border-yellow-200/20">
                  <span className="text-white font-bold text-[11px] uppercase tracking-widest leading-none drop-shadow-md">Early Bird</span>
                  <span className="text-yellow-300 font-black text-2xl uppercase italic leading-none mt-1 drop-shadow-lg">OFFER!</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile: Floating Bottom Left (Avoiding Hamburger & Ribbon) */}
          <motion.div
            className="md:hidden fixed bottom-50 left-4 z-[100]"
            initial={{ x: -100, opacity: 0 }}
            /* This part handles the hiding on scroll */
            animate={{
              x: isScrolled ? -100 : 0,
              opacity: isScrolled ? 0 : 1
            }}
            transition={{
              x: { type: "spring", stiffness: 100 },
              opacity: { duration: 0.3 }
            }}
            onClick={() => toast.info("Ask at Desk for Offers")}
          >
            <div className="relative flex items-center">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-orange-600 rounded-full blur-lg opacity-50 animate-pulse"></div>

              <div className="relative bg-gradient-to-r from-red-600 to-orange-500 rounded-full py-2 px-4 shadow-lg border border-yellow-400/50 flex items-center gap-2">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[8px] uppercase select-none pointer-events-none leading-none">Early Bird</span>
                  <span className="text-yellow-200 font-black text-[12px] uppercase select-none pointer-events-none leading-none">OFFER LIVE</span>
                </div>
                {/* Small Pulsing Dot */}
                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              </div>
            </div>
          </motion.div>

          {/* 1. Ribbon */}
          <div className="w-64 md:w-80 transition-transform hover:scale-105 duration-500">
            <Image
              src="/img/home/pictoreal-presents.png"
              alt="Pictoreal Presents"
              width={400}
              height={100}
              className="w-full h-auto drop-shadow-lg"
              priority
            />
          </div>

          {/* 2. Main Logo */}
          <div className="relative z-20 w-72 md:w-150 transition-transform hover:scale-105 duration-500">
            <Image
              src="/img/common/final_logo.png"
              alt="Pictofest Logo"
              width={600}
              height={300}
              className="w-full mt-2 md:mt-0 h-auto drop-shadow-2xl"
              priority
            />
          </div>

          {/* -------------------------------------------------------
              3. ANIMATION A: MOBILE VIEW ONLY (Centered)
              - block md:hidden: Shows on mobile, hides on desktop
              - New Image Path assumed: /img/home/mobile-dates-pot.png
              - Centered: left-1/2 -translate-x-1/2
             ------------------------------------------------------- */}
          <motion.div
            className="block md:hidden absolute left-[51%] -translate-x-1/2 top-[70%] -z-10 w-[60vw]"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 2,
              type: "spring",
              bounce: 0.5,
            }}
          >
            <Image
              src="/img/home/date_vector_mobile.svg" // <--- RENAME THIS TO YOUR NEW MOBILE IMAGE FILE
              alt="Mobile Dates"
              width={350}
              height={350}
              className="w-full h-auto drop-shadow-xl"
            />
          </motion.div>

          {/* -------------------------------------------------------
              3. ANIMATION B: DESKTOP VIEW ONLY (Right Corner)
              - hidden md:block: Hides on mobile, shows on desktop
              - Old Image Path: /img/home/dates-and-pot.png
              - Right Aligned: right-0
             ------------------------------------------------------- */}
          <motion.div
            className="absolute top-[55%] left-90 -z-10"
            initial={{ y: -300, opacity: 0 }} // Start high up (like up the thread)
            animate={{ y: 0, opacity: 1 }} // Slide down to resting position
            transition={{
              delay: 0.9, // Wait for logo to settle
              duration: 2, // Slow slide down
              type: "spring", // Slight bounce at the end
              bounce: 0.3,
            }}
          >
            <Image
              src="/img/home/date_vector_desktop.svg" // <--- YOUR ORIGINAL DESKTOP IMAGE
              alt="Desktop Dates"
              width={300}
              height={200}
              className="md:w-38 lg:w-45 h-auto drop-shadow-xl"
            />
          </motion.div>
        </div>

        {/* --- B. THE STAGE (Base + Singers) --- */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center items-end z-10 pointer-events-none">
          <div className="relative w-full flex justify-center items-end">
            {/* SINGERS */}
            <div className="absolute bottom-[10%] sm:bottom-[12%] w-full flex justify-center md:justify-between items-end z-20">
              {/* Left Singer (Centered on Mobile) */}
              <img
                src="/img/home/home-left-singers.png"
                alt="Left Singer"
                className="w-[100%] translate-y-[5.5%] md:w-[35%] h-auto object-contain drop-shadow-2xl items-start"
              />

              {/* Right Singer (Hidden on Mobile) */}
              <img
                src="/img/home/home-right-singers.png"
                alt="Right Singer"
                className="hidden md:block w-[25%] md:w-[20%] h-auto object-contain drop-shadow-2xl items-end translate-y-16 -translate-x-15"
              />
            </div>

            {/* BASE */}
            <img
              src="/img/home/home-base.png"
              alt="Home Base"
              className="relative z-10 w-full md:w-[100%] object-cover"
            />

            <div className="hidden lg:block absolute top-30 left-0 z-10 w-32 xl:w-42">
              <Image
                src="/img/home/home-bg-left-sparkle-desktop.png" // <--- UPDATE PATH
                alt="Sparkles Left"
                width={200}
                height={200}
                className="w-full h-auto"
              />
            </div>

            {/* 2. Top Right Music Notes */}
            <div className="hidden lg:block absolute top-[540px] right-0 z-10 w-24 xl:w-[14vw]">
              <Image
                src="/img/home/home-bg-right-musicStream-desktop.png" // <--- UPDATE PATH
                alt="Music Notes Right"
                width={200}
                height={200}
                className="w-full h-auto"
              />
            </div>

            {/* 3. Middle Left Music Stream */}
            <div className="hidden lg:block absolute top-259 -translate-y-1/2 left-0 z-10 w-28 md:w-[30%] md:h-auto">
              <Image
                src="/img/home/home-bg-left-musicStream-desktop.png" // <--- UPDATE PATH
                alt="Music Stream Left"
                width={200}
                height={200}
                className="w-full h-auto"
              />
            </div>

            {/* 4. Middle Right Sparkles/Confetti */}
            <div className="hidden lg:block absolute top-[870px] right-0 z-10 w-32 xl:w-35">
              <Image
                src="/img/home/home-bg-right-sparkle-desktop.png" // <--- UPDATE PATH
                alt="sparkle Right"
                width={200}
                height={200}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          3. REST OF CONTENT
         ============================================================ */}
      <div className="relative z-30">
        <div>{/* <PrizePool /> */}</div>
        <div className="md:px-24 lg:px-40 sm:pt-20 mb-[8vh]">
          <Events />
        </div>
        <div className="w-full h-full bg-[url('/img/home/Aboutbg.svg')] bg-cover">
          <About />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </motion.main>
  );
};

export default Home;
