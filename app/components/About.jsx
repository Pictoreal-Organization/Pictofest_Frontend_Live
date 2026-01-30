"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section
      className="relative w-full min-h-[120vh] px-4 sm:px-6 pt-14 sm:pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ================= MOBILE HEADING ================= */}
      <motion.h2
        className="
          block md:hidden
          text-center
          text-4xl
          text-green-900
          heading-font
          mt-[5vh]
          mb-[4vh]
        "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        About Us
      </motion.h2>

      {/* ================= MOBILE FRAME ================= */}
      <div className="block md:hidden w-full max-w-lg mx-auto">
        <BorderFrame mobile>
          <AboutContent />
        </BorderFrame>
      </div>

      {/* ================= DESKTOP FRAME ================= */}
      <div className="hidden md:block w-full max-w-[1400px] mx-auto mt-[8vh]">
        <BorderFrame>
          <AboutContent desktop />
        </BorderFrame>
      </div>
    </motion.section>
  );
};

/* ================= BORDER FRAME ================= */
const BorderFrame = ({ children, mobile = false }) => {
  const BORDER = mobile ? 40 : 48;

  return (
    <div className="relative w-full overflow-hidden">

      {/* TOP */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: BORDER,
          zIndex: 30,
          backgroundImage: "url('/img/home/top.svg')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
        }}
      />

      {/* BOTTOM */}
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: BORDER,
          zIndex: 30,
          backgroundImage: "url('/img/home/top.svg')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
        }}
      />

      {/* LEFT */}
      <div
        className="absolute top-0 left-0 h-full"
        style={{
          width: BORDER,
          zIndex: 20,
          backgroundImage: "url('/img/home/side.svg')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
        }}
      />

      {/* RIGHT */}
      <div
        className="absolute top-0 right-0 h-full"
        style={{
          width: BORDER,
          zIndex: 20,
          backgroundImage: "url('/img/home/side2.svg')",
          backgroundRepeat: "repeat-y",
          backgroundSize: "100% auto",
        }}
      />

      {/* CONTENT */}
      <div
        className="relative"
        style={{
          zIndex: 10,
          padding: mobile
            ? `${BORDER + 24}px ${BORDER + 20}px`
            : `${BORDER + 40}px ${BORDER + 48}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};


/* ================= SHARED CONTENT ================= */
const AboutContent = ({ desktop = false }) => {
  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* LEFT */}
      <motion.div
        className="flex flex-col items-center text-center lg:w-2/5"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/img/home/about_us_hat.svg"
          alt="Hat"
          width={300}
          height={300}
          className="hidden md:block -mb-[2vh]"
          loading="lazy"
          
        />

        <Image
          src="/img/home/picto-logo.png"
          alt="Pictoreal Logo"
          width={200}
          height={200}
          className="w-28 sm:w-32 md:w-44 lg:w-[38vh] mt-[3vh]"
          loading="lazy"
        />

        <p className="mt-6 text-lg sm:text-xl text-amber-900 sub-heading-font font-medium">
          ‘ May Thoughts, Colours,
          <br className="hidden md:block" />
          and Words prevail! ’
        </p>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        className="lg:w-1/2 text-amber-900 body-font font-semibold text-center lg:text-justify"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* DESKTOP HEADING */}
        {desktop && (
          <motion.h2
            className="hidden md:block text-center text-5xl text-green-900 heading-font mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            About Us
          </motion.h2>
        )}

        {/* MOBILE TEXT */}
        <p className="block md:hidden text-md leading-relaxed">
        Pictoreal is a non-technical club at PICT that creates and publishes the annual PICT magazine, based on a unique theme every year. It provides students with a creative space to express ideas through literature, design, photography, to name a few.
        <br />
        The club also conducts various creative initiatives and events that help members develop practical skills such as content creation, communication, teamwork, and event coordination. 
        </p>

        {/* DESKTOP TEXT */}
        <p className="hidden md:block text-base lg:text-xl leading-relaxed">
          Pictoreal is a non-technical club at PICT that curates and publishes the annual PICT magazine, built around a unique theme each year. Beyond the magazine, Pictoreal organizes a range of creative initiatives and events that encourage artistic expression and collaboration. Through these activities, members gain practical experience in areas such as content creation, design thinking, event coordination, public speaking, and teamwork.
          <br />
          Pictoreal also believes in using creativity as a tool for positive impact and  through PictoSocial  - a subdivision of Pictoreal, actively promotes social awareness through its initiatives. At its core, the club aims to nurture creativity, confidence, and collaboration, empowering students to explore and develop their creative potential.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default About;
