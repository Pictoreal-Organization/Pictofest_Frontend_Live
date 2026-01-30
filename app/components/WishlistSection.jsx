import WishlistEntryCard from "@/app/components/WishlistEntryCard";
import { useRef } from "react";

const WishlistSection = ({ section, wishlist, setWishlist }) => {
  const sliderRef = useRef(null);

  const handleScrollLeft = (element) => {
    element.scrollLeft -= 274;
  };
  const handleScrollRight = (element) => {
    element.scrollLeft += 274;
  };

  return (
    <div className="w-full flex flex-col items-center gap-10">
      {/* Category Title Card */}
      <div
        className="bg-linear-to-r from-[#4E3506] to-[#4E3506] rounded-xl shadow-lg 
                  sm:px-10 sm:py-5 py-4 sm:w-[350px] w-[300px]
                  transform transition-all duration-200 hover:shadow-xl"
      >
        <div className="sm:text-3xl text-2xl font-bold text-white text-center">
          {section.title}
        </div>
      </div>

      {/* Slider Container */}
      <div className="w-full flex gap-6">
        {/* Left Arrow */}
        <div className="hidden md:flex justify-center items-center">
          <button
            className="p-2 rounded-full hover:bg-orange-100 transition-colors duration-200"
            onClick={() => handleScrollLeft(sliderRef.current)}
          >
            <svg
              width="30"
              height="42"
              viewBox="0 0 30 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.578562 19.7102L27.5234 0.302249C28.5282 -0.418752 30 0.231331 30 1.39557V10.7919L16.2829 20.7774L30 30.763V40.2114C30 41.3757 28.5282 42.0257 27.5234 41.3047L0.578562 21.8968C-0.192707 21.3413 -0.192707 20.2657 0.578562 19.7102Z"
                fill="currentColor"
                className="text-[#4E3506] transition-colors duration-200"
              />
            </svg>
          </button>
        </div>

        {/* Content Slider */}
        <div
          className="flex overflow-x-auto scrollbar-none scroll-smooth w-full gap-5 p-3 snap-x"
          ref={sliderRef}
        >
          {wishlist &&
          wishlist.filter((entry) => entry.event_code === section.code)
            .length === 0 ? (
            <div
              className="text-black font-extrabold text-xl text-center mx-auto 
                      bg-red-50 p-4 rounded-lg border border-red-200"
            >
              *You have not added any entry to your wishlist in this category.
            </div>
          ) : (
            wishlist
              .filter((entry) => entry.event_code === section.code)
              .map((entry) => (
                <WishlistEntryCard
                  key={entry.id}
                  entry={entry}
                  setWishlist={setWishlist}
                />
              ))
          )}
        </div>

        {/* Right Arrow */}
        <div className="hidden md:flex justify-center items-center">
          <button
            className="p-2 rounded-full hover:bg-orange-100 transition-colors duration-200"
            onClick={() => handleScrollRight(sliderRef.current)}
          >
            <svg
              width="31"
              height="42"
              viewBox="0 0 31 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29.6994 19.8964L2.49995 0.305104C1.48568 -0.422707 0 0.233516 0 1.40875V10.8933L13.8471 20.9735L0 31.0537V40.5912C0 41.7665 1.48568 42.4227 2.49995 41.6949L29.6994 22.1036C30.4779 21.5429 30.4779 20.4571 29.6994 19.8964Z"
                fill="currentColor"
                className="text-[#4E3506] transition-colors duration-200"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistSection;
