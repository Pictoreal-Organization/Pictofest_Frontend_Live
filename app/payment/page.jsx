// "use client";

// import { useState, useRef } from "react";
// import Image from "next/image";
// // import QRCode from "react-qr-code";
// import QRCodeStyling from "qr-code-styling";

// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import api from "@/app/api";
// import { useEffect } from "react";
// import isNotAuth from "@/app/components/isNotAuth";


// const Payment = () => {
//   const [amount, setAmount] = useState({
//     event_amount: 0,
//     photocopy_charges: 0,
//     total_amount: 0,
//   });

//   const [transactionId, setTransactionId] = useState("");
//   const router = useRouter();

//   const qrRef = useRef(null);
//   const qrCode = useRef(null);

//   // --- API Logic ---
//   const getAmount = async () => {
//     try {
//       const saved = localStorage.getItem("early_code");
//       if (saved) {
//         const res = await api.post("/payment/apply-earlybird", { code: saved });
//         setAmount(res.data.data);
//       } else {
//         const res = await api.get("/payment/amount");
//         setAmount(res.data.data);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };


//   useEffect(() => {
//     getAmount();
//   }, []);

//   useEffect(() => {
//     // Add this check - only create QR if amount is loaded
//     if (amount.total_amount === 0) return;

//     if (!qrCode.current) {
//       qrCode.current = new QRCodeStyling({
//         width: 150,
//         height: 150,
//         type: "svg", // SVG = sharp + transparent
//         data: `upi://pay?pa=Vyapar.173204546635@hdfcbank&pn=Default&mc=8999&tr=STQU173204546635&am=${amount.total_amount}&tn=PICTOFEST&cu=INR`,
  
//         backgroundOptions: {
//           color: "transparent", // 🔥 NO WHITE BG
//         },
  
//         dotsOptions: {
//           color: "#6b3e1e", // brown QR
//           type: "rounded", // 🔥 smooth dots
//         },
  
//         cornersSquareOptions: {
//           type: "extra-rounded",
//           color: "#6b3e1e",
//         },
  
//         cornersDotOptions: {
//           type: "dot",
//           color: "#6b3e1e",
//         },
//       });
//     } else {
//       // Update the QR code data when amount changes
//       qrCode.current.update({
//         data: `upi://pay?pa=Vyapar.173204546635@hdfcbank&pn=Default&mc=8999&tr=STQU173204546635&am=${amount.total_amount}&tn=PICTOFEST&cu=INR`,
//       });
//     }
  
//     if (qrRef.current) {
//       qrRef.current.innerHTML = "";
//       qrCode.current.append(qrRef.current);
//     }
//   }, [amount.total_amount]);
  


//   const handleTransactionIdChange = (event) => {
//     setTransactionId(event.target.value);
//   };
  
//   const handleSubmit = async () => {
//     if (transactionId.length !== 12) {
//       toast.error("Please enter a valid 12-digit UTR ID");
//       return;
//     }

//     try {
//       const early_code = localStorage.getItem("early_code");

//       const response = await api.post(`/payment/`, {
//         transaction_id: transactionId,
//         early_code,
//       });

//       localStorage.removeItem("early_code");
//       toast.success(response.data.message);
//       router.push("/order");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Payment failed");
//     }
//   };



//   return (
//     // UPDATED CONTAINER:
//     // 1. Mobile/MD kept exactly as before: 'flex justify-center items-center py-10 md:py-0'
//     // 2. LG (Laptop) ONLY: 'lg:items-start lg:pt-40' to push content down from the fixed navbar
//     <div className="relative min-h-screen w-full overflow-hidden bg-[#1a0b40] flex justify-center items-center py-10 md:py-0 lg:items-start lg:pt-40">
//       {/* ============================================================
//           BACKGROUND LAYER
//          ============================================================ */}
//       <div className="hidden md:block absolute inset-0 z-0">
//         <Image
//           src="/img/common/desktop-bg.png"
//           alt="Desktop Background"
//           fill
//           priority
//           className="object-cover"
//         />
//       </div>

