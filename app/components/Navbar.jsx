// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { useAuth } from "../context/Auth";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "sonner";
// import localFont from "next/font/local";
// import { Menu, X } from "lucide-react";

// // --- Font Configuration ---
// const rye = localFont({ src: "../../public/fonts/Rye-Regular.ttf" });
// const ambystoma = localFont({
//   src: "../../public/fonts/Ambystoma_Mexicanum.otf",
// });
// const anaheim = localFont({
//   src: "../../public/fonts/Anaheim-VariableFont_wght.ttf",
// });

// // ==========================================
// // 1. Common NavLink Component
// // ==========================================
// const NavLink = ({ href, text, onClick, className = "" }) => {
//   const pathname = usePathname();
//   const isActive = pathname === href;

//   return (
//     <Link href={href} onClick={onClick} className="relative group w-auto">
//       <div
//         className={`
//           ${rye.className}
//           relative 
//           lg:h-[36px] rounded-full border-[2px] transition-all duration-300 ease-in-out
//           flex items-center justify-center cursor-pointer whitespace-nowrap
//           uppercase tracking-widest
          
//           lg:px-4 lg:text-sm
//           xl:px-8 xl:text-lg

//           ${
//             isActive
//               ? "bg-[#FFA53A] border-[#FFA53A] text-[#070044]"
//               : "bg-transparent border-[#FFA53A] text-[#FFA53A] hover:bg-[#FFA53A] hover:bg-opacity-20 hover:text-[#070044]"
//           }
//           ${className}
//         `}
//       >
//         {text}
//       </div>
//     </Link>
//   );
// };

// // ==========================================
// // 2. Common Modal Component
// // ==========================================
// const CommonModal = ({ isOpen, children }) => {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="fixed top-0 left-0 w-full h-screen z-40 overflow-hidden 
//                      bg-black/40 backdrop-blur-sm 
//                      lg:static lg:h-auto lg:bg-transparent lg:backdrop-blur-none lg:overflow-visible"
//         >
//           <div className="p-6 flex flex-col justify-start pt-28 min-h-full lg:min-h-0 lg:pt-0">
//             {children}
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// // ==========================================
// // 3. Main Navbar Component
// // ==========================================
// const Navbar = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const SHOW_SPONSORS = false; // or true

