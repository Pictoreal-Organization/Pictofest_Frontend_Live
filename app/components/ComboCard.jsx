// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import api from "@/app/api";
// import { FaCartShopping } from "react-icons/fa6";

// const ComboCard = ({ data, index }) => {
//   const handleAddToCart = async () => {
//     try {
//       const response = await api.post(`/cart/combo`, { 
//         event_codes: data.event_codes 
//       });
//       toast.success(response.data.message);
//     } catch (err) {
//       console.log(err.response?.data?.message);
//       toast.error(err.response?.data?.message || "Failed to add combo to cart");
//     }
//   };

//   const isOddIndex = index % 2 !== 0;

//   const defaultCardImage = isOddIndex
//     ? "/img/events/red-card26.svg"
//     : "/img/events/green-card26.svg";

//   const [bgSrc, setBgSrc] = useState(defaultCardImage);

//   useEffect(() => {
//     if (data?.logo_link) {
//       setBgSrc(data.logo_link);
//     } else {
//       setBgSrc(defaultCardImage);
//     }
//   }, [data?.logo_link, defaultCardImage]);

//   const buttonImage = isOddIndex
//     ? "/img/events/green-button26.svg"
//     : "/img/events/orange-button26.svg";

//   const isCustomLogo = !!data?.logo_link;

//   return (
//     <>
//       {/* Desktop Version */}
//       <div className="relative hidden lg:block w-full aspect-[347/176] min-h-[230px] max-h-[390px]">
//         <div className="absolute inset-0 w-full h-full z-0">
//           <Image
//             src={bgSrc}
//             alt="Combo Card Background"
//             fill
//             className={isCustomLogo ? "object-contain" : "object-cover"}
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             onError={() => setBgSrc(defaultCardImage)}
//             priority={index < 2}
//           />
//         </div>

//         {/* Combo Name */}
//         <div className="relative z-10 w-full h-full">
//           <h2 className={`sub-heading-font text-[#FBF0AD] line-clamp-2 text-center absolute bottom-[67%] w-[55%] ${
//             isOddIndex ? "left-[5%]" : "right-[5%]"
//           } text-sm sm:text-base md:text-lg lg:text-xl`}>
//             {data?.name}
//           </h2>
//         </div>

//         {/* Price Section */}
//         <div className="relative z-10 w-full h-full">
//           <div className={`text-center absolute -top-[60%] w-[65%] ${
//             isOddIndex ? "-left-[2%]" : "-right-[1.3%]"
//           }`}>
//             <div className="sub-heading-font text-[#F6EDC8] text-sm md:text-sm lg:text-base mb-1 select-none">
//               COMBO PRICE
//             </div>
//             <div className="sub-heading-font text-[#FBCC12] text-xl md:text-2xl lg:text-2xl flex items-center justify-center gap-2">
//               {data?.originalPrice && (
//                 <span className="text-[#F6EDC8] line-through opacity-100 text-base md:text-lg select-none">
//                   Rs. {data.originalPrice}/-
//                 </span>
//               )}
//               <span className="text-[#FBCC12] font-bold select-none">
//                 Rs. {data?.price}/-
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Add to Cart Button */}
//         <div className="relative z-10 w-full h-full">
//           <div className={`flex gap-3 md:gap-4 lg:gap-5 absolute -top-[130%] ${
//             isOddIndex ? "left-[17%]" : "right-[17%]"
//           }`}>
//             <div className="relative group cursor-pointer flex-shrink-0" onClick={handleAddToCart}>
//               <div className="relative w-[120px] md:w-[130px] lg:w-[140px] h-[26px] md:h-[30px] lg:h-[34px]">
//                 <Image
//                   src={buttonImage}
//                   alt="Add Combo to Cart"
//                   fill
//                   className="object-contain group-hover:opacity-90 transition-opacity"
//                 />
//                 <div className="absolute inset-0 z-10 flex items-center justify-center">
//                   <span className="text-white sub-heading-font flex items-center justify-center gap-1 text-xs md:text-sm lg:text-base whitespace-nowrap">
//                     <FaCartShopping className="text-white text-xs md:text-sm lg:text-base" />
//                     {/* <span>Add Combo</span> */}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Version */}
//       <div className="relative lg:hidden w-full aspect-[347/176] min-h-[160px] max-h-[220px]">
//         <div className="absolute inset-0 w-full h-full z-0">
//           <Image
//             src={bgSrc}
//             alt="Combo Card Background"
//             fill
//             className={isCustomLogo ? "object-contain" : "object-cover"}
//             sizes="100vw"
//             onError={() => setBgSrc(defaultCardImage)}
//           />
//         </div>

//         {/* Combo Name */}
//         <div className="relative z-10 h-full px-10">
//           <h2 className={`sub-heading-font text-[#FBF0AD] line-clamp-2 text-center absolute bottom-[67%] w-[55%] ${
//             isOddIndex ? "left-[5.5%]" : "right-[3.5%]"
//           } text-[14px] sm:text-[13px]`}>
//             {data?.name}
//           </h2>
//         </div>

