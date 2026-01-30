"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import api from "@/app/api";

const CategoryEntryCard = ({ entry }) => {
  const [isLoading, setIsLoading] = useState(false);

  const trimString = (str, length) => {
    if (str.length <= length * 2) {
      return str;
    }
    const trimmedLength = str.length - length * 2;
    return str.substring(length, trimmedLength);
  };

  const handleAddToWishlist = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/wishlist/", { entry_id: entry.id });
      toast.success(response?.data?.message);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-72 bg-[url('/img/voting/rb.png')] bg-size-[100%_100%] p-12 overflow-hidden transition-all duration-300">
      <div className="space-y-4">
        <PhotoProvider>
          <PhotoView src={trimString(entry.image_link, 2) + "3D"}>
            <div className="overflow-hidden rounded-lg">
              <img
                src={trimString(entry.image_link, 2) + "3D"}
                alt="Entry Image"
                loading="lazy"
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </PhotoView>
        </PhotoProvider>
        
        <div className="bg-[#934024] rounded-md p-3 text-center">
          <span className="text-xl font-semibold text-white">
            {entry.ticket_id}
          </span>
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={handleAddToWishlist}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md 
                     transition-colors duration-200 
                     hover:bg-blue-700 
                     focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default CategoryEntryCard;