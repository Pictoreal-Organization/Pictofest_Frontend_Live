import VotingEntryCard from "@/app/components/VotingEntryCard";
import { useRef } from "react";

const VotingSection = ({ title, wishlist, setWishlist }) => {
  const sliderRef = useRef(null);

  const handleScrollLeft = (element) => {
    element.scrollLeft -= 274;
  };
  const handleScrollRight = (element) => {
    element.scrollLeft += 274;
  };

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div
        className="bg-linear-to-r from-[#4E3506] to-[#4E3506] rounded-xl shadow-lg 
                  sm:px-10 sm:py-5 py-4 sm:w-[350px] w-[300px]
                  transform transition-all duration-200 hover:shadow-xl"
      >
        <div className="sm:text-3xl text-2xl font-bold text-white text-center">
          {title}
        </div>
      </div>
      <div className="text-[#4E3506] font-extrabold text-xl text-center">
        &#42;Only a maximum of two entries can be selected.
      </div>
      <div className="w-full flex gap-6">
        <div className="hidden md:flex justify-center items-center">
          <button
            className="cursor-pointer"
            onClick={() => handleScrollLeft(sliderRef.current)}
          >
            <svg
              width="31"
              height="42"
              viewBox="0 0 31 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_544_492" fill="white">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.583853 19.8964L27.7833 0.305104C28.7975 -0.422707 30.2832 0.233516 30.2832 1.40875V10.8938L16.4365 20.9737L30.2832 31.0536V40.5912C30.2832 41.7665 28.7975 42.4227 27.7833 41.6949L0.583853 22.1036C-0.1947 21.5429 -0.1947 20.4571 0.583853 19.8964Z"
                />
              </mask>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.583853 19.8964L27.7833 0.305104C28.7975 -0.422707 30.2832 0.233516 30.2832 1.40875V10.8938L16.4365 20.9737L30.2832 31.0536V40.5912C30.2832 41.7665 28.7975 42.4227 27.7833 41.6949L0.583853 22.1036C-0.1947 21.5429 -0.1947 20.4571 0.583853 19.8964Z"
                fill="#005F73"
              />
              <path
                d="M27.7833 0.305104L26.0299 -2.12918L26.0342 -2.1323L27.7833 0.305104ZM0.583853 19.8964L2.33722 22.3306L2.33721 22.3306L0.583853 19.8964ZM30.2832 10.8938H33.2832V12.4206L32.0488 13.3192L30.2832 10.8938ZM16.4365 20.9737L14.6709 23.3991L11.3391 20.9737L14.6709 18.5483L16.4365 20.9737ZM30.2832 31.0536L32.0488 28.6282L33.2832 29.5268V31.0536H30.2832ZM27.7833 41.6949L26.0342 44.1323L26.0299 44.1292L27.7833 41.6949ZM0.583853 22.1036L2.33721 19.6694L2.33722 19.6694L0.583853 22.1036ZM29.5366 2.73938L2.33722 22.3306L-1.16951 17.4621L26.0299 -2.12917L29.5366 2.73938ZM27.2832 1.40875C27.2832 2.22387 27.8239 2.72079 28.2018 2.88766C28.5729 3.05153 29.0892 3.06043 29.5323 2.74251L26.0342 -2.1323C27.4916 -3.17803 29.2578 -3.20493 30.6254 -2.60108C31.9997 -1.99425 33.2832 -0.581606 33.2832 1.40875H27.2832ZM27.2832 10.8938V1.40875H33.2832V10.8938H27.2832ZM32.0488 13.3192L18.2021 23.3991L14.6709 18.5483L28.5176 8.46838L32.0488 13.3192ZM18.2021 18.5483L32.0488 28.6282L28.5176 33.479L14.6709 23.3991L18.2021 18.5483ZM27.2832 40.5912V31.0536H33.2832V40.5912H27.2832ZM29.5323 39.2575C29.0892 38.9396 28.5729 38.9485 28.2018 39.1123C27.8239 39.2792 27.2832 39.7761 27.2832 40.5912H33.2832C33.2832 42.5816 31.9997 43.9942 30.6254 44.6011C29.2578 45.2049 27.4915 45.178 26.0342 44.1323L29.5323 39.2575ZM2.33722 19.6694L29.5366 39.2606L26.0299 44.1292L-1.16951 24.5379L2.33722 19.6694ZM2.33721 22.3306C2.72583 22.0507 2.99994 21.559 2.99994 21C2.99994 20.441 2.72583 19.9493 2.33721 19.6694L-1.16951 24.5379C-3.61024 22.7799 -3.61025 19.2201 -1.1695 17.4621L2.33721 22.3306Z"
                fill="#01121A"
                mask="url(#path-1-inside-1_544_492)"
              />
              <ellipse
                cx="1.01814"
                cy="0.610884"
                rx="1.01814"
                ry="0.610884"
                transform="matrix(-1 0 0 1 27.0254 6.92334)"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="1.01814"
                cy="0.610884"
                rx="1.01814"
                ry="0.610884"
                transform="matrix(-1 0 0 1 22.5449 9.77417)"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="1.01814"
                cy="0.610884"
                rx="1.01814"
                ry="0.610884"
                transform="matrix(-1 0 0 1 18.0654 13.0322)"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="1.01814"
                cy="0.610884"
                rx="1.01814"
                ry="0.610884"
                transform="matrix(-1 0 0 1 13.5859 16.2903)"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="1.01814"
                cy="0.610884"
                rx="1.01814"
                ry="0.610884"
                transform="matrix(-1 0 0 1 9.10547 19.9556)"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="1.01814"
                cy="0.610884"
                rx="1.01814"
                ry="0.610884"
                transform="matrix(-1 0 0 1 13.5859 24.0281)"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="1.01814"
                cy="0.610884"
                rx="1.01814"
                ry="0.610884"
                transform="matrix(-1 0 0 1 18.0654 26.8789)"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="1.01814"
                cy="0.610884"
                rx="1.01814"
                ry="0.610884"
                transform="matrix(-1 0 0 1 22.5449 29.7297)"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="1.01814"
                cy="0.610884"
                rx="1.01814"
                ry="0.610884"
                transform="matrix(-1 0 0 1 27.0254 32.9878)"
                fill="white"
                fillOpacity="0.94"
              />
            </svg>
          </button>
        </div>
        <div
          className="flex overflow-x-auto scrollbar-none scroll-smooth w-full gap-5 p-3 snap-x"
          ref={sliderRef}
        >
          {wishlist && wishlist.length === 0 ? (
            <div className="text-red-500 font-extrabold text-xl text-center mx-auto">
              *You have not added any entry to your wishlist in this category.
            </div>
          ) : (
            wishlist.map((entry) => (
              <VotingEntryCard
                key={entry.id}
                entry={entry}
                setWishlist={setWishlist}
                wishlist={wishlist}
              />
            ))
          )}
        </div>
        <div className="hidden md:flex justify-center items-center">
          <button
            className="cursor-pointer"
            onClick={() => handleScrollRight(sliderRef.current)}
          >
            <svg
              width="31"
              height="42"
              viewBox="0 0 31 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_544_511" fill="white">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M29.6994 19.8964L2.49995 0.305104C1.48568 -0.422707 0 0.233516 0 1.40875V10.8941L13.8463 20.9736L0 31.0532V40.5912C0 41.7665 1.48568 42.4227 2.49995 41.6949L29.6994 22.1036C30.4779 21.5429 30.4779 20.4571 29.6994 19.8964Z"
                />
              </mask>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29.6994 19.8964L2.49995 0.305104C1.48568 -0.422707 0 0.233516 0 1.40875V10.8941L13.8463 20.9736L0 31.0532V40.5912C0 41.7665 1.48568 42.4227 2.49995 41.6949L29.6994 22.1036C30.4779 21.5429 30.4779 20.4571 29.6994 19.8964Z"
                fill="#005F73"
              />
              <path
                d="M2.49995 0.305104L4.25331 -2.12918L4.24897 -2.1323L2.49995 0.305104ZM29.6994 19.8964L27.946 22.3306L27.946 22.3306L29.6994 19.8964ZM0 10.8941H-3V12.4209L-1.76561 13.3195L0 10.8941ZM13.8463 20.9736L15.6119 23.399L18.9437 20.9736L15.6119 18.5482L13.8463 20.9736ZM0 31.0532L-1.76561 28.6278L-3 29.5264V31.0532H0ZM2.49995 41.6949L4.24897 44.1323L4.25331 44.1292L2.49995 41.6949ZM29.6994 22.1036L27.946 19.6694L27.946 19.6694L29.6994 22.1036ZM0.746579 2.73938L27.946 22.3306L31.4527 17.4621L4.25331 -2.12917L0.746579 2.73938ZM3 1.40875C3 2.22387 2.45933 2.72079 2.08141 2.88766C1.71027 3.05153 1.19398 3.06043 0.750925 2.74251L4.24897 -2.1323C2.79165 -3.17803 1.02538 -3.20493 -0.342165 -2.60108C-1.71649 -1.99425 -3 -0.581606 -3 1.40875H3ZM3 10.8941V1.40875H-3V10.8941H3ZM-1.76561 13.3195L12.0807 23.399L15.6119 18.5482L1.76561 8.46864L-1.76561 13.3195ZM12.0807 18.5482L-1.76561 28.6278L1.76561 33.4786L15.6119 23.399L12.0807 18.5482ZM3 40.5912V31.0532H-3V40.5912H3ZM0.750921 39.2575C1.19397 38.9396 1.71027 38.9485 2.08141 39.1123C2.45933 39.2792 3 39.7761 3 40.5912H-3C-3 42.5816 -1.71649 43.9942 -0.342166 44.6011C1.02539 45.2049 2.79166 45.178 4.24897 44.1323L0.750921 39.2575ZM27.946 19.6694L0.746579 39.2606L4.25331 44.1292L31.4527 24.5379L27.946 19.6694ZM27.946 22.3306C27.5574 22.0507 27.2833 21.559 27.2833 21C27.2833 20.441 27.5574 19.9493 27.946 19.6694L31.4527 24.5379C33.8934 22.7799 33.8935 19.2201 31.4527 17.4621L27.946 22.3306Z"
                fill="#01121A"
                mask="url(#path-1-inside-1_544_511)"
              />
              <ellipse
                cx="4.17456"
                cy="8.35488"
                rx="0.993899"
                ry="0.596339"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="8.54761"
                cy="11.1376"
                rx="0.993899"
                ry="0.596339"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="12.9216"
                cy="14.3183"
                rx="0.993899"
                ry="0.596339"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="17.2937"
                cy="17.4987"
                rx="0.993899"
                ry="0.596339"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="21.6667"
                cy="21.0766"
                rx="0.993899"
                ry="0.596339"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="17.2937"
                cy="25.0522"
                rx="0.993899"
                ry="0.596339"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="12.9216"
                cy="27.8354"
                rx="0.993899"
                ry="0.596339"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="8.54761"
                cy="30.6183"
                rx="0.993899"
                ry="0.596339"
                fill="white"
                fillOpacity="0.94"
              />
              <ellipse
                cx="4.17456"
                cy="33.7987"
                rx="0.993899"
                ry="0.596339"
                fill="white"
                fillOpacity="0.94"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingSection;
