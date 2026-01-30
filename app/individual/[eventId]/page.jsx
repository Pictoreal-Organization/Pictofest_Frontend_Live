"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { baseURL } from "@/app/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/app/api";
import { motion, AnimatePresence } from "framer-motion";
import { FaCartShopping, FaArrowLeft } from "react-icons/fa6";
import { useParams } from "next/navigation";

const Individual = () => {
  const { eventId } = useParams();
  const [data, setData] = useState({});
  const router = useRouter();

  const [needPhotocopy, setNeedPhotocopy] = useState(false);
  const photocopyCheckboxRef = useRef(null);

  const getData = async (eventId) => {
    try {
      const response = await axios.get(`${baseURL}/events/${eventId}`);
      setData(response.data.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load event details");
    }
  };

  useEffect(() => {
    getData(eventId);
  }, [eventId]);

  useEffect(() => {
    // Handle hash navigation for Photography events
    if (typeof window !== "undefined" && window.location.hash === "#bottom") {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        if (isMobile) {
          const el = document.getElementById("mobile-photocopy");
          if (el) {
            const rect = el.getBoundingClientRect();
            const y = window.scrollY + rect.top - 120;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        } else {
          if (photocopyCheckboxRef.current) {
            photocopyCheckboxRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }

        // Remove hash from URL after scrolling
        window.history.replaceState(null, null, window.location.pathname);
      }, 500);
    }
  }, [data]);

  const handleAddToCart = async () => {
    try {
      const payload = {
        event_id: data.id,
        ...(data.event_code === "PH" && {
          photocopy_needed: needPhotocopy,
        }),
      };
      const response = await api.post(`/cart/`, payload);
      toast.success(response.data.message);
      if (!data?.price || data.price === 0) {
        router.push("/order"); // change to your actual orders route
      }
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  // const handleScrollToCheckbox = () => {
  //   if (typeof window === "undefined") return;

  //   const isMobile = window.matchMedia("(max-width: 767px)").matches;

  //   if (isMobile && data?.event_code === "PH") {
  //     const el = document.getElementById("mobile-photocopy");
  //     if (el) {
  //       const rect = el.getBoundingClientRect();
  //       const y = window.scrollY + rect.top - 120;

  //       window.scrollTo({
  //         top: y,
  //         behavior: "smooth",
  //       });
  //       return;
  //     }
  //   }

  //   // Desktop or non-PH: directly add to cart
  //   handleAddToCart();
  // };

  const handleScrollToCheckbox = () => {
    if (typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (isMobile && data?.event_code === "PH") {
      const el = document.getElementById("mobile-photocopy");
      if (el) {
        const rect = el.getBoundingClientRect();
        const y = window.scrollY + rect.top - 120;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
        return;
      }
    }

    // Desktop PH event: scroll to checkbox
    if (
      !isMobile &&
      data?.event_code === "PH" &&
      photocopyCheckboxRef.current
    ) {
      photocopyCheckboxRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    // Non-PH events: directly add to cart
    handleAddToCart();
  };

  const handleBack = () => {
    router.back();
  };

  const descriptionContent = data?.description
    ? {
        __html: data.description
          .replace(
            /Fragments of Time/g,
            '<span class="font-extrabold">Fragments of Time</span>'
          )
          .replace(/no refund/gi, "<strong>no refund</strong>")
          .replace(
            /Everyday India./g,
            '<span class="block text-center font-bold my-3">Everyday India</span>'
          )
          .replace(
            /@Pictoreal/gi,
            '<a href="https://www.instagram.com/pictoreal?igsh=ajM5Z2hwMWhrOXl3" target="_blank" rel="noopener noreferrer" class="text-[#E97400] font-bold underline hover:opacity-80 transition-opacity">@Pictoreal</a>'
          ),
      }
    : null;

  // Map event_code to workshop images
  const workshopImageMap = {
    lrp: "/img/workshops/lotus-resin.jpeg",
    pwc: "/img/workshops/play-with-clay.jpg",
    pcf: "/img/workshops/pipe-cleaner-flowers.jpeg",
    pcfi: "/img/workshops/pipe-cleaner-flowers.jpeg",
  };

  // Get workshop image based on event_code
  const workshopImage = data?.event_code
    ? workshopImageMap[data.event_code.toLowerCase()]
    : null;

  const MM_CATEGORIES = [
    {
      id: 1,
      name: "Everyday Chaos",
      concept: "Create memes based on everyday life situations that feel overly dramatic, daily struggles, family drama, small problems, epic reactions.",
      mediaUrl: "/img/events/meme_making/everyday_chaos.png",
      example:
        "When you swear you checked everywhere, and your mom proves you wrong in two seconds.",
      type: "image",
    },
    {
      id: 2,
      name: "Only Happens at College Fests",
      concept:
        "Memes on funny, chaotic, and unforgettable moments that happen only during college events/fests.",
      mediaUrl: "/img/events/meme_making/Only_Happens_At_College_Fest.png",
      example:
        "Me at the college fest: appreciating art, enrolling in workshops, and strategically hunting every free snack.",
      type: "image",
    },
    {
      id: 3,
      name: "The Student Life Nobody Warned Us About",
      concept:
        "Memes about the hidden reality of college that no brochure shows.",
      mediaUrl: "/img/events/meme_making/student_life.mp4",
      example:
        "World-class campus life” → Running like it’s a relay race just to save attendance.",
      type: "video",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* ============================================================
                    DYNAMIC BACKGROUND LAYER
      ============================================================ */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        {/* Mobile Background */}
        <div className="block md:hidden w-full h-full relative">
          <Image
            src="/img/home/mobile-bg.png"
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

      {/* ============================================================
                            EVENT CONTENT
    ============================================================ */}
      <div className="relative z-10">
        {/* MOBILE LAYOUT */}
        <div className="block md:hidden">
          <motion.div
            className="h-fit w-full text-justify text-[#67230F] flex flex-col px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mobile Content Container */}
            <motion.div
              className="w-full flex flex-col mt-20 mb-4 gap-6 bg-[#FEE2B2] p-4 relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Top Border */}
              <div className="w-auto -ml-[34.85px] h-12 -mt-9 relative translate-x-[18.8px]">
                <Image
                  src="/img/events/mob-top-border26.svg"
                  alt="Top Border"
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>

              {/* Header SVG Title */}
              <div className="w-full flex justify-center mt-2">
                <div className="relative w-full max-w-[320px]">
                  <svg
                    width="100%"
                    height="70"
                    viewBox="0 0 320 70"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0 0 L 320 0 L 300 35 L 320 70 L 0 70 L 20 35 Z"
                      fill="#08525F"
                    />
                    <path
                      d="M 8 8 L 312 8 L 292 35 L 312 62 L 8 62 L 28 35 Z"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                    />
                    {/* <text
                      x="160"
                      y="42"
                      textAnchor="middle"
                      fill="white"
                      fontSize="18"
                      fontWeight="700"
                      letterSpacing="1"
                      className="sub-heading-font"
                    >
                      {data?.name}
                    </text> */}
                    {(data?.event_code?.toUpperCase() === "PCF" || data?.event_code?.toUpperCase() === "PCFI") ? (
  <>
    <text
      x="160"
      y="32"
      textAnchor="middle"
      fill="white"
      fontSize="20"
      fontWeight="700"
      letterSpacing="1"
      className="sub-heading-font"
    >
      {data?.name?.substring(0, data?.name?.lastIndexOf('('))?.trim()}
    </text>
    <text
      x="160"
      y="54"
      textAnchor="middle"
      fill="white"
      fontSize="17"
      fontWeight="700"
      letterSpacing="1"
      className="sub-heading-font"
    >
      {data?.name?.substring(data?.name?.lastIndexOf('('))}
    </text>
  </>
) : (
  <text
    x="160"
    y="42"
    textAnchor="middle"
    fill="white"
    fontSize="18"
    fontWeight="700"
    letterSpacing="1"
    className="sub-heading-font"
  >
    {data?.name}
  </text>
)}
                  </svg>
                </div>
              </div>

              {/* TOP ACTION BUTTON */}
              <div className="w-full flex justify-center">
                <button
                  onClick={handleScrollToCheckbox}
                  className="bg-[#08525F] rounded-2xl px-6 py-3 hover:opacity-90 transition-all duration-300 flex items-center justify-center shadow-lg w-full max-w-[200px] sub-heading-font text-white"
                >
                  {data.price ? (
                    <FaCartShopping className="text-xl mr-5" />
                  ) : null}
                  <span>{data?.price ? "Add to Cart" : "Register"}</span>
                </button>
              </div>

              {/* 1. EVENT DETAILS */}
              <motion.div
                className="w-full flex flex-col relative mt-4"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-[#E97400] rounded-lg z-0 shadow-xl"></div>
                <div className="relative z-10 p-4 flex flex-col items-center">
                  <div className="border-2 border-dashed border-white rounded-sm p-4 w-full">
                    <div
                      className="text-xl sub-heading-font mb-4 pb-2 relative text-white text-center w-full"
                      style={{ letterSpacing: "3.42px" }}
                    >
                      Event Details
                    </div>
                    <div className="-mt-6 relative w-full h-5">
                      <Image
                        src="/img/events/line26.svg"
                        alt="Line"
                        fill
                        className="object-contain"
                        priority={false}
                      />
                    </div>
                    <ul className="body-font font-medium text-base list-disc pl-5 text-left text-white space-y-2 w-full">
                      <li>
                        <strong>Venue:</strong> {data?.venue}
                      </li>
                      {/* <li><strong>Date:</strong> {data?.event_date}</li> */}
                      <li>
                        <strong>
                          {data?.event_code === "MM"
                            ? "Last Date to Submit:"
                            : "Date:"}
                        </strong>{" "}
                        {data?.event_date}
                      </li>
                      <li>
                        <strong>Contact:</strong> {data?.contact_details?.name}
                      </li>
                      <li>
                        <strong>Phone:</strong> {data?.contact_details?.phone}
                      </li>
                      <li>
                        <strong>Team:</strong> {data?.team_category}
                      </li>
                      <li>
                        <strong>Price:</strong>{" "}
                        {data?.price ? "Rs. " + data.price + "/-" : "Free"}
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* 2. DESCRIPTION */}
              {descriptionContent && (
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div
                    className="text-xl text-[#572711] sub-heading-font w-full mb-4 pb-2 text-center"
                    style={{ letterSpacing: "3.42px" }}
                  >
                    Description
                  </div>
                  <div className="-mt-7 relative w-full h-7">
                    <Image
                      src="/img/events/brown-border26.svg"
                      alt="Line"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p
                    className="text-base font-normal text-[#572711] text-center body-font font-semibold px-2"
                    dangerouslySetInnerHTML={descriptionContent}
                  />
                </motion.div>
              )}

              {/* 3. RULES */}
              {data?.rules && Object.keys(data.rules).length !== 0 && (
                <motion.div
                  className="mt-2 flex flex-col"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  <div
                    className="text-xl text-[#572711] sub-heading-font w-full mb-4 pb-2 text-center"
                    style={{ letterSpacing: "3.42px" }}
                  >
                    {data?.event_category?.toUpperCase() === "EVENT"
                      ? "Rules & How to Play"
                      : "Rules"}{" "}
                  </div>
                  <div className="-mt-7 relative w-full h-7">
                    <Image
                      src="/img/events/brown-border26.svg"
                      alt="Line"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <ul className="body-font font-semibold text-[#572711] text-base text-left space-y-2 px-2">
                    {/* {Object.values(data.rules).map((rule, index) => (
                      <li key={index}>{index + 1}. {rule}</li>
                    ))} */}

                    {Object.values(data.rules).map((rule, index) => {
                      // Process the rule text
                      let processedRule = rule
                        .replace(/no refund/gi, "<strong>no refund</strong>")
                        .replace(
                          /@Pictoreal/gi,
                          '<a href="https://www.instagram.com/pictoreal?igsh=ajM5Z2hwMWhrOXl3" target="_blank" rel="noopener noreferrer" class="text-[#E97400] font-bold underline hover:opacity-80 transition-opacity">@Pictoreal</a>'
                        );

                      return (
                        <li
                          key={index}
                          dangerouslySetInnerHTML={{
                            __html: `${index + 1}. ${processedRule}`,
                          }}
                        />
                      );
                    })}
                  </ul>
                </motion.div>
              )}

              {workshopImage &&
                data?.event_category?.toUpperCase() === "WORKSHOP" && (
                  <div className="flex justify-center mt-4">
                    <div className="relative w-full max-w-[280px] aspect-square border-4 rounded-xl border-[#E97400] overflow-hidden bg-[#fbbd7f]/30">
                      <Image
                        src={workshopImage}
                        alt="Workshop"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

              {/* Photocopy Checkbox - Mobile (Only for Photography Events) */}
              {data?.event_code === "PH" && (
                <motion.div
                  id="mobile-photocopy"
                  className="w-full flex flex-col gap-3 items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white/50 rounded-xl px-4 py-4 w-full max-w-[300px] border-2 border-[#08525F] space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!needPhotocopy}
                        onChange={() => setNeedPhotocopy(false)}
                        className="w-5 h-5 rounded border-2 border-[#08525F]"
                      />
                      <span className="ml-3 text-[#572711] body-font font-semibold text-sm">
                        I will print my photographs myself
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={needPhotocopy}
                        onChange={() => setNeedPhotocopy(true)}
                        className="w-5 h-5 rounded border-2 border-[#08525F]"
                      />
                      <span className="ml-3 text-[#572711] body-font font-semibold text-sm">
                        Please print my photographs (Extra Rs.10 charges apply)
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* 5. MEME CATEGORIES (Only for MM) */}
              {data?.event_code === "MM" && (
                <div className="w-full flex flex-col items-center mt-8 pt-6 border-t border-[#E97400]/30">
                  <div className="text-xl sub-heading-font text-[#572711] mb-6 uppercase tracking-widest">
                    Event Categories
                  </div>
                  <div className="flex flex-col gap-8 w-full">
                    {MM_CATEGORIES.map((cat) => (
                      <div
                        key={cat.id}
                        className="flex flex-col bg-white/40 p-4 rounded-2xl border-2 border-[#E97400] shadow-sm"
                      >
                        <h3 className="text-lg sub-heading-font text-[#E97400] mb-2">
                          {cat.id}. {cat.name}
                        </h3>

                        <div className="mb-3">
                          <span className="text-[#08525F] text-[10px] font-black uppercase">
                            Concept:
                          </span>
                          <p className="body-font font-bold text-[#572711] text-sm leading-tight">
                            {cat.concept}
                          </p>
                        </div>

                        {cat.example && (
                          <div className="bg-[#08525F]/10 p-3 rounded-lg border-l-4 border-[#08525F] mb-4">
                            <span className="text-[#08525F] text-[10px] font-black uppercase">
                              Example:
                            </span>
                            <p className="body-font italic text-[#572711] text-xs mt-1">
                              "{cat.example}"
                            </p>
                          </div>
                        )}

                        {/* UPDATED MEDIA CONTAINER */}
                        <div className="flex justify-center mt-2">
                          <div className="w-fit rounded-xl overflow-hidden border-2 border-[#08525F] shadow-sm">
                            {cat.type === "video" ? (
                              <video
                                src={cat.mediaUrl}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="max-h-[200px] w-auto block"
                              />
                            ) : (
                              <img
                                src={cat.mediaUrl}
                                alt={cat.name}
                                className="max-h-[200px] w-auto block"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. BOTTOM NAVIGATION */}
              <div className="flex justify-center gap-4 mt-8 mb-4">
                <button
                  onClick={handleBack}
                  className="bg-[#E97400] rounded-2xl px-6 py-3 shadow-lg flex-1 max-w-[140px]"
                >
                  <FaArrowLeft className="text-2xl text-white mx-auto" />
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-[#08525F] rounded-2xl px-6 py-3 shadow-lg flex-1 max-w-[140px] flex items-center justify-center gap-2"
                >
                  {data?.price ? (
                    <>
                      <FaCartShopping className="text-xl text-white" />
                      <span className="text-white sub-heading-font">Add</span>
                    </>
                  ) : (
                    <span className="text-white sub-heading-font">
                      Register
                    </span>
                  )}
                </button>
              </div>

              {/* Terms for PCFI - BELOW BUTTONS */}
              {data?.event_code?.toUpperCase() === "PCFI" && (
                <div className="w-full -mt-5">
                  <p className="text-[12px] text-[#572711]/60 body-font font-normal text-center italic">
                    *Participants will be paired with a partner during the workshop.
                  </p>
                </div>
              )}

              {/* Bottom Border */}
              <div className="w-auto -ml-8 h-7 -mb-5 relative translate-x-[16px]">
                <Image
                  src="/img/events/mob-bottom-border26.svg"
                  alt="Bottom Border"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:block">
          <motion.div
            className="h-fit w-full text-justify text-[#67230F] flex flex-col lg:flex-row lg:h-fit px-4 lg:px-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-full lg:w-full flex flex-col mt-20 lg:mt-32 lg:mx-16 mb-4 lg:mb-16 gap-3 bg-[#FEE2B2] p-4 lg:p-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Top Border */}
              <div className="w-auto -ml-[74.8px] h-12 -mt-12 relative translate-x-[42.3px]">
                <Image
                  src="/img/events/desk-top-border26.svg"
                  alt="Top Border"
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>

              <div className="p-0 lg:p-8 relative">
                {/* Header Section */}
                <motion.div
                  className="flex flex-col md:flex-row justify-around items-center mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="order-2 md:order-1 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-full md:w-auto">
                    <div className="flex justify-center mb-1 px-15">
                      <div className="h-[2px] bg-[#08525F] w-full max-w-[calc(100%+40px)] translate-x-[-56px]"></div>
                    </div>
                    <div className="bg-[#08525F] rounded-2xl px-5 -py-1 flex items-center justify-center shadow-lg min-w-[130px] sub-heading-font text-white">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl sub-heading-font text-center mt-4 mb-3 py-1">
                        {data?.name}
                      </h1>
                    </div>
                    <div className="flex justify-center mb-2 mt-1 px-15">
                      <div className="h-[2.1px] bg-[#08525F] w-full max-w-[calc(100%+40px)] translate-x-[56px]"></div>
                    </div>
                  </div>

                  <div className="order-1 md:order-2 flex flex-col items-center md:ml-auto md:self-center gap-4">
                    <button
                      onClick={handleScrollToCheckbox}
                      className="bg-[#08525F] rounded-2xl px-8 py-4 hover:opacity-90 transition-all duration-300 flex items-center justify-center shadow-xl min-w-[140px] sub-heading-font text-white"
                    >
                      {data.price ? (
                        <FaCartShopping className="text-xl mr-5" />
                      ) : null}
                      <span>{data?.price ? "Add to Cart" : "Register"}</span>
                    </button>
                  </div>
                </motion.div>

                {descriptionContent && (
                  <motion.div
                    className="mt-6 lg:mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <p
                      className="text-xl font-normal text-[#08525F] text-center body-font font-semibold px-4 lg:px-8 mt-15"
                      dangerouslySetInnerHTML={descriptionContent}
                    />
                  </motion.div>
                )}

                {/* 1. TOP ROW: Details & Rules */}
                <div
                  className={`flex flex-col lg:flex-row gap-6 lg:gap-8 mt-8 ${
                    workshopImage &&
                    data?.event_category?.toUpperCase() === "WORKSHOP"
                      ? "items-stretch"
                      : "items-start"
                  }`}
                >
                  {/* LEFT COLUMN - Event Details */}
                  <div className="flex-1 flex flex-col h-full">
                    <div className="relative bg-[#E97400] rounded-lg shadow-2xl h-full flex flex-col">
                      <div className="relative z-10 p-4 lg:p-6 flex flex-col items-center justify-center h-full">
                        <div className="border-3 border-dashed border-white rounded-sm p-6 lg:p-6 w-full h-full flex flex-col items-center justify-center">
                          <div
                            className="text-xl sm:text-xl md:text-2xl lg:text-3xl sub-heading-font mb-4 pb-2 relative text-white text-center w-full"
                            style={{ letterSpacing: "3.42px" }}
                          >
                            Event Details
                          </div>
                          <div className="-mt-6 relative w-full h-5">
                            <Image
                              src="/img/events/line26.svg"
                              alt="Line"
                              fill
                              className="object-contain"
                              priority={false}
                            />
                          </div>
                          <ul className="body-font font-medium text-lg list-disc pl-6 text-left text-white space-y-2 w-full mt-2">
                            <li>
                              <strong>Venue:</strong> {data?.venue}
                            </li>
                            {/* <li><strong>Event Date:</strong> {data?.event_date}</li> */}
                            <li>
                              <strong>
                                {data?.event_code === "MM"
                                  ? "Last Date to Submit:"
                                  : "Event Date:"}
                              </strong>{" "}
                              {data?.event_date}
                            </li>
                            <li>
                              <strong>Contact:</strong>{" "}
                              {data?.contact_details?.name}
                            </li>
                            <li>
                              <strong>Phone:</strong>{" "}
                              {data?.contact_details?.phone}
                            </li>
                            <li>
                              <strong>Team:</strong> {data?.team_category}
                            </li>
                            <li>
                              <strong>Price:</strong>{" "}
                              {data?.price
                                ? "Rs. " + data.price + "/-"
                                : "Free"}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN - Rules */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex-grow">
                      {workshopImage && data?.event_category?.toUpperCase() === "WORKSHOP" && (
                        <div className="relative w-auto p-2 min-h-[365px] border-4 rounded-xl border-[#E97400] bg-[#fbbd7f] overflow-hidden mb-6">
                          <Image src={workshopImage} alt="Workshop" fill className="object-contain" />
                        </div>
                      )}

                      {data?.rules && Object.keys(data.rules).length !== 0 && (
                        <div className="flex flex-col">
                          <div
                            className="text-xl md:text-3xl text-[#572711] sub-heading-font w-fit mb-4 pb-2 relative group"
                            style={{ letterSpacing: "3.42px" }}
                          >
                            {data?.event_category?.toUpperCase() === "EVENT"
                              ? "Rules & How to Play"
                              : "Rules"}{" "}
                          </div>
                          <ul className="body-font font-semibold text-[#572711] text-lg text-left space-y-2">
                            {/* {Object.values(data.rules).map((rule, index) => (
                              <li key={index}>{index + 1}. {rule}</li>
                            ))} */}
                            <ul className="body-font font-semibold text-[#572711] text-lg text-left space-y-2">
                              {Object.values(data.rules).map((rule, index) => {
                                // Process the rule text
                                let processedRule = rule
                                  .replace(
                                    /no refund/gi,
                                    "<strong>no refund</strong>"
                                  )
                                  .replace(
                                    /@Pictoreal/gi,
                                    '<a href="https://www.instagram.com/pictoreal?igsh=ajM5Z2hwMWhrOXl3" target="_blank" rel="noopener noreferrer" class="text-[#E97400] font-bold underline hover:opacity-80 transition-opacity">@Pictoreal</a>'
                                  );

                                return (
                                  <li
                                    key={index}
                                    dangerouslySetInnerHTML={{
                                      __html: `${index + 1}. ${processedRule}`,
                                    }}
                                  />
                                );
                              })}
                            </ul>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Photocopy Checkbox - Desktop (Only for Photography Events) */}
                    {data?.event_code === "PH" && (
                      <motion.div
                        ref={photocopyCheckboxRef}
                        className="w-full flex flex-col gap-3 items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="bg-white/50 rounded-xl px-4 py-4 w-full border-2 border-[#08525F] space-y-3">
                          {/* Option 1 – Default */}
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!needPhotocopy}
                              onChange={() => setNeedPhotocopy(false)}
                              className="w-5 h-5 rounded border-2 border-[#08525F] cursor-pointer"
                            />
                            <span className="ml-3 text-[#572711] body-font font-semibold text-sm">
                              I will print my photographs myself
                            </span>
                          </label>

                          {/* Option 2 */}
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={needPhotocopy}
                              onChange={() => setNeedPhotocopy(true)}
                              className="w-5 h-5 rounded border-2 border-[#08525F] cursor-pointer"
                            />
                            <span className="ml-3 text-[#572711] body-font font-semibold text-sm">
                              Please print my photographs (Extra Rs.10 charges
                              apply)
                            </span>
                          </label>
                        </div>
                      </motion.div>
                    )}

                    {/* Standard Nav Buttons (Only for non-MM pages) */}
                    {data?.event_code !== "MM" && (
                      <div className="flex justify-center gap-4 mt-8">
                        <button
                          onClick={handleBack}
                          className="bg-[#E97400] rounded-2xl px-8 py-4 shadow-2xl hover:opacity-90 min-w-[140px]"
                        >
                          <FaArrowLeft className="text-2xl text-white mx-auto" />
                        </button>
                        <button
                          onClick={handleAddToCart}
                          className="bg-[#08525F] rounded-2xl px-6 py-3 shadow-lg flex-1 max-w-[140px] flex items-center justify-center gap-2"
                        >
                          {data?.price ? (
                            <>
                              <FaCartShopping className="text-xl text-white" />
                              <span className="text-white sub-heading-font">
                                Add
                              </span>
                            </>
                          ) : (
                            <span className="text-white sub-heading-font">
                              Register
                            </span>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Terms for PCFI - BELOW BUTTONS */}
{data?.event_code?.toUpperCase() === "PCFI" && (
  <div className="w-full mt-4">
    <p className="text-[15px] text-[#572711]/60 body-font font-normal text-center italic">
      *Participants will be paired with a partner during the workshop.
    </p>
  </div>
)}
                  </div>
                </div>

                {/* 2. BOTTOM SECTION: Meme Categories (Only for MM) */}
                {data?.event_code === "MM" && (
                  <div className="w-full flex flex-col items-center mt-12 pt-8 border-t-2 border-[#E97400]/20">
                    <div className="text-2xl md:text-3xl sub-heading-font text-[#572711] mb-10 text-center uppercase tracking-widest">
                      Event Categories
                    </div>
                    <div className="flex flex-col gap-6 w-full max-w-5xl">
                      {MM_CATEGORIES.map((cat) => (
                        <div
                          key={cat.id}
                          className="flex flex-col lg:flex-row gap-8 items-center bg-white/40 p-5 rounded-2xl border-2 border-[#E97400] shadow-md w-full"
                        >
                          {/* Category Details */}
                          <div className="flex-1 text-left space-y-2">
                            <h3 className="text-xl md:text-2xl sub-heading-font text-[#E97400]">
                              {cat.id}. {cat.name}
                            </h3>
                            <div>
                              <span className="text-[#08525F] text-[10px] font-bold uppercase block">
                                Concept:
                              </span>
                              <p className="body-font font-bold text-[#572711] text-sm leading-tight">
                                {cat.concept}
                              </p>
                            </div>
                            {cat.example && (
                              <div className="bg-[#08525F]/5 p-2 rounded-lg border-l-2 border-[#08525F]">
                                <span className="text-[#08525F] text-[10px] font-black uppercase block">
                                  Example:
                                </span>
                                <p className="body-font italic text-[#572711] text-[13px] leading-tight mt-1">
                                  "{cat.example}"
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Reduced Height Media */}
                          <div className="w-full lg:w-[280px] shrink-0">
                            <div className="relative w-full h-[160px] rounded-xl overflow-hidden bg-black border-2 border-[#08525F] shadow-sm">
                              {cat.type === "video" ? (
                                <video
                                  src={cat.mediaUrl}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <img
                                  src={cat.mediaUrl}
                                  alt={cat.name}
                                  className="w-full h-full object-contain"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Buttons for MM Only */}
                    <div className="flex justify-center gap-6 mt-16 mb-4">
                      <button
                        onClick={handleBack}
                        className="bg-[#E97400] rounded-2xl px-12 py-4 shadow-2xl hover:opacity-90 transition-transform hover:scale-105"
                      >
                        <FaArrowLeft className="text-2xl text-white" />
                      </button>
                      <button
                        onClick={handleAddToCart}
                        className="bg-[#08525F] rounded-2xl px-6 py-3 shadow-lg flex-1 max-w-[140px] flex items-center justify-center gap-2"
                      >
                        {data?.price ? (
                          <>
                            <FaCartShopping className="text-xl text-white" />
                            <span className="text-white sub-heading-font">
                              Add
                            </span>
                          </>
                        ) : (
                          <span className="text-white sub-heading-font">
                            Register
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Border */}
              <div className="w-auto -ml-[64.5px] h-7 -mb-8 relative translate-x-[32.6px]">
                <Image
                  src="/img/events/desk-bottom-border26.svg"
                  alt="Bottom Border"
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* <motion.div
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
      </motion.div> */}
    </main>
  );
};

export default Individual;
