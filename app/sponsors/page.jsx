"use client";

import localFont from "next/font/local";
import { useEffect } from "react";
import Image from "next/image";

const Sponsors = () => {
  const sponsor = [
    {
      title: "TITLE SPONSOR",
      name: "Time International",
      imgSrc: "/img/sponsor/TIME logo.webp",
      webSrc: "https://www.time4education.com/",
    },
    {
      title: "CO SPONSOR",
      name: "Dnyanadeep academy",
      imgSrc: "/img/sponsor/co-sponsor.png",
      webSrc: "https://www.kingofgame.in/index.html",
    },
    {
      title: "SNACK PARTNER",
      name: "GURUKRUPA BUDHANI BROS",
      imgSrc: "/img/sponsor/snack-partner.jpg",
      webSrc: "https://gurukrupabudhanibrothers.com/",
    },
    {
      title: "FOOD PARTNER",
      name: "PIZZA BURST",
      imgSrc: "/img/sponsor/food-partner.jpg",
      webSrc: "https://www.instagram.com/pizza_burst_pune",
    },
    {
      title: "PIZZA PARTNER",
      name: "PIZZA WINDOW",
      imgSrc: "/img/sponsor/pizza-partner.png",
      webSrc: "https://www.campustimespune.com/",
    },
    {
      title: "COFFEE PARTNER",
      name: "LA ROASTED BEANS",
      imgSrc: "/img/sponsor/coffee-partner.png",
      webSrc: "https://www.campustimespune.com/",
    },
    {
      title: "BEVERAGE PARTNER",
      name: "PANAAAA",
      imgSrc: "/img/sponsor/beverage-partner.png",
      webSrc: "https://www.instagram.com/thepizzawindoww",
    },
    {
      title: "MEDIA PARTNER",
      name: "PUNEKAR NEWS",
      imgSrc: "/img/sponsor/media-partner.png",
      webSrc: "https://www.campustimespune.com/",
    },
    {
      title: "YOUTH PARTNER",
      name: "CAMPUS TIMES PUNE",
      imgSrc: "/img/sponsor/youth-partner.png",
      webSrc: "https://www.campustimespune.com/",
    },
    {
      title: "REFRESHMENT PARTNER",
      name: "KATRAJ DAIRY",
      imgSrc: "/img/sponsor/refreshment-partner.png",
      webSrc: "https://www.campustimespune.com/",
    },
    {
      title: "EDUCATION PARTNER",
      name: "REGAL COMPUTERS",
      imgSrc: "/img/sponsor/education-partner.png",
      webSrc: "https://www.campustimespune.com/",
    },
  ];

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
          mb-20 sm:mb-20
          text-center">
          Our Sponsors
        </h1>

        {/* SPONSORS SECTION */}
        <div className="flex flex-col gap-10 mb-20 items-center">

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

            <div className="relative">
              <img
                src="/img/sponsor/frame1.png"
                alt="Sponsor Frame"
                className="lg:w-[500px] sm:w-[400px] w-[330px]"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
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

          {/* <div className="grid md:grid-cols-2 grid-cols-1 md:gap-x-20 md:gap-y-28 gap-y-20 px-4">
            {sponsor.slice(1).map((data) => (
              <div key={data.name} className="relative">
                <div
                  className={`sub-heading-font text-white text-center 
                  text-[20px] lg:text-[28px] 
                  absolute -top-10 lg:-top-14 
                  w-full left-1/2 -translate-x-1/2 
                  tracking-widest uppercase drop-shadow-md`}
                >
                  {data.title}
                </div>

                <div className="relative ">
                  <img
                    src="/img/sponsor/frame1.png"
                    alt="Sponsor Frame"
                    className="lg:w-100 sm:w-75 w-70"
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <img
                      src={data.imgSrc}
                      alt={data.name}
                      className="max-w-40 lg:max-w-56 max-h-30 lg:max-h-44 cursor-pointer object-contain"
                      onClick={() =>
                        data.webSrc && window.open(data.webSrc, "_blank")
                      }
                    />
                    <p className="text-center sub-heading-font font-semibold max-w-50 wrap-break-word">
                      {data.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-x-20 md:gap-y-16 gap-y-14 px-4">
            {sponsor.slice(1).map((data) => (
              <div key={data.name} className="flex flex-col items-center">
                
                {/* TITLE - now in normal flow */}
                <div
                  className={`sub-heading-font text-white text-center 
                  text-[20px] lg:text-[28px] 
                  mb-4 lg:mb-6
                  w-full
                  tracking-widest uppercase drop-shadow-md`}
                >
                  {data.title}
                </div>

                {/* FRAME + CONTENT */}
                <div className="relative">
                  <img
                    src="/img/sponsor/frame1.png"
                    alt="Sponsor Frame"
                    className="lg:w-100 sm:w-75 w-70"
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <img
                      src={data.imgSrc}
                      alt={data.name}
                      className="max-w-40 lg:max-w-56 max-h-30 lg:max-h-44 cursor-pointer object-contain"
                      onClick={() => data.webSrc && window.open(data.webSrc, "_blank")}
                    />
                    <p className="text-center text-md md:text-xl sub-heading-font font-semibold max-w-50 break-words">
                      {data.name}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
};

export default Sponsors;