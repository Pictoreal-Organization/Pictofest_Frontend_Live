// import Link from "next/link";

// const Voting = () => {
//   return (
//     <main className="bg-[url('/img/events/voting_2025.png')] bg-size-[100%_100%] min-h-dvh px-4">
//       <div className="flex flex-col justify-center items-center lg:gap-10 gap-8 lg:py-14 py-8 max-w-4xl mx-auto">
//         <h1 className="text-4xl pt-[100px] lg:text-5xl tracking-normal font-light text-gray-900 heading-font text-center">
//           Instructions
//         </h1>
//         <div>

//           <div className="text-3xl text-black text-center description-font py-5">
//             FOR OFFLINE VOTERS
//           </div>
//           <ol className="list-decimal body-font tracking-wider font-bold pl-8 lg:text-2xl">
//             <li>
//               Visit our exhibition, take a stroll, and enjoy the beautiful
//               artworks displayed!
//             </li>
//             <li>
//               Enter the 5-digit code associated with the entry (displayed on the
//               entry itself) that you want to add to your wishlist and click on
//               the search icon.
//             </li>
//             <li>
//               Only add entries which you would like to vote for in the wishlist.
//               There's no limit to the number of entries you can add. You can
//               also delete any entry you wish to remove from the wishlist.
//             </li>
//             <li>
//               After you're done with the tour, visit your wishlist and proceed
//               to vote. All the entries you added to your wishlist will be
//               visible here! You may only vote for a maximum of 2 entries in each
//               category. However, it is not compulsory to vote in every category.
//             </li>
//             <li>
//               Once you have selected two entries to vote for in the categories,
//               Click on the VOTE button. Your votes will be registered
//               successfully.
//             </li>
//             <li>
//               You can only vote once! Any category you miss out will not be
//               accessible for voting again!
//             </li>
//             <li>
//               The voting lines will close at 5.00 PM on 24th February, 2024.
//               Make sure to vote before the deadline!
//             </li>
//             <li>
//               Once you're done voting, fill out the feedback form and do let us
//               know your experience and suggestions!
//             </li>
//             <li>You may access the entries you voted on on my votes page.</li>
//           </ol>
//           <div className="flex justify-center items-center pt-5">
//             <Link
//               href="/voting/ticket-id"
//               className="bg-[url('/img/voting/button.png')] bg-size-[100%_100%] text-white px-5 py-2 rounded-lg"
//             >
//               Start Voting
//             </Link>
//           </div>
//         </div>
//         <div>
//           <div className="text-3xl text-black text-center description-font py-5">
//             FOR ONLINE VOTERS
//           </div>
//           <ol className="list-decimal body-font tracking-wider font-bold pl-8 lg:text-2xl">
//             <li>
//               If you're unable to visit our exhibition, don't worry! You can
//               still have a stroll through our virtual gallery option.
//             </li>
//             <li>
//               Select the category and start exploring (Painting/Sketching,
//               Photography, Digital Art, Theme Category-Colours of Emotions).
//             </li>
//             <li>
//               Only add entries which you would like to vote for in the wishlist.
//               There's no limit to the number of entries you can add. You can
//               also delete any entry you wish to remove from the wishlist.
//             </li>
//             <li>
//               After you're done with the tour, visit your wishlist and proceed
//               to vote. All the entries you added to your wishlist will be
//               visible here! You may only vote for a maximum of 2 entries in each
//               category. However, it is not compulsory to vote in every category.
//             </li>
//             <li>
//               Once you have selected two entries to vote for in the categories,
//               Click on the VOTE button. Your votes will be registered
//               successfully.
//             </li>
//             <li>
//               You can only vote once! Any category you miss out will not be
//               accessible for voting again!
//             </li>
//             <li>
//               The voting lines will close at 5.00 PM on 24th February, 2024.
//               Make sure to vote before the deadline!
//             </li>
//             <li>
//               Once you're done voting, fill out the feedback form and do let us
//               know your experience and suggestions!
//             </li>
//             <li>You may access the entries you voted on on my votes page.</li>
//           </ol>
//           <div className="flex justify-center items-center pt-5">
//             <Link
//               href="/voting/virtual-gallery"
//               className="bg-[url('/img/voting/button.png')] bg-size-[100%_100%] text-white px-5 py-2 rounded-lg"
//             >
//               Explore Virtually
//             </Link>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Voting;

// "use client";import Link from "next/link";
// import { useState } from "react";

// const Voting = () => {
//   const [isOnline, setIsOnline] = useState(false);

