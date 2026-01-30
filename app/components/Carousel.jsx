"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const Carousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timeoutId = setTimeout(nextImage, 2000);

    return () => clearTimeout(timeoutId);
  }, [currentImage]);

  return (
    <div className="relative">
      <div className="polaroid-frame">
        <Image
          src={images[currentImage]}
          alt={`Slide ${currentImage + 1}`}
          width={480}
          height={270}
          className="w-11/12 mx-auto h-11/12 aspect-video ring-1 ring-neutral-100/50 transition-opacity ease-in-out "
        />
      </div>
      {/* <div className="absolute -inset-1 flex items-center justify-between">
        <button
          onClick={prevImage}
          className="text-neutral-800 bg-orange-100 rounded-r-full text-xl md:text-3xl xl:text-5xl font-bold pl-1 pr-2 py-1 md:py-2"
        >
          &lt;
        </button>
        <button
          onClick={nextImage}
          className="text-neutral-800 bg-orange-100 text-xl md:text-3xl xl:text-5xl rounded-l-full font-bold pr-1 pl-2 py-1 md:py-2"
        >
          &gt;
        </button>
      </div> */}
    </div>
  );
};

export default Carousel;
