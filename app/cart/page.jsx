"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/app/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import isNotAuth from "@/app/components/isNotAuth";

const Cart = () => {
  const [earlyCode, setEarlyCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState({
    event_amount: 0,
    photocopy_charges: 0,
    discount: 0,
    discounted_event_codes: [],
    total_amount: 0,
  });


  const router = useRouter();

  const getCart = async () => {
    try {
      const response = await api.get(`/cart/`);
      setCart(response.data.data || []);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };
  const getAmount = async (code, currentCart = cart) => {
    try {
      if (code) {
        const res = await api.post("/payment/apply-earlybird", { code });
        if (!hasEligibleEarlyBirdEvent(currentCart, res.data.data.discounted_event_codes)) {
          // remove EB completely
          setApplied(false);
          setEarlyCode("");
          localStorage.removeItem("early_code");

          const fresh = await api.get("/payment/amount");
          setAmount(fresh.data.data);
          return;
        }

        setAmount(res.data.data);
        setApplied(true);
        localStorage.setItem("early_code", code);
      }
      else {
        const res = await api.get("/payment/amount");
        setAmount(res.data.data);
        setApplied(false);
        localStorage.removeItem("early_code");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid code");
      setApplied(false);
    }
  };

  const EARLY_BIRD_EVENTS = ["LRP", "PCF", "PCFI"]; // same as backend

  const canApplyEarlyBird = cart.some(item =>
    EARLY_BIRD_EVENTS.includes(item.event_code)
  );


  const hasEligibleEarlyBirdEvent = (cart, discountedCodes) => {
    return cart.some(item =>
      discountedCodes.includes(item.event_code)
    );
  };

  ;
  useEffect(() => {
    const init = async () => {
      const cartRes = await api.get("/cart/");
      const currentCart = cartRes.data.data || [];
      setCart(currentCart);

      const saved = localStorage.getItem("early_code");

      if (saved && currentCart.length > 0) {
        setEarlyCode(saved);          // ✅ THIS WAS MISSING
        await getAmount(saved, currentCart);
      } else {
        setEarlyCode("");
        await getAmount(null, currentCart);
      }

    };

    init();
  }, []);



  const handleDelete = async (eventId, photocopyNeeded) => {
    try {
      const response = await api.delete(`/cart/`, {
        data: {
          event_id: eventId,
          photocopy_needed: photocopyNeeded,
        },
      });

      toast.success(response.data.message || "Item updated");
      const updatedCart = await api.get("/cart/");
      setCart(updatedCart.data.data || []);

      if (!updatedCart.data.data || updatedCart.data.data.length === 0) {
        setAmount({
          event_amount: 0,
          photocopy_charges: 0,
          discount: 0,
          discounted_event_codes: [],
          total_amount: 0,
        });
        setApplied(false);
        setEarlyCode("");
        localStorage.removeItem("early_code");
        return;
      }

      const saved = localStorage.getItem("early_code");
      saved
        ? getAmount(saved, updatedCart.data.data)
        : getAmount(null, updatedCart.data.data);



    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Error deleting item");
    }
  };

  const handleEmpty = async () => {
    try {
      const response = await api.delete(`/cart/empty`);
      toast.success(response.data.message || "Cart emptied");
      const updatedCart = await api.get("/cart/");
      setCart(updatedCart.data.data || []);

      if (!updatedCart.data.data || updatedCart.data.data.length === 0) {
        setAmount({
          event_amount: 0,
          photocopy_charges: 0,
          discount: 0,
          discounted_event_codes: [],
          total_amount: 0,
        });
        setApplied(false);
        setEarlyCode("");
        localStorage.removeItem("early_code");
        return;
      }

      const saved = localStorage.getItem("early_code");
      saved
        ? getAmount(saved, updatedCart.data.data)
        : getAmount(null, updatedCart.data.data);


    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Error emptying cart");
    }
  };

  const handleProceed = async () => {
    if (amount.total_amount > 0) {
      router.push("/payment");
    } else {
      toast.error("Cart is Empty!");
    }
  };

  const updateQuantity = async (item, action) => {
    try {
      const response = await api.patch("/cart/quantity", {
        event_id: item.id,
        photocopy_needed: item.photocopy_needed,
        action, // "inc" | "dec"
      });

      toast.success(response.data.message || "Updated");
      const updatedCart = await api.get("/cart/");
      setCart(updatedCart.data.data || []);

      if (!updatedCart.data.data || updatedCart.data.data.length === 0) {
        setAmount({
          event_amount: 0,
          photocopy_charges: 0,
          discount: 0,
          discounted_event_codes: [],
          total_amount: 0,
        });
        setApplied(false);
        setEarlyCode("");
        localStorage.removeItem("early_code");
        return;
      }

      const saved = localStorage.getItem("early_code");
      saved
        ? getAmount(saved, updatedCart.data.data)
        : getAmount(null, updatedCart.data.data);



    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Error updating quantity");
    }
  };


  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#1a0b40] flex justify-center items-center py-10 md:py-0 lg:items-start lg:pt-30">
      {/* Background */}
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
        />
      </div>

      {/* Decorations */}
      <div className="hidden md:block">
        <div className="absolute bottom-0 left-0 z-10 w-90 h-95">
          <Image
            src="/img/cart/cart-bottom-left-singer-desktop.png"
            alt="Dancer"
            fill
            className="object-contain object-bottom"
          />
        </div>

        <div className="absolute bottom-0 right-0 z-10 w-85 h-90">
          <Image
            src="/img/cart/cart-bottom-right-singer-desktop.png"
            alt="Guitarist"
            fill
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center gap-5 w-full translate-y-[5%] lg:translate-y-0">
        <Image
          src="/img/cart/card-bird.svg"
          alt="Bird"
          width={100}
          height={100}
          className="absolute -top-10 right-4 block md:hidden z-20"
        />

        <Image
          src="/img/cart/card-man.svg"
          alt="Man"
          width={100}
          height={100}
          className="absolute bottom-15 left-5 block md:hidden z-20"
        />
        <div className="relative w-[80%] md:w-[500px] lg:w-[450px] xl:w-[500px]  max-h-[90vh] flex flex-col p-6 bg-[#FFFCE0] rounded-3xl shadow-lg">
          <div className="relative z-10 w-full h-full flex flex-col mt-2 px-1 md:px-4 py-4 pb-4">
            <h1 className="text-4xl md:text-6xl lg:text-5xl xl:text-6xl text-[#1f4e3d] text-center tracking-widest heading-font mb-6">
              CART
            </h1>

            <div className="flex-grow w-full max-h-[250px] overflow-y-auto pr-2 custom-scrollbar space-y-4">

              {cart.length > 0 ? (
                cart.map((item) => {
                  const hasPhotocopy = item.photocopy_needed === true;
                  const isEarlyBirdDiscounted = amount.discounted_event_codes?.includes(item.event_code);
                  const baseUnitPrice = hasPhotocopy ? item.price + 10 : item.price;
                  const baseTotalPrice = baseUnitPrice * (item.quantity || 1);

                  // Apply Early Bird ONLY visually
                  const DISCOUNT_PER_EVENT = 50;

                  const discountedTotalPrice = isEarlyBirdDiscounted
                    ? Math.max(baseTotalPrice - DISCOUNT_PER_EVENT, 0)
                    : baseTotalPrice;




                  return (
                    <div
                      key={`${item.id}-${item.photocopy_needed}`}
                      className="flex items-start justify-between border-b border-[#1f4e3d]/20 pb-2"
                    >
                      {/* Left side */}
                      <div className="flex flex-col">
                        <span className="body-font text-[#194535] text-lg font-semibold leading-snug">
                          {item.name}
                        </span>

                        {item.event_category === "PICSOREEL" && (
                          <span className="text-sm text-[#5c3a21]">
                            Entries: {item.quantity}
                          </span>
                        )}

                        {hasPhotocopy && (
                          <span className="text-xs md:text-sm text-[#8b4513] leading-tight">
                            Extra Rs.10 Photocopy per entry
                          </span>
                        )}
                      </div>

                      {/* Right side */}
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        {item.event_category === "PICSOREEL" && (
                          <div className="flex items-center gap-1 bg-[#1f4e3d]/5 rounded-full px-2 py-[2px]">
                            <button
                              onClick={() => updateQuantity(item, "dec")}
                              className="w-5 h-5 rounded-full border border-[#1f4e3d]
               text-[#1f4e3d] text-xs font-bold"
                            >
                              −
                            </button>

                            <span className="w-5 text-center body-font text-[#1f4e3d] text-xs">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item, "inc")}
                              className="w-5 h-5 rounded-full border border-[#1f4e3d]
               text-[#1f4e3d] text-xs font-bold"
                            >
                              +
                            </button>
                          </div>
                        )}

                        <div className="flex items-end gap-2 px-2">
                          <div className="flex flex-col items-end">
                            {isEarlyBirdDiscounted && (
                              <span className="text-xs text-green-700 font-semibold">
                                Early Bird Applied
                              </span>
                            )}

                            {isEarlyBirdDiscounted ? (
                              <>
                                <span className="text-xs line-through text-gray-500">
                                  Rs. {baseTotalPrice}
                                </span>
                                <span className="body-font text-[#0e7490] font-bold text-sm">
                                  Rs. {discountedTotalPrice}
                                </span>
                              </>
                            ) : (
                              <span className="body-font text-[#0e7490] font-bold text-sm">
                                Rs. {baseTotalPrice}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => handleDelete(item.id, item.photocopy_needed)}
                            className="hover:scale-110 transition-transform"
                          >
                            <Image width={18} height={18} src="/img/cart/cancel-icon.png" alt="Remove" />
                          </button>
                        </div>


                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="body-font text-center text-[#1f4e3d] text-xl mt-10 opacity-70">
                  Your cart is empty.
                </div>
              )}



            </div>

            <div className="w-full border-t-2 border-dotted border-[#1f4e3d]/40 my-6"></div>
            <p className="text-[11px] text-red-600 mb-1 select-none">
              *Avail Early Bird offers at desk
            </p>

            <div className="flex gap-2 mb-3">
              <input
                value={earlyCode}
                onChange={(e) => setEarlyCode(e.target.value)}
                placeholder={applied ? "" : "Early Bird Code"}
                readOnly={applied}
                className={`border px-3 py-2 rounded-md w-full ${applied ? "bg-gray-100 text-gray-600 cursor-not-allowed" : ""
                  }`}
              />

              <button
                disabled={!canApplyEarlyBird || applied}
                onClick={() => getAmount(earlyCode, cart)}
                className={`px-4 rounded-md text-white ${!canApplyEarlyBird || applied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                {applied ? "Applied" : "Apply"}
              </button>


            </div>
            {applied && amount.discounted_event_codes.length > 0 && (
              <p className="text-green-700 text-sm">Early Bird applied</p>
            )}
            <div className="text-center mb-4">
              <h2 className="body-font text-2xl md:text-3xl font-extrabold text-[#1a1a1a]">
                Total : Rs. {amount.total_amount}
              </h2>

            </div>
          </div>
        </div>

        <div className="flex justify-center mt-1 gap-6 md:gap-10">
          <button
            onClick={handleEmpty}
            className="w-auto h-12 pr-4 px-2 md:w-44 md:h-14
              bg-[#FFFCE0]
              rounded-2xl
              shadow-md
              hover:scale-105 hover:shadow-lg
              transition-all
              flex items-center justify-center"
          >
            <div className="relative z-10 flex items-center justify-center h-full pb-1">
              <Image
                src="/img/cart/chilly.svg"
                alt="icon"
                width={40}
                height={40}
                className="mr-2"
              />

              {/* Text */}
              <span className="sub-heading-font text-[#5c3a21] font-bold text-lg">
                Delete All
              </span>
            </div>

          </button>

          <button
            onClick={handleProceed}
            className="w-38 h-12 px-2 md:w-44 md:h-14
              bg-[#FFFCE0]
              rounded-2xl
              shadow-md
              hover:scale-105 hover:shadow-lg
              transition-all
              flex items-center justify-center"
          >
            <div className="relative z-10 flex items-center justify-center h-full pb-1">
              <Image
                src="/img/cart/flower.svg"
                alt="icon"
                width={28}
                height={28}
                className="mr-5"
              />
              <span className="sub-heading-font text-[#5c3a21] font-bold text-lg">
                Proceed
              </span>
            </div>
          </button>
        </div>
      </div>
    </div >
  );
};

export default isNotAuth(Cart);
