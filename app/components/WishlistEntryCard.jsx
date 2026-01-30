import api from "@/app/api";
import { toast } from "sonner";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const WishlistEntryCard = ({ entry, setWishlist }) => {
  const trimString = (str, length) => {
    if (str.length <= length * 2) {
      return str;
    }

    const trimmedLength = str.length - length * 2;
    return str.substring(length, trimmedLength);
  };

  const handleDeleteFromWishlist = async () => {
    try {
      const response = await api.delete("/wishlist/", {
        data: { entry_id: entry.id },
      });
      toast.success(response?.data?.message);
      setWishlist((prev) => prev.filter((item) => item.id !== entry.id));
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div
      className="bg-[url('/img/voting/rb.png')] bg-size-[100%_100%] p-10 flex flex-col justify-center items-center min-h-[390px] min-w-[254px] snap-start rounded-2xl transition-all duration-300"
    >
      {/* Image with PhotoView */}
      <PhotoProvider>
        <PhotoView src={trimString(entry.image_link, 2) + "3D"}>
          <div className="overflow-hidden rounded-xl">
            <img
              src={trimString(entry.image_link, 2) + "3D"}
              loading="lazy"
              alt="Entry Image"
              className="h-[214px] w-[214px] object-cover 
                   border-4 border-[#4E3506] rounded-xl shadow-lg
                   transition-transform duration-300 hover:scale-105 mb-4"
            />
          </div>
        </PhotoView>
      </PhotoProvider>

      {/* Ticket ID */}
      <div
        className="my-auto px-6 py-3 bg-linear-to-r from-[#4E3506] to-[#4E3506] 
                  rounded-lg shadow-md
                  transform transition-all duration-200"
      >
        <span className="font-semibold text-2xl text-white">
          {entry.ticket_id}
        </span>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDeleteFromWishlist}
        className="mt-4 p-2 rounded-full hover:bg-[#FECF8D] 
               transition-colors duration-200 
               active:scale-95 transform"
      >
        <svg
          width="43"
          height="42"
          viewBox="0 0 43 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-colors duration-200"
        >
          <g clipPath="url(#clip0_588_142)">
            <path
              d="M21.5 0C9.62701 0 0 9.40313 0 21C0 32.5969 9.62701 42 21.5 42C33.373 42 43 32.5969 43 21C43 9.40313 33.373 0 21.5 0ZM21.5 38.4375C11.6426 38.4375 3.64732 30.6281 3.64732 21C3.64732 11.3719 11.6426 3.5625 21.5 3.5625C31.3574 3.5625 39.3527 11.3719 39.3527 21C39.3527 30.6281 31.3574 38.4375 21.5 38.4375Z"
              className="fill-[#4E3506]"
            />
            <path
              d="M21.5001 3.5625C11.6428 3.5625 3.64746 11.3719 3.64746 21C3.64746 30.6281 11.6428 38.4375 21.5001 38.4375C31.3575 38.4375 39.3528 30.6281 39.3528 21C39.3528 11.3719 31.3575 3.5625 21.5001 3.5625ZM29.745 28.2703C29.8026 28.3406 29.8362 28.425 29.8362 28.5141C29.8362 28.725 29.6634 28.8891 29.4523 28.8891L26.2849 28.875L21.5193 23.325L16.7538 28.8797L13.5816 28.8938C13.3705 28.8938 13.1977 28.725 13.1977 28.5188C13.1977 28.4297 13.2313 28.3453 13.2889 28.275L19.5325 21.0141L13.2889 13.7484C13.2309 13.6797 13.1987 13.5937 13.1977 13.5047C13.1977 13.2938 13.3705 13.1297 13.5816 13.1297L16.7538 13.1437L21.5193 18.6937L26.2896 13.1391L29.4571 13.125C29.6682 13.125 29.841 13.2937 29.841 13.5C29.841 13.5891 29.8122 13.6781 29.7546 13.7438L23.511 21.0094L29.745 28.2703Z"
              className="fill-red-200"
            />
            <path
              d="M29.8406 13.5C29.8406 13.2938 29.6678 13.125 29.4566 13.125L26.2892 13.1391L21.5189 18.6937L16.7534 13.1437L13.5812 13.1297C13.37 13.1297 13.1973 13.2938 13.1973 13.5047C13.1973 13.5938 13.2309 13.6781 13.2884 13.7484L19.5321 21.0141L13.2884 28.275C13.2305 28.3437 13.1983 28.4297 13.1973 28.5188C13.1973 28.725 13.37 28.8938 13.5812 28.8938L16.7534 28.8797L21.5189 23.325L26.2844 28.875L29.4518 28.8891C29.663 28.8891 29.8358 28.725 29.8358 28.5141C29.8358 28.425 29.8022 28.3406 29.7446 28.2703L23.5105 21.0094L29.7542 13.7438C29.8118 13.6781 29.8406 13.5891 29.8406 13.5Z"
              className="fill-[#4E3506]"
            />
          </g>
          <defs>
            <clipPath id="clip0_588_142">
              <rect width="43" height="42" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default WishlistEntryCard;
