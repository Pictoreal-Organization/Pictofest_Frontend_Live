"use client";
import { useState } from "react";

export default function VideoLoader() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-[#1f024e]">
      {isLoading && (
        <div className="text-center">
          <div className="text-8xl animate-pulse">🌮</div>
        </div>
      )}
      
      <video
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => {
          console.log("Video loaded successfully");
          setIsLoading(false);
        }}
        onError={(e) => console.error("Error loading video:", e)}
        className={`max-w-full max-h-screen ${isLoading ? 'hidden' : 'block'}`}
      >
        {/* Browser will automatically choose the first supported format */}
        <source src="/loader.webm" type="video/webm" />
        <source src="/loader.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}