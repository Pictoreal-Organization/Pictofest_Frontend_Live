import Link from "next/link";

const Footer = () => {
  return (
    <footer className="body-font">
      {/* ================= MOBILE FOOTER ================= */}
      <div className="block md:hidden bg-[url('/img/home/footerphone.svg')] bg-cover bg-center px-[5vw] pt-[8vh] pb-[4vh]">

        {/* Logo + Socials */}
        <div className="flex flex-col items-center gap-[3vh]">
          <Link href="https://www.pictoreal.in/" target="_blank">
            <img
              src="/img/home/picto-logo.png"
              alt="picto-logo"
              className="w-[40%] mx-auto"
              loading="lazy"
            />
          </Link>

          <div className="flex gap-[6vw] justify-center">
            {[
              ["facebook", "https://www.facebook.com/pictoreal/"],
              ["instagram", "https://www.instagram.com/pictoreal/"],
              ["Twitter", "https://twitter.com/pictoreal_pict"],
              ["Linkedin", "https://in.linkedin.com/company/pictoreal"],
            ].map(([icon, link]) => (
              <Link key={icon} href={link} target="_blank">
                <img
                  src={`/img/home/${icon}.svg`}
                  alt={icon}
                  className="w-[7vw]"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Venue */}
        <div className="mt-[6vh] text-center">
          <p className="text-white text-[6vw] sub-heading-font mb-[2vh]">
            Venue
          </p>

          <iframe
            className="w-[75vw] h-[22vh] ml-[7vw]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=PICT%20Pune&output=embed"
          >
            
          </iframe>

        </div>

        {/* Contact */}
        <div className="mt-[5vh] text-center">
          <p className="text-white text-[6vw] sub-heading-font mb-[2vh]">
            Contact Us
          </p>

          {[
            ["Anushka", "+91 9172284641"],
            ["Sanskar", "+91 7875390131"],
            ["Bhagyashree", "+91 9145799399"]

          ].map(([name, number]) => (
            <p key={name} className="text-white text-[4.5vw] mb-[1.2vh]">
              {name} : {number}
            </p>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center mt-[5vh] -mb-[3vh]">
          <p className="text-white text-[3.5vw]">
            © 2025–2026 All rights reserved | Created with
            <span className="text-red-500"> ❤ </span>
            by{" "}
            <Link
              href="/developers"
              className="text-white underline underline-offset-2"
            >
              PICTOREAL Tech Team
            </Link>
          </p>
        </div>
      </div>

      {/* ================= DESKTOP FOOTER ================= */}
      <div className="hidden md:block bg-[url('/img/home/footer.svg')] bg-contain px-[6vw] pt-[10vh] pb-[5vh]">

        <div className="flex justify-between items-start mt-[6vh]">

          {/* Logo + Socials */}
          <div className="w-[20%] flex flex-col items-start gap-[2vh]">
            <Link href="https://www.pictoreal.in/" target="_blank">
              <img
                src="/img/home/picto-logo.png"
                alt="picto-logo"
                className="w-[60%]"
                loading="lazy"
              />
            </Link>

            {/* <div className="flex gap-[1.8vw]">
              {["facebook", "instagram", "Twitter", "Linkedin"].map((icon) => (
                <img
                  key={icon}
                  src={`/img/home/${icon}.svg`}
                  alt={icon}
                  className="w-[1.7vw] cursor-pointer"
                  loading="lazy"
                />
              ))}
            </div> */}
            <div className="flex gap-[1.8vw]">
              {[
                ["facebook", "https://www.facebook.com/pictoreal/"],
                ["instagram", "https://www.instagram.com/pictoreal/"],
                ["Twitter", "https://twitter.com/pictoreal_pict"],
                ["Linkedin", "https://in.linkedin.com/company/pictoreal"],
              ].map(([icon, link]) => (
                <Link key={icon} href={link} target="_blank">
                  <img
                    src={`/img/home/${icon}.svg`}
                    alt={icon}
                    className="w-[1.7vw] cursor-pointer hover:scale-110 transition-transform"
                    loading="lazy"
                  />
                </Link>
              ))}
            </div>

          </div>

          {/* Venue */}
          <div className="w-[25%] text-center">
            <p className="text-white text-[1.7vw] sub-heading-font mb-[2vh]">
              Venue
            </p>

            <iframe
              className="w-[23vw] h-[24vh] "
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.576189448641!2d73.84606999678954!3d18.457542099999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eac85230ba47%3A0x871eddd0a8a0a108!2sSCTR&#39;S%20Pune%20Institute%20of%20Computer%20Technology!5e0!3m2!1sen!2sin!4v1706351618141!5m2!1sen!2sin"
            ></iframe>
          </div>

          {/* Contact */}
          <div className="w-[25%] text-center">
            <p className="text-white text-[2vw] sub-heading-font mb-[2vh]">
              Contact Us
            </p>

            {[
              ["Anushka", "+91 9172284641"],
              ["Sanskar", "+91 7875390131"],
              ["Bhagyashree", "+91 9145799399"]

            ].map(([name, number]) => (
              <p key={name} className="text-white text-[1.3vw] mb-[1vh]">
                {name} : {number}
              </p>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-[12vh] -mb-[2vh]">
          <p className="text-white text-[1vw]">
            © 2025–2026 All rights reserved | Created with
            <span className="text-red-500"> ❤ </span>
            by{" "}
            <Link
              href="/developers"
              className="text-white underline underline-offset-2"
            >
              PICTOREAL Tech Team
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