//         {/* Price Section */}
//         <div className="relative z-10 w-full h-full">
//           <div className={`text-center absolute -top-[58%] w-[55%] ${
//             isOddIndex ? "left-[3.2%]" : "right-[3.9%]"
//           }`}>
//             <div className="sub-heading-font uppercase text-[#F6EDC8] text-[10px] sm:text-[11px] mb-1 select-none">
//               Combo Price
//             </div>
//             <div className="sub-heading-font text-[#FBCC12] text-[14px] xs:text-[14px] sm:text-[15px] flex items-center justify-center gap-1.5">
//               {data?.originalPrice && (
//                 <span className="text-[#F6EDC8] line-through opacity-100 text-[11px] sm:text-[12px] select-none">
//                   Rs. {data.originalPrice}/-
//                 </span>
//               )}
//               <span className="text-[#FBCC12] font-bold select-none">
//                 Rs. {data?.price}/-
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Add to Cart Button */}
//         <div className="relative z-10 w-full h-full">
//           <div className={`flex gap-2 sm:gap-2.5 absolute -top-[130%] ${
//             isOddIndex ? "left-[18%]" : "right-[18%]"
//           }`}>
//             <div className="relative group cursor-pointer flex-shrink-0" onClick={handleAddToCart}>
//               <div className="relative w-[85px] sm:w-[90px] h-[20px] sm:h-[22px]">
//                 <Image
//                   src={buttonImage}
//                   alt="Add Combo to Cart"
//                   fill
//                   className="object-contain group-hover:opacity-90 transition-opacity"
//                 />
//                 <div className="absolute inset-0 z-10 flex items-center justify-center">
//                   <span className="text-white sub-heading-font flex items-center justify-center gap-0.5 text-[8px] sm:text-[9px] whitespace-nowrap">
//                     <FaCartShopping className="text-white text-[10px] sm:text-[15px]" />
//                     {/* <span>Add Combo</span> */}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ComboCard;




"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "@/app/api";
import { FaCartShopping } from "react-icons/fa6";

