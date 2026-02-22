"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import localFont from "next/font/local";
import isNotAuth from "@/app/components/isNotAuth";
import api from "@/app/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useRef } from "react";



const rye = localFont({
  src: "../../public/fonts/Rye-Regular.ttf",
});

const Voting = () => {
  const fetchingRef = useRef(false);
  const router = useRouter();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("sketching");
  const [searchCode, setSearchCode] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const isVotingLive = true;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isSearching = searchCode.trim().length > 0;

  const categories = [
    { id: "sketching", label: "Sketching", eventCode: "SK" },
    { id: "painting", label: "Painting", eventCode: "PA" },
    { id: "photography", label: "Photography", eventCode: "PH" },
    { id: "scripts-and-styles", label: "Scripts and Styles", eventCode: "SS" },
    { id: "themed-category", label: "Themed Category", eventCode: "TC" },
  ];

  useEffect(() => {
    const img = new window.Image();
    img.src = "/img/gallery/gallary-frame.png";
  }, []);


  // Fetch Entries
  useEffect(() => {
    if (isSearching) return;

    fetchingRef.current = false;

    const controller = new AbortController();

    const fetchEntries = async () => {
      if (fetchingRef.current) return;

      fetchingRef.current = true;
      setLoading(true);

      const category = categories.find((c) => c.id === selectedCategory);

      try {
        const res = await api.get(
          `/entry/eventcode/${category.eventCode}?page=${page}&size=12`,
          { signal: controller.signal }
        );

        const newEntries = res.data.data.entries;

        if (page === 1) {
          setEntries(newEntries);
        } else {
          setEntries((prev) => [...prev, ...newEntries]);
        }

        if (newEntries.length === 0) {
          setHasMore(false);
        }
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error(err);
        }
      }

      setLoading(false);
      fetchingRef.current = false;
    };

    fetchEntries();

    return () => controller.abort();
  }, [page, selectedCategory, isSearching]);


  // Fetch Wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get("/wishlist");
        if (!res.data.error) {
          setWishlist(res.data.data);
        }
      } catch (err) {
        console.error("Wishlist fetch failed:", err);
      }
    };
    fetchWishlist();
  }, []);

  useEffect(() => {
    if (!isSearching) return;

    const controller = new AbortController();

    const fetchSearch = async () => {
      try {
        const res = await api.get(
          `/entry/ticketid/${searchCode}`,
          { signal: controller.signal }
        );

        // assuming backend returns single object
        if (!res.data.error && res.data.data) {
          setEntries([res.data.data]); // wrap in array
        } else {
          setEntries([]);
        }

        setHasMore(false);
      } catch (err) {
        if (err.name !== "CanceledError") {
          setEntries([]);
        }
      }
    };

    fetchSearch();

    return () => controller.abort();
  }, [searchCode]);


  // Handle Scroll Locking
  useEffect(() => {
    if (wishlistOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVotingLive, wishlistOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isSearching) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 400 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, isSearching]);

  // --- UPDATED HANDLE VOTE WITH TOASTS ---
  const handleVote = async (entry) => {
    // 1. Client-side check: If already in local wishlist, show error immediately
    if (wishlist.some((w) => w.id === entry.id)) {
      toast.error("This entry is already in your wishlist");
      return;
    }

    try {
      const res = await api.post("/wishlist", { entry_id: entry.id });

      // 2. Success Case
      if (!res.data.error) {
        setWishlist((prev) => [...prev, entry]);
        toast.success("Added to wishlist!");
      } else {
        // 3. Backend Logical Error (e.g. "Voting closed", "Limit reached")
        toast.error(res.data.message || "Failed to add to wishlist");
      }
    } catch (err) {
      console.error("Vote failed:", err);
      // 4. Backend Exception (e.g. 400 Bad Request, 409 Conflict)
      const errorMsg =
        err.response?.data?.message || "An error occurred while voting";
      toast.error(errorMsg);
    }
  };

  const removeVote = async (entryId) => {
    try {
      const res = await api.delete("/wishlist", {
        data: { entry_id: entryId },
      });
      if (!res.data.error) {
        setWishlist((prev) => prev.filter((item) => item.id !== entryId));
        if (wishlist.length - 1 === 0) setWishlistOpen(false);
        toast.success("Removed from wishlist");
      }
    } catch (err) {
      console.error("Remove vote failed:", err);
      toast.error("Failed to remove vote");
    }
  };

  // --- GROUPING LOGIC FOR WISHLIST ---
  const groupedWishlist = useMemo(() => {
    const groups = {};
    wishlist.forEach((item) => {
      const prefix = item.ticket_id
        ? item.ticket_id.substring(0, 2).toUpperCase()
        : "OT";
      const cat = categories.find((c) => c.eventCode === prefix);
      const label = cat ? cat.label : "Other";

      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(item);
    });
    return groups;
  }, [wishlist, categories]);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <div className="block lg:hidden w-full relative h-full">
          <Image
            src="/img/home/mobile-bg.png"
            alt="Mobile Background"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="hidden lg:block w-full relative h-full">
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

      <Navbar />

      <main className="relative z-10 pt-20 lg:pt-28 px-4 lg:px-8 pb-32 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl lg:text-5xl tracking-tight text-white heading-font text-center mt-6 mb-6">
            Gallery
          </h1>

          {/* Categories */}
          <div className="flex flex-nowrap justify-start lg:justify-center items-center gap-4 lg:gap-6 mb-6 lg:mb-8 overflow-x-auto pb-2 px-2 scrollbar-style">
            <style jsx>{`
              .scrollbar-style::-webkit-scrollbar {
                height: 6px;
              }

              .scrollbar-style::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
              }

              .scrollbar-style::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.35);
                border-radius: 10px;
              }

              .scrollbar-style::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.6);
              }

              @media (min-width: 1024px) {
                .scrollbar-style::-webkit-scrollbar {
                  display: none;
                }
              }
            `}</style>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSearchCode("");

                  // reset pagination
                  setEntries([]);
                  setPage(1);
                  setHasMore(true);
                }}
                className={`${rye.className} 
                  px-4 py-2
                  rounded-full 
                  text-sm lg:text-base 
                  font-semibold 
                  transition-all duration-300
                  tracking-widest uppercase
                  drop-shadow-md
                  whitespace-nowrap
                  flex-shrink-0
                  ${selectedCategory === category.id
                    ? "bg-white text-[#070044]"
                    : "bg-transparent border-2 border-white text-white hover:bg-white/20"
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {!isVotingLive && (
            <div className="text-center mt-40 mb-14">
              <h2
                className={`${rye.className} text-[#FFA53A] text-xl sm:text-2xl md:text-3xl tracking-widest uppercase drop-shadow-md`}
              >
                Voting phase starts on 23 Feb
              </h2>
            </div>
          )}

          {/* Search */}
          <div className="max-w-xl lg:max-w-2xl mx-auto mb-6 lg:mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter the code"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className={`${rye.className} 
                  w-full px-3 lg:px-4 py-1.5
                  rounded-full border-2 border-white 
                  bg-white/10 backdrop-blur-sm 
                  text-white 
                  placeholder-white/70 
                  focus:outline-none focus:ring-2 
                  focus:ring-[#FFA53A] focus:border-[#FFA53A]
                  text-base`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-col items-center mx-auto w-full"
              >
                <div className="relative w-full max-w-[300px]">
                  <div className="relative">
                    <Image
                      src="/img/gallery/gallary-frame.png"
                      alt="Gallery Frame"
                      width={450}
                      height={450}
                      className="w-full h-auto translate-x-1"
                      priority
                    />
                    <h2
                      className={`${rye.className} absolute top-3 left-1/2 -translate-x-1/2 text-[#A53A1F] font-semibold text-lg lg:text-xl tracking-widest uppercase`}
                    >
                      {entry.ticket_id}
                    </h2>
                    <div className="absolute top-[16%] left-1/2 -translate-x-1/2 w-[71%] h-[69%] p-1 flex items-center justify-center">
                      <img
                        src={entry.image_link}
                        alt={`Entry ${entry.ticket_id}`}
                        loading="lazy"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="relative mt-6 ml-4 mb-10">
                    {/* <Image
                      src="/img/gallery/TagNo.png"
                      alt="Tag Number"
                      width={350}
                      height={60}
                      className="w-full h-auto hover:scale-95 transition-transform"
                    /> */}
                    {/* <button
                      onClick={() => handleVote(entry)}
                      className={`${rye.className} text-[#A53A1F] absolute inset-0 flex items-center justify-center font-semibold text-lg lg:text-xl xl:text-2xl cursor-pointer -translate-y-1`}
                    >
                      Vote
                    </button> */}
                    <button
                      onClick={() => handleVote(entry)}
                      className={`${rye.className} text-[#A53A1F] absolute inset-0 flex items-center justify-center font-semibold text-lg lg:text-xl xl:text-2xl cursor-pointer`}
                    >
                      <svg
                        width="160"
                        height="55"
                        viewBox="0 0 160 40"
                      >
                        {/* Background Shape */}
                        <path
                          d="M 20 0 L 140 0 L 160 20 L 140 40 L 20 40 L 0 20 Z"
                          fill="#f8b818"
                        />
                        {/* Text */}
                        <text
                          x="80"
                          y="23"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#A53A1F"
                          fontSize="18"
                          fontWeight="800"
                          letterSpacing="3"
                          className={rye.className}
                        >
                          SELECT
                        </text>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loading && (
            <p className={` ${rye.className} text-white text-center mt-6`}>
              LOADING MORE...
            </p>
          )}

        </div>

        {/* --- ZOMATO STYLE CART / WISHLIST --- */}
        {wishlist.length > 0 && (
          <>
            {/* Dark Backdrop for Modal */}
            {wishlistOpen && (
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                onClick={() => setWishlistOpen(false)}
              />
            )}

            {/* Bottom Interaction Area */}
            <div className="fixed bottom-0 left-0 w-full z-[100] px-4 pb-6">
              {/* Collapsed Bar */}
              {!wishlistOpen && (
                <div
                  onClick={() => setWishlistOpen(true)}
                  className="max-w-2xl mx-auto 
    bg-white border border-gray-100 shadow-xl
    rounded-2xl px-4 py-3
    flex items-center justify-between
    gap-3 cursor-pointer"
                >
                  {/* Left text */}
                  <div className="flex flex-col leading-tight min-w-0">
                    <span
                      className={`${rye.className} text-gray-500 text-[10px] uppercase tracking-widest`}
                    >
                      Your Selections
                    </span>

                    <span className="font-bold text-[#070044] text-sm truncate">
                      {wishlist.length} Entries Selected
                    </span>
                  </div>

                  {/* Button */}
                  <div
                    className="flex items-center gap-1
      bg-gradient-to-r from-[#FFA53A] to-[#FF8C1A]
      px-4 py-2 rounded-full shadow-md
      shrink-0"
                  >
                    <span
                      className={`${rye.className} text-white text-xs font-semibold whitespace-nowrap`}
                    >
                      View Wishlist
                    </span>

                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-white -rotate-90"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Expanded Drawer */}
              <div
                className={`fixed left-0 right-0 bottom-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-500 ease-in-out transform
                ${wishlistOpen ? "translate-y-0" : "translate-y-[110%]"}`}
                style={{ maxHeight: "85vh" }}
              >
                {/* Drawer Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white sticky top-0 z-10 rounded-t-3xl">
                  <div>
                    <h3 className={`${rye.className} text-2xl text-[#070044]`}>
                      Your Wishlist
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Total {wishlist.length} items
                    </p>
                  </div>

                  {/* Header Actions: Vote Button & Close Button */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => router.push("/votes")}
                      className={`${rye.className} bg-[#FFA53A] hover:bg-[#e08e2b] text-[#070044] px-6 py-2 rounded-full font-bold text-sm shadow-md transition-all uppercase tracking-wider`}
                    >
                      Proceed
                    </button>

                    <button
                      onClick={() => setWishlistOpen(false)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#070044"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Drawer Content (Scrollable) */}
                <div
                  className="overflow-y-auto p-6 pb-24"
                  style={{ maxHeight: "calc(85vh - 80px)" }}
                >
                  {/* Iterate over Categories */}
                  {Object.keys(groupedWishlist).map((categoryLabel) => (
                    <div key={categoryLabel} className="mb-8 last:mb-0">
                      {/* Category Title */}
                      <div className="flex items-center gap-4 mb-4">
                        <h4
                          className={`${rye.className} text-lg text-[#FFA53A] uppercase tracking-wide`}
                        >
                          {categoryLabel}
                        </h4>
                        <div className="h-[1px] bg-gray-200 flex-1"></div>
                      </div>

                      {/* Items Grid for this Category */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {groupedWishlist[categoryLabel].map((item) => (
                          <div
                            key={item.id}
                            className="group relative flex flex-col gap-2"
                          >
                            {/* Image Container */}
                            <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                              <img
                                src={item.image_link || item.img}
                                className="w-full h-full object-cover"
                                alt={item.ticket_id}
                              />

                              {/* --- MODIFIED CROSS BUTTON (ALWAYS VISIBLE) --- */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent clicking through
                                  removeVote(item.id);
                                }}
                                className="absolute top-1 right-1 
                                  bg-red-500 hover:bg-red-600 text-white 
                                  p-1.5 rounded-full shadow-md z-10
                                  transition-transform hover:scale-110 active:scale-95"
                                title="Remove"
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                            </div>

                            {/* Ticket ID */}
                            <span className="text-xs font-bold text-center text-[#070044] bg-gray-100 rounded py-1">
                              {item.ticket_id}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Empty State Safety Check */}
                  {wishlist.length === 0 && (
                    <div className="text-center text-gray-400 py-10">
                      No votes selected yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default isNotAuth(Voting);
