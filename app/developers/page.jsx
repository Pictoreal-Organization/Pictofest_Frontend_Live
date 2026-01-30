import Image from "next/image";

const Team = () => {
  const teamMembers = [
    {
      name: "Hemangi Patil ",
      imgSrc: "/img/developer/hemangi.jpeg",
      github: "http://github.com/hemangi1324",
      linkedin: "http://linkedin.com/in/hemangi-patil9988",
    },
    {
      name: "Shravani Sawant",
      imgSrc: "/img/developer/shravani.jpeg",
      github: "https://github.com/Shravani-Sawant28",
      linkedin: "https://www.linkedin.com/in/shravani-sawant3628/",
    },
    {
      name: "Piyush Trivedi",
      imgSrc: "/img/developer/piyush.jpeg",
      github: "https://github.com/piyush27t",
      linkedin: "https://www.linkedin.com/in/piyush-trivedi27",
    },
    {
      name: "Salina Tamboli",
      imgSrc: "/img/developer/salina.jpeg",
      github: "https://github.com/Salina00",
      linkedin: "http://www.linkedin.com/in/salina-tamboli",
    },
    {
      name: "Sharvari Ballal",
      imgSrc: "/img/developer/sharvari.jpg",
      github: "https://github.com/sharvariballal",
      linkedin: "https://www.linkedin.com/in/sharvari-ballal-639260342/",
    },
    {
      name: "Shruti Joshi",
      imgSrc: "/img/developer/shruti.jpeg",
      github: "https://github.com/Shruti-Joshi-21",
      linkedin: "http://www.linkedin.com/in/shruti-joshi21",
    },
    {
      name: "Diya Dawra ",
      imgSrc: "/img/developer/diya.jpg",
      github: "https://github.com/diya-dawra07",
      linkedin: "https://www.linkedin.com/in/diya-dawra-20273b369?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BZ8XXIU%2BGS6ubsT0e%2FzdiaA%3D%3D",
    },
    {
      name: "Payal Talreja ",
      imgSrc: "/img/developer/payal.jpeg",
      github: "https://github.com/payaltalreja08",
      linkedin: "http://www.linkedin.com/in/payal-talreja-94b52828a",
    },
    {
      name: "Sumedh Supe",
      imgSrc: "/img/developer/sumedh.jpeg",
      github: "https://github.com/SumedhAnupSupe",
      linkedin: "https://www.linkedin.com/in/sumedh-supe-b44835382?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app/",
    },
    {
      name: "Manas Gawali",
      imgSrc: "/img/developer/ManasGawali.jpg",
      github: "https://github.com/ManasGawali",
      linkedin: "https://www.linkedin.com/in/manas-gawali-ab000128b/",
    },
    {
      name: "Madhura Deshmukh",
      imgSrc: "/img/developer/madhura.jpg",
      github: "https://github.com/madhura0805",
      linkedin: "https://www.linkedin.com/in/madhura-deshmukh-0692a5277/",
    },
    {
      name: "Riddhi Lahare",
      imgSrc: "/img/developer/riddhi.jpeg",
      github: "https://github.com/riddhilahare14",
      linkedin: "https://www.linkedin.com/in/riddhi-lahare-9ab737301/",
    }
  ];

  return (
    <> 
      {/* ============================================================
          1. DYNAMIC BACKGROUND LAYER
         ============================================================ */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        {/* Mobile Background */}
        <div className="block md:hidden w-full h-full relative">
          <Image
            src="/img/common/general-mobile-bg.png"
            alt="Mobile Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Desktop Background */}
        <div className="hidden md:block w-full h-full relative">
          <Image
            src="/img/common/desktop-bg.png"
            alt="Desktop Background"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* ============================================================
          2. CONTENT SECTION
         ============================================================ */}
      <div className="relative z-10 pt-[90px] pb-20">
        {/* Title */}
        <div className="text-4xl lg:text-5xl tracking-tight heading-font mt-1 lg:mt-2 text-center heading-font text-white mb-9">
          OUR TEAM
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7 px-4 md:px-10 min-h-screen">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="relative flex justify-center description-font"
            >
              <div>
                <div className="relative w-[250px] md:w-[235px] lg:w-[335px] flex flex-col items-center">
                  {/* Profile Image*/}
                  <div className="absolute top-100/215 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden z-0">
                    <Image
                      src={member.imgSrc}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      quality={70}
                    />
                  </div>

                  {/*Frame */}
                  <div className="relative w-full z-10">
                    <Image
                      src="/img/developer/frame.svg"
                      alt="frame"
                      width={335}
                      height={335}
                      className="w-full"
                    />
                  </div>
                
                  <div className="sub-heading-font absolute top-[73.9%] left-[52%] -translate-x-[50%] text-center text-xs md:text-xs lg:text-base whitespace-nowrap text-black z-20">
                    {member.name}
                  </div>

                </div>
                <div className="absolute top-[89%] left-[52%] -translate-x-[50%] flex flex-wrap justify-center gap-3 sm:gap-5 md:gap-6 z-50">
                  <a
                    href={member.linkedin || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="z-50 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <Image
                      src="/img/developer/linkedin.svg"
                      alt="LinkedIn"
                      width={32}
                      height={32}
                      className="w-6 lg:w-8"
                      loading="lazy"
                    />
                  </a>
                  <a
                    href={member.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="z-50 hover:opacity-80 transition-opacity cursor-pointer"

                  >
                    <Image
                      src="/img/developer/github.svg"
                      alt="GitHub"
                      width={32}
                      height={32}
                      className="w-6 lg:w-8"
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Team;