//       <div className="block md:hidden absolute inset-0 z-0">
//         <Image
//           src="/img/common/general-mobile-bg.png"
//           alt="Mobile Background"
//           fill
//           priority
//           className="object-cover"
//           quality={90}
//         />
//       </div>

//       {/* ============================================================
//           DECORATIONS
//          ============================================================ */}
//       <div className="hidden md:block">
//         {/* LG UPDATE: Added lg:w-72 lg:h-[350px] to scale down on laptop screens */}
//         <div className="absolute bottom-0 left-0 z-10 w-90 h-95 lg:w-72 lg:h-[350px] xl:w-90 xl:h-95">
//           <Image
//             src="/img/cart/cart-bottom-left-singer-desktop.png"
//             alt="Dancer"
//             fill
//             className="object-contain object-bottom"
//           />
//         </div>

//         {/* LG UPDATE: Added lg:w-72 lg:h-72 to scale down on laptop screens */}
//         <div className="absolute bottom-0 right-0 z-10 w-80 h-80 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
//           <Image
//             src="/img/cart/cart-bottom-right-singer-desktop.png"
//             alt="Guitarist"
//             fill
//             className="object-contain object-bottom"
//           />
//         </div>
//       </div>

//       {/* ============================================================
//           MAIN CONTENT WRAPPER
//          ============================================================ */}
//       {/* LG UPDATE: Added lg:translate-y-0 to reset vertical offset on laptop (since we use padding there) */}
//       <div className="relative z-20 flex flex-col items-center gap-5 w-full translate-y-[5%] md:translate-y-[7%] lg:translate-y-0">
//         {/* --- CENTRAL CARD --- */}
//         {/* LG UPDATE: Added lg:w-[450px] to make card slightly smaller on 1024px screens */}
//         <Image
//           src="/img/cart/card-bird.svg"
//           alt="Bird"
//           width={90}
//           height={90}
//           className="absolute -top-5 right-4 block md:hidden z-20"
//         />

//         <Image
//           src="/img/cart/card-man.svg"
//           alt="Man"
//           width={100}
//           height={100}
//           className="absolute bottom-15 left-5 block md:hidden z-20"
//         />


//         <div
//           className="
//               relative
//               w-[80%]
//               md:w-125
//               lg:w-112.5
//               xl:w-125
//               min-h-105
//               flex flex-col items-center justify-center
//               p-6
//               bg-[#FFFCE0]
//               rounded-3xl
//               shadow-lg
//             "
//         >


//           {/* --- INTERNAL CONTENT --- */}
//           {/* Adjusted padding: pt-6 (top) and pb-4 (bottom) */}
//           <div className="relative z-10 w-full h-full flex flex-col items-center px-4 py-3">
//             {/* Header */}
//             <h1 className="heading-font text-2xl md:text-4xl text-[#1f4e3d] text-center heading-font tracking-widest mb-4 drop-shadow-sm uppercase">
//               Make Payment
//             </h1>

//             {/* QR Code Section with Frame */}
//             {/* Added responsive sizing for frame container if needed, but fixed px usually works fine here */}
//             <div className="relative w-[200px] h-[200px] md:w-[220px] md:h-[220px] flex items-center justify-center mb-2">

//               <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-4">
//                 {/* Outer border - more spacing on mobile */}
//                 <div className="absolute inset-1 md:inset-4 border-4 border-[#4e3506] rounded-2xl" />
                
//                 {/* Inner border - more spacing on mobile */}
//                 <div className="absolute inset-3 md:inset-6 border-3 border-[#EFE093] rounded-xl" />
//               </div>



