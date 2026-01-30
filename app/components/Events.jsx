// import Link from "next/link";
// import { Fade } from "react-awesome-reveal";

// const eventData = [
//   {
//     title: "PICS-O-REEL",
//     description:
//       "Step into the world of art with Picsoreel's art exhibitions! Showcasing stunning works from talented artists, we celebrate creativity, culture, and innovation.",
//     image: "/img/home/PICSOREEL.png",
//     link: "/picsoreel",
//     reverse: false,
//   },
//   {
//     title: "WORKSHOPS",
//     description:
//       "Discover the joy of creating with our workshops! Perfect for beginners and experienced artists alike, our workshops offer expert guidance, innovative techniques, and a chance to explore diverse artistic styles.",
//     image: "/img/home/WORKSHOPS.png",
//     link: "/workshops",
//     reverse: true,
//   },
//   {
//     title: "MANTHAN",
//     description:
//       "Public speaking is more than just a skill—it’s a pathway to confidence, success, and impact. At Manthan, we celebrate the art of speaking with dynamic rounds designed to challenge and inspire.",
//     image: "/img/home/MANTHAN.png",
//     link: "/manthan",
//     reverse: false,
//   },
//   {
//     title: "EVENTS",
//     description:
//       "Enhance your creativity with our events! Whether you're an enthusiast or a budding creator, join us to connect, learn, and be inspired.",
//     image: "/img/home/EVENTS.png",
//     link: "/events",
//     reverse: true,
//   },
// ];

// const EventSection = ({ title, description, image, link, reverse }) => (
//   <Fade direction={reverse ? "right" : "left"} triggerOnce>
//     <div className="grid grid-cols-1 lg:grid-cols-9 mt-8">
//       {!reverse && (
//         <div className="col-span-3 flex justify-center">
//           <img src={image} className="w-60 py-10 lg:w-full" alt={title} />
//         </div>
//       )}

//       <div className="spacer col-span-1 hidden lg:block"></div>

//       <div className="content col-span-5 flex flex-col justify-center items-start">
//         <h2 className="heading heading-font text-4xl lg:text-7xl text-[#4E3506] text-center lg:text-start w-full">
//           {title}
//         </h2>
//         <p className="description-font mt-10 font-bold text-justify lg:text-start">
//           {description}
//         </p>
//         <div className="flex justify-center lg:justify-start w-full">
//           <Link
//             href={link}
//             className="read-more body-font p-2 text-2xl mt-8 rounded-xl border-4 border-rose-500 text-rose-500 px-10 hover:bg-rose-500 hover:text-white transition-all"
//           >
//             Participate
//           </Link>
//         </div>
//       </div>

//       {reverse && <div className="spacer col-span-1 hidden lg:block"></div>}

//       {reverse && (
//         <div className="col-span-3 flex justify-center order-first">
//           <img src={image} className="w-60 py-10 lg:w-full" alt={title} />
//         </div>
//       )}
//     </div>
//   </Fade>
// );

// const EventsCard = () => {
//   return (
//     <div className="px-8 lg:px-20">
//       {eventData.map((event, index) => (
//         <EventSection key={index} {...event} />
//       ))}
//     </div>
//   );
// };

// export default EventsCard;

//2026 dev

// import Link from "next/link";
// import { Fade } from "react-awesome-reveal";

// // --- 1. Clean Data (No Offsets) ---
// const eventData = [
//   {
//     title: "PICS-O-REEL",
//     description:
//       "Step into the world of art with Picsoreel's art exhibitions! Showcasing stunning works from talented artists, we celebrate creativity, culture, and innovation.",
//     link: "/picsoreel",
//     bannerImage: "/img/events/events-card-26-picso.png",
//     // mobileBannerImage: "/img/events/events-card-26-picso-mobile.png",
//   },
//   {
//     title: "WORKSHOPS",
//     description:
//       "Discover the joy of creating with our workshops! Perfect for beginners and experienced artists alike.",
//     link: "/workshops",
//     bannerImage: "/img/events/events-card-26-workshops.png",
//   },
//   {
//     title: "EVENTS",
//     description:
//       "Enhance your creativity with our events! Join us to connect, learn, and be inspired.",
//     link: "/events",
//     bannerImage: "/img/events/events-card-26-events.png",
//   },
// ];

