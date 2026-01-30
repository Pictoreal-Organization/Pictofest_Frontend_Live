"use client";

import { useEffect, useState } from "react";
// import isNotAuth from "@/app/components/isNotAuth";
import api from "@/app/api";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaWhatsapp, FaEye, FaTicketAlt, FaHistory, FaFileUpload } from "react-icons/fa";
import isNotAuth from "@/app/components/isNotAuth";

// --- REUSABLE COMPONENT: COLORED CATEGORY BOARD ---
const CategoryBoard = ({ title, events, waLinks, themeColor }) => {
  if (!events || events.length === 0) return null;

  const getWaLink = (eventId) => waLinks.find((link) => link.id === eventId)?.wa_link;

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto mb-16"
    >
      {/* --- HEADER --- */}
      <div
        className="relative rounded-t-lg shadow-md border-x-4 border-t-4"
        style={{
          backgroundColor: themeColor,
          borderColor: themeColor
        }}
      >
        <div className="absolute top-0 left-0 w-4 h-4 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-4 h-4 bg-black/20"></div>

        <div className="flex items-center justify-between px-4 py-4 md:px-6 md:py-5 relative z-10 text-[#FDEEAE]">

          {/* LEFT: WhatsApp button moved to individual rows */}
          {/* <div className="flex-shrink-0 w-1/3 text-left">
             <FaTicketAlt className="text-xl md:text-2xl opacity-40" />
          </div> */}

          {/* CENTER: Title */}
          <div className="flex-shrink-0 w-1/3 text-center">
            <h2 className="heading-font text-2xl md:text-4xl uppercase tracking-widest drop-shadow-md">
              {title}
            </h2>
          </div>

          {/* RIGHT: Count */}
          <div className="flex-shrink-0 w-1/3 text-right opacity-80 body-font font-bold text-sm md:text-lg">
            {events.length} {events.length === 1 ? 'ENTRY' : 'ENTRIES'}
          </div>
        </div>

        {/* Zig-Zag Bottom Edge */}
        <div
          className="h-4 w-full absolute -bottom-3 left-0 z-20"
          style={{
            backgroundColor: themeColor,
            clipPath: "polygon(0 0, 2% 100%, 4% 0, 6% 100%, 8% 0, 10% 100%, 12% 0, 14% 100%, 16% 0, 18% 100%, 20% 0, 22% 100%, 24% 0, 26% 100%, 28% 0, 30% 100%, 32% 0, 34% 100%, 36% 0, 38% 100%, 40% 0, 42% 100%, 44% 0, 46% 100%, 48% 0, 50% 100%, 52% 0, 54% 100%, 56% 0, 58% 100%, 60% 0, 62% 100%, 64% 0, 66% 100%, 68% 0, 70% 100%, 72% 0, 74% 100%, 76% 0, 78% 100%, 80% 0, 82% 100%, 84% 0, 86% 100%, 88% 0, 90% 100%, 92% 0, 94% 100%, 96% 0, 98% 100%, 100% 0)"
          }}
        ></div>
      </div>

      {/* --- BODY --- */}
      <div
        className="bg-[#FECF8D] border-x-4 border-b-4 rounded-b-lg pt-6 pb-2 px-2 md:px-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
        style={{ borderColor: themeColor }}
      >
        <div className="flex flex-col">
          {events.map((event, index) => {
            // Get the specific WhatsApp link for this individual event
            const itemWaLink = getWaLink(event.id);

            return (
              <div
                key={event.id}
                className="group/row flex items-center justify-between py-3 md:py-4 px-3 transition-colors duration-300 rounded-md"
                style={{
                  borderBottom: index !== events.length - 1 ? `2px dashed ${themeColor}40` : 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${themeColor}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {/* Event Details */}
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                  {/* <div className="flex items-center gap-2">
                    <FaTicketAlt className="text-xs opacity-70" style={{ color: themeColor }} />
                    <span className="body-font font-bold text-xs md:text-sm opacity-60" style={{ color: themeColor }}>
                      #{event.id.toString().padStart(4, '0')}
                    </span>
                  </div> */}
                  <Link href={`/individual/${event.id}`}>
                    <h3
                      className="sub-heading-font text-lg md:text-2xl uppercase transition-colors cursor-pointer"
                      style={{ color: themeColor }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      {event.name}
                    </h3>
                  </Link>
                </div>

                {/* Actions Container */}
                <div className="flex items-start gap-3">

                  {/* NEW: Google Form Icon specifically for MM */}
                  {event.event_code === "MM" && (
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSf3efK3cl7RPWH3ych4aauLH82lfa1DInOmheX21oriW6kDPA/viewform"
                      target="_blank"
                      rel="noreferrer"
                      title="Fill Submission Form"
                      className="flex flex-col items-center group"
                    >
                      <div
                        className="p-2 rounded-full border-2 transition-transform group-hover:scale-110 flex items-center justify-center cursor-pointer bg-white"
                        style={{ borderColor: "#7248B9", color: "#7248B9" }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" fill="currentColor" />
                        </svg>
                      </div>
                      <span
                        className="text-[9px] md:text-[10px] font-bold mt-1 uppercase text-center w-max"
                        style={{ color: "#7248B9" }}
                      >
                        Fill this form
                      </span>
                    </a>
                  )}

                  {/* WhatsApp Link */}
                  {itemWaLink && (
                    <a href={itemWaLink} target="_blank" rel="noreferrer" title="Join WhatsApp Group" className="mt-[2px]">
                      <div
                        className="p-2 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center cursor-pointer"
                        style={{ borderColor: "#25D366", color: "#25D366", backgroundColor: "white" }}
                      >
                        <FaWhatsapp className="text-lg md:text-xl" />
                      </div>
                    </a>
                  )}

                  {/* View Button */}
                  <Link href={`/individual/${event.id}`} className="mt-[2px]">
                    <div
                      className="bg-transparent border-2 rounded px-3 py-1 md:px-4 md:py-1 sub-heading-font text-xs md:text-sm transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer h-[38px]"
                      style={{
                        borderColor: themeColor,
                        color: themeColor
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = themeColor;
                        e.currentTarget.style.color = '#FDEEAE';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = themeColor;
                      }}
                    >
                      <FaEye /> <span className="hidden md:inline">VIEW</span>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const Order = () => {
  const [events, setEvents] = useState([]);
  const [picsoreel, setPicsoreel] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [waLinks, setWhatsAppLinks] = useState([]);

  const filterData = (data, category) => {
    return data.filter(
      (item) =>
        item.event_category &&
        item.event_category.toUpperCase() === category.toUpperCase()
    );
  };

  const getData = async () => {
    try {
      const response = await api.get("/userEvent/");
      const data = response.data.data;
      const wa_link_response = await api.get("/events");
      const wa_links = wa_link_response.data.data.map((event) => ({
        id: event.id,
        wa_link: event.wa_link,
      }));

      setWorkshops(filterData(data, "WORKSHOP"));
      setPicsoreel(filterData(data, "PICSOREEL"));
      setEvents(filterData(data, "EVENT"));
      setWhatsAppLinks(wa_links);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const shouldDisplaySection = (data) => {
    return data && Array.isArray(data) && data.length > 0;
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-[#644817]">

      {/* BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <div className="block md:hidden w-full h-full relative">
          <Image
            src="/img/common/general-mobile-bg.png"
            alt="Mobile Background"
            fill
            className="object-cover"
            priority
          />
        </div>
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

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center">

        {/* PAGE TITLE */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center justify-center mt-8 mb-16"
        >
          <h1 className="text-4xl lg:text-5xl tracking-tight text-white heading-font mt-6 md:mt-11 text-center">
            My Orders
          </h1>
          {/* <div className="flex items-center gap-2 mt-2 opacity-90">
            <div className="w-2 h-2 bg-[#ffffff] rotate-45"></div>
            <div className="w-20 h-1 bg-[#ffffff]"></div>
            <div className="w-2 h-2 bg-[#ffffff] rotate-45"></div>
          </div> */}
        </motion.div>

        {/* EMPTY STATE */}
        {!shouldDisplaySection(picsoreel) &&
          !shouldDisplaySection(workshops) &&
          !shouldDisplaySection(events) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-12 bg-[#FECF8D]/90 border-4 border-dashed border-[#644817] rounded-xl shadow-xl max-w-xl"
            >
              <h2 className="text-3xl description-font uppercase text-[#644817] mb-4">
                No Orders Yet
              </h2>
              <p className="body-font text-xl text-[#644817]">
                Go explore the events page!
              </p>
            </motion.div>
          )}

        {/* BOARDS */}
        <div className="w-full">

          {shouldDisplaySection(picsoreel) && (
            <CategoryBoard
              title="Pics-O-Reel"
              events={picsoreel}
              waLinks={waLinks}
              themeColor="#3CB2CC"
            />
          )}

          {shouldDisplaySection(workshops) && (
            <CategoryBoard
              title="Workshops"
              events={workshops}
              waLinks={waLinks}
              themeColor="#F069AE"
            />
          )}

          {shouldDisplaySection(events) && (
            <CategoryBoard
              title="Events"
              events={events}
              waLinks={waLinks}
              themeColor="#fa6720"
            />
          )}

        </div>

        {/* --- FOOTER ACTIONS --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 w-full"
        >
          <Link href="/submission">
            <button className="bg-[#AAB31A] hover:bg-[#8e9616] text-[#644817] sub-heading-font px-8 py-3 rounded-lg shadow-[4px_4px_0px_0px_#644817] border-2 border-[#644817] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#644817] transition-all flex items-center gap-3">
              <FaFileUpload className="text-xl" />
              <span>MY ENTRIES</span>
            </button>
          </Link>

          <Link href="/payment/history">
            <button className="bg-[#AAB31A] hover:bg-[#8e9616] text-[#644817] sub-heading-font px-8 py-3 rounded-lg shadow-[4px_4px_0px_0px_#644817] border-2 border-[#644817] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#644817] transition-all flex items-center gap-3">
              <FaHistory className="text-xl" />
              <span>MY PAYMENTS</span>
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default isNotAuth(Order);