//   const { authState, isUserAuthenticated, setUserAuthInfo } = useAuth();
//   const pathname = usePathname();

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close modal on navigation
//   useEffect(() => {
//     setIsModalOpen(false);
//   }, [pathname]);

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   const handleNavLinkClick = () => {
//     setIsModalOpen(false);
//   };

//   const handleLogout = async () => {
//     try {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       // ✅ FIX: user should be null
//       setUserAuthInfo({ token: "", user: null });

//       toast.success("Logged out successfully");
//       setIsModalOpen(false);
//     } catch (err) {
//       console.log(err);
//       toast.error("Logout failed");
//     }
//   };

//   const renderHamburgerIcon = () =>
//     isModalOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />;

//   // --- Auth Button Logic ---
//   const renderAuthButton = () => {
//     return isUserAuthenticated() ? (
//       <Link href="/profile">
//         <div
//           className="relative lg:py-0 lg:h-[36px] rounded-full border-[2px] border-[#FFA53A] bg-[#FFA53A] text-[#070044] flex items-center justify-center cursor-pointer transition-all hover:bg-white hover:border-white 
//           lg:px-4 xl:px-8 py-2"
//         >
//           <span
//             className=" sub-heading-font tracking-widest uppercase truncate max-w-[150px]
//               lg:text-sm xl:text-lg"
//           >
//             {authState?.user?.first_name || "Profile"}
//           </span>
//         </div>
//       </Link>
//     ) : (
//       <NavLink href="/login" text="Login" />
//     );
//   };

//   // --- Desktop Dropdown Links ---
//   const desktopHamburgerLinks = (
//     <div className="flex flex-col justify-center items-center gap-4">
//       {/* <NavLink href="/profile" text="My Profile" onClick={handleNavLinkClick} />
//       <div className="w-full h-[1px] bg-[#FFA53A] opacity-30"></div> */}
//       <NavLink
//         href="/"
//         text="Logout"
//         onClick={() => {
//           handleLogout();
//           handleNavLinkClick();
//         }}
//       />
//     </div>
//   );

//   // --- Mobile Menu Links ---
//   const mobileNavLinks = (
//     <div className="flex flex-col w-full justify-center items-end pr-0.3 gap-4">
//       <NavLink
//         href="/"
//         text="Home"
//         className="w-40"
//         onClick={handleNavLinkClick}
//       />
//       <NavLink
//         href="/picsoreel"
//         text="Pics-o-Reel"
//         className="w-40"
//         onClick={handleNavLinkClick}
//       />
//       <NavLink
//         href="/workshops"
//         text="Workshops"
//         className="w-40"
//         onClick={handleNavLinkClick}
//       />
//       <NavLink
//         href="/events"
//         text="Events"
//         className="w-40"
//         onClick={handleNavLinkClick}
//       />
//       {SHOW_SPONSORS && (
//         <NavLink
//           href="/sponsors"
//           text="Sponsors"
//           className="w-40"
//           onClick={handleNavLinkClick}
//         />
//       )}
//       <NavLink
//         href="/cart"
//         text="Cart"
//         className="w-40"
//         onClick={handleNavLinkClick}
//       />

//       {isUserAuthenticated() ? (
//         <>
//           <div className="w-1/2 h-[1px] bg-[#FFA53A] opacity-30 my-2"></div>
//           <NavLink
//             href="/profile"
//             text="Profile"
//             className="w-40"
//             onClick={handleNavLinkClick}
//           />
//           <NavLink
//             href="/"
//             text="Logout"
//             className="w-40"
//             onClick={() => {
//               handleLogout();
//               handleNavLinkClick();
//             }}
//           />
//         </>
//       ) : (
//         <NavLink
//           href="/login"
//           text="Login"
//           className="w-40"
//           onClick={handleNavLinkClick}
//         />
//       )}
//     </div>
//   );

//   return (
//     <div
//       className={`fixed w-full top-0 z-50 transition-all duration-300 
//         ${
//           isModalOpen
//             ? "bg-transparent"
//             : isScrolled
//             ? "bg-black/30 backdrop-blur-md shadow-lg shadow-[#FFA53A]/10"
//             : "bg-transparent"
//         }
//       `}
//     >
//       {/* Desktop View */}
//       <div className="hidden lg:flex w-full px-6 py-6 items-center relative">
//         <div className="flex-1" />

//         <div className="flex justify-center items-center lg:gap-2 xl:gap-[18px]">
//           <NavLink href="/" text="Home" />
//           <NavLink href="/picsoreel" text="Pics-o-Reel" />
//           <NavLink href="/workshops" text="Workshops" />
//           <NavLink href="/events" text="Events" />
//           {SHOW_SPONSORS && <NavLink href="/sponsors" text="Sponsors" />}
//           <NavLink href="/cart" text="Cart" />
//           {renderAuthButton()}
//         </div>

//         <div className="flex-1 flex justify-end">
//           {isUserAuthenticated() && (
//             <button
//               onClick={toggleModal}
//               className="text-[#FFA53A] text-2xl focus:outline-none hover:scale-110 transition-transform"
//             >
//               {renderHamburgerIcon()}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Mobile View */}
//       <div className="relative z-50 lg:hidden flex justify-between items-center py-4 px-6 bg-transparent">
//         {/* <Link href="/">
//           <span
//             className={`${ambystoma.className} text-[#FFA53A] text-xl font-bold tracking-widest p-2`}
//           >
//             PICTOFEST
//           </span>
//         </Link> */}
//         <Link href="/" className="flex items-center">
//           <Image
//                       src="/img/common/final_logo.png"
//                       alt="PICTOFEST Logo"
//             width={120}
//             height={40}
//             className="object-contain"
//             priority
//           />
//         </Link>
        
//         <button
//           onClick={toggleModal}
//           className="text-[#FFA53A] text-2xl focus:outline-none w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#FFA53A] bg-transparent"
//         >
//           {renderHamburgerIcon()}
//         </button>
//       </div>

//       {/* Modal */}
//       <CommonModal isOpen={isModalOpen}>
//         <div className="hidden lg:flex justify-end">
//           {isUserAuthenticated() ? desktopHamburgerLinks : null}
//         </div>
//         <div className="lg:hidden w-full">{mobileNavLinks}</div>
//       </CommonModal>
//     </div>
//   );
// };

// export default Navbar;




"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/Auth";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import localFont from "next/font/local";
import { Menu, X } from "lucide-react";

// --- Font Configuration ---
const rye = localFont({ src: "../../public/fonts/Rye-Regular.ttf" });
const ambystoma = localFont({
  src: "../../public/fonts/Ambystoma_Mexicanum.otf",
});
const anaheim = localFont({
  src: "../../public/fonts/Anaheim-VariableFont_wght.ttf",
});

// ==========================================
// 1. Common NavLink Component
// ==========================================
const NavLink = ({ href, text, onClick, className = "" }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} onClick={onClick} className="relative group w-auto">
      <div
        className={`
          ${rye.className}
          relative 
          lg:h-[36px] rounded-full border-[2px] transition-all duration-300 ease-in-out
          flex items-center justify-center cursor-pointer whitespace-nowrap
          uppercase tracking-widest
          
          lg:px-4 lg:text-sm
          xl:px-8 xl:text-lg

          ${
            isActive
              ? "bg-[#FFA53A] border-[#FFA53A] text-[#070044]"
              : "bg-transparent border-[#FFA53A] text-[#FFA53A] hover:bg-[#FFA53A] hover:bg-opacity-20 hover:text-[#070044]"
          }
          ${className}
        `}
      >
        {text}
      </div>
    </Link>
  );
};

