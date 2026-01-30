// "use client";

// import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import Link from "next/link";
// import { motion } from "framer-motion";

// // Dynamically import the Lottie player with SSR disabled
// const DotLottiePlayer = dynamic(
//   () => import("@dotlottie/react-player").then((mod) => mod.DotLottiePlayer),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="w-80 h-80 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
//       </div>
//     ),
//   }
// );

// const PrizePool = () => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) return null;

//   return (
//     <>
//     <div>
//       {/* <Link href="/voting">
//       <motion.button
//           className="px-6 py-3 text-2xl body-font bg-[#4E3506] hover:bg-[#4e3506d0] text-white rounded-lg flex items-center justify-center mt-4 shadow-lg mx-auto"
//           whileHover={{ scale: 1.2 }} // Button enlarges slightly on hover
//           whileTap={{ scale: 0.95 }} // Shrinks when clicked
//           animate={{
//             scale: [1, 1.1, 1], // Creates a pulsing effect
//             boxShadow: [
//               "0px 0px 5px rgba(255, 200, 0, 0.5)",
//               "0px 0px 15px rgba(255, 200, 0, 0.8)",
//               "0px 0px 5px rgba(255, 200, 0, 0.5)",
//             ],
//           }}
//           transition={{
//             repeat: Infinity,
//             duration: 2,
//             ease: "easeInOut",
//           }}
//         >
//           Vote Now
//         </motion.button>
//       </Link> */}
//     </div>
//       <div className="flex flex-col items-center justify-center min-h-[400px] w-full px-4 mt-20 lg:mt-40 z-10">
//         <div className="relative w-full max-w-md h-[350px] md:max-w-lg lg:max-w-4xl lg:h-[500px] rounded-lg shadow-lg p-6 flex flex-col items-center overflow-hidden">
//           {/* Rotating Background */}
//           <div
//             className="absolute inset-0 bg-cover bg-center animate-rotate-bg"
//             style={{
//               backgroundImage: "url(/img/home/PrizePool.svg)",
//               transformOrigin: "center",
//               scale: "2.5", // Ensures no empty spaces at the edges
//             }}
//           ></div>

//           {/* Foreground Content */}
//           <div className="relative z-0 flex flex-col items-center">
//             {/* Lottie Animation */}
//             <div className="w-64 h-44 mt-20 md:mt-0 lg:w-98 lg:h-98 md:hidden">
//               <DotLottiePlayer
//                 src="https://lottie.host/63cb9c23-46b7-47ec-8c1f-00b018637004/479rgyU5hN.lottie"
//                 width="100%"
//                 autoplay
//                 loop={false}
//               />
//             </div>
//             <div className="w-98 h-98 mt-20 md:mt-0 lg:w-98 lg:h-98 hidden md:block">
//               <DotLottiePlayer
//                 src="https://lottie.host/63cb9c23-46b7-47ec-8c1f-00b018637004/479rgyU5hN.lottie"
//                 width="100%"
//                 autoplay
//                 loop={false}
//               />
//             </div>

//             {/* Heading */}
//             <h2 className="text-2xl md:text-5xl font-bold text-[#4E3506] mb-4 text-center heading-font">
//               PRIZE POOL : ₹30,000
//             </h2>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PrizePool;
