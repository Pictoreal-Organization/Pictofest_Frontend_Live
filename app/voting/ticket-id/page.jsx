"use client";

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import api from "@/app/api";
import CategoryEntryCard from "@/app/components/CategoryEntryCard";
import { toast } from "sonner";
import OfflineInstructionsModal from "@/app/components/OfflineInstructionsModal";

const TicketId = () => {
  const [search, setSearch] = useState("");
  const [entry, setEntry] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getEntry = async () => {
    if (search.length === 5) {
      try {
        const response = await api.get(`/entry/ticketId/${search}`);
        setEntry(response.data.data);
        toast.success(response?.data?.message);
      } catch (err) {
        console.log(err);
        setEntry();
        toast.error(err.response?.data?.message);
      }
    } else {
      toast.error("The Code entered must be strictly 5 digits long.");
    }
  };

  const handleSearch = (e) => {
    if (e.target.value.length < 6) {
      setSearch(String(e.target.value).toUpperCase());
    } else {
      toast.error("The Code entered must be strictly 5 digits long.");
    }
  };

  return (
    <main className="bg-[url('/img/voting/search.png')] bg-no-repeat bg-cover min-h-dvh px-4">
      <div className="flex flex-col gap-10 justify-center items-center lg:gap-12 lg:py-14 py-8 w-4xl mx-auto">
        <h1 className="text-[30px] pt-[100px] lg:text-[50px] tracking-tight font-extrabold text-[#6D3212] heading-font text-center">
          Search and Add To Wishlist
        </h1>
        <div className="bg-[url('/img/voting/searchbar.png')] md:bg-cover bg-size-[100%_100%] flex h-24 justify-center items-center md:w-[650px] w-[325px]">
          <input
            onChange={handleSearch}
            value={search}
            type="text"
            placeholder="Enter the Code..."
            className="py-3 px-10 placeholder:text-[#000000] text-[20px] description-font font-semibold bg-transparent w-full outline-hidden"
          />
          <button
            onClick={getEntry}
            className="text-2xl text-black py-3 md:px-10 px-7"
          >
            <FaSearch />
          </button>
        </div>
        <div>
          {entry ? (
            <CategoryEntryCard key={entry.id} entry={entry} />
          ) : (
            <div className="text-[#6D3212] font-extrabold text-xl text-center mx-auto">
              *We couldn't find any entry matching the provided code. Please
              double-check the code and try again.
            </div>
          )}
        </div>
      </div>
      <OfflineInstructionsModal />
    </main>
  );
};

export default TicketId;
