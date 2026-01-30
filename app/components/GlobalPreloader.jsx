"use client";

import { useState, useEffect } from "react";
import AnimationLoader from "./AnimationLoader";

export default function GlobalPreloader() {
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        // Check if the page is already loaded (for SSR/Hydration edge cases)
        if (document.readyState === "complete") {
            setIsPageLoaded(true);
            return;
        }

        const handleLoad = () => {
            // Small delay to ensure even late images have a moment to render
            setTimeout(() => {
                setIsPageLoaded(true);
            }, 500);
        };

        window.addEventListener("load", handleLoad);

        // Dynamic import safety - wait for hydration before showing anything too complex
        // but here we want it visible ASAP, so we just rely on window load.

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    if (isPageLoaded) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            backgroundColor: '#1f024e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'all'
        }}>
            <AnimationLoader />
        </div>
    );
}
