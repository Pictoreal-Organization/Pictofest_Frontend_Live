"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import isNotAuth from "@/app/components/isNotAuth";
import { toast } from "sonner";
import api from "@/app/api";
import { useRouter } from "next/navigation";

// import ThankYouModal from "@/app/components/ThankYouModal";


const Votes = () => {
  const [selectedCategory, setSelectedCategory] = useState("SK");

  const [votedEntries, setVotedEntries] = useState([]);
  const [wishlistEntries, setWishlistEntries] = useState([]);
  const [mode, setMode] = useState("wishlist"); // voted | wishlist
  const [loading, setLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [removingIds, setRemovingIds] = useState(new Set());
  // const [isOpen, setIsOpen] = useState(false);


  // Updated categories based on PICSOREEL events from database
  const categories = [
    { id: "sketching", label: "Sketching", event_code: "SK" },
    { id: "painting", label: "Painting", event_code: "PA" },
    { id: "photography", label: "Photography", event_code: "PH" },
    { id: "scripts-styles", label: "Scripts & Styles", event_code: "SS" },
    { id: "themed-category", label: "Themed Category", event_code: "TC" },
  ];

  const router = useRouter();

  useEffect(() => {
    const fetchMyEntries = async () => {
      try {
        // ✅ REMOVE baseURL - api instance already has it
        const [votedRes, wishlistRes] = await Promise.all([
          api.get(`/voting`),
          api.get(`/wishlist`),
        ]);

        if (!votedRes.data.error) {
          setVotedEntries(votedRes.data.data);
        }

        if (!wishlistRes.data.error) {
          setWishlistEntries(wishlistRes.data.data);
        }

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEntries();
  }, []);

  const source = mode === "voted" ? votedEntries : wishlistEntries;

  const currentEntries = source.filter(
    (e) => e.event_code === selectedCategory
  );

  const filteredEntries = currentEntries;

  // Get category name helper
  const getCategoryName = (eventCode) => {
    return categories.find(cat => cat.event_code === eventCode)?.label || eventCode;
  };


  // Check if user has already voted in a category
  const hasVotedInCategory = (categoryId) => {
    return votedEntries.some(entry => entry.event_code === categoryId);
  };

  // Check if all wishlist entries in current category are already voted
  const areAllWishlistEntriesVoted = (categoryId) => {
    const wishlistInCategory = wishlistEntries.filter(entry => entry.event_code === categoryId);

    if (wishlistInCategory.length === 0) return false;

    return wishlistInCategory.every(wishlistEntry =>
      votedEntries.some(votedEntry => votedEntry.id === wishlistEntry.id)
    );
  };

  // Get breakdown by category for display
  const getWishlistBreakdown = () => {
    const breakdown = {};

    wishlistEntries.forEach(entry => {
      const category = entry.event_code;
      if (!breakdown[category]) {
        breakdown[category] = {
          name: getCategoryName(category),
          count: 0
        };
      }
      breakdown[category].count++;
    });

    return Object.values(breakdown);
  };

  // Validate wishlist before voting
  const validateWishlistVotes = () => {
    const MAX_VOTES_PER_CATEGORY = 2;
    const categoryCount = {};

    // Count entries per category
    wishlistEntries.forEach(entry => {
      const category = entry.event_code;
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    // Check for violations
    const violations = [];
    Object.entries(categoryCount).forEach(([category, count]) => {
      if (count > MAX_VOTES_PER_CATEGORY) {
        violations.push({
          category,
          count,
          categoryName: getCategoryName(category)
        });
      }
    });

    return { isValid: violations.length === 0, violations };
  };

  // Handle remove from wishlist
  const handleRemoveFromWishlist = async (entryId) => {
    setRemovingIds(prev => new Set(prev).add(entryId));

    try {
      const response = await api.delete(`/wishlist`, {
        data: { entry_id: entryId }
      });

      if (!response.data.error) {
        toast.success("Removed from wishlist");

        // Update local state
        setWishlistEntries(prev => prev.filter(entry => entry.id !== entryId));
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Failed to remove from wishlist";
      toast.error(errorMsg);
    } finally {
      setRemovingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(entryId);
        return newSet;
      });
    }
  };

  const handleVoteAllFromWishlist = async () => {
    const validation = validateWishlistVotes();

    if (!validation.isValid) {
      const errorMessages = validation.violations.map(v =>
        `${v.categoryName} (${v.count} entries)`
      ).join(', ');

      toast.error(
        `Maximum 2 votes allowed per category. Please remove extra entries from: ${errorMessages}`
      );
      return;
    }

    setIsVoting(true);

    try {
      // ✅ REMOVE baseURL - api instance already has it
      const response = await api.post(`/voting/vote-wishlist`);

      if (!response.data.error) {
        toast.success(`${response.data.votedCount || 'All'} entries voted successfully!`);
        // setIsOpen(true);


        // ✅ REMOVE baseURL from these too
        const [votedRes, wishlistRes] = await Promise.all([
          api.get(`/voting`),
          api.get(`/wishlist`),
        ]);

        if (!votedRes.data.error) setVotedEntries(votedRes.data.data);
        if (!wishlistRes.data.error) setWishlistEntries(wishlistRes.data.data);

        setMode("voted");
      }

    } catch (err) {
      console.error(err);

      // ✅ BETTER ERROR HANDLING
      if (err.response?.data?.violations) {
        const violationMsgs = err.response.data.violations
          .map(v => v.message)
          .join('\n');
        toast.error(violationMsgs);
      } else {
        const errorMsg = err.response?.data?.message || "Failed to submit votes. Please try again.";
        toast.error(errorMsg);
      }
    } finally {
      setIsVoting(false);
    }
  };

  // Get total wishlist count
  const totalWishlistCount = wishlistEntries.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isVotingLive = true;

  useEffect(() => {
    if (!isVotingLive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVotingLive]);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        {/* Mobile Background */}
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
        {/* Desktop Background */}
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

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative min-h-screen overflow-x-hidden">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-8 lg:gap-10 justify-center items-center lg:py-16 py-10 px-4 sm:px-6 lg:px-8">

          {/* Gallery Title */}
          <h1 className="text-4xl lg:text-5xl tracking-tight text-white heading-font text-center mt-20">
            My Votes
          </h1>

          {/* Mode Toggle - Enhanced Design */}
          <div className="relative inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1.5 shadow-xl border border-white/20">
            <button
              onClick={() => setMode("wishlist")}
              className={`sub-heading-font relative flex items-center gap-2
    px-6 py-2 rounded-full text-sm lg:text-base font-semibold
    transition-all duration-300
    ${mode === "wishlist"
                  ? "bg-white text-[#070044] shadow-lg"
                  : "text-white hover:text-white/80"}`}
            >
              Wishlist

              {totalWishlistCount > 0 && (
                <span className="flex items-center justify-center
      bg-[#FFA53A] text-white text-xs font-bold
      w-5 h-5 rounded-full leading-none">
                  {totalWishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMode("voted")}
              className={`sub-heading-font px-6 py-2 rounded-full
    text-sm lg:text-base font-semibold transition-all duration-300
    ${mode === "voted"
                  ? "bg-white text-[#070044] shadow-lg"
                  : "text-white hover:text-white/80"}`}
            >
              My Votes
            </button>
          </div>

          {/* Vote All Button with Breakdown - Only show in wishlist mode */}
          {mode === "wishlist" && totalWishlistCount > 0 && (
            <div className="w-full max-w-3xl">
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md
      rounded-2xl px-5 py-4 border border-white/30 shadow-xl">

                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">

                  <div className="text-center sm:text-left leading-tight">
                    <p className="text-white text-sm sm:text-base font-semibold">
                      Ready to Submit Your Votes?
                    </p>

                    <p className="text-white/80 text-xs mt-0.5">
                      Voting <span className="font-bold text-[#FFA53A]">
                        {totalWishlistCount} {totalWishlistCount === 1 ? "artwork" : "artworks"}
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={handleVoteAllFromWishlist}
                    disabled={isVoting}
                    className="sub-heading-font px-7 py-2.5
            bg-gradient-to-r from-[#FFA53A] to-[#FF8C1A]
            text-white rounded-full font-bold
            shadow-md hover:shadow-lg
            transition-all duration-200
            whitespace-nowrap text-sm"
                  >
                    {isVoting ? "Submitting..." : "Submit Votes"}
                  </button>
                </div>

                {/* Breakdown */}
                <div className="bg-black/20 rounded-xl p-3 border border-white/10">

                  <p className="text-white/70 text-xs mb-2 font-semibold">
                    Breakdown:
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {getWishlistBreakdown().map((cat, index) => (
                      <div
                        key={index}
                        className="bg-white/10 px-3 py-1 rounded-full border border-white/20 text-xs text-white"
                      >
                        <span className="font-bold text-[#FFA53A]">{cat.count}</span> × {cat.name}
                      </div>
                    ))}
                  </div>

                  <p className="text-white/40 font-semibold text-[10px] mt-2 italic">
                    Votes apply to all categories. Can submit maximum 2 votes per category. Can vote later for other artworks as well, but total votes per category cannot exceed 2.
                  </p>
                </div>
              </div>
            </div>
          )}


          {/* Category Filters - Enhanced */}
          <div className="w-full max-w-6xl">
            <div className="flex flex-nowrap justify-start lg:justify-center items-center gap-3 lg:gap-4 overflow-x-auto pb-3 px-2 lg:px-0">
              <style jsx>{`
                div::-webkit-scrollbar {
                  height: 6px;
                }
                div::-webkit-scrollbar-track {
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb {
                  background: rgba(255, 255, 255, 0.3);
                  border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb:hover {
                  background: rgba(255, 255, 255, 0.5);
                }
                @media (min-width: 1024px) {
                  div::-webkit-scrollbar {
                    display: none;
                  }
                }
              `}</style>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.event_code);
                  }}
                  className={`sub-heading-font 
                    px-4 py-1.5 text-xs
                    rounded-full 
                    sm:text-sm
                    font-semibold 
                    transition-all duration-300
                    tracking-wider uppercase
                    whitespace-nowrap
                    flex-shrink-0
                    transform hover:scale-105
                    ${selectedCategory === category.event_code
                      ? "bg-white text-[#070044] shadow-xl border-2 border-white"
                      : "bg-white/5 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/15 hover:border-white/60"
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Voting Info Message */}
          {!isVotingLive && (
            <div className="text-center mt-32 mb-20">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20 shadow-2xl">
                <h2
                  className={`sub-heading-font 
                    text-[#FFA53A] 
                    text-xl sm:text-2xl md:text-3xl 
                    tracking-widest uppercase 
                    drop-shadow-lg`}
                >
                  Voting phase starts on 23 Feb
                </h2>
              </div>
            </div>
          )}

          {/* Gallery Grid - Enhanced spacing */}
          {isVotingLive && filteredEntries.length > 0 ? (
            <div className="w-full max-w-7xl mt-6 lg:mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
                {filteredEntries.map((entry) => (
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
                          className="absolute top-3 left-1/2 -translate-x-1/2 
        text-[#A53A1F] sub-heading-font font-semibold text-lg tracking-widest uppercase"
                        >
                          {entry.ticket_id}
                        </h2>

                        <div className="absolute top-[16%] left-1/2 -translate-x-1/2 w-[71%] h-[69%] p-1 flex items-center justify-center">
                          <img
                            src={entry.image_link}
                            alt={entry.ticket_id}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {mode === "wishlist" && (
                          <button
                            onClick={() => handleRemoveFromWishlist(entry.id)}
                            disabled={removingIds.has(entry.id)}
                            className="absolute top-2 right-2 z-10
  w-8 h-8 flex items-center justify-center
  bg-white rounded-full shadow-lg
  hover:scale-110 active:scale-95
  transition-all duration-200"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 text-red-600"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : isVotingLive ? (
            <div className="text-center mt-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-10 py-8 border border-white/20 shadow-xl max-w-lg mx-auto">
                {mode === "voted" ? (
                  <div className="flex flex-col items-center gap-6">
                    <p className="text-white text-base lg:text-lg body-font font-semibold">
                      You haven't voted for any artwork in this category yet.
                    </p>
                    <button
                      onClick={() => router.push('/voting')}
                      className="sub-heading-font bg-gradient-to-r from-[#FFA53A] to-[#FF8C1A] hover:from-[#FF8C1A] hover:to-[#FFA53A] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 uppercase tracking-wider text-sm"
                    >
                      Go to Voting Page
                    </button>
                  </div>
                ) : (
                  areAllWishlistEntriesVoted(selectedCategory) ? (
                    <div className="flex flex-col items-center gap-6">
                      <p className="text-white text-base lg:text-lg body-font font-semibold">
                        All the artworks in this category are already voted.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white text-base lg:text-lg body-font font-semibold">
                        You don't have any artworks in your wishlist for this category.
                      </p>
                      <button
                        onClick={() => router.push('/voting')}
                        className="sub-heading-font bg-gradient-to-r mt-4 from-[#FFA53A] to-[#FF8C1A] hover:from-[#FF8C1A] hover:to-[#FFA53A] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 uppercase tracking-wider text-sm"
                      >
                        Go to Voting Page
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : null}

          {/* Bottom spacing */}
          <div className="h-12 lg:h-16"></div>
        </div>
      </main>
      {/* <ThankYouModal isOpen={isOpen} /> */}
    </div>
  );
};

export default isNotAuth(Votes);