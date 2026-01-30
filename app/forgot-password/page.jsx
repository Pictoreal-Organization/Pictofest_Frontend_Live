// "use client";

// import Link from "next/link";
// import axios from "axios";
// import { Lobster } from "next/font/google";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { baseURL } from "@/app/api";
// import isAuth from "@/app/components/isAuth";
// import Turnstile from "react-turnstile";
// import { FiLoader } from "react-icons/fi";

// const inter = Lobster({ subsets: ["latin"], weight: "400" });

// const ForgotPassword = () => {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [captchaToken, setCaptchaToken] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();

//     if (!validateEmail(email)) {
//       toast.error("Please enter a valid email.");
//       return;
//     }

//     if (phone.length < 10) {
//       toast.error("Phone No. must be 10 digits at least.");
//       return;
//     }

//     if (!captchaToken) {
//       toast.error("Please complete the CAPTCHA verification.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await axios.post(`${baseURL}/forgotPassword/`, {
//         email: email,
//         mobile_number: phone,
//         turnstileToken: captchaToken,
//       });

//       toast.success(response.data.message);
//       router.push("/login");
//     } catch (err) {
//       console.log(err);
//       toast.error(err.response?.data?.message || "An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className={inter.className}>
//       <div className="flex justify-center items-center h-dvh bg-[url('/img/home/login_bg.jpg')] bg-cover bg-bottom-right md:bg-bottom">
//         <div className="md:p-6 sm:w-auto sm:p-4">
//           <div className="md:p-6 rounded-lg drop-shadow-xs w-72 sm:w-auto sm:h-auto sm:p-10 body-font">
//             <div className="flex flex-col justify-center text-[#006E61] items-center font-semibold mb-5">
//               <h1 className="text-2xl pb-2 border-b border-black font-bold sm:text-5xl heading-font">
//                 Forgot Password!
//               </h1>
//             </div>

//             <input
//               className="w-full outline-hidden h-10 sm:h-12 p-3 mb-4 bg-[#FFF6D2] rounded-md ring-2 ring-black text-[#006E61] placeholder-[#006E61]"
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               className="w-full outline-hidden h-10 sm:h-12 p-3 mb-4 bg-[#FFF6D2] rounded-md ring-2 ring-black text-[#006E61] placeholder-[#006E61]"
//               type="text"
//               placeholder="Phone No."
//               value={phone}
//               maxLength={10}
//               onChange={(e) => setPhone(e.target.value)}
//             />
            
//             <div className="flex justify-center items-center mb-4">
//               <Turnstile
//                 sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
//                 onVerify={(token) => setCaptchaToken(token)}
//               />
//             </div>

//             <div className="p-2 flex justify-center items-center">
//               <button
//                 onClick={handleForgotPassword}
//                 className="w-40 outline-hidden sm:w-40 font-semibold ring-2 ring-black text-[#006E61] p-2 mb-3 bg-[#FFF6D2] rounded-md hover:bg-[#e8d396] disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={isLoading || !captchaToken}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center">
//                     <FiLoader className="animate-spin mr-2" />
//                     Processing...
//                   </div>
//                 ) : (
//                   "Submit"
//                 )}
//               </button>
//             </div>
//             <div className="text-[#006E61] text-xs sm:text-sm space-x-2 flex justify-center description-font">
//               <p>Already have an account? </p>
//               <Link href="/login" className="underline outline-hidden">
//                 Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default isAuth(ForgotPassword);

"use client";

import Link from "next/link";
import axios from "axios";
import { Lobster } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { baseURL } from "@/app/api";
import isAuth from "@/app/components/isAuth";
import Turnstile from "react-turnstile";
import { FiLoader } from "react-icons/fi";

const inter = Lobster({ subsets: ["latin"], weight: "400" });

const ForgotPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email.");
    }

    if (phone.length < 10) {
      return toast.error("Phone No. must be 10 digits at least.");
    }

    if (!captchaToken) {
      return toast.error("Please complete the CAPTCHA verification.");
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${baseURL}/forgotPassword/`, {
        email: email,
        mobile_number: phone,
        turnstileToken: captchaToken,
      });

      toast.success(response.data.message);
      router.push("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reusable styles to match Register page
  const inputStyle = "w-full h-11 px-4 bg-[#E77C40] rounded-xl border-2 border-black text-white placeholder:text-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm";
  const buttonStyle = "w-full h-12 bg-[#E77C40] text-white text-xl font-bold rounded-xl border-2 border-black hover:bg-[#FF8C50] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_3px_0_#000] active:shadow-none active:translate-y-1 flex items-center justify-center gap-2";

  return (
    <main className={`${inter.className} min-h-screen w-full relative`}>
      
      {/* ============================================================
          LAYER 1: FIXED BACKGROUND (Same as Register)
         ============================================================ */}
      <div className="fixed inset-0 z-0 w-full h-screen pointer-events-none bg-[#2A0F55]">
        {/* Main Background Image */}
        <div className="absolute inset-0 bg-[url('/img/home/bg_img.png')] bg-cover bg-[position:left_bottom] md:bg-center"></div>
        {/* Stars */}
        <img src="/img/home/Stars_bg.svg" alt="Stars" className="absolute inset-0 w-full h-full object-cover opacity-80" />
        {/* Lanterns */}
        <img src="/img/home/Group-350.svg" alt="Lantern" className="absolute top-0 left-[5%] w-[100px] z-10 hidden md:block" />
        <img src="/img/home/Group-350.svg" alt="Lantern" className="absolute top-0 right-[5%] w-[100px] scale-x-[-1] z-10 hidden md:block" />
        {/* MUSICIANS - Fixed at Bottom */}
        <img src="/img/home/Group 512.svg" alt="Skeleton Left" className="absolute bottom-0 left-[-5%] w-[45%] h-[180px] object-contain z-20 hidden md:block" />
        <img src="/img/home/Group 513.svg" alt="Skeleton Right" className="absolute bottom-0 right-[-5%] w-[45%] h-[180px] object-contain z-20 hidden md:block" />
        
      </div>

      {/* ============================================================
          LAYER 2: SCROLLABLE CONTENT
         ============================================================ */}
      <div className="relative z-10 w-full flex flex-col items-center pt-[100px] h-dvh overflow-hidden md:h-auto md:overflow-visible md:pb-[100px]">
          
          {/* Logo */}
          <img
            src="/img/common/final_logo.png"
            alt="Pictofest Logo"
            className="w-[200px] md:w-[260px] object-contain mb-8 drop-shadow-xl"
          />

          {/* Form Card */}
          <div className="w-[90%] max-w-[500px] relative">
            
            <div
              className="rounded-[30px] p-8 md:p-12 relative shadow-2xl border-[5px] border-[#E77C40]"
              style={{ 
                  backgroundImage: "url('/img/reg_login/reg_login_card_bg.svg')",
                  backgroundRepeat: 'repeat', 
                  backgroundSize: '300px auto',
                  backgroundColor: '#2e1065' 
              }}
            >
              
              {/* Heading */}
              <div className="flex flex-col justify-center items-center mb-8">
                <h1 className="text-3xl md:text-4xl text-white heading-font text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight">
                  Forgot Password
                </h1>
              </div>

              {/* Inputs */}
              <div className="body-font flex flex-col gap-4">
                
                <input
                  className={inputStyle}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <input
                  className={inputStyle}
                  type="text"
                  placeholder="Phone No."
                  value={phone}
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <div className="flex justify-center items-center py-2 scale-90 origin-center">
                  <Turnstile
                    sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
                    onVerify={(token) => setCaptchaToken(token)}
                  />
                </div>

                <div className="mt-2">
                  <button
                    onClick={handleForgotPassword}
                    className={buttonStyle}
                    disabled={isLoading || !captchaToken}
                  >
                    {isLoading ? (
                      <>
                        <FiLoader className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>

                <div className="text-center text-white description-font mt-4 text-sm">
                  <span>Already have an account? </span>
                  <Link href="/login" className="font-bold description-font underline ml-1 hover:text-yellow-300 transition-colors">
                    Login
                  </Link>
                </div>

              </div>
            </div>
          </div>
      </div>
    </main>
  );
};

export default isAuth(ForgotPassword);