import { MdCancel } from "react-icons/md";
import { useState } from "react";

const OnlineInstructionsModal = () => {
  const [isOpen, SetIsOpen] = useState(false);

  const handleOpen = () => {
    SetIsOpen(true);
  };

  const handleClose = () => {
    SetIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-[url('/img/events/website_cream.png')] bg-cover">
          <div className="bg-[#f6edd8] p-5 rounded-xl max-w-4xl mx-4 mt-32 mb-10 shadow-lg">
            <div className="p-4 bg-transparent border-dashed border-2 border-neutral-800 rounded-xl flex flex-col h-[75vh] relative">
              <div className="sm:text-3xl text-2xl text-black text-center description-font py-5">
                FOR ONLINE VOTERS
              </div>
              <ol className="list-decimal body-font font-semibold pl-8 overflow-y-scroll scrollbar-none">
                <li>
                  If you're unable to visit our exhibition, don't worry! You can
                  still have a stroll through our virtual gallery option.
                </li>
                <li>
                  Select the category and start exploring (Painting/Sketching,
                  Photography, Digital Art, Theme Category-Colours of Emotions).
                </li>
                <li>
                  Only add entries which you would like to vote for in the
                  wishlist. There's no limit to the number of entries you can
                  add. You can also delete any entry you wish to remove from the
                  wishlist.
                </li>
                <li>
                  After you're done with the tour, visit your wishlist and
                  proceed to vote. All the entries you added to your wishlist
                  will be visible here! You may only vote for a maximum of 2
                  entries in each category. However, it is not compulsory to
                  vote in every category.
                </li>
                <li>
                  Once you have selected two entries to vote for in the
                  categories, Click on the VOTE button. Your votes will be
                  registered successfully.
                </li>
                <li>
                  You can only vote once! Any category you miss out will not be
                  accessible for voting again!
                </li>
                <li>
                  The voting lines will close at 5.00 PM on 24th February, 2024.
                  Make sure to vote before the deadline!
                </li>
                <li>
                  Once you're done voting, fill out the feedback form and do let
                  us know your experience and suggestions!
                </li>
                <li>
                  You may access the entries you voted on on my votes page.
                </li>
              </ol>
              <button
                className=" text-red-400 rounded-full absolute sm:right-4 sm:top-4 right-2 top-2"
                onClick={handleClose}
              >
                <MdCancel className="sm:h-10 sm:w-10 h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="p-2 font-semibold fixed sm:right-10 sm:bottom-10 right-5 bottom-5 h-[50px] w-[50px] bg-[#f6edd8] rounded-full border-2 border-blue-500 shadow-lg cursor-pointer"
          onClick={handleOpen}
        >
          <img src="/img/voting/instructions.png" alt="instructions icon" />
        </button>
      )}
    </>
  );
};

export default OnlineInstructionsModal;
