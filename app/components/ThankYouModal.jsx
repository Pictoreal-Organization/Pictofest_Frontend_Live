import Link from "next/link";

const ThankYouModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-xs z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full mx-4 relative flex flex-col items-center text-center">
        <img
          src="/img/voting/thankyou.png"
          loading="lazy"
          alt="Thank You"
          className="w-48 sm:w-56"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Thank You for Voting!
        </h2>
        <p className="text-gray-600 text-sm mt-2 px-6">
          Your vote has been successfully recorded. We appreciate your support!
        </p>

        <div className="flex justify-center gap-4 mt-6 w-full">
          <Link
            target="_blank"
            href="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdSEyue2Vjr8Z4VTl3N1Ukb-kZ2J7HGqBArKnDY9RrH7aJ49w/formResponse"
            className="bg-[#4E3506] hover:bg-[#b69559] text-white px-6 py-2 rounded-lg transition-all duration-300"
          >
            Give Feedback
          </Link>
          <Link
            href="/votes"
            className="bg-[#4E3506] hover:bg-[#b69559] text-white px-6 py-2 rounded-lg transition-all duration-300"
          >
            My Votes
          </Link>
        </div>

        {/* <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
          onClick={() => console.log("Close Modal")}
        >
          ✕
        </button> */}
      </div>
    </div>
  );
};

export default ThankYouModal;