// // --- 2. Clean Component (Standard Centering) ---
// const BannerEventCard = ({
//   title,
//   description,
//   link,
//   bannerImage,
//   mobileBannerImage,
// }) => (
//   // Main Container
//   <div className="relative w-full min-h-[450px] lg:min-h-[600px] flex items-center justify-center">
//     {/* Background Image Layer */}
//     <picture className="absolute inset-0 -z-10">
//       <source media="(min-width: 1024px)" srcSet={bannerImage} />
//       <img
//         src={mobileBannerImage || bannerImage}
//         alt={`${title} Background`}
//         className="w-full h-full object-contain"
//       />
//     </picture>

//     {/* Content Container */}
//     {/* Simply centered using flexbox utilities */}
//     <div className="z-10 flex flex-col items-center justify-center text-center gap-6 px-6 max-w-4xl">
//       <h2 className="heading heading-font text-3xl md:text-4xl lg:text-5xl text-[#4E3506]">
//         {title}
//       </h2>

//       <p className="description-font font-bold text-sm md:text-base text-[#4E3506] leading-relaxed">
//         {description}
//       </p>

//       <Link
//         href={link}
//         className="px-8 py-2 text-lg md:text-xl rounded-xl border-4 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white bg-white/60 backdrop-blur-sm transition-all"
//       >
//         Participate
//       </Link>
//     </div>
//   </div>
// );

// const EventsCard = () => {
//   return (
//     <div className="flex flex-col items-center w-full py-20 gap-16 overflow-hidden">
//       {eventData.map((event, index) => (
//         <Fade
//           key={index}
//           direction="up"
//           triggerOnce
//           className="w-full flex justify-center max-w-6xl"
//         >
//           <BannerEventCard {...event} />
//         </Fade>
//       ))}
//     </div>
//   );
// };

// export default EventsCard;

// import Link from "next/link";
// import { Fade } from "react-awesome-reveal";

// // --- 1. Data with Mobile Images ---
// // Make sure to uncomment/add your real mobile image paths here
// const eventData = [
//   {
//     title: "PICS-O-REEL",
//     description:
//       "Step into the world of art with Picsoreel's art exhibitions! Showcasing stunning works from talented artists, we celebrate creativity, culture, and innovation.",
//     link: "/picsoreel",
//     bannerImage: "/img/events/events-card-26-picso.png",
//     mobileBannerImage: "/img/events/events-card-26-picso-mobile.png", // <--- Mobile Image
//   },
//   {
//     title: "WORKSHOPS",
//     description:
//       "Discover the joy of creating with our workshops! Perfect for beginners and experienced artists alike.",
//     link: "/workshops",
//     bannerImage: "/img/events/events-card-26-workshops.png",
//     mobileBannerImage: "/img/events/events-card-26-workshops-mobile.png", // <--- Mobile Image
//   },
//   {
//     title: "EVENTS",
//     description:
//       "Enhance your creativity with our events! Join us to connect, learn, and be inspired.",
//     link: "/events",
//     bannerImage: "/img/events/events-card-26-events.png",
//     mobileBannerImage: "/img/events/events-card-26-events-mobile.png", // <--- Mobile Image
//   },
// ];

// // --- 2. Component with Responsive Image Logic ---
// const BannerEventCard = ({
//   title,
//   description,
//   link,
//   bannerImage,
//   mobileBannerImage,
// }) => (
//   // Main Container
//   <div className="relative w-full min-h-[450px] lg:min-h-[600px] flex items-center justify-center">
//     {/* --- Responsive Background Image --- */}
//     <picture className="absolute inset-0 -z-10">
//       {/* 1. If screen is Desktop (lg or bigger), use 'bannerImage' */}
//       <source media="(min-width: 1024px)" srcSet={bannerImage} />

//       {/* 2. Otherwise (Mobile/Tablet), use 'mobileBannerImage' */}
//       <img
//         src={mobileBannerImage || bannerImage}
//         alt={`${title} Background`}
//         className="w-auto h-full object-contain p-10 "
//       />
//     </picture>

