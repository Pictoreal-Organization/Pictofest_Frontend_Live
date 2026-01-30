"use client";

import { useEffect, useState } from "react";
import api from "@/app/api";
import { useRouter } from "next/navigation";
import WishlistSection from "@/app/components/WishlistSection";
import { toast } from "sonner";

const Wishlist = () => {
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);

  const getWishlist = async () => {
    try {
      const response = await api.get("/wishlist/");
      setWishlist(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sections = [
    {
      title: "Painting/Sketching",
      code: "PS",
    },
    {
      title: "Digital Art",
      code: "DA",
    },
    {
      title: "Photography",
      code: "PH",
    },
    {
      title: "Craft",
      code: "CR",
    },
    {
      title: "Theme Category",
      code: "TH",
    },
  ];

  useEffect(() => {
    getWishlist();
  }, []);

  const handleProceedToVote = async () => {
    try {
      const response = await api.get("/voting/status");
      if (response.data.data) {
        toast.success(response.data.message);
        router.push("/wishlist/vote");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="min-h-dvh bg-linear-to-b from-amber-50 to-orange-50">
      <div className="flex flex-col justify-center items-center gap-10 lg:py-14 py-8 max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mt-20">
            Wishlist
          </h1>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"/>
        </div>

        {sections.map((section) => (
          <WishlistSection
            key={section.code}
            section={section}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
        ))}

        <div className="mt-8">
          <button
            onClick={handleProceedToVote}
            className="px-8 py-4 bg-[#4E3506] 
                     text-white font-bold text-xl rounded-lg shadow-lg
                     transform transition-all duration-200
                     hover:scale-105 hover:shadow-xl 
                     active:scale-95
                     focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Proceed To Vote
          </button>
        </div>
      </div>
    </main>
  );
};

export default Wishlist;