// ==========================================
// 3. Main Navbar Component
// ==========================================
const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const SHOW_SPONSORS = false;

  const { authState, isUserAuthenticated, setUserAuthInfo } = useAuth();
  const pathname = usePathname();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close modal on navigation
  useEffect(() => {
    setIsModalOpen(false);
  }, [pathname]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleNavLinkClick = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUserAuthInfo({ token: "", user: null });
      toast.success("Logged out successfully");
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Logout failed");
    }
  };

  const renderHamburgerIcon = () =>
    isModalOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />;

  // --- Auth Button Logic ---
  const renderAuthButton = () => {
    return isUserAuthenticated() ? (
      <Link href="/profile">
        <div
          className="relative lg:py-0 lg:h-[36px] rounded-full border-[2px] border-[#FFA53A] bg-[#FFA53A] text-[#070044] flex items-center justify-center cursor-pointer transition-all hover:bg-white hover:border-white 
          lg:px-4 xl:px-8 py-2"
        >
          <span
            className="sub-heading-font tracking-widest uppercase truncate max-w-[150px]
              lg:text-sm xl:text-lg"
          >
            {authState?.user?.first_name || "Profile"}
          </span>
        </div>
      </Link>
    ) : (
      <NavLink href="/login" text="Login" />
    );
  };

  // --- Desktop Dropdown Links ---
  const desktopHamburgerLinks = (
    <div className="flex flex-col justify-center items-center gap-4 rounded-lg ">
      <NavLink
        href="/"
        text="Logout"
        onClick={() => {
          handleLogout();
          handleNavLinkClick();
        }}
      />
    </div>
  );

  // --- Mobile Menu Links ---
  const mobileNavLinks = (
    <div className="flex flex-col w-full justify-center items-end gap-4 bg-transparent rounded-lg">
      <NavLink
        href="/"
        text="Home"
        className="w-40"
        onClick={handleNavLinkClick}
      />
      <NavLink
        href="/picsoreel"
        text="Pics-o-Reel"
        className="w-40"
        onClick={handleNavLinkClick}
      />
      <NavLink
        href="/workshops"
        text="Workshops"
        className="w-40"
        onClick={handleNavLinkClick}
      />
      <NavLink
        href="/events"
        text="Events"
        className="w-40"
        onClick={handleNavLinkClick}
      />
      {SHOW_SPONSORS && (
        <NavLink
          href="/sponsors"
          text="Sponsors"
          className="w-40"
          onClick={handleNavLinkClick}
        />
      )}
      <NavLink
        href="/cart"
        text="Cart"
        className="w-40"
        onClick={handleNavLinkClick}
      />

      {isUserAuthenticated() ? (
        <>
<div className="w-full h-[1px] bg-[#FFA53A] opacity-30 my-2 self-center"></div>
          <NavLink
            href="/profile"
            text="Profile"
            className="w-40"
            onClick={handleNavLinkClick}
          />
          <NavLink
            href="/"
            text="Logout"
            className="w-40"
            onClick={() => {
              handleLogout();
              handleNavLinkClick();
            }}
          />
        </>
      ) : (
        <NavLink
          href="/login"
          text="Login"
          className="w-40"
          onClick={handleNavLinkClick}
        />
      )}
    </div>
  );

  return (
    <>
      <div
        className={`fixed w-full top-0 z-50 transition-all duration-300 
          ${
            isModalOpen
              ? "bg-transparent"
              : isScrolled
              ? "bg-black/30 backdrop-blur-md shadow-lg shadow-[#FFA53A]/10"
              : "bg-transparent"
          }
        `}
      >
        {/* Desktop View */}
        <div className="hidden lg:flex w-full px-6 py-6 items-center relative">
          <div className="flex-1" />

          <div className="flex justify-center items-center lg:gap-2 xl:gap-[18px]">
            <NavLink href="/" text="Home" />
            <NavLink href="/picsoreel" text="Pics-o-Reel" />
            <NavLink href="/workshops" text="Workshops" />
            <NavLink href="/events" text="Events" />
            {SHOW_SPONSORS && <NavLink href="/sponsors" text="Sponsors" />}
            <NavLink href="/cart" text="Cart" />
            {renderAuthButton()}
          </div>

          <div className="flex-1 flex justify-end">
            {isUserAuthenticated() && (
              <button
                onClick={toggleModal}
                className="text-[#FFA53A] text-2xl focus:outline-none hover:scale-110 transition-transform"
              >
                {renderHamburgerIcon()}
              </button>
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div className="relative z-50 lg:hidden flex justify-between items-center py-4 px-6 bg-transparent">
          <Link href="/" className="flex items-center">
            <Image
              src="/img/common/final_logo.png"
              alt="PICTOFEST Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
          
          <button
            onClick={toggleModal}
            className="text-[#FFA53A] text-2xl focus:outline-none w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#FFA53A] bg-transparent"
          >
            {renderHamburgerIcon()}
          </button>
        </div>

        {/* Desktop Dropdown Menu */}
        <AnimatePresence>
          {isModalOpen && isUserAuthenticated() && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block absolute top-full right-6 mt-2"
            >
              {desktopHamburgerLinks}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Modal - OUTSIDE the navbar container */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsModalOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed top-24 right-6 z-50 lg:hidden"
            >
              {mobileNavLinks}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;