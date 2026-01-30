"use client";

import OnlineInstructionsModal from "@/app/components/OnlineInstructionsModal";
import Link from "next/link";
import { useEffect } from "react";

const VirtualGallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[url('/img/events/voting_2025.png')] bg-no-repeat bg-size-[100%_100%] min-h-dvh px-4 flex flex-col items-center justify-center text-center">
      <div className="flex flex-col justify-center items-center gap-2 py-1 max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900 heading-font pt-[150px] pb-5">
          Virtual Gallery
        </h1>
        <div className="flex flex-col gap-0 text-2xl sm:text-3xl font-extrabold text-[#6D3212] description-font">
          <Link
            href="/voting/painting-sketching"
            className="bg-[url('/img/voting/category_board.png')] bg-contain bg-no-repeat bg-center h-[5.8rem] sm:h-36 w-56 sm:w-[24rem] flex items-center justify-center"
          >
            Painting/Sketching
          </Link>
          <Link
            href="/voting/digital-art"
            className="bg-[url('/img/voting/category_board.png')] bg-contain bg-no-repeat bg-center h-[5.8rem] sm:h-36 w-56 sm:w-[24rem] flex items-center justify-center"
          >
            Digital Art
          </Link>
          <Link
            href="/voting/photography"
            className="bg-[url('/img/voting/category_board.png')] bg-contain bg-no-repeat bg-center h-[5.8rem] sm:h-36 w-56 sm:w-[24rem] flex items-center justify-center"
          >
            Photography
          </Link>
          <Link
            href="/voting/craft"
            className="bg-[url('/img/voting/category_board.png')] bg-contain bg-no-repeat bg-center h-[5.8rem] sm:h-36 w-56 sm:w-[24rem] flex items-center justify-center"
          >
            Craft
          </Link>
          <Link
            href="/voting/theme-category"
            className="bg-[url('/img/voting/category_board.png')] bg-contain bg-no-repeat bg-center h-[5.8rem] sm:h-36 w-56 sm:w-[24rem] flex items-center justify-center"
          >
            Theme Category
          </Link>
          
        </div>
      </div>
      <OnlineInstructionsModal />
    </main>
  );
};

export default VirtualGallery;
