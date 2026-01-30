"use client";

import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { Lobster } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "@/app/context/Auth";
import { baseURL } from "@/app/api";
import isAuth from "@/app/components/isAuth";
import Turnstile from "react-turnstile";

const inter = Lobster({ subsets: ["latin"], weight: "400" });

const Register = () => {
  const router = useRouter();
  const { setUserAuthInfo } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [collegeName, setCollegeName] = useState("Pune Institute Of Computer Technology");
  const [collegeType, setCollegeType] = useState("PICT");
  const [showEye, setShowEye] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  const eyeHandler = () => setShowEye(!showEye);

  const handleSelectChange = (e) => {
    const college = e.target.value;
    college === "NON-PICT" ? setCollegeName("") : setCollegeName("Pune Institute Of Computer Technology");
    setCollegeType(college);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   if (!validateEmail(email)) return toast.error("Please enter a valid email.");
  //   if (phone.length < 10) return toast.error("Phone No. must be 10 digits at least.");
  //   if (password.length < 8) return toast.error("Min. Password Length: 8 characters.");
  //   if (!otp) return toast.error("Please enter the OTP.");

  //   try {
  //     const response = await axios.post(`${baseURL}/user/signup`, {
  //       first_name: firstName, last_name: lastName, email, mobile_number: phone,
  //       college_type: collegeType, college_name: collegeName, password, otp
  //     });
  //     setUserAuthInfo(response.data.data);
  //     toast.success(response.data.message);
  //     router.push("/");
  //     // window.location.reload();
  //   } catch (err) {
  //     toast.error(err.response?.data?.message || "Failed to sign up.");
  //   }
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) return toast.error("Please enter a valid email.");
    if (phone.length < 10) return toast.error("Phone No. must be 10 digits at least.");
    if (password.length < 8) return toast.error("Min. Password Length: 8 characters.");
    if (!otp) return toast.error("Please enter the OTP.");
  
    setIsOtpLoading(true);
  
    try {
      const response = await axios.post(`${baseURL}/user/signup`, {
        first_name: firstName,
        last_name: lastName,
        email,
        mobile_number: phone,
        college_type: collegeType,
        college_name: collegeName,
        password,
        otp
      });
  
      const { token, user } = response.data.data;
  
      // Save token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      // Update Auth Context immediately
      setUserAuthInfo({ token, user });
  
      toast.success(response.data.message);
  
      // Navigate to landing page
      router.push("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to sign up.");
    } finally {
      setIsOtpLoading(false);
    }
  };
  

  const sendOtp = async () => {
    if (!validateEmail(email)) return toast.error("Valid email required.");
    if (!captchaToken) return toast.error("Complete CAPTCHA first.");
    setIsOtpLoading(true);
    try {
      await axios.post(`${baseURL}/email/send-otp`, { email, turnstileToken: captchaToken });
      toast.success("OTP sent.");
      setOtpSent(true);
    } catch (err) {
      toast.error("Failed to send OTP.");
    } finally {
      setIsOtpLoading(false);
    }
  };

  // Reusable styles
  const inputStyle = "w-full h-11 px-4 bg-[#E77C40] rounded-xl border-2 border-black text-white placeholder:text-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm";
  const buttonStyle = "w-full h-12 bg-[#E77C40] text-white text-xl font-bold rounded-xl border-2 border-black hover:bg-[#FF8C50] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_3px_0_#000] active:shadow-none active:translate-y-1";

  return (
    <main className={`${inter.className} min-h-screen w-full relative`}>
      
      {/* ============================================================
          LAYER 1: FIXED BACKGROUND (Stays Still)
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
          LAYER 2: SCROLLABLE CONTENT (Moves)
         ============================================================ */}
      <div className="relative z-10 w-full flex flex-col items-center pt-[100px] pb-20 md:pb-[150px]">
          
          {/* Logo */}
          <img
            src="/img/common/final_logo.png"
            alt="Pictofest Logo"
            className="w-[200px] md:w-[260px] object-contain mb-8 drop-shadow-xl"
          />

          {/* Form Card */}
          <div className="w-[90%] max-w-[600px] relative">
            
            <div
              className="rounded-[30px] p-8 md:p-12 relative shadow-2xl border-[5px] border-[#E77C40]"
              style={{ 
                  // 1. Use the pattern image
                  backgroundImage: "url('/img/reg_login/reg_login_card_bg.svg')",
                  // 2. REPEAT it so it tiles instead of zooming
                  backgroundRepeat: 'repeat', 
                  // 3. Set a specific size for the pattern (e.g., 300px wide) so it stays constant
                  backgroundSize: '300px auto',
                  backgroundColor: '#2e1065' // Fallback color matches dark purple
              }}
            >
              
              {/* Heading */}
              <h1 className="text-4xl md:text-5xl text-white heading-font text-center mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                Create Account
              </h1>

              {/* Inputs */}
              <div className="body-font flex flex-col gap-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className={inputStyle} type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <input className={inputStyle} type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <input className={inputStyle} type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); setOtpSent(false); }} />

                {/* EXPANDING SECTION */}
                {!otpSent && validateEmail(email) && (
                  <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300 bg-black/20 p-4 rounded-xl border border-white/10">
                    <div className="scale-90 origin-center">
                      <Turnstile sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY} onVerify={(token) => setCaptchaToken(token)} />
                    </div>
                    <button className={buttonStyle} onClick={sendOtp} disabled={isOtpLoading || !captchaToken}>
                      {isOtpLoading ? "Sending..." : "Send OTP"}
                    </button>
                  </div>
                )}

                {otpSent && (
                  <input className={`${inputStyle} ring-4 ring-yellow-400`} type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className={inputStyle} type="text" placeholder="Phone No." value={phone} maxLength={10} onChange={(e) => setPhone(e.target.value)} />
                  <div className="relative">
                    <input className={inputStyle} type={showEye ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200" onClick={eyeHandler}>
                      {showEye ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <select className={`${inputStyle} appearance-none cursor-pointer`} onChange={handleSelectChange} value={collegeType}>
                        <option value="PICT" className="text-black">PICT</option>
                        <option value="NON-PICT" className="text-black">NON-PICT</option>
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white pointer-events-none text-xs">▼</span>
                  </div>
                  <input className={`${inputStyle} ${collegeType === "PICT" ? "opacity-60 cursor-not-allowed" : ""}`} type="text" placeholder="College Name" value={collegeName} disabled={collegeType === "PICT"} onChange={(e) => setCollegeName(e.target.value)} />
                </div>

                <div className="mt-4">
                  <button onClick={handleRegister} className={buttonStyle}>
                    Sign Up
                  </button>
                </div>

                <div className="text-center description-font text-white mt-2">
                  <span>Already have an account? </span>
                  <Link href="/login" className="font-bold underline ml-1 hover:text-yellow-300 transition-colors">Login</Link>
                </div>

              </div>
            </div>
          </div>
      </div>
    </main>
  );
};

export default isAuth(Register);