const ComboCard = ({ data, index }) => {
  // const handleAddToCart = async () => {
  //   try {
  //     const response = await api.post(`/cart/combo`, { 
  //       event_codes: data.event_codes 
  //     });
      
  //     // Get existing combo codes from localStorage
  //     const existingComboCodes = JSON.parse(localStorage.getItem("combo_event_codes") || "[]");
      
  //     // Add new combo codes (avoid duplicates)
  //     const updatedComboCodes = [...new Set([...existingComboCodes, ...data.event_codes])];
      
  //     // Store which event codes came from combo
  //     localStorage.setItem("combo_event_codes", JSON.stringify(updatedComboCodes));
      
  //     toast.success(response.data.message);
  //   } catch (err) {
  //     console.log(err.response?.data?.message);
  //     toast.error(err.response?.data?.message || "Failed to add combo to cart");
  //   }
  // };

  const handleAddToCart = async () => {
    try {
      // Get existing combo codes from localStorage
      const existingComboCodes = JSON.parse(localStorage.getItem("combo_event_codes") || "[]");
      
      // Check if any event in the new combo conflicts with existing combo
      const conflictingEvents = data.event_codes.filter(code => 
        existingComboCodes.includes(code)
      );
      
      if (conflictingEvents.length > 0) {
        toast.error(
          `You have already added a combo containing ${conflictingEvents.join(', ')}. Please remove the existing combo first.`
        );
        return;
      }
      
      const response = await api.post(`/cart/combo`, { 
        event_codes: data.event_codes 
      });
      
      // Add new combo codes (avoid duplicates - though shouldn't happen now)
      const updatedComboCodes = [...new Set([...existingComboCodes, ...data.event_codes])];
      
      // Store which event codes came from combo
      localStorage.setItem("combo_event_codes", JSON.stringify(updatedComboCodes));
      
      toast.success(response.data.message);
    } catch (err) {
      console.log(err.response?.data?.message);
      toast.error(err.response?.data?.message || "Failed to add combo to cart");
    }
  };

  const isOddIndex = index % 2 !== 0;

  const defaultCardImage = isOddIndex
    ? "/img/events/red-card26.svg"
    : "/img/events/green-card26.svg";

  const [bgSrc, setBgSrc] = useState(defaultCardImage);

  useEffect(() => {
    if (data?.logo_link) {
      setBgSrc(data.logo_link);
    } else {
      setBgSrc(defaultCardImage);
    }
  }, [data?.logo_link, defaultCardImage]);

  const buttonImage = isOddIndex
    ? "/img/events/green-button26.svg"
    : "/img/events/orange-button26.svg";

  const isCustomLogo = !!data?.logo_link;

  return (
    <>
      {/* Desktop Version */}
      <div className="relative hidden lg:block w-full aspect-[347/176] min-h-[230px] max-h-[390px]">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={bgSrc}
            alt="Combo Card Background"
            fill
            className={isCustomLogo ? "object-contain" : "object-cover"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setBgSrc(defaultCardImage)}
            priority={index < 2}
          />
        </div>

        {/* Combo Name */}
        <div className="relative z-10 w-full h-full">
          <h2 className={`sub-heading-font text-[#FBF0AD] line-clamp-2 text-center absolute bottom-[67%] w-[55%] ${
            isOddIndex ? "left-[5%]" : "right-[5%]"
          } text-sm sm:text-base md:text-lg lg:text-xl`}>
            {data?.name}
          </h2>
        </div>

        {/* Price Section */}
        <div className="relative z-10 w-full h-full">
          <div className={`text-center absolute -top-[60%] w-[65%] ${
            isOddIndex ? "-left-[2%]" : "-right-[1.3%]"
          }`}>
            <div className="sub-heading-font text-[#F6EDC8] text-sm md:text-sm lg:text-base mb-1 select-none">
              COMBO PRICE
            </div>
            <div className="sub-heading-font text-[#FBCC12] text-xl md:text-2xl lg:text-2xl flex items-center justify-center gap-2">
              {data?.originalPrice && (
                <span className="text-[#F6EDC8] line-through opacity-100 text-base md:text-lg select-none">
                  Rs. {data.originalPrice}/-
                </span>
              )}
              <span className="text-[#FBCC12] font-bold select-none">
                Rs. {data?.price}/-
              </span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="relative z-10 w-full h-full">
          <div className={`flex gap-3 md:gap-4 lg:gap-5 absolute -top-[130%] ${
            isOddIndex ? "left-[17%]" : "right-[17%]"
          }`}>
            <div className="relative group cursor-pointer flex-shrink-0" onClick={handleAddToCart}>
              <div className="relative w-[120px] md:w-[130px] lg:w-[140px] h-[26px] md:h-[30px] lg:h-[34px]">
                <Image
                  src={buttonImage}
                  alt="Add Combo to Cart"
                  fill
                  className="object-contain group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <span className="text-white sub-heading-font flex items-center justify-center gap-1 text-xs md:text-sm lg:text-base whitespace-nowrap">
                    <FaCartShopping className="text-white text-xs md:text-sm lg:text-base" />
                    {/* <span>Add Combo</span> */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="relative lg:hidden w-full aspect-[347/176] min-h-[160px] max-h-[220px]">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={bgSrc}
            alt="Combo Card Background"
            fill
            className={isCustomLogo ? "object-contain" : "object-cover"}
            sizes="100vw"
            onError={() => setBgSrc(defaultCardImage)}
          />
        </div>

        {/* Combo Name */}
        <div className="relative z-10 h-full px-10">
          <h2 className={`sub-heading-font text-[#FBF0AD] line-clamp-2 text-center absolute bottom-[67%] w-[55%] ${
            isOddIndex ? "left-[5.5%]" : "right-[3.5%]"
          } text-[14px] sm:text-[13px]`}>
            {data?.name}
          </h2>
        </div>

        {/* Price Section */}
        <div className="relative z-10 w-full h-full">
          <div className={`text-center absolute -top-[58%] w-[55%] ${
            isOddIndex ? "left-[3.2%]" : "right-[3.9%]"
          }`}>
            <div className="sub-heading-font uppercase text-[#F6EDC8] text-[10px] sm:text-[11px] mb-1 select-none">
              Combo Price
            </div>
            <div className="sub-heading-font text-[#FBCC12] text-[14px] xs:text-[14px] sm:text-[15px] flex items-center justify-center gap-1.5">
              {data?.originalPrice && (
                <span className="text-[#F6EDC8] line-through opacity-100 text-[11px] sm:text-[12px] select-none">
                  Rs. {data.originalPrice}/-
                </span>
              )}
              <span className="text-[#FBCC12] font-bold select-none">
                Rs. {data?.price}/-
              </span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="relative z-10 w-full h-full">
          <div className={`flex gap-2 sm:gap-2.5 absolute -top-[130%] ${
            isOddIndex ? "left-[15%]" : "right-[15%]"
          }`}>
            <div className="relative group cursor-pointer flex-shrink-0" onClick={handleAddToCart}>
              <div className="relative w-[100px] sm:w-[110px] h-[20px] sm:h-[22px]">
                <Image
                  src={buttonImage}
                  alt="Add Combo to Cart"
                  fill
                  className="object-contain group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <span className="text-white sub-heading-font flex items-center justify-center gap-0.5 text-[8px] sm:text-[9px] whitespace-nowrap">
                    <FaCartShopping className="text-white text-[10px] sm:text-[15px]" />
                    {/* <span>Add Combo</span> */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComboCard;