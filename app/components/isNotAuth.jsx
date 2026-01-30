"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function isNotAuth(Component) {
  return function IsAuth(props) {
    const router = useRouter();
    const pathname = usePathname(); // Get current page URL
    const [auth, setAuth] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.setItem("redirectAfterLogin", pathname); // Store previous page
        router.push("/login"); // Use router.push instead of redirect()
      } else {
        setAuth(true);
      }
    }, []);

    if (!auth) {
      return (
        <div className="bg-[url('/img/home/landingbg.jpeg')] h-screen bg-cover"></div>
      );
    }

    return <Component {...props} />;
  };
}
