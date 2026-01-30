"use client";

import localFont from "next/font/local";
import { useEffect } from "react";
import Image from "next/image";

const rye = localFont({
  src: "../../public/fonts/Rye-Regular.ttf",
});

const Sponsors = () => {
//   const sponsor = [
//     {
//       title: "TITLE SPONSOR",
//       name: "Time International",
//       imgSrc: "/img/sponsor/TIME logo.webp",
//       webSrc: "https://www.time4education.com/",
//     },
//     {
//       title: "GAME PARTNER",
//       name: "KING OF GAME",
//       imgSrc: "/img/sponsor/kog pune.png",
//       webSrc: "https://www.kingofgame.in/index.html",
//     },
//     {
//       title: "SNACK PARTNER",
//       name: "GURUKRUPA BUDHANI BROS",
//       imgSrc: "/img/sponsor/BUDHANI.png",
//       webSrc: "https://gurukrupabudhanibrothers.com/",
//     },
//     {
//       title: "FOOD PARTNER",
//       name: "PIZZA BURST",
//       imgSrc: "/img/sponsor/Pizza burst.png",
//       webSrc: "https://www.instagram.com/pizza_burst_pune",
//     },
//     {
//       title: "YOUTH PARTNER",
//       name: "CAMPUS TIMES",
//       imgSrc: "/img/sponsor/CAMPUSTIMES.jpg",
//       webSrc: "https://www.campustimespune.com/",
//     },
//     {
//       title: "YOUTH MEDIA PARTNER",
//       name: "YOUTH INC",
//       imgSrc: "/img/sponsor/youth inc.png",
//     },
//     {
//       title: "PIZZA PARTNER",
//       name: "PIZZA WINDOW",
//       imgSrc: "/img/sponsor/pizza window.png",
//       webSrc: "https://www.instagram.com/thepizzawindoww",
//     },
//     {
//       title: "BLOG PARTNER",
//       name: "EDTIMES",
//       imgSrc: "/img/sponsor/edtimes logo.png",
//     },
//   ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {/* ============================================================
          1. DYNAMIC BACKGROUND LAYER (FIXED)
         ============================================================ */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        {/* Mobile Background */}
        <div className="block md:hidden w-full h-full relative">
          <Image
            src="/img/common/general-mobile-bg.png"
            alt="Mobile Background"
            fill
            className="object-cover" // Keeps aspect ratio, clips edges instead of stretching
            priority
          />
        </div>

        {/* Desktop Background */}
        <div className="hidden md:block w-full h-full relative">
          <Image
            src="/img/common/desktop-bg.png"
            alt="Desktop Background"
            fill
            className="object-cover" // Keeps aspect ratio, clips edges instead of stretching
            priority
          />
        </div>
      </div>

      {/* ============================================================
          2. CONTENT LAYER
         ============================================================ */}
      <div className="relative z-10 flex flex-col items-center py-10 md:py-14">

        {/* TITLE */}
        <h1 className="text-4xl lg:text-5xl tracking-tight text-white heading-font 
          mt-14 sm:mt-16 lg:mt-11
          mb-20 sm:mb-28 md:mb-40 
          text-center">
          Our Sponsors
        </h1>

        {/* SPONSORS SECTION */}
        <div className="flex flex-col gap-10 md:mb-20 mb-20 items-center">

          {/* TITLE SPONSOR (Featured) */}
          {/* <div className="relative md:mb-32 mb-16">
            <div
              className={`${rye.className} text-white text-center 
              text-[22px] lg:text-[38px] 
              absolute -top-12 lg:-top-18
              w-full left-1/2 -translate-x-1/2 
              tracking-widest uppercase drop-shadow-md`}
            >
              {sponsor[0].title}
            </div>

            <div className="relative"> */}
              {/* FRAME */}
              {/* <img
                src="/img/sponsor/frame1.png"
                alt="Sponsor Frame"
                className="lg:w-[500px] sm:w-[400px] w-[330px]"
              /> */}

              {/* CENTER CONTENT */}
              {/* <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                <img
                  src={sponsor[0].imgSrc}
                  alt={sponsor[0].name}
                  className="w-[180px] lg:w-[230px] cursor-pointer object-contain"
                  onClick={() =>
                    sponsor[0].webSrc && window.open(sponsor[0].webSrc, "_blank")
                  }
                />
                <div className={`${rye.className} text-[18px] lg:text-[26px] text-center tracking-widest uppercase`}>
                  {sponsor[0].name}
                </div>
              </div>
            </div>
          </div> */}

          {/* OTHER SPONSORS GRID */}
          {/* <div className="grid md:grid-cols-2 grid-cols-1 md:gap-x-20 md:gap-y-28 gap-y-20 px-4">
            {sponsor.slice(1).map((data) => (
              <div key={data.name} className="relative">
                {/* SPONSOR TITLE */}
                {/* <div
                  className={`${rye.className} text-white text-center 
                  text-[20px] lg:text-[28px] 
                  absolute -top-10 lg:-top-14 
                  w-full left-1/2 -translate-x-1/2 
                  tracking-widest uppercase drop-shadow-md`}
                >
                  {data.title}
                </div>

                <div className="relative mt-5"> */}
                  {/* FRAME */}
                  {/* <img
                    src="/img/sponsor/frame1.png"
                    alt="Sponsor Frame"
                    className="lg:w-[400px] sm:w-[300px] w-[280px]"
                  /> */}

                  {/* CENTER CONTENT */}
                  {/* <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <img
                      src={data.imgSrc}
                      alt={data.name}
                      className="w-[120px] lg:w-[160px] cursor-pointer object-contain"
                      onClick={() =>
                        data.webSrc && window.open(data.webSrc, "_blank")
                      }
                    />
                    <div className={`${rye.className} text-[14px] lg:text-[18px] text-center tracking-widest uppercase`}>
                      {data.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

        </div>
      </div>
    </main>
  );
};

export default Sponsors;