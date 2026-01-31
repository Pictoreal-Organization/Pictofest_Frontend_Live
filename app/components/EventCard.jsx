"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "@/app/api";
import { FaCartShopping } from "react-icons/fa6";

const EventCard = ({ data, index }) => {

  const router = useRouter();

  const handleReadMore = () => {
    router.push(`/individual/${data.id}`);
  };

  // const handleAddToCart = async () => {
  //   try {
  //     const response = await api.post(`/cart/`, { event_id: data.id });
  //     toast.success(response.data.message);
  //     if (!data?.price || data.price === 0) {
  //       router.push("/order");
  //     }
  //   } catch (err) {
  //     console.log(err.response.data.message);
  //     toast.error(err.response.data.message);
  //   }
  // };

  const handleEarlyBirdClick = () => {
    toast.info("Early Bird offer — please ask at the desk");
  };


  const handleAddToCart = async () => {
    // Navigate to individual page if event_code is "PH"
    if (data?.event_code === "PH") {
      router.push(`/individual/${data.id}#bottom`);
      return;
    }

    try {
      const response = await api.post(`/cart/`, { event_id: data.id });
      toast.success(response.data.message);
      if (!data?.price || data.price === 0) {
        router.push("/order");
      }
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
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

  const isEarlyBird =
    data?.event_code === "PCF" ||
    data?.event_code === "LRP" ||
    data?.event_code === "PCFI";

  const originalPrice = data?.price; // REAL price → cart
  const displayDiscountedPrice = originalPrice ? originalPrice - 50 : 0; // UI only


  return (
    <>
      {/* Desktop Version */}
      <div className="relative hidden lg:block w-full aspect-[347/176] min-h-[230px] max-h-[390px]">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={bgSrc}
            alt="Event Card Background"
            fill
            className={isCustomLogo ? "object-contain" : "object-cover"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setBgSrc(defaultCardImage)}
            priority={index < 2}
          />
        </div>

        {/* Early Bird Offer Badge - Desktop */}
        {(data?.event_code === "PCF" || data?.event_code === "LRP" || data?.event_code === "PCFI") && (
          <div className="absolute -top-3 -right-3 z-20 ">
            <div className="relative">
              {/* Starburst Badge */}
              <div className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-full p-0.5 shadow-xl transform hover:scale-110 transition-transform duration-300" onClick={handleEarlyBirdClick}>
                <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-full px-4 py-2.5 flex flex-col items-center justify-center min-w-[100px]">
                  <div className="text-white font-bold text-[11px] uppercase tracking-wider leading-tight text-center drop-shadow-lg">
                    Early Bird
                  </div>
                  <div className="text-yellow-300 font-extrabold text-sm uppercase tracking-wide leading-tight drop-shadow-lg">
                    Offer!
                  </div>
                </div>
              </div>
              {/* Sparkle Effects */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        )}

        {/* Event Name*/}
        <div className="relative z-10 w-full h-full">
          <h2 className={`sub-heading-font text-[#FBF0AD] line-clamp-2 text-center absolute bottom-[67%] w-[55%] ${isOddIndex ? "left-[5%]" : "right-[5%]"
            } ${data.name === "Texture Art + Neon fluid painting"
              ? "text-xs sm:text-sm md:text-base lg:text-lg" // Decreased from text-sm
              : "text-sm sm:text-base md:text-lg lg:text-xl" // Decreased from text-base
            }`}>
            {data?.name}
          </h2>
        </div>

        {/* Price Section*/}
        <div className="relative z-10 w-full h-full">
          <div className={`text-center absolute -top-[60%] w-[65%] ${isOddIndex
            ? "-left-[2%]"
            : "-right-[1.3%]"
            }`}>
            {/* PRICE (unchanged from original) */}
            <div className="sub-heading-font text-[#F6EDC8] text-sm md:text-sm lg:text-base mb-1 select-none">
              PRICE
            </div>

            {/* PRICE VALUE (with Early Bird logic) */}
            <div className="sub-heading-font text-[#FBCC12] text-xl md:text-2xl lg:text-2xl flex items-center justify-center gap-2">
              {isEarlyBird && originalPrice ? (
                <>
                  <span className="text-[#F6EDC8] line-through opacity-100 text-base md:text-lg select-none">
                    Rs. {originalPrice}/-
                  </span>
                  <span className="text-[#FBCC12] font-bold select-none">
                    Rs. {displayDiscountedPrice}/-
                  </span>
                </>
              ) : (
                <>
                  {originalPrice ? `Rs. ${originalPrice}/-` : "Free"}
                </>
              )}
            </div>
          </div>
        </div>



        {/* Buttons*/}
        <div className="relative z-10 w-full h-full">
          <div className={`flex gap-3 md:gap-4 lg:gap-5 absolute -top-[130%] ${isOddIndex
            ? "left-[9%]"
            : "right-[9%]"
            }`}>
            {/* Add to Cart / Register Button */}
            <div className="relative group cursor-pointer flex-shrink-0" onClick={handleAddToCart}>
              <div className="relative w-[70px] md:w-[80px] lg:w-[90px] h-[26px] md:h-[30px] lg:h-[34px]">
                <Image
                  src={buttonImage}
                  alt="Add to Cart Button"
                  fill
                  className="object-contain group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <span className="text-white sub-heading-font flex items-center justify-center gap-0.5 md:gap-1 text-xs md:text-sm lg:text-base whitespace-nowrap">
                    {data?.price ? (
                      <FaCartShopping className="text-white text-xs md:text-sm lg:text-base" />
                    ) : (
                      <span className="text-xs md:text-xs lg:text-xs">Register</span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Read More Button */}
            <div className="relative group cursor-pointer flex-shrink-0" onClick={handleReadMore}>
              <div className="relative w-[70px] md:w-[80px] lg:w-[90px] h-[26px] md:h-[30px] lg:h-[34px]">
                <Image
                  src={buttonImage}
                  alt="Read More Button"
                  fill
                  className="object-contain group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <span className="text-white select-none pointer-events-none sub-heading-font flex items-center justify-center text-xs md:text-xs lg:text-xs whitespace-nowrap">
                    Read More
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="relative lg:hidden w-full aspect-[347/176] min-h-[160px] max-h-[220px]">
        {/* Background Card Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={bgSrc}
            alt="Event Card Background"
            fill
            className={isCustomLogo ? "object-contain" : "object-cover"}
            sizes="100vw"
            onError={() => setBgSrc(defaultCardImage)}
          />
        </div>

        {/* Early Bird Offer Badge - Mobile */}
        {(data?.event_code === "PCF" || data?.event_code === "LRP" || data?.event_code === "PCFI") && (
          <div className="absolute -top-3 -right-1 z-20 ">
            <div className="relative">
              {/* Compact Badge for Mobile */}
              <div className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-full p-0.5 shadow-lg transform hover:scale-110 transition-transform duration-300" onClick={handleEarlyBirdClick}>
                <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-full px-2.5 py-1.5 flex flex-col items-center justify-center min-w-[70px]">
                  <div className="text-white font-bold text-[8px] uppercase tracking-wider leading-tight text-center drop-shadow-md">
                    Early Bird
                  </div>
                  <div className="text-yellow-300 font-extrabold text-[9px] uppercase tracking-wide leading-tight drop-shadow-md">
                    Offer!
                  </div>
                </div>
              </div>
              {/* Sparkle Effects */}
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        )}

        {/* Event Name*/}
        <div className="relative z-10  h-full px-10">
          <h2 className={`sub-heading-font text-[#FBF0AD] line-clamp-2 text-center absolute bottom-[67%] w-[55%] ${isOddIndex
            ? "left-[5.5%]"
            : "right-[3.5%]"
            } ${data.name === "Texture Art + Neon fluid painting"
              ? "text-[13px] sm:text-[12px]"
              : "text-[16px] sm:text-[14px]"
            }`}>
            {data?.name}
          </h2>
        </div>

        {/* Price Section*/}
        <div className="relative z-10 w-full h-full">
          <div className={`text-center absolute -top-[58%] w-[55%] ${isOddIndex
            ? "left-[3.2%]"
            : "right-[3.9%]"
            }`}>
            {/* Price label (original style) */}
            <div className="sub-heading-font uppercase text-[#F6EDC8] text-[11px] sm:text-[12px] mb-1 select-none">
              Price
            </div>

            {/* Price value */}
            <div className="sub-heading-font text-[#FBCC12] text-[15px] xs:text-[15px] sm:text-[16px] flex items-center justify-center gap-1.5">
              {isEarlyBird && originalPrice ? (
                <>
                  <span className="text-[#F6EDC8] line-through opacity-100 text-[12px] sm:text-[13px] select-none">
                    Rs. {originalPrice}/-
                  </span>
                  <span className="text-[#FBCC12] font-bold select-none">
                    Rs. {displayDiscountedPrice}/-
                  </span>
                </>
              ) : (
                <>
                  {originalPrice ? `Rs. ${originalPrice}/-` : "Free"}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Buttons*/}
        <div className="relative z-10 w-full h-full">
          <div className={`flex gap-2 sm:gap-2.5 absolute -top-[130%] ${isOddIndex
            ? "left-[15%]"
            : "right-[14%]"
            }`}>
            {/* Add to Cart / Register Button */}
            <div className="relative group cursor-pointer flex-shrink-0" onClick={handleAddToCart}>
              <div className="relative w-[55px] sm:w-[60px] h-[20px] sm:h-[22px]">
                <Image
                  src={buttonImage}
                  alt="Add to Cart Button"
                  fill
                  className="object-contain group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <span className="text-white sub-heading-font flex items-center justify-center gap-0.5 text-[9px] sm:text-[10px] whitespace-nowrap">
                    {data?.price ? (
                      <FaCartShopping className="text-white text-[8px] sm:text-[10px]" />
                    ) : (
                      "Register"
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Read More Button */}
            <div className="relative group cursor-pointer flex-shrink-0" onClick={handleReadMore}>
              <div className="relative w-[55px] sm:w-[60px] h-[20px] sm:h-[22px]">
                <Image
                  src={buttonImage}
                  alt="Read More Button"
                  fill
                  className="object-contain group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <span className="text-white select-none pointer-events-none sub-heading-font flex items-center justify-center text-[8px] sm:text-[10px] whitespace-nowrap">
                    Read More
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
export default EventCard;