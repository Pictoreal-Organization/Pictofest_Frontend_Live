import { toast } from "sonner";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const VotingEntryCard = ({ entry, setWishlist, wishlist }) => {
  const trimString = (str, length) => {
    if (str.length <= length * 2) {
      return str;
    }

    const trimmedLength = str.length - length * 2;
    return str.substring(length, trimmedLength);
  };

  const handleSelect = () => {
    if (wishlist.filter((entry) => entry.isSelected).length < 2) {
      setWishlist((prev) =>
        prev.map((item) => {
          if (item.ticket_id === entry.ticket_id) {
            return { ...item, isSelected: true };
          }
          return item;
        })
      );
      toast.success("Entry selected successfully.");
    } else {
      toast.error(
        "You're only allowed to select a maximum of two entries from this category."
      );
    }
  };

  const handleNotSelect = () => {
    setWishlist((prev) =>
      prev.map((item) => {
        if (item.ticket_id === entry.ticket_id) {
          return { ...item, isSelected: false };
        }
        return item;
      })
    );
    toast.success("Entry deselected successfully.");
  };

  return (
    <div className="bg-[url('/img/voting/rb.png')] bg-size-[100%_100%] p-10 flex flex-col justify-center items-center min-h-[390px] min-w-[254px] snap-start">
      <PhotoProvider>
        <PhotoView src={trimString(entry.image_link, 2) + "3D"}>
          <img
            src={trimString(entry.image_link, 2) + "3D"}
            loading="lazy"
            alt="Entry Image"
            className="border-4 border-[#4E3506] rounded-xl shadow-xl h-[214px] w-[214px]"
          />
        </PhotoView>
      </PhotoProvider>
      <div className="bg-[#4E3506] bg-cover font-semibold text-2xl text-white px-2 py-1 rounded-xl flex justify-center items-center my-auto">
        {entry.ticket_id}
      </div>
      {entry.isSelected ? (
        <button
          className="w-[30px] h-[30px] bg-white border-4 border-[#48B02C] rounded-lg"
          onClick={handleNotSelect}
        >
          <img alt="Check Symbol" src="/img/voting/check.png" />
        </button>
      ) : (
        <button
          className="w-[30px] h-[30px] bg-white border-4 border-black rounded-lg"
          onClick={handleSelect}
        ></button>
      )}
    </div>
  );
};

export default VotingEntryCard;