//   const toggleVotingMode = () => {
//     setIsOnline(!isOnline);
//   };

//   return (
//     <main className="bg-[url('/img/events/voting_2025.png')] bg-size-[100%_100%] min-h-dvh px-4">
//       <div className="flex flex-col justify-center items-center lg:gap-10 gap-8 lg:py-14 py-8 max-w-4xl mx-auto">
//         {/* Toggle Button */}
//         <div className="w-full flex justify-center mt-20"> {/* Adjusted margin-top to ensure visibility below navbar */}
//           <button
//             onClick={toggleVotingMode}
//             className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
//           >
//             Switch to {isOnline ? "Offline" : "Online"} Voting
//           </button>
//         </div>

//         <h1 className="text-4xl lg:text-5xl tracking-normal font-light text-gray-900 heading-font text-center mt-10"> {/* Adjusted margin-top */}
//           INstructions
//         </h1>

//         {!isOnline ? (
//           <div>
//             <div className="text-3xl text-black text-center description-font py-5">
//               FOR OFFLINE VOTERS
//             </div>
//             <ol className="list-decimal body-font tracking-wider font-bold pl-8 lg:text-2xl">
//               <li>
//                 Visit our exhibition, take a stroll, and enjoy the beautiful
//                 artworks displayed!
//               </li>
//               <li>
//                 Enter the 5-digit code associated with the entry (displayed on the
//                 entry itself) that you want to add to your wishlist and click on
//                 the search icon.
//               </li>
//               <li>
//                 Only add entries which you would like to vote for in the wishlist.
//                 There's no limit to the number of entries you can add. You can
//                 also delete any entry you wish to remove from the wishlist.
//               </li>
//               <li>
//                 After you're done with the tour, visit your wishlist and proceed
//                 to vote. All the entries you added to your wishlist will be
//                 visible here! You may only vote for a maximum of 2 entries in each
//                 category. However, it is not compulsory to vote in every category.
//               </li>
//               <li>
//                 Once you have selected two entries to vote for in the categories,
//                 Click on the VOTE button. Your votes will be registered
//                 successfully.
//               </li>
//               <li>
//                 You can only vote once! Any category you miss out will not be
//                 accessible for voting again!
//               </li>
//               <li>
//                 The voting lines will close at 5.00 PM on 24th February, 2024.
//                 Make sure to vote before the deadline!
//               </li>
//               <li>
//                 Once you're done voting, fill out the feedback form and do let us
//                 know your experience and suggestions!
//               </li>
//               <li>You may access the entries you voted on on my votes page.</li>
//             </ol>
//             <div className="flex justify-center items-center pt-5">
//               <Link
//                 href="/voting/ticket-id"
//                 className="bg-[url('/img/voting/button.png')] bg-size-[100%_100%] text-white px-5 py-2 rounded-lg"
//               >
//                 Start Voting
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <div className="text-3xl text-black text-center description-font py-5">
//               FOR ONLINE VOTERS
//             </div>
//             <ol className="list-decimal body-font tracking-wider font-bold pl-8 lg:text-2xl">
//               <li>
//                 If you're unable to visit our exhibition, don't worry! You can
//                 still have a stroll through our virtual gallery option.
//               </li>
//               <li>
//                 Select the category and start exploring (Painting/Sketching,
//                 Photography, Digital Art, Theme Category-Colours of Emotions).
//               </li>
//               <li>
//                 Only add entries which you would like to vote for in the wishlist.
//                 There's no limit to the number of entries you can add. You can
//                 also delete any entry you wish to remove from the wishlist.
//               </li>
//               <li>
//                 After you're done with the tour, visit your wishlist and proceed
//                 to vote. All the entries you added to your wishlist will be
//                 visible here! You may only vote for a maximum of 2 entries in each
//                 category. However, it is not compulsory to vote in every category.
//               </li>
//               <li>
//                 Once you have selected two entries to vote for in the categories,
//                 Click on the VOTE button. Your votes will be registered
//                 successfully.
//               </li>
//               <li>
//                 You can only vote once! Any category you miss out will not be
//                 accessible for voting again!
//               </li>
//               <li>
//                 The voting lines will close at 5.00 PM on 24th February, 2024.
//                 Make sure to vote before the deadline!
//               </li>
//               <li>
//                 Once you're done voting, fill out the feedback form and do let us
//                 know your experience and suggestions!
//               </li>
//               <li>You may access the entries you voted on on my votes page.</li>
//             </ol>
//             <div className="flex justify-center items-center pt-5">
//               <Link
//                 href="/voting/virtual-gallery"
//                 className="bg-[url('/img/voting/button.png')] bg-size-[100%_100%] text-white px-5 py-2 rounded-lg"
//               >
//                 Explore Virtually
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default Voting;


