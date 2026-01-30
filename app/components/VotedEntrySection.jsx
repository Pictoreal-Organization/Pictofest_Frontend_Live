import VotedEntryCard from "@/app/components/VotedEntryCard";

const VotedEntrySection = ({ section, votedEntries }) => {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <div
        className="bg-linear-to-r from-[#4E3506] to-[#4E3506] rounded-xl shadow-lg 
                  sm:px-10 sm:py-5 py-4 sm:w-[350px] w-[300px]
                  transform transition-all duration-200 hover:shadow-xl"
      >
        <div className="sm:text-3xl text-2xl font-bold text-white text-center">
          {section.title}
        </div>
      </div>
      <div className="w-full flex justify-center md:gap-16 gap-10 flex-wrap">
        {votedEntries.filter((entry) => entry.event_code === section.code)
          .length === 0 ? (
          <div className="text-red-500 font-extrabold text-xl text-center">
            *You haven't voted in this category for any entry.
          </div>
        ) : (
          votedEntries
            .filter((entry) => entry.event_code === section.code)
            .map((entry) => <VotedEntryCard key={entry.id} entry={entry} />)
        )}
      </div>
    </div>
  );
};

export default VotedEntrySection;