//     {/* --- Centered Content --- */}
//     <div className="z-10 flex flex-col items-center justify-center text-center gap-6 px-6 max-w-4xl">
//       <h2 className="heading heading-font text-3xl md:text-4xl lg:text-5xl text-[#4E3506]">
//         {title}
//       </h2>

//       <p className="description-font font-bold text-sm md:text-base text-[#4E3506] leading-relaxed">
//         {description}
//       </p>

//       <Link
//         href={link}
//         className="px-8 py-2 text-lg md:text-xl rounded-xl border-4 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white bg-white/60 backdrop-blur-sm transition-all"
//       >
//         Participate
//       </Link>
//     </div>
//   </div>
// );

// const EventsCard = () => {
//   return (
//     <div className="flex flex-col items-center w-full py-20 gap-16 overflow-hidden">
//       {eventData.map((event, index) => (
//         <Fade
//           key={index}
//           direction="up"
//           triggerOnce
//           className="w-full flex justify-center max-w-6xl"
//         >
//           <BannerEventCard {...event} />
//         </Fade>
//       ))}
//     </div>
//   );
// };

// export default EventsCard;

// import Link from "next/link";
// import { Fade } from "react-awesome-reveal";

// // --- 1. Data ---
// const eventData = [
//   {
//     title: "PICS-O-REEL",
//     description:
//       "Step into the world of art with Picsoreel's art exhibitions! Showcasing stunning works from talented artists.",
//     link: "/picsoreel",
//     bannerImage: "/img/events/events-card-26-picso.png",
//     mobileBannerImage: "/img/events/events-card-26-picso-mobile.png",
//   },
//   {
//     title: "WORKSHOPS",
//     description:
//       "Discover the joy of creating with our workshops! Perfect for beginners and experienced artists alike.",
//     link: "/workshops",
//     bannerImage: "/img/events/events-card-26-workshops.png",
//     mobileBannerImage: "/img/events/events-card-26-workshops-mobile.png",
//   },
//   {
//     title: "EVENTS",
//     description:
//       "Enhance your creativity with our events! Join us to connect, learn, and be inspired.",
//     link: "/events",
//     bannerImage: "/img/events/events-card-26-events.png",
//     mobileBannerImage: "/img/events/events-card-26-events-mobile.png",
//   },
// ];

// // --- 2. Fixed Component ---
// const BannerEventCard = ({
//   title,
//   description,
//   link,
//   bannerImage,
//   mobileBannerImage,
// }) => (
//   // 1. Container: Removed fixed height (min-h).
//   // We use 'max-w-5xl' to stop it from getting too huge on big screens.
//   <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center p-5">
//     {/* --- Background Image --- */}
//     {/* 2. Logic Change: The image is now 'relative'.
//         It dictates the height of the parent div. w-full h-auto maintains aspect ratio. */}
//     <picture className="w-full h-auto block">
//       <source media="(min-width: 1024px)" srcSet={bannerImage} />
//       <img
//         src={mobileBannerImage || bannerImage}
//         alt={`${title} Background`}
//         className="w-full h-auto object-contain"
//       />
//     </picture>

//     {/* --- Centered Content Overlay --- */}
//     {/* 3. Logic Change: Text is now 'absolute'.
//         It sits ON TOP of the image. 'inset-0' makes it cover the exact area of the image. */}
//     <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 py-6 md:px-16 md:py-10 z-10">
//       {/* Added max-width to text so it doesn't touch the very edges of your card graphic */}
//       <div className="flex flex-col items-center gap-3 md:gap-6 max-w-[90%] md:max-w-2xl">
//         <h2 className="heading heading-font text-2xl md:text-4xl lg:text-5xl pt-2 text-[#4E3506] leading-tight">
//           {title}
//         </h2>

//         <p className="description-font font-bold text-xs md:text-base text-[#4E3506] leading-snug md:leading-relaxed line-clamp-3 md:line-clamp-none">
//           {description}
//         </p>

//         <Link
//           href={link}
//           className="mt-0.5 px-6 py-1.5 md:px-8 md:py-2 text-sm md:text-lg lg:text-xl rounded-xl border-2 md:border-4 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white bg-white/80 backdrop-blur-sm transition-all"
//         >
//           Participate
//         </Link>
//       </div>
//     </div>
//   </div>
// );

