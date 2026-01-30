// "use client";

// import axios from "axios";
// import Link from "next/link";
// import { toast } from "sonner";
// import { Lobster } from "next/font/google";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
// import { useAuth } from "@/app/context/Auth";
// import { baseURL } from "@/app/api";
// import isAuth from "@/app/components/isAuth";
// import Turnstile from "react-turnstile";
// import { FcGoogle } from "react-icons/fc";
// import { auth, googleProvider, signInWithPopup } from "@/app/config/firebase";

// const inter = Lobster({ subsets: ["latin"], weight: "400" });

// const Login = () => {
//   const router = useRouter();
//   const { setUserAuthInfo } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showEye, setShowEye] = useState(false);
//   const [captchaToken, setCaptchaToken] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false);

//   const eyeHandler = () => {
//     setShowEye(!showEye);
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleGoogleLogin = async () => {
//     setIsGoogleLoading(true);
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       // Send user details to the backend for verification & token creation
//       const getRandomMobileNumber = () => {
//         return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Generates a 10-digit number
//       };

//       const response = await axios.post(`${baseURL}/user/google-login`, {
//         email: user.email,
//         firstName: user.displayName?.split(" ")[0] || "", // First name
//         lastName: user.displayName?.split(" ").slice(1).join(" ") || "", // Last name
//         fullName: user.displayName || "",
//         googleUID: user.uid,
//         providerId: user.providerData[0]?.providerId || "google.com",
//         phoneNumber: user.phoneNumber || getRandomMobileNumber(), // Assigns a random 10-digit number if missing
//       });

//       setUserAuthInfo(response.data.data);
//       toast.success(response.data.message);
//       router.push("/");
//       window.location.reload();
//     } catch (err) {
//       console.log(err);
//       toast.error(err.response?.data?.message || "Google login failed.");
//     } finally {
//       setIsGoogleLoading(false);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!validateEmail(email)) {
//       toast.error("Please enter a valid email.");
//       return;
//     }

//     if (password.length < 8) {
//       toast.error("Password must be at least 8 characters.");
//       return;
//     }

//     if (!captchaToken) {
//       toast.error("Please complete the CAPTCHA verification.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await axios.post(`${baseURL}/user/login`, {
//         email,
//         password,
//         turnstileToken: captchaToken,
//       });

//       setUserAuthInfo(response.data.data);
//       toast.success(response.data.message);
//       router.push("/");
//       window.location.reload();
//     } catch (err) {
//       console.log(err);
//       toast.error(
//         err.response?.data?.message || "Login failed. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Only show CAPTCHA when both email and password are filled
//   const shouldShowCaptcha = email.length > 0 && password.length > 0;

//   return (
//   <main className={inter.className}>
//     <div
//       className="
//         relative
//         flex
//         justify-center
//         items-center
//         min-h-screen
//         bg-[url('/img/home/bg_img.png')]
//         bg-cover
//         bg-[position:left_bottom]
//         md:bg-center
//         overflow-hidden
//       "
//     >
//       {/* ⭐ Stars Background */}
//       <img
//         src="/img/home/Stars_bg.svg"
//         alt="Stars Background"
//         className="
//           absolute
//           inset-0
//           w-full
//           h-full
//           object-cover
//           z-[1]
//           pointer-events-none
//         "
//       />

//       {/* 🎭 Pictofest Logo */}
//       <img
//         src="/img/home/pictofestLogoNew.png"
//         alt="Pictofest Logo"
//         className="
//           absolute
//           md:top-[80px]
//           top-[15%]
//           left-1/2
//           -translate-x-1/2
//           w-[200px]
//           md:w-[230px]
//           object-contain
//           z-30
//         "
//       />

//       {/* 🟣 Purple Block */}
//       <img
//         src="/img/home/Group-234.png"
//         alt="Purple Block"
//         className="
//           absolute
//           bottom-[19%]   
//           md:bottom-[110px]
//           left-1/2
//           -translate-x-1/2
//           md:w-[90%] 
//           w-[115%]
//           h-[60%]
//           max-w-[430px]
//           object-contain
//           z-[5]
//         "
//       />

//       {/* 🧾 LOGIN FORM */}
//       <div
//         className="
//           absolute
//           top-[30%]
//           md: top-[25%] 
//           left-1/2
//           -translate-x-1/2
//           w-[90%]          
//           max-w-[340px]
//           z-20
//         "
//       >        
//         <div className="p-1 md:p-4"> 
//           <div className="flex flex-col items-center text-white  mt-10 md:mt-0"> 
//             <h1 className="text-xl md:text-3xl sub-heading-font tracking-tight">
//               Welcome Back!
//             </h1>
//             <p className="text-[15px] md:text-sm opacity-90 body-font">
//               Login to your account
//             </p>
//           </div>

//           <div className="relative space-y-2 md:space-y-3 flex flex-col items-center w-full"> 
  
//   {/* Email Input */}
//   <input
//     className="
//       w-[85%]           /* Defines the width on mobile */
//       mx-auto           /* Centers the box horizontally */
//       md:w-full         /* Returns to full width on desktop */
//       h-9 md:h-10 
//       px-4 
//       bg-[#E77C40] 
//       rounded-xl
//       border-2 
//       border-black 
//       text-white 
//       placeholder:text-white/80 
//       focus:outline-none 
//       text-xs md:text-sm 
//       body-font"
//     type="email"
//     placeholder="Email"
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//   />

//   {/* Password Wrapper - Centered to match the Email input */}
//   <div className="relative w-[85%] mx-auto md:w-full"> 
//     <input
//       className="
//         w-full          /* Fills exactly the centered 85% width */
//         h-9 md:h-10 
//         px-4 
//         bg-[#E77C40] 
//         rounded-xl 
//         border-2 
//         border-black 
//         text-white 
//         placeholder:text-white/80 
//         focus:outline-none 
//         text-xs md:text-sm 
//         body-font"
//       type={showEye ? "text" : "password"}
//       placeholder="Password"
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//     />
//     {/* Eye Icon - Now positioned inside the centered wrapper */}
//     <button
//       className="absolute right-3 top-1/2 -translate-y-1/2 text-white scale-75"
//       onClick={eyeHandler}
//     >
//       {showEye ? <FiEye /> : <FiEyeOff />}
//     </button>
//   </div>
// </div>
//           <div className="flex justify-between items-center text-[15px] md:text-xs text-white mt-3 mb-1 body-font px-5 md:px-0">
//             <label className="flex items-center gap-1 cursor-pointer body-font">
//               <input type="checkbox" className="w-3 h-3 right-3" />
//               Remember me
//             </label>
//             <Link href="/forgot-password">Forgot Password?</Link>
//           </div>

//           <div className="flex flex-col items-center gap-2">
//             <button
//               onClick={handleLogin}
//               className=" px-6               
//                           md:px-8           
//                           py-1 
//                           md:py-1            
//                           bg-[#E77C40] 
//                           text-white 
//                           text-sm            
//                           md:text-xl          
//                           rounded-xl 
//                           border-2 
//                           px-8
//                           border-black
//                           sub-heading-font"
//             >
//               Log in
//             </button>
//             <div className="flex items-center justify-center gap-15 mt-0 md:mt-1 body-font">
//             <span className="text-[15px] md:text-xs text-white">
//             Don’t have an account?
//             </span>
//             <Link 
//               href="/register" 
//               className="text-[15px] md:text-xs text-white underline font-bold"
//             >
//             Register here
//             </Link>
//         </div>  
//           </div>
//         </div>
//       </div>
//       {/* 🏮 Lanterns */}
//       <img
//         src="/img/home/Group-350.svg"
//         alt="Left Lantern"
//         className="absolute top-0 left-[140px] w-[130px] z-10 hidden md:block"
//       />
//       <img
//         src="/img/home/Group-350.svg"
//         alt="Right Lantern"
//         className="absolute top-0 right-[140px] w-[130px] scale-x-[-1] z-10 hidden md:block"
//       />

//       {/* 💀 Skeletons */}
      
//       {/* Mobile Skeleton (Group 514) */}
//       <img
//         src="/img/home/Group 514.svg"
//         alt="Skeleton Mobile"
//         className="
//           absolute
//           bottom-[-10px]   /* Positioned slightly off-screen to look grounded */
//           left-1/2
//           -translate-x-1/2
//           w-[100%]         
//           max-w-[100%]
//           h-auto
//           object-contain
//           z-10
//           block
//           md:hidden
//         "
//       />

//       {/* Desktop Skeletons */}
//       <img
//         src="/img/home/Group 512.svg"
//         alt="Skeletons Left"
//         className="absolute bottom-0 left-[-5%] w-[45%] h-[180px] object-contain z-20 hidden md:block"
//       />
//       <img
//         src="/img/home/Group 513.svg"
//         alt="Skeletons Right"
//         className="absolute bottom-0 right-[-5%] w-[45%] h-[180px] object-contain z-20 hidden md:block"
//       />
//     </div>
//   </main>
//   );
// };
// export default isAuth(Login);


"use client";

import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { Lobster } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { useAuth } from "@/app/context/Auth";
import { baseURL } from "@/app/api";
import isAuth from "@/app/components/isAuth";
import Turnstile from "react-turnstile";

const inter = Lobster({ subsets: ["latin"], weight: "400" });

const Login = () => {
  const router = useRouter();
  const { setUserAuthInfo } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEye, setShowEye] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const eyeHandler = () => setShowEye(!showEye);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return toast.error("Please enter a valid email.");
    if (!password) return toast.error("Please enter your password.");
    if (!captchaToken) return toast.error("Please complete the CAPTCHA.");

    setIsLoading(true);

  
    try {
      const response = await axios.post(`${baseURL}/user/login`, {
        email,
        password,
        turnstileToken: captchaToken,
      });

      const { token, user } = response.data.data;

      // persist
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🔥 IMPORTANT: update context immediately
      setUserAuthInfo({ token, user });

      toast.success(response.data.message);
      router.push("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to login.");
    } finally {
      setIsLoading(false);
    }
    
  };

  // Reusable styles to match Register/Forgot Password
  const inputStyle = "w-full h-11 px-4 bg-[#E77C40] rounded-xl border-2 border-black text-white placeholder:text-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm";
  const buttonStyle = "w-full h-12 bg-[#E77C40] text-white text-xl font-bold rounded-xl border-2 border-black hover:bg-[#FF8C50] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_3px_0_#000] active:shadow-none active:translate-y-1 flex items-center justify-center gap-2";

  return (
    <main className={`${inter.className} min-h-screen w-full relative`}>
      
      {/* ============================================================
          LAYER 1: FIXED BACKGROUND (Identical to Register)
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
        <div className="relative z-10 w-full flex flex-col items-center pt-[100px] min-h-dvh overflow-y-auto md:h-auto md:overflow-visible md:pb-[100px] pb-16">

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
              <div className="flex flex-col items-center mb-8">
                <h1 className="text-4xl md:text-5xl heading-font text-white text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Welcome Back
                </h1>
              </div>

              {/* Inputs */}
              <div className="body-font flex flex-col gap-5">
                
                <input 
                  className={inputStyle} 
                  type="email" 
                  placeholder="Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />

                <div className="relative">
                  <input 
                    className={inputStyle} 
                    type={showEye ? "text" : "password"} 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200" 
                    onClick={eyeHandler}
                    type="button"
                  >
                    {showEye ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                  </button>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end -mt-2">
                  <Link 
                    href="/forgot-password" 
                    className="text-white text-sm description-font hover:text-yellow-300 underline underline-offset-2 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Turnstile */}
                <div className="flex justify-center items-center py-1 scale-90 origin-center">
                  <Turnstile 
                    sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY} 
                    onVerify={(token) => setCaptchaToken(token)} 
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-2">
                  <button 
                    onClick={handleLogin} 
                    className={buttonStyle}
                    disabled={isLoading || !captchaToken}
                  >
                    {isLoading ? (
                      <>
                        <FiLoader className="animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center text-white description-font mt-4 text-sm">
                  <span>Don't have an account? </span>
                  <Link href="/register" className="font-bold description-font underline ml-1 hover:text-yellow-300 transition-colors">
                    Sign Up
                  </Link>
                </div>

              </div>
            </div>
          </div>
      </div>
    </main>
  );
};

export default isAuth(Login);