"use client";
import Link from "next/link";
import { useState } from "react";

const Voting = () => {
  const [isOnline, setIsOnline] = useState(false);

  const toggleVotingMode = () => {
    setIsOnline(!isOnline);
  };

  return (
    <main className="bg-[url('/img/events/voting_2025.png')] bg-size-[100%_100%] min-h-dvh px-4">
      <div className="flex flex-col justify-center items-center lg:gap-10 gap-8 lg:py-14 py-8 max-w-4xl mx-auto">
        {/* Toggle Button */}
        <div className="w-full flex justify-center mt-16"> {/* Increased margin-top to move the button lower */}
          <button
            onClick={toggleVotingMode}
            className="bg-[#8B4513] text-white px-8 py-3 rounded-lg shadow-lg hover:brightness-110 transition duration-300 font-bold text-xl border-2 border-yellow-900"
          >
            {isOnline ? "Switch to Offline Voting" : "Switch to Online Voting"}
          </button>
        </div>

        <h1 className="text-4xl lg:text-5xl tracking-normal font-light text-gray-900 heading-font text-center mt-8"> {/* Adjusted margin-top */}
          Instructions
        </h1>

        {!isOnline ? (
          <div>
            <div className="text-3xl text-black text-center description-font py-5">
              FOR OFFLINE VOTERS
            </div>
            <ol className="list-decimal body-font tracking-normal font-light pl-8 lg:text-2xl">
              <li>
                Visit our exhibition, take a stroll, and enjoy the beautiful
                artworks displayed!
              </li>
              <li>
                Enter the 5-digit code associated with the entry (displayed on the
                entry itself) that you want to add to your wishlist and click on
                the search icon.
              </li>
              <li>
                Only add entries which you would like to vote for in the wishlist.
                There's no limit to the number of entries you can add. You can
                also delete any entry you wish to remove from the wishlist.
              </li>
              <li>
                After you're done with the tour, visit your wishlist and proceed
                to vote. All the entries you added to your wishlist will be
                visible here! You may only vote for a maximum of 2 entries in each
                category. However, it is not compulsory to vote in every category.
              </li>
              <li>
                Once you have selected two entries to vote for in the categories,
                Click on the VOTE button. Your votes will be registered
                successfully.
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
                Once you're done voting, fill out the feedback form and do let us
                know your experience and suggestions!
              </li>
              <li>You may access the entries you voted on on my votes page.</li>
            </ol>
            <div className="flex justify-center items-center pt-5">
              <Link
                href="/voting/ticket-id"
                className="bg-[url('/img/voting/button.png')] bg-size-[100%_100%] text-white px-5 py-2 rounded-lg"
              >
                Start Voting
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-3xl text-black text-center description-font py-5">
              FOR ONLINE VOTERS
            </div>
            <ol className="list-decimal body-font tracking-normal font-light pl-8 lg:text-2xl">
              <li>
                If you're unable to visit our exhibition, don't worry! You can
                still have a stroll through our virtual gallery option.
              </li>
              <li>
                Select the category and start exploring (Painting/Sketching,
                Photography, Digital Art, Theme Category-Colours of Emotions).
              </li>
              <li>
                Only add entries which you would like to vote for in the wishlist.
                There's no limit to the number of entries you can add. You can
                also delete any entry you wish to remove from the wishlist.
              </li>
              <li>
                After you're done with the tour, visit your wishlist and proceed
                to vote. All the entries you added to your wishlist will be
                visible here! You may only vote for a maximum of 2 entries in each
                category. However, it is not compulsory to vote in every category.
              </li>
              <li>
                Once you have selected two entries to vote for in the categories,
                Click on the VOTE button. Your votes will be registered
                successfully.
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
                Once you're done voting, fill out the feedback form and do let us
                know your experience and suggestions!
              </li>
              <li>You may access the entries you voted on on my votes page.</li>
            </ol>
            <div className="flex justify-center items-center pt-5">
              <Link
                href="/voting/virtual-gallery"
                className="bg-[url('/img/voting/button.png')] bg-size-[100%_100%] text-white px-5 py-2 rounded-lg"
              >
                Explore Virtually
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Voting;