//               {/* The QR Code */}
//               {/* <div className="relative z-10 bg-white p-1">
//                 <QRCode
//                   size={130}
//                   value={`upi://pay?pa=Vyapar.173204546635@hdfcbank&pn=Default&mc=8999&tr=STQU173204546635&am=${amount.total_amount}&tn=PICTOFEST&cu=INR`}
//                   viewBox={`0 0 130 130`}
//                   className="w-full h-auto"
//                 />
//               </div> */}

//               <div
//                 ref={qrRef}
//                 className="relative z-10 flex items-center justify-center"
//               />

//             </div>

//             {/* Amount Text */}
//             <h2 className=" body-font text-lg md:text-xl text-[#1f4e3d] font-bold body-font mb-4 text-center">
//               Total Amount: Rs. {amount.total_amount}/-

//             </h2>

//             {/* Input Section (Yellow Box Design) */}
//             <div className="w-full flex flex-col items-center gap-2 mb-2">

//               <input
//                 type="text"
//                 className="
//                   body-font
//                   w-full max-w-[400px]
//                   h-[55px] md:h-[70px]
//                   rounded-[20px]
//                   bg-[#EFE093]
//                   text-[#4e3506]
                  
//                   text-base md:text-xl
//                   placeholder:text-sm md:placeholder:text-lg

//                   font-bold
//                   placeholder:font-semibold
//                   placeholder-[#4e3506]/60

//                   focus:outline-none
//                   focus:ring-2
//                   focus:ring-[#4e3506]/20

//                   text-center
//                   tracking-wide
//                 "
//                 value={transactionId}
//                 onChange={handleTransactionIdChange}
//                 maxLength={12}
//                 placeholder="Enter 12 digit UTR ID"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="mb-6">

//           <div className="flex justify-center mt-1">
//             <div
//               onClick={handleSubmit}
//               className="
//                 cursor-pointer
//                 w-38 h-12
//                 md:w-44 md:h-14
//                 bg-[#FFFCE0]
//                 rounded-2xl
//                 shadow-md
//                 hover:scale-105 hover:shadow-lg
//                 transition-all
//                 flex items-center justify-center
//               "
//             >
//               <div className="flex items-center justify-center h-full pb-1">
//                 <Image
//                   src="/img/cart/flower.svg"
//                   alt="icon"
//                   width={28}
//                   height={28}
//                   className="mr-3"
//                 />
//                 <span className="sub-heading-font text-[#5c3a21] font-bold text-lg">
//                   Submit
//                 </span>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default isNotAuth(Payment);





// combos and promo code applied cart

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
// import QRCode from "react-qr-code";
import QRCodeStyling from "qr-code-styling";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import api from "@/app/api";
import { useEffect } from "react";
import isNotAuth from "@/app/components/isNotAuth";


const Payment = () => {
  const [amount, setAmount] = useState({
    event_amount: 0,
    photocopy_charges: 0,
    discount: 0,
    discounted_event_codes: [],
    total_amount: 0,
  });

  const [cart, setCart] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const router = useRouter();

  const qrRef = useRef(null);
  const qrCode = useRef(null);

  const EARLY_BIRD_EVENTS = ["LRP", "PCF", "PCFI"];

  // Combo definitions - keep in sync with cart page
  const COMBO_PRICES = {
    "LRP,PCFI": 850,  // Pipe Cleaner Flower + Lotus Resin
    "LRP,PWC": 750,   // Pottery + Lotus Resin
    "PCFI,PWC": 500,  // Pottery + Pipe Cleaner Flower
  };

  // Get the combo key and price for current combo items
  const getComboDetails = () => {
    const comboEventCodes = JSON.parse(localStorage.getItem("combo_event_codes") || "[]");
    if (comboEventCodes.length === 0) return null;
    
    const sortedCodes = [...comboEventCodes].sort().join(",");
    const comboPrice = COMBO_PRICES[sortedCodes];
    
    return comboPrice ? { codes: comboEventCodes, price: comboPrice } : null;
  };

  // Calculate amount with combo and promo logic
  const calculateAmount = (currentCart, discountedCodes = []) => {
    const comboDetails = getComboDetails();
    const comboEventCodes = comboDetails?.codes || [];
    const comboPrice = comboDetails?.price || 0;
    
    let event_amount = 0;
    let photocopy_charges = 0;
    let discount = 0;
    const DISCOUNT_PER_EVENT = 50;
    
    // Separate combo and non-combo items
    const comboItems = currentCart.filter(item => comboEventCodes.includes(item.event_code));
    const nonComboItems = currentCart.filter(item => !comboEventCodes.includes(item.event_code));
    
    // Add combo price if exists
    if (comboItems.length > 0) {
      event_amount += comboPrice;
      
      // Photocopy for combo items
      comboItems.forEach(item => {
        if (item.photocopy_needed) {
          photocopy_charges += 10 * (item.quantity || 1);
        }
      });
    }
    
    // Calculate non-combo items
    nonComboItems.forEach(item => {
      const hasPhotocopy = item.photocopy_needed === true;
      const baseUnitPrice = item.price;  // Remove the photocopy from here
      const baseTotalPrice = baseUnitPrice * (item.quantity || 1);
      
      // Apply discount if eligible
      const isDiscounted = discountedCodes.includes(item.event_code);
      
      if (isDiscounted) {
        event_amount += Math.max(baseTotalPrice - DISCOUNT_PER_EVENT, 0);
        discount += DISCOUNT_PER_EVENT;
      } else {
        event_amount += baseTotalPrice;
      }
      
      if (item.photocopy_needed) {
        photocopy_charges += 10 * (item.quantity || 1);
      }
    });
    
    return {
      event_amount,
      photocopy_charges,
      discount,
      discounted_event_codes: discountedCodes,
      total_amount: event_amount + photocopy_charges,
    };
  };

  // Check if there are eligible early bird events for the discount
  const hasEligibleEarlyBirdEvent = (currentCart, discountedCodes) => {
    return currentCart.some(item =>
      discountedCodes.includes(item.event_code)
    );
  };

  // --- API Logic ---
  const getAmount = async () => {
    try {
      // First, fetch the cart
      const cartRes = await api.get("/cart/");
      const currentCart = cartRes.data.data || [];
      setCart(currentCart);

      // Check for saved promo code
      const savedCode = localStorage.getItem("early_code");
      
      if (savedCode) {
        // Validate the promo code with backend
        try {
          const res = await api.post("/payment/apply-earlybird", { code: savedCode });
          
          // Check if cart has eligible events for this discount
          if (!hasEligibleEarlyBirdEvent(currentCart, res.data.data.discounted_event_codes)) {
            // Code not applicable, calculate without discount
            const calculatedAmount = calculateAmount(currentCart, []);
            setAmount(calculatedAmount);
          } else {
            // Calculate with discount using backend's discounted codes
            const calculatedAmount = calculateAmount(currentCart, res.data.data.discounted_event_codes);
            setAmount(calculatedAmount);
          }
        } catch (err) {
          console.log("Promo code validation failed:", err);
          // If promo code fails, calculate without discount
          const calculatedAmount = calculateAmount(currentCart, []);
          setAmount(calculatedAmount);
          // Optionally remove invalid code
          localStorage.removeItem("early_code");
        }
      } else {
        // No promo code, calculate without discount
        const calculatedAmount = calculateAmount(currentCart, []);
        setAmount(calculatedAmount);
      }
    } catch (err) {
      console.log("Error fetching cart:", err);
      toast.error("Failed to load payment details");
    }
  };


  useEffect(() => {
    getAmount();
  }, []);

  useEffect(() => {
    // Add this check - only create QR if amount is loaded
    if (amount.total_amount === 0) return;

    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling({
        width: 150,
        height: 150,
        type: "svg", // SVG = sharp + transparent
        data: `upi://pay?pa=Vyapar.173204546635@hdfcbank&pn=Default&mc=8999&tr=STQU173204546635&am=${amount.total_amount}&tn=PICTOFEST&cu=INR`,
  
        backgroundOptions: {
          color: "transparent", // 🔥 NO WHITE BG
        },
  
        dotsOptions: {
          color: "#6b3e1e", // brown QR
          type: "rounded", // 🔥 smooth dots
        },
  
        cornersSquareOptions: {
          type: "extra-rounded",
          color: "#6b3e1e",
        },
  
        cornersDotOptions: {
          type: "dot",
          color: "#6b3e1e",
        },
      });
    } else {
      // Update the QR code data when amount changes
      qrCode.current.update({
        data: `upi://pay?pa=Vyapar.173204546635@hdfcbank&pn=Default&mc=8999&tr=STQU173204546635&am=${amount.total_amount}&tn=PICTOFEST&cu=INR`,
      });
    }
  
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qrCode.current.append(qrRef.current);
    }
  }, [amount.total_amount]);
  


  const handleTransactionIdChange = (event) => {
    setTransactionId(event.target.value);
  };
  
  const handleSubmit = async () => {
    if (transactionId.length !== 12) {
      toast.error("Please enter a valid 12-digit UTR ID");
      return;
    }

    try {
      const early_code = localStorage.getItem("early_code");

      const response = await api.post(`/payment/`, {
        transaction_id: transactionId,
        early_code,
      });

      localStorage.removeItem("early_code");
      localStorage.removeItem("combo_event_codes");
      toast.success(response.data.message);
      router.push("/order");
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };



  return (
    // UPDATED CONTAINER:
    // 1. Mobile/MD kept exactly as before: 'flex justify-center items-center py-10 md:py-0'
    // 2. LG (Laptop) ONLY: 'lg:items-start lg:pt-40' to push content down from the fixed navbar
    <div className="relative min-h-screen w-full overflow-hidden bg-[#1a0b40] flex justify-center items-center py-10 md:py-0 lg:items-start lg:pt-40">
      {/* ============================================================
          BACKGROUND LAYER
         ============================================================ */}
      <div className="hidden md:block absolute inset-0 z-0">
        <Image
          src="/img/common/desktop-bg.png"
          alt="Desktop Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="block md:hidden absolute inset-0 z-0">
        <Image
          src="/img/common/general-mobile-bg.png"
          alt="Mobile Background"
          fill
          priority
          className="object-cover"
          quality={90}
        />
      </div>

      {/* ============================================================
          DECORATIONS
         ============================================================ */}
      <div className="hidden md:block">
        {/* LG UPDATE: Added lg:w-72 lg:h-[350px] to scale down on laptop screens */}
        <div className="absolute bottom-0 left-0 z-10 w-90 h-95 lg:w-72 lg:h-[350px] xl:w-90 xl:h-95">
          <Image
            src="/img/cart/cart-bottom-left-singer-desktop.png"
            alt="Dancer"
            fill
            className="object-contain object-bottom"
          />
        </div>

        {/* LG UPDATE: Added lg:w-72 lg:h-72 to scale down on laptop screens */}
        <div className="absolute bottom-0 right-0 z-10 w-80 h-80 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
          <Image
            src="/img/cart/cart-bottom-right-singer-desktop.png"
            alt="Guitarist"
            fill
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* ============================================================
          MAIN CONTENT WRAPPER
         ============================================================ */}
      {/* LG UPDATE: Added lg:translate-y-0 to reset vertical offset on laptop (since we use padding there) */}
      <div className="relative z-20 flex flex-col items-center gap-5 w-full translate-y-[5%] md:translate-y-[7%] lg:translate-y-0">
        {/* --- CENTRAL CARD --- */}
        {/* LG UPDATE: Added lg:w-[450px] to make card slightly smaller on 1024px screens */}
        <Image
          src="/img/cart/card-bird.svg"
          alt="Bird"
          width={90}
          height={90}
          className="absolute -top-5 right-4 block md:hidden z-20"
        />

        <Image
          src="/img/cart/card-man.svg"
          alt="Man"
          width={100}
          height={100}
          className="absolute bottom-15 left-5 block md:hidden z-20"
        />


        <div
          className="
              relative
              w-[80%]
              md:w-125
              lg:w-112.5
              xl:w-125
              min-h-105
              flex flex-col items-center justify-center
              p-6
              bg-[#FFFCE0]
              rounded-3xl
              shadow-lg
            "
        >


          {/* --- INTERNAL CONTENT --- */}
          {/* Adjusted padding: pt-6 (top) and pb-4 (bottom) */}
          <div className="relative z-10 w-full h-full flex flex-col items-center px-4 py-3">
            {/* Header */}
            <h1 className="heading-font text-2xl md:text-4xl text-[#1f4e3d] text-center heading-font tracking-widest mb-4 drop-shadow-sm uppercase">
              Make Payment
            </h1>

            {/* QR Code Section with Frame */}
            {/* Added responsive sizing for frame container if needed, but fixed px usually works fine here */}
            <div className="relative w-[200px] h-[200px] md:w-[220px] md:h-[220px] flex items-center justify-center mb-2">

              <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-4">
                {/* Outer border - more spacing on mobile */}
                <div className="absolute inset-1 md:inset-4 border-4 border-[#4e3506] rounded-2xl" />
                
                {/* Inner border - more spacing on mobile */}
                <div className="absolute inset-3 md:inset-6 border-3 border-[#EFE093] rounded-xl" />
              </div>



              {/* The QR Code */}
              {/* <div className="relative z-10 bg-white p-1">
                <QRCode
                  size={130}
                  value={`upi://pay?pa=Vyapar.173204546635@hdfcbank&pn=Default&mc=8999&tr=STQU173204546635&am=${amount.total_amount}&tn=PICTOFEST&cu=INR`}
                  viewBox={`0 0 130 130`}
                  className="w-full h-auto"
                />
              </div> */}

              <div
                ref={qrRef}
                className="relative z-10 flex items-center justify-center"
              />

            </div>

            {/* Amount Text */}
            <h2 className=" body-font text-lg md:text-xl text-[#1f4e3d] font-bold body-font mb-4 text-center">
              Total Amount: Rs. {amount.total_amount}/-

            </h2>

            {/* Input Section (Yellow Box Design) */}
            <div className="w-full flex flex-col items-center gap-2 mb-2">

              <input
                type="text"
                className="
                  body-font
                  w-full max-w-[400px]
                  h-[55px] md:h-[70px]
                  rounded-[20px]
                  bg-[#EFE093]
                  text-[#4e3506]
                  
                  text-base md:text-xl
                  placeholder:text-sm md:placeholder:text-lg

                  font-bold
                  placeholder:font-semibold
                  placeholder-[#4e3506]/60

                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#4e3506]/20

                  text-center
                  tracking-wide
                "
                value={transactionId}
                onChange={handleTransactionIdChange}
                maxLength={12}
                placeholder="Enter 12 digit UTR ID"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">

          <div className="flex justify-center mt-1">
            <div
              onClick={handleSubmit}
              className="
                cursor-pointer
                w-38 h-12
                md:w-44 md:h-14
                bg-[#FFFCE0]
                rounded-2xl
                shadow-md
                hover:scale-105 hover:shadow-lg
                transition-all
                flex items-center justify-center
              "
            >
              <div className="flex items-center justify-center h-full pb-1">
                <Image
                  src="/img/cart/flower.svg"
                  alt="icon"
                  width={28}
                  height={28}
                  className="mr-3"
                />
                <span className="sub-heading-font text-[#5c3a21] font-bold text-lg">
                  Submit
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default isNotAuth(Payment);