// const EventsCard = () => {
//   return (
//     // Reduced py-20 to py-10 and gap-16 to gap-8 for tighter spacing
//     <div className="flex flex-col items-center w-full pt-0 pb-8 gap-4 md:gap-12 overflow-hidden px-4">
//       {eventData.map((event, index) => (
//         <Fade
//           key={index}
//           direction="up"
//           triggerOnce
//           className="w-full flex justify-center"
//         >
//           <BannerEventCard {...event} />
//         </Fade>
//       ))}
//     </div>
//   );
// };

// export default EventsCard;

// import Link from "next/link";
// import { Fade } from "react-awesome-reveal";

// // --- 1. Data with Custom Positions ---
// const eventData = [
//   {
//     title: "PICS-O-REEL",
//     description:
//       "Step into the world of art with Picsoreel's art exhibitions! Showcasing stunning works from talented artists.",
//     link: "/picsoreel",
//     bannerImage: "/img/events/events-card-26-picso.png",
//     mobileBannerImage: "/img/events/events-card-26-picso-mobile.png",
//     buttonColorClass: "bg-gradient-to-r from-[#ED5285] to-[#D6074D] border-[#DB1658] text-white hover:scale-105 shadow-[0px_3px_4px_rgba(0,0,0,0.25)]",

//     // NEW: Decorations Array
//     decorations: [
//       {
//         src: "/img/events/trumpet-picso-card.png",
//         alt: "Trumpet Decoration",
//         className: "hidden md:block md:w-80 md:-top-5.5 md:-right-22",
//       },
//       {
//         src: "/img/events/drums-picso-card.png",
//         alt: "Drum Decoration",
//         className: "w-16 bottom-7 right-5 md:w-32 md:bottom-10 md:right-10",
//       },
//     ],
//   },
//   {
//     title: "WORKSHOPS",
//     description:
//       "Discover the joy of creating with our workshops! Perfect for beginners and experienced artists alike.",
//     link: "/workshops",
//     bannerImage: "/img/events/events-card-26-workshops.png",
//     mobileBannerImage: "/img/events/events-card-26-workshops-mobile.png",
//     buttonColorClass: "bg-gradient-to-r from-[#25B3B2] to-[#269593] border-[#269998] text-white hover:scale-105 shadow-[-1px_3px_4px_rgba(0,0,0,0.25)]",

//     decorations: [
//       {
//         src: "/img/events/hat-workshop-card.png",
//         alt: "Hat Decoration",
//         className: "w-20 top-2 right-1 md:w-40 md:top-1 md:-right-8",
//       },

//       {
//         src: "/img/events/guitar-workshop-card.png",
//         alt: "Guitar Decoration",
//         className: "w-20 h-auto bottom-9 left-1 md:w-35 md:bottom-10 md:left-2",
//       },

//       {
//         src: "/img/events/chilly-workshop-card.png",
//         alt: "Chilly Decoration",
//         className: "block w-15 h-auto bottom-30 right-1 md:hidden ",
//       },
//     ],
//   },
//   {
//     title: "EVENTS",
//     description:
//       "Enhance your creativity with our events! Join us to connect, learn, and be inspired.",
//     link: "/events",
//     bannerImage: "/img/events/events-card-26-events.png",
//     mobileBannerImage: "/img/events/events-card-26-events-mobile.png",
//     buttonColorClass: "bg-gradient-to-r from-[#FF982B] to-[#FC4C04] border-[#FD5609] text-white hover:scale-105 shadow-[-1px_3px_4px_rgba(0,0,0,0.25)]",

//     decorations: [
//       {
//         src: "/img/events/samosa-events-card.png",
//         alt: "Samosa Decoration",
//         className: "w-20 bottom-10 left-3 md:w-40 md:bottom-20 md:left-2",
//       },
//     ],
//   },
// ];

