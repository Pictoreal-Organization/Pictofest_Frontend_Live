import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const VotedEntryCard = ({ entry }) => {
  const trimString = (str, length) => {
    if (str.length <= length * 2) {
      return str;
    }

    const trimmedLength = str.length - length * 2;
    return str.substring(length, trimmedLength);
  };

  return (
    <div className="bg-[url('/img/voting/rb.png')] bg-size-[100%_100%] p-12 flex flex-col justify-center items-center min-h-[390px] min-w-[254px] snap-start">
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
    </div>
  );
};

export default VotedEntryCard;
