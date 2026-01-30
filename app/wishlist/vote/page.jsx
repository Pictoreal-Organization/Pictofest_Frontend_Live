"use client";

import { useEffect, useState } from "react";
import api from "@/app/api";
import VotingSection from "@/app/components/VotingSection";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ThankYouModal from "@/app/components/ThankYouModal";

const Vote = () => {
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);
  const [sectionPS, setSectionPS] = useState([]);
  const [sectionDA, setSectionDA] = useState([]);
  const [sectionPH, setSectionPH] = useState([]);
  const [sectionCR, setSectionCR] = useState([]);
  const [sectionTH, setSectionTH] = useState([]);
  const [isVoting, setIsVoting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getWishlist = async () => {
    try {
      const response = await api.get("/wishlist/");
      setWishlist(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getVotingStatus = async () => {
    try {
      const response = await api.get("/voting/status");
      if (!response.data.data) {
        setIsOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVotingStatus();
    getWishlist();
  }, []);

  useEffect(() => {
    setSectionPS(
      wishlist
        .filter((entry) => entry.event_code === "PS")
        .map((entry) => ({ ...entry, isSelected: false }))
    );
    setSectionDA(
      wishlist
        .filter((entry) => entry.event_code === "DA")
        .map((entry) => ({ ...entry, isSelected: false }))
    );
    setSectionPH(
      wishlist
        .filter((entry) => entry.event_code === "PH")
        .map((entry) => ({ ...entry, isSelected: false }))
    );
    setSectionCR(
      wishlist
        .filter((entry) => entry.event_code === "CR")
        .map((entry) => ({ ...entry, isSelected: false }))
    );
    setSectionTH(
      wishlist
        .filter((entry) => entry.event_code === "TH")
        .map((entry) => ({ ...entry, isSelected: false }))
    );
  }, [wishlist]);

  const handleVote = async () => {
    setIsVoting(true);
  
    const formatSection = (section) =>
      section.filter((entry) => entry.isSelected).slice(0, 2).map((entry) => entry.id);
  
    const entry_ids = [
      formatSection(sectionPS),
      formatSection(sectionDA),
      formatSection(sectionPH),
      formatSection(sectionCR),
      formatSection(sectionTH),
    ];
  
    // Validation checks
  
    // 1. Ensure exactly 5 subarrays are present
    if (entry_ids.length !== 5) {
      toast.error("Exactly 5 categories must be included.");
      setIsVoting(false);
      return;
    }
  
    // 2. Check if all subarrays are empty (e.g., [[], [], [], [], []] is not allowed)
    if (entry_ids.every((group) => group.length === 0)) {
      toast.error("At least one vote is required across the 5 categories.");
      setIsVoting(false);
      return;
    }
  
    // 3. Ensure each subarray contains at most 2 elements
    if (entry_ids.some((group) => group.length > 2)) {
      toast.error("Each category can have a maximum of 2 selected entries.");
      setIsVoting(false);
      return;
    }
  
    try {
      const response = await api.post("/voting/", { entry_ids });
      toast.success(response?.data?.message);
      setIsVoting(false);
      setIsOpen(true);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "An error occurred while voting.");
      setIsVoting(false);
    }
  };
  
  

  return (
    <main className="min-h-dvh bg-linear-to-b from-amber-50 to-orange-50">
      <div className="flex flex-col justify-center items-center gap-10 lg:py-14 py-8 max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Vote
          </h1>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full"/>
        </div>

        <div className="w-full space-y-10">
          <VotingSection
            title="Painting/Sketching"
            wishlist={sectionPS}
            setWishlist={setSectionPS}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          />
          
          <VotingSection
            title="Digital Art"
            wishlist={sectionDA}
            setWishlist={setSectionDA}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          />
          
          <VotingSection
            title="Photography"
            wishlist={sectionPH}
            setWishlist={setSectionPH}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          />
          
          <VotingSection
            title="Craft"
            wishlist={sectionCR}
            setWishlist={setSectionCR}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          />
          
          <VotingSection
            title="Theme Category"
            wishlist={sectionTH}
            setWishlist={setSectionTH}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          />
        </div>

        <div className="mt-8">
          <button
            onClick={handleVote}
            disabled={isVoting}
            className="px-8 py-4 bg-[#4E3506] 
                     text-white font-bold text-xl rounded-lg shadow-lg
                     transform transition-all duration-200
                     hover:scale-105 hover:shadow-xl 
                     active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            {isVoting ? "Voting..." : "Vote"}
          </button>
        </div>
      </div>
      
      <ThankYouModal isOpen={isOpen} />
    </main>
  );
};

export default Vote;