// // --- 2. Fixed Component ---
// const BannerEventCard = ({
//   title,
//   description,
//   link,
//   bannerImage,
//   mobileBannerImage,
//   decorations,
//   buttonColorClass,
// }) => (
//   // Added 'relative' so decorations position themselves relative to this box
//   <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center p-5 mt-4 md:mt-12">
//     {/* --- DYNAMIC DECORATIONS RENDERER --- */}
//     {decorations &&
//       decorations.map((item, index) => (
//         <picture
//           key={index}
//           className={`absolute z-20 pointer-events-none drop-shadow-xl ${item.className}`}
//         >
//           {/* If a specific mobileSrc exists, use it for small screens */}
//           {item.mobileSrc ? (
//             <>
//               <source media="(min-width: 768px)" srcSet={item.src} />
//               <img
//                 src={item.mobileSrc}
//                 alt={item.alt}
//                 className="w-full h-auto"
//               />
//             </>
//           ) : (
//             // Otherwise just use the main src
//             <img src={item.src} alt={item.alt} className="w-full h-auto" />
//           )}
//         </picture>
//       ))}

//     {/* --- Main Background Image --- */}
//     <picture className="w-full h-auto block relative z-0">
//       <source media="(min-width: 1024px)" srcSet={bannerImage} />
//       <img
//         src={mobileBannerImage || bannerImage}
//         alt={`${title} Background`}
//         className="w-full h-auto object-contain"
//       />
//     </picture>

//     {/* --- Centered Content Overlay --- */}
//     <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 py-6 md:px-16 md:py-10 z-10">
//       <div className="flex flex-col items-center gap-3 md:gap-6 max-w-[90%] md:max-w-2xl">
//         <h2 className="heading heading-font text-2xl md:text-4xl lg:text-5xl pt-2 text-[#4E3506] leading-tight">
//           {title}
//         </h2>

//         <p className="description-font font-bold text-xs md:text-base text-[#4E3506] leading-snug md:leading-relaxed line-clamp-3 md:line-clamp-none">
//           {description}
//         </p>

//         <Link
//           href={link}
//           className={`mt-0.5 px-6 py-1.5 md:px-8 md:py-3 md:mb-1 text-sm md:text-lg lg:text-xl rounded-xl border-2 md:border-4 bg-white/80 backdrop-blur-sm transition-all hover:text-white ${buttonColorClass}`}
//         >
//           Participate
//         </Link>
//       </div>
//     </div>
//   </div>
// );

// // const EventsCard = () => {
// //   return (

// //     <div className="relative flex flex-col items-center w-full pt-0 pb-12 gap-2 md:gap-20 overflow-visible px-4">

// //               <img
// //                 src="/img/events/bottom-cactus.png" // <--- Update with your real image path
// //                 alt="Cactus Decoration"
// //                 // Position: Bottom Left.
// //                 // 'hidden md:block' helps if you want to hide it on very small mobile screens, remove if you want it everywhere.
// //                 className="absolute bottom-0 left-0 w-16 md:w-60 md:-left-40 md:-bottom-20 pointer-events-none z-50"
// //               />

// //               {/* --- NEW: Man Decoration (Bottom Right) --- */}
// //               <img
// //                 src="/img/events/bottom-SingingMan.png" // <--- Update with your real image path
// //                 alt="SingingMan Decoration"
// //                 // Position: Bottom Right.
// //                 className="absolute bottom-0 right-0 w-20 md:w-60 md:-bottom-20 md:-right-40 pointer-events-none z-50"
// //               />

// //       {eventData.map((event, index) => (
// //         <Fade
// //           key={index}
// //           direction="up"
// //           triggerOnce
// //           className="w-full flex justify-center"
// //         >
// //           <BannerEventCard {...event} />
// //         </Fade>
// //       ))}
// //     </div>
// //   );
// // };

// // export default EventsCard;

// const EventsCard = () => {
//   return (
//     // 1. Container: Use 'min-h-[100dvh]' to fill the exact visible mobile screen.
//     //    'overflow-visible' allows the images to hang lower than this div (into the footer).
//     <div className="relative flex flex-col items-center w-full min-h-[100dvh] md:min-h-0 pt-0 pb-12 gap-2 md:gap-20 overflow-visible px-4">
//       {/* --- Cactus Decoration (Bottom Left) --- */}
//       {/* FIX: Changed 'bottom-0' to '-bottom-12' (negative 3rem) to push it down on iPhone */}
//       <img
//         src="/img/events/bottom-cactus.png"
//         alt="Cactus Decoration"
//         className="absolute -bottom-12 left-0 w-16 md:w-60 md:-left-40 md:-bottom-20 pointer-events-none z-50"
//       />

//       {/* --- Man Decoration (Bottom Right) --- */}
//       {/* FIX: Changed 'bottom-0' to '-bottom-12' to match the cactus */}
//       <img
//         src="/img/events/bottom-SingingMan.png"
//         alt="SingingMan Decoration"
//         className="absolute -bottom-12 right-0 w-20 md:w-60 md:-bottom-20 md:-right-40 pointer-events-none z-50"
//       />

//       {eventData.map((event, index) => (
//         <Fade
//           key={index}
//           direction="up"
//           triggerOnce
//           className="w-full flex justify-center"
//         >
//           <BannerEventCard {...event} />
//         </Fade>
//       ))}
//     </div>
//   );
// };

// export default EventsCard;

import Link from "next/link";
import { Fade } from "react-awesome-reveal";

// --- 1. Fixed Component (No changes here) ---
const BannerEventCard = ({
  title,
  description,
  mobileDescription,
  link,
  bannerImage,
  mobileBannerImage,
  decorations,
  buttonColorClass,
  textPositionClass = "",
  imageClass = "",
}) => (
  <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center p-5 mt-4 md:mt-12 pointer-events-none">
    {/* --- DYNAMIC DECORATIONS RENDERER --- */}
    {decorations &&
      decorations.map((item, index) => (
        <picture
          key={index}
          className={`absolute z-20 pointer-events-none drop-shadow-xl ${item.className}`}
        >
          {item.mobileSrc ? (
            <>
              <source media="(min-width: 768px)" srcSet={item.src} />
              <img
                src={item.mobileSrc}
                alt={item.alt}
                className="w-full h-auto object-contain"
              />
            </>
          ) : (
            <img src={item.src} alt={item.alt} className="w-full h-auto" />
          )}
        </picture>
      ))}

    {/* --- Main Background Image --- */}
    <picture className="w-full h-auto block relative z-0">
      <source media="(min-width: 1024px)" srcSet={bannerImage} />
      <img
        src={mobileBannerImage || bannerImage}
        alt={`${title} Background`}
        className={`w-full h-auto object-contain ${imageClass}`}
      />
    </picture>

    {/* --- Centered Content Overlay --- */}
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center text-center px-8 md:px-16 md:py-10 z-10 ${textPositionClass}`}
    >
      <div className="flex flex-col items-center gap-3 md:gap-6 lg:gap-0.5 xl-gap-6 max-w-[90%] md:max-w-2xl">
        <h2 className="heading heading-font text-2xl md:text-4xl lg:text-5xl pt-2 text-[#4E3506] leading-tight">
          {title}
        </h2>

        <p className="body-font font-bold text-xs md:text-base text-[#4E3506] leading-snug md:leading-relaxed">
          
          {/* Mobile Description */}
          <span className="block md:hidden">
            {mobileDescription || description}
          </span>

          {/* Desktop Description */}
          <span className="hidden md:block">
            {description}
          </span>
        </p>

        <Link
          href={link}
          className={`sub-heading-font mt-0.5 px-6 py-1.5 md:px-8 md:py-3 md:mb-2 text-sm md:text-lg lg:text-xl rounded-xl border-2 md:border-4 bg-white/80 backdrop-blur-sm transition-all hover:text-white ${buttonColorClass} pointer-events-auto`}
        >
          Participate
        </Link>
      </div>
    </div>
  </div>
);

// --- 2. Main Component with Hardcoded Cards ---
const EventsCard = () => {
  return (
    <div className="relative flex flex-col items-center w-full h-auto md:min-h-0 pt-0 pb-12 gap-2 md:gap-20 overflow-visible px-4">
      {/* --- Cactus Decoration (Bottom Left) --- */}
      <img
        src="/img/events/bottom-cactus.png"
        alt="Cactus Decoration"
        className="absolute bottom-[1%] translate-y-[30%] left-0 w-16 md:w-60 md:-left-40  md:translate-y-[26%] pointer-events-none z-50"
      />

      {/* --- Man Decoration (Bottom Right) --- */}
      <img
        src="/img/events/bottom-SingingMan.png"
        alt="SingingMan Decoration"
        className="absolute bottom-[1%] translate-y-[17%] right-0 w-20 md:w-60 md:bottom-[1%] md:-right-40 md:translate-y-[23%] pointer-events-none z-50"
      />

      {/* --- CARD 1: PICS-O-REEL --- */}
      <Fade
        direction="up"
        triggerOnce
        className="w-full flex justify-center z-10"
      >
        <BannerEventCard
          title="PICS-O-REEL"
          description="Pics-o-Reel is an art exhibition and competition where creative works are displayed. The winners are decided through a voting process involving the audience."
          mobileDescription="Pics-o-Reel is an art exhibition and competition where creative works are displayed."
          link="/picsoreel"
          bannerImage="/img/events/events-card-26-picso.png"
          mobileBannerImage="/img/events/events-card-26-picso-mobile.png"
          buttonColorClass="bg-gradient-to-r from-[#ED5285] to-[#D6074D] border-[#DB1658] text-white hover:scale-105 shadow-[0px_3px_4px_rgba(0,0,0,0.25)]"
          decorations={[
            {
              src: "/img/events/trumpet-picso-card.png",
              alt: "Trumpet Decoration",
              className: "hidden md:block md:w-80 md:-top-5.5 md:-right-22",
            },
            {
              src: "/img/events/drums-picso-card.png",
              alt: "Drum Decoration",
              className:
                "w-16 bottom-30 right-3 md:w-32 md:bottom-10 md:right-10",
            },
          ]}
          textPositionClass="-mt-20 md:mt-0"
          imageClass="-ml-4 md:ml-0"
        />
      </Fade>

      {/* --- CARD 2: WORKSHOPS --- */}
      <Fade
        direction="up"
        triggerOnce
        className="w-full flex justify-center -mt-28 z-20"
      >
        <BannerEventCard
          title="WORKSHOPS"
          description="Workshops focus on fun and creative engagement across different art-related themes. They are designed to be interactive and enjoyable for everyone."
          mobileDescription="Workshops focus on fun and creative engagement across different art-related themes."
          link="/workshops"
          bannerImage="/img/events/events-card-26-workshops.png"
          mobileBannerImage="/img/events/events-card-26-workshops-mobile.png"
          buttonColorClass="bg-gradient-to-r from-[#25B3B2] to-[#269593] border-[#269998] text-white hover:scale-105 shadow-[-1px_3px_4px_rgba(0,0,0,0.25)]"
          decorations={[
            {
              src: "/img/events/hat-workshop-card.png",
              alt: "Hat Decoration",
              className: "w-20 top-2 right-1 md:w-40 md:top-1 md:-right-8",
            },
            {
              src: "/img/events/guitar-workshop-card.png",
              alt: "Guitar Decoration",
              className:
                "w-20 h-auto bottom-26 left-1 md:w-35 md:bottom-10 md:left-2",
            },
            {
              src: "/img/events/chilly-workshop-card.png",
              alt: "Chilly Decoration",
              className: "block w-15 h-auto bottom-28 right-1 md:hidden ",
            },
          ]}
          textPositionClass="-mt-20 md:mt-0"
        />
      </Fade>

      {/* --- CARD 3: EVENTS --- */}
      <Fade
        direction="up"
        triggerOnce
        className="w-full flex justify-center z-30 -mt-28"
      >
        <BannerEventCard
          title="EVENTS"
          description="Events include a range of fun and creative activities. They aim to encourage participation and create an engaging atmosphere throughout."
          mobileDescription="Events include a range of fun and creative activities."
          link="/events"
          bannerImage="/img/events/events-card-26-events.png"
          mobileBannerImage="/img/events/events-card-26-events-mobile.png"
          buttonColorClass="bg-gradient-to-r from-[#FF982B] to-[#FC4C04] border-[#FD5609] text-white hover:scale-105 shadow-[-1px_3px_4px_rgba(0,0,0,0.25)]"
          decorations={[
            {
              src: "/img/events/samosa-events-card.png",
              alt: "Samosa Decoration",
              className: "w-20 bottom-10 left-3 md:w-40 md:bottom-20 md:left-2",
            },
          ]}
        />
      </Fade>
    </div>
  );
};

export default EventsCard;
